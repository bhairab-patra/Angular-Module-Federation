import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  PuiAppShellComponent,
  SolifiNavGroup, SolifiNavItem, SolifiSidebarTheme, SolifiUserMenuItem, SOLIFI_THEME,
  UserMenuItem,
} from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

const NAV_GROUPS: SolifiNavGroup[] = [
  {
    id: 'dashboard', label: 'Dashboard',
    items: [
      { id: 'borrowing-base',   label: 'Borrowing Base Posting', iconName: 'dashboard'  },
      { id: 'upload-files',     label: 'Upload Files',           iconName: 'upload'     },
      { id: 'loan-ledger',      label: 'Loan Ledger',            iconName: 'file'       },
      { id: 'ineligibles',      label: 'Ineligibles Due & Reserves', iconName: 'inbox'  },
      { id: 'statements',       label: 'Statements',             iconName: 'database'   },
      { id: 'reports',          label: 'Reports',                iconName: 'chart'      },
      { id: 'posting-history',  label: 'Posting History',        iconName: 'clock'      },
      { id: 'interest-history', label: 'Interest History',       iconName: 'dollar'     },
    ],
  },
  {
    id: 'cadet', label: 'Cadet',
    items: [
      { id: 'posting-status', label: 'Posting Status', iconName: 'check-circle' },
      { id: 'loan-status',    label: 'Loan Status',    iconName: 'credit-card'  },
    ],
  },
  {
    id: 'user-setup', label: 'User Setup',
    items: [
      { id: 'user-setup', label: 'User Setup', iconName: 'users' },
    ],
  },
];

@Component({
  selector: 'docs-app-shell-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, PuiAppShellComponent, DocPageComponent, FrameworkPreviewComponent],
  templateUrl: './app-shell-page.component.html',
  styleUrls:  ['./app-shell-page.component.scss'],
})
export class AppShellPageComponent {
  private cdr = inject(ChangeDetectorRef);

  navGroups  = NAV_GROUPS;
  activeId   = 'borrowing-base';
  collapsed  = false;
  iconMode: 'with-icons' | 'no-icons' = 'with-icons';
  theme: SolifiSidebarTheme = { ...SOLIFI_THEME };

  userMenuItems: SolifiUserMenuItem[] = [
    { id: 'profile',  label: 'My Profile', iconName: 'user'     },
    { id: 'settings', label: 'Settings',   iconName: 'settings' },
    { id: 'logout',   label: 'Logout',     iconName: 'logout', divider: true },
  ];

  headerMenuItems: UserMenuItem[] = [
    { label: 'My Profile', action: 'profile'  },
    { label: 'Settings',   action: 'settings' },
    { label: 'Logout',     action: 'logout', danger: true },
  ];

  lastUserAction = '';
  lastHeaderQuery = '';
  demoShowHeader = true;

  onHeaderSearch(q: string): void { this.lastHeaderQuery = q; this.cdr.markForCheck(); }

  get activeLabel(): string {
    return NAV_GROUPS.flatMap(g => g.items).find(i => i.id === this.activeId)?.label ?? 'Dashboard';
  }

  get displayGroups(): SolifiNavGroup[] {
    if (this.iconMode === 'no-icons') {
      return NAV_GROUPS.map(g => ({
        ...g,
        items: g.items.map(({ iconName: _, ...rest }) => rest as SolifiNavItem),
      }));
    }
    return NAV_GROUPS;
  }

  onNav(item: SolifiNavItem): void { this.activeId = item.id; this.cdr.markForCheck(); }
  onCollapsed(v: boolean): void    { this.collapsed = v; this.cdr.markForCheck(); }
  onUserMenu(item: SolifiUserMenuItem): void {
    this.lastUserAction = item.label;
    this.cdr.markForCheck();
  }
  setMode(m: 'with-icons' | 'no-icons'): void { this.iconMode = m; this.cdr.markForCheck(); }

  fwAngularCode = `import { PuiAppShellComponent, SolifiNavGroup, SolifiNavItem, SolifiUserMenuItem, UserMenuItem, SOLIFI_THEME } from '@bhairab-patra/platform-ui';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [PuiAppShellComponent, RouterOutlet],
  // pui-lib-app-shell owns the complete layout:
  //   sidebar | optional header + title bar + scrollable content + fixed footer
  template: \`
    <pui-lib-app-shell
      brandName="solifi"
      logoUrl="assets/logo.png"
      [groups]="navGroups"
      [activeId]="activeId"
      [pageTitle]="activeLabel"
      footerText="Copyright © 2026 Solifi. All Rights Reserved."
      [theme]="theme"
      [showUser]="true"
      userName="Rosanna Doyle"
      userEmail="rdoyle@solifi.com"
      [userMenuItems]="userMenu"
      [showHeader]="true"
      headerAppTitle="Uptown Trucking Leasing"
      headerAppSubtitle="Digital Experience Portal"
      headerLogoUrl="assets/logo-full.png"
      headerUserName="Rosanna Doyle"
      headerUserEmail="rdoyle@solifi.com"
      [headerMenuItems]="headerMenu"
      (itemSelect)="onNav($event)"
      (collapsedChange)="collapsed = $event"
      (userMenuSelect)="onUserMenu($event)"
      (headerSearchQuery)="onHeaderSearch($event)">

      <!-- Only YOUR page content goes here — shell handles the rest -->
      <router-outlet />

    </pui-lib-app-shell>
  \`
})
export class AppComponent {
  activeId = 'loan-ledger';
  collapsed = false;
  theme = SOLIFI_THEME;

  navGroups: SolifiNavGroup[] = [
    { id: 'lending', label: 'Lending', items: [
      { id: 'loan-ledger',   label: 'Loan Ledger',   iconName: 'file'      },
      { id: 'repayments',    label: 'Repayments',    iconName: 'dollar'    },
      { id: 'statements',    label: 'Statements',    iconName: 'inbox'     },
      { id: 'upload-files',  label: 'Upload Files',  iconName: 'upload'    },
    ]},
    { id: 'reports', label: 'Reports', items: [
      { id: 'analytics',     label: 'Analytics',     iconName: 'chart'     },
      { id: 'audit-log',     label: 'Audit Log',     iconName: 'clock'     },
    ]},
    { id: 'admin', label: 'Admin', items: [
      { id: 'users',         label: 'Users',         iconName: 'users'     },
      { id: 'settings',      label: 'Settings',      iconName: 'settings'  },
    ]},
  ];

  userMenu: SolifiUserMenuItem[] = [
    { id: 'profile',  label: 'My Profile', iconName: 'user'                   },
    { id: 'settings', label: 'Settings',   iconName: 'settings'               },
    { id: 'logout',   label: 'Logout',     iconName: 'logout', divider: true  },
  ];

  // Note: header uses its own item shape (label/icon/action) — separate from
  // the sidebar's SolifiUserMenuItem (id/label/iconName).
  headerMenu: UserMenuItem[] = [
    { label: 'My Profile', action: 'profile'  },
    { label: 'Settings',   action: 'settings' },
    { label: 'Logout',     action: 'logout', danger: true },
  ];

  get activeLabel(): string {
    return this.navGroups.flatMap(g => g.items).find(i => i.id === this.activeId)?.label ?? '';
  }

  onNav(item: SolifiNavItem)           { this.activeId = item.id; }
  onUserMenu(item: SolifiUserMenuItem) { console.log('User menu:', item.label); }
  onHeaderSearch(query: string)        { console.log('Header search:', query); }
}`;

  fwReactCode = `// After loading pui-elements.js (Web Components bundle):
import { useEffect, useRef, useState } from 'react';

const SOLIFI_THEME = { bg: '#112C35', textColor: '#8fa3bc', activeColor: '#12C6A8' };

const NAV_GROUPS = [
  { id: 'trading', label: 'Trading', items: [
    { id: 'portfolio',   label: 'Portfolio',   iconName: 'chart'        },
    { id: 'positions',   label: 'Positions',   iconName: 'database'     },
    { id: 'risk',        label: 'Risk',        iconName: 'check-circle' },
    { id: 'settlements', label: 'Settlements', iconName: 'dollar'       },
  ]},
  { id: 'admin', label: 'Admin', items: [
    { id: 'reports',     label: 'Reports',     iconName: 'inbox'        },
    { id: 'settings',    label: 'Settings',    iconName: 'settings'     },
  ]},
];

const USER_MENU = [
  { id: 'profile',  label: 'My Profile', iconName: 'user'                   },
  { id: 'api-keys', label: 'API Keys',   iconName: 'settings'               },
  { id: 'logout',   label: 'Sign Out',   iconName: 'logout', divider: true  },
];

// Header uses its own item shape (label/icon/action) — separate from the
// sidebar's user-menu items (id/label/iconName).
const HEADER_MENU = [
  { label: 'My Profile', action: 'profile'  },
  { label: 'API Keys',   action: 'api-keys' },
  { label: 'Sign Out',   action: 'logout', danger: true },
];

const ALL_ITEMS = NAV_GROUPS.flatMap(g => g.items);

export function AppShell({ children }) {
  const shellRef = useRef(null);
  const [activeId, setActiveId] = useState('portfolio');

  const pageTitle = ALL_ITEMS.find(i => i.id === activeId)?.label ?? '';

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    el.groups         = NAV_GROUPS;
    el.theme          = SOLIFI_THEME;
    el.userMenuItems  = USER_MENU;
    el.headerMenuItems = HEADER_MENU;
    const onNav = (e) => setActiveId(e.detail.id);
    const onSearch = (e) => console.log('Header search:', e.detail);
    el.addEventListener('itemSelect', onNav);
    el.addEventListener('headerSearchQuery', onSearch);
    return () => {
      el.removeEventListener('itemSelect', onNav);
      el.removeEventListener('headerSearchQuery', onSearch);
    };
  }, []);

  // Update pageTitle attribute whenever active item changes
  useEffect(() => {
    if (shellRef.current) shellRef.current.setAttribute('page-title', pageTitle);
  }, [pageTitle]);

  return (
    <pui-lib-app-shell
      ref={shellRef}
      brand-name="FlexFleet"
      logo-url="/assets/logo.png"
      active-id={activeId}
      page-title={pageTitle}
      footer-text="Copyright © 2026 FlexFleet. All Rights Reserved."
      show-user
      user-name="Jordan Wells"
      user-email="jwells@flexfleet.io"
      show-header
      header-app-title="FlexFleet"
      header-app-subtitle="Operations Portal"
      header-logo-url="/assets/logo-full.png"
      header-user-name="Jordan Wells"
      header-user-email="jwells@flexfleet.io">

      {/* Your page content — shell provides sidebar, header, title bar & footer */}
      {children}

    </pui-lib-app-shell>
  );
}`;

  fwHtmlCode = `<!-- 1. Load the Web Components bundle once -->
<script src="pui-elements.js"></script>

<!-- 2. App shell owns sidebar + optional header + title bar + scrollable content + footer -->
<pui-lib-app-shell
  id="shell"
  brand-name="Meridian"
  logo-url="assets/logo.png"
  page-title="Dashboard"
  footer-text="Copyright © 2026 Meridian Finance. All Rights Reserved."
  show-user
  user-name="Alex Morgan"
  user-email="amorgan@meridian.com"
  show-header
  header-app-title="Meridian Finance"
  header-app-subtitle="Client Portal"
  header-logo-url="assets/logo-full.png"
  header-user-name="Alex Morgan"
  header-user-email="amorgan@meridian.com">

  <!-- 3. Only YOUR content goes here -->
  <div class="welcome-card">
    <h2>Welcome back, Alex!</h2>
    <p>Your Account Manager is: <a href="#">Alan Jasenovic</a></p>
    <p>You last logged in on Monday, 11 December 2025 12:41</p>
  </div>

</pui-lib-app-shell>

<script>
  customElements.whenDefined('pui-lib-app-shell').then(() => {
    const shell = document.getElementById('shell');

    const NAV_GROUPS = [
      { id: 'operations', label: 'Operations', items: [
        { id: 'dashboard',  label: 'Dashboard',  iconName: 'dashboard' },
        { id: 'contracts',  label: 'Contracts',  iconName: 'file'      },
        { id: 'payments',   label: 'Payments',   iconName: 'dollar'    },
        { id: 'documents',  label: 'Documents',  iconName: 'inbox'     },
      ]},
      { id: 'admin', label: 'Admin', items: [
        { id: 'users',    label: 'Users',    iconName: 'users'    },
        { id: 'settings', label: 'Settings', iconName: 'settings' },
      ]},
    ];

    const ALL_ITEMS = NAV_GROUPS.flatMap(g => g.items);

    shell.groups = NAV_GROUPS;
    shell.theme  = { bg: '#112C35', textColor: '#8fa3bc', activeColor: '#12C6A8' };
    shell.userMenuItems = [
      { id: 'profile',  label: 'My Profile', iconName: 'user'                   },
      { id: 'settings', label: 'Settings',   iconName: 'settings'               },
      { id: 'logout',   label: 'Logout',     iconName: 'logout', divider: true  },
    ];

    // Header uses its own item shape (label/icon/action)
    shell.headerMenuItems = [
      { label: 'My Profile', action: 'profile'  },
      { label: 'Settings',   action: 'settings' },
      { label: 'Logout',     action: 'logout', danger: true },
    ];

    // Update title bar when nav item is clicked
    shell.addEventListener('itemSelect', (e) => {
      shell.activeId   = e.detail.id;
      shell.pageTitle  = e.detail.label;
    });

    shell.addEventListener('headerSearchQuery', (e) => {
      console.log('Header search:', e.detail);
    });
  });
</script>`;

  angularCode = `import { PuiAppShellComponent, SolifiNavGroup, SolifiUserMenuItem, UserMenuItem, SOLIFI_THEME } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiAppShellComponent],
  // pui-lib-app-shell owns the whole layout: sidebar + optional header +
  // title bar + scrollable content + footer. Set [showHeader]="false" for
  // a flat layout with no header bar.
  template: \`
    <pui-lib-app-shell
      brandName="solifi"
      logoUrl="assets/logo.png"
      [groups]="navGroups"
      [activeId]="activeId"
      [theme]="SOLIFI_THEME"
      [showUser]="true"
      userName="Rosanna Doyle"
      userEmail="rdoyle@solifi.com"
      [userMenuItems]="userMenu"
      [showHeader]="true"
      headerAppTitle="Uptown Trucking Leasing"
      headerAppSubtitle="Digital Experience Portal"
      headerLogoUrl="assets/logo-full.png"
      headerUserName="Rosanna Doyle"
      headerUserEmail="rdoyle@solifi.com"
      [headerMenuItems]="headerMenu"
      (itemSelect)="onNav($event)"
      (userMenuSelect)="onUserMenu($event)">

      <!-- Only YOUR page content goes here -->
      <router-outlet />

    </pui-lib-app-shell>
  \`
})
export class AppComponent {
  activeId = 'borrowing-base';
  navGroups: SolifiNavGroup[] = [...];
  userMenu: SolifiUserMenuItem[] = [
    { id: 'profile',  label: 'My Profile', iconName: 'user'     },
    { id: 'settings', label: 'Settings',   iconName: 'settings' },
    { id: 'logout',   label: 'Logout',     iconName: 'logout', divider: true },
  ];

  // Header uses its own item shape (label/icon/action)
  headerMenu: UserMenuItem[] = [
    { label: 'My Profile', action: 'profile'  },
    { label: 'Settings',   action: 'settings' },
    { label: 'Logout',     action: 'logout', danger: true },
  ];
}`;

  api: ApiRow[] = [
    { input: 'groups',         type: 'SolifiNavGroup[]',        default: '[]',            description: 'Navigation groups. Items support iconName, icon (SVG), or text-only.' },
    { input: 'activeId',       type: 'string',                  default: "''",             description: 'ID of the currently active nav item.' },
    { input: 'brandName',      type: 'string',                  default: "'solifi'",       description: 'Brand name shown next to logo in expanded state.' },
    { input: 'logoUrl',        type: 'string',                  default: "''",             description: 'Image URL for the logo (e.g. assets/logo.png).' },
    { input: 'logo',           type: 'string (SVG/HTML)',        default: 'default',        description: 'Raw HTML logo fallback when logoUrl is not set.' },
    { input: 'showBrand',      type: 'boolean | string',        default: 'true',           description: 'Show/hide the sidebar\'s own logo section (expanded and collapsed states). Independent of showHeader.' },
    { input: 'collapsed',      type: 'boolean',                 default: 'false',          description: 'Collapse sidebar to 64px icon-only rail.' },
    { input: 'showUser',       type: 'boolean',                 default: 'false',          description: 'Show user profile section at the bottom.' },
    { input: 'userName',       type: 'string',                  default: "''",             description: 'Full name in user profile footer.' },
    { input: 'userEmail',      type: 'string',                  default: "''",             description: 'Email shown under user name.' },
    { input: 'userInitials',   type: 'string',                  default: "''",             description: 'Avatar initials — auto-derived from userName if empty.' },
    { input: 'userAvatarUrl',  type: 'string',                  default: "''",             description: 'Avatar photo URL. Falls back to initials bubble.' },
    { input: 'userMenuItems',  type: 'SolifiUserMenuItem[]',    default: '[]',             description: 'Profile popup menu items. Shown when user profile strip is clicked.' },
    { input: 'theme',          type: 'SolifiSidebarTheme',      default: 'SOLIFI_THEME',   description: 'Full color token object. Use SOLIFI_THEME preset.' },
    { input: 'width',          type: 'number',                  default: '240',            description: 'Expanded width in px.' },
    { input: 'collapsedWidth', type: 'number',                  default: '64',             description: 'Collapsed rail width in px.' },
    { input: 'itemSelect',     type: 'EventEmitter<SolifiNavItem>',      default: '—', description: 'Fires on nav item click.' },
    { input: 'collapsedChange',type: 'EventEmitter<boolean>',            default: '—', description: 'Fires when collapsed state toggles.' },
    { input: 'userMenuSelect', type: 'EventEmitter<SolifiUserMenuItem>', default: '—', description: 'Fires when a user profile menu item is selected.' },

    // ── Header (optional) ──────────────────────────────────────────────
    { input: 'showHeader',           type: 'boolean | string',     default: 'true',    description: 'Show the top header bar. Set false for a flat layout — sidebar + content only, no header.' },
    { input: 'headerAppTitle',       type: 'string',               default: "''",      description: 'Header title text.' },
    { input: 'headerAppSubtitle',    type: 'string',                default: "''",      description: 'Header subtitle text, shown after a "|" separator.' },
    { input: 'headerLogoUrl',        type: 'string',                default: "''",      description: 'Header logo image URL — rendered in its own white panel.' },
    { input: 'headerLogoText',       type: 'string',                default: "''",      description: 'Text label shown next to the header logo image, if not baked into the image.' },
    { input: 'headerBgColor',        type: 'string',                default: "'var(--pui-header-bg)'",   description: 'Header background colour — defaults to the theme token (teal old theme, tan new theme).' },
    { input: 'headerTextColor',      type: 'string',                default: "'var(--pui-header-text)'", description: 'Header text colour.' },
    { input: 'showHeaderLogo',       type: 'boolean | string',      default: 'true',    description: 'Show/hide the header logo section.' },
    { input: 'showHeaderHeading',    type: 'boolean | string',      default: 'true',    description: 'Show/hide the header title/subtitle section.' },
    { input: 'showHeaderSearch',     type: 'boolean | string',      default: 'true',    description: 'Show/hide the header search button — expands inline in the header when clicked.' },
    { input: 'showHeaderUser',       type: 'boolean | string',      default: 'true',    description: 'Show/hide the header avatar area (independent of the sidebar’s own showUser).' },
    { input: 'headerAvatarMode',     type: `'menu'|'plain'`,        default: "'menu'",  description: 'Header avatar style — menu = name/email + dropdown, plain = round chip only.' },
    { input: 'headerUserName',       type: 'string',                default: "''",      description: 'Name shown in the header avatar area.' },
    { input: 'headerUserEmail',      type: 'string',                default: "''",      description: 'Email shown in the header avatar dropdown (menu mode only).' },
    { input: 'headerAvatarUrl',      type: 'string',                default: "''",      description: 'Header avatar photo URL — falls back to initials.' },
    { input: 'headerMenuItems',      type: 'UserMenuItem[] | string', default: '[]',    description: 'Header avatar dropdown items (menu mode only).' },
    { input: 'headerBadge',          type: 'HeaderBadge | string',  default: 'null',    description: 'Environment badge shown in the header (e.g. UAT/PROD).' },
    { input: 'headerSearchQuery',    type: 'EventEmitter<string>',  default: '—',       description: 'Fires as the user types in the header’s inline search field.' },
    { input: 'headerMenuAction',     type: 'EventEmitter<string>',  default: '—',       description: 'Fires when a header avatar dropdown item is clicked.' },
  ];
}
