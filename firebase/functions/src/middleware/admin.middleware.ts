import { HttpsError, CallableRequest } from "firebase-functions/v2/https";
import { checkUserIsAuthenticated } from "./auth.middleware";
import { FirebaseUserRepository } from "../db/firebase/user.repository";

const userRepository = new FirebaseUserRepository();

export const checkIsAdmin = async (request: CallableRequest) => {
  const auth = checkUserIsAuthenticated(request);
  const user = await userRepository.findById(auth.uid);

  if (!user) {
    throw new HttpsError("not-found", "User not found");
  }

  if (!user.isAdmin) {
    throw new HttpsError("permission-denied", "Admin access required");
  }

  return user;
};
