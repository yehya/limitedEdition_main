---
description: Project rules and guidelines
always_on: true
---

# Project Rules and Guidelines

## Code Style

- Use TypeScript for all new files
- Follow React Native naming conventions
- Use functional components with hooks
- Keep components small and focused

## File Organization

```
app/
├── (tabs)/          # Tab-based navigation
├── (drawer)/        # Drawer-based navigation
├── +not-found/      # 404 page
├── _layout.tsx      # Root layout
├── index.tsx        # Home screen
├── config/          # Configuration files
│   ├── firebase.ts
│   └── constants.ts
├── components/      # Reusable components
├── screens/         # Screen components
└── utils/           # Utility functions
```

## Development Rules

### Dependencies
- Use Bun for local development
- Check package-lock.json is committed
- Prefer Expo-compatible packages
- Avoid native-specific packages unless necessary

### Firebase Integration
- Use Firebase JS SDK (not @react-native-firebase)
- Store config in environment variables
- Use TypeScript types for Firebase services
- Handle offline states appropriately

### Platform Considerations
- Test on Web, iOS, and Android
- Use platform-specific code sparingly
- Prefer React Native Web compatible components
- Use responsive design principles

## Git Workflow

1. Create feature branches from main
2. Test locally before pushing
3. Use descriptive commit messages
4. Push to main for automatic deployment

## Deployment Rules

1. Ensure `expo export -p web` works locally
2. Test build process before committing
3. Check `apphosting.yaml` configuration
4. Monitor Firebase Console for deployment issues

## Security

- Never commit API keys or secrets
- Use Firebase Security Rules
- Validate user inputs
- Use HTTPS for all API calls

## Performance

- Optimize images and assets
- Use lazy loading for large lists
- Minimize bundle size
- Use Expo's built-in optimizations

## Testing

- Test on multiple screen sizes
- Verify navigation flows
- Check Firebase permissions
- Test offline functionality
