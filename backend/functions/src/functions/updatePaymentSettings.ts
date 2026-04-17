import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { isAdmin } from '../config/admin';

export const updatePaymentSettings = async (request: any) => {
  const db = admin.firestore();

  try {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated');
    }

    const email = request.auth.token.email;
    if (!isAdmin(email || '')) {
      throw new HttpsError('permission-denied', 'User must be an admin');
    }

    const { instapayPhone, instapayHandle } = request.data;

    if (typeof instapayPhone !== 'string' || typeof instapayHandle !== 'string') {
      throw new HttpsError('invalid-argument', 'instapayPhone and instapayHandle must be strings');
    }

    await db.collection('settings').doc('payment').set(
      {
        instapayPhone: instapayPhone.trim(),
        instapayHandle: instapayHandle.trim(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedBy: email,
      },
      { merge: true }
    );

    return { success: true };
  } catch (error: any) {
    console.error('Error updating payment settings:', error);
    throw new HttpsError('internal', error.message || 'Failed to update payment settings');
  }
};
