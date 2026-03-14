import { firestore } from "firebase-admin";
import { IQueryBuilder, QueryOperator, OrderDirection } from "../interfaces/query-builder.interface";

export class FirebaseQueryBuilder<T> implements IQueryBuilder<T> {
  private query: firestore.Query;
  private converter: (data: any) => T;

  constructor(query: firestore.Query, converter: (data: any) => T) {
    this.query = query;
    this.converter = converter;
  }

  where(field: string, operator: QueryOperator, value: any): IQueryBuilder<T> {
    const firestoreOperator = operator as firestore.WhereFilterOp;
    this.query = this.query.where(field, firestoreOperator, value);
    return this;
  }

  orderBy(field: string, direction: OrderDirection): IQueryBuilder<T> {
    this.query = this.query.orderBy(field, direction);
    return this;
  }

  limit(count: number): IQueryBuilder<T> {
    this.query = this.query.limit(count);
    return this;
  }

  offset(count: number): IQueryBuilder<T> {
    this.query = this.query.offset(count);
    return this;
  }

  async execute(): Promise<T[]> {
    const snapshot = await this.query.get();
    return snapshot.docs.map(doc => this.converter(doc.data()));
  }

  async executeOne(): Promise<T | null> {
    const snapshot = await this.query.limit(1).get();
    return snapshot.empty ? null : this.converter(snapshot.docs[0].data());
  }

  async count(): Promise<number> {
    const snapshot = await this.query.count().get();
    return snapshot.data().count;
  }
}
