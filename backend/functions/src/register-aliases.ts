import 'module-alias/register';
import { resolve } from 'path';
import { addAlias } from 'module-alias';

const aliases = {
  '@': resolve(__dirname),
  '@models': resolve(__dirname, 'models'),
  '@db': resolve(__dirname, 'db'),
  '@middleware': resolve(__dirname, 'middleware'),
  '@utils': resolve(__dirname, 'utils'),
  '@config': resolve(__dirname, 'config'),
};

for (const [alias, path] of Object.entries(aliases)) {
  addAlias(alias, path);
}
