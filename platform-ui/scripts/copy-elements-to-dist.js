/**
 * Copies the Angular Elements bundle into dist/platform-ui/elements/
 * and patches dist/platform-ui/package.json with the exports entry
 * so consumers can do:
 *   import '@solifi/platform-ui/elements'   // React / Vue / plain JS
 *   import '@solifi/platform-ui'            // Angular (unchanged)
 */
const fs   = require('fs');
const path = require('path');

const elemSrc  = path.resolve(__dirname, '../dist/elements');
const libDist  = path.resolve(__dirname, '../dist/platform-ui');
const elemDest = path.join(libDist, 'elements');

// ── 1. Create elements/ folder inside lib dist ───────────────────────────────
if (!fs.existsSync(elemDest)) fs.mkdirSync(elemDest, { recursive: true });

// ── 2. Copy pui-elements.js ──────────────────────────────────────────────────
fs.copyFileSync(
  path.join(elemSrc, 'pui-elements.js'),
  path.join(elemDest, 'pui-elements.js')
);

// ── 3. Copy styles.css ───────────────────────────────────────────────────────
fs.copyFileSync(
  path.join(elemSrc, 'styles.css'),
  path.join(elemDest, 'styles.css')
);

// ── 4. Patch dist/platform-ui/package.json with exports map ─────────────────
const pkgPath = path.join(libDist, 'package.json');
const pkg     = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Derive the fesm filename from the package name: @scope/name → scope-name.mjs
const pkgName    = pkg.name.replace(/^@/, '').replace(/\//, '-');
const fesmFile   = `./fesm2022/${pkgName}.mjs`;

pkg.exports = {
  '.': {
    types:   './index.d.ts',
    default: fesmFile
  },
  './elements': {
    default: './elements/pui-elements.js'
  },
  './elements/styles.css': {
    default: './elements/styles.css'
  }
};

// Also expose a convenience "elements" top-level field for bundlers
// that don't support exports map yet (e.g. older webpack 4 setups)
pkg.browser = pkg.browser || {};

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

console.log('✓  Copied  dist/platform-ui/elements/pui-elements.js');
console.log('✓  Copied  dist/platform-ui/elements/styles.css');
console.log('✓  Patched dist/platform-ui/package.json  (exports map added)');
