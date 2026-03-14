---
description: Rules for LLM development
always_on: true
---

# LLM Development Rules

## Core Principle
This codebase is designed for LLM-only development with limited context windows.

## Code Must Be Self-Documenting
- No comments that can become outdated
- Use descriptive names that explain purpose
- Structure provides context
- Functions do one thing clearly

## File Organization for Context
- Small files (max 200 lines)
- One concept per file
- Clear naming shows purpose
- Logical folder structure

## Development Patterns
- Framework-only approach until business logic decided
- Database-agnostic design
- Interface-based architecture
- Explicit imports only

## Forbidden Patterns
❌ Comments that explain "what" (code should show this)
❌ Complex functions that need explanations
❌ Mixed concerns in one file
❌ Generic names that don't explain purpose

## Required Patterns
✅ Self-documenting code
✅ Descriptive naming
✅ Small, focused files
✅ Clear structure
✅ Single responsibility
