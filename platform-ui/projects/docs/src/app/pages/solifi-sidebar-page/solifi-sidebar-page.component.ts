import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  PuiSolifiSidebarComponent,
  SolifiNavGroup, SolifiNavItem, SolifiSidebarTheme, SolifiUserMenuItem, SOLIFI_THEME,
} from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';


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
      { id: 'interest-history',label: 'Interest History & Reconciliation', iconName: 'dollar' },
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
  imports: [NgIf, PuiSolifiSidebarComponent, DocPageComponent, FrameworkPreviewComponent],
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

  fwAngularCode = `import { PuiSolifiSidebarComponent, SolifiNavGroup, SOLIFI_THEME } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiSolifiSidebarComponent],
  template: \`
    <div style="display:flex;height:100vh">
      <pui-lib-solifi-sidebar
        [brandName]="brandName"
        [logoUrl]="logoUrl"
        [groups]="navGroups"
        [activeId]="activeId"
        [theme]="SOLIFI_THEME"
        [showUser]="true"
        [userName]="user.name"
        [userEmail]="user.email"
        [userMenuItems]="userMenu"
        (itemSelect)="onNav($event)"
        (collapsedChange)="collapsed = $event"
        (userMenuSelect)="onUserMenu($event)">
      </pui-lib-solifi-sidebar>
      <main style="flex:1;overflow:auto;padding:24px">
        <router-outlet />
      </main>
    </div>
  \`
})
export class AppComponent {
  brandName = 'insights hub';
  logoUrl = 'assets/logo.png';
  activeId = 'insights';
  collapsed = false;
  theme = SOLIFI_THEME;

  user = { name: 'Allen M. George', email: 'ageorge@meridian.com' };

  navGroups: SolifiNavGroup[] = [
    { id: 'dashboard', label: 'Dashboard', items: [
      { id: 'insights', label: 'Insights', iconName: 'search'  },
      { id: 'recent',   label: 'Recent',   iconName: 'clock'   },
      { id: 'reports',  label: 'Reports',  iconName: 'chart'   },
    ]},
    { id: 'user-setup', label: 'User Setup', items: [
      { id: 'users',    label: 'Users',    iconName: 'users'    },
      { id: 'settings', label: 'Settings', iconName: 'settings' },
    ]},
  ];

  userMenu = [
    { id: 'profile',  label: 'My Profile', iconName: 'user'     },
    { id: 'settings', label: 'Settings',   iconName: 'settings' },
    { id: 'logout',   label: 'Logout',     iconName: 'logout',  divider: true },
  ];

  onNav(item: SolifiNavItem)           { this.activeId = item.id; }
  onUserMenu(item: SolifiUserMenuItem) { console.log('User menu:', item.label); }
}`;

  fwReactCode = `// After loading pui-elements.js Web Components bundle
import { useEffect, useRef, useState } from 'react';

const SOLIFI_THEME = { bg:'#112C35', textColor:'#8fa3bc', activeColor:'#12C6A8' };

const navGroups = [
  { id: 'dashboard', label: 'Dashboard', items: [
    { id: 'insights', label: 'Insights', iconName: 'search' },
    { id: 'recent',   label: 'Recent',   iconName: 'clock'  },
    { id: 'reports',  label: 'Reports',  iconName: 'chart'  },
  ]},
  { id: 'user-setup', label: 'User Setup', items: [
    { id: 'users',    label: 'Users',    iconName: 'users'    },
    { id: 'settings', label: 'Settings', iconName: 'settings' },
  ]},
];

export function AppLayout() {
  const sidebarRef = useRef(null);
  const [activeId, setActiveId] = useState('insights');

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    el.groups = navGroups;
    el.theme = SOLIFI_THEME;
    el.userMenuItems = [
      { id: 'profile',  label: 'My Profile', iconName: 'user'     },
      { id: 'settings', label: 'Settings',   iconName: 'settings' },
      { id: 'logout',   label: 'Logout',     iconName: 'logout',  divider: true },
    ];
    const onNav = (e) => setActiveId(e.detail.id);
    el.addEventListener('itemSelect', onNav);
    return () => el.removeEventListener('itemSelect', onNav);
  }, []);

  return (
    <div style={{ display:'flex', height:'100vh' }}>
      <pui-lib-solifi-sidebar
        ref={sidebarRef}
        brand-name="insights hub"
        logo-url="/assets/logo.png"
        active-id={activeId}
        show-user
        user-name="Allen M. George"
        user-email="ageorge@meridian.com"
      />
      <main style={{ flex:1, overflow:'auto', padding:24 }}>
        {/* page content */}
      </main>
    </div>
  );
}`;

  fwHtmlCode = `<!-- 1. Load the Web Components bundle once -->
<script src="pui-elements.js"></script>

<!-- 2. Shell layout -->
<div style="display:flex;height:100vh">
  <pui-lib-solifi-sidebar
    id="sidebar"
    brand-name="insights hub"
    logo-url="assets/logo.png"
    show-user
    user-name="Allen M. George"
    user-email="ageorge@meridian.com">
  </pui-lib-solifi-sidebar>

  <main style="flex:1;overflow:auto;padding:24px">
    <!-- your page content here -->
  </main>
</div>

<!-- 3. Wire data after element registers -->
<script>
  customElements.whenDefined('pui-lib-solifi-sidebar').then(() => {
    const sb = document.getElementById('sidebar');

    sb.groups = [
      { id: 'dashboard', label: 'Dashboard', items: [
        { id: 'insights', label: 'Insights', iconName: 'search' },
        { id: 'recent',   label: 'Recent',   iconName: 'clock'  },
        { id: 'reports',  label: 'Reports',  iconName: 'chart'  },
      ]},
    ];

    sb.theme = { bg:'#112C35', textColor:'#8fa3bc', activeColor:'#12C6A8' };

    sb.userMenuItems = [
      { id: 'profile',  label: 'My Profile', iconName: 'user'     },
      { id: 'settings', label: 'Settings',   iconName: 'settings' },
      { id: 'logout',   label: 'Logout',     iconName: 'logout',  divider: true },
    ];

    sb.addEventListener('itemSelect', (e) => {
      console.log('Navigated to:', e.detail.label);
      sb.activeId = e.detail.id;
    });
  });
</script>`;

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
