---
description: File organization and size rules
always_on: true
---

# File Organization

## Golden Rule
**When in doubt, create a new file.**

## File Size Limits
- **Max 200 lines** per file
- **Max 150 lines** preferred
- If approaching limit, split immediately

## When to Split

### Models
```
❌ models/all-models.ts (500 lines)
✅ models/user.model.ts (50 lines)
✅ models/job.model.ts (60 lines)
✅ models/provider.model.ts (40 lines)
```

### Services
```
❌ services/job.service.ts (300 lines)
✅ services/job/job.service.ts (80 lines)
✅ services/job/matching.service.ts (70 lines)
✅ services/job/pricing.service.ts (50 lines)
```

### Repositories
```
❌ repositories/user.repository.ts (250 lines)
✅ repositories/user/user.repository.ts (100 lines)
✅ repositories/user/user-queries.repository.ts (80 lines)
```

## Folder Structure

**Flat when small:**
```
services/
├── user.service.ts
├── job.service.ts
└── ai.service.ts
```

**Nested when growing:**
```
services/
├── user/
│   ├── user.service.ts
│   ├── user-auth.service.ts
│   └── user-profile.service.ts
├── job/
│   ├── job.service.ts
│   ├── job-matching.service.ts
│   └── job-pricing.service.ts
```

## Export Patterns

### NO Barrel Files (index.ts)
**RULE: No barrel files (index.ts) except for Firebase function exports.**

Forbidden:
```typescript
// models/index.ts - DON'T CREATE THIS
export * from './user.model';
export * from './job.model';

// services/index.ts - DON'T CREATE THIS
export * from './user.service';
```

Allowed ONLY for Firebase functions:
```typescript
// functions/user/index.ts - OK for function exports
export { getUser } from './getUser/getUser.function';
export { updateUser } from './updateUser/updateUser.function';
```

**Why:** Explicit imports are clearer for LLMs. Always import directly:
```typescript
// GOOD
import { User } from '../models/user.model';
import { Job } from '../models/job.model';

// BAD
import { User, Job } from '../models';
```

## File Naming

**Be specific:**
```
utils.ts
date-formatter.util.ts
phone-validator.util.ts
❌ utils.ts
✅ date-formatter.util.ts
✅ phone-validator.util.ts
```

**Use suffixes:**
- `.model.ts` - Types/interfaces
- `.service.ts` - Business logic
- `.repository.ts` - Database
- `.middleware.ts` - Request validation
- `.util.ts` - Pure functions
- `.constant.ts` - Constants
- `.interface.ts` - Interfaces
- `.type.ts` - Type definitions

## Imports

**Use path aliases:**
```typescript
❌ import { User } from '../../../models/user.model';
✅ import { User } from '@/models/user.model';
```

**Configure in tsconfig.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@models/*": ["./src/models/*"],
      "@services/*": ["./src/services/*"],
      "@db/*": ["./src/db/*"]
    }
  }
}
```

## Forbidden

- ❌ Files over 200 lines
- ❌ Multiple classes in one file
- ❌ Mixed concerns (models + logic)
- ❌ Generic names (utils.ts, helpers.ts)
- ❌ Relative imports beyond 2 levels
