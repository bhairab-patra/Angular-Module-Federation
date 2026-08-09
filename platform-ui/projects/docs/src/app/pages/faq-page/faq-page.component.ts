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
          a: 'Install the npm package, then import the tokens CSS once in your global stylesheet. That\'s all the setup you need — no module registration required.',
          code: `npm install @solifi/platform-ui

# In your global CSS (styles.css / styles.scss):
@import '@solifi/platform-ui/styles/tokens.css';
@import '@solifi/platform-ui/styles/themes/theme-new.css';`,
          lang: 'bash',
        },
        {
          q: 'Do I need to import a module or register anything in Angular?',
          a: 'No NgModule required. Every component is standalone. Just import the component class directly in your Angular component\'s imports array.',
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
          q: 'If Shadow DOM blocks CSS, how do I customize the component design?',
          a: 'CSS Custom Properties (variables) are the only thing that cross the Shadow DOM boundary by design. Override the library\'s token variables and every component that uses them updates automatically.',
          code: `/* Global brand change — affects ALL components */
:root {
  --pui-brand:     #7B2FBE;   /* changes teal → purple */
  --pui-radius-md: 0px;       /* makes corners square  */
}`,
          lang: 'css',
        },
        {
          q: 'Can I style just one specific component without affecting others?',
          a: 'Yes. Set the CSS variable on the component\'s HTML element selector. It only applies to that component, not the rest of the library.',
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
          a: 'Yes. Full TypeScript definitions are included for every component\'s inputs, outputs, models, and service methods. Autocomplete works out of the box in VS Code and JetBrains IDEs.',
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
          q: 'Do the components affect my app\'s rendering performance?',
          a: 'All components use OnPush change detection — they only re-render when their inputs actually change. Shadow DOM also prevents layout thrashing from style recalculations outside the component.',
        },
        {
          q: 'Can I lazy-load components so they don\'t block the initial page load?',
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
          a: 'Components that rely on browser APIs (Shadow DOM, ResizeObserver) skip those APIs on the server and render a static shell. SSR is safe — no client-only crash. Hydration is handled by Angular\'s built-in mechanism.',
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
      title: 'Troubleshooting',
      icon: '🛠️',
      open: false,
      items: [
        {
          q: 'My component renders but has no styles — what\'s wrong?',
          a: 'You most likely forgot to import the tokens CSS file in your global stylesheet. The components use CSS variables that are defined in tokens.css. Without it, all the variables fall back to empty and the component looks unstyled.',
          code: `/* styles.css — add these two lines */
@import '@solifi/platform-ui/styles/tokens.css';
@import '@solifi/platform-ui/styles/themes/theme-new.css';`,
          lang: 'css',
        },
        {
          q: 'My Angular form shows "No value accessor" error — how do I fix it?',
          a: 'This means the form component is not imported in your component\'s imports array. Add the specific component class to the imports of the Angular component using it.',
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
          a: 'You may be trying to override using a class selector that targets the component\'s internal DOM — which Shadow DOM blocks. Set the variable on the component element itself (or any ancestor), not on an internal class.',
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
          a: 'In React (and plain HTML), object/array inputs must be set as JavaScript properties, not HTML attributes. HTML attributes are always strings — React\'s JSX does not auto-convert arrays.',
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

  trackByTitle(_: number, s: FaqSection): string { return s.title; }
  trackByQ(_: number, item: FaqItem): string { return item.q; }
}
