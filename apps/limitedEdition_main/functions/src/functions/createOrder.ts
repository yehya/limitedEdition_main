import * as functions from 'firebase-functions';
import { Container } from '../di/Container';

export const createOrder = async (
  data: any,
  context: functions.https.CallableContext
) => {
  try {
    const { items, customerInfo, total } = data;

    if (!items || !customerInfo || !total) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required fields'
      );
    }

    const container = Container.getInstance();
    const orderService = container.getOrderService();

    const result = await orderService.createOrder({
      items,
      customerInfo,
      total,
      status: 'pending',
    });

    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    console.error('Error creating order:', error);
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to create order'
    );
  }
};
