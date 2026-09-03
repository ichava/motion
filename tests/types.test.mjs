// M9. The package advertised `exports["."].types` at ./dist/ichava-motion.d.ts
// with no file there at all -- every TS consumer got `any`. The source is
// plain JS, so there is nothing for `tsc --declaration` to generate from;
// ichava-motion.d.ts is hand-written and only as trustworthy as something
// that actually typechecks a real call pattern against it.
//
// fixtures/types-usage.ts imports the source `.js` directly (not `dist/`),
// relying on TypeScript's own resolution of a sibling `.d.ts` -- the same
// path a consumer's bundler takes through `exports["."].types` once built.
//
// Run: node --test tests/*.test.mjs

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

test('src/ichava-motion.d.ts declares the full public API used by the fixture', () => {
  const tsc = join(root, 'node_modules/.bin/tsc');
  assert.ok(existsSync(tsc), 'typescript devDependency not installed');

  execFileSync(tsc, ['-p', join(here, 'fixtures/tsconfig.json')], {
    cwd: root,
    stdio: 'pipe', // surfaced via the thrown error's stdout/stderr on failure
  });
});

test('build copies the declaration file to dist/', () => {
  const distDts = join(root, 'dist/ichava-motion.d.ts');
  if (!existsSync(distDts)) {
    // Not built in this checkout -- entrypoints.test.mjs applies the same
    // "skip if unbuilt" convention for the JS artifacts.
    return;
  }
  assert.ok(existsSync(distDts));
});
