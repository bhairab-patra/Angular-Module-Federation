# Platform — Three Independent Repos

Three completely separate projects. Each lives in its own repo, runs on its own machine.

```
ANGULR_ARCH/
├── platform-ui/    ← Repo 1 · Angular library  → published to npm
├── admin-hub/      ← Repo 2 · Angular app       → installs platform-ui from npm
└── expense-hub/    ← Repo 3 · Angular app       → installs platform-ui from npm
```

---

## ⚠️ Important — Local vs Published workflow

### Local development (before npm publish)

Use `file:` path install + full Ivy compilation.  
`npm link` is **not** recommended — it creates a second copy of `@angular/core` which crashes at runtime with `ɵɵprojectionDef null`.

```
┌─ platform-ui ──────────────────────────────────────────────────────┐
│  npm run build:local   →  dist/platform-ui/  (full Ivy, no partial) │
└────────────────────────────────────────────────────────────────────┘
          │
          │  file:../platform-ui/dist/platform-ui
          │  (npm deduplicates @angular/core — one instance only)
          ▼
  admin-hub / expense-hub
  npm install   →   node_modules/platform-ui/ (symlink to dist/)
```

### After npm publish

Change `"platform-ui"` in each app's `package.json` from  
`"file:../platform-ui/dist/platform-ui"` → `"^1.0.0"`,  
delete `tsconfig.json` `paths` entry, then `npm install`.

---

## How they connect

```
  platform-ui repo
       │
       │  npm publish  (git tag v1.0.0 → GitHub Actions → npmjs.com)
       ▼
   npmjs.com
   "platform-ui@1.0.0"
       │              │
       ▼              ▼
  admin-hub      expense-hub
  package.json   package.json
  "platform-ui": "^1.0.0"
```

**No shared workspace. No path aliases. No symlinks.**
The apps consume the library exactly like any other npm package (`import { ButtonComponent } from 'platform-ui'`).

---

## Repo 1 — platform-ui (the library)

### Components exported

| Selector      | Inputs                                                          | Outputs       |
|---------------|-----------------------------------------------------------------|---------------|
| `<pui-button>`| `variant` `size` `disabled` `loading` `fullWidth` `type`       | `buttonClick` |
| `<pui-card>`  | `data: CardData` `elevated` `clickable` `cardClass`            | —             |

`CardData` interface:
```ts
{ title, subtitle?, value?, icon?, trend?: 'up'|'down'|'neutral', trendValue? }
```

### Build & publish

```bash
cd platform-ui
npm install
npm run build          # → dist/platform-ui/

# Publish manually
npm publish dist/platform-ui --access public

# Or push a version tag — GitHub Actions publishes automatically
git tag v1.0.0
git push origin v1.0.0
```

CI workflow: [`.github/workflows/publish.yml`](.github/workflows/publish.yml)
Requires `NPM_TOKEN` secret in the repo settings.

---

## ✅ Exact commands to run everything locally (from scratch)

```bash
# ── 1. Build the library (full Ivy, no partial compilation) ──────────
cd platform-ui
npm install
npm run build:local          # → dist/platform-ui/

# ── 2. Start admin-hub ───────────────────────────────────────────────
cd ../admin-hub
npm install                  # installs platform-ui from file:../platform-ui/dist/platform-ui
npm start                    # http://localhost:4200

# ── 3. Start expense-hub (separate terminal) ─────────────────────────
cd ../expense-hub
npm install                  # installs platform-ui from file:../platform-ui/dist/platform-ui
npm start                    # http://localhost:4201
```

> **After any change to the library source**, re-run `npm run build:local` in `platform-ui/`,
> then **restart** the app's dev server (or use `npm run build:watch` for live rebuild).

---

## Repo 2 — admin-hub

Standalone Angular app. Dark navy sidebar. Port **4200**.

**Pages**
- `/dashboard` — 4 stat cards + activity feed
- `/users`     — user table with role/status badges + deactivate action

```bash
cd admin-hub
npm install     # installs platform-ui@^1.0.0 from npm
npm start       # http://localhost:4200
npm run build   # production build → dist/admin-hub/
```

---

## Repo 3 — expense-hub

Standalone Angular app. Dark green sidebar. Port **4201**.

**Pages**
- `/overview`  — 4 stat cards + budget progress bars
- `/expenses`  — claims table with approve / reject actions

```bash
cd expense-hub
npm install     # installs platform-ui@^1.0.0 from npm
npm start       # http://localhost:4201
npm run build   # production build → dist/expense-hub/
```

---

## Upgrading the library in consumer apps

1. Publish a new version of `platform-ui` (bump `version` in `projects/platform-ui/package.json`, push tag)
2. In each consumer app:

```bash
npm install platform-ui@1.1.0
```

No code changes needed unless the component API changed.
