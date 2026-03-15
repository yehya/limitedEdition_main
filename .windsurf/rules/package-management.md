---
trigger: always_on
---

# PACKAGE MANAGEMENT RULE

**ALWAYS USE BUN LOCALLY FOR TERMINAL COMMANDS**

## REQUIRED PACKAGE MANAGER

✅ **USE BUN** - Always use bun for all package management operations locally

## FORBIDDEN PACKAGE MANAGERS

❌ **NEVER USE npm** - Do not use npm for any package operations
❌ **NEVER USE yarn** - Do not use yarn for any package operations
❌ **NEVER USE pnpm** - Do not use pnpm for any package operations

## BUN COMMANDS

### Installing Packages
```bash
bun install
```

### Adding Packages
```bash
bun add package-name
bun add package-name --dev
```

### Removing Packages
```bash
bun remove package-name
```

### Running Scripts
```bash
bun run script-name
bun start
bun dev
```

## EXPO COMPATIBILITY

**Always check Expo version compatibility before installing packages:**
- Use `bunx expo install package-name` for Expo-compatible packages
- Verify package versions match Expo SDK requirements
- Remove incompatible packages immediately with `bun remove`

## ENFORCEMENT

**This rule is enforced to prevent:**
- Package version conflicts
- Expo SDK compatibility issues
- Lockfile corruption
- Dependency resolution problems

**VIOLATION CONSEQUENCES:**
- Build failures
- Runtime errors
- App crashes
- Development environment issues

**ALWAYS USE BUN LOCALLY - NO EXCEPTIONS**
