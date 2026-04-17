import * as functions from 'firebase-functions';
import { Container } from '../di/Container';
import { isAdmin } from '../config/admin';

export const deleteProduct = async (
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
