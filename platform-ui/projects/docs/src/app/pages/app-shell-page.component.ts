import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PuiAppShellComponent } from '@solifi/platform-ui';
import { SidebarGroup, SidebarTheme, SIDEBAR_THEMES } from '@solifi/platform-ui';
import { UserMenuItem, HeaderBadge } from '@solifi/platform-ui';

@Component({
  selector: 'docs-app-shell-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PuiAppShellComponent],
  template: `
  <div class="page">

    <div class="page-header">
      <h1 class="page-title">App Shell</h1>
      <p class="page-desc">
        A turnkey application shell combining <code>pui-header</code> and a sidebar nav rail
        into a single <code>&lt;pui-app-shell&gt;</code> component. Import it once and get a
        complete layout with a hamburger toggle, collapsible sidebar, search, and projected
        main content.
      </p>
    </div>

    <!-- Live Demo -->
    <section class="section">
      <h2 class="section-title">Live Demo</h2>

      <div class="controls">
        <button class="ctrl-btn" [class.ctrl-btn--active]="!sidebarVisible" (click)="sidebarVisible = !sidebarVisible">
          {{ sidebarVisible ? 'Hide' : 'Show' }} Sidebar
        </button>
        <button class="ctrl-btn" [class.ctrl-btn--active]="sidebarCollapsed" (click)="sidebarCollapsed = !sidebarCollapsed">
          {{ sidebarCollapsed ? 'Expand' : 'Collapse' }} Rail
        </button>
        <button class="ctrl-btn" (click)="cycleTheme()">Theme: {{ activeThemeName }}</button>
        <span class="ctrl-divider"></span>
        <span class="ctrl-label">Last action: {{ lastAction || '—' }}</span>
      </div>

      <div class="shell-frame">
        <pui-app-shell
          appTitle="Experience Hub Portal"
          appSubtitle="Management Console"
          brandName="Platform"
          headerBgColor="#12C6A8"
          headerUserName="Bhairab Patra"
          headerUserEmail="bhairab@example.com"
          headerGreeting="Hi"
          [headerBadge]="demoHeaderBadge"
          [headerMenuItems]="demoMenuItems"
          [groups]="navGroups"
          [activeId]="activeId"
          [sidebarVisible]="sidebarVisible"
          [sidebarCollapsed]="sidebarCollapsed"
          [theme]="activeTheme"
          (sidebarVisibleChange)="sidebarVisible = $event"
          (sidebarCollapsedChange)="sidebarCollapsed = $event"
          (itemSelect)="onItemSelect($event.id)"
          (headerMenuAction)="lastAction = 'Menu: ' + $event">

          <div class="demo-content">
            <div class="demo-content__header">
              <h3>Dashboard</h3>
              <p>Active: <strong>{{ activeId || 'none' }}</strong></p>
            </div>
            <div class="demo-cards">
              <div class="demo-card demo-card--blue"><span class="demo-card__val">1,284</span><span class="demo-card__lbl">Users</span></div>
              <div class="demo-card demo-card--green"><span class="demo-card__val">$48.2k</span><span class="demo-card__lbl">Revenue</span></div>
              <div class="demo-card demo-card--amber"><span class="demo-card__val">97.4%</span><span class="demo-card__lbl">Uptime</span></div>
              <div class="demo-card demo-card--purple"><span class="demo-card__val">342</span><span class="demo-card__lbl">Tickets</span></div>
            </div>
          </div>

        </pui-app-shell>
      </div>
    </section>

    <!-- Usage -->
    <section class="section">
      <h2 class="section-title">Usage</h2>
      <pre class="code-block"><code>{{ usageCode }}</code></pre>
    </section>

    <!-- API Inputs -->
    <section class="section">
      <h2 class="section-title">API — Inputs</h2>
      <div class="table-wrap">
        <table class="api-table">
          <thead><tr><th>Input</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>appTitle</td><td>string</td><td>'My App'</td><td>Application name shown in header brand area</td></tr>
            <tr><td>appSubtitle</td><td>string</td><td>''</td><td>Small subtitle beneath the app title</td></tr>
            <tr><td>logo</td><td>string (SVG/HTML)</td><td>''</td><td>Custom logo HTML; defaults to built-in arrow icon</td></tr>
            <tr><td>brandName</td><td>string</td><td>''</td><td>Name shown at top of the sidebar rail (falls back to appTitle)</td></tr>
            <tr><td>groups</td><td>SidebarGroup[]</td><td>[]</td><td>Navigation groups for the sidebar rail</td></tr>
            <tr><td>activeId</td><td>string</td><td>''</td><td>ID of the currently active nav item</td></tr>
            <tr><td>sidebarVisible</td><td>boolean</td><td>true</td><td>Show or hide the sidebar rail</td></tr>
            <tr><td>sidebarCollapsed</td><td>boolean</td><td>false</td><td>Collapse rail to icon-only mode</td></tr>
            <tr><td>config</td><td>SidebarConfig</td><td>&#123;&#125;</td><td>width, collapsedWidth, showSearch, collapsible, maxLabelLen</td></tr>
            <tr><td>theme</td><td>SidebarTheme</td><td>&#123;&#125;</td><td>CSS-custom-property overrides for the rail color scheme</td></tr>
            <tr><td>headerBgColor</td><td>string</td><td>'#12C6A8'</td><td>Header background colour</td></tr>
            <tr><td>headerTextColor</td><td>string</td><td>'#ffffff'</td><td>Header text / icon colour</td></tr>
            <tr><td>headerUserName</td><td>string</td><td>''</td><td>Displayed in the avatar / user menu</td></tr>
            <tr><td>headerUserEmail</td><td>string</td><td>''</td><td>Email line in the user dropdown</td></tr>
            <tr><td>headerGreeting</td><td>string</td><td>'Hi'</td><td>Greeting prefix shown in user dropdown (e.g. "Hi, Jane")</td></tr>
            <tr><td>headerUserSubtext</td><td>string</td><td>'Welcome back!'</td><td>Subtext line in the user dropdown</td></tr>
            <tr><td>headerAvatarUrl</td><td>string</td><td>''</td><td>URL for the user avatar image; falls back to initials</td></tr>
            <tr><td>headerAvatarColor</td><td>string</td><td>'#0d6e5f'</td><td>Background colour of the initials avatar</td></tr>
            <tr><td>headerAvatarTextColor</td><td>string</td><td>'#ffffff'</td><td>Text colour of the initials avatar</td></tr>
            <tr><td>headerBadge</td><td>HeaderBadge | null</td><td>null</td><td>Environment badge (e.g. UAT, PROD)</td></tr>
            <tr><td>headerMenuItems</td><td>UserMenuItem[]</td><td>[]</td><td>User-menu action items</td></tr>
            <tr><td>headerShowHelp</td><td>boolean</td><td>false</td><td>Show the help icon button</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="section-title" style="margin-top:32px">API — Outputs</h2>
      <div class="table-wrap">
        <table class="api-table">
          <thead><tr><th>Output</th><th>Payload</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>sidebarVisibleChange</td><td>boolean</td><td>Emits when hamburger button toggles visibility</td></tr>
            <tr><td>sidebarCollapsedChange</td><td>boolean</td><td>Emits when the collapse toggle is clicked</td></tr>
            <tr><td>itemSelect</td><td>SidebarNavItem</td><td>Emits when a leaf nav item is clicked</td></tr>
            <tr><td>headerMenuAction</td><td>string</td><td>Emits the action string from user-menu items</td></tr>
            <tr><td>headerHelpClick</td><td>void</td><td>Emits when the help button is clicked</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="section-title" style="margin-top:32px">Content Projection Slots</h2>
      <div class="table-wrap">
        <table class="api-table">
          <thead><tr><th>Slot selector</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><em>(default)</em></td><td>Main content area, fills remaining space beside the sidebar</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Themes -->
    <section class="section">
      <h2 class="section-title">Built-in Themes</h2>
      <p class="section-desc">
        Pass a <code>SIDEBAR_THEMES</code> preset — or any <code>SidebarTheme</code> object — to
        the <code>[theme]</code> input to instantly restyle the rail.
      </p>
      <pre class="code-block"><code>{{ themeCode }}</code></pre>
    </section>

  </div>
  `,
  styles: [`
    .page { max-width: 960px; margin: 0 auto; padding: 40px 28px 80px; font-family: 'Poppins', system-ui, sans-serif; }
    .page-header { margin-bottom: 40px; }
    .page-title  { font-size: 28px; font-weight: 700; color: #111827; margin: 0 0 10px; }
    .page-desc   { font-size: 15px; color: #4b5563; line-height: 1.7; margin: 0; }
    .page-desc code { background: #f3f4f6; border-radius: 4px; padding: 1px 5px; font-size: 13px; color: #0ea5e9; }

    .section { margin-bottom: 48px; }
    .section-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 16px; padding-bottom: 10px; border-bottom: 2px solid #f3f4f6; }
    .section-desc  { font-size: 14px; color: #6b7280; line-height: 1.65; margin: -8px 0 16px; }
    .section-desc code { background: #f3f4f6; border-radius: 4px; padding: 1px 5px; font-size: 13px; color: #0ea5e9; }

    .controls { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
    .ctrl-btn { padding: 6px 14px; border-radius: 8px; border: 1px solid #e5e7eb; background: #fff; font-size: 12.5px; font-weight: 500; color: #374151; cursor: pointer; font-family: inherit; transition: background .13s, border-color .13s; }
    .ctrl-btn:hover { background: #f9fafb; border-color: #d1d5db; }
    .ctrl-btn--active { background: #12C6A8; border-color: #12C6A8; color: #fff; }
    .ctrl-divider { width: 1px; height: 20px; background: #e5e7eb; margin: 0 4px; }
    .ctrl-label { font-size: 12.5px; color: #9ca3af; }

    .shell-frame { height: 520px; border-radius: 14px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 20px rgba(0,0,0,.07); }
    .shell-frame pui-app-shell { height: 100%; display: block; }

    .demo-content { padding: 28px 32px; height: 100%; box-sizing: border-box; background: #f9fafb; }
    .demo-content__header { margin-bottom: 24px; }
    .demo-content__header h3 { margin: 0 0 4px; font-size: 20px; font-weight: 700; color: #111827; }
    .demo-content__header p  { margin: 0; font-size: 13.5px; color: #6b7280; }

    .demo-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; }
    .demo-card { border-radius: 12px; padding: 20px 18px; display: flex; flex-direction: column; gap: 6px; }
    .demo-card__val { font-size: 26px; font-weight: 700; }
    .demo-card__lbl { font-size: 12px; font-weight: 500; opacity: .75; }
    .demo-card--blue   { background: #eff6ff; color: #1d4ed8; }
    .demo-card--green  { background: #f0fdf4; color: #166534; }
    .demo-card--amber  { background: #fffbeb; color: #92400e; }
    .demo-card--purple { background: #faf5ff; color: #7e22ce; }

    .code-block { background: #0f172a; color: #e2e8f0; border-radius: 12px; padding: 20px 22px; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 12.5px; line-height: 1.7; overflow-x: auto; margin: 0; white-space: pre; }

    .table-wrap { overflow-x: auto; }
    .api-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
    .api-table th { text-align: left; padding: 10px 14px; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #6b7280; border-bottom: 2px solid #e5e7eb; background: #f9fafb; }
    .api-table td { padding: 10px 14px; border-bottom: 1px solid #f3f4f6; color: #374151; vertical-align: top; }
    .api-table td:first-child { font-family: monospace; color: #0ea5e9; font-size: 13px; }
    .api-table tr:last-child td { border-bottom: none; }
    .api-table tr:hover td { background: #fafafa; }
  `],
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

  usageCode = `import { PuiAppShellComponent } from '@solifi/platform-ui';

@Component({
  imports: [PuiAppShellComponent],
  template: \`
    <pui-app-shell
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
    </pui-app-shell>
  \`
})
export class AppComponent { ... }`;

  themeCode = `import { SIDEBAR_THEMES } from '@solifi/platform-ui';

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
