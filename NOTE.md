# Remote App Integration Guide

> This guide is for **client/remote teams** who want to integrate their Angular application into the Solifi Admin Hub using Native Federation.

---

## Table of Contents

1. [Version Compatibility](#1-version-compatibility)
2. [Install Native Federation](#2-install-native-federation)
3. [Add federation.config.js](#3-add-federationconfigjs)
4. [Create Remote Entry Routes](#4-create-remote-entry-routes)
5. [Update angular.json](#5-update-angularjson)
6. [Update main.ts](#6-update-maints)
7. [Add nav.json to Assets](#7-add-navjson-to-assets)
8. [Add es-module-shims to index.html](#8-add-es-module-shims-to-indexhtml)
9. [What to Share with Admin-Hub Team](#9-what-to-share-with-admin-hub-team)
10. [What Admin-Hub Team Will Do](#10-what-admin-hub-team-will-do)
11. [Checklist](#checklist)

---

## 1. Version Compatibility

> ⚠️ **NF version must always match your Angular major version.**

| Angular Version | Native Federation Version |
|----------------|--------------------------|
| Angular 17 | `@angular-architects/native-federation@^17.0.0` |
| Angular 18 | `@angular-architects/native-federation@^18.0.0` |
| Angular 19 | `@angular-architects/native-federation@^19.0.0` |

---

## 2. Install Native Federation

```bash
npm install @angular-architects/native-federation@^17.0.0 --legacy-peer-deps
npm install es-module-shims --legacy-peer-deps
```

> Replace `^17.0.0` with the version matching your Angular version.

---

## 3. Add federation.config.js

Create `federation.config.js` at the **root of your project**:

```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'your-app-name',   // unique name — agree this with admin-hub team

  exposes: {
    './Routes': './src/app/remote-entry/entry.routes.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
});
```

> The `name` field must be unique across all remotes and must match exactly what admin-hub registers.

---

## 4. Create Remote Entry Routes

Create `src/app/remote-entry/entry.routes.ts`:

```ts
import { Routes } from '@angular/router';

export const YOUR_APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('../features/list/list.component').then(m => m.ListComponent),
  },
];
```

> **Important:** Do NOT include your app's header or sidebar here.  
> Admin-hub owns the shell. Only expose page-level content components.

---

## 5. Update angular.json

Replace the existing `build` and `serve` targets with NF versions.  
Add `_serve` and `_build` as the actual Angular builders:

```json
"build": {
  "builder": "@angular-architects/native-federation:build",
  "options": {
    "target": "your-app:_build",
    "dev": false
  }
},
"serve": {
  "builder": "@angular-architects/native-federation:build",
  "options": {
    "target": "your-app:_serve",
    "dev": true,
    "port": 4203
  }
},
"_serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "buildTarget": "your-app:_build",
    "port": 4203
  }
},
"_build": {
  "builder": "@angular-devkit/build-angular:application",
  "options": {
    "outputPath": "dist/your-app",
    "index": "src/index.html",
    "browser": "src/main.ts",
    "polyfills": ["zone.js"],
    "tsConfig": "tsconfig.app.json",
    "assets": [
      "src/assets",
      {
        "glob": "es-module-shims.js",
        "input": "node_modules/es-module-shims/dist/",
        "output": "/"
      }
    ],
    "styles": ["src/styles.scss"]
  },
  "configurations": {
    "production":  { "outputHashing": "all" },
    "development": { "optimization": false, "sourceMap": true }
  },
  "defaultConfiguration": "production"
}
```

> Choose a port that does not conflict with other remotes.  
> Currently used: `4200` (admin-hub), `4201` (experience-hub), `4202` (e-invoice), `8766` (tntmg-hub).

---

## 6. Update main.ts

Split your existing `main.ts` into two files.

**`src/main.ts`** — federation bootstrap only:

```ts
import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .catch(err => console.error(err))
  .then(() => import('./bootstrap'))
  .catch(err => console.error(err));
```

**`src/bootstrap.ts`** — your existing main.ts content:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
```

> `initFederation()` must run before any Angular code. This sets up the importmap so all shared packages resolve correctly.

---

## 7. Add nav.json to Assets

Create `src/assets/nav.json`:

```json
{
  "label": "Your App",
  "icon": "🔧",
  "baseRoute": "/your-app",
  "children": [
    { "label": "Home", "route": "/your-app" },
    { "label": "List", "route": "/your-app/list" }
  ]
}
```

> Admin-hub reads this file at startup to automatically build the sidebar menu.  
> When you add a new page, update this file only — no changes needed in admin-hub.

---

## 8. Add es-module-shims to index.html

Add these two lines to `src/index.html` **before any other scripts**, inside `<head>`:

```html
<head>
  ...
  <script>window.esmsInitOptions = { shimMode: true }</script>
  <script src="es-module-shims.js"></script>
</head>
```

> `es-module-shims` must load before Angular. It enables dynamic importmaps which NF relies on.

---

## 9. What to Share with Admin-Hub Team

Fill in this information sheet and send to the admin-hub team:

```
┌─────────────────────────────────────────────────────────┐
│            REMOTE APP INTEGRATION DETAILS               │
├─────────────────────────────────────────────────────────┤
│ App Name (federation.config.js name) : _______________  │
│ Route Export Name (entry.routes.ts)  : _______________  │
│ Base Route Path                      : /______________ │
├─────────────────────────────────────────────────────────┤
│ DEV  URL : https://________________________________     │
│ UAT  URL : https://________________________________     │
│ PROD URL : https://________________________________     │
├─────────────────────────────────────────────────────────┤
│ Contact Person : __________________________________     │
└─────────────────────────────────────────────────────────┘
```

**Example filled in:**

```
App Name          : tntmg-hub
Route Export Name : TM_ROUTES
Base Route Path   : /tntmg-hub
DEV  URL          : https://tntmg.dev.solifi.com
UAT  URL          : https://tntmg.uat.solifi.com
PROD URL          : https://tntmg.solifi.com
Contact Person    : John Smith
```

---

## 10. What Admin-Hub Team Will Do

With the information you provide, the admin-hub team makes these 4 changes:

**`src/assets/remotes.json`** — register your URL:
```json
{ "name": "your-app-name", "url": "https://yourapp.dev.solifi.com" }
```

**`src/main.ts`** — add to federation map:
```ts
initFederation({
  'your-app-name': 'https://yourapp.dev.solifi.com/remoteEntry.json'
})
```

**`federation.config.js`** — add remote:
```js
remotes: {
  'your-app-name': 'https://yourapp.dev.solifi.com/remoteEntry.json'
}
```

**`src/app/app.routes.ts`** — mount your routes:
```ts
{
  path: 'your-app',
  loadChildren: () =>
    loadRemoteModule('your-app-name', './Routes')
      .then(m => m.YOUR_APP_ROUTES)
}
```

> That's all. 4 lines of config and your app is live in admin-hub.

---

## Checklist

Use this before marking integration as complete:

```
Remote App Setup
  ☐ Installed @angular-architects/native-federation (matching Angular version)
  ☐ Installed es-module-shims
  ☐ Added federation.config.js at project root
  ☐ Created src/app/remote-entry/entry.routes.ts
  ☐ Entry routes expose page components only (no header / sidebar)
  ☐ Updated angular.json with NF build / serve / _serve / _build targets
  ☐ Split main.ts into main.ts + bootstrap.ts
  ☐ Added esmsInitOptions + es-module-shims script to index.html
  ☐ Added es-module-shims glob to angular.json assets
  ☐ Added src/assets/nav.json with menu config
  ☐ Sent integration details sheet to admin-hub team

Do NOT Change
  ☐ Existing components — leave untouched
  ☐ Existing services and API calls — leave untouched
  ☐ Existing styles — leave untouched
  ☐ Business logic — leave untouched
```

> Only the **shell wiring** changes. All business code stays exactly as it is.

---

## Notes

- API calls from your app will continue to work when loaded inside admin-hub. The browser makes HTTP calls directly to your API server — admin-hub is not involved.
- If your API has CORS restrictions, make sure `https://admin.solifi.com` (or the admin-hub domain) is added to your allowed origins.
- Global styles from your `styles.scss` will not apply when running inside admin-hub. Move critical design tokens to a separate CSS file served from your assets and inject them dynamically, or coordinate with the platform team.

---

*Solifi Platform Team — admin-hub@solifi.com*
