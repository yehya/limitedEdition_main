import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { isAdmin } from '../config/admin';

export const deleteOrderFn = async (request: any) => {
  const db = admin.firestore();

  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  const email = request.auth.token.email;
  if (!email || !isAdmin(email)) {
    throw new HttpsError('permission-denied', 'User is not an admin');
  }

  const { orderId } = request.data;

  if (!orderId) {
    throw new HttpsError('invalid-argument', 'Order ID is required');
  }

  try {
    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      throw new HttpsError('not-found', 'Order not found');
    }

    await orderRef.delete();

    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new HttpsError('internal', 'Error deleting order');
  }
};
