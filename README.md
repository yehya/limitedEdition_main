# Expo Firebase App Hosting

A blank Expo project optimized for Firebase App Hosting with automatic deployments.

## Features

- ✅ Expo + Vite for fast development
- ✅ React Native Web for cross-platform
- ✅ Firebase App Hosting ready
- ✅ Zero-config deployment
- ✅ TypeScript support

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Works on Web, iOS, and Android simultaneously.

## Firebase App Hosting Setup

1. Push this project to GitHub
2. In Firebase Console, connect App Hosting to your repo
3. Select the root folder
4. Deploy automatically on every push

**That's it! Firebase App Hosting will:**
- Detect the Expo/Vite setup automatically
- Run `npm run build` to create static files
- Serve the app with `npm start`
- Deploy on every git push

## Project Structure

```
app/              # React Native screens
├── _layout.tsx   # Root navigation
├── index.tsx     # Home screen
└── home.tsx      # Main content

package.json      # Dependencies & scripts
app.json         # Expo configuration
```

## Deployment

```bash
git add .
git commit -m "initial setup"
git push
# 🚀 Auto-deploys to Firebase App Hosting
```
