// CONTEXT: Provider model with services, rating, and verification status.

import { BaseModel } from './base.model';
import { Localized } from '../types/localization.types';

export type ServiceType = 
  | 'plumbing'
  | 'electrical'
  | 'hvac'
  | 'carpentry'
  | 'painting'
  | 'cleaning'
  | 'landscaping'
  | 'moving'
  | 'other';

// Service type configurations with localized names
export const SERVICE_TYPES: Record<ServiceType, Localized<string>> = {
  plumbing: { en: 'Plumbing', ar: 'السباكة' },
  electrical: { en: 'Electrical', ar: 'الكهرباء' },
  hvac: { en: 'HVAC', ar: 'التكييف' },
  carpentry: { en: 'Carpentry', ar: 'النجارة' },
  painting: { en: 'Painting', ar: 'الطلاء' },
  cleaning: { en: 'Cleaning', ar: 'التنظيف' },
  landscaping: { en: 'Landscaping', ar: 'تنسيق الحدائق' },
  moving: { en: 'Moving', ar: 'النقل' },
  other: { en: 'Other', ar: 'أخرى' },
} as const;

export interface Location {
  lat: number;
  lng: number;
  address?: Localized<string>; // Localized address
}

export interface Provider extends BaseModel {
  userId: string; // Provider-agnostic user ID (could be Firebase UID, AWS Cognito, etc.)
  services: ServiceType[];
  businessName: Localized<string>; // Provider's business name
  description?: Localized<string>; // Provider description
  rating: number; // 0-5
  totalJobs: number;
  available: boolean;
  verified: boolean;
  location: Location;
}
