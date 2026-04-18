---
trigger: always_on
---

# DEPLOYMENT RULE

**ALWAYS DEPLOY ONLY THE CHANGED FUNCTION USING BLOCKING COMMANDS**

## DEPLOYMENT STRATEGY

✅ **DEPLOY ONLY THE CHANGED FUNCTION** - When deploying Firebase Cloud Functions, only deploy the specific function that was modified, not all functions

✅ **USE BLOCKING COMMANDS** - Always use blocking terminal commands (wait for completion), never background commands

## DEPLOYMENT COMMANDS

### Single Function Deployment
```bash
firebase deploy --only functions:functionName
```

### Examples
```bash
firebase deploy --only functions:deleteOrderFnV2
firebase deploy --only functions:updateOrderStatusFnV2
firebase deploy --only functions:createProductFnV2
```

## TERMINAL COMMAND RULES

**When using the bash tool:**
- Set `SafeToAutoRun: false` for deployment commands (require user approval)
- Set `Background: false` (blocking, wait for completion)
- NEVER set `Background: true` for deployments

### Correct Usage
```javascript
bash({
  Cwd: '/path/to/backend',
  CommandLine: 'firebase deploy --only functions:deleteOrderFnV2',
  Background: false, // Block until complete
  SafeToAutoRun: false, // Require user approval
})
```

### Incorrect Usage
```javascript
bash({
  Cwd: '/path/to/backend',
  CommandLine: 'firebase deploy --only functions', // ❌ Deploys all functions
  Background: true, // ❌ Runs in background
  SafeToAutoRun: true, // ❌ Auto-runs without approval
})
```

## ENFORCEMENT

**This rule is enforced to prevent:**
- Unnecessary deployments of unchanged functions
- Deployment timeouts from deploying all functions
- Deployment failures from background processes
- Incomplete deployments that aren't properly monitored

**VIOLATION CONSEQUENCES:**
- Longer deployment times
- Increased deployment costs
- Failed deployments without proper error handling
- Inability to track deployment status

**DEPLOY ONLY CHANGED FUNCTIONS - USE BLOCKING COMMANDS - NO EXCEPTIONS**
