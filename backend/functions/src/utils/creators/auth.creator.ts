// CONTEXT: Creates authenticated callable functions. Auto-checks that user
// is logged in before executing handler. Supports CallableOptions for secrets.

import { onCall, CallableRequest, CallableOptions } from "firebase-functions/v2/https";
import { checkUserIsAuthenticated } from "../../middleware/auth.middleware";

export type AuthenticatedRequest<T> = CallableRequest<T> & {
  auth: NonNullable<CallableRequest<T>["auth"]>;
};

export type AuthenticatedFunction<T, R> = (data: T, context: AuthenticatedRequest<T>) => Promise<R>;

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
      checkUserIsAuthenticated(request);
      return await handler(request.data, request as AuthenticatedRequest<T>);
    } catch (error) {
      console.error("Authenticated function error:", error);
      throw error;
    }
  });
};
