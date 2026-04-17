import * as functions from 'firebase-functions';
import { Container } from '../di/Container';

export const updateOrderStatus = async (
  data: any,
  context: functions.https.CallableContext
) => {
  try {
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
