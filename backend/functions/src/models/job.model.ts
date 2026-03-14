// CONTEXT: Job model with status, service type, AI summary, address, and time slot.

import { BaseModel } from './base.model';
import { ServiceType } from './provider.model';
import { Localized } from '../types/localization.types';
import { Address } from './customer.model';

export type JobStatus = 
  | 'pending'
  | 'matching'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

// Job status configurations with localized names
export const JOB_STATUSES: Record<JobStatus, Localized<string>> = {
  pending: { en: 'Pending', ar: 'في الانتظار' },
  matching: { en: 'Matching', ar: 'المطابقة' },
  confirmed: { en: 'Confirmed', ar: 'مؤكد' },
  in_progress: { en: 'In Progress', ar: 'جاري التنفيذ' },
  completed: { en: 'Completed', ar: 'مكتمل' },
  cancelled: { en: 'Cancelled', ar: 'ملغي' },
} as const;

export interface TimeSlot {
  start: Date;
  end: Date;
}

export interface Job extends BaseModel {
  customerId: string;
  providerId?: string;
  status: JobStatus;
  service: ServiceType;
  title: Localized<string>; // AI-generated job title
  description: Localized<string>; // Customer's description (AI-translated)
  aiSummary?: Localized<string>; // AI-generated job summary
  address: Address;
  timeSlot: TimeSlot;
  price?: number;
  completedAt?: Date;
  customerNotes?: Localized<string>; // Additional notes from customer
  providerNotes?: Localized<string>; // Notes from provider
}
