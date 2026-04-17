import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { isAdmin } from '../config/admin';
import { getStorage } from 'firebase-admin/storage';

export const deleteProduct = async (request: any) => {
  const db = admin.firestore();
  const storage = getStorage();

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

    const { productId } = request.data;

    if (!productId) {
      throw new HttpsError(
        'invalid-argument',
        'Missing productId'
      );
    }

    // Get product to retrieve image URL
    const productDoc = await db.collection('products').doc(productId).get();
    
    if (!productDoc.exists) {
      throw new HttpsError(
        'not-found',
        'Product not found'
      );
    }

    const product = productDoc.data();

    // Delete image from Firebase Storage if it exists
    if (product?.image) {
      try {
        // Extract file path from Firebase Storage URL
        const imageUrl = product.image;
        const matches = imageUrl.match(/\/o\/(.*?)\?alt=media/);
        
        if (matches && matches[1]) {
          const filePath = decodeURIComponent(matches[1]);
          const file = storage.bucket().file(filePath);
          await file.delete();
        }
      } catch (storageError) {
        console.error('Error deleting image from storage:', storageError);
        // Continue with product deletion even if image deletion fails
      }
    }

    await db.collection('products').doc(productId).delete();

    return {
      success: true,
      data: { productId },
    };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    throw new HttpsError(
      'internal',
      error.message || 'Failed to delete product'
    );
  }
};
