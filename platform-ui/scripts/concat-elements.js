/**
 * Concatenates the Angular Elements build output into a single distributable file.
 * Run automatically via: npm run build:elements
 *
 * Output: dist/elements/pui-elements.js
 */
const fs   = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../dist/elements');
const order  = ['runtime.js', 'polyfills.js', 'main.js'];

const parts = order
  .map(f => path.join(outDir, f))
  .filter(f => fs.existsSync(f))
  .map(f => fs.readFileSync(f, 'utf8'));

const combined = parts.join('\n');
const dest = path.join(outDir, 'pui-elements.js');
fs.writeFileSync(dest, combined, 'utf8');

console.log(`✓  pui-elements.js  (${(combined.length / 1024).toFixed(1)} kB unminified)`);
console.log(`   → ${dest}`);
