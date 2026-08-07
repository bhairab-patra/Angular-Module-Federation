import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HeaderComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

type FwTab = 'angular' | 'react' | 'html';

@Component({
  selector: 'docs-header-page',
  standalone: true,
  imports: [DocPageComponent, HeaderComponent, NgIf, NgFor, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <docs-page
      title="Header"
      description="Flexible top app bar. Supports logo, badge, nav links, user menu and help button. Works identically in Angular, React, and plain HTML — no consumer hacks needed."
      [hasFramework]="true"
      [api]="api">

      <!-- ══ 1. LIVE DEMO ══════════════════════════════════════════════ -->
      <ng-container demo>

        <div class="demo-label"><span>Admin Portal — UAT</span></div>
        <pui-header
          appTitle="Admin Portal"
          appSubtitle="PLATFORM MANAGEMENT"
          bgColor="#12C6A8"
          [badge]="uatBadge"
          [showHelp]="true"
          greeting="Hi"
          userName="Bhairab Patra"
          userEmail="bpatra@solifi.com"
          userSubtext="Welcome back!"
          avatarColor="#0d6e5f"
          [menuItems]="fullMenuItems"
          (menuAction)="onAction($event)">
        </pui-header>

        <div class="demo-label"><span>Dark Theme + Nav Links</span></div>
        <pui-header
          appTitle="DataHub"
          appSubtitle="ANALYTICS"
          bgColor="#0f172a"
          [navLinks]="navLinks"
          [showHelp]="true"
          userName="Jane Smith"
          userEmail="jane@company.com"
          greeting="Hello"
          avatarColor="#6366f1"
          [menuItems]="fullMenuItems"
          (menuAction)="onAction($event)">
        </pui-header>

        <div class="demo-label"><span>With Logo Image</span></div>
        <pui-header
          appTitle="Solifi"
          appSubtitle="LENDING PLATFORM"
          bgColor="#0d6e5f"
          logoUrl="assets/logo.png"
          [navLinks]="navLinks"
          userName="Alex Johnson"
          userEmail="alex@solifi.com"
          avatarColor="#12C6A8"
          avatarTextColor="#0d6e5f"
          [badge]="prodBadge"
          [menuItems]="menuItems"
          (menuAction)="onAction($event)">
        </pui-header>

        <div class="demo-label"><span>Minimal — No User</span></div>
        <pui-header appTitle="My App" bgColor="#1e293b"></pui-header>

        <div class="demo-label"><span>Last Menu Action</span></div>
        <div class="action-log" *ngIf="lastAction">
          menuAction emitted: <strong>{{ lastAction }}</strong>
        </div>
        <div class="action-log action-log--empty" *ngIf="!lastAction">
          Click the user avatar → a menu item to see the emitted action here.
        </div>

      </ng-container>

      <!-- ══ 2. FRAMEWORK USAGE ═══════════════════════════════════════ -->
      <ng-container framework>

        <h2 class="fw-title">Framework Usage</h2>
        <p class="fw-lead">
          <code>pui-header</code> is a Web Component — it works in Angular, React, and plain HTML
          with no extra wrappers. String inputs are HTML attributes; objects/arrays accept a JSON
          string or a JS property; events are standard DOM CustomEvents.
        </p>

        <!-- Tabs -->
        <div class="fw-tabs">
          <button class="fw-tab" [class.fw-tab--active]="fw==='angular'" (click)="fw='angular'">
            <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0">
              <path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.31H4.936L12 3.405z" fill="#c3002f"/>
            </svg>
            Angular
          </button>
          <button class="fw-tab" [class.fw-tab--active]="fw==='react'" (click)="fw='react'">
            <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0">
              <circle cx="12" cy="12" r="2.05" fill="#61dafb"/>
              <ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/>
              <ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/>
              <ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/>
            </svg>
            React
          </button>
          <button class="fw-tab" [class.fw-tab--active]="fw==='html'" (click)="fw='html'">
            <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0">
              <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/>
            </svg>
            Plain HTML
          </button>
        </div>

        <!-- Angular -->
        <div *ngIf="fw==='angular'" class="fw-panel">
          <div class="fw-note fw-note--angular">
            Use Angular template binding — <code>[badge]</code>, <code>[showHelp]</code>,
            <code>[menuItems]</code>, <code>(menuAction)</code> — exactly as any Angular component.
          </div>
          <app-code lang="html"       [id]="'hdr-ng-tpl'" [text]="angularTemplate" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <app-code lang="typescript" [id]="'hdr-ng-ts'"  [text]="angularTs"       [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <!-- React -->
        <div *ngIf="fw==='react'" class="fw-panel">
          <div class="fw-note fw-note--react">
            String inputs → kebab-case HTML attributes. Object/boolean inputs → JSON string attribute.
            Arrays → JS property via <code>ref</code>. Events → <code>addEventListener</code>.
          </div>
          <app-code lang="tsx" [id]="'hdr-react'" [text]="reactCode" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <!-- Plain HTML -->
        <div *ngIf="fw==='html'" class="fw-panel">
          <div class="fw-note fw-note--html">
            Load <code>pui-elements.js</code> once. Use kebab-case for string/boolean attributes.
            Set arrays via JS after <code>customElements.whenDefined</code>.
          </div>
          <app-code lang="html" [id]="'hdr-html'" [text]="htmlCode" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <!-- Cross-framework quick-ref -->
        <h3 class="fw-ref-title">Input / Event Quick Reference</h3>
        <div class="xfw-wrap">
          <table class="xfw-table">
            <thead>
              <tr>
                <th>Input / Event</th>
                <th>Angular</th>
                <th>React / HTML attribute</th>
                <th>JS property</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of xfwRows; let odd = odd" [class.xfw-odd]="odd">
                <td><code class="tag-name">{{ r.name }}</code></td>
                <td><code class="tag-ng">{{ r.angular }}</code></td>
                <td><code class="tag-html">{{ r.attr }}</code></td>
                <td><code class="tag-js">{{ r.js }}</code></td>
              </tr>
            </tbody>
          </table>
        </div>

      </ng-container>

    </docs-page>
  `,
  styles: [`
    /* ── Demo section styles ──────────────────────────────────────────── */
    .demo-label {
      width: 100%; padding-top: 14px; margin-top: 2px;
      border-top: 1px solid #e5e7eb;
    }
    .demo-label span {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .07em; color: #9ca3af;
    }
    .action-log {
      padding: 12px 16px; border-radius: 8px; width: 100%;
      background: #f0fdf9; border: 1px solid #a7f3d0;
      font-size: 13px; color: #065f46; font-family: 'Poppins', system-ui, sans-serif;
    }
    .action-log--empty { background: #f9fafb; border-color: #e5e7eb; color: #9ca3af; }

    /* ── Framework usage section ──────────────────────────────────────── */
    .fw-title {
      font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 8px;
    }
    .fw-lead {
      font-size: 14px; color: #6b7280; line-height: 1.7; margin: 0 0 24px;
    }
    .fw-lead code {
      background: #f3f4f6; padding: 1px 5px; border-radius: 4px; font-size: 13px; color: #1f2937;
    }

    /* Tabs */
    .fw-tabs { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
    .fw-tab {
      display: flex; align-items: center; gap: 7px;
      padding: 8px 18px; border-radius: 10px;
      border: 1.5px solid #e5e7eb; background: #fff;
      font-size: 13px; font-weight: 500; color: #374151;
      cursor: pointer; font-family: inherit; transition: all .14s;
    }
    .fw-tab:hover       { border-color: #12C6A8; color: #0d9e87; }
    .fw-tab--active     { border-color: #12C6A8; background: #f0fdfb; color: #0d9e87; font-weight: 600; }

    /* Panels */
    .fw-panel { display: flex; flex-direction: column; gap: 14px; }
    .fw-note {
      padding: 12px 16px; border-radius: 8px; font-size: 13px; line-height: 1.65;
      border-left: 4px solid #e5e7eb; background: #f9fafb; color: #374151;
    }
    .fw-note code { font-size: 12px; background: rgba(0,0,0,.06); padding: 1px 4px; border-radius: 3px; }
    .fw-note--angular { border-color: #c3002f; background: #fff5f5; color: #7f1d1d; }
    .fw-note--react   { border-color: #38bdf8; background: #f0f9ff; color: #0c4a6e; }
    .fw-note--html    { border-color: #e34c26; background: #fff8f5; color: #7c2d12; }

    /* Quick-ref table */
    .fw-ref-title { font-size: 16px; font-weight: 700; color: #111827; margin: 36px 0 12px; }
    .xfw-wrap { overflow-x: auto; border-radius: 10px; border: 1px solid #e5e7eb; }
    .xfw-table {
      width: 100%; border-collapse: collapse;
      font-size: 13px; font-family: 'Poppins', system-ui, sans-serif;
    }
    .xfw-table th {
      background: #f9fafb; padding: 10px 14px; text-align: left;
      font-size: 11px; font-weight: 700; color: #6b7280;
      text-transform: uppercase; letter-spacing: .06em;
      border-bottom: 1px solid #e5e7eb;
    }
    .xfw-table td { padding: 9px 14px; color: #374151; border-bottom: 1px solid #f3f4f6; }
    .xfw-table tr:last-child td { border-bottom: none; }
    .xfw-odd td { background: #f9fafb; }
    .tag-name { color: #7c3aed; background: #f5f3ff; padding: 1px 6px; border-radius: 4px; font-size: 12px; }
    .tag-ng   { color: #991b1b; background: #fff5f5; padding: 1px 6px; border-radius: 4px; font-size: 12px; }
    .tag-html { color: #92400e; background: #fffbeb; padding: 1px 6px; border-radius: 4px; font-size: 12px; }
    .tag-js   { color: #065f46; background: #f0fdf9; padding: 1px 6px; border-radius: 4px; font-size: 12px; }
  `],
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
