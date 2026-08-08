import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PuiAppShellComponent } from '@bhairab-patra/platform-ui';
import { SidebarGroup, SidebarTheme, SIDEBAR_THEMES } from '@bhairab-patra/platform-ui';
import { UserMenuItem, HeaderBadge } from '@bhairab-patra/platform-ui';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-app-shell-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PuiAppShellComponent, FrameworkPreviewComponent],
  templateUrl: './app-shell-page.component.html',
  styleUrls: ['./app-shell-page.component.scss'],
})
export class AppShellPageComponent {

  sidebarVisible   = true;
  sidebarCollapsed = false;
  activeId         = 'dashboard';
  lastAction       = '';

  readonly themeNames = ['dark', 'slate', 'light', 'brand'] as const;
  activeThemeName = 'dark';
  activeTheme: SidebarTheme = SIDEBAR_THEMES['dark'];

  demoHeaderBadge: HeaderBadge = { text: 'UAT', color: '#f59e0b', textColor: '#fff' };

  demoMenuItems: UserMenuItem[] = [
    { label: 'My Profile', action: 'profile',  icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>` },
    { label: 'Settings',   action: 'settings', icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>` },
    { label: 'Sign Out',   action: 'logout', danger: true, icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>` },
  ];

  navGroups: SidebarGroup[] = [
    {
      id: 'grp-overview',
      label: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>` },
        { id: 'analytics', label: 'Analytics', badge: 'New', badgeVariant: 'success', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
      ],
    },
    {
      id: 'grp-management',
      label: 'Management',
      items: [
        {
          id: 'users', label: 'Users', badge: 12,
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
          children: [
            { id: 'users-list',   label: 'All Users' },
            { id: 'users-roles',  label: 'Roles & Permissions' },
            { id: 'users-invite', label: 'Invite Users' },
          ],
        },
        { id: 'products', label: 'Products', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>` },
        { id: 'orders',   label: 'Orders',   badge: 3, badgeVariant: 'warning', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>` },
      ],
    },
    {
      id: 'grp-settings',
      label: 'Settings',
      items: [
        { id: 'settings-general',  label: 'General',  icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>` },
        { id: 'settings-billing',  label: 'Billing',  icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>` },
        { id: 'settings-security', label: 'Security', dividerAfter: true, icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
        { id: 'help',              label: 'Help & Docs', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` },
      ],
    },
  ];

  cycleTheme(): void {
    const idx = (this.themeNames.indexOf(this.activeThemeName as 'dark' | 'slate' | 'light' | 'brand') + 1) % this.themeNames.length;
    this.activeThemeName = this.themeNames[idx];
    this.activeTheme = SIDEBAR_THEMES[this.activeThemeName];
  }

  onItemSelect(id: string): void {
    this.activeId   = id;
    this.lastAction = `Navigate: ${id}`;
  }

  usageCode = `import { PuiAppShellComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiAppShellComponent],
  template: \`
    <pui-lib-app-shell
      appTitle="Admin Portal"
      appSubtitle="v2.0"
      headerBgColor="#12C6A8"
      headerUserName="Jane Doe"
      headerUserEmail="jane@example.com"
      [headerBadge]="{ text: 'PROD', color: '#10b981', textColor: '#fff' }"
      [headerMenuItems]="menuItems"
      [groups]="navGroups"
      [activeId]="activeId"
      [(sidebarVisible)]="sidebarOpen"
      (itemSelect)="onNav($event)">

      <!-- Your app content goes here -->
      <router-outlet></router-outlet>
    </pui-lib-app-shell>
  \`
})
export class AppComponent { ... }`;

  reactCode = `import { useEffect, useRef, useState } from 'react';
// pui-elements bundle loaded via <script> in index.html

function App() {
  const shellRef = useRef(null);
  const [activeId, setActiveId] = useState('dashboard');

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    el.groups = navGroups;
    el.headerMenuItems = menuItems;
    const onNav = (e) => setActiveId(e.detail.id);
    el.addEventListener('itemSelect', onNav);
    return () => el.removeEventListener('itemSelect', onNav);
  }, []);

  return (
    <pui-lib-app-shell
      ref={shellRef}
      app-title="My React App"
      header-bg-color="#12C6A8"
      header-user-name="Jane Doe"
      active-id={activeId}>
      <main>{/* page content */}</main>
    </pui-lib-app-shell>
  );
}`;

  htmlCode = `<!-- Load the elements bundle once -->
<script src="pui-elements.js"></script>

<!-- Place the shell in your body -->
<pui-lib-app-shell
  app-title="My App"
  header-bg-color="#12C6A8"
  header-user-name="Jane Doe">
  <main id="content"><!-- page content --></main>
</pui-lib-app-shell>

<script>
  customElements.whenDefined('pui-lib-app-shell').then(() => {
    const shell = document.querySelector('pui-lib-app-shell');
    shell.groups = navGroups;
    shell.addEventListener('itemSelect', e => console.log(e.detail.id));
  });
</script>`;

  themeCode = `import { SIDEBAR_THEMES } from '@bhairab-patra/platform-ui';

// Four built-in presets
[theme]="SIDEBAR_THEMES['dark']"   // deep navy (default)
[theme]="SIDEBAR_THEMES['slate']"  // slate blue-grey
[theme]="SIDEBAR_THEMES['light']"  // white / light mode
[theme]="SIDEBAR_THEMES['brand']"  // teal brand colours

// Or a fully custom object
[theme]="{
  bg: '#1a1a2e',
  textColor: '#a0aec0',
  activeBorder: '#e91e8c',
  activeBg: 'rgba(233,30,140,.1)',
  activeText: '#fff',
}"`;
}
