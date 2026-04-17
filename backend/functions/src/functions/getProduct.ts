import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';

export const getProduct = async (request: any) => {
  const db = admin.firestore();

  try {
    const { productId } = request.data;

    const productRef = db.collection('products').doc(productId);
    const doc = await productRef.get();

    if (!doc.exists) {
      throw new HttpsError(
        'not-found',
        'Product not found'
      );
    }

    return {
      success: true,
      data: {
        id: doc.id,
        ...doc.data(),
      },
    };
  } catch (error: any) {
    console.error('Error getting product:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to get product'
    );
  }
};
