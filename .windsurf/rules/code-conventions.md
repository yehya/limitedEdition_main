---
description: Code and component conventions for SuperHome
always_on: true
---

# SuperHome - Code Conventions

## File Structure

```
app/
├── (auth)/              # Auth flow (phone login, one screen per step)
│   ├── phone.tsx        # Enter phone number
│   ├── otp.tsx          # Enter OTP
│   └── name.tsx         # Enter name
├── (customer)/          # Customer screens
│   ├── chat.tsx         # AI chat interface (main screen)
│   ├── time-slots.tsx   # Pick time slot (3 options)
│   ├── confirm.tsx      # Confirm booking
│   └── tracking.tsx     # Job status tracking
├── (provider)/          # Provider screens
│   ├── jobs.tsx         # Available jobs
│   ├── active.tsx       # Active job
│   └── earnings.tsx     # Earnings
├── _layout.tsx          # Root layout
├── index.tsx            # Entry (redirect based on auth/role)
└── home.tsx             # Home screen
```

## Component Rules

- All screens are full-screen, no nested scrollable areas
- Primary CTA always at bottom of screen
- Use `SafeAreaView` on every screen
- Minimum touch target: 48x48
- All text inputs are full-width
- One input per screen for onboarding flows

## Naming

- Screens: kebab-case filenames (`time-slots.tsx`)
- Components: PascalCase (`ChatBubble.tsx`)
- Hooks: camelCase with `use` prefix (`useAuth.ts`)
- Services: camelCase (`firebaseService.ts`)

## State Management

- Zustand for global state
- React Query / hooks for Firebase data
- No prop drilling beyond 1 level

## Environment

- All Firebase config via `EXPO_PUBLIC_*` env vars
- Never hardcode API keys or project IDs
