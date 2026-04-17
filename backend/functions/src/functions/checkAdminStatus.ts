import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { isAdmin } from '../config/admin';

export const checkAdminStatus = async (request: any) => {
  try {
    // Verify user is authenticated
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const email = request.auth.token.email;
    const isAdminUser = isAdmin(email || '');

    return {
      success: true,
      isAdmin: isAdminUser,
      email: email,
    };
  } catch (error: any) {
    console.error('Error checking admin status:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to check admin status'
    );
  }
};
