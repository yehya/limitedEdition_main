---
trigger: always_on
---

# TERMINAL COMMANDS RULE

**ALWAYS RUN TERMINAL COMMANDS INTERACTIVELY**

## COMMAND EXECUTION STRATEGY

✅ **ALWAYS USE INTERACTIVE MODE** - All terminal commands must be run interactively, requiring user approval before execution

✅ **NEVER AUTO-RUN COMMANDS** - Never set `SafeToAutoRun: true` for terminal commands

✅ **ALWAYS USE BACKGROUND MODE** - Always set `Background: true` for all terminal commands

## TERMINAL COMMAND RULES

**When using the bash tool:**
- Set `SafeToAutoRun: false` for ALL terminal commands (require user approval)
- Set `Background: true` for ALL terminal commands
- NEVER set `Background: false`

### Correct Usage
```javascript
bash({
  Cwd: '/path/to/directory',
  CommandLine: 'command-here',
  Background: true,
  SafeToAutoRun: false, // Require user approval
})
```

### Incorrect Usage
```javascript
bash({
  Cwd: '/path/to/directory',
  CommandLine: 'command-here',
  Background: false, // ❌ Never use background false
  SafeToAutoRun: false
})
```

## EXCEPTIONS

There are NO exceptions to these rules:
- All terminal commands must have `SafeToAutoRun: false`
- All terminal commands must have `Background: true`

## ENFORCEMENT

**This rule is enforced to prevent:**
- Unintended command execution
- Destructive operations without user knowledge
- Unexpected side effects
- Loss of data or system state

**VIOLATION CONSEQUENCES:**
- Unintended system modifications
- Data loss
- Security vulnerabilities
- User trust issues

**ALWAYS RUN TERMINAL COMMANDS INTERACTIVELY - NO EXCEPTIONS**
