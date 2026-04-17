import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';

export const getProducts = async (request: any) => {
  const db = admin.firestore();

  try {
    const { limit = 50, offset = 0 } = request.data;

    const productsRef = db.collection('products');
    const snapshot = await productsRef
      .orderBy('name')
      .limit(limit)
      .offset(offset)
      .get();

    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: products,
    };
  } catch (error: any) {
    console.error('Error getting products:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to get products'
    );
  }
};
