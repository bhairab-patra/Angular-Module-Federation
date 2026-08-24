import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HeaderComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-header-page',
  standalone: true,
  imports: [DocPageComponent, HeaderComponent, NgIf, NgFor, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss'],
})
export class HeaderPageComponent {

  lastAction = '';
  lastQuery = '';
  copied = '';

  demoShowLogo = true;
  demoShowHeading = true;
  demoShowSearch = true;
  demoAvatarMode: 'off' | 'plain' | 'menu' = 'menu';
  demoShowHamburger = false;
  demoSidebarOpen = false;

  onHamburgerToggle(): void { this.demoSidebarOpen = !this.demoSidebarOpen; }

  onSearchQuery(q: string): void { this.lastQuery = q; }

  get angularCode(): string { return `${this.angularTemplate}\n\n// component.ts\n${this.angularTs}`; }

  doCopy(text: string, id: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      setTimeout(() => { this.copied = ''; }, 2000);
    });
  }

  onAction(action: string): void { this.lastAction = action; }

  trackByIndex(_i: number): number { return _i; }

  uatBadge = { text: 'UAT', color: '#f59e0b', textColor: '#fff' };

  navLinks = [
    { label: 'Dashboard', href: '#', active: true },
    { label: 'Users', href: '#' },
    { label: 'Reports', href: '#' },
  ];

  menuItems = [
    {
      label: 'Profile', action: 'profile',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
    },
    {
      label: 'Order Settings', action: 'order-settings',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`
    },
    {
      label: 'Sign out', action: 'signout', danger: true,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>`
    },
  ];

  // ── Code snippets ──────────────────────────────────────────────────────

  angularTemplate = `<!-- Angular — use binding syntax as any Angular component -->
<!-- bgColor/textColor reference the theme tokens so the header follows
     the New/Old theme toggle: old = #12C6A8 teal, new = #D8D1C8 tan -->
<pui-lib-header
  appTitle="Uptown Trucking Leasing"
  appSubtitle="Digital Experience Portal"
  bgColor="var(--pui-header-bg)"
  textColor="var(--pui-header-text)"
  logoUrl="/assets/logo-full.png"
  [showLogo]="true"
  [showSearch]="true"
  userName="Marcus Reed"
  userEmail="marcus@uptowntrucking.com"
  avatarColor="var(--pui-form-accent)"
  avatarTextColor="var(--pui-accent-ink)"
  [menuItems]="menuItems"
  (menuAction)="onMenuAction($event)"
  (searchQuery)="onSearchQuery($event)">
</pui-lib-header>`;

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

  // Search expands inline in the header automatically — you just react to typing.
  onSearchQuery(q: string) {
    this.results = this.allItems.filter(i => i.includes(q));
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
    // Search expands inline in the header automatically — just react to typing
    el.addEventListener('searchQuery', (e) => console.log('query:', e.detail));
    return () => el.removeEventListener('menuAction', onAction);
  }, []);

  // bg-color/text-color reference the theme tokens so the header follows
  // the New/Old theme toggle: old = #12C6A8 teal, new = #D8D1C8 tan
  return (
    <pui-lib-header
      ref={ref}
      app-title="Uptown Trucking Leasing"
      app-subtitle="Digital Experience Portal"
      bg-color="var(--pui-header-bg)"
      text-color="var(--pui-header-text)"
      logo-url="/assets/logo-full.png"
      show-logo="true"
      show-search="true"
      user-name="Marcus Reed"
      user-email="marcus@uptowntrucking.com"
      avatar-color="var(--pui-form-accent)"
      avatar-text-color="var(--pui-accent-ink)"
    />
  );
}`;

  htmlCode = `<!-- 1. Load bundle once -->
<script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>
<link rel="stylesheet" href="node_modules/@bhairab-patra/platform-ui/elements/styles.css">

<!-- 2. Declare the element — strings/booleans as plain attributes.
     bg-color/text-color reference the theme tokens so the header follows
     the New/Old theme toggle: old = #12C6A8 teal, new = #D8D1C8 tan -->
<pui-lib-header
  id="hdr"
  app-title="Uptown Trucking Leasing"
  app-subtitle="Digital Experience Portal"
  bg-color="var(--pui-header-bg)"
  text-color="var(--pui-header-text)"
  logo-url="/assets/logo-full.png"
  show-logo="true"
  show-search="true"
  user-name="Marcus Reed"
  user-email="marcus@uptowntrucking.com"
  avatar-color="var(--pui-form-accent)"
  avatar-text-color="var(--pui-accent-ink)">
</pui-lib-header>

<!-- 3. Arrays and events via JavaScript -->
<script>
  customElements.whenDefined('pui-lib-header').then(() => {
    const hdr = document.getElementById('hdr');

    hdr.menuItems = [
      { label: 'Profile',  action: 'profile'  },
      { label: 'Settings', action: 'settings' },
      { label: 'Sign out', action: 'signout', danger: true },
    ];

    hdr.addEventListener('menuAction', (e) => {
      if (e.detail === 'signout') location.href = '/logout';
    });

    // Search expands inline in the header automatically — just react to typing
    hdr.addEventListener('searchQuery', (e) => {
      console.log('query:', e.detail);
    });
  });
</script>`;

  // ── API table ──────────────────────────────────────────────────────────

  api: ApiRow[] = [
    { input: 'appTitle', type: 'string', default: `'My App'`, description: 'Primary brand / product name shown in the header' },
    { input: 'appSubtitle', type: 'string', default: `''`, description: 'Sub-label below the title (e.g. "PLATFORM MANAGEMENT")' },
    { input: 'logoUrl', type: 'string', default: `''`, description: 'URL of a logo image shown left of the title' },
    { input: 'logoText', type: 'string', default: `''`, description: 'Short text / emoji before the title (no image)' },
    { input: 'showLogo', type: 'boolean | string', default: 'true', description: 'Section 1 — show/hide the logo image and [logo] content-projection slot — accepts true / false / "true" / "false"' },
    { input: 'showHeading', type: 'boolean | string', default: 'true', description: 'Section 2 — show/hide the appTitle/appSubtitle heading block — accepts true / false / "true" / "false"' },
    { input: 'bgColor', type: 'string', default: `'#12C6A8'`, description: 'Header background colour — any valid CSS colour' },
    { input: 'textColor', type: 'string', default: `'#ffffff'`, description: 'Text and icon colour' },
    { input: 'badge', type: 'HeaderBadge | string', default: 'null', description: '{ text, color, textColor? } or JSON string — environment badge' },
    { input: 'showHelp', type: 'boolean | string', default: 'false', description: 'Show the help (?) button — accepts true / "true"' },
    { input: 'showSearch', type: 'boolean | string', default: 'true', description: 'Section 3 — show/hide the search button. Clicking it expands a search field inline in the header — accepts true / false / "true" / "false"' },
    { input: 'navLinks', type: 'NavLink[] | string', default: '[]', description: '{ label, href, active? }[] or JSON string — nav links' },
    { input: 'showUser', type: 'boolean | string', default: 'true', description: 'Section 4 — show/hide the whole avatar area (combined with userName being set) — accepts true / false / "true" / "false"' },
    { input: 'avatarMode', type: `'menu'|'plain'`, default: `'menu'`, description: `Section 4 style — 'menu' shows name/email + avatar + dropdown; 'plain' shows only the round avatar chip, no dropdown.` },
    { input: 'userName', type: 'string', default: `''`, description: 'Full name of signed-in user — activates the user area' },
    { input: 'userEmail', type: 'string', default: `''`, description: 'Email shown in the dropdown header (menu mode only)' },
    { input: 'greeting', type: 'string', default: `'Hi'`, description: 'Greeting prefix — set empty to hide (menu mode only)' },
    { input: 'userSubtext', type: 'string', default: `'Welcome back!'`, description: 'Small line below the greeting (menu mode only)' },
    { input: 'avatarUrl', type: 'string', default: `''`, description: 'Avatar image URL — falls back to initials when blank' },
    { input: 'avatarColor', type: 'string', default: `'#0d6e5f'`, description: 'Avatar background colour' },
    { input: 'avatarTextColor', type: 'string', default: `'#ffffff'`, description: 'Avatar initials colour' },
    { input: 'menuItems', type: 'UserMenuItem[] | string', default: '[]', description: '{ label, action, icon?, danger? }[] — user dropdown items (menu mode only). Empty by default; add every item you want shown, e.g. Profile, Settings, Sign out — nothing is injected automatically.' },
    { input: 'showHamburger', type: 'boolean | string', default: 'false', description: 'Show a hamburger button on the far left, before the logo — for toggling an app sidebar. Accepts true / "true"' },
    { input: 'hamburgerOpen', type: 'boolean | string', default: 'false', description: 'Controls the hamburger icon’s open/close (X) animation state — set this from your own sidebar-open state.' },
    { input: 'menuAction', type: 'EventEmitter<string>', default: '—', description: 'Output — emits item.action string when a menu item is clicked' },
    { input: 'helpClick', type: 'EventEmitter<void>', default: '—', description: 'Output — emits when the help (?) button is clicked' },
    { input: 'hamburgerToggle', type: 'EventEmitter<void>', default: '—', description: 'Output — emits when the hamburger button is clicked; toggle your sidebar and update hamburgerOpen in response.' },
    { input: 'searchClick', type: 'EventEmitter<void>', default: '—', description: 'Output — emits every time the search button is clicked (both opening and closing).' },
    { input: 'searchOpenChange', type: 'EventEmitter<boolean>', default: '—', description: 'Output — emits true when the inline search field opens, false when it closes.' },
    { input: 'searchQuery', type: 'EventEmitter<string>', default: '—', description: 'Output — emits the current input value as the user types in the inline search field.' },
  ];

  // ── Cross-framework quick-ref ──────────────────────────────────────────

  xfwRows = [
    { name: 'appTitle', angular: 'appTitle="..."', attr: 'app-title="..."', js: 'el.appTitle = "..."' },
    { name: 'bgColor', angular: 'bgColor="#12C6A8"', attr: 'bg-color="#12C6A8"', js: 'el.bgColor = "#12C6A8"' },
    { name: 'logoUrl', angular: 'logoUrl="/logo.png"', attr: 'logo-url="/logo.png"', js: 'el.logoUrl = "/logo.png"' },
    { name: 'badge', angular: '[badge]="badgeObj"', attr: 'badge=\'{"text":"UAT"}\'', js: 'el.badge = { text: "UAT" }' },
    { name: 'showHelp', angular: '[showHelp]="true"', attr: 'show-help="true"', js: 'el.showHelp = true' },
    { name: 'showSearch', angular: '[showSearch]="false"', attr: 'show-search="false"', js: 'el.showSearch = false' },
    { name: 'showLogo', angular: '[showLogo]="false"', attr: 'show-logo="false"', js: 'el.showLogo = false' },
    { name: 'showHeading', angular: '[showHeading]="false"', attr: 'show-heading="false"', js: 'el.showHeading = false' },
    { name: 'showUser', angular: '[showUser]="false"', attr: 'show-user="false"', js: 'el.showUser = false' },
    { name: 'avatarMode', angular: 'avatarMode="plain"', attr: 'avatar-mode="plain"', js: 'el.avatarMode = "plain"' },
    { name: 'showHamburger', angular: '[showHamburger]="true"', attr: 'show-hamburger="true"', js: 'el.showHamburger = true' },
    { name: 'hamburgerOpen', angular: '[hamburgerOpen]="open"', attr: 'hamburger-open="true"', js: 'el.hamburgerOpen = true' },
    { name: 'hamburgerToggle', angular: '(hamburgerToggle)="fn()"', attr: '— use addEventListener', js: 'el.addEventListener("hamburgerToggle", fn)' },
    { name: 'searchQuery', angular: '(searchQuery)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("searchQuery", fn)' },
    { name: 'navLinks', angular: '[navLinks]="links"', attr: 'nav-links=\'[...]\'', js: 'el.navLinks = [...]' },
    { name: 'menuItems', angular: '[menuItems]="items"', attr: '— use JS property', js: 'el.menuItems = [...]' },
    { name: 'menuAction', angular: '(menuAction)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("menuAction", fn)' },
    { name: 'helpClick', angular: '(helpClick)="fn()"', attr: '— use addEventListener', js: 'el.addEventListener("helpClick", fn)' },
  ];
}
