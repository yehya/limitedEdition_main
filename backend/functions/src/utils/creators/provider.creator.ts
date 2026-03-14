// CONTEXT: Creates provider-only callable functions. Auto-checks that user
// is authenticated AND is a verified provider. Supports CallableOptions for
// secrets (e.g., { secrets: ["SMS_API_KEY"] }).

import { onCall, CallableOptions } from "firebase-functions/v2/https";
import { checkIsProvider } from "../../middleware/provider.middleware";
import { CallableFunction } from "./base.creator";
import { logger } from "firebase-functions/v1";

/**
 * Create a provider-only callable function.
 * Optionally pass onCall options (e.g., { secrets: ["TWILIO_API_KEY"] }).
 */
export const createProviderFunction = <T, R>(
  handler: CallableFunction<T, R>,
  options?: CallableOptions,
) => {
  const mergedOptions = { invoker: "public" as const, ...options };

  return onCall<T>(mergedOptions, async (request) => {
    try {
      await checkIsProvider(request);
      logger.info("Provider function call:", { request: request.data });
      return await handler(request.data, request);
    } catch (error) {
      console.error("Provider function error:", error);
      throw error;
    }
  });
};
