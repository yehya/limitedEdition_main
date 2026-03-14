export const COLLECTIONS = {
  USERS: "users",
  CUSTOMERS: "customers",
  PROVIDERS: "providers",
  JOBS: "jobs",
  CONVERSATIONS: "conversations",
  ADMIN_CONFIG: "admin",
} as const;

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];
