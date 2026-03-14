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
