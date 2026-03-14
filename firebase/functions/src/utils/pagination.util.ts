export interface PaginatedResult<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
  total?: number;
}

export interface PaginationOptions {
  limit?: number;
  cursor?: string;
}

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 500;

export function validatePageSize(limit?: number): number {
  if (!limit) return DEFAULT_PAGE_SIZE;
  if (limit > MAX_PAGE_SIZE) return MAX_PAGE_SIZE;
  if (limit < 1) return DEFAULT_PAGE_SIZE;
  return limit;
}
