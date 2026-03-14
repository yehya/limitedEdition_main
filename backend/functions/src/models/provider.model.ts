// CONTEXT: Provider model with services, rating, and verification status.

import { BaseModel } from './base.model';

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

export interface Location {
  lat: number;
  lng: number;
}

export interface Provider extends BaseModel {
  userId: string; // Provider-agnostic user ID (could be Firebase UID, AWS Cognito, etc.)
  services: ServiceType[];
  rating: number; // 0-5
  totalJobs: number;
  available: boolean;
  verified: boolean;
  location: Location;
}
