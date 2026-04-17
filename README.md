# Blank Project

A clean Expo React Native project with preserved architecture and .windsurf rules.

## Repository Structure

```
limitedEdition/
├── apps/
│   └── limitedEdition_main/     # Expo React Native app (Web, iOS, Android)
│       ├── app/                 # App screens (blank)
│       ├── package.json
│       ├── app.json
│       └── ...
├── .windsurf/                   # Project rules and documentation
│   └── rules/
└── README.md
```

## Quick Start

### Mobile App (Expo)

```bash
cd apps/limitedEdition_main
bun install
bun run dev:testing    # Testing environment
bun run dev:production # Production environment
```

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
- **Package Manager:** Bun (local)

## Architecture

This project follows a monorepo structure with:
- Expo Router for file-based routing
- TypeScript for type safety
- Path aliases configured in tsconfig.json (@/*)
- Theme system (see THEME_RULE.md)
- Component-based architecture
