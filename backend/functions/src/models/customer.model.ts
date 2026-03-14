import { BaseModel } from './base.model';

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
}

export interface Customer extends BaseModel {
  userId: string; // Provider-agnostic user ID (could be Firebase UID, AWS Cognito, etc.)
  addresses: Address[];
  defaultAddressId?: string;
  abTestGroup: 'control' | 'variant';
}
