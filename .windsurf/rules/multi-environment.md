---
description: Multi-environment deployment setup
always_on: true
---

# Multi-Environment

## Environments
**Testing:** https://app--superhome-testing.us-east4.hosted.app/home (superhome-testing)
**Production:** TBD

## Files
`.env.testing`, `.env.production`, `.env.local` | `apphosting.yaml`, `apphosting.production.yaml`, `apphosting.development.yaml` | `eas.json` (profiles: development, preview, production)

## Commands
**Web:** `bun run dev:testing` | `bun run dev:production`
**Mobile:** `bun run android:dev/prod` | `bun run ios:dev/prod`
**Build:** `bun run build:dev/prod`
**Release:** `bun run release:android/ios`

## Deployment
**Web:** Push to main → testing | Push to production → production
**Mobile:** `build:dev` → internal | `release:*` → stores

## Env Vars
`EXPO_PUBLIC_FIREBASE_ENV`, `EXPO_PUBLIC_FIREBASE_API_KEY`, `EXPO_PUBLIC_FIREBASE_PROJECT_ID`, `EXPO_PUBLIC_FIREBASE_APP_ID`, `APP_VARIANT`
