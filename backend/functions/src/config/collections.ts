export const ENTITIES = {
  USERS: 'users',
  CUSTOMERS: 'customers',
  PROVIDERS: 'providers',
  JOBS: 'jobs',
  CONVERSATIONS: 'conversations',
} as const;

export type EntityName = typeof ENTITIES[keyof typeof ENTITIES];

export const COLLECTIONS = ENTITIES;
export type CollectionName = EntityName;
