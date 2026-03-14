// CONTEXT: Provider configuration. Abstracts away cloud provider specifics.
// Allows switching between Firebase, AWS Lambda, Supabase Edge, etc.

export type CloudProvider = 'firebase' | 'aws' | 'supabase' | 'express' | 'custom';

export const PROVIDER = {
  // Auto-detect provider based on environment
  current: process.env.CLOUD_PROVIDER as CloudProvider ?? 'firebase',
  
  // Provider-specific configurations
  isFirebase: (process.env.CLOUD_PROVIDER ?? 'firebase') === 'firebase',
  isAWS: process.env.CLOUD_PROVIDER === 'aws',
  isSupabase: process.env.CLOUD_PROVIDER === 'supabase',
  isExpress: process.env.CLOUD_PROVIDER === 'express',
} as const;

// Environment detection (provider-agnostic)
export const ENV = {
  isDevelopment: process.env.NODE_ENV === 'development' || !!process.env.LOCAL_DEV,
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;
