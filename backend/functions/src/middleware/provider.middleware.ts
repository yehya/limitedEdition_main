import { logger } from "../utils/logger.util";
import { CallableRequest } from "firebase-functions/v2/https";
import { checkUserIsAuthenticated } from "./auth.middleware";

export const checkIsProvider = async (request: CallableRequest) => {
  const auth = checkUserIsAuthenticated(request);
  
  logger.info("Provider access granted", { userId: auth.auth.uid });
  return auth;
};
