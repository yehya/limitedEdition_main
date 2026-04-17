import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { isAdmin } from '../config/admin';

export const getOrders = async (request: any) => {
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

    const { limit = 20, offset = 0, status } = request.data;

    let query: FirebaseFirestore.Query = db.collection('orders');
    if (status && status !== 'all') {
      query = query.where('status', '==', status);
    }

    // Count total matching orders (for pagination UI)
    const countSnapshot = await query.count().get();
    const total = countSnapshot.data().count;

    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .offset(offset)
      .get();

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: orders,
      total,
    };
  } catch (error: any) {
    console.error('Error getting orders:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to get orders'
    );
  }
};
