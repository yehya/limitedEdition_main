import * as admin from 'firebase-admin';

admin.initializeApp();

// Export all Cloud Functions
export * from './functions/user.functions';
export * from './functions/job.functions';
export * from './functions/ai.functions';
