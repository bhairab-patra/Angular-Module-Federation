import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

interface FaqItem {
  q: string;
  a: string;
  code?: string;
  lang?: string;
}

interface FaqSection {
  title: string;
  icon: string;
  items: FaqItem[];
  open: boolean;
}

@Component({
  selector: 'docs-faq-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
})
export class FaqPageComponent {
  sections: FaqSection[] = [
    {
      title: 'Installation & Setup',
      icon: '📦',
      open: true,
      items: [
        {
          q: 'How do I install Platform UI in my project?',
          a: "Install the npm package, then import the tokens CSS once in your global stylesheet. That's all the setup you need — no module registration required.",
          code: `npm install @solifi/platform-ui

# In your global CSS (styles.css / styles.scss):
@import '@solifi/platform-ui/styles/tokens.css';
@import '@solifi/platform-ui/styles/themes/theme-new.css';`,
          lang: 'bash',
        },
        {
          q: 'Do I need to import a module or register anything in Angular?',
          a: "No NgModule required. Every component is standalone. Just import the component class directly in your Angular component's imports array.",
          code: `import { PuiButtonComponent } from '@solifi/platform-ui';

@Component({
  standalone: true,
  imports: [PuiButtonComponent],
  template: \`<pui-lib-button variant="primary">Save</pui-lib-button>\`
})
export class MyComponent {}`,
          lang: 'typescript',
        },
        {
          q: 'Does it work in React?',
          a: 'Yes. Every component is built as a Web Component (Custom Element) so React, Vue, Svelte, or plain HTML all work — no adapter needed.',
          code: `// React — import the side-effect registration file once
import '@solifi/platform-ui/elements';

function App() {
  return <pui-lib-button variant="primary">Save</pui-lib-button>;
}`,
          lang: 'tsx',
        },
        {
          q: 'How do I use it in plain HTML without any framework?',
          a: 'Drop the elements bundle script tag on your page. All components become available as HTML tags immediately.',
          code: `<script src="node_modules/@solifi/platform-ui/elements/pui-elements.js"></script>
<link  href="node_modules/@solifi/platform-ui/styles/tokens.css" rel="stylesheet">

<pui-lib-button variant="primary">Click me</pui-lib-button>`,
          lang: 'html',
        },
      ],
    },
    {
      title: 'Styling & Theming',
      icon: '🎨',
      open: false,
      items: [
        {
          q: 'Will my existing CSS break the library components?',
          a: 'No. Every component uses Shadow DOM — a browser-level boundary that completely blocks external CSS from entering the component. Your global resets, Bootstrap, Tailwind, or any other stylesheet cannot reach inside the components.',
          code: `/* Your app's CSS — CANNOT reach inside pui-lib-input */
input { border: 2px solid red; }   /* blocked */
* { font-family: Comic Sans; }     /* blocked */
.my-theme input { color: pink; }   /* blocked */`,
          lang: 'css',
        },
        {
          q: 'Do all form controls share the same sm/md/lg sizes, and what height does each one render at?',
          a: "Yes. Input, Select, Combobox, Multi Select, Password Input, and Textarea all accept the same size input — 'sm' | 'md' | 'lg' — and every one of them defaults to 'md' when size is left unset. The three sizes render at the same standardized height across all of them: sm is 34px, md is 44px, lg is 50px — and horizontal padding is the same var(--pui-space-3) at every size too, so nothing shifts internally as you switch sizes. This means you can freely mix, say, an Input and a Select in the same row at size=\"sm\" and their heights will line up exactly — no more small per-component drift.\n\nThese three sizes are deliberately the only built-in options — they cover the vast majority of layouts (dense tables, standard forms, prominent hero forms). Width is intentionally not part of this — every field is width:100% of whatever wrapper you place it in, so your layout controls that independently of size. If a specific consumer needs a height that doesn't match sm/md/lg exactly, that's what customCss is for (see the \"Overriding CSS With customCss\" section below) rather than the library adding more size variants for one-off requests.",
          code: `<!-- All four render at the exact same 34px height -->
<pui-lib-input      size="sm" label="Name"></pui-lib-input>
<pui-lib-select     size="sm" label="Country" [options]="opts"></pui-lib-select>
<pui-lib-combobox   size="sm" label="Contact method" [options]="opts"></pui-lib-combobox>
<pui-lib-password-input size="sm" label="Password"></pui-lib-password-input>

<!-- Default — all render at 44px when size is omitted -->
<pui-lib-input label="Name"></pui-lib-input>

<!-- Need a height none of the three sizes cover? Use customCss -->
<pui-lib-input
  size="md"
  label="Name"
  customCss=".pui-input-wrap { height: 46px; }">
</pui-lib-input>`,
          lang: 'html',
        },
        {
          q: 'If Shadow DOM blocks CSS, how do I customize the component design?',
          a: "CSS Custom Properties (variables) are the only thing that cross the Shadow DOM boundary by design. Override the library's token variables and every component that uses them updates automatically.",
          code: `/* Global brand change — affects ALL components */
:root {
  --pui-brand:     #7B2FBE;   /* changes teal → purple */
  --pui-radius-md: 0px;       /* makes corners square  */
}`,
          lang: 'css',
        },
        {
          q: 'Can I style just one specific component without affecting others?',
          a: "Yes. Set the CSS variable on the component's HTML element selector. It only applies to that component, not the rest of the library.",
          code: `/* Only the input field inside .my-form gets a gray background */
.my-form pui-lib-input {
  --pui-input-bg:     #F5F5F5;
  --pui-input-border: #AAAAAA;
}

/* Primary buttons in the sidebar get a different brand color */
.sidebar pui-lib-button {
  --pui-brand: #E55B2D;
}`,
          lang: 'css',
        },
        {
          q: 'What CSS variables are available to override?',
          a: 'All design tokens live in tokens.css. The most commonly overridden ones are listed below. Check the Getting Started page for the full list.',
          code: `/* Brand */
--pui-brand           /* primary accent color (teal by default)   */
--pui-brand-deep      /* darker shade used for hover states       */

/* Neutral palette */
--pui-gray-100  through  --pui-gray-900

/* Semantic */
--pui-success   --pui-error   --pui-warning   --pui-info

/* Shape */
--pui-radius-sm   --pui-radius-md   --pui-radius-lg

/* Typography */
--pui-font-family   --pui-text-sm   --pui-text-md   --pui-text-lg`,
          lang: 'css',
        },
        {
          q: 'Does the library support dark mode?',
          a: 'Yes. All components respond to the browser\'s prefers-color-scheme: dark media query automatically. You can also force dark mode by setting data-theme="dark" on any parent element.',
          code: `<!-- Force dark mode on a section -->
<div data-theme="dark">
  <pui-lib-card>This card renders in dark mode</pui-lib-card>
</div>`,
          lang: 'html',
        },
        {
          q: 'How do I change the brand color for my whole app?',
          a: 'Override --pui-brand and --pui-brand-deep on :root in your global stylesheet. Every teal accent across all components updates in one change.',
          code: `/* styles.css */
:root {
  --pui-brand:      #FF6B35;   /* your brand orange */
  --pui-brand-deep: #CC4A1A;   /* darker shade for hover */
}`,
          lang: 'css',
        },
        {
          q: "How do I override a library component's style (e.g. make the header taller) from my consumer app?",
          a: 'Every component uses ViewEncapsulation.ShadowDom — a real browser-level boundary. ::ng-deep, plain class selectors, and even !important cannot reach inside anymore (this used to be possible under the older Emulated encapsulation, but no longer works). The only supported way in is a CSS custom property. See the dedicated "Overriding Library Styles (Shadow DOM)" section below for the full explanation and examples.',
          code: `/* ❌ None of these reach inside the component anymore */
:host ::ng-deep .pui-header { height: 80px; }
.pui-header { height: 80px; }

/* ✅ Use the exposed CSS variable instead */
pui-lib-header { --pui-header-height: 80px; }`,
          lang: 'css',
        },
      ],
    },
    {
      title: 'Overriding Library Styles (Shadow DOM)',
      icon: '🛡️',
      open: false,
      items: [
        {
          q: "Can I override a component's internal CSS directly — a class selector, ::ng-deep, or !important?",
          a: "No, and this is intentional. Every component renders inside a real browser Shadow DOM boundary. No selector from your app's stylesheet — however specific, however many !important flags — can cross into it. This is what stops a global reset like * { color: red; background: aqua; } in a consumer app from bleeding into pui-lib-header or pui-lib-solifi-sidebar. Older advice that suggested :host ::ng-deep .pui-header { ... } no longer works; it was only ever valid under the previous Emulated encapsulation.",
          code: `/* Your app's global CSS — NONE of this reaches inside a component,
   not even with !important */
* { color: red !important; background: aqua !important; }
.pui-header { height: 80px; }
:host ::ng-deep .pui-header { height: 80px; }`,
          lang: 'css',
        },
        {
          q: 'So how do I actually restyle a component then?',
          a: "CSS custom properties (--pui-*) are the one thing designed to cross the Shadow DOM boundary. Set them on the component's own tag, on any ancestor, or on :root for a global change — the component reads the variable from outside and applies it internally.",
          code: `/* Change one instance only */
pui-lib-header {
  --pui-header-bg: #112C35;
  --pui-header-text: #ffffff;
}

/* Change every instance inside a section */
.admin-area pui-lib-solifi-sidebar {
  --ssb-active: #E55B2D;
}

/* Change it everywhere in the app */
:root {
  --pui-brand: #7B2FBE;
}`,
          lang: 'css',
        },
        {
          q: 'What if the thing I want to change has no CSS variable exposed?',
          a: 'Check the component\'s @Input() props first — several components (Header, Solifi Sidebar, App Shell) accept direct styling inputs such as bgColor, textColor, activeColor, or a full theme object, precisely so you don\'t need a CSS override at all. If neither a variable nor an input covers your case, use the customCss input — see the dedicated "Overriding CSS With customCss" section below.',
          code: `<!-- Styling via component inputs instead of CSS -->
<pui-lib-solifi-sidebar
  [theme]="{ bg: '#112C35', textColor: '#8fa3bc', activeColor: '#12C6A8' }">
</pui-lib-solifi-sidebar>`,
          lang: 'html',
        },
        {
          q: 'I have existing ::ng-deep overrides targeting pui-lib-* components from before we upgraded — will they still work?',
          a: 'No, and they will fail silently — no console error, the rule just never applies once the target is inside a Shadow root. Search your app for ::ng-deep rules that target pui-lib-* elements or any of their internal classes (.pui-header, .ssb, etc.) and replace each one with the matching --pui-* variable or a component @Input(). Do this deliberately after upgrading rather than discovering it as a visual regression.',
        },
      ],
    },
    {
      title: 'Overriding CSS With customCss',
      icon: '✏️',
      open: false,
      items: [
        {
          q: 'What is customCss and when should I use it instead of a --pui-* variable?',
          a: "customCss is an input available on pui-lib-* components. You pass it a raw CSS string, and the component injects it as a <style> tag inside its own shadow root — so it can target any internal class (.pui-ms-trigger, .pui-header, .ssb__item, etc.) with normal CSS, not just the specific properties a --pui-* variable happens to expose. Reach for a --pui-* variable first when one exists (it's documented, stable across versions, and usually all you need); reach for customCss when you need to change something no variable covers — layout, borders, spacing, a property combination, anything.\n\nThis does not reopen the original CSS-leak problem. The style tag is inserted by the component itself, from inside its own shadow root — your app's unrelated global CSS (e.g. * { color: red } in your global stylesheet) still cannot reach in from outside. customCss only ever affects the specific component instance you explicitly pass it to.",
          code: `<!-- Without customCss: no way to reach .pui-ms-trigger from outside -->
<pui-lib-multiselect [options]="options"></pui-lib-multiselect>

<!-- With customCss: targets the real internal class directly -->
<pui-lib-multiselect
  [options]="options"
  customCss=".pui-ms-trigger { min-height: 60px; }">
</pui-lib-multiselect>`,
          lang: 'html',
        },
        {
          q: 'How do I change a single CSS property with customCss?',
          a: "For one quick rule, pass the CSS directly as a plain string attribute — no component property needed. Find the internal class name from the component's source or by inspecting it in devtools (open the element's shadow root in the Elements panel).",
          code: `<pui-lib-menu
  [items]="items"
  customCss=".pui-menu-trigger { height: 48px; }">
</pui-lib-menu>`,
          lang: 'html',
        },
        {
          q: 'How do I change multiple CSS classes / rules at once?',
          a: 'Bind customCss to a component property instead of writing it inline, and use a template literal so you can lay out as many selectors and rules as you need in one string. It still compiles down to a single <style> tag inside the shadow root — write it exactly like a normal .scss file.',
          code: `<!-- your-page.component.html -->
<pui-lib-multiselect
  [options]="options"
  [customCss]="msCustomCss">
</pui-lib-multiselect>

// your-page.component.ts
export class YourPageComponent {
  msCustomCss = \`
    .pui-ms-trigger {
      min-height: 60px;
      border-radius: 12px;
    }
    .pui-ms-values {
      gap: 8px;
    }
    .pui-ms-panel {
      border: 2px solid #7B2FBE;
    }
  \`;
}`,
          lang: 'typescript',
        },
        {
          q: 'Can I make customCss respond to component state, like a hover or active class?',
          a: "Yes — since it's a normal Angular input, bind it to a getter or a computed property and it re-injects whenever the bound value changes, same as any other input.",
          code: `// Recompute the CSS string based on app state
get menuCustomCss(): string {
  return this.isDarkMode
    ? '.pui-menu-trigger { background: #1a1a1a; color: #fff; }'
    : '.pui-menu-trigger { background: #fff; color: #1a1a1a; }';
}`,
          lang: 'typescript',
        },
        {
          q: 'Which components support customCss right now?',
          a: "It is being rolled out across the library one component at a time, starting with Menu and Multi Select. If a component doesn't have it yet and you hit a styling wall a --pui-* variable can't solve, ask for it to be added — it's a one-line change per component (hostDirectives wiring a shared directive), not a rewrite.",
        },
      ],
    },
    {
      title: 'Components & Usage',
      icon: '🧩',
      open: false,
      items: [
        {
          q: 'How do I pass data to a component?',
          a: 'Simple values (strings, numbers, booleans) go as HTML attributes. Complex values (arrays, objects) must be set via JavaScript property binding — HTML attributes can only carry strings.',
          code: `<!-- String/boolean as attribute -->
<pui-lib-input label="Email" placeholder="you@example.com"></pui-lib-input>

<!-- Array must be a JS property (Angular binding) -->
<pui-lib-menu [items]="myMenuItems" trigger="Actions"></pui-lib-menu>

<!-- Plain HTML / React — set via JS -->
<pui-lib-menu id="m1" trigger="Actions"></pui-lib-menu>
<script>
  document.getElementById('m1').items = myMenuItems;
</script>`,
          lang: 'html',
        },
        {
          q: 'How do I listen to events from a component?',
          a: 'Components emit standard Custom Events. In Angular use (eventName) binding. In React/HTML use addEventListener.',
          code: `<!-- Angular -->
<pui-lib-menu [items]="items" (menuSelect)="onSelect($event)"></pui-lib-menu>

<!-- React -->
<pui-lib-menu ref={menuRef} trigger="Actions" />
useEffect(() => {
  menuRef.current.addEventListener('menuSelect', e => console.log(e.detail));
}, []);

<!-- Plain HTML -->
document.querySelector('pui-lib-menu')
  .addEventListener('menuSelect', e => console.log(e.detail));`,
          lang: 'html',
        },
        {
          q: 'How do I use form components with Angular Reactive Forms?',
          a: 'All form components implement ControlValueAccessor so they work with formControlName and ngModel out of the box — no extra wiring needed.',
          code: `// In your component
form = new FormGroup({
  email: new FormControl(''),
  role:  new FormControl(''),
});

// In template
<form [formGroup]="form">
  <pui-lib-input  formControlName="email" label="Email"></pui-lib-input>
  <pui-lib-select formControlName="role"  label="Role" [options]="roles"></pui-lib-select>
</form>`,
          lang: 'typescript',
        },
        {
          q: 'Can I use only some components without importing the whole library?',
          a: 'Yes — every component is tree-shakeable. Import only the components you use. Your bundler automatically removes the rest, so unused components add zero bytes to your bundle.',
          code: `// Only Button and Input are bundled — nothing else
import { PuiButtonComponent } from '@solifi/platform-ui';
import { PuiInputComponent  } from '@solifi/platform-ui';`,
          lang: 'typescript',
        },
        {
          q: 'How do I show a toast notification from anywhere in my app?',
          a: 'Place <pui-lib-toast-container> once in your root layout, then inject PuiToastService and call its methods from any component or service.',
          code: `// Root layout (once)
<pui-lib-toast-container></pui-lib-toast-container>

// Any component or service
import { PuiToastService } from '@solifi/platform-ui';

constructor(private toast: PuiToastService) {}

this.toast.success('Saved!');
this.toast.error('Something went wrong');
this.toast.info('3 items updated');`,
          lang: 'typescript',
        },
      ],
    },
    {
      title: 'Layout & App Shell',
      icon: '🧭',
      open: false,
      items: [
        {
          q: 'I use pui-lib-header and pui-lib-solifi-sidebar separately (not pui-lib-app-shell) — why does the header render full-width instead of sitting next to the sidebar?',
          a: 'pui-lib-header and pui-lib-solifi-sidebar are independent components with no shared layout wrapper between them, so without one the browser just stacks them as normal block elements — the header renders full-width, and the sidebar ends up below it on the left instead of beside it. pui-lib-app-shell exists to solve exactly this: internally it wraps both in a flex row so the sidebar and the rest of the page sit side by side. If you\'d rather not use App Shell, reproduce the same structure yourself with a two-level flex wrapper: an outer flex row (sidebar + "everything else"), and an inner flex column inside that second cell so the header stacks above the content instead of beside it.',
          code: `<div style="display:flex; height:100vh;">
  <pui-lib-solifi-sidebar ...></pui-lib-solifi-sidebar>  <!-- fixed width, full height -->

  <div style="flex:1; display:flex; flex-direction:column; min-width:0; overflow:hidden;">
    <pui-lib-header ...></pui-lib-header>                <!-- spans only the remaining width -->
    <main style="flex:1; overflow-y:auto;">
      <!-- your page content -->
    </main>
  </div>
</div>`,
          lang: 'html',
        },
      ],
    },
    {
      title: 'Accessibility',
      icon: '♿',
      open: false,
      items: [
        {
          q: 'Are the components accessible (ARIA)?',
          a: 'Yes. All interactive components ship with correct ARIA roles, labels, and keyboard support built in. Buttons are focusable, modals trap focus, menus respond to arrow keys and Escape, form inputs label themselves correctly.',
        },
        {
          q: 'Do I need to add aria-label to every component?',
          a: 'Not usually. Components infer their accessible label from the label input or inner content. You only need an explicit aria-label when the component has no visible text — for example, an icon-only button.',
          code: `<!-- Label comes from [label] input — no extra aria needed -->
<pui-lib-input label="Email address"></pui-lib-input>

<!-- Icon-only button — add aria-label -->
<pui-lib-button aria-label="Close dialog" variant="ghost">
  <pui-lib-icon name="x"></pui-lib-icon>
</pui-lib-button>`,
          lang: 'html',
        },
        {
          q: 'Is keyboard navigation supported?',
          a: 'Yes. Tab moves focus between interactive elements. Enter/Space activates buttons. Arrow keys navigate inside menus, selects, and tabs. Escape closes modals, dropdowns, and menus.',
        },
      ],
    },
    {
      title: 'TypeScript & Types',
      icon: '🔷',
      open: false,
      items: [
        {
          q: 'Does the library ship TypeScript types?',
          a: "Yes. Full TypeScript definitions are included for every component's inputs, outputs, models, and service methods. Autocomplete works out of the box in VS Code and JetBrains IDEs.",
        },
        {
          q: 'How do I type the data models like MenuItem or SelectOption?',
          a: 'Import the model interfaces directly from the package. They are exported alongside the components.',
          code: `import { MenuItem, SelectOption, FormSize } from '@solifi/platform-ui';

const items: MenuItem[] = [
  { id: '1', label: 'Edit',   icon: 'pencil' },
  { id: '2', label: 'Delete', icon: 'trash',  danger: true },
];`,
          lang: 'typescript',
        },
      ],
    },
    {
      title: 'Performance & Bundle Size',
      icon: '⚡',
      open: false,
      items: [
        {
          q: 'How large is the library bundle?',
          a: 'Each component is independently bundled and tree-shaken. If you import only Button and Input, only those two components are included in your final bundle. The full library (all components, styles, and services) is approximately 120 KB gzipped.',
        },
        {
          q: "Do the components affect my app's rendering performance?",
          a: 'All components use OnPush change detection — they only re-render when their inputs actually change. Shadow DOM also prevents layout thrashing from style recalculations outside the component.',
        },
        {
          q: "Can I lazy-load components so they don't block the initial page load?",
          a: 'In Angular, you can lazy-load pages that use the components via the router. The components themselves are loaded only when that route is visited.',
          code: `// Routes — menu-page (and pui-lib-menu) loads only when user visits /menu
{
  path: 'menu',
  loadComponent: () =>
    import('./pages/menu-page/menu-page.component')
      .then(m => m.MenuPageComponent)
}`,
          lang: 'typescript',
        },
      ],
    },
    {
      title: 'Framework Compatibility',
      icon: '🔗',
      open: false,
      items: [
        {
          q: 'Which Angular versions are supported?',
          a: 'Angular 15 and above. The library uses standalone components and the Inject function, both of which require Angular 14+. Angular 17+ with the new control flow syntax (@if, @for) is fully supported.',
        },
        {
          q: 'Does it work with server-side rendering (SSR / Angular Universal)?',
          a: "Components that rely on browser APIs (Shadow DOM, ResizeObserver) skip those APIs on the server and render a static shell. SSR is safe — no client-only crash. Hydration is handled by Angular's built-in mechanism.",
        },
        {
          q: 'Can I use Platform UI alongside another component library (e.g. Angular Material, PrimeNG)?',
          a: 'Yes. Because every Platform UI component is isolated in its own Shadow DOM, there is zero CSS conflict between libraries. They coexist on the same page without any special configuration.',
        },
        {
          q: 'Does it support Right-to-Left (RTL) layouts?',
          a: 'Set dir="rtl" on your <html> or on a parent container. Components read the direction from the document and flip logical CSS properties (padding-inline, margin-inline, text-align) automatically.',
          code: `<html dir="rtl" lang="ar">
  <!-- All pui components render in RTL automatically -->
</html>`,
          lang: 'html',
        },
      ],
    },
    {
      title: 'Versioning & Updates',
      icon: '🔄',
      open: false,
      items: [
        {
          q: 'How do I update to a newer version?',
          a: 'Run the npm update command. The library follows Semantic Versioning — patch and minor updates are safe to apply. Major versions list breaking changes in the changelog.',
          code: `npm update @solifi/platform-ui

# Or pin to a specific version
npm install @solifi/platform-ui@1.4.0`,
          lang: 'bash',
        },
        {
          q: 'Will a new version break my CSS variable overrides?',
          a: 'Token names are considered public API and are kept stable across minor and patch releases. Token names only change in major versions, and any renames are listed in the migration guide.',
        },
        {
          q: 'How do I know what changed between versions?',
          a: 'Check the CHANGELOG.md in the repository. Each release lists new components, changed inputs/outputs, deprecated APIs, and migration steps for breaking changes.',
        },
      ],
    },
    {
      title: 'Local Development & Testing',
      icon: '🔧',
      open: false,
      items: [
        {
          q: 'How do I run the library locally and see my changes in the React demo app?',
          a: 'Two steps total. First, install the React demo app dependencies once (you never need to do this again). Second, every time you change the library, run build:full from the platform-ui root — it rebuilds everything and copies the output into the demo app automatically. Then hard-refresh the browser.',
          code: `# ── ONE-TIME SETUP (do this once only) ──────────────────
cd demo/my-react-app
npm install        # installs React, Vite etc into the demo app's node_modules

# Start the React dev server (keep this running)
npm run dev        # → http://localhost:5173

# ── EVERY TIME YOU CHANGE THE LIBRARY ────────────────────
# (open a second terminal, stay in platform-ui root)
npm run build:full
# Then hard-refresh the browser: Ctrl + Shift + R`,
          lang: 'bash',
        },
        {
          q: 'What does build:full do exactly?',
          a: 'It runs four steps automatically in order. You never need to copy files manually.',
          code: `npm run build:full
# Step 1 — builds the Angular component library  → dist/platform-ui/
# Step 2 — builds the Angular Elements bundle     → dist/elements/pui-elements.js
# Step 3 — copies the bundle into dist/platform-ui/elements/
# Step 4 — copies pui-elements.js, tokens.css, and theme-new.css
#           into demo/my-react-app/public/
#           so Vite serves them as /pui-elements.js, /tokens.css, /themes/theme-new.css`,
          lang: 'bash',
        },
        {
          q: 'Why do the CSS and the elements bundle load from public/ instead of being imported in JS?',
          a: 'The Angular Elements bundle (pui-elements.js) is built by Webpack in a chunked format that cannot be imported as an ES module — it must be a plain <script> tag. The CSS tokens are plain files that are not part of the npm package output, so they are served as static assets instead. Both are declared in index.html so they load before React starts.',
          code: `<!-- demo/my-react-app/index.html -->
<link rel="stylesheet" href="/tokens.css" />
<link rel="stylesheet" href="/themes/theme-new.css" />
<script src="/pui-elements.js"></script>   <!-- must be before the React module -->
<script type="module" src="/src/main.jsx"></script>`,
          lang: 'html',
        },
        {
          q: 'How do I set up an Angular consumer app to use the local dist build?',
          a: 'Add a paths mapping in tsconfig.json so the TypeScript compiler and Angular CLI resolve the package name to your local dist folder instead of node_modules.',
          code: `// tsconfig.json  (in your Angular consumer app)
{
  "compilerOptions": {
    "paths": {
      "@bhairab-patra/platform-ui": ["../../dist/platform-ui"],
      "@bhairab-patra/platform-ui/*": ["../../dist/platform-ui/*"]
    }
  }
}

// Also tell Angular CLI — angular.json → your-app → architect → build → options:
"preserveSymlinks": true`,
          lang: 'json',
        },
        {
          q: 'Do I need to restart the React dev server after rebuilding the library?',
          a: 'No. Keep npm run dev running. After npm run build:full finishes, do a hard refresh in the browser (Ctrl+Shift+R). The dev server stays running — only a browser refresh is needed.',
        },
        {
          q: 'How do I see library changes dynamically without running build:full every time?',
          a: 'Run the library in watch mode in one terminal and the React dev server in another. Angular rebuilds the library automatically on every file save. You only need to hard-refresh the browser — no build:full, no npm install, no server restart.',
          code: `# Terminal 1 — library watch mode (from platform-ui root)
# Automatically rebuilds dist/platform-ui whenever you save a library file
npm run build:watch

# Terminal 2 — React dev server (from demo/my-react-app)
npm run dev

# Workflow:
# 1. Edit any component file in projects/platform-ui/src/lib/
# 2. Wait ~3-5 seconds for Angular to rebuild (watch terminal shows "Build complete")
# 3. Hard-refresh browser: Ctrl + Shift + R
# → Your change is live in the React app`,
          lang: 'bash',
        },
        {
          q: 'What is the difference between build:watch and build:full in the dev workflow?',
          a: 'build:watch rebuilds only the Angular component library and is fast (~3-5 seconds). It does not rebuild the Elements bundle (pui-elements.js). Use it for everyday component changes. build:full rebuilds everything including the Elements bundle and re-copies all files to public/ — use it only when you register a new component in the elements bundle or change CSS tokens.',
          code: `# Use build:watch for → component TS, HTML, SCSS changes
npm run build:watch   # fast, ~3-5 sec, auto on every save

# Use build:full for → new component added, tokens.css changed
npm run build:full    # slow, ~30-60 sec, run manually`,
          lang: 'bash',
        },
      ],
    },
    {
      title: 'Testing a Local Library Build in a Consumer App (No npm link)',
      icon: '📦',
      open: false,
      items: [
        {
          q: 'I used npm link to test a local build and my consumer app crashed with "NG0203: The ElementRef token injection failed" — why? It worked before.',
          a: "It worked before because you were installing the library normally (from npm, or as a plain copy) — that always resolves a single, shared copy of @angular/core. npm link does not preserve that. A linked package is a symlink, and its real path lives inside the library repo's own folder — which has its own node_modules with its own @angular/core (needed to build/serve the library repo itself). When your consumer app loads the linked package, its code resolves @angular/core from that repo's node_modules instead of your app's, so two separate, disconnected copies of Angular end up loaded on the same page. Angular's dependency injection relies on shared module-level state inside @angular/core to track \"what's currently being constructed\" — with two copies, the app's rendering engine sets that state in one copy while the library's code reads it from the other, finds nothing, and throws NG0203. This is not something a library code change can fix — it happens the same way regardless of how the library's own components request their dependencies. It is specific to how npm link works, and it reappears every single time you link this library into any consumer app.",
        },
        {
          q: 'What should I do instead of npm link to test a local build?',
          a: "Build the library, pack it into a real npm tarball, then install that tarball in the consumer app exactly like any other dependency. This produces a real, physical copy inside the consumer app's node_modules — not a symlink — so there is only ever one copy of @angular/core in play, the same as installing the published package from the npm registry.",
          code: `# ── Library side (from the platform-ui repo root) ───────────────
npx ng build platform-ui --configuration production
cd dist/platform-ui
npm pack
# → creates bhairab-patra-platform-ui-<version>.tgz in this folder

# ── Consumer app side ────────────────────────────────────────────
npm install <absolute-path-to-the-.tgz-file>
# e.g. npm install "C:/JAVA_MS_2027/PLATFORM/ANGULR_ARCH/platform-ui/dist/platform-ui/bhairab-patra-platform-ui-1.1.13.tgz"`,
          lang: 'bash',
        },
        {
          q: 'How do I pick up a newer local build after I make more changes to the library?',
          a: 'Repeat the same three build-side commands to produce a fresh tarball, then re-run npm install in the consumer app pointing at that new .tgz file. A running dev server does not notice a node_modules change on its own, so restart it (stop and re-run ng serve / npm start) afterward.',
          code: `# Every time you change the library and want to test it locally:
npx ng build platform-ui --configuration production
cd dist/platform-ui && npm pack

# then in the consumer app
npm install <path-to-the-new-tgz>

# restart the dev server so it re-reads node_modules
# (Ctrl+C, then ng serve / npm start again)`,
          lang: 'bash',
        },
        {
          q: 'Should I ever use npm link for this library?',
          a: 'Avoid it. It reintroduces the exact NG0203 crash described above, every time, in any consumer app, independent of anything in the library\'s code — the "Linking Two Apps Locally (npm link / symlink)" section further down documents a preserveSymlinks-based workaround for those who specifically need instant live-reload without repacking, but treat that as an advanced, more fragile fallback, not the default. The tarball method above is simpler, has no known failure mode, and behaves identically to what happens once the package is actually published — so there is nothing to reconfigure or undo later when you move from local testing to a real release.',
        },
      ],
    },
    {
      title: 'Linking Two Apps Locally (npm link / symlink)',
      icon: '🧷',
      open: false,
      items: [
        {
          q: 'How do I develop the library and a consumer Angular app side by side, with changes showing up live?',
          a: "Symlink the package inside the consumer app's node_modules to point at the library's dist folder, then run both projects at once: the library in watch mode in one terminal, the consumer app's dev server in another. Every library change rebuilds automatically and the consumer app picks it up on its next request — no publish, no reinstall.",
          code: `# One-time: link the package (from the consumer app's node_modules/@bhairab-patra)
# Windows example — mklink /D creates a directory symlink
mklink /D node_modules\\@bhairab-patra\\platform-ui ..\\..\\ANGULR_ARCH\\platform-ui\\dist\\platform-ui

# Or, equivalently: npm link
cd platform-ui && npm link
cd ../your-consumer-app && npm link @bhairab-patra/platform-ui

# Terminal 1 — from platform-ui root, rebuilds dist/ on every save
npm run build:watch

# Terminal 2 — from your consumer app root
ng serve`,
          lang: 'bash',
        },
        {
          q: 'My consumer app crashes on startup with "NG0203: The ElementRef token injection failed" — what causes this?',
          a: "This happens specifically with a symlinked/linked package, never with a normal npm install. Because the symlink's real path lives inside the library repo's own folder, the bundler resolves @angular/core from the library repo's node_modules instead of your app's — two separate copies of Angular end up loaded on the same page, and dependency injection breaks for some components. The fix is a single flag in your consumer app's angular.json.",
          code: `// angular.json — your-app → architect → build → options
{
  "options": {
    "preserveSymlinks": true
  }
}

// After adding it, clear caches and restart so the fix takes effect:
// rm -rf .angular/cache
// ng serve`,
          lang: 'json',
        },
        {
          q: 'Do I need preserveSymlinks for a normal production consumer app too?',
          a: 'No. This is only relevant when the package comes from a symlink — local npm link, a manually created symlink, or a pnpm/yarn workspace in monorepo mode. An app that installs the library normally from a registry (npm install @bhairab-patra/platform-ui) resolves @angular/core normally and never hits this issue, so no extra angular.json configuration is needed.',
        },
        {
          q: 'I added preserveSymlinks but still see the error or stale behavior — what else should I check?',
          a: 'Clear both projects\' caches, not just the consumer app\'s: rm -rf .angular/cache and dist/platform-ui on the library side, then rebuild; rm -rf .angular/cache on the consumer app side, then restart ng serve. Vite pre-bundles the linked package the first time it sees it — a stale pre-bundle from before the fix (or before a library rebuild) is a common cause of "I already added the flag but nothing changed."',
          code: `# Library side (from platform-ui root)
rm -rf .angular/cache dist/platform-ui
npm run build:local

# Consumer app side
rm -rf .angular/cache
ng serve`,
          lang: 'bash',
        },
      ],
    },
    {
      title: 'Troubleshooting',
      icon: '🛠️',
      open: false,
      items: [
        {
          q: "My component renders but has no styles — what's wrong?",
          a: 'You most likely forgot to import the tokens CSS file in your global stylesheet. The components use CSS variables that are defined in tokens.css. Without it, all the variables fall back to empty and the component looks unstyled.',
          code: `/* styles.css — add these two lines */
@import '@solifi/platform-ui/styles/tokens.css';
@import '@solifi/platform-ui/styles/themes/theme-new.css';`,
          lang: 'css',
        },
        {
          q: 'My Angular form shows "No value accessor" error — how do I fix it?',
          a: "This means the form component is not imported in your component's imports array. Add the specific component class to the imports of the Angular component using it.",
          code: `// ❌ Missing import — causes "No value accessor" error
@Component({ standalone: true, imports: [] })

// ✅ Import the form component
import { PuiInputComponent } from '@solifi/platform-ui';

@Component({
  standalone: true,
  imports: [PuiInputComponent, ReactiveFormsModule]
})`,
          lang: 'typescript',
        },
        {
          q: 'My CSS variable override is not working inside the component — why?',
          a: "You may be trying to override using a class selector that targets the component's internal DOM — which Shadow DOM blocks. Set the variable on the component element itself (or any ancestor), not on an internal class.",
          code: `/* ❌ Wrong — .pui-input is inside shadow root, blocked */
.pui-input { --pui-input-bg: red; }

/* ✅ Correct — set on the host element */
pui-lib-input { --pui-input-bg: #F5F5F5; }

/* ✅ Also correct — any ancestor works */
.my-form { --pui-input-bg: #F5F5F5; }`,
          lang: 'css',
        },
        {
          q: 'The component works in Angular but not in React — items array is empty?',
          a: "In React (and plain HTML), object/array inputs must be set as JavaScript properties, not HTML attributes. HTML attributes are always strings — React's JSX does not auto-convert arrays.",
          code: `// ❌ Wrong — this passes the string "[object Object]"
<pui-lib-menu items={menuItems} />

// ✅ Correct — use a ref to set it as a JS property
const ref = useRef(null);
useEffect(() => { ref.current.items = menuItems; }, [menuItems]);
<pui-lib-menu ref={ref} trigger="Actions" />`,
          lang: 'tsx',
        },
      ],
    },
  ];

  toggle(section: FaqSection): void {
    section.open = !section.open;
  }

  trackByTitle(_: number, s: FaqSection): string {
    return s.title;
  }
  trackByQ(_: number, item: FaqItem): string {
    return item.q;
  }
}
