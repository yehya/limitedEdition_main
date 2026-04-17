import * as functions from 'firebase-functions';
import { Container } from '../di/Container';

export const updateProduct = async (
  data: any,
  context: functions.https.CallableContext
) => {
  try {
    const { productId, productData } = data;

    if (!productId || !productData) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing productId or productData'
      );
    }

    const container = Container.getInstance();
    const productService = container.getProductService();

    await productService.updateProduct(productId, productData);

    return {
      success: true,
      data: { productId },
    };
  } catch (error: any) {
    console.error('Error updating product:', error);
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to update product'
    );
  }
};
