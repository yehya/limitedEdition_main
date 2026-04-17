import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { isAdmin } from '../config/admin';

export const checkAdminStatus = async (
  data: any,
  context: functions.https.CallableContext
) => {
  try {
    // Verify user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const email = context.auth.token.email;
    const isAdminUser = isAdmin(email || '');

    return {
      success: true,
      isAdmin: isAdminUser,
      email: email,
    };
  } catch (error: any) {
    console.error('Error checking admin status:', error);
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to check admin status'
    );
  }
};
