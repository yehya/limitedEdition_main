---
description: File organization rules
always_on: true
---

# File Organization Rules

## Golden Rule
**When in doubt, create a new file.**

## File Size
- Max 200 lines per file
- Max 150 lines preferred
- Split immediately when approaching limit

## Naming Rules
- Use descriptive names, not generic ones
- Use suffixes: .model.ts, .service.ts, .repository.ts, .middleware.ts, .util.ts
- One concept per file

## Folder Structure
- Flat when small, nested when growing
- Group related files together
- Keep structure logical and predictable

## Import Rules
- Use path aliases (@/), not deep relative imports
- Explicit imports only
- No barrel files (index.ts) except function exports

## Forbidden Patterns
❌ Files over 200 lines
❌ Multiple classes in one file
❌ Mixed concerns in one file
❌ Generic names (utils.ts, helpers.ts)
❌ Barrel files except for function exports
❌ Deep relative imports

## Required Patterns
✅ Small, focused files
✅ Descriptive naming
✅ Explicit imports
✅ Path aliases
✅ Single responsibility per file
