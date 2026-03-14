// CONTEXT: Admin middleware. Checks if user is authenticated AND has
// admin privileges. Used by createAdminFunction creator.
// TODO: Implement admin check when user repository is created.

import { logger } from "../utils/logger.util";
import { HttpsError, CallableRequest } from "firebase-functions/v2/https";
import { checkUserIsAuthenticated } from "./auth.middleware";

export const checkIsAdmin = async (request: CallableRequest) => {
  const auth = checkUserIsAuthenticated(request);
  
  // TODO: Check if user is admin when repository is implemented
  // For now, just return authenticated user
  // const user = await userRepository.findById(auth.uid);
  // if (!user?.isAdmin) {
  //   throw new HttpsError("permission-denied", "User must be an admin");
  // }
  
  logger.info("Admin access granted", { userId: auth.uid });
  return auth;
};
