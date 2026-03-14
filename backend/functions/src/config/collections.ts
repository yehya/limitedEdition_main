// CONTEXT: Centralized table/collection name constants. Single source of truth
// for all data entity names. Makes renaming easier and prevents typos.
// Works with any database (Firestore collections, Supabase tables, etc.)

export const ENTITIES = {
  USERS: 'users',
  CUSTOMERS: 'customers',
  PROVIDERS: 'providers',
  JOBS: 'jobs',
  CONVERSATIONS: 'conversations',
} as const;

export type EntityName = typeof ENTITIES[keyof typeof ENTITIES];

// Backward compatibility
export const COLLECTIONS = ENTITIES;
export type CollectionName = EntityName;
