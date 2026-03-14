// CONTEXT: Path aliases (@/ imports) only work at compile time via tsconfig.
// At runtime (Cloud Functions), Node.js doesn't know about them.
// This file registers runtime aliases so @/ imports resolve correctly.
// Must be imported FIRST in index.ts before any other imports.

import moduleAlias from "module-alias";
import path from "path";

const rootPath = path.join(__dirname, "..");

moduleAlias.addAliases({
  "@": path.join(rootPath, "src"),
  "@models": path.join(rootPath, "src/models"),
  "@services": path.join(rootPath, "src/services"),
  "@db": path.join(rootPath, "src/db"),
  "@middleware": path.join(rootPath, "src/middleware"),
  "@utils": path.join(rootPath, "src/utils"),
  "@config": path.join(rootPath, "src/config"),
});
