---
description: Configure apphosting.yaml for different scenarios
always_on: true
---

# App Hosting Config

## Current (npm - recommended)
No `apphosting.yaml` needed. Uses npm with framework optimizations.

## Options
**Env vars:** `env: [{variable, value, availability: [BUILD|RUNTIME]}]` | Secrets: `secret: mySecret`
**Output:** `outputFiles: {serverApp: {include: [dist, node_modules]}}`
**Resources:** `runConfig: {cpu: 1-4, memoryMiB: 512-32768, minInstances: 0-100, maxInstances: 1-100}`

## Docs
https://firebase.google.com/docs/app-hosting/configure
