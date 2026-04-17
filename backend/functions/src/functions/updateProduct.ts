import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { isAdmin } from '../config/admin';

export const updateProduct = async (request: any) => {
  const db = admin.firestore();

  try {
    // Verify user is authenticated and is admin
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const email = request.auth.token.email;
    if (!isAdmin(email || '')) {
      throw new HttpsError(
        'permission-denied',
        'User must be an admin'
      );
    }

    const { productId, productData } = request.data;

    if (!productId || !productData) {
      throw new HttpsError(
        'invalid-argument',
        'Missing productId or productData'
      );
    }

    await db.collection('products').doc(productId).update(productData);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Error updating product:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to update product'
    );
  }
};
