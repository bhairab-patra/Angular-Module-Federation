# Platform UI Library — Publish, Run & Consume Guide

**Package:** `@bhairab-patra/platform-ui`  
**Registry:** GitHub Packages (`https://npm.pkg.github.com`)  
**Repo:** `https://github.com/bhairab-patra/Angular-Module-Federation`

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Project Structure](#2-project-structure)
3. [Local Development](#3-local-development)
4. [Build](#4-build)
5. [Publish to GitHub Packages](#5-publish-to-github-packages)
6. [Consume in Angular App (admin-hub)](#6-consume-in-angular-app-admin-hub)
7. [Consume in Tenant Management UI](#7-consume-in-tenant-management-ui)
8. [Consume in React / Vue / Plain HTML](#8-consume-in-react--vue--plain-html)
9. [Versioning Rules](#9-versioning-rules)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| Angular CLI | 19+ | `ng version` |
| GitHub account | — | `github.com/bhairab-patra` |
| GitHub PAT | `write:packages` + `read:packages` + `repo` scopes | See step 5.1 |

---

## 2. Project Structure

```
platform-ui/
├── projects/
│   ├── platform-ui/          # Angular library (ng-packagr)
│   │   └── src/lib/          # All components (button, card, badge, modal…)
│   ├── elements/             # Angular Elements web components build
│   │   └── src/main.ts       # Registers all components as custom elements
│   └── docs/                 # Storybook-style docs app (ng serve docs)
├── scripts/
│   ├── concat-elements.js    # Merges runtime+polyfills+main → pui-elements.js
│   └── copy-elements-to-dist.js  # Copies elements bundle into dist + patches exports
├── dist/
│   └── platform-ui/          # Published artefact (what npm publish sends)
│       ├── fesm2022/bhairab-patra-platform-ui.mjs   # Angular ESM bundle
│       ├── elements/pui-elements.js                  # Web Components bundle
│       └── elements/styles.css                       # Global styles + CSS vars
└── publish.md                # This file
```

---

## 3. Local Development

### Run the docs app

```bash
npm run docs
# Opens http://localhost:4210
```

### Watch-build the library (for local linking)

```bash
npm run build:watch
```

### Link locally to another project (without publishing)

```bash
# In platform-ui/
npm run build:full
cd dist/platform-ui
npm link

# In admin-hub/ or tenant-management-ui/
npm link @bhairab-patra/platform-ui
```

---

## 4. Build

### Full production build (library + web components bundle)

```bash
npm run build:full
```

This runs three steps in sequence:
1. `ng build platform-ui --configuration production` → `dist/platform-ui/`
2. `ng build elements --configuration production` + concat → `dist/elements/pui-elements.js`
3. `node scripts/copy-elements-to-dist.js` → copies bundle into `dist/platform-ui/elements/` and patches `package.json` exports map

### Build commands reference

| Command | Purpose |
|---------|---------|
| `npm run build:full` | Full production build — run before every publish |
| `npm run build:publish` | Angular library only (ng-packagr) |
| `npm run build:elements` | Web Components bundle only |
| `npm run build:elements:dev` | Web Components bundle (unminified, for debugging) |
| `npm run docs` | Start docs dev server on port 4210 |
| `npm run serve:demo` | Serve plain HTML demo on port 4300 |

---

## 5. Publish to GitHub Packages

### 5.1 Create a GitHub Personal Access Token (PAT)

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Select scopes: `write:packages`, `read:packages`, `repo`
4. Set expiration (90 days recommended)
5. Copy the token — shown only once

### 5.2 Configure `.npmrc` in the platform-ui root

Create (or update) `platform-ui/.npmrc` — **never commit this file**:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT_HERE
@bhairab-patra:registry=https://npm.pkg.github.com
```

> `.npmrc` is already in `.gitignore` — safe to create here.

### 5.3 Bump the version

Edit `projects/platform-ui/package.json`:

```json
{
  "name": "@bhairab-patra/platform-ui",
  "version": "1.x.x"
}
```

Follow semantic versioning:
- Bug fix → patch: `1.3.0` → `1.3.1`
- New component or feature → minor: `1.3.0` → `1.4.0`
- Breaking change → major: `1.3.0` → `2.0.0`

### 5.4 Build and publish

```bash
npm run build:full && npm publish ./dist/platform-ui
```

If you get an SSL certificate error (corporate network):

```bash
npm config set strict-ssl false
npm publish ./dist/platform-ui
npm config set strict-ssl true
```

### 5.5 Verify publish

Go to: **https://github.com/bhairab-patra?tab=packages**

You should see `@bhairab-patra/platform-ui` with the new version listed.

---

## 6. Consume in Angular App (admin-hub)

### 6.1 Configure `.npmrc` in admin-hub

Create `admin-hub/.npmrc` — **never commit this file**:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT_HERE
@bhairab-patra:registry=https://npm.pkg.github.com
```

### 6.2 Install

```bash
npm install @bhairab-patra/platform-ui
```

To install a specific version:

```bash
npm install @bhairab-patra/platform-ui@1.3.0
```

### 6.3 Skip in Native Federation config

Since admin-hub uses Module Federation, exclude the library from shared bundles.
In `admin-hub/federation.config.js`:

```js
skip: [
  'rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket',
  '@bhairab-patra/platform-ui',   // ← add this line
],
```

### 6.4 Import components in your Angular module or component

**Standalone component:**

```typescript
import { Component } from '@angular/core';
import { ButtonComponent, CardComponent, BadgeComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent, CardComponent, BadgeComponent],
  template: `
    <pui-card [data]="cardData"></pui-card>
    <pui-button variant="primary" (buttonClick)="onSave()">Save</pui-button>
    <pui-badge variant="success">Live</pui-badge>
  `
})
export class DashboardComponent {
  cardData = { title: 'Users', value: '1,284', trend: 'up', trendValue: '+8%' };
  onSave() { console.log('saved'); }
}
```

**NgModule-based:**

```typescript
import { NgModule } from '@angular/core';
import { ButtonComponent, CardComponent } from '@bhairab-patra/platform-ui';

@NgModule({
  imports: [ButtonComponent, CardComponent],
  // ...
})
export class AppModule {}
```

### 6.5 Add global styles (optional — for Poppins font + CSS variables)

In `admin-hub/src/styles.css` or `angular.json` styles array:

```css
@import '@bhairab-patra/platform-ui/elements/styles.css';
```

Or in `angular.json`:

```json
"styles": [
  "node_modules/@bhairab-patra/platform-ui/elements/styles.css",
  "src/styles.css"
]
```

### 6.6 Start the app

```bash
npm start
```

---

## 7. Consume in Tenant Management UI

Follow the same steps as admin-hub (sections 6.1–6.6).  
Replace all references to `admin-hub` with `tenant-management-ui`.

Key import examples for tenant management screens:

```typescript
import {
  AppShellComponent,
  ButtonComponent,
  CardComponent,
  InputComponent,
  SelectComponent,
  ModalComponent,
  ToastContainerComponent,
} from '@bhairab-patra/platform-ui';
```

App Shell usage:

```typescript
import { AppShellComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppShellComponent, RouterOutlet],
  template: `
    <pui-app-shell
      app-title="Tenant Management"
      app-subtitle="v1.0"
      header-bg-color="#12C6A8"
      header-user-name="Jane Doe"
      header-user-email="jane@company.com"
      style="height:100vh;display:block">
      <router-outlet></router-outlet>
    </pui-app-shell>
  `
})
export class AppComponent {}
```

---

## 8. Consume in React / Vue / Plain HTML

The library ships a self-contained Web Components bundle that works in any framework.

### React 19

```bash
npm install @bhairab-patra/platform-ui
```

`src/main.tsx`:

```tsx
import '@bhairab-patra/platform-ui/elements';
import App from './App';
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')!).render(<App />);
```

`src/pui.d.ts` (TypeScript declarations):

```ts
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
type PuiProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pui-button': PuiProps;
      'pui-card': PuiProps;
      'pui-badge': PuiProps;
      'pui-app-shell': PuiProps;
      'pui-modal': PuiProps;
      'pui-input': PuiProps;
      'pui-select': PuiProps;
    }
  }
}
```

`src/App.tsx`:

```tsx
import { useRef, useEffect } from 'react';

export default function App() {
  const shellRef = useRef<any>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    shell.groups = [
      { id: 'g1', label: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard' }] }
    ];
    shell.headerMenuItems = [{ label: 'Sign Out', action: 'logout', danger: true }];
    shell.addEventListener('itemSelect', (e: CustomEvent) => console.log(e.detail));
  }, []);

  return (
    <pui-app-shell
      ref={shellRef}
      app-title="My App"
      header-bg-color="#12C6A8"
      header-user-name="Jane Doe"
      style={{ height: '100vh', display: 'block' }}
    >
      <pui-button variant="primary">Save</pui-button>
    </pui-app-shell>
  );
}
```

### Vue 3

`vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue({ template: { compilerOptions: { isCustomElement: tag => tag.startsWith('pui-') } } })]
});
```

`src/main.ts`:

```ts
import '@bhairab-patra/platform-ui/elements';
import { createApp } from 'vue';
import App from './App.vue';
createApp(App).mount('#app');
```

`src/App.vue`:

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';
const shell = ref();
onMounted(() => {
  shell.value.groups = [
    { id: 'g1', label: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard' }] }
  ];
});
</script>
<template>
  <pui-app-shell ref="shell" app-title="My App" header-bg-color="#12C6A8"
    header-user-name="Jane" style="height:100vh;display:block">
    <pui-button variant="primary">Save</pui-button>
  </pui-app-shell>
</template>
```

### Plain HTML (local HTTP server)

> **Important:** Angular Elements cannot run from `file://`. You must serve over HTTP.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="node_modules/@bhairab-patra/platform-ui/elements/styles.css">
  <script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>
</head>
<body>
  <pui-app-shell id="shell" app-title="My App" header-bg-color="#12C6A8"
    header-user-name="Jane Doe" style="height:100vh;display:block">
    <div style="padding:32px">
      <pui-button id="btn" variant="primary">Save</pui-button>
    </div>
  </pui-app-shell>

  <script>
    customElements.whenDefined('pui-app-shell').then(() => {
      const shell = document.getElementById('shell');
      shell.groups = [
        { id: 'g1', label: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard' }] }
      ];
    });
    customElements.whenDefined('pui-button').then(() => {
      document.getElementById('btn').addEventListener('buttonClick', () => alert('Saved!'));
    });
  </script>
</body>
</html>
```

Serve it:

```bash
npx http-server . -p 4300 -o index.html
```

---

## 9. Versioning Rules

| Change type | Version bump | Example |
|-------------|-------------|---------|
| Bug fix, style tweak | Patch | `1.3.0` → `1.3.1` |
| New component, new input/output | Minor | `1.3.0` → `1.4.0` |
| Renamed/removed input, breaking API | Major | `1.3.0` → `2.0.0` |

Always run `npm run build:full` before publishing — never publish a stale `dist/`.

---

## 10. Troubleshooting

### `E404 Not Found` on publish

- Run `npm whoami --registry https://npm.pkg.github.com` — must return your GitHub username
- Check `.npmrc` has the correct token and registry URL
- Token must have `write:packages` scope

### `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`

Corporate SSL proxy issue:

```bash
npm config set strict-ssl false
npm publish ./dist/platform-ui
npm config set strict-ssl true
```

### `Failed to resolve entry for package`

The exports map points to the wrong `.mjs` filename. Rebuild and republish:

```bash
npm run build:full && npm publish ./dist/platform-ui
```

### `Could not resolve` in Native Federation (admin-hub / tenant-management-ui)

Add the package to the `skip` list in `federation.config.js`:

```js
skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket', '@bhairab-patra/platform-ui'],
```

### Component not rendering / custom element unknown

- Check `pui-elements.js` is loaded before usage (use `defer` on the script tag)
- Use `customElements.whenDefined('pui-*')` before setting JS properties
- Object/array inputs (like `groups`, `data`) must be set as **JS properties**, not HTML attributes

### Token expired

Generate a new PAT on GitHub and update `.npmrc` in both the library and consuming projects.
