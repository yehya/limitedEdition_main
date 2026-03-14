// CONTEXT: register-aliases MUST be first import. It makes @/ path aliases
// work at runtime in Cloud Functions. Without this, all @/ imports fail.
import './register-aliases';
import * as admin from 'firebase-admin';

admin.initializeApp();

// CONTEXT: All Cloud Function exports. Firebase discovers functions by
// reading exports from this file. One export = one deployed function.
// Functions are organized by domain (user, job, ai) in separate folders.
export * from './functions/user';
export * from './functions/job';
export * from './functions/ai';
