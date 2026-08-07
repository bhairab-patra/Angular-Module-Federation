# Solifi Micro-Frontend Platform

Angular 19 micro-frontend shell built with Native Federation.  
Admin-hub is the host shell. All other apps are independent remotes loaded at runtime.

---

## Architecture Overview

```
admin-hub (localhost:4200)             ← HOST shell
  ├── experience-hub (localhost:4201)  ← REMOTE
  ├── e-invoice      (localhost:4202)  ← REMOTE
  └── tntmg-hub      (localhost:8766)  ← REMOTE (tenant-management-service)

platform-ui                            ← Shared Angular component library
```

---

## Project Structure

```
ANGULR_ARCH/
├── admin-hub/           Host shell — routing, sidebar, layout
├── experience-hub/      Experience & expenses remote
├── e-invoice/           E-Invoice remote
├── platform-ui/         Shared component library (@solifi/platform-ui)
└── README.md

tenant-management-service/ui/          T-Management remote (separate repo)
```

---

## Tech Stack

| Technology | Version |
|-----------|---------|
| Angular | 19 |
| Native Federation | 19 |
| TypeScript | 5.6 |
| zone.js | 0.15 |
| es-module-shims | 1.10 |
| Node.js | 18+ |

---

## Getting Started

### Prerequisites

```bash
node --version   # 18+
npm --version    # 9+
```

### Install Dependencies (each app separately)

```bash
cd platform-ui                  && npm install --legacy-peer-deps
cd admin-hub                    && npm install --legacy-peer-deps
cd experience-hub               && npm install --legacy-peer-deps
cd e-invoice                    && npm install --legacy-peer-deps
cd tenant-management-service/ui && npm install --legacy-peer-deps
```

### Build Shared Library First

```bash
cd platform-ui
npm run build:local
```

---

## Running Locally

Start each app in a separate terminal. **Order matters.**

```bash
# Terminal 1 — Experience Hub (remote)
cd experience-hub && npm start
# → http://localhost:4201

# Terminal 2 — E-Invoice (remote)
cd e-invoice && npm start
# → http://localhost:4202

# Terminal 3 — T-Management (remote)
cd tenant-management-service/ui && npm start
# → http://localhost:8766

# Terminal 4 — Admin Hub (host) — start LAST
cd admin-hub && npm start
# → http://localhost:4200
```

Open **http://localhost:4200** in your browser.

---

## Application Ports

| App | Port | Role |
|-----|------|------|
| admin-hub | 4200 | Host shell |
| experience-hub | 4201 | Remote |
| e-invoice | 4202 | Remote |
| tntmg-hub | 8766 | Remote |

---

## Dynamic Sidebar — Nav Config

Each remote controls its own sidebar menu via `src/assets/nav.json`.  
Admin-hub reads all nav configs at startup — zero code changes in admin-hub when remotes add pages.

**Remote `nav.json` format:**
```json
{
  "label": "My App",
  "icon": "🔧",
  "baseRoute": "/my-app",
  "children": [
    { "label": "Home", "route": "/my-app" },
    { "label": "List", "route": "/my-app/list" }
  ]
}
```

**Admin-hub remote registry (`src/assets/remotes.json`):**
```json
[
  { "name": "experience-hub", "url": "http://localhost:4201" },
  { "name": "e-invoice",      "url": "http://localhost:4202" },
  { "name": "tntmg-hub",      "url": "http://localhost:8766" }
]
```

---

## Adding a New Remote

### Remote Team Does

```
1. Install NF:  npm install @angular-architects/native-federation@^19.0.0
2. Add federation.config.js
3. Create src/app/remote-entry/entry.routes.ts
4. Update angular.json with NF build/serve targets
5. Split main.ts → main.ts + bootstrap.ts
6. Add src/assets/nav.json
7. Share: remote name, export name, deployed URLs
```

### Admin-Hub Team Does

```
1. Add URL to src/assets/remotes.json
2. Add route to src/app/app.routes.ts
3. Add remote to src/main.ts federation map
4. Add remote to federation.config.js remotes
```

**Information sheet remote team fills in:**
```
App Name          : ___________________
Route Export Name : ___________________
Base Route Path   : ___________________
DEV  URL          : https://___________
UAT  URL          : https://___________
PROD URL          : https://___________
```

---

## Publishing Shared Library

```bash
cd platform-ui
npm run build:publish   # production build
npm run publish:lib     # publish to npm
```

Install in client projects:
```bash
npm install @solifi/platform-ui
```

---

## Environment Configuration

Update `src/assets/remotes.json` per environment before build:

| Environment | Example URL |
|------------|-------------|
| DEV | https://exp.dev.solifi.com |
| UAT | https://exp.uat.solifi.com |
| PROD | https://exp.solifi.com |

---

## AWS Deployment

Each app deploys independently as static files — no Node.js server needed.

```
ng build --configuration production
    ↓
Upload dist/ to S3 bucket
    ↓
CloudFront CDN serves files globally
    ↓
Admin-hub loads remotes from their CloudFront URLs at runtime
```

Each remote team ships on their own schedule. Admin-hub does not need redeployment when a remote updates.

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `admin-hub/src/assets/remotes.json` | Register remote URLs |
| `admin-hub/src/app/app.routes.ts` | Mount remote routes |
| `admin-hub/src/main.ts` | NF federation map |
| `admin-hub/federation.config.js` | NF host config |
| `<remote>/federation.config.js` | NF remote config |
| `<remote>/src/app/remote-entry/entry.routes.ts` | Exposed routes |
| `<remote>/src/assets/nav.json` | Sidebar menu config |

---

---

# How Native Federation Works — Step by Step

---

## What is Native Federation?

Native Federation is a technology that allows multiple independently built and deployed Angular applications to share code and render together inside a single browser page — without iframes, without page reloads, without duplicating Angular.

---

## The Two Roles

| Role | App | Responsibility |
|------|-----|---------------|
| HOST | admin-hub | Shell UI, routing, loads remotes |
| REMOTE | experience-hub, e-invoice, tntmg-hub | Feature UI, exposes routes |

---

## Step 1 — Browser Requests Admin-Hub

User opens `http://localhost:4200`.  
Browser downloads `index.html` from admin-hub.

```html
<script>window.esmsInitOptions = { shimMode: true }</script>
<script src="es-module-shims.js"></script>
```

`es-module-shims` loads first — this is critical for Step 5.

---

## Step 2 — es-module-shims Activates in ShimMode

`es-module-shims` is a browser polyfill that intercepts all ES module loading.  
ShimMode means it controls ALL imports — including bare specifiers like `@angular/core`.  
Without this, dynamic importmaps would not work in all browsers.

---

## Step 3 — main.ts Runs: initFederation()

```ts
initFederation({
  'experience-hub': 'http://localhost:4201/remoteEntry.json',
  'e-invoice':      'http://localhost:4202/remoteEntry.json',
  'tntmg-hub':      'http://localhost:8766/remoteEntry.json',
})
.then(() => import('./bootstrap'))
```

`initFederation` starts the federation process before any Angular code runs.

---

## Step 4 — remoteEntry.json Fetched from Every Remote

Each remote serves a `remoteEntry.json` auto-generated by NF at build time.

```json
{
  "name": "experience-hub",
  "exposes": {
    "./Routes": "./src/app/remote-entry/entry.routes.ts"
  },
  "shared": {
    "@angular/core":   { "version": "19.0.0", "file": "_angular_core.js" },
    "@angular/common": { "version": "19.0.0", "file": "_angular_common.js" },
    "@angular/router": { "version": "19.0.0", "file": "_angular_router.js" }
  }
}
```

This tells admin-hub: what the remote exposes and what packages it shares.

---

## Step 5 — Importmap Built and Injected

NF merges all `remoteEntry.json` shared packages into one importmap  
and injects it into the page via `es-module-shims`:

```json
{
  "imports": {
    "@angular/core":   "http://localhost:4200/_angular_core.js",
    "@angular/common": "http://localhost:4200/_angular_common.js",
    "@angular/router": "http://localhost:4200/_angular_router.js"
  }
}
```

Now every module (host or remote) resolves `@angular/core` to the **same single file**.  
This means one Angular instance shared across all apps — no duplicates, no conflicts.

---

## Step 6 — Admin-Hub Bootstraps

After the importmap is ready, `import('./bootstrap')` runs.  
Angular application starts, router initializes, shell UI (sidebar + header) renders.

---

## Step 7 — User Navigates to a Remote Route

User clicks "Experience Hub" in the sidebar.  
Angular router matches `/experience` and calls `loadChildren`:

```ts
{
  path: 'experience',
  loadChildren: () =>
    loadRemoteModule('experience-hub', './Routes')
      .then(m => m.EXPERIENCE_ROUTES)
}
```

---

## Step 8 — loadRemoteModule Downloads Remote Code

`loadRemoteModule` uses the importmap to find experience-hub's bundle URL,  
downloads the JavaScript from `http://localhost:4201/`,  
and executes it in the **same browser context as admin-hub**.

---

## Step 9 — Remote Component Renders Inside Shell

Angular router activates the remote route and renders the component  
inside admin-hub's `<router-outlet>`.

```
Browser DOM:
└── <admin-root>             ← admin-hub
    ├── <admin-sidebar>      ← admin-hub sidebar
    ├── <admin-header>       ← admin-hub header
    └── <router-outlet>
        └── <exp-overview>   ← experience-hub component (loaded remotely)
```

The user sees one seamless UI — admin-hub shell + experience-hub content.

---

## Step 10 — Shared Packages Reused, Not Duplicated

Because the importmap resolves `@angular/core` to a single file,  
experience-hub reuses admin-hub's already-loaded Angular.

```
Without NF:
  admin-hub loads Angular 19      → 500kb
  experience-hub loads Angular 19 → 500kb again
  Total: 1000kb

With NF:
  admin-hub loads Angular 19      → 500kb
  experience-hub REUSES it        → 0kb extra
  Total: 500kb
```

---

## Complete Flow Diagram

```
User opens localhost:4200
        │
        ▼
[1]  index.html downloaded from admin-hub
        │
        ▼
[2]  es-module-shims activates (shimMode: true)
        │
        ▼
[3]  main.ts → initFederation() called
        │
        ├──► GET localhost:4200/remoteEntry.json  (self)
        ├──► GET localhost:4201/remoteEntry.json  (experience-hub)
        ├──► GET localhost:4202/remoteEntry.json  (e-invoice)
        └──► GET localhost:8766/remoteEntry.json  (tntmg-hub)
        │
        ▼
[4]  All remoteEntry.json files received
        │
        ▼
[5]  Single importmap built and injected
     @angular/core   →  localhost:4200/_angular_core.js
     @angular/router →  localhost:4200/_angular_router.js
        │
        ▼
[6]  bootstrap.ts runs → Angular starts → shell renders
        │
        ▼
[7]  User clicks "Experience Hub" in sidebar
        │
        ▼
[8]  Router calls loadRemoteModule('experience-hub', './Routes')
        │
        ▼
[9]  Browser downloads experience-hub JS from localhost:4201
        │
        ▼
[10] EXPERIENCE_ROUTES loaded
        │
        ▼
[11] Component renders inside <router-outlet>
        │
        ▼
[12] User sees admin-hub shell + experience-hub content
```

---

## Key Concepts Summary

| Concept | What It Does |
|---------|-------------|
| `remoteEntry.json` | Metadata describing what a remote exposes and shares |
| `importmap` | Maps bare package names (`@angular/core`) to actual JS file URLs |
| `es-module-shims` | Enables dynamic importmaps in all browsers |
| `initFederation()` | Fetches all remoteEntry.json and builds the global importmap |
| `loadRemoteModule()` | Downloads and executes remote code on demand (lazy) |
| `exposes` | What the remote makes available to the host |
| `shared` | Packages shared as singletons — only loaded once across all apps |
| `singleton: true` | Enforces one shared instance — prevents duplicate Angular |

---

## Why This Matters in Production

```
Each remote has its own S3 bucket + CloudFront URL
Admin-hub fetches remoteEntry.json from live URLs at runtime
Experience-hub team ships new version → users get it immediately
No rebuild or redeploy of admin-hub or other remotes needed
Each team deploys on their own release schedule
```

---

*Solifi Platform — Angular 19 + Native Federation v19*



 

## es-module-shims ek browser ka helper script hai.

## Simple Explanation
Browser naturally ES modules support karta hai — matlab import aur export statements.

Lekin browser ki ek limitation hai:

Browser natively ye nahi kar sakta:
import { something } from '@angular/core'
                         ↑
                   Ye bare specifier hai
                   Browser nahi jaanta
                   ye file kahan hai
Browser sirf ye samajhta hai:

import { something } from './path/to/file.js'    ✅ samajhta hai
import { something } from 'http://localhost/x.js' ✅ samajhta hai
import { something } from '@angular/core'         ❌ nahi samajhta
Importmap Kya Hai
Importmap browser ko batata hai ki @angular/core actually kahan hai:

{
  "imports": {
    "@angular/core": "http://localhost:4200/_angular_core.js"
  }
}
Ab browser samajh gaya — @angular/core matlab ye wali file.

Problem Kya Hai
Native browser importmap support hai — lekin ek bada limitation hai:

Browser sirf ek importmap allow karta hai
aur woh page load hone se pehle define hona chahiye
Native Federation runtime pe importmap inject karta hai
(initFederation() ke andar)
→ Browser ye accept nahi karta natively ❌
es-module-shims Solution Hai
es-module-shims browser ka module loading system
ko intercept kar leta hai
Phir woh khud sab modules handle karta hai
aur dynamic importmaps support karta hai
Matlab NF runtime pe importmap inject kar sakta hai ✅
ShimMode Kya Hai
window.esmsInitOptions = { shimMode: true }
Iska matlab:

Normal mode   → sirf unsupported browsers pe kaam karta hai
Shim mode     → SARE browsers pe sab modules intercept karta hai
               (chahe browser natively support kare ya na kare)
NF ko shimMode chahiye kyunki:
Dynamic importmap injection sirf shimMode me kaam karta hai

## Real Life Analogy
Sochlo ek courier company hai
Browser = courier boy
Package name = "@angular/core"
Address = actual file URL
Courier boy ko sirf full address pata chalta hai
Short name se woh nahi jaanta kahan jaana hai
Importmap = address book
  "@angular/core" → "Street no 4, Building A, Floor 2"
es-module-shims = ek smart manager jo:
  1. Courier boy ka kaam apne haath me leta hai
  2. Address book runtime pe update kar sakta hai
  3. Phir sahi jagah deliver karta hai
Summary
Cheez	Kya Karta Hai
es-module-shims.js	Browser module loading intercept karta hai
shimMode: true	Sare modules handle karta hai — sirf broken browsers nahi
importmap	Package name ko actual file URL se map karta hai
NF + es-module-shims	Runtime pe importmap inject kar sakta hai
Bottom line:
es-module-shims ke bina Native Federation kaam nahi kar sakta — kyunki browser khud dynamic importmaps support nahi karta.


Build commands
Command	What it does
npm run build:full	Full publish build — Angular lib + Elements bundle + wires them together
npm run build:publish	Angular lib only (for Angular-only consumers)
npm run build:elements	Elements bundle only
One npm run build:full → one npm publish ./dist/platform-ui → consumable by every framework.

npm run build:full && npm publish ./dist/platform-ui
