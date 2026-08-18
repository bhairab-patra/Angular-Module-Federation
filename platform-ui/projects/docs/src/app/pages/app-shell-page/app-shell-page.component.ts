import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  PuiSolifiSidebarComponent,
  SolifiNavGroup, SolifiNavItem, SolifiSidebarTheme, SolifiUserMenuItem, SOLIFI_THEME,
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
      { id: 'ineligibles',      label: 'Indkg Due & Reserves',   iconName: 'inbox'      },
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
  imports: [NgIf, PuiSolifiSidebarComponent, DocPageComponent, FrameworkPreviewComponent],
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

  lastUserAction = '';

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

  fwAngularCode = `import { PuiAppShellComponent, SolifiNavGroup, SolifiNavItem, SolifiUserMenuItem, SOLIFI_THEME } from '@bhairab-patra/platform-ui';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [PuiAppShellComponent, RouterOutlet],
  template: \`
    <pui-lib-app-shell
      brandName="solifi"
      logoUrl="assets/logo.png"
      [groups]="navGroups"
      [activeId]="activeId"
      [theme]="theme"
      [showUser]="true"
      userName="Rosanna Doyle"
      userEmail="rdoyle@solifi.com"
      [userMenuItems]="userMenu"
      (itemSelect)="onNav($event)"
      (collapsedChange)="collapsed = $event"
      (userMenuSelect)="onUserMenu($event)">

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

  onNav(item: SolifiNavItem)           { this.activeId = item.id; }
  onUserMenu(item: SolifiUserMenuItem) { console.log('User menu:', item.label); }
}`;

  fwReactCode = `// After loading pui-elements.js (Web Components bundle):
import { useEffect, useRef, useState } from 'react';

const SOLIFI_THEME = { bg: '#112C35', textColor: '#8fa3bc', activeColor: '#12C6A8' };

// React app uses a finance-focused flat nav (no group headers)
const navItems = [
  { id: 'portfolio',   label: 'Portfolio',   iconName: 'chart'        },
  { id: 'positions',   label: 'Positions',   iconName: 'database'     },
  { id: 'risk',        label: 'Risk',        iconName: 'check-circle' },
  { id: 'settlements', label: 'Settlements', iconName: 'dollar'       },
  { id: 'reports',     label: 'Reports',     iconName: 'inbox'        },
];

const userMenuItems = [
  { id: 'profile',    label: 'My Profile',   iconName: 'user'                   },
  { id: 'api-keys',   label: 'API Keys',     iconName: 'settings'               },
  { id: 'logout',     label: 'Sign Out',     iconName: 'logout', divider: true  },
];

export function AppShell({ children }) {
  const shellRef = useRef(null);
  const [activeId, setActiveId] = useState('portfolio');

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    el.groups      = navItems;       // flat SolifiNavItem[] — auto-detected
    el.theme       = SOLIFI_THEME;
    el.userMenuItems = userMenuItems;
    const onNav = (e) => setActiveId(e.detail.id);
    el.addEventListener('itemSelect', onNav);
    return () => el.removeEventListener('itemSelect', onNav);
  }, []);

  return (
    <pui-lib-app-shell
      ref={shellRef}
      brand-name="FlexFleet"
      logo-url="/assets/logo.png"
      active-id={activeId}
      show-user
      user-name="Jordan Wells"
      user-email="jwells@flexfleet.io">
      {children}
    </pui-lib-app-shell>
  );
}`;

  fwHtmlCode = `<!-- Load the Web Components bundle once in your page -->
<script src="pui-elements.js"></script>

<pui-lib-app-shell
  id="shell"
  brand-name="Meridian"
  logo-url="assets/logo.png"
  show-user
  user-name="Alex Morgan"
  user-email="amorgan@meridian.com">

  <div id="page-content" style="padding:24px">
    <!-- your page content here -->
  </div>

</pui-lib-app-shell>

<script>
  customElements.whenDefined('pui-lib-app-shell').then(() => {
    const shell = document.getElementById('shell');

    shell.groups = [
      { id: 'operations', label: 'Operations', items: [
        { id: 'dashboard',  label: 'Dashboard',  iconName: 'dashboard' },
        { id: 'contracts',  label: 'Contracts',  iconName: 'file'      },
        { id: 'payments',   label: 'Payments',   iconName: 'dollar'    },
        { id: 'documents',  label: 'Documents',  iconName: 'inbox'     },
      ]},
      { id: 'admin', label: 'Admin', items: [
        { id: 'users',      label: 'Users',      iconName: 'users'     },
        { id: 'settings',   label: 'Settings',   iconName: 'settings'  },
      ]},
    ];

    shell.theme = { bg: '#112C35', textColor: '#8fa3bc', activeColor: '#12C6A8' };

    shell.userMenuItems = [
      { id: 'profile',  label: 'My Profile', iconName: 'user'                   },
      { id: 'settings', label: 'Settings',   iconName: 'settings'               },
      { id: 'logout',   label: 'Logout',     iconName: 'logout', divider: true  },
    ];

    shell.addEventListener('itemSelect', (e) => {
      console.log('Navigated to:', e.detail.label);
      shell.activeId = e.detail.id;
    });
  });
</script>`;

  angularCode = `import { PuiSolifiSidebarComponent, SolifiNavGroup, SOLIFI_THEME } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiSolifiSidebarComponent],
  template: \`
    <div class="shell">
      <pui-lib-solifi-sidebar
        brandName="solifi"
        logoUrl="assets/logo.png"
        [groups]="navGroups"
        [activeId]="activeId"
        [theme]="SOLIFI_THEME"
        [showUser]="true"
        userName="Rosanna Doyle"
        userEmail="rdoyle@solifi.com"
        [userMenuItems]="userMenu"
        (itemSelect)="onNav($event)"
        (userMenuSelect)="onUserMenu($event)">
      </pui-lib-solifi-sidebar>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  \`
})
export class AppComponent {
  activeId = 'borrowing-base';
  navGroups: SolifiNavGroup[] = [...];
  userMenu = [
    { id: 'profile',  label: 'My Profile', iconName: 'user'     },
    { id: 'settings', label: 'Settings',   iconName: 'settings' },
    { id: 'logout',   label: 'Logout',     iconName: 'logout', divider: true },
  ];
}`;

  api: ApiRow[] = [
    { input: 'groups',         type: 'SolifiNavGroup[]',        default: '[]',            description: 'Navigation groups. Items support iconName, icon (SVG), or text-only.' },
    { input: 'activeId',       type: 'string',                  default: "''",             description: 'ID of the currently active nav item.' },
    { input: 'brandName',      type: 'string',                  default: "'solifi'",       description: 'Brand name shown next to logo in expanded state.' },
    { input: 'logoUrl',        type: 'string',                  default: "''",             description: 'Image URL for the logo (e.g. assets/logo.png).' },
    { input: 'logo',           type: 'string (SVG/HTML)',        default: 'default',        description: 'Raw HTML logo fallback when logoUrl is not set.' },
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
  ];
}
