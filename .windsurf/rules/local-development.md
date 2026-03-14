---
description: Local development setup
always_on: true
---

# Local Development

## Setup
`cd apps/superhome_main && bun install`

## Run
**Dev:** `bun start` (or `bun run web/android/ios`)
**Env-specific:** `bun run dev:testing` | `bun run dev:production`
**Build:** `bun run build` (creates `dist/`)

## Workflow
Edit `app/` → Auto-reload → Test web/iOS/Android → Use Expo Go for mobile

## Tips
Use Bun locally (fast) | Test all platforms before deploy | Check browser console for web issues
