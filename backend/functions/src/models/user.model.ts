import { BaseModel } from './base.model';

export type UserRole = 'customer' | 'provider' | 'admin';

export interface User extends BaseModel {
  userId: string;
  role: UserRole;
  name: string;
  phone: string;
  email?: string;
  isAdmin?: boolean;
  preferredLanguage?: 'en' | 'ar';
}
