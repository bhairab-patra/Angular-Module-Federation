import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  PuiSidebarComponent,
  SidebarGroup,
  SidebarTheme,
  SIDEBAR_THEMES,
} from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

const ICON = (path: string): string =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

const NAV_GROUPS: SidebarGroup[] = [
  {
    id: 'main',
    label: 'Main Menu',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        route: '/dashboard',
        icon: ICON(
          '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
        ),
      },
      {
        id: 'analytics',
        label: 'Analytics',
        badge: 'New',
        badgeVariant: 'success',
        icon: ICON('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
        children: [
          { id: 'reports', label: 'Reports', route: '/analytics/reports' },
          { id: 'charts', label: 'Charts & Graphs', route: '/analytics/charts' },
          {
            id: 'exports',
            label: 'Data Exports',
            route: '/analytics/exports',
            badge: 3,
            badgeVariant: 'primary',
          },
        ],
      },
      {
        id: 'orders',
        label: 'Orders',
        badge: 12,
        badgeVariant: 'warning',
        dividerAfter: true,
        icon: ICON('<path d="M9 11l3 3 8-8"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'),
      },
    ],
  },
  {
    id: 'admin',
    label: 'Administration',
    items: [
      {
        id: 'users',
        label: 'Users & Permissions',
        icon: ICON(
          '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>',
        ),
        children: [
          { id: 'user-list', label: 'All Users', route: '/admin/users' },
          { id: 'user-roles', label: 'Roles', route: '/admin/roles' },
          {
            id: 'user-audit',
            label: 'Audit Log',
            route: '/admin/audit',
            badge: '!',
            badgeVariant: 'danger',
          },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: ICON(
          '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>',
        ),
      },
    ],
  },
];

@Component({
  selector: 'docs-sidebar-page',
  standalone: true,
  imports: [NgFor, PuiSidebarComponent, DocPageComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-page.component.html',
  styleUrls: ['./sidebar-page.component.scss'],
})
export class SidebarPageComponent {
  private cdr = inject(ChangeDetectorRef);
  copied = '';

  activeId = 'dashboard';
  collapsed = false;
  SIDEBAR_THEMES = SIDEBAR_THEMES;
  themeKeys = Object.keys(SIDEBAR_THEMES) as (keyof typeof SIDEBAR_THEMES)[];
  activeThemeName: keyof typeof SIDEBAR_THEMES = 'dark';
  navGroups = NAV_GROUPS;

  get activeTheme(): SidebarTheme {
    return SIDEBAR_THEMES[this.activeThemeName];
  }
  setTheme(t: keyof typeof SIDEBAR_THEMES): void {
    this.activeThemeName = t;
  }

  trackByIndex(_i: number): number {
    return _i;
  }

  doCopy(text: string, id: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      setTimeout(() => (this.copied = ''), 2000);
    });
  }

  cards = [
    { lbl: 'Revenue', val: '$142K', color: '#12C6A8' },
    { lbl: 'Orders', val: '1,284', color: '#6366f1' },
    { lbl: 'Users', val: '8,921', color: '#f59e0b' },
  ];

  angularTpl = `<pui-lib-sidebar
  brandName="Platform UI"
  [groups]="navGroups"
  [activeId]="activeId"
  [collapsed]="collapsed"
  [theme]="activeTheme"
  [showUser]="true"
  userName="Admin hub"
  userEmail="adminhub@solifi.com"
  [config]="{ collapsible: true, showSearch: false, width: 256 }"
  (collapsedChange)="collapsed = $event"
  (itemSelect)="onNav($event)">
</pui-lib-sidebar>`;

  angularTs = `import {
  PuiSidebarComponent, SidebarGroup, SidebarNavItem,
  SIDEBAR_THEMES
} from '@bhairab-patra/platform-ui';

@Component({ standalone: true, imports: [PuiSidebarComponent] })
export class ShellComponent {
  activeId  = 'dashboard';
  collapsed = false;

  navGroups: SidebarGroup[] = [
    {
      id: 'main', label: 'Main Menu',
      items: [
        { id: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: '...' },
        { id: 'orders',    label: 'Orders',    route: '/orders',    badge: 12, badgeVariant: 'warning' },
      ],
    },
  ];

  onNav(item: SidebarNavItem) {
    this.activeId = item.id;
    this.router.navigate([item.route]);
  }
}`;

  angularCode = this.angularTpl + '\n\n' + this.angularTs;

  reactCode = `import { useRef, useEffect, useState } from 'react';
// main.tsx: load pui-elements bundle before rendering

const NAV_GROUPS = [
  {
    id: 'main', label: 'Main Menu',
    items: [
      { id: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: '<svg>...</svg>' },
      { id: 'orders',    label: 'Orders',    route: '/orders',    badge: 12 },
    ],
  },
];

export function AppSidebar({ children }) {
  const ref = useRef(null);
  const [activeId, setActiveId] = useState('dashboard');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Arrays and objects must be set as JS properties
    el.groups = NAV_GROUPS;
    el.config  = { collapsible: true, showSearch: true, width: 256 };

    const onNav = (e) => setActiveId(e.detail.id);
    el.addEventListener('itemSelect', onNav);
    return () => el.removeEventListener('itemSelect', onNav);
  }, []);

  return (
    <pui-lib-sidebar
      ref={ref}
      brand-name="Platform UI"
      active-id={activeId}
      bg-color="#0f172a"
      text-color="#94a3b8"
      active-color="#12C6A8"
      style={{ height: '100vh', display: 'block' }}
    />
  );
}`;

  htmlCode = `<script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>

<style>
  pui-lib-sidebar { display: block; height: 100vh; }
</style>

<pui-lib-sidebar
  id="sb"
  brand-name="Platform UI"
  bg-color="#0f172a"
  text-color="#94a3b8"
  active-color="#12C6A8">
</pui-lib-sidebar>

<script>
  customElements.whenDefined('pui-lib-sidebar').then(() => {
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

    el.config = { collapsible: true, showSearch: true, width: 256 };

    el.addEventListener('itemSelect', (e) => {
      console.log('navigating to', e.detail.route);
    });
  });
</script>`;

  xfwRows = [
    {
      name: 'groups',
      angular: '[groups]="navGroups"',
      attr: '— use JS property',
      js: 'el.groups = [...]',
    },
    {
      name: 'activeId',
      angular: '[activeId]="id"',
      attr: 'active-id="dashboard"',
      js: 'el.activeId = "dashboard"',
    },
    {
      name: 'brandName',
      angular: 'brandName="Platform"',
      attr: 'brand-name="Platform"',
      js: 'el.brandName = "Platform"',
    },
    {
      name: 'bgColor',
      angular: 'bgColor="#0f172a"',
      attr: 'bg-color="#0f172a"',
      js: 'el.bgColor = "#0f172a"',
    },
    {
      name: 'textColor',
      angular: 'textColor="#94a3b8"',
      attr: 'text-color="#94a3b8"',
      js: 'el.textColor = "#94a3b8"',
    },
    {
      name: 'activeColor',
      angular: 'activeColor="#12C6A8"',
      attr: 'active-color="#12C6A8"',
      js: 'el.activeColor = "#12C6A8"',
    },
    {
      name: 'hoverColor',
      angular: 'hoverColor="#1e293b"',
      attr: 'hover-color="#1e293b"',
      js: 'el.hoverColor = "#1e293b"',
    },
    {
      name: 'borderColor',
      angular: 'borderColor="#334155"',
      attr: 'border-color="#334155"',
      js: 'el.borderColor = "#334155"',
    },
    { name: 'width', angular: '[width]="280"', attr: 'width="280"', js: 'el.width = 280' },
    {
      name: 'collapsed',
      angular: '[collapsed]="false"',
      attr: 'collapsed="false"',
      js: 'el.collapsed = false',
    },
    {
      name: 'config',
      angular: '[config]="cfg"',
      attr: '— use JS property',
      js: 'el.config = {...}',
    },
    {
      name: 'theme',
      angular: '[theme]="darkTheme"',
      attr: '— use JS property',
      js: 'el.theme = {...}',
    },
    {
      name: 'itemSelect',
      angular: '(itemSelect)="fn($event)"',
      attr: '— addEventListener',
      js: 'el.addEventListener("itemSelect", fn)',
    },
    {
      name: 'collapsedChange',
      angular: '(collapsedChange)="fn($event)"',
      attr: '— addEventListener',
      js: 'el.addEventListener("collapsedChange", fn)',
    },
  ];

  api: ApiRow[] = [
    {
      input: 'groups',
      type: 'SidebarGroup[]|string',
      default: '[]',
      description:
        'Nav group tree — the core structure. Always set as JS property or Angular binding.',
    },
    {
      input: 'activeId',
      type: 'string',
      default: "''",
      description: 'Currently active nav item ID.',
    },
    {
      input: 'brandName',
      type: 'string',
      default: "''",
      description: 'Brand / product name shown in the sidebar header bar.',
    },
    {
      input: 'logo',
      type: 'string (SVG/HTML)',
      default: 'default',
      description: 'Logo HTML shown left of brandName. Defaults to PUI logo.',
    },
    {
      input: 'collapsed',
      type: 'boolean|string',
      default: 'false',
      description: 'Collapse sidebar to icon-only rail.',
    },
    {
      input: 'showSidebar',
      type: 'boolean|string',
      default: 'true',
      description: 'Hide the sidebar entirely (e.g. on mobile).',
    },
    {
      input: 'bgColor',
      type: 'string',
      default: '#112C35',
      description: 'Sidebar background color. Quick override — no theme object needed.',
    },
    { input: 'textColor', type: 'string', default: '#94a3b8', description: 'Nav item text color.' },
    {
      input: 'activeColor',
      type: 'string',
      default: '#12C6A8',
      description: 'Active item accent color used for text, border, and tinted background.',
    },
    {
      input: 'hoverColor',
      type: 'string',
      default: 'auto',
      description: 'Hover background color override.',
    },
    {
      input: 'borderColor',
      type: 'string',
      default: 'auto',
      description: 'Right border and divider color override.',
    },
    {
      input: 'width',
      type: 'number',
      default: '0',
      description: 'Sidebar width in px. Overrides config.width when non-zero.',
    },
    {
      input: 'config',
      type: 'SidebarConfig|string',
      default: '{}',
      description: '{ width, collapsedWidth, showSearch, collapsible, maxLabelLen }',
    },
    {
      input: 'theme',
      type: 'SidebarTheme|string',
      default: 'dark',
      description:
        'Full color token object. Takes precedence over individual color inputs. Use SIDEBAR_THEMES presets (dark, slate, light, brand, solifi).',
    },
    {
      input: 'showIcons',
      type: 'boolean|string',
      default: 'false',
      description: 'Show per-item icons. Off by default for text-only (Solifi) design.',
    },
    {
      input: 'showUser',
      type: 'boolean|string',
      default: 'false',
      description: 'Show user profile section at the bottom (logged-in state).',
    },
    {
      input: 'userName',
      type: 'string',
      default: "''",
      description: 'Full name displayed in the user profile section.',
    },
    {
      input: 'userEmail',
      type: 'string',
      default: "''",
      description: 'Email displayed below the user name.',
    },
    {
      input: 'userInitials',
      type: 'string',
      default: "''",
      description: 'Avatar initials (1–2 chars). Auto-derived from userName if omitted.',
    },
    {
      input: 'userAvatarUrl',
      type: 'string',
      default: "''",
      description: 'Photo URL for the avatar. Falls back to initials bubble when empty.',
    },
    {
      input: 'userAvatarBg',
      type: 'string',
      default: '#12C6A8',
      description: 'Background colour of the initials avatar bubble.',
    },
    {
      input: 'collapsedChange',
      type: 'EventEmitter<boolean>',
      default: '—',
      description: 'Fires when sidebar collapse state changes.',
    },
    {
      input: 'itemSelect',
      type: 'EventEmitter<SidebarNavItem>',
      default: '—',
      description: 'Fires when a nav item (non-parent) is clicked.',
    },
  ];
}
