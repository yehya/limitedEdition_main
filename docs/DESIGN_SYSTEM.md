# Design System Documentation

This document outlines the comprehensive design system for SuperHome, including localization, theming, and styling architecture.

## Table of Contents
- [Localization System](#localization-system)
- [Theme System](#theme-system)
- [Styling Utilities](#styling-utilities)
- [Component Architecture](#component-architecture)
- [Best Practices](#best-practices)

## Localization System

### Structure
```
locales/
├── en/
│   ├── index.ts      # English translations export
│   ├── common.ts     # Common translations
│   └── home.ts       # Home page translations
├── ar/
│   ├── index.ts      # Arabic translations export
│   ├── common.ts     # Common translations
│   └── home.ts       # Home page translations
├── index.ts          # Main export
└── useTranslation.ts # Translation hook
```

### Usage
```typescript
import { useTranslation } from '@/locales/useTranslation';

const { t, language, isRTL } = useTranslation();

// Simple translation
const title = t('home.title');

// TypeScript-supported paths
type TranslationPath = 
  | 'common.getStarted'
  | 'home.title'
  | 'home.aiPowered'
  // ... all available paths
```

### Adding New Translations

1. **Create new module file** (e.g., `profile.ts`):
```typescript
// locales/en/profile.ts
export const profile = {
  title: 'My Profile',
  edit: 'Edit Profile',
  settings: 'Settings',
} as const;
```

2. **Add to language exports**:
```typescript
// locales/en/index.ts
import { common } from './common';
import { home } from './home';
import { profile } from './profile';

export const en = {
  common,
  home,
  profile,
} as const;
```

3. **Update translation hook**:
```typescript
// locales/useTranslation.ts
export type TranslationPath = 
  | // ... existing paths
  | 'profile.title'
  | 'profile.edit'
  | 'profile.settings';
```

## Theme System

### Structure
```
theme/
├── index.ts       # Main theme export
├── colors.ts      # Color palette
├── typography.ts  # Typography system
└── spacing.ts     # Spacing scale
```

### Colors
```typescript
// Usage
theme.colors.primary[500]    // #3b82f6
theme.colors.neutral[50]     // #f8fafc
theme.colors.text.primary    // #1e293b
theme.colors.semantic.error  // #ef4444
```

### Typography
```typescript
// Usage
theme.typography.variants.heading  // { fontSize: 36, fontWeight: 'bold', lineHeight: 44 }
theme.typography.fontWeight.bold   // 'bold'
theme.typography.fontSize.lg       // 18
```

### Spacing
```typescript
// Usage
theme.spacing.md       // 16
theme.spacing['2xl']   // 48
theme.spacing.component.padding.sm  // 12
```

## Styling Utilities

### Helper Functions
```typescript
import { 
  createTextStyle, 
  createViewStyle, 
  createCardStyle,
  createButtonStyle 
} from '@/utils/styling';

// Text styles
const titleStyle = createTextStyle('heading', theme.colors.text.primary);

// View styles
const cardStyle = createCardStyle(
  theme.colors.surface.card,
  'md', // padding
  'lg', // borderRadius
  'md'  // shadow
);

// Button styles
const buttonStyle = createButtonStyle(
  theme.colors.primary[500],
  theme.colors.text.inverse,
  'md',  // paddingVertical
  'xl'   // paddingHorizontal
);
```

### Color Helper
```typescript
import { getColor } from '@/utils/styling';

const primaryColor = getColor('primary.500');
const textColor = getColor('text.primary');
```

### Spacing Helper
```typescript
import { getSpacing } from '@/utils/styling';

const mediumSpacing = getSpacing('md'); // 16
```

## Component Architecture

### Custom Text Component
```typescript
import { Text } from '@/components/Text';

// Basic usage
<Text variant="body" language={language}>Hello World</Text>

// With styling
<Text 
  variant="title" 
  color={theme.colors.primary[500]}
  weight="semibold"
  language={language}
>
  Title Text
</Text>

// Disable Arabic scaling for large text
<Text variant="heading" language={language} disableScaling>
  Large Headline
</Text>
```

### RTL Integration
```typescript
import { useRTL } from '@/contexts/RTLContext';

const { language, isRTL, setLanguage } = useRTL();

// All components should receive language prop
<Text language={language}>Content</Text>
```

## Best Practices

### ✅ Do
- Use modular translation files (split by feature/page)
- Use theme colors instead of hard-coded values
- Use spacing scale instead of arbitrary numbers
- Use styling utilities for consistent patterns
- Pass language prop to all Text components
- Use TypeScript for translation paths

### ❌ Don't
- Create monolithic translation files
- Hard-code colors or spacing values
- Use React Native Text directly
- Ignore Arabic font scaling
- Mix different styling approaches

### File Organization
```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (RTL, etc.)
├── hooks/          # Custom hooks
├── locales/        # Translation files
├── theme/          # Design tokens
├── utils/          # Utility functions
└── docs/           # Documentation
```

### Naming Conventions
- **Translations**: camelCase (e.g., `aiPowered`, `comingSoon`)
- **Colors**: kebab-case in theme (e.g., `primary-500`)
- **Components**: PascalCase (e.g., `CustomButton`)
- **Utilities**: camelCase (e.g., `createTextStyle`)

## Migration Guide

### Converting Existing Components

1. **Replace hard-coded colors**:
```typescript
// Before
style={{ backgroundColor: '#3b82f6' }}

// After
style={{ backgroundColor: theme.colors.primary[500] }}
```

2. **Replace hard-coded spacing**:
```typescript
// Before
style={{ padding: 16, margin: 8 }}

// After
style={{ padding: theme.spacing.md, margin: theme.spacing.sm }}
```

3. **Use custom Text component**:
```typescript
// Before
import { Text } from 'react-native';

// After
import { Text } from '@/components/Text';
<Text language={language}>Content</Text>
```

4. **Add translations**:
```typescript
// Before
<Text>Hello World</Text>

// After
<Text>{t('home.helloWorld')}</Text>
```

## Performance Considerations

### Optimization Tips
- Theme imports are tree-shakable
- Translation hook is memoized
- Styling utilities are pure functions
- Text component uses memoization for expensive calculations

### Bundle Size
- Modular translations reduce bundle size
- Unused theme tokens are tree-shaken
- Styling utilities add minimal overhead

## Future Enhancements

### Planned Features
- [ ] Dark theme support
- [ ] Custom theme builder
- [ ] Responsive design utilities
- [ ] Animation utilities
- [ ] Component library
- [ ] Storybook integration

### Extending the System
- Add new color palettes to `theme/colors.ts`
- Add new typography variants to `theme/typography.ts`
- Add new spacing scales to `theme/spacing.ts`
- Create new styling utilities in `utils/styling.ts`
- Add new translation modules as needed

## Troubleshooting

### Common Issues

1. **Translation not found**
   - Check if path exists in translation hook type
   - Verify translation key in language files
   - Ensure proper export structure

2. **Theme not working**
   - Check import path: `@/theme/index`
   - Verify theme structure
   - Check TypeScript types

3. **RTL issues**
   - Ensure language prop is passed to Text components
   - Check RTL context provider
   - Verify I18nManager state

### Debug Tools
```typescript
// Debug translations
console.log('Available translations:', Object.keys(translations));

// Debug theme
console.log('Primary colors:', theme.colors.primary);

// Debug RTL
console.log('Current language:', language);
console.log('Is RTL:', isRTL);
```
