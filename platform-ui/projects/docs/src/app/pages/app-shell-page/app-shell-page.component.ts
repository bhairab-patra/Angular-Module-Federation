import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  PuiSolifiSidebarComponent,
  SolifiNavGroup, SolifiNavItem, SolifiSidebarTheme, SolifiUserMenuItem, SOLIFI_THEME,
} from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';

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
  imports: [NgIf, PuiSolifiSidebarComponent, DocPageComponent],
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
