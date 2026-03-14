---
description: Deploy to Firebase App Hosting
always_on: true
---

# Deploy to Firebase App Hosting

This workflow handles deploying your Expo React Native Web app to Firebase App Hosting.

## Prerequisites

1. Firebase project created and configured
2. Firebase App Hosting backend connected to your GitHub repo
3. `apphosting.yaml` configured in your project root

## Steps

1. **Build the app**
   ```bash
   expo export -p web
   ```
   This creates the static web build in the `dist/` folder.

2. **Commit and push changes**
   ```bash
   git add .
   git commit -m "your changes"
   git push
   ```

3. **Automatic deployment**
   Firebase App Hosting will automatically:
   - Detect the push to GitHub
   - Run the build process using Bun (as configured in `apphosting.yaml`)
   - Deploy the static files to Cloud Run
   - Provide a live URL

## Configuration Files

- `apphosting.yaml` - Firebase App Hosting configuration
- `package.json` - Build and start scripts
- `app.json` - Expo configuration for web builds

## Troubleshooting

If deployment fails:
1. Check Firebase Console build logs
2. Verify `apphosting.yaml` syntax
3. Ensure `dist/` folder is created by `expo export -p web`
4. Check that `superstatic` is installed as a dependency

## Environment Variables

Firebase App Hosting automatically provides:
- `FIREBASE_CONFIG` - Firebase project configuration
- `FIREBASE_WEBAPP_CONFIG` - Web app configuration
- `PORT` - The port to serve on (usually 8080)
