---
description: Rules for LLM agents working on this codebase
always_on: true
---

# LLM Workflow Rules

## CRITICAL: This codebase is designed for LLM-only development
**Assume no human will manually edit code. All development is done by LLMs with limited context windows.**

## Context Management

### File Headers (MANDATORY)
Every file MUST start with a `// CONTEXT:` comment explaining:
- What this file does
- Why it exists
- Key dependencies or patterns
- Any gotchas or important notes

**Example:**
```typescript
// CONTEXT: Creates authenticated callable functions. Auto-checks that user
// is logged in before executing handler. Supports CallableOptions for secrets.
```

### Inline Context Comments
Add `// CONTEXT:` comments for:
- Non-obvious logic
- Important architectural decisions
- Patterns that must be followed
- References to other parts of the codebase

**When to add:**
- Before complex functions (>20 lines)
- Before critical business logic
- When using patterns from mysterybag
- When making database-agnostic design choices

## File Organization for LLMs

### Small Files = Better Context
- **Max 200 lines per file** (STRICT)
- **Max 150 lines preferred**
- When approaching limit, split immediately
- Small files = easier to load in context window

### Folder Structure Helps Context
```
functions/
├── user/
│   ├── getUser/
│   │   ├── getUser.function.ts    ← Function implementation
│   │   └── getUser.dto.ts         ← Request/Response types
│   └── updateUserProfile/
│       ├── updateUserProfile.function.ts
│       └── updateUserProfile.dto.ts
```

**Why:** LLM can understand scope from folder structure alone.

### Naming = Documentation
```
❌ utils.ts
❌ helpers.ts
❌ misc.ts

✅ date-formatter.util.ts
✅ phone-validator.util.ts
✅ pagination.util.ts
```

**Why:** LLM knows what's in file without reading it.

## Code Patterns for LLMs

### DTOs Are Mandatory
Every Cloud Function MUST have:
```typescript
// functionName.dto.ts
export interface FunctionNameRequest { ... }
export interface FunctionNameResponse { ... }

// functionName.function.ts
import type { FunctionNameRequest, FunctionNameResponse } from "./functionName.dto";
```

**Why:** LLM can understand API contract without reading implementation.

### NO Barrel Files (Except Functions)
**CRITICAL RULE: No barrel files (index.ts) except for Firebase function exports.**

```typescript
// ✅ ALLOWED - functions/user/index.ts
export { getUser } from "./getUser/getUser.function";
export { updateUserProfile } from "./updateUserProfile/updateUserProfile.function";

// ❌ FORBIDDEN - models/index.ts, services/index.ts, db/index.ts
// Don't create these!
```

**Why:** Explicit imports are clearer. LLM knows exactly where code comes from.

### Path Aliases
Always use `@/` imports:
```typescript
❌ import { User } from "../../../models/user.model";
✅ import { User } from "@models/user.model";
```

**Why:** LLM doesn't need to track relative paths.

## Architecture Reminders for LLMs

### 3-Layer Architecture (NEVER VIOLATE)
```
API Layer (Functions) → Service Layer → Repository Layer
```

**Rules:**
- Functions ONLY handle HTTP/validation
- Services ONLY handle business logic
- Repositories ONLY handle database

**Why:** LLM can work on one layer without understanding others.

### Database Agnostic
```typescript
// ❌ BAD - Firestore leaks into service
async createJob(data) {
  const now = firestore.Timestamp.now();
  // ...
}

// ✅ GOOD - Service uses Date, repository converts
async createJob(data) {
  const now = new Date();
  // ...
}
```

**Why:** Future LLM can swap database without touching services.

### Interface Everything
```typescript
// Repository interface (database-agnostic)
interface IJobRepository {
  create(data): Promise<Job>;
}

// Firebase implementation
class FirebaseJobRepository implements IJobRepository {
  // Firestore-specific code here
}
```

**Why:** LLM can create new implementations without changing consumers.

## Common LLM Mistakes to Avoid

### ❌ Mistake 1: Forgetting runtime path aliases
```typescript
// tsconfig paths only work at compile time!
// MUST import register-aliases in index.ts FIRST
import './register-aliases';
```

### ❌ Mistake 2: Returning raw models from functions
```typescript
// ❌ BAD
return user; // Returns entire database model

// ✅ GOOD
return {
  id: user.id,
  name: user.name,
  // Only fields client needs
};
```

### ❌ Mistake 3: Missing CallableOptions for secrets
```typescript
// ❌ BAD
export const aiFunction = createAuthenticatedFunction(handler);

// ✅ GOOD
export const aiFunction = createAuthenticatedFunction(
  handler,
  { secrets: ["OPENAI_API_KEY"] }
);
```

### ❌ Mistake 4: Business logic in repositories
```typescript
// ❌ BAD - in repository
async createJob(data) {
  if (data.price < 0) throw new Error("Invalid price");
  // ...
}

// ✅ GOOD - in service
async createJob(data) {
  if (data.price < 0) throw new Error("Invalid price");
  return this.jobRepo.create(data);
}
```

### ❌ Mistake 5: Forgetting pagination
```typescript
// ❌ BAD
const jobs = await jobRepo.findAll(); // Could be 100K jobs!

// ✅ GOOD
const jobs = await jobRepo.findMany({ status: "active" }, { limit: 20 });
```

## LLM Development Workflow

### When Adding a New Function
1. Create folder: `functions/domain/functionName/`
2. Create DTO: `functionName.dto.ts` with CONTEXT comment
3. Create function: `functionName.function.ts` with CONTEXT comment
4. Export in barrel: `functions/domain/index.ts`
5. Verify export in root: `src/index.ts`

### When Adding a New Service
1. Create interface: `db/interfaces/entity.repository.interface.ts`
2. Create Firebase impl: `db/firebase/entity.repository.ts`
3. Create service: `services/entity.service.ts`
4. Add CONTEXT comments to all three

### When Adding a New Model
1. Create model: `models/entity.model.ts`
2. Export in barrel: `models/index.ts`
3. Add CONTEXT comment explaining fields

## Firebase-Specific LLM Rules

### Always Use Limits
```typescript
// ❌ BAD
const query = collection.get();

// ✅ GOOD
const query = collection.limit(50).get();
```

### Batch Operations
```typescript
// ❌ BAD - N writes
for (const doc of docs) {
  await doc.update(data);
}

// ✅ GOOD - 1 batch write
const batch = db.batch();
docs.forEach(doc => batch.update(doc, data));
await batch.commit();
```

### Denormalize for Reads
```typescript
// ❌ BAD - N+1 queries
const jobs = await getJobs();
for (const job of jobs) {
  job.user = await getUser(job.userId);
}

// ✅ GOOD - Store essential user data in job
job: {
  userId: "123",
  userName: "Ahmad", // Denormalized
  userPhone: "+20..." // Denormalized
}
```

## Quick Reference for LLMs

**Need to add a function?** → Create folder with .function.ts + .dto.ts
**Need to add business logic?** → Put in service, NOT repository
**Need to query database?** → Always use .limit()
**Need to use secrets?** → Pass CallableOptions to creator
**File getting big?** → Split at 150 lines
**Import not working?** → Use @/ path alias
**Need to switch database?** → Implement new repository, zero service changes

## Remember
- **Context comments are not optional** - they're for future LLMs
- **Small files** - easier to fit in context window
- **Explicit names** - no abbreviations, no shortcuts
- **Separation of concerns** - strict 3-layer architecture
- **Database agnostic** - never leak Firestore into services
