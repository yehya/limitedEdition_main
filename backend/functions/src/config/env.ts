// CONTEXT: Environment configuration. DEPRECATED - use provider.ts instead.
// This file is kept for backward compatibility.

export const ENV = {
  isDevelopment: process.env.NODE_ENV === 'development' || !!process.env.LOCAL_DEV,
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;
