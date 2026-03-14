# File Structure Guide

This document outlines the standardized file naming and organization conventions for SuperHome.

## Table of Contents
- [Screen Files](#screen-files)
- [Component Files](#component-files)
- [Style Files](#style-files)
- [File Organization](#file-organization)
- [Migration Guide](#migration-guide)
- [Best Practices](#best-practices)

## Screen Files

### Naming Convention
- **Format**: `[name].screen.tsx`
- **Examples**: `home.screen.tsx`, `profile.screen.tsx`, `settings.screen.tsx`

### Structure
```typescript
// home.screen.tsx
import { View } from 'react-native';
import { homeStyles } from './home.screen.styles';

export default function HomeScreen() {
  return (
    <View style={homeStyles.container}>
      {/* Screen content */}
    </View>
  );
}
```

### Route Registration
```typescript
// app/_layout.tsx
<Stack.Screen name="home.screen" />
```

## Component Files

### Naming Convention
- **Format**: `[ComponentName].tsx`
- **Examples**: `CustomButton.tsx`, `UserCard.tsx`, `SearchInput.tsx`

### Structure
```typescript
// components/CustomButton.tsx
import { Pressable } from 'react-native';
import { Text } from './Text';
import { customButtonStyles } from './CustomButton.styles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable style={customButtonStyles.button} onPress={onPress}>
      <Text style={customButtonStyles.text}>{title}</Text>
    </Pressable>
  );
};
```

## Style Files

### Screen Styles
- **Format**: `[name].screen.styles.tsx`
- **Examples**: `home.screen.styles.tsx`, `profile.screen.styles.tsx`

### Component Styles
- **Format**: `[ComponentName].styles.tsx`
- **Examples**: `CustomButton.styles.tsx`, `UserCard.styles.tsx`

### Structure
```typescript
// home.screen.styles.tsx
import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  // ... more styles
});
```

## File Organization

### Directory Structure
```
app/
├── _layout.tsx                    # App layout
├── index.tsx                      # Index redirect
├── home.tsx                       # Home route
├── profile.tsx                    # Profile route
├── [other routes].tsx             # Route files
└── screens/                       # Screen components folder
    ├── home.screen.tsx            # Home screen component
    ├── home.screen.styles.tsx     # Home screen styles
    ├── profile.screen.tsx         # Profile screen component
    ├── profile.screen.styles.tsx  # Profile screen styles
    └── [other screens].screen.tsx # Screen components
```

components/
├── index.ts                       # Component exports
├── Text.tsx                       # Text component
├── Text.styles.tsx                # Text styles (if needed)
├── CustomButton.tsx               # Button component
├── CustomButton.styles.tsx        # Button styles
└── [other components].tsx

hooks/
├── index.ts                       # Hook exports
├── useLanguage.ts                 # Language hook
└── [other hooks].ts

contexts/
├── index.ts                       # Context exports
├── RTLContext.tsx                 # RTL context
└── [other contexts].tsx

utils/
├── index.ts                       # Utility exports
├── styling.ts                     # Styling utilities
├── rtl.ts                         # RTL utilities
└── [other utilities].ts

theme/
├── index.ts                       # Theme export
├── colors.ts                      # Color tokens
├── typography.ts                  # Typography tokens
└── spacing.ts                     # Spacing tokens

locales/
├── index.ts                       # Locale exports
├── useTranslation.ts              # Translation hook
├── en/
│   ├── index.ts                   # English export
│   ├── common.ts                  # Common translations
│   └── [feature].ts               # Feature translations
└── ar/
    ├── index.ts                   # Arabic export
    ├── common.ts                  # Common translations
    └── [feature].ts               # Feature translations
```

## Migration Guide

### Converting Existing Files

1. **Rename screen files**:
```bash
# Before
home.tsx

# After
home.screen.tsx
```

2. **Create separate styles file**:
```typescript
// home.screen.styles.tsx
import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const homeStyles = StyleSheet.create({
  // Move all styles here
});
```

3. **Update component imports**:
```typescript
// home.screen.tsx
import { homeStyles } from './home.screen.styles';

// Replace all StyleSheet.create references
// with homeStyles
```

4. **Update route registration**:
```typescript
// _layout.tsx
<Stack.Screen name="home.screen" />
```

### Example Migration

**Before:**
```typescript
// home.tsx
import { View, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
```

**After:**
```typescript
// home.screen.tsx
import { View } from 'react-native';
import { homeStyles } from './home.screen.styles';

export default function Home() {
  return (
    <View style={homeStyles.container}>
      {/* Content */}
    </View>
  );
}
```

```typescript
// home.screen.styles.tsx
import { StyleSheet } from 'react-native';
import { theme } from '@/theme/index';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.background,
  },
});
```

## Best Practices

### ✅ Do
- Use descriptive, clear file names
- Separate styles from component logic
- Follow the naming conventions consistently
- Use theme tokens in style files
- Keep style files focused on styling only
- Import styles with clear naming (e.g., `homeStyles`)

### ❌ Don't
- Mix styles with component logic
- Use unclear abbreviations in file names
- Create monolithic files with multiple concerns
- Hard-code values in style files
- Use inconsistent naming patterns
- Inline complex styles in components

### Style Organization
```typescript
// Good organization
export const homeStyles = StyleSheet.create({
  // Layout
  container: { ... },
  header: { ... },
  content: { ... },
  
  // Components
  title: { ... },
  subtitle: { ... },
  button: { ... },
  
  // Variations
  buttonPrimary: { ... },
  buttonSecondary: { ... },
});
```

### Import Patterns
```typescript
// Recommended import pattern
import { View } from 'react-native';
import { Text } from '@/components/Text';
import { useRTL } from '@/contexts/RTLContext';
import { homeStyles } from './home.screen.styles';
import { theme } from '@/theme/index';
```

## Benefits of This Structure

### 1. **Separation of Concerns**
- Logic and styling are clearly separated
- Easier to maintain and debug
- Better code organization

### 2. **Scalability**
- Easy to add new styles without cluttering components
- Clear patterns for new team members
- Consistent structure across the app

### 3. **Maintainability**
- Styles are centralized and reusable
- Easy to find and update specific styles
- Better TypeScript support

### 4. **Collaboration**
- Clear file ownership
- Easier code reviews
- Reduced merge conflicts

### 5. **Performance**
- Better tree-shaking
- Optimized bundle sizes
- Faster development experience

## Troubleshooting

### Common Issues

1. **Import errors**
   - Check file names match exactly
   - Verify import paths are correct
   - Ensure styles file exports are properly named

2. **Route not found**
   - Update `_layout.tsx` with new screen names
   - Clear Metro cache if needed

3. **Style not applying**
   - Check import statement
   - Verify style object name
   - Ensure StyleSheet.create is properly exported

### Debug Tips
```typescript
// Debug style imports
console.log('Styles loaded:', homeStyles);

// Check file structure
// Verify all files follow naming convention
```

## Future Considerations

### Extending the Structure
- Add `.test.tsx` for test files
- Add `.stories.tsx` for Storybook stories
- Add `.types.ts` for complex type definitions

### Automation
- ESLint rules for file naming
- Prettier configuration for consistency
- Automated file structure validation

This structure ensures long-term maintainability and scalability as the project grows.
