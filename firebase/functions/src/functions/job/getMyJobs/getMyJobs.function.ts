// CONTEXT: Get all jobs for the authenticated customer.
// Returns list of jobs (current, past, cancelled).

import { createAuthenticatedFunction } from "@utils/creators/auth.creator";
import { FirebaseJobRepository } from "@db/firebase/job.repository";
import { FirebaseProviderRepository } from "@db/firebase/provider.repository";
import { JobService } from "@services/job.service";
import type { GetMyJobsRequest, GetMyJobsResponse } from "./getMyJobs.dto";

const jobRepo = new FirebaseJobRepository();
const providerRepo = new FirebaseProviderRepository();
const jobService = new JobService(jobRepo, providerRepo);

export const getMyJobs = createAuthenticatedFunction<GetMyJobsRequest, GetMyJobsResponse>(
  async (data, context) => {
    const userId = context.auth.uid;
    const jobs = await jobService.getCustomerJobs(userId);
    
    return {
      jobs: jobs.map(job => ({
        id: job.id,
        service: job.service,
        status: job.status,
        description: job.description,
        address: job.address,
        timeSlot: job.timeSlot,
        price: job.price,
        createdAt: job.createdAt,
      })),
    };
  }
);
