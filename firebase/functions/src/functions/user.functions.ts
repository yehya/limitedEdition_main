import { createAuthenticatedFunction } from "../utils/creators/auth.creator";
import { FirebaseUserRepository } from "../db/firebase/user.repository";
import { UserService } from "../services/user.service";

const userRepo = new FirebaseUserRepository();
const userService = new UserService(userRepo);

export const getUser = createAuthenticatedFunction(async (data, context) => {
  const userId = context.auth.uid;
  return userService.getUserById(userId);
});

export const updateUserProfile = createAuthenticatedFunction(async (data: { name?: string; phone?: string }, context) => {
  const userId = context.auth.uid;
  return userService.updateUser(userId, data);
});
