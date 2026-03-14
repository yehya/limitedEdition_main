// CONTEXT: Base callable function creator. No auth checks - use for
// public endpoints only (e.g., health checks, public data). For most
// functions, use createAuthenticatedFunction instead.

import { CallableRequest, onCall } from "firebase-functions/v2/https";
import { logger } from "../logger.util";

export type CallableFunction<T, R> = (data: T, context: CallableRequest<T>) => Promise<R>;

export const createFunction = <T, R>(handler: CallableFunction<T, R>) => {
  return onCall<T>(async (request) => {
    try {
      return await handler(request.data, request);
    } catch (error) {
      logger.error("Function error", { error });
      throw error;
    }
  });
};
