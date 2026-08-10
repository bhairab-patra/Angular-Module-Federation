import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { PuiAppShellComponent } from '@bhairab-patra/platform-ui';
import { SidebarGroup, SidebarTheme, SIDEBAR_THEMES } from '@bhairab-patra/platform-ui';
import { UserMenuItem, HeaderBadge } from '@bhairab-patra/platform-ui';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';

const ICON = (d: string) =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

@Component({
  selector: 'docs-app-shell-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [TitleCasePipe, PuiAppShellComponent, FrameworkPreviewComponent, DocPageComponent],
  templateUrl: './app-shell-page.component.html',
  styleUrls: ['./app-shell-page.component.scss'],
})
export class AppShellPageComponent {

  sidebarVisible   = true;
  sidebarCollapsed = false;
  activeId         = 'dashboard';
  lastAction       = '';

  readonly themeNames = Object.keys(SIDEBAR_THEMES) as (keyof typeof SIDEBAR_THEMES)[];
  activeThemeName: keyof typeof SIDEBAR_THEMES = 'dark';
  get activeTheme(): SidebarTheme { return SIDEBAR_THEMES[this.activeThemeName]; }
  cycleTheme(): void {
    const idx = (this.themeNames.indexOf(this.activeThemeName) + 1) % this.themeNames.length;
    this.activeThemeName = this.themeNames[idx];
  }

  demoHeaderBadge: HeaderBadge = { text: 'UAT', color: '#f59e0b', textColor: '#fff' };

  demoMenuItems: UserMenuItem[] = [
    { label: 'My Profile', action: 'profile',  icon: ICON('<circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/>') },
    { label: 'Settings',   action: 'settings', icon: ICON('<circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>') },
    { label: 'Sign Out',   action: 'logout', danger: true, icon: ICON('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>') },
  ];

  navGroups: SidebarGroup[] = [
    {
      id: 'grp-overview', label: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard',
          icon: ICON('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>') },
        { id: 'analytics', label: 'Analytics & Reports', badge: 'New', badgeVariant: 'success',
          icon: ICON('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>') },
      ],
    },
    {
      id: 'grp-management', label: 'Management',
      items: [
        { id: 'users', label: 'Users & Permissions', badge: 12, badgeVariant: 'warning',
          icon: ICON('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
          children: [
            { id: 'users-list',   label: 'All Users' },
            { id: 'users-roles',  label: 'Roles & Permissions' },
            { id: 'users-invite', label: 'Invite Members' },
          ],
        },
        { id: 'products', label: 'Products',
          icon: ICON('<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>') },
        { id: 'orders', label: 'Orders', badge: 3, badgeVariant: 'danger',
          icon: ICON('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>') },
      ],
    },
    {
      id: 'grp-settings', label: 'Settings',
      items: [
        { id: 'settings', label: 'General Settings',
          icon: ICON('<circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3"/>') },
        { id: 'billing',  label: 'Billing & Plans', dividerAfter: true,
          icon: ICON('<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>') },
        { id: 'help',     label: 'Help & Docs',
          icon: ICON('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>') },
      ],
    },
  ];

  onItemSelect(item: any): void {
    this.activeId   = item.id ?? item;
    this.lastAction = `Navigate → ${item.id ?? item}`;
  }

  angularCode = `import { PuiAppShellComponent } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiAppShellComponent],
  template: \`
    <pui-lib-app-shell
      appTitle="Admin Portal"
      appSubtitle="Management Console"
      logoUrl="/assets/logo.png"
      headerBgColor="#12C6A8"
      headerUserName="Jane Doe"
      headerUserEmail="jane@example.com"
      headerGreeting="Hi"
      [headerBadge]="{ text: 'PROD', color: '#10b981', textColor: '#fff' }"
      [headerMenuItems]="menuItems"
      [groups]="navGroups"
      [activeId]="activeId"
      sidebarBgColor="#0f172a"
      sidebarTextColor="#94a3b8"
      sidebarActiveColor="#12C6A8"
      [sidebarVisible]="open"
      (itemSelect)="activeId = $event.id"
      (headerMenuAction)="onAction($event)">

      <router-outlet />
    </pui-lib-app-shell>
  \`
})
export class AppComponent {
  activeId = 'dashboard';
  open = true;
}`;

  reactCode = `import { useRef, useEffect, useState } from 'react';
// pui-elements.js loaded via <script> in index.html

const NAV_GROUPS = [
  {
    id: 'main', label: 'Menu',
    items: [
      { id: 'Home', label: 'Home', route: '/home' },
      { id: 'users',     label: 'Users',     route: '/users', badge: 12 },
    ],
  },
];

const MENU_ITEMS = [
  { label: 'Profile',  action: 'profile' },
  { label: 'Sign out', action: 'logout', danger: true },
];

function App() {
  const shellRef = useRef(null);
  const [activeId, setActiveId] = useState('dashboard');

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    // Arrays and objects must be JS properties
    el.groups          = NAV_GROUPS;
    el.headerMenuItems = MENU_ITEMS;
    const onNav    = (e) => setActiveId(e.detail.id);
    const onAction = (e) => console.log('action:', e.detail);
    el.addEventListener('itemSelect',       onNav);
    el.addEventListener('headerMenuAction', onAction);
    return () => {
      el.removeEventListener('itemSelect',       onNav);
      el.removeEventListener('headerMenuAction', onAction);
    };
  }, []);

  return (
    <pui-lib-app-shell
      ref={shellRef}
      app-title="Admin Portal"
      logo-url="/assets/logo.png"
      header-bg-color="#17201f"
      header-user-name="Jane Doe"
      header-user-email="jane@example.com"
      sidebar-bg-color="#0f172a"
      sidebar-text-color="#94a3b8"
      sidebar-active-color="#020202"
      active-id={activeId}
      style={{ display: 'block', height: '100vh' }}>
      <main style={{ padding: '24px' }}>Page: {activeId}</main>
    </pui-lib-app-shell>
  );
}`;

  htmlCode = `<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="/tokens.css" />
  <link rel="stylesheet" href="/themes/theme-new.css" />
  <script src="/pui-elements.js"></script>
  <style>
    html, body { margin: 0; height: 100%; }
    pui-lib-app-shell { display: block; height: 100vh; }
  </style>
</head>
<body>
  <pui-lib-app-shell
    id="shell"
    app-title="My App"
    logo-url="/assets/logo.png"
    header-bg-color="#12C6A8"
    header-user-name="Jane Doe"
    sidebar-bg-color="#0f172a"
    sidebar-active-color="#12C6A8">
    <main id="content" style="padding:24px">
      <h2>Dashboard</h2>
    </main>
  </pui-lib-app-shell>

  <script>
    customElements.whenDefined('pui-lib-app-shell').then(() => {
      const shell = document.getElementById('shell');
      shell.groups = [
        {
          id: 'main', label: 'Main Menu',
          items: [
            { id: 'dashboard', label: 'Dashboard', route: '/' },
            { id: 'users',     label: 'Users',     route: '/users' },
          ],
        },
      ];
      shell.headerMenuItems = [
        { label: 'Sign out', action: 'logout', danger: true }
      ];
      shell.addEventListener('itemSelect', (e) => {
        document.getElementById('content').innerHTML =
          '<h2>' + e.detail.label + '</h2>';
      });
    });
  </script>
</body>
</html>`;

  api: ApiRow[] = [
    { input: 'appTitle',            type: 'string',              default: "'My App'",    description: 'Application name shown in the header brand area.' },
    { input: 'appSubtitle',         type: 'string',              default: "''",           description: 'Small subtitle under the app title.' },
    { input: 'logo',                type: 'string (SVG/HTML)',   default: "''",           description: 'Inline SVG or HTML for the logo. Use logoUrl for image assets.' },
    { input: 'logoUrl',             type: 'string',              default: "''",           description: 'Image URL for logo (PNG, SVG asset). Rendered as <img> in the header.' },
    { input: 'brandName',           type: 'string',              default: "''",           description: 'Sidebar brand name. Falls back to appTitle.' },
    { input: 'groups',              type: 'SidebarGroup[]',      default: '[]',           description: 'Navigation groups for the sidebar. Set as JS property in React/HTML.' },
    { input: 'activeId',            type: 'string',              default: "''",           description: 'ID of the currently active nav item.' },
    { input: 'sidebarVisible',      type: 'boolean',             default: 'true',         description: 'Show or hide the sidebar. Animated slide in/out.' },
    { input: 'sidebarCollapsed',    type: 'boolean',             default: 'false',        description: 'Collapse sidebar to icon-only rail with tooltips.' },
    { input: 'sidebarBgColor',      type: 'string',              default: "''",           description: 'Sidebar background color shortcut.' },
    { input: 'sidebarTextColor',    type: 'string',              default: "''",           description: 'Sidebar nav item text color shortcut.' },
    { input: 'sidebarActiveColor',  type: 'string',              default: "''",           description: 'Active item accent color — border, text and tinted background.' },
    { input: 'sidebarHoverColor',   type: 'string',              default: "''",           description: 'Hover background color shortcut.' },
    { input: 'sidebarBorderColor',  type: 'string',              default: "''",           description: 'Sidebar border color shortcut.' },
    { input: 'sidebarWidth',        type: 'number',              default: '0',            description: 'Sidebar width in px. 0 = use default (260px).' },
    { input: 'config',              type: 'SidebarConfig',       default: '{}',           description: '{ width, collapsedWidth, showSearch, collapsible, maxLabelLen }' },
    { input: 'theme',               type: 'SidebarTheme',        default: '{}',           description: 'Full sidebar color token object. Use SIDEBAR_THEMES presets.' },
    { input: 'headerBgColor',       type: 'string',              default: "'#12C6A8'",    description: 'Header background colour.' },
    { input: 'headerTextColor',     type: 'string',              default: "'#ffffff'",    description: 'Header text and icon colour.' },
    { input: 'headerUserName',      type: 'string',              default: "''",           description: 'Displayed in header avatar and user menu.' },
    { input: 'headerUserEmail',     type: 'string',              default: "''",           description: 'Email shown in the user dropdown.' },
    { input: 'headerGreeting',      type: 'string',              default: "'Hi'",         description: 'Greeting prefix (e.g. "Hi, Jane").' },
    { input: 'headerBadge',         type: 'HeaderBadge | null',  default: 'null',         description: 'Environment badge e.g. { text: "UAT", color: "#f59e0b" }.' },
    { input: 'headerMenuItems',     type: 'UserMenuItem[]',      default: '[]',           description: 'User-menu action items. Set as JS property in React/HTML.' },
    { input: 'headerShowHelp',      type: 'boolean',             default: 'false',        description: 'Show the help (?) icon button in the header.' },
    { input: 'itemSelect',          type: 'EventEmitter<SidebarNavItem>', default: '—',   description: 'Fires when a nav item is clicked.' },
    { input: 'headerMenuAction',    type: 'EventEmitter<string>', default: '—',           description: 'Fires when a user-menu item is selected.' },
    { input: 'headerHelpClick',     type: 'EventEmitter<void>',  default: '—',           description: 'Fires when the help button is clicked.' },
    { input: 'sidebarVisibleChange',type: 'EventEmitter<boolean>', default: '—',          description: 'Fires when hamburger toggles sidebar visibility.' },
    { input: 'sidebarCollapsedChange', type: 'EventEmitter<boolean>', default: '—',       description: 'Fires when sidebar collapses / expands.' },
  ];
}
