// CONTEXT: Database-agnostic query builder interface. Abstracts away
// Firestore-specific query syntax. Any database (Firestore, Supabase, etc.)
// can implement this interface with their own query syntax.

export type QueryOperator = "==" | "!=" | ">" | ">=" | "<" | "<=" | "in" | "array-contains";
export type OrderDirection = "asc" | "desc";

export interface IQueryBuilder<T> {
  where(field: keyof T | string, operator: QueryOperator, value: any): IQueryBuilder<T>;
  orderBy(field: keyof T | string, direction: OrderDirection): IQueryBuilder<T>;
  limit(count: number): IQueryBuilder<T>;
  offset(count: number): IQueryBuilder<T>;
  execute(): Promise<T[]>;
  executeOne(): Promise<T | null>;
  count(): Promise<number>;
}
