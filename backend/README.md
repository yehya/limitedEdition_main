# SuperHome Backend

## Overview
This is the backend services layer for SuperHome. Currently implemented with Firebase Cloud Functions, but designed to be database-agnostic and support multiple backends.

## Architecture
- **Framework-Only**: Infrastructure and abstractions, no business logic yet
- **Database Agnostic**: Easy migration to Supabase, MongoDB, etc.
- **Type-Safe**: Full TypeScript with strict typing
- **LLM-Optimized**: Small files, clear naming, explicit imports

## Structure
```
backend/
├── functions/          ← Firebase Cloud Functions
│   ├── src/           ← Source code
│   ├── package.json   ← Dependencies
│   └── tsconfig.json  ← TypeScript config
└── firebase.json      ← Firebase configuration
```

## Quick Start

### Prerequisites
- Node.js 20+
- Bun (for local development)
- Firebase CLI

### Setup
```bash
cd backend
bun install
firebase login
firebase use superhome-testing
```

### Development
```bash
# Start Firebase emulators
bun run serve

# Build functions
bun run build

# Watch mode
bun run build:watch
```

### Deployment
```bash
# Deploy functions only
bun run deploy

# View logs
bun run logs
```

## Key Features

### Database Abstraction
- Repository pattern with interfaces
- Query builder abstraction
- Easy migration to other databases

### Function Creators
- `createAuthenticatedFunction` - Auth required
- `createAdminFunction` - Admin only
- `createProviderFunction` - Provider only
- `createTrigger` - Firestore triggers
- `createScheduledFunction` - Cron jobs

### Middleware
- Authentication checks
- Role-based access control
- Error handling

### Utilities
- Pagination helpers
- Type-safe query builders
- Runtime path aliases

## Adding Business Logic

When ready to add business logic:

1. **Create Repository Interface**
   ```typescript
   // db/interfaces/entity.repository.interface.ts
   export interface IEntityRepository extends IBaseRepository<Entity> {
     findByCustomField(value: string): Promise<Entity[]>;
   }
   ```

2. **Implement Repository**
   ```typescript
   // db/firebase/entity.repository.ts
   export class FirebaseEntityRepository extends FirebaseBaseRepository<Entity> 
     implements IEntityRepository {
     async findByCustomField(value: string): Promise<Entity[]> {
       return this.query()
         .where('customField', '==', value)
         .execute();
     }
   }
   ```

3. **Create Service**
   ```typescript
   // services/entity.service.ts
   export class EntityService {
     constructor(private repo: IEntityRepository) {}
     
     async createEntity(data: CreateEntityInput): Promise<Entity> {
       // Business logic here
       return this.repo.create(data);
     }
   }
   ```

4. **Create Function**
   ```typescript
   // functions/entity/createEntity/createEntity.function.ts
   export const createEntity = createAuthenticatedFunction<CreateEntityRequest, CreateEntityResponse>(
     async (data, context) => {
       const service = new EntityService(entityRepo);
       return await service.createEntity(data);
     }
   );
   ```

## Migration to Other Databases

See `.windsurf/rules/supabase-migration-guide.md` for complete migration instructions.

## Rules

- No barrel files except for function exports
- Max 200 lines per file
- Explicit imports only
- All files need CONTEXT comments
- Framework-only until business logic decided

## Documentation

- `.windsurf/rules/` - Complete rule set
- `database-migration.md` - Coupling analysis
- `supabase-migration-guide.md` - Migration steps
