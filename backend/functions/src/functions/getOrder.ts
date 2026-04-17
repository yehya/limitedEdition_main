import * as functions from 'firebase-functions';
import { Container } from '../di/Container';

export const getOrder = async (
  data: any,
  context: functions.https.CallableContext
) => {
  try {
    const { orderId } = data;

    if (!orderId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing orderId'
      );
    }

    const container = Container.getInstance();
    const orderService = container.getOrderService();

    const order = await orderService.getOrder(orderId);

    return {
      success: true,
      data: order,
    };
  } catch (error: any) {
    console.error('Error getting order:', error);
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to get order'
    );
  }
};
