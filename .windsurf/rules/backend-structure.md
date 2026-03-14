---
description: Backend folder structure and naming conventions
always_on: true
---

# Backend Structure Analysis & Recommendations

## Current Issues

### ❌ Issue 1: Firebase-Centric Naming
**Problem:** `firebase/` folder name ties us to Firebase
**Impact:** Confusing if we migrate to Supabase or other backend
**Solution:** Use generic `backend/` or `server/` naming

### ❌ Issue 2: Mixed Firebase Config
**Problem:** `firebase.json` contains both functions AND hosting config
**Impact:** Hosting config points to specific app path
**Solution:** Separate concerns

### ❌ Issue 3: Outdated Dependencies
**Problem:** `geofire-common` still listed but we removed geolocation logic
**Impact:** Unnecessary dependency
**Solution:** Clean up unused deps

### ❌ Issue 4: Path Aliases Include Removed Folders
**Problem:** `@services/*` still in tsconfig but services folder deleted
**Impact:** Broken path aliases
**Solution:** Update tsconfig paths

## Recommended Structure

```
backend/                          ← Generic backend folder (not firebase/)
├── package.json                  ← Backend-wide package.json
├── README.md                     ← Backend setup guide
├── .gitignore                    ← Backend-specific ignores
├── firebase.json                 ← Firebase-specific config only
├── .firebaserc                   ← Firebase project config
├── functions/                    ← Cloud Functions code
│   ├── package.json              ← Functions dependencies
│   ├── tsconfig.json             ← TypeScript config
│   ├── bun.lock                  ← Lock file
│   ├── src/                      ← Source code
│   │   ├── index.ts              ← Firebase init + function exports
│   │   ├── register-aliases.ts   ← Runtime path aliases
│   │   ├── config/               ← Configuration
│   │   │   ├── collections.ts    ← Collection names
│   │   │   └── env.ts            ← Environment config
│   │   ├── models/               ← Type definitions
│   │   │   ├── base.model.ts
│   │   │   ├── user.model.ts
│   │   │   ├── customer.model.ts
│   │   │   ├── provider.model.ts
│   │   │   ├── job.model.ts
│   │   │   └── conversation.model.ts
│   │   ├── db/                   ← Database layer
│   │   │   ├── interfaces/       ← Repository interfaces
│   │   │   │   ├── base.repository.interface.ts
│   │   │   │   ├── query-builder.interface.ts
│   │   │   │   └── pagination.interface.ts
│   │   │   └── firebase/         ← Firebase implementations
│   │   │       ├── base.repository.ts
│   │   │       └── firebase-query-builder.ts
│   │   ├── middleware/           ← Auth middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── admin.middleware.ts
│   │   │   └── provider.middleware.ts
│   │   └── utils/                ← Utilities
│   │       ├── creators/         ← Function creators
│   │       │   ├── base.creator.ts
│   │       │   ├── auth.creator.ts
│   │       │   ├── admin.creator.ts
│   │       │   ├── provider.creator.ts
│   │       │   ├── trigger.creator.ts
│   │       │   └── cron.creator.ts
│   │       └── pagination.util.ts
│   └── lib/                      ← Compiled output
└── supabase/                     ← Future: Supabase implementations
    └── (when needed)
```

## Migration Steps

### Step 1: Rename Folder
```bash
mv firebase backend
```

### Step 2: Clean Package.json
```json
{
  "name": "superhome-backend",
  "description": "Backend services for SuperHome",
  "engines": {
    "node": "20"
  },
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^4.5.0",
    "module-alias": "^2.3.4",
    "tsconfig-paths": "^4.2.0",
    "uuid": "^13.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/uuid": "^11.0.0",
    "typescript": "^5.3.3"
  }
}
```

### Step 3: Update tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@models/*": ["./models/*"],
      "@db/*": ["./db/*"],
      "@middleware/*": ["./middleware/*"],
      "@utils/*": ["./utils/*"],
      "@config/*": ["./config/*"]
    }
  }
}
```

### Step 4: Update firebase.json
```json
{
  "functions": {
    "source": "functions"
  }
}
```

### Step 5: Update Deployment Scripts
```json
{
  "scripts": {
    "deploy:functions": "cd backend && firebase deploy --only functions",
    "deploy:all": "cd backend && firebase deploy"
  }
}
```

## Benefits of This Structure

1. **Database Agnostic** - `backend/` folder name doesn't imply Firebase
2. **Clear Separation** - Functions code separate from Firebase config
3. **Migration Ready** - Easy to add `supabase/` folder alongside `firebase/`
4. **Clean Dependencies** - Only what we actually use
5. **Future Proof** - Structure supports multiple backends

## When Adding Supabase

```
backend/
├── functions/                    ← Firebase Cloud Functions
├── supabase/                     ← Supabase Edge Functions
│   ├── package.json
│   ├── src/
│   │   ├── index.ts
│   │   └── functions/
│   └── migrations/
└── shared/                       ← Shared between backends
    ├── models/
    └── types/
```

## Deployment Commands

```bash
# Deploy Firebase functions
cd backend && firebase deploy --only functions

# Deploy Supabase functions (future)
cd backend/supabase && supabase functions deploy

# Deploy both
npm run deploy:all
```
