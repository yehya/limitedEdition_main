// CONTEXT: User model with roles and contact information.

import { BaseModel } from './base.model';

export type UserRole = 'customer' | 'provider' | 'admin';

export interface User extends BaseModel {
  userId: string; // Firebase Auth UID
  role: UserRole;
  name: string;
  phone: string;
  email?: string;
  isAdmin?: boolean;
}
