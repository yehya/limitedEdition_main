// CONTEXT: register-aliases MUST be first import. It makes @/ path aliases
// work at runtime in Cloud Functions. Without this, all @/ imports fail.
import './register-aliases';
import { initializeBackend } from './init';

// Initialize the appropriate backend (Firebase, AWS, Supabase, etc.)
initializeBackend();

// CONTEXT: All function exports. The cloud provider discovers functions by
// reading exports from this file. One export = one deployed function.
// Add your function exports here when ready.

/*
Example:
import { getUser } from './functions/user/getUser/getUser.function';
export { getUser };
*/
