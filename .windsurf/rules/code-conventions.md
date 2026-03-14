---
description: Code and component conventions for SuperHome
always_on: true
---

# Code Conventions

## Structure
```
app/
├── (auth)/: phone.tsx, otp.tsx, name.tsx
├── (customer)/: chat.tsx, time-slots.tsx, confirm.tsx, tracking.tsx
├── (provider)/: jobs.tsx, active.tsx, earnings.tsx
├── _layout.tsx, index.tsx, home.tsx
```

## Rules
- Full-screen, no nested scrolling
- Primary CTA at bottom
- `SafeAreaView` on every screen
- Min touch target: 48x48
- Full-width inputs, one per screen

## Naming
**Screens:** kebab-case | **Components:** PascalCase | **Hooks:** usePrefix | **Services:** camelCase

## State
**Global:** Zustand | **Firebase:** React Query/hooks | **Props:** Max 1 level drilling

## Env
All Firebase config via `EXPO_PUBLIC_*`. Never hardcode keys.
