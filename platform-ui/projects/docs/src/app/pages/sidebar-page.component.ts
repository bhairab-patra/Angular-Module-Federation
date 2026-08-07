import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  PuiSidebarComponent, SidebarGroup, SidebarNavItem,
  SidebarTheme, SIDEBAR_THEMES
} from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

type FwTab = 'angular' | 'react' | 'html';

const ICON = (path: string) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

const NAV_GROUPS: SidebarGroup[] = [
  {
    id: 'main', label: 'Main Menu',
    items: [
      { id: 'dashboard', label: 'Dashboard', route: '/dashboard',
        icon: ICON('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>') },
      { id: 'analytics', label: 'Analytics', badge: 'New', badgeVariant: 'success',
        icon: ICON('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
        children: [
          { id: 'reports', label: 'Reports',         route: '/analytics/reports' },
          { id: 'charts',  label: 'Charts & Graphs', route: '/analytics/charts' },
          { id: 'exports', label: 'Data Exports',    route: '/analytics/exports', badge: 3, badgeVariant: 'primary' },
        ] },
      { id: 'orders', label: 'Orders', badge: 12, badgeVariant: 'warning', dividerAfter: true,
        icon: ICON('<path d="M9 11l3 3 8-8"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>') },
    ],
  },
  {
    id: 'admin', label: 'Administration',
    items: [
      { id: 'users', label: 'Users & Permissions',
        icon: ICON('<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>'),
        children: [
          { id: 'user-list',  label: 'All Users', route: '/admin/users' },
          { id: 'user-roles', label: 'Roles',     route: '/admin/roles' },
          { id: 'user-audit', label: 'Audit Log', route: '/admin/audit', badge: '!', badgeVariant: 'danger' },
        ] },
      { id: 'settings', label: 'Settings',
        icon: ICON('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>') },
    ],
  },
];

@Component({
  selector: 'docs-sidebar-page',
  standalone: true,
  imports: [NgFor, NgIf, PuiSidebarComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <docs-page
      title="Sidebar"
      description="Full-featured navigation sidebar with collapsible groups, submenu expansion, live search, badge indicators, theme tokens, and optional header integration. Works identically in Angular, React, and plain HTML."
      [hasFramework]="true"
      [api]="api">

      <!-- â•â• DEMO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
      <ng-container demo>

        <!-- Theme switcher -->
        <div class="theme-bar">
          <span class="theme-bar__label">Theme</span>
          <button *ngFor="let t of themeKeys" class="theme-pill"
                  [class.theme-pill--active]="activeThemeName===t"
                  (click)="setTheme(t)">
            <span class="theme-dot" [style.background]="SIDEBAR_THEMES[t].bg"></span>{{ t }}
          </button>
        </div>

        <!-- Interactive shell frame -->
        <div class="shell-frame">
          <pui-sidebar
            brandName="Platform UI"
            [groups]="navGroups"
            [activeId]="activeId"
            [collapsed]="collapsed"
            [config]="{ collapsible: true, showSearch: true, width: 256 }"
            [theme]="activeTheme"
            [showHeader]="true"
            headerAppTitle="Admin Portal"
            headerAppSubtitle="MANAGEMENT"
            headerBgColor="#0f172a"
            headerUserName="Bhairab Patra"
            headerUserEmail="bpatra@example.com"
            headerGreeting="Hi"
            [headerBadge]="{ text: 'UAT', color: '#f59e0b', textColor: '#fff' }"
            [headerMenuItems]="menuItems"
            (collapsedChange)="collapsed=$event"
            (itemSelect)="activeId=$event.id">
            <div class="fake-content">
              <div class="fake-title">{{ activeId || 'Dashboard' }}</div>
              <div class="fake-cards">
                <div class="fake-card" *ngFor="let c of cards">
                  <div class="fake-card__lbl">{{ c.lbl }}</div>
                  <div class="fake-card__val" [style.color]="c.color">{{ c.val }}</div>
                </div>
              </div>
              <div class="fake-row" *ngFor="let _ of [1,2,3,4]"></div>
            </div>
          </pui-sidebar>
        </div>

        <p class="demo-hint">
          Active item: <strong>{{ activeId || 'none' }}</strong> â€” try the search, collapse, and theme buttons.
        </p>

      </ng-container>

      <!-- â•â• FRAMEWORK USAGE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
      <ng-container framework>

        <h2 class="fw-title">Framework Usage</h2>
        <p class="fw-lead">
          <code>pui-sidebar</code> is a Web Component. String inputs â†’ HTML attributes.
          Objects (<code>config</code>, <code>theme</code>) and arrays (<code>groups</code>, <code>headerMenuItems</code>)
          â†’ JSON string attribute or JS property. The <code>groups</code> array is the core nav structure â€”
          always set it via a JS property or Angular binding.
        </p>

        <div class="fw-tabs">
          <button class="fw-tab" [class.fw-tab--active]="fw==='angular'" (click)="fw='angular'">
            <svg width="15" height="15" viewBox="0 0 24 24"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.31H4.936L12 3.405z" fill="#c3002f"/></svg>
            Angular
          </button>
          <button class="fw-tab" [class.fw-tab--active]="fw==='react'" (click)="fw='react'">
            <svg width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.05" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/></svg>
            React
          </button>
          <button class="fw-tab" [class.fw-tab--active]="fw==='html'" (click)="fw='html'">
            <svg width="15" height="15" viewBox="0 0 24 24"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/></svg>
            Plain HTML
          </button>
        </div>

        <div *ngIf="fw==='angular'" class="fw-panel">
          <div class="fw-note fw-note--angular">All Angular template bindings work directly â€” <code>[groups]</code>, <code>[theme]</code>, <code>(itemSelect)</code>.</div>
          <app-code lang="html"       id="sb-ng-tpl" [text]="angularTpl" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <app-code lang="typescript" id="sb-ng-ts"  [text]="angularTs"  [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <div *ngIf="fw==='react'" class="fw-panel">
          <div class="fw-note fw-note--react">Set <code>groups</code>, <code>theme</code>, <code>config</code> and <code>headerMenuItems</code> via <code>ref</code> in <code>useEffect</code>. Events via <code>addEventListener</code>.</div>
          <app-code lang="tsx" id="sb-react" [text]="reactCode" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <div *ngIf="fw==='html'" class="fw-panel">
          <div class="fw-note fw-note--html">Load the bundle. String inputs â†’ attributes. Arrays/objects â†’ JS properties via <code>whenDefined</code>.</div>
          <app-code lang="html" id="sb-html" [text]="htmlCode" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <h3 class="fw-ref-title">Input Quick Reference</h3>
        <div class="xfw-wrap">
          <table class="xfw-table">
            <thead><tr><th>Input</th><th>Angular</th><th>React / HTML attribute</th><th>JS property</th></tr></thead>
            <tbody>
              <tr *ngFor="let r of xfwRows; let odd=odd" [class.xfw-odd]="odd">
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
    /* Demo */
    .theme-bar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; width:100%; }
    .theme-bar__label { font-size:11px; font-weight:700; text-transform:uppercase; color:#9ca3af; letter-spacing:.06em; }
    .theme-pill { display:flex; align-items:center; gap:6px; padding:5px 14px; border-radius:20px; border:1.5px solid #e5e7eb; background:#fff; font-size:12px; font-weight:500; color:#374151; cursor:pointer; font-family:inherit; transition:all .14s; }
    .theme-pill:hover { border-color:#12C6A8; }
    .theme-pill--active { border-color:#12C6A8; background:#f0fdfb; color:#0d9e87; font-weight:600; }
    .theme-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
    .shell-frame { width:100%; height:520px; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb; }
    .shell-frame pui-sidebar { height:100%; display:block; }
    .fake-content { padding:28px 32px; height:100%; background:#f8fafc; overflow:auto; }
    .fake-title { font-size:22px; font-weight:700; color:#1e293b; margin-bottom:20px; text-transform:capitalize; font-family:'Poppins',sans-serif; }
    .fake-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:24px; }
    .fake-card { background:#fff; border-radius:10px; padding:16px 20px; border:1px solid #e2e8f0; }
    .fake-card__lbl { font-size:11px; color:#94a3b8; text-transform:uppercase; letter-spacing:.06em; font-weight:600; margin-bottom:6px; }
    .fake-card__val { font-size:22px; font-weight:700; }
    .fake-row { height:40px; background:#fff; border-radius:8px; border:1px solid #f1f5f9; margin-bottom:8px; }
    .demo-hint { font-size:13px; color:#6b7280; margin:0; width:100%; }
    .demo-hint strong { color:#111827; }

    /* FW styles */
    .fw-title { font-size:22px; font-weight:700; color:#111827; margin:0 0 8px; }
    .fw-lead { font-size:14px; color:#6b7280; line-height:1.7; margin:0 0 22px; }
    .fw-lead code { background:#f3f4f6; padding:1px 5px; border-radius:4px; font-size:13px; color:#1f2937; }
    .fw-tabs { display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
    .fw-tab { display:flex; align-items:center; gap:7px; padding:8px 18px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; font-size:13px; font-weight:500; color:#374151; cursor:pointer; font-family:inherit; transition:all .14s; }
    .fw-tab:hover { border-color:#12C6A8; color:#0d9e87; }
    .fw-tab--active { border-color:#12C6A8; background:#f0fdfb; color:#0d9e87; font-weight:600; }
    .fw-panel { display:flex; flex-direction:column; gap:14px; }
    .fw-note { padding:12px 16px; border-radius:8px; font-size:13px; line-height:1.65; border-left:4px solid #e5e7eb; background:#f9fafb; color:#374151; }
    .fw-note code { font-size:12px; background:rgba(0,0,0,.06); padding:1px 4px; border-radius:3px; }
    .fw-note--angular { border-color:#c3002f; background:#fff5f5; color:#7f1d1d; }
    .fw-note--react   { border-color:#38bdf8; background:#f0f9ff; color:#0c4a6e; }
    .fw-note--html    { border-color:#e34c26; background:#fff8f5; color:#7c2d12; }
    .fw-ref-title { font-size:16px; font-weight:700; color:#111827; margin:32px 0 12px; }
    .xfw-wrap { overflow-x:auto; border-radius:10px; border:1px solid #e5e7eb; }
    .xfw-table { width:100%; border-collapse:collapse; font-size:13px; }
    .xfw-table th { background:#f9fafb; padding:10px 14px; text-align:left; font-size:11px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:.06em; border-bottom:1px solid #e5e7eb; }
    .xfw-table td { padding:9px 14px; color:#374151; border-bottom:1px solid #f3f4f6; }
    .xfw-table tr:last-child td { border-bottom:none; }
    .xfw-odd td { background:#f9fafb; }
    .tag-name { color:#7c3aed; background:#f5f3ff; padding:1px 6px; border-radius:4px; font-size:12px; }
    .tag-ng   { color:#991b1b; background:#fff5f5; padding:1px 6px; border-radius:4px; font-size:12px; }
    .tag-html { color:#92400e; background:#fffbeb; padding:1px 6px; border-radius:4px; font-size:12px; }
    .tag-js   { color:#065f46; background:#f0fdf9; padding:1px 6px; border-radius:4px; font-size:12px; }
  `],
})
export class SidebarPageComponent {
  fw: FwTab = 'angular';
  copied    = '';
  activeId  = 'dashboard';
  collapsed = false;
  SIDEBAR_THEMES = SIDEBAR_THEMES;
  themeKeys = Object.keys(SIDEBAR_THEMES) as (keyof typeof SIDEBAR_THEMES)[];
  activeThemeName: keyof typeof SIDEBAR_THEMES = 'dark';
  navGroups = NAV_GROUPS;

  get activeTheme(): SidebarTheme { return SIDEBAR_THEMES[this.activeThemeName]; }
  setTheme(t: keyof typeof SIDEBAR_THEMES) { this.activeThemeName = t; }

  doCopy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => { this.copied = id; setTimeout(() => this.copied = '', 2000); });
  }

  menuItems = [
    { label: 'Profile',  action: 'profile' },
    { label: 'Sign out', action: 'signout', danger: true },
  ];

  cards = [
    { lbl: 'Revenue',  val: '$142K', color: '#12C6A8' },
    { lbl: 'Orders',   val: '1,284', color: '#6366f1' },
    { lbl: 'Users',    val: '8,921', color: '#f59e0b' },
  ];

  angularTpl = `<pui-sidebar
  brandName="Platform UI"
  [groups]="navGroups"
  [activeId]="activeId"
  [collapsed]="collapsed"
  [config]="{ collapsible: true, showSearch: true, width: 256 }"
  [theme]="darkTheme"
  [showHeader]="true"
  headerAppTitle="Admin Portal"
  headerBgColor="#0f172a"
  headerUserName="Bhairab Patra"
  headerUserEmail="bpatra@example.com"
  [headerBadge]="{ text: 'UAT', color: '#f59e0b' }"
  [headerMenuItems]="menuItems"
  (collapsedChange)="collapsed = $event"
  (itemSelect)="onNav($event)"
  (headerMenuAction)="onAction($event)">

  <!-- Router outlet / page content goes here -->
  <router-outlet></router-outlet>

</pui-sidebar>`;

  angularTs = `import {
  PuiSidebarComponent, SidebarGroup, SidebarNavItem,
  SIDEBAR_THEMES
} from '@bhairab-patra/platform-ui';

@Component({ standalone: true, imports: [PuiSidebarComponent] })
export class ShellComponent {
  activeId  = 'dashboard';
  collapsed = false;
  darkTheme = SIDEBAR_THEMES.dark;

  navGroups: SidebarGroup[] = [
    {
      id: 'main', label: 'Main Menu',
      items: [
        { id: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: '...' },
        { id: 'orders',    label: 'Orders',    route: '/orders',    badge: 12, badgeVariant: 'warning' },
      ],
    },
  ];

  menuItems = [
    { label: 'Profile',  action: 'profile' },
    { label: 'Sign out', action: 'signout', danger: true },
  ];

  onNav(item: SidebarNavItem) {
    this.activeId = item.id;
    this.router.navigate([item.route]);
  }
}`;

  reactCode = `import { useRef, useEffect, useState } from 'react';
// main.tsx: import '@bhairab-patra/platform-ui/elements';

const NAV_GROUPS = [
  {
    id: 'main', label: 'Main Menu',
    items: [
      { id: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: '<svg>...</svg>' },
      { id: 'orders',    label: 'Orders',    route: '/orders',    badge: 12 },
    ],
  },
];

export function AppShell({ children }) {
  const ref = useRef(null);
  const [activeId, setActiveId] = useState('dashboard');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Objects and arrays â†’ JS properties
    el.groups      = NAV_GROUPS;
    el.theme       = { bg: '#0f172a', textColor: '#94a3b8', activeBorder: '#12C6A8' };
    el.config      = { collapsible: true, showSearch: true, width: 256 };
    el.headerMenuItems = [
      { label: 'Profile',  action: 'profile' },
      { label: 'Sign out', action: 'signout', danger: true },
    ];
    el.headerBadge = { text: 'UAT', color: '#f59e0b' };

    const onNav    = (e) => setActiveId(e.detail.id);
    const onAction = (e) => console.log('menu action:', e.detail);
    el.addEventListener('itemSelect',       onNav);
    el.addEventListener('headerMenuAction', onAction);
    return () => {
      el.removeEventListener('itemSelect',       onNav);
      el.removeEventListener('headerMenuAction', onAction);
    };
  }, []);

  return (
    <pui-sidebar
      ref={ref}
      brand-name="Platform UI"
      active-id={activeId}
      show-header="true"
      header-app-title="Admin Portal"
      header-bg-color="#0f172a"
      header-user-name="Bhairab Patra"
      style={{ height: '100vh', display: 'block' }}
    >
      {children}
    </pui-sidebar>
  );
}`;

  htmlCode = `<script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>

<style>
  pui-sidebar { display: block; height: 100vh; }
</style>

<pui-sidebar
  id="sb"
  brand-name="Platform UI"
  show-header="true"
  header-app-title="Admin Portal"
  header-bg-color="#0f172a"
  header-user-name="Bhairab Patra">
  <div id="page-content">Page content here</div>
</pui-sidebar>

<script>
  customElements.whenDefined('pui-sidebar').then(() => {
    const el = document.getElementById('sb');

    el.groups = [
      {
        id: 'main', label: 'Main Menu',
        items: [
          { id: 'dashboard', label: 'Dashboard', route: '/' },
          { id: 'orders',    label: 'Orders',    route: '/orders', badge: 12 },
        ],
      },
    ];

    el.theme  = { bg: '#0f172a', textColor: '#94a3b8', activeBorder: '#12C6A8' };
    el.config = { collapsible: true, showSearch: true, width: 256 };

    el.headerMenuItems = [
      { label: 'Sign out', action: 'signout', danger: true }
    ];

    el.addEventListener('itemSelect', (e) => {
      document.getElementById('page-content').textContent = 'Page: ' + e.detail.label;
    });
  });
</script>`;

  xfwRows = [
    { name: 'groups',           angular: '[groups]="navGroups"',          attr: 'â€” use JS property',          js: 'el.groups = [...]' },
    { name: 'activeId',         angular: '[activeId]="id"',               attr: 'active-id="dashboard"',      js: 'el.activeId = "dashboard"' },
    { name: 'brandName',        angular: 'brandName="Platform"',          attr: 'brand-name="Platform"',      js: 'el.brandName = "Platform"' },
    { name: 'collapsed',        angular: '[collapsed]="false"',           attr: 'collapsed="false"',          js: 'el.collapsed = false' },
    { name: 'config',           angular: '[config]="cfg"',                attr: 'â€” use JS property',          js: 'el.config = {...}' },
    { name: 'theme',            angular: '[theme]="darkTheme"',           attr: 'â€” use JS property',          js: 'el.theme = {...}' },
    { name: 'showHeader',       angular: '[showHeader]="true"',           attr: 'show-header="true"',         js: 'el.showHeader = true' },
    { name: 'headerBadge',      angular: '[headerBadge]="badge"',         attr: 'header-badge=\'{"text":â€¦}\'',js: 'el.headerBadge = {...}' },
    { name: 'headerMenuItems',  angular: '[headerMenuItems]="items"',     attr: 'â€” use JS property',          js: 'el.headerMenuItems = [...]' },
    { name: 'itemSelect',       angular: '(itemSelect)="fn($event)"',     attr: 'â€” addEventListener',         js: 'el.addEventListener("itemSelect", fn)' },
    { name: 'collapsedChange',  angular: '(collapsedChange)="fn($event)"',attr: 'â€” addEventListener',         js: 'el.addEventListener("collapsedChange", fn)' },
    { name: 'headerMenuAction', angular: '(headerMenuAction)="fn($event)"',attr: 'â€” addEventListener',        js: 'el.addEventListener("headerMenuAction", fn)' },
  ];

  api: ApiRow[] = [
    { input: 'groups',            type: 'SidebarGroup[]|string',  default: '[]',       description: 'Nav group tree â€” the core structure.' },
    { input: 'activeId',          type: 'string',                 default: "''",        description: 'Currently active nav item ID.' },
    { input: 'brandName',         type: 'string',                 default: "''",        description: 'Brand / product name in the sidebar header.' },
    { input: 'logo',              type: 'string (SVG/HTML)',       default: 'default',  description: 'Logo HTML string shown left of brandName.' },
    { input: 'collapsed',         type: 'boolean|string',         default: 'false',     description: 'Collapse the sidebar to icon-only rail.' },
    { input: 'showSidebar',       type: 'boolean|string',         default: 'true',      description: 'Hide the sidebar entirely (e.g. mobile).' },
    { input: 'config',            type: 'SidebarConfig|string',   default: '{}',        description: '{ width, collapsedWidth, showSearch, collapsible, maxLabelLen }' },
    { input: 'theme',             type: 'SidebarTheme|string',    default: 'dark',      description: 'Color token object. Use SIDEBAR_THEMES presets.' },
    { input: 'showHeader',        type: 'boolean|string',         default: 'false',     description: 'Render pui-header above the sidebar shell.' },
    { input: 'headerAppTitle',    type: 'string',                 default: "'My App'",  description: 'Header product name.' },
    { input: 'headerBgColor',     type: 'string',                 default: "'#12C6A8'", description: 'Header background colour.' },
    { input: 'headerBadge',       type: 'HeaderBadge|string',     default: 'null',      description: 'Header env badge â€” JSON string or object.' },
    { input: 'headerShowHelp',    type: 'boolean|string',         default: 'false',     description: 'Show help (?) in header.' },
    { input: 'headerMenuItems',   type: 'UserMenuItem[]|string',  default: '[]',        description: 'User menu items in the header dropdown.' },
    { input: 'headerNavLinks',    type: 'NavLink[]|string',       default: '[]',        description: 'Horizontal nav links in the header.' },
    { input: 'headerUserName',    type: 'string',                 default: "''",        description: 'User display name in the header avatar.' },
    { input: 'headerUserEmail',   type: 'string',                 default: "''",        description: 'User email in the header dropdown.' },
    { input: 'collapsedChange',   type: 'EventEmitter<boolean>',  default: 'â€”',         description: 'Fires when sidebar collapse state changes.' },
    { input: 'itemSelect',        type: 'EventEmitter<SidebarNavItem>', default: 'â€”',   description: 'Fires when a non-parent nav item is clicked.' },
    { input: 'headerMenuAction',  type: 'EventEmitter<string>',   default: 'â€”',         description: 'Fires when a header menu item is selected.' },
    { input: 'headerHelpClick',   type: 'EventEmitter<void>',     default: 'â€”',         description: 'Fires when the header help button is clicked.' },
  ];
}
