import * as admin from 'firebase-admin';
import { IOrderRepository, Order } from './interfaces/IOrderRepository';

export class FirestoreOrderRepository implements IOrderRepository {
  constructor(private db: admin.firestore.Firestore) {}

  async create(order: Order): Promise<string> {
    const orderData = {
      ...order,
      status: order.status || 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const orderRef = await this.db.collection('orders').add(orderData);
    return orderRef.id;
  }

  async findById(orderId: string): Promise<Order | null> {
    const orderDoc = await this.db.collection('orders').doc(orderId).get();

    if (!orderDoc.exists) {
      return null;
    }

    return {
      id: orderDoc.id,
      ...orderDoc.data(),
    } as Order;
  }

  async findAll(limit = 50, offset = 0): Promise<Order[]> {
    const snapshot = await this.db
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .offset(offset)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  }

  async updateStatus(orderId: string, status: string): Promise<void> {
    await this.db.collection('orders').doc(orderId).update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  async delete(orderId: string): Promise<void> {
    await this.db.collection('orders').doc(orderId).delete();
  }
}
