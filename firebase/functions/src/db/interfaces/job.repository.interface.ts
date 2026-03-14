import { IBaseRepository } from "./base.repository.interface";
import { Job, JobStatus } from "../../models/job.model";
import { ServiceType } from "../../models/provider.model";

export interface IJobRepository extends IBaseRepository<Job> {
  findByCustomerId(customerId: string): Promise<Job[]>;
  findByProviderId(providerId: string): Promise<Job[]>;
  findByStatus(status: JobStatus): Promise<Job[]>;
  findByService(service: ServiceType): Promise<Job[]>;
  findPendingJobs(): Promise<Job[]>;
}
