import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  PuiAppShellComponent, PuiTabsComponent, TabItem,
  SolifiNavGroup, SolifiNavItem, SolifiSidebarTheme, SolifiUserMenuItem, SOLIFI_THEME,
  UserMenuItem,
  PuiAccordionComponent, AccordionItem,
} from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Builds a `.xfw-table`-styled reference table (that global class already
 * has full light/dark-safe styling) as an HTML string for use as an
 * AccordionItem's contentHtml — reads as a proper table instead of a wall
 * of bullet-separated prose. */
function refTable(
  rows: [name: string, type: string, def: string, desc: string][],
  headers: [string, string, string, string] = ['Property', 'Type', 'Default', 'What it does'],
): string {
  const head = headers.map(h => `<th>${escapeHtml(h)}</th>`).join('');
  const body = rows.map(([name, type, def, desc]) => `
    <tr>
      <td><code>${escapeHtml(name)}</code></td>
      <td><span class="tag-name">${escapeHtml(type)}</span></td>
      <td>${escapeHtml(def)}</td>
      <td>${escapeHtml(desc)}</td>
    </tr>`).join('');
  return `<div class="xfw-table-wrap"><table class="xfw-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

const NAV_GROUPS: SolifiNavGroup[] = [
  {
    id: 'dashboard', label: 'Dashboard',
    items: [
      { id: 'borrowing-base', label: 'Borrowing Base Posting', iconName: 'dashboard' },
      { id: 'upload-files', label: 'Upload Files', iconName: 'upload' },
      { id: 'loan-ledger', label: 'Loan Ledger', iconName: 'file' },
      { id: 'ineligibles', label: 'Ineligibles Due & Reserves', iconName: 'inbox' },
      { id: 'statements', label: 'Statements', iconName: 'database' },
      { id: 'reports', label: 'Reports', iconName: 'chart' },
      { id: 'posting-history', label: 'Posting History', iconName: 'clock' },
      { id: 'interest-history', label: 'Interest History', iconName: 'dollar' },
    ],
  },
  {
    id: 'cadet', label: 'Cadet',
    items: [
      { id: 'posting-status', label: 'Posting Status', iconName: 'check-circle' },
      { id: 'loan-status', label: 'Loan Status', iconName: 'credit-card' },
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
  imports: [NgIf, PuiAppShellComponent, PuiTabsComponent, PuiAccordionComponent, DocPageComponent, FrameworkPreviewComponent],
  templateUrl: './app-shell-page.component.html',
  styleUrls: ['./app-shell-page.component.scss'],
})
export class AppShellPageComponent {
  private cdr = inject(ChangeDetectorRef);

  navGroups = NAV_GROUPS;
  activeId = 'borrowing-base';
  collapsed = false;
  iconMode: 'with-icons' | 'no-icons' = 'with-icons';
  theme: SolifiSidebarTheme = { ...SOLIFI_THEME };

  /** Same items as navGroups, just without the group wrapper — proves
   * [sidebarGroups] accepts a flat SolifiNavItem[] too, live, not just in
   * a code sample. Own activeId so it doesn't interfere with the main demo. */
  navItems: SolifiNavItem[] = NAV_GROUPS.flatMap(g => g.items);
  shellFlatDemoActiveId = 'borrowing-base';
  onShellFlatDemoNav(item: SolifiNavItem): void {
    this.shellFlatDemoActiveId = item.id;
    this.cdr.markForCheck();
  }

  sidebarUserMenuItems: SolifiUserMenuItem[] = [
    { id: 'profile', label: 'My Profile', iconName: 'user' },
    { id: 'settings', label: 'Settings', iconName: 'settings' },
    { id: 'logout', label: 'Logout', iconName: 'logout', divider: true },
  ];

  headerMenuItems: UserMenuItem[] = [
    { label: 'My Profile', action: 'profile' },
    { label: 'Settings', action: 'settings' },
    { label: 'Logout', action: 'logout', danger: true },
  ];

  lastUserAction = '';
  lastHeaderQuery = '';
  demoShowHeader = true;

  /** Full input/output reference, grouped by what each group is responsible
   * for, rendered as a table per category instead of one giant flat table
   * or a wall of prose. Rendered as a Default-variant, icon-less accordion
   * below the demo. Property names match the prefixed API exactly:
   * sidebarX only ever touches the sidebar, headerX only ever touches
   * the header. */
  referenceItems: AccordionItem[] = [
    {
      id: 'ref-sidebar',
      title: 'Sidebar & Layout',
      content: '',
      contentHtml: refTable([
        ['sidebarGroups', 'SolifiNavGroup[]|SolifiNavItem[]', '[]', 'Nav items/groups in the sidebar — accepts a flat array or grouped array with section labels.'],
        ['sidebarActiveId', 'string', "''", 'Id of the currently highlighted nav item.'],
        ['sidebarBrandName / sidebarLogoUrl', 'string', "'solifi' / ''", "Sidebar's brand text and logo image."],
        ['showSidebarBrand', 'boolean|string', 'true', 'Show/hide the sidebar logo section entirely (expanded and collapsed).'],
        ['sidebarCollapsed', 'boolean|string', 'false', 'Collapses the sidebar to a 64px icon rail. Bind it two-way with (sidebarCollapsedChange) to stay in sync.'],
        ['showSidebar', 'boolean|string', 'true', 'Hides the sidebar completely, e.g. for a mobile flat layout.'],
        ['sidebarWidth / sidebarCollapsedWidth', 'number', '240 / 64', "Sidebar's expanded and collapsed pixel widths."],
        ['sidebarTheme', 'SolifiSidebarTheme|string', 'SOLIFI_THEME', 'Full sidebar colour-token object (background, text, active colours).'],
        ['pageTitle', 'string', "''", 'Shell-level (not sidebar or header specific) — title shown in the bar under the header.'],
        ['footerText', 'string', "''", 'Shell-level — text for the bottom footer bar; only renders when non-empty.'],
      ]),
    },
    {
      id: 'ref-user',
      title: 'Sidebar User Profile',
      content: '',
      contentHtml: refTable([
        ['showSidebarUser', 'boolean|string', 'false', 'Shows the user-profile strip at the bottom of the sidebar.'],
        ['sidebarUserName / sidebarUserEmail', 'string', "'' / ''", 'Name and email shown in that strip.'],
        ['sidebarUserInitials', 'string', "''", 'Avatar-bubble initials; auto-derived from sidebarUserName if left unset.'],
        ['sidebarUserAvatarUrl', 'string', "''", 'Avatar photo URL — falls back to the initials bubble when unset.'],
        ['sidebarUserMenuItems', 'SolifiUserMenuItem[]|string', '[]', "Dropdown items shown when the sidebar's user strip is clicked."],
      ]),
    },
    {
      id: 'ref-footer',
      title: 'Footer (optional rich footer)',
      content: '',
      contentHtml: refTable([
        ['showFooter', 'boolean|string', 'false', 'Renders the full pui-lib-footer component instead of the plain footerText bar. Only one footer ever renders at once — turning this on ignores footerText.'],
        ['footerVariant', `'contact'|'disclaimer'|'simple'`, "'simple'", 'Which footer layout to render — contact shows office-hours/address + CTA, disclaimer shows body text + "read more" link, simple shows just the copyright/links bar.'],
        ['footerNoticeSlides', 'FooterNoticeSlide[]|string', '[]', 'Rotating notice-card slides shown above the copyright bar (contact/disclaimer variants). Each slide only uses the fields its variant needs.'],
        ['footerActiveSlideIndex', 'number|string', '0', 'Index of the currently visible notice slide. Bind two-way with (footerActiveSlideIndexChange) to sync rotation state.'],
        ['footerCopyrightText', 'string', "'Copyright © {year} Solifi. All Rights Reserved.'", 'Copyright line shown in the footer bar. Independent of the shell-level footerText (that one is for the plain bar, this one is for the rich footer).'],
        ['footerLinks', 'FooterLink[]|string', '[]', 'Bottom-row links (label + href or action) — e.g. Privacy Policy, Terms of Service.'],
        ['footerPoweredByText', 'string', "'Powered by Solifi™'", 'Small "powered by" label shown alongside the copyright line.'],
        ['showFooterPoweredBy', 'boolean|string', 'true', 'Show/hide the "powered by" label entirely.'],
        ['footerStickyBottom', 'boolean|string', 'false', 'Pins the footer to the bottom of the viewport (position: fixed) instead of letting it flow after your page content. The shell auto-reserves space so content never sits underneath it.'],
        ['footerActiveSlideIndexChange', 'EventEmitter<number>', '—', 'Fires when the active notice slide changes (auto-rotation or manual nav).'],
        ['footerLinkClick', 'EventEmitter<FooterLink>', '—', 'Fires when a bottom-row footer link is clicked.'],
        ['footerContactClick', 'EventEmitter<FooterNoticeSlide>', '—', "Fires when the contact variant's call-to-action button is clicked."],
      ]),
    },
    {
      id: 'ref-header',
      title: 'Header (optional top bar)',
      content: '',
      contentHtml: refTable([
        ['showHeader', 'boolean|string', 'true', 'Master switch for the whole header. false = flat layout, no header bar.'],
        ['headerAppTitle / headerAppSubtitle', 'string', "'' / ''", "Header's title and subtitle text."],
        ['headerLogoUrl / headerLogoText', 'string', "'' / ''", "Header's own logo image and/or text label, independent of the sidebar logo."],
        ['headerBgColor / headerTextColor', 'string', 'theme tokens', 'Colour overrides — default to the current theme\'s header tokens.'],
        ['showHeaderLogo / showHeaderHeading / showHeaderSearch / showHeaderUser', 'boolean|string', 'true (each)', "Toggle each of the header's four sections on or off individually."],
        ['headerAvatarMode', `'menu'|'plain'`, "'menu'", '"menu" = name/email + dropdown, "plain" = round avatar chip only, no dropdown.'],
        ['headerUserName / headerUserEmail / headerAvatarUrl', 'string', "'' / '' / ''", "Header avatar's own identity — separate from the sidebar's sidebarUserName/sidebarUserEmail."],
        ['headerAvatarColor / headerAvatarTextColor', 'string', 'theme tokens', "Avatar chip's background and initials colour."],
        ['headerMenuItems', 'UserMenuItem[]|string', '[]', 'Header avatar dropdown items (menu mode only) — shape {label, icon, action}, not interchangeable with the sidebar\'s sidebarUserMenuItems.'],
        ['headerBadge', 'HeaderBadge|string|null', 'null', 'Optional environment badge (e.g. "UAT"/"PROD") shown in the header.'],
      ]),
    },
    {
      id: 'ref-events',
      title: 'Events (Outputs)',
      content: '',
      contentHtml: refTable([
        ['sidebarItemSelect', 'EventEmitter<SolifiNavItem>', '—', 'Fires when a sidebar nav item is clicked.'],
        ['sidebarCollapsedChange', 'EventEmitter<boolean>', '—', "Fires when the sidebar's collapse state toggles."],
        ['sidebarUserMenuSelect', 'EventEmitter<SolifiUserMenuItem>', '—', 'Fires when a sidebar user-menu item is clicked.'],
        ['headerSearchQuery', 'EventEmitter<string>', '—', "Fires as the user types in the header's inline search field."],
        ['headerMenuAction', 'EventEmitter<string>', '—', 'Fires when a header avatar dropdown item is clicked (only if headerMenuItems is set).'],
      ], ['Output', 'Emits', 'Default', 'What it does']),
    },
  ];
  referenceOpen: (string | number)[] = ['ref-sidebar'];

  onReferenceOpenChange(ids: (string | number)[]): void { this.referenceOpen = ids; this.cdr.markForCheck(); }

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

  /* ── Grouped (navGroups) vs Flat (navItems) ─────── */
  shellGroupsFlatTabs: TabItem[] = [
    { id: 'grouped', label: 'With Groups (navGroups)' },
    { id: 'flat',    label: 'Without Groups (navItems)' },
  ];
  shellGroupsFlatActive = 'grouped';

  setShellGroupsFlatTab(id: string): void {
    this.shellGroupsFlatActive = id;
    this.cdr.markForCheck();
  }

  shellGroupedTs = `import { PuiAppShellComponent, SolifiNavGroup, SolifiNavItem } from '@bhairab-patra/platform-ui';

// sidebarGroups renders a label above each cluster of items
navGroups: SolifiNavGroup[] = [
  {
    id: 'lending', label: 'Lending',
    items: [
      { id: 'loan-ledger',  label: 'Loan Ledger',  iconName: 'file'   },
      { id: 'repayments',   label: 'Repayments',   iconName: 'dollar' },
      { id: 'statements',   label: 'Statements',   iconName: 'inbox'  },
    ],
  },
  {
    id: 'admin', label: 'Admin',
    items: [
      { id: 'users',    label: 'Users',    iconName: 'users'    },
      { id: 'settings', label: 'Settings', iconName: 'settings' },
    ],
  },
];

onNav(item: SolifiNavItem) { this.activeId = item.id; }`;

  shellGroupedHtml = `<pui-lib-app-shell
  [sidebarGroups]="navGroups"
  [sidebarActiveId]="activeId"
  (sidebarItemSelect)="onNav($event)">
  <router-outlet />
</pui-lib-app-shell>`;

  shellFlatTs = `import { PuiAppShellComponent, SolifiNavItem } from '@bhairab-patra/platform-ui';

// Same sidebarGroups input — just pass a flat item array, no wrapper.
// No SolifiNavGroup, no group label rendered above them. The sidebar
// auto-detects a flat array (checks whether the first element has an
// "items" key) and renders it as one ungrouped list.
navItems: SolifiNavItem[] = [
  { id: 'loan-ledger', label: 'Loan Ledger', iconName: 'file'   },
  { id: 'repayments',  label: 'Repayments',  iconName: 'dollar' },
  { id: 'statements',  label: 'Statements',  iconName: 'inbox'  },
  { id: 'users',       label: 'Users',       iconName: 'users'    },
  { id: 'settings',    label: 'Settings',    iconName: 'settings' },
];

onNav(item: SolifiNavItem) { this.activeId = item.id; }`;

  shellFlatHtml = `<!-- Same [sidebarGroups] input — pass navItems instead of navGroups -->
<pui-lib-app-shell
  [sidebarGroups]="navItems"
  [sidebarActiveId]="activeId"
  (sidebarItemSelect)="onNav($event)">
  <router-outlet />
</pui-lib-app-shell>`;

  onNav(item: SolifiNavItem): void { this.activeId = item.id; this.cdr.markForCheck(); }
  onCollapsed(v: boolean): void { this.collapsed = v; this.cdr.markForCheck(); }
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
  // Every input is prefixed by which part it controls: sidebarX vs headerX.
  template: \`
    <pui-lib-app-shell
      sidebarBrandName="solifi"
      sidebarLogoUrl="assets/logo.png"
      [sidebarGroups]="navGroups"
      [sidebarActiveId]="activeId"
      [pageTitle]="activeLabel"
      footerText="Copyright © 2026 Solifi. All Rights Reserved."
      [sidebarTheme]="theme"
      [showSidebarUser]="true"
      sidebarUserName="Admin hub"
      sidebarUserEmail="adminhub@solifi.com"
      [sidebarUserMenuItems]="sidebarUserMenu"
      [showHeader]="true"
      headerAppTitle="Uptown Trucking Leasing"
      headerAppSubtitle="Digital Experience Portal"
      headerLogoUrl="assets/logo-full.png"
      headerUserName="Admin hub"
      headerUserEmail="adminhub@solifi.com"
      [headerMenuItems]="headerMenu"
      (sidebarItemSelect)="onNav($event)"
      (sidebarCollapsedChange)="collapsed = $event"
      (sidebarUserMenuSelect)="onUserMenu($event)"
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

  sidebarUserMenu: SolifiUserMenuItem[] = [
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
  onUserMenu(item: SolifiUserMenuItem) { console.log('Sidebar user menu:', item.label); }
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

const SIDEBAR_USER_MENU = [
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
    el.sidebarGroups        = NAV_GROUPS;
    el.sidebarTheme         = SOLIFI_THEME;
    el.sidebarUserMenuItems = SIDEBAR_USER_MENU;
    el.headerMenuItems      = HEADER_MENU;
    const onNav = (e) => setActiveId(e.detail.id);
    const onSearch = (e) => console.log('Header search:', e.detail);
    el.addEventListener('sidebarItemSelect', onNav);
    el.addEventListener('headerSearchQuery', onSearch);
    return () => {
      el.removeEventListener('sidebarItemSelect', onNav);
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
      sidebar-brand-name="FlexFleet"
      sidebar-logo-url="/assets/logo.png"
      sidebar-active-id={activeId}
      page-title={pageTitle}
      footer-text="Copyright © 2026 FlexFleet. All Rights Reserved."
      show-sidebar-user
      sidebar-user-name="Jordan Wells"
      sidebar-user-email="jwells@flexfleet.io"
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

<!-- 2. App shell owns sidebar + optional header + title bar + scrollable content + footer.
     Every attribute is prefixed by which part it controls: sidebar-x vs header-x. -->
<pui-lib-app-shell
  id="shell"
  sidebar-brand-name="Meridian"
  sidebar-logo-url="assets/logo.png"
  page-title="Dashboard"
  footer-text="Copyright © 2026 Meridian Finance. All Rights Reserved."
  show-sidebar-user
  sidebar-user-name="Alex Morgan"
  sidebar-user-email="amorgan@meridian.com"
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

    shell.sidebarGroups = NAV_GROUPS;
    shell.sidebarTheme  = { bg: '#112C35', textColor: '#8fa3bc', activeColor: '#12C6A8' };
    shell.sidebarUserMenuItems = [
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
    shell.addEventListener('sidebarItemSelect', (e) => {
      shell.sidebarActiveId = e.detail.id;
      shell.pageTitle       = e.detail.label;
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
  // a flat layout with no header bar. Every input name tells you which
  // part it affects: sidebarX only touches the sidebar, headerX only
  // touches the header — pageTitle/footerText are the only shell-level
  // (unprefixed) properties.
  template: \`
    <pui-lib-app-shell
      sidebarBrandName="solifi"
      sidebarLogoUrl="assets/logo.png"
      [sidebarGroups]="navGroups"
      [sidebarActiveId]="activeId"
      [sidebarTheme]="theme"
      [showSidebarUser]="true"
      sidebarUserName="Admin hub"
      sidebarUserEmail="adminhub@solifi.com"
      [sidebarUserMenuItems]="sidebarUserMenu"
      [showHeader]="true"
      headerAppTitle="Uptown Trucking Leasing"
      headerAppSubtitle="Digital Experience Portal"
      headerLogoUrl="assets/logo-full.png"
      headerUserName="Admin hub"
      headerUserEmail="adminhub@solifi.com"
      [headerMenuItems]="headerMenu"
      (sidebarItemSelect)="onNav($event)"
      (sidebarUserMenuSelect)="onUserMenu($event)">

      <!-- Only YOUR page content goes here -->
      <router-outlet />

    </pui-lib-app-shell>
  \`
})
export class AppComponent {
  activeId = 'borrowing-base';
  theme = SOLIFI_THEME;
  navGroups: SolifiNavGroup[] = [...];
  sidebarUserMenu: SolifiUserMenuItem[] = [
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
    // ── Sidebar — every input here affects only the left nav rail ────────
    { input: 'sidebarGroups', type: 'SolifiNavGroup[]|SolifiNavItem[]', default: '[]', description: 'Nav groups OR a flat array of items — pass SolifiNavGroup[] (navGroups) for a label above each cluster, or skip the wrapper and pass SolifiNavItem[] (navItems) directly for one ungrouped list (auto-detected, no label rendered). See "Grouped vs flat navigation" below. Items support iconName, icon (SVG), or text-only.' },
    { input: 'sidebarActiveId', type: 'string', default: "''", description: 'ID of the currently active nav item.' },
    { input: 'sidebarBrandName', type: 'string', default: "'solifi'", description: 'Brand name shown next to the sidebar logo in expanded state.' },
    { input: 'sidebarLogoUrl', type: 'string', default: "''", description: 'Image URL for the sidebar logo (e.g. assets/logo.png).' },
    { input: 'showSidebarBrand', type: 'boolean | string', default: 'true', description: 'Show/hide the sidebar\'s own logo section (expanded and collapsed states). Independent of showHeader.' },
    { input: 'sidebarCollapsed', type: 'boolean | string', default: 'false', description: 'Collapse the sidebar to a 64px icon-only rail.' },
    { input: 'showSidebar', type: 'boolean | string', default: 'true', description: 'Master switch for the whole sidebar — hide it entirely, e.g. for a mobile flat layout.' },
    { input: 'sidebarWidth', type: 'number', default: '240', description: 'Sidebar expanded width in px.' },
    { input: 'sidebarCollapsedWidth', type: 'number', default: '64', description: 'Sidebar collapsed rail width in px.' },
    { input: 'sidebarTheme', type: 'SolifiSidebarTheme', default: 'SOLIFI_THEME', description: 'Full sidebar colour-token object. Use the SOLIFI_THEME preset.' },
    { input: 'showSidebarUser', type: 'boolean | string', default: 'false', description: 'Show the user-profile section at the bottom of the sidebar.' },
    { input: 'sidebarUserName', type: 'string', default: "''", description: 'Full name in the sidebar user-profile footer.' },
    { input: 'sidebarUserEmail', type: 'string', default: "''", description: 'Email shown under the name in the sidebar user-profile footer.' },
    { input: 'sidebarUserInitials', type: 'string', default: "''", description: 'Sidebar avatar initials — auto-derived from sidebarUserName if empty.' },
    { input: 'sidebarUserAvatarUrl', type: 'string', default: "''", description: 'Sidebar avatar photo URL. Falls back to the initials bubble.' },
    { input: 'sidebarUserMenuItems', type: 'SolifiUserMenuItem[]', default: '[]', description: 'Sidebar profile popup menu items. Shown when the sidebar user-profile strip is clicked.' },
    { input: 'sidebarItemSelect', type: 'EventEmitter<SolifiNavItem>', default: '—', description: 'Fires on sidebar nav item click.' },
    { input: 'sidebarCollapsedChange', type: 'EventEmitter<boolean>', default: '—', description: 'Fires when the sidebar\'s collapsed state toggles.' },
    { input: 'sidebarUserMenuSelect', type: 'EventEmitter<SolifiUserMenuItem>', default: '—', description: 'Fires when a sidebar user-profile menu item is selected.' },

    // ── Header (optional) — every input here affects only the top bar ────
    { input: 'showHeader', type: 'boolean | string', default: 'true', description: 'Master switch for the whole header. Set false for a flat layout — sidebar + content only, no header.' },
    { input: 'headerAppTitle', type: 'string', default: "''", description: 'Header title text.' },
    { input: 'headerAppSubtitle', type: 'string', default: "''", description: 'Header subtitle text, shown after a "|" separator.' },
    { input: 'headerLogoUrl', type: 'string', default: "''", description: 'Header logo image URL — rendered in its own white panel, independent of the sidebar logo.' },
    { input: 'headerLogoText', type: 'string', default: "''", description: 'Text label shown next to the header logo image, if not baked into the image.' },
    { input: 'headerBgColor', type: 'string', default: "'var(--pui-header-bg)'", description: 'Header background colour — defaults to the theme token (teal old theme, tan new theme).' },
    { input: 'headerTextColor', type: 'string', default: "'var(--pui-header-text)'", description: 'Header text colour.' },
    { input: 'showHeaderLogo', type: 'boolean | string', default: 'true', description: 'Show/hide the header logo section.' },
    { input: 'showHeaderHeading', type: 'boolean | string', default: 'true', description: 'Show/hide the header title/subtitle section.' },
    { input: 'showHeaderSearch', type: 'boolean | string', default: 'true', description: 'Show/hide the header search button — expands inline in the header when clicked.' },
    { input: 'showHeaderUser', type: 'boolean | string', default: 'true', description: 'Show/hide the header avatar area (independent of the sidebar\'s own showSidebarUser).' },
    { input: 'headerAvatarMode', type: `'menu'|'plain'`, default: "'menu'", description: 'Header avatar style — menu = name/email + dropdown, plain = round chip only.' },
    { input: 'headerUserName', type: 'string', default: "''", description: 'Name shown in the header avatar area — separate from sidebarUserName.' },
    { input: 'headerUserEmail', type: 'string', default: "''", description: 'Email shown in the header avatar dropdown (menu mode only) — separate from sidebarUserEmail.' },
    { input: 'headerAvatarUrl', type: 'string', default: "''", description: 'Header avatar photo URL — falls back to initials.' },
    { input: 'headerAvatarColor', type: 'string', default: "'var(--pui-form-accent)'", description: 'Header avatar chip background colour.' },
    { input: 'headerAvatarTextColor', type: 'string', default: "'var(--pui-accent-ink)'", description: 'Header avatar initials text colour.' },
    { input: 'headerMenuItems', type: 'UserMenuItem[] | string', default: '[]', description: 'Header avatar dropdown items (menu mode only) — shape {label, action, icon?, danger?}, not interchangeable with sidebarUserMenuItems.' },
    { input: 'headerBadge', type: 'HeaderBadge | string', default: 'null', description: 'Environment badge shown in the header (e.g. UAT/PROD).' },
    { input: 'headerSearchQuery', type: 'EventEmitter<string>', default: '—', description: 'Fires as the user types in the header\'s inline search field.' },
    { input: 'headerMenuAction', type: 'EventEmitter<string>', default: '—', description: 'Fires when a header avatar dropdown item is clicked.' },

    // ── Footer (optional) — every input here affects only the rich footer ─
    { input: 'showFooter', type: 'boolean | string', default: 'false', description: 'Renders the full pui-lib-footer component instead of the plain footerText bar. Only one footer ever renders at once.' },
    { input: 'footerVariant', type: `'contact'|'disclaimer'|'simple'`, default: "'simple'", description: 'Footer layout — contact (office-hours/address + CTA), disclaimer (body text + read-more link), or simple (copyright/links bar only).' },
    { input: 'footerNoticeSlides', type: 'FooterNoticeSlide[] | string', default: '[]', description: 'Rotating notice-card slides shown above the copyright bar (contact/disclaimer variants).' },
    { input: 'footerActiveSlideIndex', type: 'number | string', default: '0', description: 'Index of the currently visible notice slide.' },
    { input: 'footerCopyrightText', type: 'string', default: "'Copyright © {year} Solifi...'", description: 'Copyright line in the rich footer — separate from the shell-level footerText.' },
    { input: 'footerLinks', type: 'FooterLink[] | string', default: '[]', description: 'Bottom-row links (label + href or action).' },
    { input: 'footerPoweredByText', type: 'string', default: "'Powered by Solifi™'", description: '"Powered by" label next to the copyright line.' },
    { input: 'showFooterPoweredBy', type: 'boolean | string', default: 'true', description: 'Show/hide the "powered by" label.' },
    { input: 'footerStickyBottom', type: 'boolean | string', default: 'false', description: 'Pins the footer to the bottom of the viewport instead of flowing after page content.' },
    { input: 'footerActiveSlideIndexChange', type: 'EventEmitter<number>', default: '—', description: 'Fires when the active notice slide changes.' },
    { input: 'footerLinkClick', type: 'EventEmitter<FooterLink>', default: '—', description: 'Fires when a bottom-row footer link is clicked.' },
    { input: 'footerContactClick', type: 'EventEmitter<FooterNoticeSlide>', default: '—', description: "Fires when the contact variant's CTA button is clicked." },

    // ── Shell — layout-level, not owned by either the sidebar or header ──
    { input: 'pageTitle', type: 'string', default: "''", description: 'Title shown in the bar under the header.' },
    { input: 'footerText', type: 'string', default: "''", description: 'Plain one-line copyright bar. Ignored while showFooter is true (the rich footer replaces it).' },
  ];
}
