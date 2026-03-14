// CONTEXT: Job model with status, service type, and AI-generated summary.

import { BaseModel } from './base.model';
import { ServiceType } from './provider.model';
import { Address } from './customer.model';

export type JobStatus = 
  | 'pending'
  | 'matching'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface TimeSlot {
  start: Date;
  end: Date;
}

export interface Job extends BaseModel {
  customerId: string;
  providerId?: string;
  status: JobStatus;
  service: ServiceType;
  description: string;
  aiSummary?: string; // AI-generated job summary
  address: Address;
  timeSlot: TimeSlot;
  price?: number;
  completedAt?: Date;
}
