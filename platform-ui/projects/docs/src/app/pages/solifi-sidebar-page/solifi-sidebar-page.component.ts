import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  PuiSolifiSidebarComponent,
  SolifiNavGroup, SolifiNavItem, SolifiSidebarTheme, SolifiUserMenuItem, SOLIFI_THEME,
} from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';


/** Nav items using platform-ui iconName (from ICON_REGISTRY) */
const NAV_GROUPS: SolifiNavGroup[] = [
  {
    id: 'dashboard', label: 'Dashboard',
    items: [
      { id: 'insights',        label: 'Insights',         iconName: 'search'    },
      { id: 'recent',          label: 'Recent',           iconName: 'clock'     },
      { id: 'reports',         label: 'Reports',          iconName: 'chart'     },
      { id: 'upload-files',    label: 'Upload Files',     iconName: 'upload'    },
      { id: 'loan-ledger',     label: 'Loan Ledger',      iconName: 'file'      },
      { id: 'posting-history', label: 'Posting History',  iconName: 'calendar'  },
      { id: 'interest-history',label: 'Interest History', iconName: 'dollar'    },
      { id: 'statements',      label: 'Statements',       iconName: 'inbox'     },
    ],
  },
  {
    id: 'codat', label: 'Codat',
    items: [
      { id: 'posting-status', label: 'Posting Status', iconName: 'check-circle' },
      { id: 'loan-status',    label: 'Loan Status',    iconName: 'database'     },
    ],
  },
  {
    id: 'user-setup', label: 'User Setup',
    items: [
      { id: 'users',    label: 'Users',    iconName: 'users'    },
      { id: 'settings', label: 'Settings', iconName: 'settings' },
    ],
  },
];

/** Same groups but text-only (no icon, no iconName) */
const NAV_GROUPS_TEXT_ONLY: SolifiNavGroup[] = NAV_GROUPS.map(g => ({
  ...g,
  items: g.items.map(({ iconName: _, ...rest }) => rest as SolifiNavItem),
}));

@Component({
  selector: 'docs-solifi-sidebar-page',
  standalone: true,
  imports: [NgIf,PuiSolifiSidebarComponent, DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solifi-sidebar-page.component.html',
  styleUrls: ['./solifi-sidebar-page.component.scss'],
})
export class SolifiSidebarPageComponent { // v2

  private cdr = inject(ChangeDetectorRef);

  activeId   = 'insights';
  collapsed  = false;
  showUser   = true;
  iconMode: 'with-icons' | 'no-icons' | 'icons-only' = 'with-icons';
  theme: SolifiSidebarTheme = { ...SOLIFI_THEME };
  logoUrl   = 'assets/logo.png';
  brandName = 'insights hub';

  userMenuItems: SolifiUserMenuItem[] = [
    { id: 'profile',  label: 'My Profile',    iconName: 'user'     },
    { id: 'settings', label: 'Settings',       iconName: 'settings' },
    { id: 'logout',   label: 'Logout',         iconName: 'logout',  divider: true },
  ];

  lastUserMenuAction = '';

  get navGroups(): SolifiNavGroup[] {
    return this.iconMode === 'no-icons' ? NAV_GROUPS_TEXT_ONLY : NAV_GROUPS;
  }

  onNav(item: SolifiNavItem): void {
    this.activeId = item.id;
    this.cdr.markForCheck();
  }
  onCollapsed(v: boolean): void { this.collapsed = v; this.cdr.markForCheck(); }
  toggleUser(): void { this.showUser = !this.showUser; this.cdr.markForCheck(); }
  onUserMenu(item: SolifiUserMenuItem): void {
    this.lastUserMenuAction = item.label;
    this.cdr.markForCheck();
  }
  setMode(m: 'with-icons' | 'no-icons' | 'icons-only'): void {
    this.iconMode = m;
    this.cdr.markForCheck();
  }

  get pageTitle(): string {
    return NAV_GROUPS.flatMap(g => g.items).find(i => i.id === this.activeId)?.label ?? 'Insights';
  }

  angularCode = `import { PuiSolifiSidebarComponent, SolifiNavGroup, SOLIFI_THEME } from '@bhairab-patra/platform-ui';

// With platform-ui icon names (recommended)
navGroups: SolifiNavGroup[] = [
  { id: 'main', label: 'Dashboard', items: [
    { id: 'insights', label: 'Insights', iconName: 'search'   },
    { id: 'recent',   label: 'Recent',   iconName: 'clock'    },
    { id: 'settings', label: 'Settings', iconName: 'settings' },
  ]},
];

// Or with raw SVG strings (fallback)
{ id: 'home', label: 'Home', icon: '<svg>...</svg>' }

// Or text-only (no icon property)
{ id: 'home', label: 'Home' }`;

  angularTpl = `<pui-lib-solifi-sidebar
  brandName="insights hub"
  [logo]="logoSvg"
  [groups]="navGroups"
  [activeId]="activeId"
  [collapsed]="collapsed"
  [theme]="SOLIFI_THEME"
  [showUser]="true"
  userName="Allen M. George"
  userEmail="ageorge@meridian.com"
  [width]="240"
  [collapsedWidth]="64"
  (itemSelect)="onNav($event)"
  (collapsedChange)="collapsed = $event">
</pui-lib-solifi-sidebar>`;

  reactCode = `// After loading pui-elements.js bundle:
<pui-lib-solifi-sidebar
  id="sb"
  brand-name="insights hub"
  show-user
  user-name="Allen M. George"
  user-email="ageorge@meridian.com">
</pui-lib-solifi-sidebar>

<script>
  customElements.whenDefined('pui-lib-solifi-sidebar').then(() => {
    const el = document.getElementById('sb');
    el.groups = [
      { id: 'main', label: 'Dashboard', items: [
        { id: 'insights', label: 'Insights', iconName: 'search'   },
        { id: 'recent',   label: 'Recent',   iconName: 'clock'    },
        { id: 'settings', label: 'Settings', iconName: 'settings' },
      ]},
    ];
    el.theme = SOLIFI_THEME;
    el.addEventListener('itemSelect', e => console.log(e.detail));
  });
</script>`;

  api: ApiRow[] = [
    { input: 'groups',         type: 'SolifiNavGroup[]|string', default: '[]',            description: 'Nav groups. Items can use iconName (platform-ui), icon (raw SVG), or neither (text-only).' },
    { input: 'activeId',       type: 'string',                  default: "''",             description: 'Currently active item id.' },
    { input: 'brandName',      type: 'string',                  default: "'solifi'",       description: 'Brand name shown next to logo in expanded state.' },
    { input: 'logo',           type: 'string (SVG/HTML)',        default: 'default',        description: 'Logo HTML. Defaults to hexagon Solifi mark.' },
    { input: 'collapsed',      type: 'boolean|string',          default: 'false',          description: 'Collapse to icon-only rail.' },
    { input: 'showSidebar',    type: 'boolean|string',          default: 'true',           description: 'Hide sidebar entirely (e.g. mobile).' },
    { input: 'width',          type: 'number',                  default: '240',            description: 'Expanded width in px.' },
    { input: 'collapsedWidth', type: 'number',                  default: '64',             description: 'Collapsed icon-rail width in px.' },
    { input: 'theme',          type: 'SolifiSidebarTheme|string', default: 'SOLIFI_THEME', description: 'Color token object. Use SOLIFI_THEME preset or provide custom values.' },
    { input: 'bgColor',        type: 'string',                  default: '#112C35',        description: 'Quick background color override.' },
    { input: 'textColor',      type: 'string',                  default: '#8fa3bc',        description: 'Quick text color override.' },
    { input: 'activeColor',    type: 'string',                  default: '#12C6A8',        description: 'Quick active/accent color override.' },
    { input: 'showUser',       type: 'boolean|string',          default: 'false',          description: 'Show user profile section at the bottom.' },
    { input: 'userName',       type: 'string',                  default: "''",             description: 'Full name in user profile footer.' },
    { input: 'userEmail',      type: 'string',                  default: "''",             description: 'Email shown under user name.' },
    { input: 'userInitials',   type: 'string',                  default: "''",             description: 'Avatar initials (auto-derived from userName if empty).' },
    { input: 'userAvatarUrl',  type: 'string',                  default: "''",             description: 'Avatar photo URL. Falls back to initials bubble.' },
    { input: 'itemSelect',     type: 'EventEmitter<SolifiNavItem>', default: '—',          description: 'Fires on nav item click.' },
    { input: 'collapsedChange',type: 'EventEmitter<boolean>',   default: '—',              description: 'Fires when collapsed state changes.' },
  ];
}
