// CONTEXT: Update user profile DTO. Only name and phone are updatable.

export interface UpdateUserProfileRequest {
  name?: string;
  phone?: string;
}

export interface UpdateUserProfileResponse {
  id: string;
  name: string;
  phone: string;
}
