---
description: Local development setup
always_on: true
---

# Local Development Setup

This workflow covers setting up and running the project locally for development.

## Prerequisites

1. Node.js installed (or use Bun)
2. Expo CLI installed globally
3. Android/iOS development environment (for mobile testing)

## Setup Steps

1. **Install dependencies**
   ```bash
   # Using Bun (recommended for speed)
   bun install

   # Or using npm
   npm install
   ```

2. **Start development server**
   ```bash
   # Using Bun
   bun start

   # Or using npm
   npm start
   ```

3. **Platform-specific commands**
   ```bash
   # Web development
   bun run web

   # Android development
   bun run android

   # iOS development
   bun run ios
   ```

## Development Workflow

1. Make changes to your code in the `app/` directory
2. The development server will automatically reload
3. Test on web, iOS, and Android simultaneously
4. Use Expo Go app for mobile testing

## Building for Testing

```bash
# Build web version locally
bun run build

# Serve the built version
bun start  # Uses superstatic to serve dist/ folder
```

## File Structure

- `app/` - React Native screens and navigation
- `package.json` - Dependencies and scripts
- `app.json` - Expo configuration
- `apphosting.yaml` - Firebase App Hosting config

## Tips

- Use Bun for faster dependency installation and builds
- Test on all platforms before deploying
- Use Expo Dev Tools for debugging
- Check browser console for web-specific issues
