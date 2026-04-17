import * as functions from 'firebase-functions';
import { Container } from '../di/Container';
import { isAdmin } from '../config/admin';

export const createProduct = async (
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

    const { product } = data;

    if (!product) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing product data'
      );
    }

    const container = Container.getInstance();
    const productService = container.getProductService();

    const result = await productService.createProduct(product);

    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    console.error('Error creating product:', error);
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to create product'
    );
  }
};
