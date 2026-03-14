---
description: Project rules and guidelines
always_on: true
---

# Project Guidelines

## Code
TypeScript | React Native conventions | Functional components + hooks | Small focused components

## Structure
`app/(auth|customer|provider)/`, `app/config/`, `app/components/`, `app/utils/`

## Dependencies
Bun (local) | npm (deploy) | Expo-compatible packages | Firebase JS SDK (not @react-native-firebase)

## Platforms
Test Web/iOS/Android | Platform-specific code sparingly | React Native Web compatible

## Git
Feature branches from main | Test before push | Descriptive commits | Push to main = auto-deploy

## Security
Never commit keys | Firebase Security Rules | Validate inputs | HTTPS only

## Performance
Optimize assets | Lazy loading | Minimize bundle | Use Expo optimizations

## Testing
Multiple screen sizes | Navigation flows | Firebase permissions | Offline functionality
