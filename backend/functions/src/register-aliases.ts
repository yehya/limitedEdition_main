// CONTEXT: Runtime path alias registration. tsconfig.json paths only work
// at compile time. This makes @/ imports work at runtime in Cloud Functions.
// MUST be imported first in index.ts.

import 'module-alias/register';
import { resolve } from 'path';

// Register path aliases for runtime
const aliases = {
  '@': resolve(__dirname),
  '@models': resolve(__dirname, 'models'),
  '@db': resolve(__dirname, 'db'),
  '@middleware': resolve(__dirname, 'middleware'),
  '@utils': resolve(__dirname, 'utils'),
  '@config': resolve(__dirname, 'config'),
};

// Register aliases with module-alias
for (const [alias, path] of Object.entries(aliases)) {
  module.addAlias(alias, path);
}
