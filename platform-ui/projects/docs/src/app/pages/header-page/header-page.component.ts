import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HeaderComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

type FwTab = 'angular' | 'react' | 'html';

@Component({
  selector: 'docs-header-page',
  standalone: true,
  imports: [DocPageComponent, HeaderComponent, NgIf, NgFor, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss'],
})
export class HeaderPageComponent {

  lastAction = '';
  fw: FwTab  = 'angular';
  copied     = '';

  doCopy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      setTimeout(() => { this.copied = ''; }, 2000);
    });
  }

  onAction(action: string) { this.lastAction = action; }

  uatBadge  = { text: 'UAT',  color: '#f59e0b', textColor: '#fff' };
  prodBadge = { text: 'PROD', color: '#ef4444', textColor: '#fff' };

  navLinks = [
    { label: 'Dashboard', href: '#', active: true },
    { label: 'Users',     href: '#' },
    { label: 'Reports',   href: '#' },
  ];

  menuItems = [
    { label: 'Sign out', action: 'signout', danger: true,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>` },
  ];

  fullMenuItems = [
    { label: 'Profile',  action: 'profile',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
    { label: 'Settings', action: 'settings',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>` },
    { label: 'Sign out', action: 'signout', danger: true,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>` },
  ];

  // ── Code snippets ──────────────────────────────────────────────────────

  angularTemplate = `<!-- Angular — use binding syntax as any Angular component -->
<pui-header
  appTitle="Admin Portal"
  appSubtitle="PLATFORM MANAGEMENT"
  bgColor="#12C6A8"
  logoUrl="/assets/logo.png"
  [badge]="{ text: 'UAT', color: '#f59e0b' }"
  [showHelp]="true"
  userName="Bhairab Patra"
  userEmail="bpatra@solifi.com"
  greeting="Hi"
  userSubtext="Welcome back!"
  [menuItems]="menuItems"
  (menuAction)="onMenuAction($event)"
  (helpClick)="onHelp()">
</pui-header>`;

  angularTs = `import { HeaderComponent } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [HeaderComponent],
})
export class MyComponent {
  menuItems = [
    { label: 'Profile',  action: 'profile'  },
    { label: 'Settings', action: 'settings' },
    { label: 'Sign out', action: 'signout', danger: true },
  ];

  onMenuAction(action: string) {
    if (action === 'signout') { /* handle */ }
  }
}`;

  reactCode = `import { useRef, useEffect } from 'react';
// Import once in main.tsx: import '@bhairab-patra/platform-ui/elements';

export function MyHeader() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Arrays → JS property (cannot be serialised as an attribute)
    el.menuItems = [
      { label: 'Profile',  action: 'profile'  },
      { label: 'Settings', action: 'settings' },
      { label: 'Sign out', action: 'signout', danger: true },
    ];

    // Events → addEventListener (CustomEvent, detail = action string)
    const onAction = (e) => console.log('action:', e.detail);
    el.addEventListener('menuAction', onAction);
    el.addEventListener('helpClick', () => console.log('help'));
    return () => el.removeEventListener('menuAction', onAction);
  }, []);

  return (
    <pui-header
      ref={ref}
      app-title="Admin Portal"
      app-subtitle="PLATFORM MANAGEMENT"
      bg-color="#12C6A8"
      logo-url="/assets/logo.png"
      badge='{"text":"UAT","color":"#f59e0b"}'
      show-help="true"
      user-name="Bhairab Patra"
      user-email="bpatra@solifi.com"
      greeting="Hi"
      user-subtext="Welcome back!"
    />
  );
}`;

  htmlCode = `<!-- 1. Load bundle once -->
<script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>
<link rel="stylesheet" href="node_modules/@bhairab-patra/platform-ui/elements/styles.css">

<!-- 2. Declare the element — strings/booleans as plain attributes -->
<pui-header
  id="hdr"
  app-title="Admin Portal"
  app-subtitle="PLATFORM MANAGEMENT"
  bg-color="#12C6A8"
  logo-url="/assets/logo.png"
  badge='{"text":"UAT","color":"#f59e0b"}'
  show-help="true"
  user-name="Bhairab Patra"
  user-email="bpatra@solifi.com"
  greeting="Hi"
  user-subtext="Welcome back!">
</pui-header>

<!-- 3. Arrays and events via JavaScript -->
<script>
  customElements.whenDefined('pui-header').then(() => {
    const hdr = document.getElementById('hdr');

    hdr.menuItems = [
      { label: 'Profile',  action: 'profile'  },
      { label: 'Settings', action: 'settings' },
      { label: 'Sign out', action: 'signout', danger: true },
    ];

    hdr.addEventListener('menuAction', (e) => {
      if (e.detail === 'signout') location.href = '/logout';
    });
  });
</script>`;

  // ── API table ──────────────────────────────────────────────────────────

  api: ApiRow[] = [
    { input: 'appTitle',        type: 'string',                 default: `'My App'`,        description: 'Primary brand / product name shown in the header' },
    { input: 'appSubtitle',     type: 'string',                 default: `''`,              description: 'Sub-label below the title (e.g. "PLATFORM MANAGEMENT")' },
    { input: 'logoUrl',         type: 'string',                 default: `''`,              description: 'URL of a logo image shown left of the title' },
    { input: 'logoText',        type: 'string',                 default: `''`,              description: 'Short text / emoji before the title (no image)' },
    { input: 'bgColor',         type: 'string',                 default: `'#12C6A8'`,       description: 'Header background colour — any valid CSS colour' },
    { input: 'textColor',       type: 'string',                 default: `'#ffffff'`,       description: 'Text and icon colour' },
    { input: 'badge',           type: 'HeaderBadge | string',   default: 'null',            description: '{ text, color, textColor? } or JSON string — environment badge' },
    { input: 'showHelp',        type: 'boolean | string',       default: 'false',           description: 'Show the help (?) button — accepts true / "true"' },
    { input: 'navLinks',        type: 'NavLink[] | string',     default: '[]',              description: '{ label, href, active? }[] or JSON string — nav links' },
    { input: 'userName',        type: 'string',                 default: `''`,              description: 'Full name of signed-in user — activates the user area' },
    { input: 'userEmail',       type: 'string',                 default: `''`,              description: 'Email shown in the dropdown header' },
    { input: 'greeting',        type: 'string',                 default: `'Hi'`,            description: 'Greeting prefix — set empty to hide' },
    { input: 'userSubtext',     type: 'string',                 default: `'Welcome back!'`, description: 'Small line below the greeting' },
    { input: 'avatarUrl',       type: 'string',                 default: `''`,              description: 'Avatar image URL — falls back to initials when blank' },
    { input: 'avatarColor',     type: 'string',                 default: `'#0d6e5f'`,       description: 'Avatar background colour' },
    { input: 'avatarTextColor', type: 'string',                 default: `'#ffffff'`,       description: 'Avatar initials colour' },
    { input: 'menuItems',       type: 'UserMenuItem[] | string',default: '[Sign out]',      description: '{ label, action, icon?, danger? }[] — user dropdown items' },
    { input: 'menuAction',      type: 'EventEmitter<string>',   default: '—',               description: 'Output — emits item.action string when a menu item is clicked' },
    { input: 'helpClick',       type: 'EventEmitter<void>',     default: '—',               description: 'Output — emits when the help (?) button is clicked' },
  ];

  // ── Cross-framework quick-ref ──────────────────────────────────────────

  xfwRows = [
    { name: 'appTitle',   angular: 'appTitle="..."',            attr: 'app-title="..."',         js: 'el.appTitle = "..."' },
    { name: 'bgColor',    angular: 'bgColor="#12C6A8"',         attr: 'bg-color="#12C6A8"',      js: 'el.bgColor = "#12C6A8"' },
    { name: 'logoUrl',    angular: 'logoUrl="/logo.png"',       attr: 'logo-url="/logo.png"',    js: 'el.logoUrl = "/logo.png"' },
    { name: 'badge',      angular: '[badge]="badgeObj"',        attr: 'badge=\'{"text":"UAT"}\'',js: 'el.badge = { text: "UAT" }' },
    { name: 'showHelp',   angular: '[showHelp]="true"',         attr: 'show-help="true"',        js: 'el.showHelp = true' },
    { name: 'navLinks',   angular: '[navLinks]="links"',        attr: 'nav-links=\'[...]\'',     js: 'el.navLinks = [...]' },
    { name: 'menuItems',  angular: '[menuItems]="items"',       attr: '— use JS property',       js: 'el.menuItems = [...]' },
    { name: 'menuAction', angular: '(menuAction)="fn($event)"', attr: '— use addEventListener',  js: 'el.addEventListener("menuAction", fn)' },
    { name: 'helpClick',  angular: '(helpClick)="fn()"',        attr: '— use addEventListener',  js: 'el.addEventListener("helpClick", fn)' },
  ];
}
