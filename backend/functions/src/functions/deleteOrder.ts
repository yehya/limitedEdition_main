import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { isAdmin } from '../config/admin';

const db = admin.firestore();

export const deleteOrderFn = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const email = context.auth.token.email;
  if (!isAdmin(email)) {
    throw new functions.https.HttpsError('permission-denied', 'User is not an admin');
  }

  const { orderId } = data;

  if (!orderId) {
    throw new functions.https.HttpsError('invalid-argument', 'Order ID is required');
  }

  try {
    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Order not found');
    }

    await orderRef.delete();

    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new functions.https.HttpsError('internal', 'Error deleting order');
  }
});
