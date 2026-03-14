// CONTEXT: Provider middleware. Checks if user is authenticated AND is
// a verified provider. Used by createProviderFunction creator.
// TODO: Implement provider check when provider repository is created.

import { logger } from "../utils/logger.util";
import { HttpsError, CallableRequest } from "firebase-functions/v2/https";
import { checkUserIsAuthenticated } from "./auth.middleware";

export const checkIsProvider = async (request: CallableRequest) => {
  const auth = checkUserIsAuthenticated(request);
  
  // TODO: Check if user is verified provider when repository is implemented
  // For now, just return authenticated user
  // const provider = await providerRepository.findByUserId(auth.uid);
  // if (!provider?.verified) {
  //   throw new HttpsError("failed-precondition", "Provider must be verified");
  // }
  
  logger.info("Provider access granted", { userId: auth.uid });
  return auth;
};
