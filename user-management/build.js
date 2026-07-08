'use strict';
const path = require('path');
const http = require('http');
const fs = require('fs');
const esbuild = require('esbuild');

const isServe = process.argv.includes('--serve');
const PORT = 4203;
const DIST = path.join(__dirname, 'dist', 'user-management');

// ── 1. Custom esbuild adapter — handles React JSX ────────────────────────────
async function reactAdapter({ entryPoints, external, outdir, dev, hash }) {
  if (!fs.existsSync(outdir)) fs.mkdirSync(outdir, { recursive: true });

  const result = await esbuild.build({
    // NF passes outName with .js extension (e.g. './Bootstrap.js').
    // esbuild would then produce 'Bootstrap.js.js'. Strip the extension so
    // esbuild creates 'Bootstrap.js' (or 'Bootstrap-hash.js'), which NF
    // can correctly un-hash back to 'Bootstrap.js' in the result map.
    entryPoints: entryPoints.map(ep => ({ in: ep.fileName, out: ep.outName.replace(/\.js$/, '') })),
    bundle: true,
    format: 'esm',
    outdir,
    external,
    jsx: 'automatic',          // React 18 automatic JSX transform (no import React needed)
    jsxImportSource: 'react',
    minify: !dev,
    sourcemap: !!dev,
    platform: 'browser',
    target: 'es2020',
    metafile: true,
    entryNames: hash ? '[dir]/[name]-[hash]' : '[dir]/[name]',
    logLevel: 'silent',
  });

  const outputs = Object.keys(result.metafile?.outputs ?? {});
  return outputs
    .filter(f => f.endsWith('.js') || f.endsWith('.mjs'))
    .map(f => ({ fileName: f }));
}

// ── 2. NF Federation build — generates remoteEntry.json + shared bundles ────
async function buildFederation() {
  const { federationBuilder, setBuildAdapter } = require('@softarc/native-federation/build');

  setBuildAdapter(reactAdapter);

  await federationBuilder.init({
    options: {
      workspaceRoot: __dirname,
      outputPath:    'dist/user-management',
      federationConfig: 'federation.config.js',
      dev:   isServe,
      watch: false,
    },
    adapter: reactAdapter,
  });

  await federationBuilder.build();
}

// ── 3. Standalone React app build — for direct browser access ────────────────
async function buildApp() {
  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

  await esbuild.build({
    entryPoints: [{ in: 'src/main.tsx', out: 'main' }],
    bundle: true,
    format: 'esm',
    outdir: DIST,
    jsx: 'automatic',
    jsxImportSource: 'react',
    minify: !isServe,
    sourcemap: !!isServe,
    platform: 'browser',
    target: 'es2020',
    logLevel: 'silent',
  });

  // Copy assets
  const assetsDir = path.join(DIST, 'assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
  fs.copyFileSync('src/assets/nav.json', path.join(assetsDir, 'nav.json'));
  fs.copyFileSync('src/styles.css', path.join(DIST, 'styles.css'));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Management</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body style="margin:0">
  <div id="root" style="height:100vh"></div>
  <script type="module" src="main.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(DIST, 'index.html'), html);
}

// ── 4. Static HTTP server with CORS ─────────────────────────────────────────
function startServer() {
  const mime = {
    '.js': 'application/javascript', '.json': 'application/json',
    '.html': 'text/html', '.css': 'text/css',
    '.png': 'image/png', '.svg': 'image/svg+xml',
  };

  http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(200).end(); return; }

    let filePath = path.join(DIST, req.url.split('?')[0]);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST, 'index.html');
    }

    try {
      res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'text/plain' });
      res.end(fs.readFileSync(filePath));
    } catch { res.writeHead(404).end('Not found'); }
  }).on('error', err => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌  Port ${PORT} is already in use. Stop the other process and retry.\n`);
    } else {
      console.error(err);
    }
    process.exit(1);
  }).listen(PORT, () => {
    console.log(`\n✅  User Management remote  →  http://localhost:${PORT}`);
    console.log(`    remoteEntry.json        →  http://localhost:${PORT}/remoteEntry.json\n`);
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  try {
    console.log('\n🔨  Building User Management with Native Federation...\n');
    await buildFederation();
    await buildApp();
    console.log('✅  Build complete!\n');
    if (isServe) startServer();
  } catch (err) {
    console.error('\n❌  Build failed:', err.message || err);
    process.exit(1);
  }
})();
