export const IS_DEV = process.env.FUNCTIONS_EMULATOR === 'true';

export const ENV = {
  isDevelopment: IS_DEV,
  isProduction: !IS_DEV,
} as const;
