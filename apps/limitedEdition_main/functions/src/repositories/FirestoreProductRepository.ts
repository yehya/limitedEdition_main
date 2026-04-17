import * as admin from 'firebase-admin';
import { IProductRepository, Product } from './interfaces/IProductRepository';

export class FirestoreProductRepository implements IProductRepository {
  constructor(private db: admin.firestore.Firestore) {}

  async create(product: Product): Promise<string> {
    const productData = {
      ...product,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const productRef = await this.db.collection('products').add(productData);
    return productRef.id;
  }

  async findById(productId: string): Promise<Product | null> {
    const productDoc = await this.db.collection('products').doc(productId).get();

    if (!productDoc.exists) {
      return null;
    }

    return {
      id: productDoc.id,
      ...productDoc.data(),
    } as Product;
  }

  async findAll(limit = 50, offset = 0): Promise<Product[]> {
    const snapshot = await this.db
      .collection('products')
      .orderBy('name')
      .limit(limit)
      .offset(offset)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  }

  async update(productId: string, product: Partial<Product>): Promise<void> {
    await this.db.collection('products').doc(productId).update({
      ...product,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  async delete(productId: string): Promise<void> {
    await this.db.collection('products').doc(productId).delete();
  }
}
