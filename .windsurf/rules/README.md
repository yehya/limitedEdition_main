# Rules

## 🤖 LLM Development (START HERE)
**llm-workflow.md** - **CRITICAL** Rules for LLM-only development, context management, common mistakes

## Core Architecture
**architecture.md** - Framework-only approach, 3-layer architecture, database-agnostic
**file-organization.md** - File size limits (200 lines max), NO barrel files rule

## Product & Design
**system-design.md** - App vision, user types, flows
**design-dna.md** - UI/UX principles (NEVER break)

## Database & Migration
**database-migration.md** - Coupling analysis and migration strategy
**supabase-migration-guide.md** - Step-by-step migration to Supabase

---

## Quick Start for LLMs
1. Read **llm-workflow.md** first
2. Every file needs `// CONTEXT:` comment
3. Max 200 lines per file
4. NO barrel files except function exports
5. Use @/ path aliases
6. Framework-only: no business logic until decided

## Rules Philosophy
- **Essential only** - No operational docs, no outdated information
- **Timeless** - Rules that won't change with technology
- **Actionable** - Clear do's and don'ts
- **Minimal** - 7 files covering everything needed
