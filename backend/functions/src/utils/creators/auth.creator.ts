// CONTEXT: Creates authenticated callable functions. Auto-checks that user
// is logged in before executing handler. Supports CallableOptions for secrets.

import { onCall, CallableRequest, CallableOptions } from "firebase-functions/v2/https";
import { checkUserIsAuthenticated, AuthenticatedContext } from "../../middleware/auth.middleware";
import { logger } from "../logger.util";

export type AuthenticatedRequest<T> = CallableRequest<T> & {
  auth: NonNullable<CallableRequest<T>["auth"]>;
  language: import("../../types/localization.types").SupportedLanguage;
};

export type AuthenticatedFunction<T, R> = (
  data: T, 
  context: AuthenticatedRequest<T>
) => Promise<R>;

/**
 * Create an authenticated callable function.
 * Optionally pass onCall options (e.g., { secrets: ["OPENAI_API_KEY"] }).
 */
export const createAuthenticatedFunction = <T, R>(
  handler: AuthenticatedFunction<T, R>,
  options?: CallableOptions,
) => {
  const mergedOptions = { invoker: "public" as const, ...options };
  
  return onCall<T>(mergedOptions, async (request) => {
    try {
      const authContext = checkUserIsAuthenticated(request);
      
      // Augment request with auth and language
      const augmentedRequest: AuthenticatedRequest<T> = {
        ...request,
        auth: authContext.auth,
        language: authContext.language,
      };
      
      return await handler(request.data, augmentedRequest);
    } catch (error) {
      logger.error("Authenticated function error", { error });
      throw error;
    }
  });
};
