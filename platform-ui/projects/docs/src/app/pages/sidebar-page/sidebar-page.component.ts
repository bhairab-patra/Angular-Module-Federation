import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  PuiSidebarComponent, SidebarGroup, SidebarNavItem,
  SidebarTheme, SIDEBAR_THEMES
} from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

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
  templateUrl: './sidebar-page.component.html',
  styleUrls: ['./sidebar-page.component.scss'],
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
