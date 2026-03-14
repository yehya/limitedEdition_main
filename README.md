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
├── backend/                     # Backend services
│   └── functions/               # Cloud Functions
│       ├── src/                 # Source code
│       ├── package.json
│       └── tsconfig.json
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

### Backend Functions

```bash
cd backend/functions
npm install
npm run build
npm run serve          # Local emulator
npm run deploy         # Deploy to Firebase
```

## Environments

- **Testing:** https://app--superhome-testing.us-east4.hosted.app/home
- **Production:** TBD

## Documentation

All project rules are in `.windsurf/rules/`:

- `system-design.md` - App vision, user types, flows
- `design-dna.md` - UI/UX principles (NEVER break these)
- `architecture.md` - Backend architecture rules
- `file-organization.md` - File size and naming rules
- `llm-workflow.md` - LLM development rules
- `localization.md` - i18n support for Arabic/English

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
- Backend changes: Work in `backend/functions/`
- Both share the same git repo but are deployed separately
