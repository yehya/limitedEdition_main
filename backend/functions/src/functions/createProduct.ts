import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { isAdmin } from '../config/admin';

export const createProduct = async (request: any) => {
  const db = admin.firestore();

  try {
    // Verify user is authenticated
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    // Verify user is an admin
    const email = request.auth.token.email;
    if (!email || !isAdmin(email)) {
      throw new HttpsError(
        'permission-denied',
        'User is not authorized as an admin'
      );
    }

    const { product } = request.data;

    if (!product) {
      throw new HttpsError(
        'invalid-argument',
        'Missing product data'
      );
    }

    const productRef = await db.collection('products').add(product);

    return {
      success: true,
      data: { id: productRef.id, ...product },
    };
  } catch (error: any) {
    console.error('Error creating product:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to create product'
    );
  }
};
