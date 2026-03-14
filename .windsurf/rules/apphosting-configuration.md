---
description: Configure apphosting.yaml for different scenarios
always_on: true
---

# Firebase App Hosting Configuration

This workflow covers configuring `apphosting.yaml` for different deployment scenarios.

## Current Configuration

Our project uses Bun for both build and run:

```yaml
scripts:
  buildCommand: curl -fsSL https://bun.sh/install | bash && export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH" && bun install && bun run build
  runCommand: export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH" && bun run start
```

## Alternative Configurations

### 1. Standard npm (Recommended for most cases)

```yaml
scripts:
  buildCommand: npm run build
  runCommand: npm start
```

**Pros:** Framework optimizations, faster builds
**Cons:** No Bun usage

### 2. Environment Variables

```yaml
env:
  - variable: NODE_ENV
    value: production
    availability: [BUILD, RUNTIME]
  - variable: API_KEY
    secret: myApiKeySecret
```

### 3. Custom Build Output

```yaml
outputFiles:
  serverApp:
    include: [dist, node_modules]
```

### 4. Cloud Run Configuration

```yaml
runConfig:
  cpu: 2
  memoryMiB: 512
  minInstances: 0
  maxInstances: 14
  concurrency: 80
```

## Configuration Options

### Scripts Override
- `buildCommand`: Override default build command
- `runCommand`: Override default start command

### Environment Variables
- `availability`: BUILD, RUNTIME, or both
- `secret`: Reference Cloud Secret Manager

### Output Files
- `include`: Files/directories to include in deployment
- Use `.` to include all files

### Resource Settings
- `cpu`: CPU units (1-4)
- `memoryMiB`: Memory in MB (512-32768)
- `minInstances`: Minimum instances (0-100)
- `maxInstances`: Maximum instances (1-100)

## Best Practices

1. Use npm for deployment unless Bun is required
2. Set appropriate resource limits
3. Use secrets for sensitive data
4. Include only necessary files in output
5. Test configurations in staging first

## Documentation

📖 **[Official Firebase App Hosting Configuration Guide](https://firebase.google.com/docs/app-hosting/configure)**

Reference this for all available options and detailed explanations.
