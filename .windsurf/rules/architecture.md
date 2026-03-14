---
description: SuperHome backend architecture and design patterns
always_on: true
---

# Architecture Rules

## CRITICAL: Framework-Only Approach
**This codebase is a FRAMEWORK, not a complete application.**

- ✅ Infrastructure setup (repositories, query builders, middleware, creators)
- ✅ Interfaces and abstractions
- ✅ Database-agnostic patterns
- ❌ NO business logic until decided
- ❌ NO premature service implementations
- ❌ NO concrete function implementations with business rules

**Build the foundation. Business logic comes later.**

## Golden Rules

1. **Small Files** - Max 200 lines. When in doubt, create a new file.
2. **3-Layer Architecture** - API → Service → Repository. Never skip layers.
3. **Database Agnostic** - Business logic knows nothing about Firestore/Supabase.
4. **Interface Everything** - Repositories use interfaces. Easy to swap implementations.
5. **Single Responsibility** - One file, one purpose.

## Layers

### API Layer (Functions)
- **Purpose:** HTTP/callable endpoints
- **Location:** `firebase/functions/src/functions/`
- **Naming:** `*.functions.ts`
- **Responsibility:** Request validation, response formatting
- **Never:** Business logic, database calls

### Service Layer (Business Logic)
- **Purpose:** Core business rules
- **Location:** `firebase/functions/src/services/`
- **Naming:** `*.service.ts`
- **Responsibility:** Business logic, orchestration, validation
- **Never:** Direct database calls, HTTP concerns

### Repository Layer (Database)
- **Purpose:** Data persistence
- **Location:** `firebase/functions/src/db/`
- **Naming:** `*.repository.ts`
- **Responsibility:** CRUD operations, queries
- **Never:** Business logic

## File Structure

```
firebase/functions/src/
├── config/
│   ├── collections.ts          # Collection names constant
│   └── env.ts                  # Environment config
├── models/
│   ├── base.model.ts           # Base interface
│   ├── user.model.ts           # User types
│   ├── job.model.ts            # Job types
│   └── provider.model.ts       # Provider types
├── db/
│   ├── interfaces/
│   │   ├── base.repository.interface.ts
│   │   ├── user.repository.interface.ts
│   │   └── job.repository.interface.ts
│   └── firebase/
│       ├── base.repository.ts
│       ├── user.repository.ts
│       └── job.repository.ts
├── services/
│   ├── user.service.ts
│   ├── job.service.ts
│   ├── ai.service.ts
│   └── matching.service.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── admin.middleware.ts
│   └── provider.middleware.ts
├── utils/
│   ├── creators/
│   │   ├── base.creator.ts
│   │   ├── auth.creator.ts
│   │   ├── admin.creator.ts
│   │   └── provider.creator.ts
│   └── validators/
│       └── *.validator.ts
└── functions/
    ├── user.functions.ts
    ├── job.functions.ts
    └── ai.functions.ts
```

## Naming Conventions

**Files:**
- Repositories: `user.repository.ts`
- Services: `user.service.ts`
- Models: `user.model.ts`
- Middleware: `auth.middleware.ts`
- Functions: `user.functions.ts`
- Interfaces: `user.repository.interface.ts`

**Classes:**
- Repositories: `FirebaseUserRepository implements IUserRepository`
- Services: `UserService`
- Creators: `createAuthenticatedFunction`

**Variables:**
- Instances: `userService`, `jobRepository`
- Constants: `COLLECTIONS`, `MAX_RETRIES`

## Dependency Injection

Services receive repository interfaces:
```typescript
class JobService {
  constructor(
    private jobRepo: IJobRepository,
    private userRepo: IUserRepository
  ) {}
}
```

## Migration Path

**Firestore → Supabase:**
1. Create `db/supabase/user.repository.ts`
2. Implement `IUserRepository`
3. Swap in DI container
4. Zero service layer changes

## Rules

- Repository methods: `create`, `update`, `findById`, `findMany`, `delete`
- Service methods: Business domain language (`matchProvider`, `processAIChat`)
- Never import Firestore types in services
- Never import service logic in repositories
- Always use interfaces for cross-layer communication
