// CONTEXT: User model with roles and contact information.

import { BaseModel } from './base.model';

export type UserRole = 'customer' | 'provider' | 'admin';

export interface User extends BaseModel {
  userId: string; // Provider-agnostic user ID (could be Firebase UID, AWS Cognito, etc.)
  role: UserRole;
  name: string; // User's actual name (not localized)
  phone: string;
  email?: string;
  isAdmin?: boolean;
  preferredLanguage?: 'en' | 'ar'; // User's language preference
}
