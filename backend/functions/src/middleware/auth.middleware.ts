// CONTEXT: Authentication middleware. Checks if user is logged in.
// Used by createAuthenticatedFunction creator. Throws error if no auth.

import { logger } from "../utils/logger.util";
import { CallableRequest, HttpsError } from "firebase-functions/v2/https";
import { SupportedLanguage, getLanguageFromHeader } from "../types/localization.types";

export interface AuthenticatedContext {
  auth: NonNullable<CallableRequest["auth"]>;
  language: SupportedLanguage;
}

export const checkUserIsAuthenticated = (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be authenticated");
  }

  // Detect language from Accept-Language header
  const language = getLanguageFromHeader(request.headers?.['accept-language']);
  
  logger.info(`User authenticated`, { 
    userId: request.auth.uid, 
    language 
  });
  
  return {
    auth: request.auth,
    language,
  };
};
