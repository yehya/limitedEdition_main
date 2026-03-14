// CONTEXT: Get authenticated user's profile data.
// Uses createAuthenticatedFunction which auto-checks auth.
// Returns sanitized user data via DTO (never raw database model).

import { createAuthenticatedFunction } from "@utils/creators/auth.creator";
import { FirebaseUserRepository } from "@db/firebase/user.repository";
import { UserService } from "@services/user.service";
import type { GetUserRequest, GetUserResponse } from "./getUser.dto";

const userRepo = new FirebaseUserRepository();
const userService = new UserService(userRepo);

export const getUser = createAuthenticatedFunction<GetUserRequest, GetUserResponse>(
  async (data, context) => {
    const userId = context.auth.uid;
    const user = await userService.getUserById(userId);
    
    return {
      id: user.id,
      role: user.role,
      name: user.name,
      phone: user.phone,
      email: user.email,
    };
  }
);
