import * as functions from 'firebase-functions';
import { Container } from '../di/Container';

export const deleteProduct = async (
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

    await productService.deleteProduct(productId);

    return {
      success: true,
      data: { productId },
    };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to delete product'
    );
  }
};
