import * as functions from 'firebase-functions';
import { Container } from '../di/Container';

export const getProduct = async (
  data: any,
  context: functions.https.CallableContext
) => {
  try {
    const { productId } = data;

    if (!productId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing productId'
      );
    }

    const container = Container.getInstance();
    const productService = container.getProductService();

    const product = await productService.getProduct(productId);

    return {
      success: true,
      data: product,
    };
  } catch (error: any) {
    console.error('Error getting product:', error);
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to get product'
    );
  }
};
