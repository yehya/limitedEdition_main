# SuperHome

The easiest, most innovative home services app in the world. AI-powered. Zero decision fatigue.

## Repository Structure

```
royalhome_app/
├── apps/
│   └── superhome_main/          # Expo React Native app (Web, iOS, Android)
│       ├── app/                 # App screens
│       ├── package.json
│       ├── app.json
│       └── ...
├── firebase/                    # Firebase Cloud Functions
│   ├── functions/
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── firebase.json
│   └── .firebaserc
├── .windsurf/                   # Project rules and documentation
│   └── rules/
└── README.md
```

## Quick Start

### Mobile App (Expo)

```bash
cd apps/superhome_main
bun install
bun run dev:testing    # Testing environment
bun run dev:production # Production environment
```

### Firebase Functions

```bash
cd firebase/functions
npm install
npm run build
npm run serve          # Local emulator
npm run deploy         # Deploy to Firebase
```

## Environments

- **Testing:** https://app--superhome-testing.us-east4.hosted.app/home
- **Production:** TBD

## Documentation

All project rules and documentation are in `.windsurf/rules/`:

- `system-design.md` - App vision, user flows, A/B testing
- `design-dna.md` - UI/UX principles (NEVER break these)
- `firebase-plan.md` - Architecture and build phases
- `code-conventions.md` - Code standards
- `multi-environment.md` - Environment setup

## Tech Stack

- **Mobile:** Expo + React Native + React Native Web
- **Backend:** Firebase (Firestore, Cloud Functions, Authentication)
- **Hosting:** Firebase App Hosting
- **Package Manager:** Bun (local), npm (deployment)

## Key Principles

1. **One thing per screen** - Never overwhelm the user
2. **Zero decision fatigue** - AI decides, user confirms
3. **3-second rule** - User understands any screen in 3 seconds
4. **Frictionless** - If it feels like work, redesign it

## Development

Each codebase is independent:
- App changes: Work in `apps/superhome_main/`
- Functions changes: Work in `firebase/`
- Both share the same git repo but are deployed separately
