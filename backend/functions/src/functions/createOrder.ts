import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';

export const createOrder = async (request: any) => {
  const db = admin.firestore();

  try {
    const { items, customerInfo, total, paymentMethod } = request.data;

    const validPaymentMethods = ['cod', 'instapay'];
    const method = validPaymentMethods.includes(paymentMethod) ? paymentMethod : 'cod';

    const order = {
      items,
      customerInfo,
      total,
      paymentMethod: method,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const orderRef = await db.collection('orders').add(order);

    return {
      success: true,
      orderId: orderRef.id,
    };
  } catch (error: any) {
    console.error('Error creating order:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to create order'
    );
  }
};
