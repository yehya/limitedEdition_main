---
trigger: always_on
---

# COMPONENTIZATION GUIDELINES
Reusable Components Pattern

## OBJECTIVE

Eliminate duplicate code by creating reusable components for common UI patterns.
All screens should use shared components instead of duplicating styles and structure.

---

## SHARED COMPONENTS CREATED

### 1. ScreenLayout
**Purpose:** Consistent container and scroll behavior

**Usage:**
```tsx
<ScreenLayout showScrollView={true}>
  {children}
</ScreenLayout>
```

**Provides:**
- Container with theme background
- StatusBar configuration
- ScrollView wrapper (optional)
- Consistent scroll behavior

---

### 2. ScreenHeader
**Purpose:** Consistent header with back button

**Usage:**
```tsx
<ScreenHeader onBack={() => router.back()} />
```

**Provides:**
- Back button
- Consistent padding (top, horizontal)
- Proper spacing from edges

---

### 3. ScreenContent
**Purpose:** Consistent content padding

**Usage:**
```tsx
<ScreenContent>
  {children}
</ScreenContent>
```

**Provides:**
- Horizontal padding
- Flex layout
- RTL support

---

### 4. ScreenTitle
**Purpose:** Consistent title and subtitle styling

**Usage:**
```tsx
<ScreenTitle 
  title="Main Title"
  subtitle="Optional subtitle"
/>
```

**Provides:**
- Large heading style
- Optional subtitle
- Consistent spacing
- Theme colors

---

### 5. BottomButton
**Purpose:** Consistent bottom CTA button

**Usage:**
```tsx
<BottomButton 
  text="Continue"
  onPress={handleContinue}
  disabled={!isValid}
/>
```

**Provides:**
- Primary button styling
- Disabled state
- Consistent padding
- Shadow effects

---

## REFACTORING PATTERN

### Before (Duplicate Code):
```tsx
export default function SomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.subtitle}>Subtitle</Text>
          {/* Content */}
        </View>
        <View style={styles.bottomSection}>
          <Pressable style={styles.button}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1 },
  header: { paddingTop: 16, paddingHorizontal: 24 },
  content: { flex: 1, paddingHorizontal: 24 },
  title: { fontSize: 32, fontWeight: '700' },
  subtitle: { fontSize: 18, color: '#666' },
  bottomSection: { padding: 24 },
  button: { backgroundColor: '#007AFF', padding: 24 },
});
```

### After (Using Components):
```tsx
export default function SomeScreen() {
  return (
    <ScreenLayout>
      <ScreenHeader onBack={() => router.back()} />
      <ScreenContent>
        <ScreenTitle 
          title="Title"
          subtitle="Subtitle"
        />
        {/* Content */}
      </ScreenContent>
      <BottomButton 
        text="Continue"
        onPress={handleContinue}
      />
    </ScreenLayout>
  );
}

// Only screen-specific styles remain
const styles = StyleSheet.create({
  // Only unique styles for this screen
});
```

---

## BENEFITS

### Code Reduction
- **Before:** ~100+ lines of duplicate styles per screen
- **After:** ~10-20 lines of screen-specific styles

### Consistency
- All screens have identical spacing
- All back buttons positioned the same
- All bottom buttons styled identically

### Maintainability
- Change once, applies everywhere
- No style drift between screens
- Easier to update theme

### Theme Compliance
- All components use theme system
- No hardcoded values
- Automatic RTL support

---

## SCREENS TO REFACTOR

**Priority order:**
1. ✅ Time selection screen (DONE)
2. Address screen
3. Payment screen
4. Service detail screen
5. Job tracking screen
6. Price approval screen
7. Job completed screen
8. Review screen
9. Retention prompt screen

---

## COMPONENT LOCATIONS

All shared components are in:
```
/app/components/shared/
  - BackButton.tsx
  - ScreenLayout.tsx
  - ScreenHeader.tsx
  - ScreenContent.tsx
  - ScreenTitle.tsx
  - BottomButton.tsx
```

---

## RULES

1. **NEVER duplicate header styles** - Use ScreenHeader
2. **NEVER duplicate container/scroll styles** - Use ScreenLayout
3. **NEVER duplicate title styles** - Use ScreenTitle
4. **NEVER duplicate bottom button styles** - Use BottomButton
5. **ALWAYS use theme system** - No hardcoded values
6. **KEEP screen-specific styles** - Only unique UI elements

---

## EXAMPLE: Complete Screen Structure

```tsx
import { ScreenLayout } from './components/shared/ScreenLayout';
import { ScreenHeader } from './components/shared/ScreenHeader';
import { ScreenContent } from './components/shared/ScreenContent';
import { ScreenTitle } from './components/shared/ScreenTitle';
import { BottomButton } from './components/shared/BottomButton';

export default function ExampleScreen() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);

  return (
    <ScreenLayout>
      <ScreenHeader onBack={() => router.back()} />
      
      <ScreenContent>
        <ScreenTitle 
          title="Screen Title"
          subtitle="Optional description"
        />
        
        {/* Screen-specific content */}
        <View style={styles.customContent}>
          {/* Your unique UI */}
        </View>
      </ScreenContent>

      <BottomButton 
        text="Continue"
        onPress={() => router.push('/next')}
        disabled={!isValid}
      />
    </ScreenLayout>
  );
}

// Only screen-specific styles
const styles = StyleSheet.create({
  customContent: {
    // Your unique styles
  },
});
```

---

**This pattern eliminates 70%+ duplicate code across all screens!**
