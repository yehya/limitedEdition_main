import { firestore } from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../../models/base.model";
import { IBaseRepository } from "../interfaces/base.repository.interface";
import { CollectionName } from "../../config/collections";

export abstract class FirebaseBaseRepository<T extends BaseModel> implements IBaseRepository<T> {
  protected db: firestore.Firestore;
  protected collection: firestore.CollectionReference;

  constructor(collectionName: CollectionName) {
    this.db = firestore();
    this.collection = firestore().collection(collectionName);
  }

  protected generateId(): string {
    return uuidv4();
  }

  protected toFirestore(data: any): any {
    if (data instanceof Date) {
      return firestore.Timestamp.fromDate(data);
    }
    if (Array.isArray(data)) {
      return data.map(item => this.toFirestore(item));
    }
    if (data && typeof data === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          result[key] = this.toFirestore(value);
        }
      }
      return result;
    }
    return data;
  }

  protected fromFirestore(data: any): any {
    if (data instanceof firestore.Timestamp) {
      return data.toDate();
    }
    if (Array.isArray(data)) {
      return data.map(item => this.fromFirestore(item));
    }
    if (data && typeof data === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(data)) {
        result[key] = this.fromFirestore(value);
      }
      return result;
    }
    return data;
  }

  async create(data: Omit<T, keyof BaseModel>, id?: string): Promise<T> {
    const now = new Date();
    const docRef = id ? this.collection.doc(id) : this.collection.doc(this.generateId());

    const document = {
      id: docRef.id,
      ...data,
      createdAt: now,
      updatedAt: now,
    } as T;

    await docRef.set(this.toFirestore(document));
    return document;
  }

  async update(id: string, data: Partial<Omit<T, keyof BaseModel>>): Promise<T> {
    const docRef = this.collection.doc(id);
    const now = new Date();

    const updateData = {
      ...data,
      updatedAt: now,
    };

    await docRef.update(this.toFirestore(updateData));
    const updated = await docRef.get();
    return this.fromFirestore(updated.data()) as T;
  }

  async findById(id: string): Promise<T | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? this.fromFirestore(doc.data()) as T : null;
  }

  async findMany(filters: Partial<T>): Promise<T[]> {
    let query: firestore.Query = this.collection;
    
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        query = query.where(key, "==", this.toFirestore(value));
      }
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => this.fromFirestore(doc.data()) as T);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  protected createQuery(): firestore.Query {
    return this.collection;
  }
}
