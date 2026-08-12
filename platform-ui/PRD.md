# Platform UI Library — Product Requirements Document (PRD)

**Document Status:** Draft
**Audience:** Technical Architects, Frontend Architects, Engineering Leads, Developers, QA, Product/Platform Teams
**Scope:** Platform UI component library development, consumption, standards, testing, versioning, documentation, and publishing
**Out of Scope:** Application deployment and infrastructure deployment

---

## 1. Purpose

The **Platform UI Library** (`@bhairab-patra/platform-ui`) provides a standardized, reusable, accessible, and maintainable UI foundation that can be consumed by multiple applications and technology stacks.

The objective is to avoid every application independently creating buttons, forms, dialogs, tables, loaders, notifications, layouts, design tokens, and other common UI patterns.

The library provides:

- Consistent UI/UX across platform applications
- Reusable, production-ready components
- Centralized design tokens and styling standards
- Accessibility by default
- Consistent behavior across applications
- Reduced duplicate implementation
- Faster application development
- Centralized bug fixes and improvements
- Controlled API and version management
- Automated quality validation
- Clear consumption and upgrade guidelines

The library acts as a **shared UI product**, not simply as a collection of reusable components.

---

## 2. Goals

### Primary Goals

1. Establish a common UI standard for platform applications.
2. Provide reusable, production-ready components.
3. Support consumption by **Angular applications natively** and **React/other applications via Angular Elements (Web Components)**.
4. Maintain a stable and predictable component API.
5. Follow **Semantic Versioning (SemVer)**.
6. Provide automated unit testing with a path toward integration and accessibility validation.
7. Publish versioned packages through **npm (npmjs.org)** via GitHub Actions CI/CD.
8. Provide clear documentation and examples through the built-in **docs application**.
9. Minimize breaking changes.
10. Make upgrading from one library version to another predictable.
11. Centralize design tokens and common styling decisions.
12. Establish governance around component creation, API changes, releases, and deprecations.

---

## 3. Non-Goals

The Platform UI Library is **not** responsible for:

- Application-specific business logic
- Application-specific workflows
- Backend/API integration
- Application deployment or infrastructure
- Authentication/authorization logic
- Application-specific state management
- Domain-specific business components unless explicitly approved as shared platform patterns

**Good candidate:** `Button`, `Modal`, `Dropdown`, `Table`, `Tooltip`, `DatePicker`, `Loader`, `FormField`

**Not a candidate:** `CustomerLoanApprovalWorkflow`, `TenantProvisioningBusinessForm`, `AccountSpecificDashboard`

Shared components must remain sufficiently generic to be reusable across applications.

---

## 4. Target Consumers

| Consumer | Expected Usage |
|---|---|
| Angular 19+ applications | Primary framework integration — full native API |
| React applications | Consumed via Angular Elements Web Component bundle |
| Other web applications | Can consume the Web Component bundle where applicable |
| Future applications | Consume via published npm package |

---

## 5. High-Level Architecture

```text
                    Platform UI
                        |
        +---------------+----------------+
        |               |                |
   Design Tokens    Core UI         Documentation
   (CSS tokens)    Components        (docs app)
        |               |                |
        +---------------+----------------+
                        |
                 Distribution Layer
                  /             \
          Angular Package     Angular Elements
          (ng-packagr)        (Web Components)
                  \             /
              Consumer Applications
```

### Layer 1 — Design Tokens

Centralized CSS custom properties defined in `tokens.css` and theme files (`theme-new.css`, `theme-old.css`):

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Z-index
- Component dimensions
- Motion/transition values

Example — instead of:
```scss
margin: 17px;
color: #123456;
border-radius: 6px;
```
prefer:
```scss
margin: var(--platform-spacing-md);
color: var(--platform-color-primary);
border-radius: var(--platform-radius-md);
```

### Layer 2 — Core Components

28+ reusable UI components currently implemented (see [Section 44](#44-currently-implemented-components)).

### Layer 3 — Distribution

```text
Platform UI
 ├── Angular Package       (@bhairab-patra/platform-ui via ng-packagr)
 └── Web Component Bundle  (Angular Elements — single concatenated JS file)
```

---

## 6. Component Design Principles

### 6.1 Reusability

Components solve common UI problems, not a single application's specific requirement.

### 6.2 Composability

Components are composable rather than large monolithic blocks.

```text
Form
 ├── FormField
 │    ├── Label
 │    ├── Input
 │    └── ErrorMessage
```

### 6.3 Predictable API

Inputs, outputs/events, properties, content projection, and configuration are clearly defined and documented.

### 6.4 Accessibility First

Components follow accessibility standards including:

- Keyboard navigation
- Focus management
- Semantic HTML
- Screen-reader support
- Appropriate ARIA usage
- Focus visibility
- Color contrast
- Accessible labels
- Error messaging
- Disabled/loading states

Target: **WCAG 2.2 AA** alignment.

### 6.5 Responsive Behavior

Components behave predictably across supported screen sizes.

### 6.6 Themeability

Components consume design tokens rather than hard-coded values. Two theme variants are supported: `theme-new` and `theme-old`.

---

## 7. Design Token Strategy

Design tokens are a first-class platform asset, defined in:

```text
tokens.css       — base design tokens
theme-new.css    — new theme overrides
theme-old.css    — legacy theme overrides
```

Token categories:

```text
Design Tokens
 ├── Color
 ├── Typography
 ├── Spacing
 ├── Radius
 ├── Shadow
 ├── Z-index
 └── Motion
```

Applications load the appropriate theme file alongside the library. Components reference tokens via CSS custom properties so theme switching does not require component changes.

---

## 8. Component API Standards

Each component defines:

### Inputs / Properties

- Name, type, default value, required/optional, allowed values, behavior

### Outputs / Events

- Event name, payload type, when triggered

### States

Interactive components explicitly define applicable states:

- Default, Hover, Focus, Active, Disabled, Loading, Error, Selected, Read-only, Empty

---

## 9. Styling Standards

- Centralized design tokens — no duplicated CSS values
- No unnecessary global styles
- No leaking styles into consuming applications
- Angular components use `ViewEncapsulation.ShadowDom` for full style isolation
- `!important` is avoided
- No deep selectors unless technically required
- Consistent BEM-like naming within component stylesheets

---

## 10. Framework Compatibility

### Angular (Primary)

The Angular package provides:

- Angular 19 standalone components
- `ChangeDetectionStrategy.OnPush` on all components
- Reactive Forms / CVA integration where applicable
- Angular lifecycle handling
- TypeScript strict types
- ESLint validation

### React / Other Frameworks (via Angular Elements)

The Angular Elements build produces a single concatenated Web Component bundle. The `scripts/` utilities handle:

- `concat-elements.js` — bundles the Elements build output into a single file
- `copy-elements-to-dist.js` — copies the bundle to `dist/`
- `copy-elements-to-react.js` — copies the bundle to the React consumer target

This is not a full React adapter. React applications consume Web Components as custom HTML elements.

### Framework Neutrality

Framework neutrality is provided by the Angular Elements bundle, not by rebuilding components in multiple frameworks. Developer experience, accessibility, and Angular-native patterns remain the primary design target.

---

## 11. Package Structure

```text
platform-ui/
├── projects/
│    ├── platform-ui/       ← library source
│    │    └── src/lib/      ← 28+ component directories
│    ├── docs/              ← documentation application
│    └── elements/          ← Angular Elements build target
├── scripts/                ← concat/copy utilities
├── dist/                   ← build output
├── tokens.css              ← design tokens
├── theme-new.css           ← new theme
├── theme-old.css           ← legacy theme
├── eslint.config.js
├── tsconfig.json
└── angular.json
```

The library is published from `dist/platform-ui` (built by ng-packagr). The elements bundle is published separately.

### Tree-Shaking

The library package has `"sideEffects": false` in its `package.json`, enabling tree-shaking in consuming applications.

---

## 12. Dependency Management

### Principles

- No unnecessary runtime dependencies
- Angular packages declared as peer dependencies so consumers are not forced to bundle multiple Angular copies
- Framework packages (`@angular/common`, `@angular/core`) are peer dependencies
- Only `tslib` is a hard runtime dependency
- Dependency versions track Angular 19 compatibility
- Regularly review for security vulnerabilities

```text
Consumer Application
     |
     +---- @bhairab-patra/platform-ui
              |
              +---- @angular/common  (peer — provided by the app)
              +---- @angular/core    (peer — provided by the app)
              +---- tslib            (runtime dependency)
```

---

## 13. Versioning Strategy

The library follows **Semantic Versioning**.

```text
MAJOR.MINOR.PATCH
```

Current published version: **1.6.3** (see `projects/platform-ui/package.json`).

| Increment | When | Example |
|---|---|---|
| PATCH | Backward-compatible bug fixes | 1.6.3 → 1.6.4 |
| MINOR | New components, new optional properties, non-breaking enhancements | 1.6.3 → 1.7.0 |
| MAJOR | Removing a component, renaming a public API, behavior breaking changes, removing framework support | 1.6.3 → 2.0.0 |

---

## 14. Breaking Change Policy

Before introducing a breaking change:

1. Identify affected consumers.
2. Document the impact.
3. Provide migration guidance.
4. Deprecate the API first (where practical) in a MINOR release.
5. Allow a transition period before removal in a MAJOR release.
6. Update documentation and changelog.
7. Communicate the change before release.

```text
Current stable API
    ↓
API deprecated (MINOR) — old behavior still works, deprecation warning
    ↓
Migration guidance published
    ↓
Old API removed (MAJOR)
```

---

## 15. Deprecation Strategy

Deprecated APIs should:

- Clearly indicate deprecation in documentation and comments
- Explain the replacement API
- Remain available for at least one MAJOR version cycle
- Be removed only through an appropriate MAJOR release

```text
Deprecated:  platform-button legacyStyle
Use instead: platform-button variant
```

---

## 16. Publishing Strategy — npm via GitHub Actions

The library is published as a versioned package to **npmjs.org** via GitHub Actions.

```text
Developer
   ↓
Feature / Component Development
   ↓
Pull Request
   ↓
Automated Validation (lint, type check, build)
   ↓
Review & Approval
   ↓
Version Update (projects/platform-ui/package.json)
   ↓
Git Tag (v1.x.x)
   ↓
GitHub Actions Pipeline (triggered by tag push)
   ↓
npm ci → build → npm publish
   ↓
npmjs.org Package Registry
   ↓
Consumer Application
```

The GitHub Actions workflow (`.github/workflows/publish.yml`):

- Triggers on tags matching `v*`
- Runs on `ubuntu-latest`, Node 20
- Executes `npm ci`, `npm run build`, then `npm publish dist/platform-ui --access public`
- Authenticates with `secrets.NPM_TOKEN`

### Important Principle

Source repository and published package are different concerns. Consumers install the released package — they never depend on source code directly.

---

## 17. Local Development / Application Consumption

During development, engineers may test unreleased Platform UI changes against a consuming application.

Supported local workflow:

```text
npm run build:local           ← lint + build (development config)
npm run pack:local            ← build + npm pack → .tgz in dist/
```

The root `package.json` uses `"@bhairab-patra/platform-ui": "file:dist/platform-ui"` to link the local build into the docs and demo apps. This is a **development workflow only** — production applications consume a published version.

---

## 18. Consumption Standards

Applications consume Platform UI through the versioned npm package:

```json
{
  "dependencies": {
    "@bhairab-patra/platform-ui": "^1.6.0"
  }
}
```

Applications must **not**:

- Copy library source code into their own repository
- Modify library source directly
- Create private forks for minor customization
- Override internal component styles not exposed as tokens
- Depend on undocumented internal APIs

---

## 19. Customization Strategy

Preferred order for application customization:

```text
1. Use existing Platform UI configuration (inputs, variants)
          ↓
2. Override design tokens (CSS custom properties)
          ↓
3. Component composition (wrap and extend)
          ↓
4. Propose as a new Platform UI capability
          ↓
5. Application-specific implementation (last resort)
```

If multiple applications need the same customization, it is a strong candidate to become a Platform UI feature.

---

## 20. Testing Strategy

### Current State

| Level | Status |
|---|---|
| Unit tests | Partial — `button` and `card` components only |
| Integration tests | Not yet implemented |
| Accessibility tests | Not yet implemented |
| Visual regression | Not yet implemented |

### Target State

```text
                    Testing
                       |
       +---------------+---------------+
       |               |               |
   Unit Tests     Integration      Visual / A11y
       |               |               |
 Component Logic   Component      UI consistency
                   Behavior
```

### 20.1 Unit Testing (Karma + Jasmine — current framework)

Target coverage:

- Component inputs and outputs
- State changes
- Edge cases
- Error handling
- Service logic
- Utility functions

**All new components must ship with unit tests.**

### 20.2 Integration Testing (Target)

- Component interactions
- Forms and CVA behavior
- Dialog interactions
- Table and pagination composition
- Dropdown behavior

### 20.3 Accessibility Testing (Target)

- Keyboard navigation
- Focus behavior
- ARIA attributes
- Semantic HTML structure
- Color contrast

### 20.4 Visual Testing (Target)

Where justified, visual regression testing for critical components:

```text
Library change
      ↓
Unexpected visual change detected
      ↓
Review before release
```

### 20.5 Consumer Validation

Critical releases (framework compatibility, styling, token changes, public API changes) should be validated against representative consuming applications before publishing.

---

## 21. Quality Gates

A release must not publish if mandatory quality gates fail.

**Current implemented gates:**

```text
Lint (ESLint — angular-eslint + typescript-eslint)
  ↓
Type Check (TypeScript strict mode — full strict + 6 extra flags)
  ↓
Build (ng-packagr)
  ↓
Publish (npm)
```

**Target gates (not yet implemented):**

```text
Lint
  ↓
Type Check
  ↓
Unit Tests
  ↓
Integration Tests
  ↓
Accessibility Checks
  ↓
Build
  ↓
Package Validation
  ↓
Version Validation
  ↓
Publish
```

---

## 22. Code Quality Standards

### TypeScript

- Full TypeScript strict mode (`strict: true` + 6 extra flags — see `TypeScript-strict-mode.md`)
- No `any` in new code (existing `any` usages emit warnings, not errors)
- Explicit public API types
- Strong component interfaces

### Linting (ESLint — see `eslint-rules.md`)

Rules enforced:

- Angular anti-patterns (component selector, OnPush, no native event outputs)
- Unused code (`no-unused-vars`)
- Unsafe patterns (`eqeqeq`)
- Console statements (`no-console` — warn level)
- Debugger statements (`no-debugger` — error)
- Template accessibility (alt-text, key events for click handlers)

Build gate: **lint runs before every build and publish script.** A failing lint blocks the build.

### Formatting

Consistent TypeScript formatting is enforced through TSLint/ESLint stylistic rules. A dedicated formatter (e.g., Prettier) is not yet configured — this is a future addition.

### Pre-Commit Validation

Not yet configured. Target: lightweight pre-commit hook running lint and type check before `git commit`.

---

## 23. CI Validation — GitHub Actions

The current pipeline (`.github/workflows/publish.yml`) covers:

```text
Git Tag Push (v*)
  ↓
Install Dependencies (npm ci)
  ↓
Build Library (npm run build)
  ↓
Publish to npmjs.org (npm publish)
```

**Target pipeline additions:**

```text
Commit / PR
  ↓
Install Dependencies
  ↓
Lint
  ↓
Type Check
  ↓
Unit Tests
  ↓
Build Library
  ↓
(on tag) Publish
```

---

## 24. Documentation Standards

Every public component should have documentation in the **docs application** (`ng serve docs` / `npm run docs`).

Minimum documentation per component:

- Component purpose
- Import path
- Basic usage example
- All inputs (name, type, default, description)
- All outputs/events (name, payload, trigger)
- Supported states
- Accessibility behavior
- Do/Don't guidance
- Known limitations

---

## 25. Component Documentation — Docs Application

The library includes a built-in Angular docs application (`projects/docs/`) that serves as the interactive component showcase.

Consumers can understand:

```text
What is this component?
        ↓
When should I use it?
        ↓
How do I use it?
        ↓
What inputs are available?
        ↓
What states does it support?
        ↓
What accessibility behavior exists?
```

Interactive examples are preferred over documentation consisting only of source code snippets.

Docs app commands:

```bash
npm run docs          # serve locally on :4210
npm run docs:build    # production build of docs
```

---

## 26. Release Notes / Changelog

Every published version requires a changelog entry. Format:

```text
Platform UI v1.7.0
Added
- New DatePicker component
- Loading state for Button

Changed
- Improved Dropdown keyboard navigation

Fixed
- Modal focus trap issue

Deprecated
- Legacy Input `legacySize` input — use `size` instead
```

Breaking changes must be explicitly highlighted in the changelog and in the release tag notes.

---

## 27. Version Compatibility Matrix

| Platform UI | Angular | Node |
|---|---|---|
| 1.x | Angular 19 | Node 20+ |

The compatibility matrix is updated with each release. Consumers must not guess whether their environment is supported.

---

## 28. Backward Compatibility

Backward compatibility is a primary design principle.

Before changing a public API:

1. Is the change necessary?
2. Can it be additive instead of breaking?
3. Can the old behavior remain temporarily?
4. Can the change be introduced through deprecation first?
5. Which applications will be affected?
6. Is a migration guide required?

---

## 29. Edge Cases

The library architecture explicitly addresses:

| Edge Case | Approach |
|---|---|
| Multiple app versions | SemVer + caret ranges allow controlled upgrade timing |
| Framework version differences | Compatibility matrix documents supported Angular versions |
| Peer dependency conflicts | Angular packages are peer deps, not bundled |
| Style leakage | `ViewEncapsulation.ShadowDom` isolates component styles |
| CSS conflicts | No global styles emitted by components |
| Browser compatibility | ES2022 target; modern evergreen browsers |
| Accessibility regression | Accessibility is part of component definition, not afterthought |
| API regression | Public API is declared in `public-api.ts`; internal APIs are not exported |
| Tree-shaking | `sideEffects: false` in library package.json |
| Duplicate framework bundling | Angular is a peer dependency |
| Unused components | Only components exported in `public-api.ts` are part of the stable API |
| Experimental APIs | Must be clearly marked; excluded from compatibility guarantees |

---

## 30. Component Lifecycle

A component follows a controlled lifecycle before becoming stable:

```text
Idea
 ↓
Use Case Validation (is it reusable across apps?)
 ↓
API Design (inputs, outputs, states)
 ↓
Implementation (OnPush, ShadowDom, CVA if needed)
 ↓
Unit Testing
 ↓
Accessibility Validation
 ↓
Documentation (docs app)
 ↓
Code Review
 ↓
Released as Stable
```

A component must not enter the stable public API without completing this lifecycle.

---

## 31. New Component Acceptance Criteria

Before adding a new component, evaluate:

- [ ] Is the use case common across multiple applications?
- [ ] Is there an existing component that could be enhanced instead?
- [ ] Is the API generic enough for broad consumption?
- [ ] Are accessibility requirements defined?
- [ ] Are responsive requirements defined?
- [ ] Are design tokens used (no hard-coded values)?
- [ ] Are unit tests included?
- [ ] Is documentation included in the docs app?
- [ ] Is ownership defined?
- [ ] Is the public/internal API boundary clear?

---

## 32. Governance

### Platform UI Team Responsibilities

- Library architecture
- Core components
- Quality standards
- Release management
- Documentation
- Versioning and compatibility
- Breaking change decisions

### Consumer Team Responsibilities

- Correct usage of public APIs
- Upgrade validation against their application
- Reporting issues
- Not overriding internal styles
- Providing feedback on gaps

---

## 33. Contribution Model

Teams propose improvements via:

```text
Requirement or Issue
       ↓
Proposal (GitHub Issue)
       ↓
Platform UI Review (does it belong in the library?)
       ↓
Implementation (with tests + docs)
       ↓
Code Review
       ↓
Release
```

Not every application-specific requirement becomes a library feature.

---

## 34. Security and Dependency Management

- Dependency scanning (npm audit)
- Regular dependency updates tracking Angular releases
- Removal of unused dependencies
- Review of third-party package licenses
- Avoid dependencies for trivial utilities
- All consumer applications inherit library dependencies — keep the dependency surface minimal

---

## 35. Performance Standards

- Tree-shaking enabled (`sideEffects: false`)
- `ChangeDetectionStrategy.OnPush` on all components
- `ViewEncapsulation.ShadowDom` avoids global style pollution
- No large third-party runtime dependencies
- Angular Elements bundle kept as compact as possible
- Performance considered during component design, not post-implementation

---

## 36. Public vs Internal API

This is critical for long-term maintainability.

### Public API

Anything exported from `projects/platform-ui/src/public-api.ts`.

Consumer applications may only depend on public API exports.

### Internal API

Everything inside `projects/platform-ui/src/lib/` that is **not** re-exported from `public-api.ts`.

Internal APIs may change without following SemVer guarantees.

```text
@bhairab-patra/platform-ui          ← Public (public-api.ts exports)
@bhairab-patra/platform-ui/internal ← Does not exist / not supported
```

---

## 37. Release Strategy

Every release contains:

- Updated version in `projects/platform-ui/package.json`
- Built package in `dist/platform-ui`
- Changelog entry
- Git tag (`v1.x.x`)
- Documentation updates

```text
PATCH → Bug fix
MINOR → New backward-compatible functionality
MAJOR → Breaking change (with migration guide)
```

Release is automated via GitHub Actions on tag push. Manual steps:

1. Update version in `projects/platform-ui/package.json`
2. Update CHANGELOG
3. Push tag `git tag v1.x.x && git push --tags`
4. GitHub Actions runs automatically

---

## 38. Consumer Upgrade Strategy

Applications upgrade deliberately:

```text
Review release notes (CHANGELOG)
      ↓
Check compatibility matrix
      ↓
Upgrade dependency version
      ↓
Run application tests
      ↓
Validate UI visually
      ↓
Validate accessibility
      ↓
Merge upgrade
```

For MAJOR version upgrades, migration documentation is mandatory before publishing the breaking release.

---

## 39. Engineering Principles

1. **API Stability Over Internal Implementation** — internal implementation can change; public API must remain stable.
2. **Accessibility by Default** — accessibility is built into components, not left to consumers.
3. **Reuse Over Duplication** — build once, reuse everywhere appropriate.
4. **Composition Over Complexity** — prefer smaller composable components over monolithic ones.
5. **Configuration Over Forking** — provide supported customization paths, not private forks.
6. **Documentation Is Part of the Feature** — a component without docs in the docs app is incomplete.
7. **Tests Are Part of the Component** — a component without unit tests is not production-ready.
8. **Versioning Is a Contract** — version numbers communicate compatibility expectations.
9. **Design Tokens Are the Source of Visual Truth** — no application recreates platform design values independently.
10. **Consumer Experience Matters** — easy to install, discover, use, upgrade, and troubleshoot.

---

## 40. Definition of Done

A Platform UI component is complete when:

- [ ] API is finalized (inputs, outputs, states documented)
- [ ] Component uses `ChangeDetectionStrategy.OnPush`
- [ ] Component uses `ViewEncapsulation.ShadowDom` (or justified alternative)
- [ ] Design tokens are used — no hard-coded values
- [ ] Accessibility requirements are implemented (keyboard, ARIA, focus)
- [ ] Keyboard behavior is validated
- [ ] Unit tests are implemented and passing
- [ ] ESLint passes (zero errors)
- [ ] TypeScript strict mode passes (zero type errors)
- [ ] Build succeeds (`npm run build:publish`)
- [ ] Component is exported from `public-api.ts`
- [ ] Documentation page exists in the docs app
- [ ] Examples are available in the docs app
- [ ] Browser compatibility confirmed (modern evergreen)
- [ ] Angular 19 peer dependency compatibility confirmed
- [ ] CHANGELOG is updated

---

## 41. Currently Implemented

### Architecture

- **Repository:** Angular 19 Nx-style monorepo using Angular CLI workspaces (not Nx)
- **Package name:** `@bhairab-patra/platform-ui`
- **Current version:** `1.6.3`
- **Package format:** Angular Package Format (APF) via ng-packagr
- **Distribution:** npm (npmjs.org)
- **Framework support:** Angular 19 (native), React/other (via Angular Elements Web Components)
- **CI/CD:** GitHub Actions (`.github/workflows/publish.yml`)

### Angular Projects in `angular.json`

| Project | Type | Purpose |
|---|---|---|
| `platform-ui` | library | Publishable Angular component library |
| `docs` | application | Interactive documentation/showcase app |
| `elements` | application | Angular Elements build for Web Component distribution |

### Components (28+)

| Component | Export | Notes |
|---|---|---|
| Button | `ButtonComponent`, `FileUploadButtonComponent` | |
| Card | `CardComponent` | |
| Badge | `BadgeComponent` | |
| Modal | `ModalComponent` | |
| Header | `HeaderComponent` | |
| Spinner | `SpinnerComponent` | |
| Breadcrumb | `BreadcrumbComponent` | |
| Icon | `IconComponent`, `IconRegistry` | |
| Tooltip | `TooltipComponent` | |
| Search | `SearchComponent` | |
| Filter Panel | `FilterPanelComponent` | |
| Toast | `ToastContainerComponent`, `ToastService` | |
| Sidebar | `SidebarComponent` | |
| App Shell | `AppShellComponent` | |
| Table | `TableComponent` | |
| Data Table | `DataTableComponent` | |
| Tabs | `TabsComponent` | |
| Datepicker | `DatepickerComponent` | |
| Skeleton | `SkeletonComponent` | |
| Chip | `ChipComponent` | |
| Tag | `TagComponent` | |
| List | `ListComponent` | |
| Datagrid | `DatagridComponent` | |
| Menu | `MenuComponent` | |
| Editable Table | `EditableTableComponent` | |
| Form Dialog | `FormDialogComponent` | |
| Confirm Dialog | `ConfirmDialogComponent` | |
| Input | `InputComponent` | CVA |
| Select | `SelectComponent` | CVA |
| Checkbox | `CheckboxComponent` | CVA |
| Radio | `RadioComponent` | CVA |
| Textarea | `TextareaComponent` | CVA |
| Switch | `SwitchComponent` | CVA |
| Multiselect | `MultiselectComponent` | CVA |
| Password Input | `PasswordInputComponent` | CVA |
| Combobox | `ComboboxComponent` | CVA |

### Design Tokens

- `tokens.css` — base tokens (colors, spacing, radius, shadows, motion)
- `theme-new.css` — new theme values
- `theme-old.css` — legacy theme values

### Testing — Current State

| Level | Status |
|---|---|
| Unit tests | Implemented for `button` and `card` only |
| Integration tests | Not implemented |
| Accessibility tests | Not implemented |
| Visual regression | Not implemented |
| CI test gate | Not yet wired into GitHub Actions pipeline |

**All new components must include unit tests (this was not enforced for the initial 28 components — this is a known gap to address).**

### Code Quality — Implemented

| Tool | Status |
|---|---|
| ESLint (flat config, angular-eslint, typescript-eslint) | Implemented — see `eslint-rules.md` |
| TypeScript strict mode (full + 6 extra flags) | Implemented — see `TypeScript-strict-mode.md` |
| Lint as build gate | Implemented — all build/publish scripts run lint first |

### Package Publishing

- **Registry:** npmjs.org
- **Package name:** `@bhairab-patra/platform-ui`
- **Auth:** `NPM_TOKEN` GitHub Actions secret
- **Trigger:** git tag push matching `v*`
- **Build command:** `npm run build` → `npm publish dist/platform-ui --access public`

### Documentation Application

- Source: `projects/docs/`
- Served locally via `npm run docs` (port 4210)
- Built via `npm run docs:build`
- Component selectors prefixed `docs-`

### Angular Elements / Web Component Distribution

- Source project: `projects/elements/`
- Build: `npm run build:elements`
- Scripts:
  - `scripts/concat-elements.js` — concatenate build output to single bundle
  - `scripts/copy-elements-to-dist.js` — copy bundle to dist
  - `scripts/copy-elements-to-react.js` — copy bundle to React consumer target
- Full pipeline: `npm run build:full`

---

## 42. Current State vs Target State

| Area | Current State | Target State |
|---|---|---|
| Components | 28+ components implemented | Standardized component catalogue with full docs |
| Design Tokens | `tokens.css` + 2 theme files | Central source of truth, all components fully token-driven |
| Angular | Angular 19, fully supported | Maintain Angular current version compatibility |
| React | Via Angular Elements bundle | Stable Web Component distribution with usage guide |
| Unit Testing | Button + Card only | All components have unit tests |
| Integration Testing | Not implemented | Component interaction tests for complex components |
| Accessibility Testing | Not implemented | Automated a11y checks in CI |
| Visual Testing | Not implemented | Visual regression for critical components |
| ESLint | Fully configured + build gate | Maintain current config, extend as needed |
| TypeScript | Full strict mode | Maintain, address remaining `any` warnings |
| Prettier | Not configured | Standardized formatter added |
| Pre-commit hooks | Not configured | Lint + type check on commit |
| CI Pipeline | Build + publish on tag only | Full lint/test/build/publish pipeline |
| Versioning | SemVer (1.6.3) | Maintained with formal CHANGELOG |
| Publishing | npmjs.org via GitHub Actions | Same — automate more of the version bump |
| Documentation | Docs app (partial) | Complete per-component documentation |
| Deprecation | Not formally implemented | Formal deprecation annotations and lifecycle |
| Governance | Informal | Defined review process for new components |
| Compatibility Matrix | Not documented | Published and maintained per release |

---

## 43. Success Criteria

The Platform UI Library is successful when:

1. Multiple applications consume the same standardized components.
2. New applications can adopt the library without rebuilding common UI foundations.
3. UI inconsistencies across applications are reduced.
4. Component implementation time decreases for consuming teams.
5. Common bug fixes are delivered centrally through a version upgrade.
6. Accessibility is consistently maintained across all components.
7. Consumers can upgrade versions predictably.
8. Breaking changes are controlled, documented, and communicated in advance.
9. Developers can discover, understand, and use components through the docs application.
10. The library can evolve without tightly coupling it to one application's requirements.
