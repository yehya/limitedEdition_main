// CONTEXT: Get customer's jobs DTO. Returns sanitized job list.

import { ServiceType } from "@models/provider.model";
import { Address } from "@models/customer.model";
import { JobStatus, TimeSlot } from "@models/job.model";

export interface GetMyJobsRequest {}

export interface GetMyJobsResponse {
  jobs: Array<{
    id: string;
    service: ServiceType;
    status: JobStatus;
    description: string;
    address: Address;
    timeSlot: TimeSlot;
    price?: number;
    createdAt: Date;
  }>;
}
