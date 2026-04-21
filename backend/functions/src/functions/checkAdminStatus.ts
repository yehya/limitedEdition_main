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
    console.log('Checking admin status for email:', email);
    console.log('Email lowercase:', email?.toLowerCase());
    const isAdminUser = isAdmin(email || '');
    console.log('Is admin result:', isAdminUser);

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
