import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';

const DEFAULTS = {
  instapayPhone: '01XXXXXXXXX',
  instapayHandle: '@limitededition',
};

export const getPaymentSettings = async (_request: any) => {
  const db = admin.firestore();

  try {
    const doc = await db.collection('settings').doc('payment').get();
    const data = doc.exists ? doc.data() : null;

    return {
      success: true,
      data: {
        instapayPhone: data?.instapayPhone || DEFAULTS.instapayPhone,
        instapayHandle: data?.instapayHandle || DEFAULTS.instapayHandle,
      },
    };
  } catch (error: any) {
    console.error('Error getting payment settings:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to get payment settings'
    );
  }
};
