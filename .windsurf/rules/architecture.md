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

### RTL/Localization Rules

### Required RTL Patterns
✅ Use custom Text component for all text (handles Arabic scaling)
✅ Pass language prop to Text components for proper RTL
✅ Use RTLContext for app-wide language state
✅ Use rtl utility functions for layout adjustments
✅ Test both LTR and RTL layouts

### RTL Anti-Patterns
❌ Hard-coded text alignment (use rtl.getTextAlign)
❌ Hard-coded flex direction (use rtl.getFlexDirection)
❌ Manual margin calculations (use rtl.getHorizontalMargin)
❌ React Native Text without language prop
❌ Ignoring Arabic font scaling requirements

### Design System Rules

### Required Design Patterns
✅ Use theme colors instead of hard-coded values
✅ Use spacing scale instead of arbitrary numbers
✅ Use modular translation files (split by feature)
✅ Use custom Text component with language prop
✅ Use styling utilities for consistent patterns
✅ Use TypeScript for translation paths
✅ Follow naming conventions (camelCase for translations)

### File Naming Convention Rules

### Required File Structure
✅ Route files: `[name].tsx` in app/ (e.g., `home.tsx`)
✅ Screen files: `screens/[name].screen.tsx` (e.g., `screens/home.screen.tsx`)
✅ Style files: `screens/[name].screen.styles.tsx` (e.g., `screens/home.screen.styles.tsx`)
✅ Component files: `[Name].tsx` (e.g., `CustomButton.tsx`)
✅ Component styles: `[Name].styles.tsx` (e.g., `CustomButton.styles.tsx`)
✅ Separate styles from component logic
✅ Clear, descriptive file names
✅ Screens organized in dedicated folder

### File Naming Anti-Patterns
❌ Inline styles in component files
❌ Monolithic files with mixed concerns
❌ Unclear file names (e.g., `stuff.tsx`)
❌ Styles embedded in component logic
❌ Mixed naming conventions

### Design System Anti-Patterns
❌ Monolithic translation files (use modular structure)
❌ Hard-coded colors or spacing values
❌ React Native Text without language prop
❌ Mixed styling approaches
❌ Ignoring Arabic font scaling
❌ Skipping TypeScript for translations

### Required Patterns
✅ Interfaces for all repositories
✅ Database-agnostic business logic
✅ Small, focused files
✅ Clear layer separation
✅ Explicit imports
✅ Pure utility functions
✅ Injectable dependencies
✅ Test files next to source files
✅ RTL-aware components and layouts
✅ Theme-aware styling
✅ Modular localization structure
