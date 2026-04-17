import * as functions from 'firebase-functions';
import { Container } from '../di/Container';

export const getProducts = async (
  data: any,
  context: functions.https.CallableContext
) => {
  try {
    const container = Container.getInstance();
    const productService = container.getProductService();

    const products = await productService.getAllProducts();

    return {
      success: true,
      data: products,
    };
  } catch (error: any) {
    console.error('Error getting products:', error);
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to get products'
    );
  }
};
