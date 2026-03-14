// CONTEXT: Firebase implementation of base repository. Handles Firestore-specific
// operations and conversions. When migrating to Supabase, create SupabaseBaseRepository
// implementing the same IBaseRepository interface.

import { firestore } from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../../models/base.model";
import { IBaseRepository } from "../interfaces/base.repository.interface";
import { PaginationOptions, PaginatedResult } from "../interfaces/pagination.interface";
import { IQueryBuilder } from "../interfaces/query-builder.interface";
import { FirebaseQueryBuilder } from "./firebase-query-builder";
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

  async findManyPaginated(filters: Partial<T>, options: PaginationOptions): Promise<PaginatedResult<T>> {
    const limit = options.limit ?? 20;
    let query: firestore.Query = this.collection;
    
    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        query = query.where(key, "==", this.toFirestore(value));
      }
    }

    // Apply cursor if provided
    if (options.cursor) {
      const cursorDoc = await this.collection.doc(options.cursor).get();
      if (cursorDoc.exists) {
        query = query.startAfter(cursorDoc);
      }
    }

    // Fetch limit + 1 to check if there are more results
    const snapshot = await query.limit(limit + 1).get();
    const hasMore = snapshot.docs.length > limit;
    const items = snapshot.docs.slice(0, limit).map(doc => this.fromFirestore(doc.data()) as T);
    
    return {
      items,
      nextCursor: hasMore ? items[items.length - 1]?.id : undefined,
      hasMore,
    };
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  query(): IQueryBuilder<T> {
    return new FirebaseQueryBuilder<T>(this.collection, (data) => this.fromFirestore(data));
  }
}
