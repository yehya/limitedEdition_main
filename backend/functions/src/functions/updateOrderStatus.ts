import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { isAdmin } from '../config/admin';

export const updateOrderStatus = async (request: any) => {
  const db = admin.firestore();

  try {
    // Verify user is authenticated
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    // Verify user is an admin
    const email = request.auth.token.email;
    if (!email || !isAdmin(email)) {
      throw new HttpsError(
        'permission-denied',
        'User is not authorized as an admin'
      );
    }

    const { orderId, status } = request.data;

    if (!orderId || !status) {
      throw new HttpsError(
        'invalid-argument',
        'Missing orderId or status'
      );
    }

    await db.collection('orders').doc(orderId).update({ status });

    return {
      success: true,
      data: { orderId, status },
    };
  } catch (error: any) {
    console.error('Error updating order status:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to update order status'
    );
  }
};
