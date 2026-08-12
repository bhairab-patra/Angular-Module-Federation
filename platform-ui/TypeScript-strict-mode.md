# TypeScript Strict Mode — `@bhairab-patra/platform-ui`

This document explains every TypeScript compiler strictness flag configured in this project, why it exists, and what kind of bugs it catches. Share with the team so everyone understands what TypeScript is checking and why the compiler sometimes rejects code that "looks fine".

---

## Table of Contents

1. [Where the config lives](#1-where-the-config-lives)
2. [The tsconfig inheritance chain](#2-the-tsconfig-inheritance-chain)
3. [What `strict: true` covers (8 flags in one)](#3-what-strict-true-covers-8-flags-in-one)
4. [Extra strictness flags (beyond strict)](#4-extra-strictness-flags-beyond-strict)
5. [Angular compiler strict checks](#5-angular-compiler-strict-checks)
6. [Module and output options](#6-module-and-output-options)
7. [Interop and compatibility options](#7-interop-and-compatibility-options)
8. [Common errors you will see and how to fix them](#8-common-errors-you-will-see-and-how-to-fix-them)
9. [What was fixed when full strict mode was enabled](#9-what-was-fixed-when-full-strict-mode-was-enabled)
10. [Rules for new code](#10-rules-for-new-code)

---

## 1. Where the config lives

| File | Purpose |
|------|---------|
| [`tsconfig.json`](./tsconfig.json) | **Root config** — all flags live here. Every other tsconfig inherits from this. |
| `projects/platform-ui/tsconfig.lib.json` | Library build (dev) — extends root, adds `declaration: true` |
| `projects/platform-ui/tsconfig.lib.prod.json` | Library build (prod) — extends lib.json, uses `compilationMode: partial` |
| `projects/platform-ui/tsconfig.spec.json` | Tests — extends root, adds `jasmine` types |
| `projects/docs/tsconfig.app.json` | Docs app — extends root |
| `projects/elements/tsconfig.app.json` | Elements build — extends root |

**The root `tsconfig.json` is the single source of truth for all TypeScript rules.** You never need to repeat flags in child configs — they all inherit automatically via `"extends": "../../tsconfig.json"`.

---

## 2. The tsconfig inheritance chain

```
tsconfig.json  (root — all strict flags here)
    │
    ├── projects/platform-ui/tsconfig.lib.json      (+ declaration output)
    │       └── projects/platform-ui/tsconfig.lib.prod.json  (+ partial compilation)
    │
    ├── projects/platform-ui/tsconfig.spec.json     (+ jasmine types)
    ├── projects/docs/tsconfig.app.json             (docs app)
    └── projects/elements/tsconfig.app.json         (elements build)
```

Child configs only add settings specific to their purpose (output directory, types, compilation mode). All strictness flags flow down from the root.

---

## 3. What `strict: true` covers (8 flags in one)

Setting `"strict": true` is a shorthand that **automatically enables all 8 flags below**. You do not need to list them individually — `strict: true` does it all.

```json
"strict": true
```

### 3.1 `strictNullChecks`

**What it does:** `null` and `undefined` are not assignable to any type unless explicitly declared.

```typescript
// ❌ Error with strictNullChecks
let name: string = null;  // null is not a string

// ✅ Correct — declare that null is allowed
let name: string | null = null;

// ❌ Error — accessing property on something that might be null
const user = getUser();    // returns User | null
console.log(user.name);    // Error: Object is possibly null

// ✅ Correct — check first
if (user) {
  console.log(user.name);
}
// Or use optional chaining
console.log(user?.name);
```

**Why it matters:** The majority of runtime `TypeError: Cannot read property of undefined` crashes are prevented by this single flag.

---

### 3.2 `strictFunctionTypes`

**What it does:** Function parameter types are checked contravariantly (the correct direction). Without this, you could assign a function that expects a narrower type to a variable expecting a broader type.

```typescript
type Handler = (event: MouseEvent) => void;

// ❌ Error — Event is broader than MouseEvent; the handler may receive
//             a non-MouseEvent and crash when accessing mouseEvent.clientX
const handler: Handler = (e: Event) => console.log(e);

// ✅ Correct
const handler: Handler = (e: MouseEvent) => console.log(e.clientX);
```

---

### 3.3 `strictBindCallApply`

**What it does:** Checks that `.bind()`, `.call()`, and `.apply()` are called with the correct argument types.

```typescript
function greet(name: string, age: number): string {
  return `Hello ${name}, age ${age}`;
}

// ❌ Error — second argument is string, not number
greet.call(null, 'Alice', 'thirty');

// ✅ Correct
greet.call(null, 'Alice', 30);
```

---

### 3.4 `strictPropertyInitialization`

**What it does:** Class properties must either be initialized in the declaration or assigned in the constructor.

```typescript
// ❌ Error — label is declared but may never be set
class ButtonComponent {
  label: string;
}

// ✅ Option 1 — initialize with a default
class ButtonComponent {
  label: string = '';
}

// ✅ Option 2 — mark as definitely assigned (use only when Angular DI sets it)
class ButtonComponent {
  label!: string;  // ! means "trust me, it will be set"
}

// ✅ Option 3 — allow null
class ButtonComponent {
  label: string | null = null;
}
```

**Note on `!` (definite assignment assertion):** In Angular components, `@ViewChild`, `@ContentChild`, and injected services are assigned by the framework after construction. Use `!` for these — but **only** for these.

---

### 3.5 `noImplicitAny`

**What it does:** Variables and parameters whose type cannot be inferred must be explicitly typed. TypeScript will not silently fall back to `any`.

```typescript
// ❌ Error — TypeScript cannot infer the type of `data`
function process(data) {
  return data.length;
}

// ✅ Correct
function process(data: string[]): number {
  return data.length;
}

// ✅ Also correct if the type is genuinely unknown
function process(data: unknown): void {
  if (Array.isArray(data)) {
    console.log(data.length);
  }
}
```

---

### 3.6 `noImplicitThis`

**What it does:** `this` inside functions must have a known type. Without this, `this` is `any` inside regular functions, hiding bugs.

```typescript
// ❌ Error — `this` inside the callback is implicitly `any`
class Timer {
  count = 0;
  start() {
    setInterval(function() {
      this.count++;  // `this` is `any` here — runtime bug
    }, 1000);
  }
}

// ✅ Correct — use arrow functions which capture lexical `this`
class Timer {
  count = 0;
  start() {
    setInterval(() => {
      this.count++;  // `this` is Timer — correct
    }, 1000);
  }
}
```

---

### 3.7 `alwaysStrict`

**What it does:** Emits `"use strict"` at the top of every generated JavaScript file and parses every file in strict mode.

This prevents:
- Using undeclared variables
- Duplicate parameter names
- Writing to read-only properties silently

---

### 3.8 `strictBindCallApply` *(already covered in 3.3)*

---

## 4. Extra strictness flags (beyond strict)

These flags are **not included** in `strict: true` — they were added explicitly to this project for additional safety.

### 4.1 `noImplicitOverride` ✅ Enabled

**What it does:** When a subclass method overrides a base class method, you must write the `override` keyword explicitly. This catches accidental overrides when the base class method is renamed.

```typescript
class Base {
  render(): void { }
}

// ❌ Error — overriding without `override` keyword
class Child extends Base {
  render(): void { }  // Error: method overrides base but lacks `override`
}

// ✅ Correct
class Child extends Base {
  override render(): void { }
}
```

---

### 4.2 `noPropertyAccessFromIndexSignature` ✅ Enabled

**What it does:** Forces you to use bracket notation `obj['key']` instead of dot notation `obj.key` when accessing a property defined via an index signature. This makes it visually clear that the access is dynamic.

```typescript
interface Config {
  [key: string]: string;
}

// ❌ Error — looks like a known property but is actually dynamic
const value = config.theme;

// ✅ Correct — bracket notation signals "this is a dynamic key"
const value = config['theme'];
```

---

### 4.3 `noImplicitReturns` ✅ Enabled

**What it does:** Every code path through a function that has a return type must explicitly return a value. A function that sometimes returns and sometimes falls through is a bug.

```typescript
// ❌ Error — the `else` branch returns nothing
function getLabel(type: string): string {
  if (type === 'primary') {
    return 'Primary';
  }
  // Missing return — TypeScript catches this
}

// ✅ Correct
function getLabel(type: string): string {
  if (type === 'primary') {
    return 'Primary';
  }
  return 'Default';
}
```

---

### 4.4 `noFallthroughCasesInSwitch` ✅ Enabled

**What it does:** Every `case` in a `switch` statement must either `break`, `return`, or `throw`. Accidental fall-through (missing `break`) is one of the oldest bugs in JavaScript.

```typescript
// ❌ Error — `case 'sm'` falls through to `case 'md'`
switch (size) {
  case 'sm':
    padding = 4;   // Missing break!
  case 'md':
    padding = 8;
    break;
}

// ✅ Correct
switch (size) {
  case 'sm':
    padding = 4;
    break;
  case 'md':
    padding = 8;
    break;
  default:
    padding = 0;
}
```

---

### 4.5 `exactOptionalPropertyTypes` ✅ Enabled (added in this session)

**What it does:** This is the strictest optional property check. It distinguishes between:
- A property being **absent** from an object
- A property being **present but set to `undefined`**

Without this flag, TypeScript allows you to set an optional property (`title?: string`) to `undefined` explicitly, which is different from not including it at all — and causes bugs in libraries like JSON serializers, spread operators, and APIs that check `'key' in obj`.

```typescript
interface Toast {
  title?: string;  // either absent, or present as a string — NOT `string | undefined`
}

// ❌ Error with exactOptionalPropertyTypes — undefined is not the same as absent
const toast: Toast = {
  title: config.title,  // config.title is `string | undefined` — cannot assign
};

// ✅ Correct — only include the property when it has a value
const toast: Toast = {
  ...(config.title !== undefined && { title: config.title }),
};
```

**Real bug this caught in this project:** `toast.service.ts` was assigning `config.title` (which is `string | undefined`) directly to `Toast.title`. This caused the toast object to always have a `title` key, even when it was `undefined` — which could break downstream code checking `'title' in toast`.

---

### 4.6 `useUnknownInCatchVariables` ✅ Enabled (added in this session)

**What it does:** In `catch` blocks, the error variable `e` is typed as `unknown` instead of `any`. This forces you to check what the error actually is before using it.

```typescript
// ❌ Before — catch variable is `any`, so .message access is unchecked
try {
  doSomething();
} catch (e) {
  console.error(e.message);  // e is `any` — no type safety
}

// ✅ After — e is `unknown`, so you must narrow it first
try {
  doSomething();
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);  // safe — TypeScript knows e is Error
  } else {
    console.error('Unknown error', e);
  }
}
```

**Why this matters for a library:** A library's error handling code runs in customer apps. If `e` is silently `any`, a bug in error handling can crash the customer's app silently at runtime.

---

## 5. Angular compiler strict checks

These flags live in `angularCompilerOptions` and are checked by the Angular template compiler (not TypeScript itself).

### 5.1 `strictTemplates` ✅ Enabled

**What it does:** The Angular template compiler fully type-checks HTML templates. Every binding, event handler, and pipe usage is verified against the component's TypeScript types.

```html
<!-- ✅ TypeScript type of `user.age` is `number` — this is correct -->
<span>{{ user.age }}</span>

<!-- ❌ Error — toUpperCase() does not exist on `number` -->
<span>{{ user.age.toUpperCase() }}</span>

<!-- ❌ Error — `(valueChang)` is a typo, the real output is `(valueChange)` -->
<pui-lib-input (valueChang)="onInput($event)"></pui-lib-input>
```

Without `strictTemplates`, template errors only appear at runtime. With it, they are caught during `ng build`.

---

### 5.2 `strictInputAccessModifiers` ✅ Enabled

**What it does:** Enforces that template bindings respect `private` and `protected` access modifiers on `@Input()` properties.

```typescript
// ❌ Error in template — private inputs cannot be bound from outside
@Input() private label = '';
```

---

### 5.3 `strictInjectionParameters` ✅ Enabled

**What it does:** Every class that Angular injects must have complete metadata so the DI system can construct it. Missing metadata causes runtime crashes.

```typescript
// ❌ Would cause DI runtime crash — injectable class has no metadata
class MyService {
  constructor(private http: HttpClient) {}
}

// ✅ Correct
@Injectable({ providedIn: 'root' })
class MyService {
  constructor(private http: HttpClient) {}
}
```

---

## 6. Module and output options

These are not strictness flags — they control how TypeScript compiles the code.

| Option | Value | Meaning |
|--------|-------|---------|
| `target` | `ES2022` | Compile to modern JavaScript. Supports `async/await`, optional chaining, nullish coalescing natively — no downleveling needed. |
| `module` | `ES2022` | Use ES modules (`import`/`export`) in the output. Required for Angular's tree-shaking. |
| `moduleResolution` | `bundler` | Let the bundler (Webpack/esbuild) resolve modules. Supports `exports` field in `package.json`. |
| `lib` | `["ES2022", "dom"]` | Include type definitions for ES2022 APIs and browser DOM APIs. |
| `importHelpers` | `true` | Import TypeScript helper functions from `tslib` instead of inlining them in every file. Reduces bundle size. |
| `sourceMap` | `true` | Generate `.js.map` files so browser DevTools show original TypeScript source. |
| `declaration` | `false` | Do not generate `.d.ts` files at the root level (the library build overrides this to `true`). |

---

## 7. Interop and compatibility options

| Option | Value | Meaning |
|--------|-------|---------|
| `esModuleInterop` | `true` | Allow `import x from 'module'` for CommonJS modules that use `module.exports`. Required for some npm packages. |
| `skipLibCheck` | `true` | Skip type-checking inside `node_modules`. Speeds up compilation. Type errors inside third-party packages are their problem, not yours. |
| `forceConsistentCasingInFileNames` | `true` | Reject imports like `import './Button'` when the file is named `button.ts`. Prevents bugs on case-sensitive file systems (Linux CI servers). |
| `experimentalDecorators` | `true` | Enable Angular's `@Component`, `@Input`, `@Output` decorators. Required for Angular. |
| `useDefineForClassFields` | `false` | Use TypeScript's class field semantics instead of the TC39 native semantics. Required for Angular's metadata system to work correctly. |

---

## 8. Common errors you will see and how to fix them

### Error: `Object is possibly 'null' or 'undefined'`

Caused by `strictNullChecks`.

```typescript
// ❌
const el = document.querySelector('#app');
el.classList.add('active');  // Error: el might be null

// ✅ Option 1 — guard check
const el = document.querySelector('#app');
if (el) el.classList.add('active');

// ✅ Option 2 — optional chaining
document.querySelector('#app')?.classList.add('active');

// ✅ Option 3 — non-null assertion (only if you are 100% certain)
const el = document.querySelector('#app')!;
el.classList.add('active');
```

---

### Error: `Type 'X | undefined' is not assignable to type 'X'`

Caused by `strictNullChecks` or `exactOptionalPropertyTypes`.

```typescript
// ❌
function greet(name: string | undefined) {
  const upper: string = name.toUpperCase();  // Error: name might be undefined
}

// ✅
function greet(name: string | undefined) {
  if (!name) return;
  const upper: string = name.toUpperCase();  // Safe — name is `string` here
}
```

---

### Error: `Property 'X' has no initializer and is not definitely assigned in the constructor`

Caused by `strictPropertyInitialization`.

```typescript
// ❌
class MyComponent {
  title: string;  // Error — never set
}

// ✅ Option 1 — give it a default
class MyComponent {
  title: string = '';
}

// ✅ Option 2 — for Angular @Input or @ViewChild (set by framework)
class MyComponent {
  @Input() title!: string;
  @ViewChild('btn') btn!: ElementRef;
}
```

---

### Error: `Not all code paths return a value`

Caused by `noImplicitReturns`.

```typescript
// ❌
function getSize(variant: 'sm' | 'md' | 'lg'): number {
  if (variant === 'sm') return 24;
  if (variant === 'md') return 40;
  // Missing 'lg' — error
}

// ✅
function getSize(variant: 'sm' | 'md' | 'lg'): number {
  if (variant === 'sm') return 24;
  if (variant === 'md') return 40;
  return 56;  // 'lg' case handled
}
```

---

### Error: `Type 'string | undefined' is not assignable to type 'string'` on optional properties

Caused by `exactOptionalPropertyTypes`.

```typescript
interface Config {
  label?: string;  // present-as-string or absent — NOT undefined
}

// ❌ Error — config.label is `string | undefined`; cannot assign directly
const c: Config = { label: someValue };  // if someValue is `string | undefined`

// ✅ Correct — spread conditionally
const c: Config = {
  ...(someValue !== undefined && { label: someValue }),
};
```

---

### Error: `'e' is of type 'unknown'` in catch blocks

Caused by `useUnknownInCatchVariables`.

```typescript
// ❌ Error — cannot access .message on unknown
try {
  doSomething();
} catch (e) {
  console.log(e.message);  // Error: e is `unknown`
}

// ✅ Correct — narrow the type first
try {
  doSomething();
} catch (e) {
  const message = e instanceof Error ? e.message : String(e);
  console.log(message);
}
```

---

## 9. What was fixed when full strict mode was enabled

When `exactOptionalPropertyTypes` and `useUnknownInCatchVariables` were added to this project, one real bug was found and fixed:

| File | Bug | Fix |
|------|-----|-----|
| `toast.service.ts` | `Toast` object was built with `title: config.title` where `config.title` is `string \| undefined`. This meant the toast always had a `title` key even when the user never set one (value: `undefined`). | Changed to spread the property conditionally: `...(config.title !== undefined && { title: config.title })` |

This is exactly the kind of subtle bug that `exactOptionalPropertyTypes` is designed to catch — the code "worked" at runtime in most cases, but was technically wrong and could cause issues in code that checks `'title' in toast`.

---

## 10. Rules for new code

Follow these rules when writing new TypeScript in this project:

| Rule | Reason |
|------|--------|
| Never use `any` | Use `unknown`, generics, or a proper type instead |
| Never use `// @ts-ignore` | Fix the underlying type issue instead |
| Use `!` (non-null assertion) only for `@Input()`, `@ViewChild`, `@ContentChild` | These are set by Angular, not your code |
| Always handle `null`/`undefined` explicitly | Optional chaining `?.` and nullish coalescing `??` are your friends |
| Declare return types on public methods | Catches bugs and serves as documentation |
| Use `override` when extending a base class | Required by `noImplicitOverride` |
| In `catch(e)`, always check `e instanceof Error` before accessing `.message` | Required by `useUnknownInCatchVariables` |
| For optional properties, spread conditionally: `...(x !== undefined && { key: x })` | Required by `exactOptionalPropertyTypes` |
| Use `unknown` instead of `any` for truly unknown data | `unknown` forces you to check the type before using it — `any` does not |
