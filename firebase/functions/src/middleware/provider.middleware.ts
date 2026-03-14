// CONTEXT: Provider middleware. Checks if user is authenticated AND is
// a verified provider. Used by createProviderFunction creator.

import { HttpsError, CallableRequest } from "firebase-functions/v2/https";
import { checkUserIsAuthenticated } from "./auth.middleware";
import { FirebaseProviderRepository } from "../db/firebase/provider.repository";

const providerRepository = new FirebaseProviderRepository();

export const checkIsProvider = async (request: CallableRequest) => {
  const auth = checkUserIsAuthenticated(request);
  const provider = await providerRepository.findByUserId(auth.uid);

  if (!provider) {
    throw new HttpsError("not-found", "Provider not found");
  }

  if (!provider.verified) {
    throw new HttpsError("permission-denied", "Provider must be verified");
  }

  return provider;
};
