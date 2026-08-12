# ESLint Rules Guide — `@bhairab-patra/platform-ui`

This document explains every ESLint rule configured for this project, why it exists, and how to handle it. Share this with the team so everyone understands the code quality gate that runs before every build and publish.

---

## Table of Contents

1. [How ESLint is wired into the build](#1-how-eslint-is-wired-into-the-build)
2. [Running lint manually](#2-running-lint-manually)
3. [What the config file looks like](#3-what-the-config-file-looks-like)
4. [Angular-specific rules](#4-angular-specific-rules)
5. [TypeScript rules](#5-typescript-rules)
6. [Template (HTML) rules](#6-template-html-rules)
7. [General JavaScript rules](#7-general-javascript-rules)
8. [Rules intentionally turned OFF (and why)](#8-rules-intentionally-turned-off-and-why)
9. [How to suppress a rule in special cases](#9-how-to-suppress-a-rule-in-special-cases)
10. [Warnings vs errors — what matters for CI](#10-warnings-vs-errors--what-matters-for-ci)
11. [Future rules to enable](#11-future-rules-to-enable)

---

## 1. How ESLint is wired into the build

Every production and local build **runs lint first**. If any rule violation is at `error` level, the build stops immediately and nothing is compiled or published.

```
npm run build:local    →  lint ✓  →  ng build (dev)
npm run build:publish  →  lint ✓  →  ng build (prod)
npm run publish:lib    →  lint ✓  →  ng build (prod)  →  npm publish
npm run build:full     →  lint ✓  →  build:publish  →  build:elements  →  copy
```

**If you see this message, your code has ESLint errors and nothing was built:**
```
Lint errors found in the listed files.
npm ERR! script failed
```

Fix the errors, then run the build again.

`build:watch` and `build:elements:dev` do **not** run lint — these are fast dev loops where you want instant feedback without a gate.

---

## 2. Running lint manually

```bash
# Lint the library only (platform-ui components)
npm run lint

# Lint the docs app only
npm run lint:docs

# Lint everything
npm run lint:all
```

To see all warnings and errors with file paths:
```bash
npx ng lint platform-ui
```

To auto-fix the few rules that support it:
```bash
npx ng lint platform-ui --fix
```

---

## 3. What the config file looks like

The config lives at [`eslint.config.js`](./eslint.config.js) in the project root.

It has **4 sections**:

| Section | Files | Purpose |
|---------|-------|---------|
| Ignores | `dist/**`, `.angular/**`, `node_modules/**` | Skip generated files |
| TypeScript | `**/*.ts` | All `.ts` source files |
| Templates | `**/*.html` | All Angular HTML templates |
| Docs override | `projects/docs/**/*.ts` | Relaxed rules for the docs app |

---

## 4. Angular-specific rules

These rules come from `@angular-eslint` and catch Angular patterns that TypeScript alone cannot see.

### `@angular-eslint/component-selector` — **error**

Every component selector **must** use the `pui-lib` prefix and `kebab-case` style.

```typescript
// ✅ Correct
@Component({ selector: 'pui-lib-button' })

// ❌ Wrong — missing prefix, will fail build
@Component({ selector: 'button' })
@Component({ selector: 'myButton' })
```

**Docs app** uses `docs` prefix instead (e.g. `docs-button-page`) — this is allowed via the override section.

---

### `@angular-eslint/directive-selector` — **error**

Directives must use the `pui` prefix and `camelCase` style.

```typescript
// ✅ Correct
@Directive({ selector: '[puiTooltip]' })

// ❌ Wrong
@Directive({ selector: '[tooltip]' })
```

---

### `@angular-eslint/no-empty-lifecycle-method` — **error**

Do not keep lifecycle hooks that have nothing in them. They add noise and cost.

```typescript
// ❌ Wrong — empty lifecycle hook
ngOnInit(): void {}

// ✅ Correct — remove it entirely if you don't need it
// (no ngOnInit at all)
```

---

### `@angular-eslint/use-lifecycle-interface` — **error**

If you implement a lifecycle hook, you must also declare the interface.

```typescript
// ❌ Wrong — using ngOnInit without the interface
export class MyComponent {
  ngOnInit() { ... }
}

// ✅ Correct
export class MyComponent implements OnInit {
  ngOnInit() { ... }
}
```

---

### `@angular-eslint/prefer-on-push-component-change-detection` — **error**

Every component must use `ChangeDetectionStrategy.OnPush`. This is critical for performance — the default strategy re-renders on every browser event.

```typescript
// ❌ Wrong — will fail build
@Component({ changeDetection: ChangeDetectionStrategy.Default })

// ✅ Correct
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
```

**Why it matters:** The library is used inside customer apps. With Default change detection, every click anywhere in the app re-renders all library components, causing slowdowns.

---

### `@angular-eslint/no-input-rename` — **error**

Do not rename `@Input()` properties via alias unless there is a strong reason.

```typescript
// ❌ Wrong — confusing alias
@Input('myLabel') label = '';

// ✅ Correct
@Input() label = '';
```

---

### `@angular-eslint/no-output-rename` — **error**

Same as above for `@Output()`.

---

### `@angular-eslint/no-output-on-prefix` — **error**

Output event names must not start with `on`. Angular already adds the `(on...)` syntax at the template level.

```typescript
// ❌ Wrong — would be used as (onSave) in template — redundant "on"
@Output() onSave = new EventEmitter();

// ✅ Correct — used as (save) in template
@Output() save = new EventEmitter();
```

---

### `@angular-eslint/no-output-native` — **error** (with targeted suppressions)

Output names must not clash with native DOM events like `change`, `input`, `reset`, `click`.

```typescript
// ❌ Would fire the wrong event in some frameworks
@Output() change = new EventEmitter();

// ✅ Better
@Output() valueChange = new EventEmitter();
```

**Exception:** Some public API outputs use `change` for backward compatibility and are suppressed with:
```typescript
// eslint-disable-next-line @angular-eslint/no-output-native
@Output() change = new EventEmitter();
```
Do **not** add new suppressions — use descriptive names like `valueChange`, `selectionChange`, `changed`.

---

### `@angular-eslint/component-class-suffix` / `directive-class-suffix` — **error**

Class names must end with `Component` or `Directive`.

```typescript
// ❌ Wrong
export class Button { }

// ✅ Correct
export class ButtonComponent { }
```

---

### `@angular-eslint/relative-url-prefix` — **error**

Template and style URLs must use `./` relative paths.

```typescript
// ❌ Wrong
templateUrl: 'button.component.html'

// ✅ Correct
templateUrl: './button.component.html'
```

---

## 5. TypeScript rules

### `@typescript-eslint/no-explicit-any` — **warning**

Using `any` disables TypeScript's type safety. The rule warns when you write `any`.

```typescript
// ⚠️ Warning — try to avoid
function process(data: any) { }

// ✅ Better — use a specific type or generic
function process<T>(data: T) { }
```

This is a **warning** (not an error) because the library has some legacy `any` usage in public APIs that would be breaking changes to fix. New code should never use `any`.

---

### `@typescript-eslint/explicit-function-return-type` — **warning**

Public and class methods should declare their return type.

```typescript
// ⚠️ Warning
getData() {
  return this.items;
}

// ✅ Correct
getData(): string[] {
  return this.items;
}
```

Simple arrow function expressions (like callbacks) are exempt.

---

### `@typescript-eslint/no-unused-vars` — **error**

Variables, imports, or function parameters that are declared but never used must be removed.

```typescript
// ❌ Error — unused import
import { SortDir } from './models'; // SortDir never referenced

// ❌ Error — unused variable
const result = compute();  // result never read

// ❌ Error — unused parameter
function onKey(e: KeyboardEvent, i: number) {
  // i is never used inside the function
}
```

**How to fix:**
- Remove unused imports.
- Remove unused variables.
- If a parameter is required by an interface but you don't use it, prefix it with `_`:
```typescript
// ✅ Correct — _ prefix tells ESLint "intentionally unused"
function onKey(e: KeyboardEvent, _i: number) { ... }
```

---

### `@typescript-eslint/no-non-null-assertion` — **warning**

The `!` non-null assertion bypasses TypeScript safety. Prefer a proper null check.

```typescript
// ⚠️ Warning
const el = document.querySelector('#app')!;

// ✅ Better
const el = document.querySelector('#app');
if (!el) return;
```

---

### `@typescript-eslint/no-empty-function` — **error** (with CVA suppressions)

Empty function bodies are usually a bug (you forgot to implement something).

```typescript
// ❌ Error
ngOnInit() {}
```

**Exception — ControlValueAccessor:** Angular forms require empty stub callbacks that get replaced by the framework. These are suppressed with a comment:
```typescript
// eslint-disable-next-line @typescript-eslint/no-empty-function
private onChangeFn: (v: any) => void = () => {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
private onTouchedFn: () => void = () => {};
```
Do not remove these suppressions — they are required for form control integration.

---

### `@typescript-eslint/no-unused-expressions` — **error**

An expression that has no effect (no assignment, no function call) is probably a bug.

```typescript
// ❌ Error — ternary used as statement, result is discarded
this.openIds.has(item.id) ? this.openIds.delete(item.id) : this.openIds.add(item.id);

// ✅ Correct — use if/else when you don't need the result
if (this.openIds.has(item.id)) {
  this.openIds.delete(item.id);
} else {
  this.openIds.add(item.id);
}
```

---

### `@typescript-eslint/class-literal-property-style` — **error**

A getter that always returns the same literal value should be a `readonly` property instead — it's simpler and avoids a function call on every access.

```typescript
// ❌ Error — getter returning a constant
get dashY1(): number { return 6; }

// ✅ Correct — readonly property
readonly dashY1 = 6;
```

---

### `@typescript-eslint/consistent-generic-constructors` — **error**

Generic type arguments belong on the constructor, not the variable declaration.

```typescript
// ❌ Error
const set: Set<string> = new Set();

// ✅ Correct
const set = new Set<string>();
```

---

## 6. Template (HTML) rules

### `@angular-eslint/template/no-negated-async` — **error**

Do not negate the `async` pipe result — it causes bugs because `null` and `false` are both falsy.

```html
<!-- ❌ Wrong -->
<div *ngIf="!(data$ | async)">Loading...</div>

<!-- ✅ Correct — use else block -->
<div *ngIf="data$ | async; else loading">{{ data }}</div>
<ng-template #loading>Loading...</ng-template>
```

---

### `@angular-eslint/template/no-any` — **warning**

The `$any()` cast in templates bypasses type checking. Avoid it.

```html
<!-- ⚠️ Warning -->
{{ $any(item).unknownProp }}

<!-- ✅ Better — fix the type in TypeScript instead -->
```

---

### `@angular-eslint/template/use-track-by-function` — **warning**

`*ngFor` without `trackBy` causes Angular to destroy and recreate DOM nodes on every change detection cycle. Always provide a `trackBy` function for lists.

```html
<!-- ⚠️ Warning -->
<li *ngFor="let item of items">{{ item.name }}</li>

<!-- ✅ Correct -->
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>
```
```typescript
trackById(index: number, item: Item): string {
  return item.id;
}
```

---

### `@angular-eslint/template/alt-text` — **error**

All `<img>` elements must have an `alt` attribute for accessibility.

```html
<!-- ❌ Error -->
<img src="logo.png">

<!-- ✅ Correct -->
<img src="logo.png" alt="Company logo">
```

---

### `@angular-eslint/template/click-events-have-key-events` — **warning**

If you add a `(click)` handler to a non-interactive element, you must also handle keyboard events (`keydown`/`keyup`/`keypress`) so keyboard-only users can trigger the action.

```html
<!-- ⚠️ Warning -->
<div (click)="doSomething()">Click me</div>

<!-- ✅ Correct — use a button or add keyboard handler -->
<button (click)="doSomething()">Click me</button>
```

---

### `@angular-eslint/template/interactive-supports-focus` — **warning**

Interactive elements (those with click handlers) must be focusable via the keyboard.

```html
<!-- ⚠️ Warning — div is not focusable by default -->
<div (click)="select()" role="button">Select</div>

<!-- ✅ Correct -->
<div (click)="select()" (keydown.enter)="select()" tabindex="0" role="button">Select</div>

<!-- ✅ Better — just use a button -->
<button (click)="select()">Select</button>
```

---

## 7. General JavaScript rules

### `eqeqeq` — **error**

Always use `===` (strict equality) and `!==` (strict inequality). Using `==` causes subtle bugs because JavaScript coerces types before comparing.

```typescript
// ❌ Error — '0' == 0 is true, but '0' === 0 is false
if (value == null) { }

// ✅ Correct
if (value === null || value === undefined) { }
// or use the explicit null check
if (value == null) { } // eslint-disable-line eqeqeq — intentional null/undefined coercion
```

---

### `no-console` — **warning**

`console.log` left in production code pollutes browser logs. `console.warn` and `console.error` are allowed.

```typescript
// ⚠️ Warning
console.log('debug:', data);

// ✅ Allowed
console.warn('Deprecation warning: use valueChange instead of change');
console.error('Failed to load component');
```

---

### `no-debugger` — **error**

`debugger` statements must never be committed.

```typescript
// ❌ Error — always remove before committing
debugger;
```

---

## 8. Rules intentionally turned OFF (and why)

| Rule | Why it's off |
|------|-------------|
| `@angular-eslint/template/prefer-control-flow` | Migrating all `*ngIf`/`*ngFor` → `@if`/`@for` is a large dedicated task. Turned off until that migration sprint. |
| `@angular-eslint/prefer-inject` | Migrating constructor injection → `inject()` is a large refactor. Turned off until planned. |
| `@typescript-eslint/consistent-type-imports` | Too noisy currently. Will enable after major cleanup. |
| `@angular-eslint/template/i18n` | Library is not yet internationalized. |

When the team decides to enable one of these, remove the `'off'` line from `eslint.config.js` and fix the resulting violations.

---

## 9. How to suppress a rule in special cases

Sometimes a rule fires on code that is correct but the rule cannot understand the context (e.g. Angular ControlValueAccessor stubs, or a public API that must keep a DOM-conflicting name).

**Suppress a single line:**
```typescript
// eslint-disable-next-line @typescript-eslint/no-empty-function
private onChangeFn: (v: any) => void = () => {};
```

**Suppress a block:**
```typescript
/* eslint-disable @angular-eslint/no-output-native */
@Output() change = new EventEmitter();
@Output() reset  = new EventEmitter();
/* eslint-enable @angular-eslint/no-output-native */
```

**Rules for using suppressions:**
1. Only suppress when you are **certain** the rule is wrong for this specific case.
2. Always leave a comment explaining **why** you are suppressing.
3. Never suppress `no-debugger` or `no-unused-vars` — fix the code instead.
4. Never suppress entire files (no file-level `eslint-disable`).

---

## 10. Warnings vs errors — what matters for CI

| Level | Build effect | Action required |
|-------|-------------|-----------------|
| **error** | ❌ Build stops immediately | Must fix before build passes |
| **warning** | ✅ Build continues | Should fix; will become errors in future sprints |

Currently we have **307 warnings** — mostly:
- `no-explicit-any` — type `any` used in existing code
- `use-track-by-function` — `*ngFor` missing trackBy
- `explicit-function-return-type` — methods missing return type annotation
- `click-events-have-key-events` / `interactive-supports-focus` — accessibility

These warnings will be converted to errors progressively in future sprints. New code should not introduce new warnings.

---

## 11. Future rules to enable

These are planned for future sprints. Do not write new code that violates them, even though they are not yet enforced:

| Rule | What it checks | Sprint target |
|------|---------------|---------------|
| `@angular-eslint/template/prefer-control-flow` | Use `@if`/`@for`/`@switch` instead of `*ngIf`/`*ngFor` | After Angular 17+ migration |
| `@angular-eslint/prefer-inject` | Use `inject()` function instead of constructor injection | After codebase refactor sprint |
| `@typescript-eslint/consistent-type-imports` | Use `import type` for type-only imports | After cleanup pass |
| `@typescript-eslint/no-explicit-any` → `error` | Promote from warning to error | After type safety sprint |
| `@angular-eslint/template/use-track-by-function` → `error` | Make trackBy mandatory | After performance sprint |
