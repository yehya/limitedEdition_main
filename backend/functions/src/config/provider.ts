export type CloudProvider = 'firebase' | 'aws' | 'supabase' | 'express' | 'custom';

export const PROVIDER = {
  current: process.env.CLOUD_PROVIDER as CloudProvider ?? 'firebase',
  isFirebase: (process.env.CLOUD_PROVIDER ?? 'firebase') === 'firebase',
  isAWS: process.env.CLOUD_PROVIDER === 'aws',
  isSupabase: process.env.CLOUD_PROVIDER === 'supabase',
  isExpress: process.env.CLOUD_PROVIDER === 'express',
} as const;

export const ENV = {
  isDevelopment: process.env.NODE_ENV === 'development' || !!process.env.LOCAL_DEV,
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;
