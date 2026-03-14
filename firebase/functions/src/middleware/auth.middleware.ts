import { logger } from "firebase-functions/v1";
import { CallableRequest, HttpsError } from "firebase-functions/v2/https";

export const checkUserIsAuthenticated = (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be authenticated");
  }

  logger.info(`User authenticated`, { userId: request.auth.uid });
  return request.auth;
};
