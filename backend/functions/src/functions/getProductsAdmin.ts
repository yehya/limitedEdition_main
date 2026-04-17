import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { isAdmin } from '../config/admin';

export const getProductsAdmin = async (
  data: any,
  context: functions.https.CallableContext
) => {
  const db = admin.firestore();

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

    const { limit = 50, offset = 0 } = data;

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
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to get products'
    );
  }
};
