---
description: Deploy to Firebase App Hosting
always_on: true
---

# Firebase Deployment

## Process
1. `git push` → Auto-deploys to Firebase App Hosting
2. Builds with npm (uses `expo export -p web` → `dist/`)
3. Serves with `superstatic` on port 8080

## Config Files
`apphosting.yaml`, `package.json`, `app.json`

## Troubleshooting
Check Firebase Console logs | Verify `apphosting.yaml` syntax | Ensure `dist/` created | Check `superstatic` installed

## Auto Env Vars
`FIREBASE_CONFIG`, `FIREBASE_WEBAPP_CONFIG`, `PORT`
