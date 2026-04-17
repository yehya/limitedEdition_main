import * as functions from 'firebase-functions';
import { Container } from '../di/Container';
import { isAdmin } from '../config/admin';

export const updateOrderStatus = async (
  data: any,
  context: functions.https.CallableContext
) => {
  try {
    // Verify user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    // Verify user is an admin
    const email = context.auth.token.email;
    if (!email || !isAdmin(email)) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'User is not authorized as an admin'
      );
    }

    const { orderId, status } = data;

    if (!orderId || !status) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing orderId or status'
      );
    }

    const container = Container.getInstance();
    const orderService = container.getOrderService();

    await orderService.updateOrderStatus(orderId, status);

    return {
      success: true,
      data: { orderId, status },
    };
  } catch (error: any) {
    console.error('Error updating order status:', error);
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to update order status'
    );
  }
};
