---
description: Multi-environment deployment setup
always_on: true
---

# Multi-Environment Deployment Setup

## Current Environments

### Testing Environment
- **URL:** https://app--superhome-testing.us-east4.hosted.app/home
- **Firebase Project:** superhome-testing
- **Status:** Currently live and working

### Production Environment
- **URL:** TBD (to be set up)
- **Firebase Project:** TBD (to be created)

## Environment Files

- `.env.testing` - Testing environment configuration
- `.env.production` - Production environment configuration
- `.env.local` - Local development (copied from target environment)

## Firebase App Hosting Files

- `apphosting.yaml` - Default configuration (testing)
- `apphosting.production.yaml` - Production configuration
- `apphosting.development.yaml` - Development configuration

## EAS Build Configuration

- `eas.json` - Expo Application Services build profiles
- **Profiles:** development, preview, production

## Local Development Commands

```bash
# Web development
bun run dev:testing      # Testing environment
bun run dev:production  # Production environment

# Mobile development
bun run android:dev      # Android development build
bun run android:prod     # Android production build
bun run ios:dev          # iOS development build
bun run ios:prod         # iOS production build
```

## Build Commands

```bash
# Development builds (internal testing)
bun run build:dev        # Development build for both platforms

# Production builds
bun run build:prod       # Production build for both platforms

# Store releases
bun run release:android  # Build and submit to Play Store
bun run release:ios      # Build and submit to App Store
```

## Deployment Process

### Web (Firebase App Hosting)
1. **Testing:** Push to main branch → auto-deploys to testing
2. **Production:** Push to production branch → auto-deploys to production

### Mobile (EAS)
1. **Development:** `bun run build:dev` → Internal testing
2. **Production:** `bun run release:android/ios` → App stores

## Firebase Projects

Each environment has its own Firebase project:
- **Testing:** superhome-testing (existing)
- **Production:** TBD (create new project)

## Environment Variables

Key variables for each environment:
- `EXPO_PUBLIC_FIREBASE_ENV` - Environment identifier
- `EXPO_PUBLIC_FIREBASE_API_KEY` - Firebase API key
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `EXPO_PUBLIC_FIREBASE_APP_ID` - Firebase app ID
- `APP_VARIANT` - Expo build variant (development/production)
