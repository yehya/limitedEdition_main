import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';

export const getOrder = async (request: any) => {
  const db = admin.firestore();

  try {
    const { orderId } = request.data;

    const orderRef = db.collection('orders').doc(orderId);
    const doc = await orderRef.get();

    if (!doc.exists) {
      throw new HttpsError(
        'not-found',
        'Order not found'
      );
    }

    return {
      success: true,
      data: {
        id: doc.id,
        ...doc.data(),
      },
    };
  } catch (error: any) {
    console.error('Error getting order:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to get order'
    );
  }
};
