// CONTEXT: User function DTOs. Every Cloud Function must have typed
// request/response. Never return raw database models to the client.

import { UserRole } from "@models/user.model";

export interface GetUserRequest {}

export interface GetUserResponse {
  id: string;
  role: UserRole;
  name: string;
  phone: string;
  email?: string;
}
