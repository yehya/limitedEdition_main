---
description: Timeless architecture rules
always_on: true
---

# Architecture Rules

## Golden Rules

1. **Framework-Only** - Build infrastructure, not business logic. Add logic when decided.
2. **Small Files** - Max 200 lines. When in doubt, create a new file.
3. **3-Layer Architecture** - API → Service → Repository. Never skip layers.
4. **Database Agnostic** - Business logic knows nothing about database specifics.
5. **Interface Everything** - Repositories use interfaces. Easy to swap implementations.
6. **Single Responsibility** - One file, one purpose.
7. **No Barrel Files** - Explicit imports only (except function exports).
8. **Testable-First** - Write code that's easy to unit test. Small, pure functions.

## Layer Rules

### API Layer
- Handles HTTP/callable endpoints
- Request validation, response formatting
- Never: Business logic, database calls

### Service Layer  
- Core business rules
- Business logic, orchestration, validation
- Never: Direct database calls, HTTP concerns

### Repository Layer
- Data persistence
- CRUD operations, queries
- Never: Business logic

## Forbidden Patterns
❌ Business logic in API layer
❌ Database calls in service layer
❌ Direct database dependencies in business logic
❌ Barrel files (except function exports)
❌ Files over 200 lines

### Testing Anti-Patterns
❌ Creating dependencies inside functions (new Database(), etc.)
❌ Hard-coded external services (Firebase Admin, APIs)
❌ Global state or singletons in business logic
❌ Mixed concerns (validation + database calls)
❌ Complex private functions that can't be tested

## Testing Rules

### Testable Code Patterns
- **Pure functions** - No side effects, easy to test
- **Dependency injection** - Pass dependencies, don't create them
- **Interface dependencies** - Mock interfaces, not implementations
- **Small functions** - One responsibility, easy to assert
- **No external calls** - Database, APIs, file I/O in test scope

### Testing Structure
```
src/
├── utils/validators/
│   └── user.validator.ts
├── __tests__/
│   └── user.validator.test.ts
├── services/
│   └── user.service.ts
└── __tests__/
    └── user.service.test.ts
```

### Testable vs Non-Testable Examples

❌ **Hard to test:**
```typescript
// Creates dependencies, can't mock
export class UserService {
  async createUser(data: UserData) {
    const db = firestore(); // Hard-coded
    const user = await db.collection('users').add(data);
    return user;
  }
}
```

✅ **Easy to test:**
```typescript
// Dependencies injected, interfaces used
export class UserService {
  constructor(
    private userRepo: IUserRepository // Interface
  ) {}
  
  async createUser(data: UserData): Promise<User> {
    return await this.userRepo.create(data);
  }
}
```

### Required Patterns
✅ Interfaces for all repositories
✅ Database-agnostic business logic
✅ Small, focused files
✅ Clear layer separation
✅ Explicit imports
✅ Pure utility functions
✅ Injectable dependencies
✅ Test files next to source files
