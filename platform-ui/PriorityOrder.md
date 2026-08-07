
Here's a full audit of everything I can see across the codebase. Grouped by impact.

1. Architecture (High Impact)
Design Tokens (already discussed)
Single source of truth for all visual values.

File Splitting (already discussed)
.ts + .html + .scss per component.

No Public API Contract
Right now consumers import directly from deep paths:

// ❌ Fragile — breaks if you move files
import { ButtonComponent } from '@solifi/platform-ui/lib/button/button.component';

// ✅ Should be
import { ButtonComponent } from '@solifi/platform-ui';
Your public-api.ts (barrel file) needs to export everything cleanly — components, models, types, tokens. Right now if you rename a file internally, consumer apps break.

Models Scattered Everywhere
Types like ButtonVariant, SpinnerType, CardData are defined inline inside component files. They should live in *.model.ts files and be exported from the public API so consumers can type their own code:

// Consumer can't do this if types aren't exported
const variant: ButtonVariant = 'primary';
2. Component Quality (High Impact)
No Form Integration (ControlValueAccessor)
Your input-like components (chip selectable, filter panel, datepicker) can't be used with Angular's FormControl or [(ngModel)]. Consumers have to wire up value tracking manually. Components that hold a value should implement ControlValueAccessor:

<!-- This should just work — currently it can't -->
<pui-datepicker formControlName="dob"></pui-datepicker>
Inconsistent ChangeDetectionStrategy
Some components use OnPush, some don't. Every component in a library should use OnPush — it's more performant and forces consumers to use immutable patterns.

Inconsistent ViewEncapsulation
Some components use ShadowDom, some use default (emulated). ShadowDom is good for style isolation but it prevents CSS custom properties from cascading in — which breaks your design token strategy. You need to pick one approach and apply it consistently. Emulated + design tokens is the safer choice for a library.

No Input Validation / Defensive Defaults
// If consumer passes variant="typo" nothing meaningful happens
@Input() variant: ButtonVariant = 'primary';
Should use ngOnChanges or a setter to warn in dev mode when an invalid value is passed.

3. Accessibility / A11y (High Impact)
This is the most commonly missed area in component libraries. Currently:

Component	Missing
Button	aria-busy when loading, aria-disabled vs disabled
Modal	Focus trap, aria-modal, aria-labelledby, Escape key close
Spinner	role="status", aria-label="Loading", aria-live="polite"
Chip	role="listitem", keyboard remove with Delete/Backspace
Datepicker	Full keyboard navigation, aria-haspopup, aria-expanded
DataGrid	role="grid", aria-sort, column header scope
Badge/Tag	role="status" where appropriate
A component library with a11y gaps forces every consumer app to patch it themselves — or ship broken accessibility.

4. Testing (High Impact)
Zero Unit Tests
The entire library has no tests. For a shared component library this is critical — a breaking change in ButtonComponent could silently break 10 consumer apps.

Minimum needed:

button/
├── button.component.ts
├── button.component.spec.ts   ← input/output tests
├── button.component.html
└── button.component.scss
No Visual Regression Testing
No Storybook, no Chromatic, no Percy. A CSS change to the card component could break its visual appearance in ways unit tests won't catch.

Recommendation: Add Storybook — it also doubles as a better component explorer than your current docs app.

5. TypeScript Quality (Medium Impact)
Weak Typing Throughout
// ❌ Current — loses all type safety
export class BadgePageComponent {
  inlineDemo = [
    { name: 'Deployment #47', variant: 'success', label: 'Passed' },
  ];
}

// ✅ Should be
interface DemoItem {
  name: string;
  variant: BadgeVariant;
  label: string;
}
inlineDemo: DemoItem[] = [...];
any Used as an Escape Hatch
The $any() casts in templates and any[] types added during bug fixes are covering real type mismatches. These should be resolved properly.

No strict Mode Enforced
Check tsconfig.json — if "strict": true isn't set, TypeScript is letting many real bugs through silently.

6. Developer Experience (Medium Impact)
No JSDoc on Component Inputs
// ❌ Current
@Input() variant: ButtonVariant = 'primary';

// ✅ Should be
/** Visual style of the button. Defaults to 'primary'. */
@Input() variant: ButtonVariant = 'primary';
Without JSDoc, IDE tooltips for consumers are blank. They have to read your docs site just to know what an input does.

No Changelog / Versioning Strategy
No CHANGELOG.md, no semantic versioning enforced. When you release a breaking change consumers have no way to know what broke.

No Migration Guide Pattern
When you rename an input or remove a component, consumers need a migration path. Large libraries (Angular CDK, Angular Material) ship ng update schematics for this.

7. Performance (Medium Impact)
No trackBy in *ngFor Loops
<!-- ❌ Current — re-renders entire list on any change -->
<div *ngFor="let item of items">

<!-- ✅ Should be -->
<div *ngFor="let item of items; trackBy: trackById">
Missing in doc pages and some lib components.

Heavy Inline SVGs Repeated
The framework tab icons (Angular, React, HTML logos) are copy-pasted SVG strings in every single page component — 6 copies of the same SVGs. Should be an IconComponent or shared SVG sprite.

No OnDestroy Cleanup
Some components use setTimeout without clearing on destroy — memory leaks in long-running apps.

8. Theming & Customisation (Medium Impact)
No Dark Mode Support
No prefers-color-scheme media query handling anywhere in the library. With design tokens this becomes a one-file addition.

No Theme Switching API
Consumers can't switch themes at runtime. With tokens, this is just:

document.documentElement.setAttribute('data-theme', 'dark');
But the token file needs to define the [data-theme="dark"] overrides.

No CSS Layer Strategy
When consumers have their own CSS, specificity conflicts with library styles are unpredictable. Wrapping library styles in @layer platform-ui { } gives consumers a clean way to override without !important.

9. Documentation (Low-Medium Impact)
No CONTRIBUTING.md
How does a new team member add a component? What are the naming conventions, file structure rules, token naming rules? Undocumented conventions get violated.

Doc Pages Have No Error / Empty States Shown
Every component demo shows the happy path only. Consumers need to see what disabled + error + empty looks like for every component.

No Playground / Code Sandbox Link
Consumers can't try the library without installing it.


Priority	Item	Effort	Value
1	Design tokens	Medium	Unblocks everything else
2	File splitting	Medium	Immediate dev quality
3	Fix ViewEncapsulation strategy	Low	Required for tokens to work
4	Export clean public API	Low	Consumer-facing
5	Extract model files + export types	Low	Consumer-facing
6	Enforce OnPush everywhere	Low	Performance
7	A11y pass	High	Correctness
8	Unit tests	High	Safety net for refactors
9	trackBy everywhere	Low	Performance
10	JSDoc on all inputs	Low	DX
11	ControlValueAccessor for form components	High	Feature completeness
12	Storybook	Medium	Visual testing + better docs
13	Dark mode tokens	Low (after tokens done)	Feature completeness