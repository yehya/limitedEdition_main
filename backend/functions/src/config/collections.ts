// CONTEXT: Centralized collection name constants. Single source of truth
// for all collection names. Makes renaming easier and prevents typos.

export const COLLECTIONS = {
  USERS: 'users',
  CUSTOMERS: 'customers',
  PROVIDERS: 'providers',
  JOBS: 'jobs',
  CONVERSATIONS: 'conversations',
} as const;

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];
