// CONTEXT: Pagination utilities. Validates and limits page sizes.
// Firebase charges per document read, so we enforce reasonable limits.

export interface PaginationRequest {
  page?: number;
  limit?: number;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  hasMore: boolean;
  total?: number;
}

/**
 * Validate and normalize pagination parameters.
 * Enforces maximum limit to control costs.
 */
export function validatePagination(
  request: PaginationRequest
): { page: number; limit: number } {
  const page = Math.max(1, request.page ?? 1);
  const limit = Math.min(500, Math.max(1, request.limit ?? 20));
  
  return { page, limit };
}

/**
 * Calculate pagination metadata for responses.
 */
export function calculatePagination(
  page: number,
  limit: number,
  totalItems: number
): PaginationResponse {
  const totalPages = Math.ceil(totalItems / limit);
  const hasMore = page < totalPages;
  
  return {
    page,
    limit,
    hasMore,
    total: totalItems,
  };
}
