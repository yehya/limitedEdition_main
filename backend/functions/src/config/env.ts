// CONTEXT: Environment configuration. Detects if running in emulator
// or production. Use this to toggle features, logging, etc.

export const ENV = {
  isDevelopment: process.env.FUNCTIONS_EMULATOR === 'true',
  isProduction: process.env.FUNCTIONS_EMULATOR !== 'true',
} as const;
