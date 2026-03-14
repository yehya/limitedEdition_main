import { onCall, CallableOptions } from "firebase-functions/v2/https";
import { checkIsAdmin } from "../../middleware/admin.middleware";
import { CallableFunction } from "./base.creator";
import { logger } from "firebase-functions/v1";

export const createAdminFunction = <T, R>(
  handler: CallableFunction<T, R>,
  options?: CallableOptions,
) => {
  const mergedOptions = { invoker: "public" as const, ...options };

  return onCall<T>(mergedOptions, async (request) => {
    try {
      await checkIsAdmin(request);
      logger.info("Admin function call:", { request: request.data });
      return await handler(request.data, request);
    } catch (error) {
      console.error("Admin function error:", error);
      throw error;
    }
  });
};
