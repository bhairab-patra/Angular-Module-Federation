/**
 * Copies the combined Angular Elements bundle into the React demo app's
 * public/ folder so Vite can serve it as a static <script> tag.
 *
 * Run via:  npm run copy:react   (called automatically by build:full)
 */
const fs   = require('fs');
const path = require('path');

const publicDir  = path.resolve(__dirname, '../demo/my-react-app/public');
const stylesDir  = path.resolve(__dirname, '../projects/platform-ui/src/styles');
const themesDir  = path.join(stylesDir, 'themes');
const publicThemesDir = path.join(publicDir, 'themes');

if (!fs.existsSync(publicDir))       fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(publicThemesDir)) fs.mkdirSync(publicThemesDir, { recursive: true });

// Elements bundle
fs.copyFileSync(
  path.resolve(__dirname, '../dist/elements/pui-elements.js'),
  path.join(publicDir, 'pui-elements.js')
);
console.log(`✓  Copied pui-elements.js  → demo/my-react-app/public/`);

// CSS tokens
fs.copyFileSync(
  path.join(stylesDir, 'tokens.css'),
  path.join(publicDir, 'tokens.css')
);
console.log(`✓  Copied tokens.css       → demo/my-react-app/public/`);

// Theme file
fs.copyFileSync(
  path.join(themesDir, 'theme-new.css'),
  path.join(publicThemesDir, 'theme-new.css')
);
console.log(`✓  Copied theme-new.css    → demo/my-react-app/public/themes/`);
