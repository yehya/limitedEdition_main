// CONTEXT: Database-agnostic pagination interface. Works with any database.
// Cursor-based pagination is preferred over offset-based for performance.

export interface PaginationOptions {
  limit?: number;
  cursor?: string;
  offset?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
  total?: number;
}
