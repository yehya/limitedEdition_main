// CONTEXT: Create job DTOs. Job creation happens after AI chat processing.
// The AI provides service type, summary, and time slot suggestions.

import { ServiceType } from "@models/provider.model";
import { Address } from "@models/customer.model";
import { JobStatus, TimeSlot } from "@models/job.model";

export interface CreateJobRequest {
  service: ServiceType;
  description: string;
  address: Address;
  timeSlot: TimeSlot;
  aiSummary: string;
}

export interface CreateJobResponse {
  jobId: string;
  status: JobStatus;
  providerId?: string;
  providerName?: string;
}
