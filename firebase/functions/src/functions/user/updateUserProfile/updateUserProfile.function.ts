// CONTEXT: Update authenticated user's profile (name, phone).
// Uses createAuthenticatedFunction which auto-checks auth.
// Returns updated user data via DTO.

import { createAuthenticatedFunction } from "@utils/creators/auth.creator";
import { FirebaseUserRepository } from "@db/firebase/user.repository";
import { UserService } from "@services/user.service";
import type { UpdateUserProfileRequest, UpdateUserProfileResponse } from "./updateUserProfile.dto";

const userRepo = new FirebaseUserRepository();
const userService = new UserService(userRepo);

export const updateUserProfile = createAuthenticatedFunction<UpdateUserProfileRequest, UpdateUserProfileResponse>(
  async (data, context) => {
    const userId = context.auth.uid;
    const user = await userService.updateUser(userId, data);
    
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
    };
  }
);
