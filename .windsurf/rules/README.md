# Rules

## 🤖 LLM Development (START HERE)
**llm-workflow.md** - **CRITICAL** Rules for LLM-only development, context management, common mistakes

## Core Architecture
**architecture.md** - 3-layer architecture, dependency injection, migration path
**file-organization.md** - File size limits (200 lines max), naming conventions

## Product & Design
**system-design.md** - App vision, user types, flows
**design-dna.md** - UI/UX principles (NEVER break)

## Backend
**firebase-plan.md** - Architecture, schema, build phases
**firebase-optimization.md** - Cost reduction, pagination, query limits (MAX 500 per query)
**firebase-deployment.md** - Deployment process
**firebase-integration.md** - Firebase SDK setup

## Code Quality
**code-conventions.md** - File structure, naming, state
**project-guidelines.md** - Code style, security, performance
**best-practices.md** - Error handling, validation, caching, testing

## Environment
**multi-environment.md** - Testing/production setup
**local-development.md** - Local dev workflow
**apphosting-configuration.md** - App Hosting config

---

## Quick Start for LLMs
1. Read **llm-workflow.md** first
2. Every file needs `// CONTEXT:` comment
3. Max 200 lines per file
4. Functions in folders with DTOs
5. Use @/ path aliases
6. 3-layer architecture (API → Service → Repository)
