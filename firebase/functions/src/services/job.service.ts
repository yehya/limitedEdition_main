import { IJobRepository } from "../db/interfaces/job.repository.interface";
import { IProviderRepository } from "../db/interfaces/provider.repository.interface";
import { Job, JobStatus, TimeSlot } from "../models/job.model";
import { ServiceType } from "../models/provider.model";
import { Address } from "../models/customer.model";
import { HttpsError } from "firebase-functions/v2/https";

export interface CreateJobInput {
  customerId: string;
  service: ServiceType;
  description: string;
  address: Address;
  timeSlot: TimeSlot;
}

export class JobService {
  constructor(
    private jobRepo: IJobRepository,
    private providerRepo: IProviderRepository
  ) {}

  async createJob(data: CreateJobInput, aiSummary: string): Promise<Job> {
    return this.jobRepo.create({
      ...data,
      aiSummary,
      status: "pending",
    });
  }

  async assignProvider(jobId: string, providerId: string): Promise<Job> {
    const job = await this.getJobById(jobId);
    const provider = await this.providerRepo.findById(providerId);

    if (!provider) {
      throw new HttpsError("not-found", "Provider not found");
    }

    if (!provider.verified) {
      throw new HttpsError("failed-precondition", "Provider not verified");
    }

    return this.jobRepo.update(jobId, {
      providerId,
      status: "confirmed",
    });
  }

  async updateJobStatus(jobId: string, status: JobStatus): Promise<Job> {
    const job = await this.getJobById(jobId);
    
    const updates: Partial<Job> = { status };
    if (status === "completed") {
      updates.completedAt = new Date();
    }

    return this.jobRepo.update(jobId, updates);
  }

  async getJobById(jobId: string): Promise<Job> {
    const job = await this.jobRepo.findById(jobId);
    if (!job) {
      throw new HttpsError("not-found", "Job not found");
    }
    return job;
  }

  async getCustomerJobs(customerId: string): Promise<Job[]> {
    return this.jobRepo.findByCustomerId(customerId);
  }

  async getProviderJobs(providerId: string): Promise<Job[]> {
    return this.jobRepo.findByProviderId(providerId);
  }

  async getPendingJobs(): Promise<Job[]> {
    return this.jobRepo.findPendingJobs();
  }
}
