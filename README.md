# Expo Firebase App Hosting

A blank Expo project optimized for Firebase App Hosting with automatic deployments.

## Features

- ✅ Expo + Metro bundler for fast development
- ✅ React Native Web for cross-platform
- ✅ Firebase App Hosting ready
- ✅ Zero-config deployment
- ✅ TypeScript support
- ✅ Bun package manager (local) + npm (deployment)

## Development

```bash
# Install dependencies
bun install

# Start development server
bun start
```

Works on Web, iOS, and Android simultaneously.

## Firebase App Hosting Setup

### Configuration

This project uses `apphosting.yaml` to override the default npm commands and use Bun instead:

```yaml
scripts:
  buildCommand: bun run build
  runCommand: bun run start
```

**Note:** Using script overrides opts out of Firebase App Hosting's framework-specific optimizations for Expo, but enables Bun usage for potentially faster builds.

### Deployment Steps

1. Push this project to GitHub
2. In Firebase Console, connect App Hosting to your repo
3. Select the root folder
4. Deploy automatically on every push

**Firebase App Hosting will:**
- Install Bun and use it for dependency installation
- Run `bun run build` to create static files
- Run `bun run start` to serve the app
- Deploy on every git push

### Documentation

For detailed Firebase App Hosting configuration options, see:
📖 **[Firebase App Hosting Configuration Guide](https://firebase.google.com/docs/app-hosting/configure?authuser=0#configure_the_environment)**

Key sections:
- Environment variables
- Build/run script overrides
- Cloud Run service settings
- Secret management
- VPC access configuration

## Project Structure

```
app/              # React Native screens
├── _layout.tsx   # Root navigation
├── index.tsx     # Home screen
└── home.tsx      # Main content

package.json      # Dependencies & scripts
app.json         # Expo configuration
apphosting.yaml  # Firebase App Hosting config
```

## Deployment

```bash
git add .
git commit -m "your changes"
git push
# 🚀 Auto-deploys to Firebase App Hosting
```

## Local vs Production

- **Local Development:** Uses Bun for speed
- **Firebase App Hosting:** Uses Bun via script overrides
- **Alternative:** Remove `apphosting.yaml` to use npm with framework optimizations
