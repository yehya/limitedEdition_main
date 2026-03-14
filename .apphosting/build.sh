#!/bin/bash
# Install Bun
curl -fsSL https://bun.sh/install | bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Install dependencies with Bun
bun install

# Build the app
bun run build

# Start the server
bun run start
