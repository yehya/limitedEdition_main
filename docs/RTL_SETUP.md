# RTL (Right-to-Left) Setup Guide

This document explains the RTL setup and best practices for SuperHome.

## Architecture Overview

### Core Components

1. **RTLContext** - Global language and RTL state management
2. **Custom Text Component** - Automatic Arabic scaling and RTL handling
3. **RTL Utilities** - Helper functions for common RTL patterns
4. **Language Hook** - Centralized language state management

### File Structure

```
apps/superhome_main/
├── contexts/
│   ├── RTLContext.tsx    # Global RTL provider
│   └── index.ts          # Context exports
├── hooks/
│   └── useLanguage.ts    # Language state hook
├── components/
│   └── Text.tsx          # RTL-aware Text component
├── utils/
│   └── rtl.ts            # RTL utility functions
└── docs/
    └── RTL_SETUP.md      # This guide
```

## Usage Guidelines

### 1. Using RTL Context

```typescript
import { useRTL } from '@/contexts';

export default function MyComponent() {
  const { language, isRTL, setLanguage } = useRTL();
  
  // language: 'en' | 'ar'
  // isRTL: boolean
  // setLanguage: (lang: 'en' | 'ar') => void
}
```

### 2. Using Custom Text Component

```typescript
import { Text } from '@/components/Text';

// Basic usage with automatic RTL handling
<Text variant="body" language={language}>Hello World</Text>

// Disable scaling for large headlines
<Text variant="heading" language={language} disableScaling>
  Large Title
</Text>

// All variants supported: heading, title, subtitle, body, caption
// All weights supported: light, normal, medium, semibold, bold
```

### 3. RTL Utilities

```typescript
import { rtlStyles, getTextAlign, getFlexDirection } from '@/utils/rtl';

// Using predefined styles
<View style={rtlStyles.row(language)}>
  <Text>Content</Text>
</View>

// Using utility functions
<Text style={{ textAlign: getTextAlign('left', language) }}>
  Aligned Text
</Text>

<View style={{ 
  flexDirection: getFlexDirection('row', language) 
}}>
  Row Content
</View>
```

## RTL Features

### Automatic Features
- **Arabic Font Scaling**: 1.1x larger for better readability
- **Text Alignment**: Automatic RTL alignment handling
- **Layout Direction**: Managed by React Native's I18nManager
- **Line Height**: Scales proportionally with font size

### Manual Controls
- **disableScaling**: Disable automatic scaling for specific elements
- **language prop**: Explicit language control for Text components
- **RTL utilities**: Fine-grained control over layouts

## Best Practices

### ✅ Do
- Always use custom Text component
- Pass language prop to Text components
- Use RTL utilities for layout adjustments
- Test both LTR and RTL layouts
- Use semantic naming for RTL-aware styles

### ❌ Don't
- Use React Native Text directly
- Hard-code text alignment values
- Ignore Arabic font scaling
- Assume LTR layout in styles
- Mix RTL and non-RTL components

## Testing RTL

### Manual Testing
1. Toggle language between English and Arabic
2. Verify text alignment changes
3. Check font scaling in Arabic
4. Test layout direction changes
5. Validate all interactive elements

### Automated Testing
```typescript
// Example RTL test
import { render, screen } from '@testing-library/react-native';
import { RTLProvider } from '@/contexts';

test('renders correctly in RTL', () => {
  render(
    <RTLProvider defaultLanguage="ar">
      <MyComponent />
    </RTLProvider>
  );
  
  // Test RTL-specific behavior
});
```

## Migration Guide

### Converting Existing Components

1. **Replace Text imports**:
   ```typescript
   // Before
   import { Text } from 'react-native';
   
   // After
   import { Text } from '@/components/Text';
   ```

2. **Add language prop**:
   ```typescript
   // Before
   <Text>Hello</Text>
   
   // After
   <Text language={language}>Hello</Text>
   ```

3. **Use RTL context**:
   ```typescript
   // Before
   const [language, setLanguage] = useState('en');
   
   // After
   const { language, setLanguage } = useRTL();
   ```

## Troubleshooting

### Common Issues

1. **Text not scaling in Arabic**
   - Ensure language prop is passed to Text component
   - Check that disableScaling is not set to true

2. **Layout not flipping in RTL**
   - Ensure RTLProvider wraps the app
   - Check I18nManager.isRTL state

3. **Text alignment issues**
   - Use rtl.getTextAlign() instead of hard-coded values
   - Verify language prop is correct

### Debug Tools

```typescript
// Debug RTL state
console.log('Language:', language);
console.log('Is RTL:', isRTL);
console.log('I18nManager.isRTL:', I18nManager.isRTL);
```

## Future Enhancements

### Planned Features
- [ ] Persistent language selection
- [ ] Dynamic font scaling based on device
- [ ] Advanced RTL animations
- [ ] RTL-specific gesture handling
- [ ] Bi-directional text support

### Performance Considerations
- RTL context is optimized for minimal re-renders
- Text component uses memoization for expensive calculations
- Utilities are pure functions for optimal performance
