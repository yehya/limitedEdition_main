// CONTEXT: Create a new job from AI chat results. After AI processes
// the user's message, this function creates the job and auto-matches
// a provider based on service type, location, and availability.

import { createAuthenticatedFunction } from "@utils/creators/auth.creator";
import { FirebaseJobRepository } from "@db/firebase/job.repository";
import { FirebaseProviderRepository } from "@db/firebase/provider.repository";
import { JobService } from "@services/job.service";
import { MatchingService } from "@services/matching.service";
import type { CreateJobRequest, CreateJobResponse } from "./createJob.dto";

const jobRepo = new FirebaseJobRepository();
const providerRepo = new FirebaseProviderRepository();
const jobService = new JobService(jobRepo, providerRepo);
const matchingService = new MatchingService(providerRepo);

export const createJob = createAuthenticatedFunction<CreateJobRequest, CreateJobResponse>(
  async (data, context) => {
    const customerId = context.auth.uid;
    
    const job = await jobService.createJob({
      customerId,
      service: data.service,
      description: data.description,
      address: data.address,
      timeSlot: data.timeSlot,
    }, data.aiSummary);
    
    // Auto-match provider
    let providerId: string | undefined;
    let providerName: string | undefined;
    
    try {
      const provider = await matchingService.findBestProvider(
        job.service,
        job.address,
        10
      );
      
      if (provider) {
        await jobService.assignProvider(job.id, provider.id);
        providerId = provider.id;
        providerName = `Provider ${provider.id.substring(0, 8)}`; // TODO: Add provider name to model
      }
    } catch (error) {
      // No provider found - job stays in pending state
      console.log("No provider available, job will remain pending");
    }
    
    const updatedJob = await jobService.getJobById(job.id);
    
    return {
      jobId: updatedJob.id,
      status: updatedJob.status,
      providerId,
      providerName,
    };
  }
);
