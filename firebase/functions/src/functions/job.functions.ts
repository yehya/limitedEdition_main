import { createAuthenticatedFunction } from "../utils/creators/auth.creator";
import { createProviderFunction } from "../utils/creators/provider.creator";
import { FirebaseJobRepository } from "../db/firebase/job.repository";
import { FirebaseProviderRepository } from "../db/firebase/provider.repository";
import { JobService, CreateJobInput } from "../services/job.service";
import { MatchingService } from "../services/matching.service";
import { HttpsError } from "firebase-functions/v2/https";

const jobRepo = new FirebaseJobRepository();
const providerRepo = new FirebaseProviderRepository();
const jobService = new JobService(jobRepo, providerRepo);
const matchingService = new MatchingService(providerRepo);

export const createJob = createAuthenticatedFunction(async (data: CreateJobInput & { aiSummary: string }, context) => {
  const job = await jobService.createJob(data, data.aiSummary);
  
  const provider = await matchingService.findBestProvider(
    job.service,
    job.address,
    10
  );
  
  if (provider) {
    await jobService.assignProvider(job.id, provider.id);
  }
  
  return jobService.getJobById(job.id);
});

export const getMyJobs = createAuthenticatedFunction(async (data, context) => {
  const userId = context.auth.uid;
  return jobService.getCustomerJobs(userId);
});

export const getJobDetails = createAuthenticatedFunction(async (data: { jobId: string }, context) => {
  return jobService.getJobById(data.jobId);
});

export const getProviderJobs = createProviderFunction(async (data, context) => {
  const provider = await providerRepo.findByUserId(context.auth.uid);
  if (!provider) {
    throw new HttpsError("not-found", "Provider not found");
  }
  return jobService.getProviderJobs(provider.id);
});

export const updateJobStatus = createProviderFunction(async (data: { jobId: string; status: string }, context) => {
  return jobService.updateJobStatus(data.jobId, data.status as any);
});
