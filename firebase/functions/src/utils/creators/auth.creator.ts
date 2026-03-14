import { onCall, CallableRequest } from "firebase-functions/v2/https";
import { checkUserIsAuthenticated } from "../../middleware/auth.middleware";

export type AuthenticatedRequest<T> = CallableRequest<T> & {
  auth: NonNullable<CallableRequest<T>["auth"]>;
};

export type AuthenticatedFunction<T, R> = (data: T, context: AuthenticatedRequest<T>) => Promise<R>;

export const createAuthenticatedFunction = <T, R>(handler: AuthenticatedFunction<T, R>) => {
  return onCall<T>({ invoker: "public" }, async (request) => {
    try {
      checkUserIsAuthenticated(request);
      return await handler(request.data, request as AuthenticatedRequest<T>);
    } catch (error) {
      console.error("Authenticated function error:", error);
      throw error;
    }
  });
};
