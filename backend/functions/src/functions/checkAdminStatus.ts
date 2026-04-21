import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { isAdmin } from '../config/admin';

const ADMIN_EMAILS = [
  'yehyaawad.lp@gmail.com',
  'awaadhabiba@gmail.com',
  'yomaxer9@gmail.com',
  'fidelkibou@gmail.com',
  'testadmin@example.com'
];

export const checkAdminStatus = async (request: any) => {
  try {
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const email = request.auth.token.email;
    const isAdminUser = ADMIN_EMAILS.includes(email?.toLowerCase() || '');

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
