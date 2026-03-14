import { PROVIDER } from './config/provider';

const initializeFirebase = async () => {
  const admin = require('firebase-admin');
  admin.initializeApp();
  console.log('Firebase initialized');
};

const initializeAWS = async () => {
  console.log('AWS Lambda initialized');
};

const initializeSupabase = async () => {
  console.log('Supabase Edge Functions initialized');
};

const initializeExpress = async () => {
  console.log('Express.js initialized');
};

export const initializeBackend = async () => {
  switch (PROVIDER.current) {
    case 'firebase':
      await initializeFirebase();
      break;
    case 'aws':
      await initializeAWS();
      break;
    case 'supabase':
      await initializeSupabase();
      break;
    case 'express':
      await initializeExpress();
      break;
    default:
      console.warn(`Unknown provider: ${PROVIDER.current}`);
  }
};
