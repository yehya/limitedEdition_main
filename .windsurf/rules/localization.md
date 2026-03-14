---
description: Localization and internationalization rules
always_on: true
---

# Localization (i18n) Rules

## Golden Rule
**All user-facing text MUST be localized. Never hardcode strings in the UI.**

## Supported Languages
- **English (en)** - Default language, fallback
- **Arabic (ar)** - Right-to-left (RTL) support required
- **Extensible** - System designed to add any language without code changes

## Implementation Requirements

### Backend
- Use `Localized<T>` type for all text fields in models
- Store all language versions in database
- Return all languages in API responses
- Error messages must be localized

### Frontend
- No hardcoded strings in components
- Use translation hook for all text
- RTL support for Arabic (layout flips automatically)
- Auto-detect language preference

### Language Detection Priority
1. User preference (saved in profile)
2. Browser language
3. Default: English

### Required Type
```typescript
type Localized<T extends string> = {
  en: T;
  ar: T;
  [lang: string]: T;     // Extensible for future languages
};
```

## Forbidden Patterns
❌ Hardcoded strings in UI
❌ Client-side translation only
❌ Ignoring RTL requirements

## Required Patterns
✅ All text in translation files
✅ Localized types in models
✅ Language detection on app start
✅ RTL layout support
