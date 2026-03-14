# Rules

## 🤖 LLM Development (START HERE)
**llm-workflow.md** - **CRITICAL** Rules for LLM-only development, context management, common mistakes

## Core Architecture
**architecture.md** - Framework-only approach, 3-layer architecture, database-agnostic
**file-organization.md** - File size limits (200 lines max), NO barrel files rule
**backend-structure.md** - Backend folder organization and naming

## Product & Design
**system-design.md** - App vision, user types, flows
**design-dna.md** - UI/UX principles (NEVER break)

## Database & Migration
**database-migration.md** - Coupling analysis and migration strategy
**supabase-migration-guide.md** - Step-by-step migration to Supabase

## Environment & Deployment
**firebase-deployment.md** - Firebase deployment process
**multi-environment.md** - Testing/production setup
**local-development.md** - Local dev workflow

---

## Quick Start for LLMs
1. Read **llm-workflow.md** first
2. Every file needs `// CONTEXT:` comment
3. Max 200 lines per file
4. NO barrel files except function exports
5. Use @/ path aliases
6. Framework-only: no business logic until decided
