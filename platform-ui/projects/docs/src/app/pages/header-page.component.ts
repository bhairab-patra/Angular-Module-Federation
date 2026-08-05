import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-header-page',
  standalone: true,
  imports: [DocPageComponent, HeaderComponent, NgIf],
  template: `
    <docs-page
      title="Header"
      description="Flexible top app bar. Pass any logo, colour, badge, nav links, and user menu — nothing is hard-coded."
      [code]="code"
      [api]="api">

      <ng-container demo>

        <!-- ── Admin Portal (matches screenshot) ── -->
        <div class="section-divider"><span class="section-tag">Admin Portal — UAT</span></div>
        <pui-header
          appTitle="Admin Portal"
          appSubtitle="PLATFORM MANAGEMENT"
          logoText=""
          bgColor="#12C6A8"
          textColor="#ffffff"
          [badge]="uatBadge"
          [showHelp]="true"
          greeting="Hi"
          userName="Bhairab Patra"
          userEmail="bpatra@solifi.com"
          userSubtext="Welcome back!"
          avatarColor="#0d6e5f"
          [menuItems]="menuItems"
          (menuAction)="onAction($event)">
        </pui-header>

        <!-- ── Dark sidebar-style ── -->
        <div class="section-divider"><span class="section-tag">Dark Theme</span></div>
        <pui-header
          appTitle="DataHub"
          appSubtitle="ANALYTICS"
          bgColor="#0f172a"
          textColor="#ffffff"
          [navLinks]="navLinks"
          [showHelp]="true"
          userName="Jane Smith"
          userEmail="jane@company.com"
          greeting="Hello"
          avatarColor="#6366f1"
          [menuItems]="fullMenuItems"
          (menuAction)="onAction($event)">
        </pui-header>

        <!-- ── Brand teal with nav ── -->
        <div class="section-divider"><span class="section-tag">Teal + Nav Links</span></div>
        <pui-header
          appTitle="Solifi"
          appSubtitle="LENDING PLATFORM"
          bgColor="#0d6e5f"
          textColor="#ffffff"
          [navLinks]="navLinks"
          userName="Alex Johnson"
          userEmail="alex@solifi.com"
          greeting="Hi"
          avatarColor="#12C6A8"
          avatarTextColor="#0d6e5f"
          [badge]="prodBadge"
          [menuItems]="menuItems"
          (menuAction)="onAction($event)">
        </pui-header>

        <!-- ── Minimal / no user ── -->
        <div class="section-divider"><span class="section-tag">Minimal — No User</span></div>
        <pui-header
          appTitle="My App"
          bgColor="#1e293b"
          textColor="#ffffff">
        </pui-header>

        <!-- ── Last action log ── -->
        <div class="section-divider"><span class="section-tag">Last Menu Action</span></div>
        <div class="action-log" *ngIf="lastAction">
          menuAction emitted: <strong>{{ lastAction }}</strong>
        </div>
        <div class="action-log action-log--empty" *ngIf="!lastAction">
          Click the user avatar → a menu item to see the emitted action here.
        </div>

      </ng-container>
    </docs-page>
  `,
  styles: [`
    .section-divider {
      display: flex; align-items: center; gap: 12px; width: 100%;
      border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 4px;
    }
    .section-tag {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .07em; color: #9ca3af; white-space: nowrap;
    }
    .action-log {
      padding: 12px 16px; border-radius: 8px;
      background: #f0fdf9; border: 1px solid #a7f3d0;
      font-size: 13px; color: #065f46; font-family: 'Poppins', system-ui, sans-serif;
    }
    .action-log--empty {
      background: #f9fafb; border-color: #e5e7eb; color: #9ca3af;
    }
  `],
})
export class HeaderPageComponent {

  lastAction = '';

  uatBadge  = { text: 'UAT',  color: '#f59e0b', textColor: '#fff' };
  prodBadge = { text: 'PROD', color: '#ef4444', textColor: '#fff' };

  navLinks = [
    { label: 'Dashboard', href: '#', active: true },
    { label: 'Users',     href: '#' },
    { label: 'Reports',   href: '#' },
    { label: 'Settings',  href: '#' },
  ];

  menuItems = [
    {
      label: 'Sign out', action: 'signout', danger: true,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>`,
    },
  ];

  fullMenuItems = [
    {
      label: 'Profile', action: 'profile',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    },
    {
      label: 'Settings', action: 'settings',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
    },
    {
      label: 'Sign out', action: 'signout', danger: true,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>`,
    },
  ];

  onAction(action: string): void {
    this.lastAction = action;
  }

  code = `import { HeaderComponent } from '@solifi/platform-ui';
import { UserMenuItem, HeaderBadge } from '@solifi/platform-ui';

// ── Admin Portal style (matches screenshot) ────────────────────
<pui-header
  appTitle="Admin Portal"
  appSubtitle="PLATFORM MANAGEMENT"
  bgColor="#12C6A8"
  [badge]="{ text: 'UAT', color: '#f59e0b' }"
  [showHelp]="true"
  userName="Bhairab Patra"
  userEmail="bpatra@solifi.com"
  greeting="Hi"
  userSubtext="Welcome back!"
  [menuItems]="menuItems"
  (menuAction)="onMenuAction($event)">
</pui-header>

// ── Custom menu items ──────────────────────────────────────────
menuItems: UserMenuItem[] = [
  {
    label: 'Profile',  action: 'profile',
    icon: '<svg>...</svg>',
  },
  {
    label: 'Settings', action: 'settings',
    icon: '<svg>...</svg>',
  },
  {
    label: 'Sign out', action: 'signout', danger: true,
    icon: '<svg>...</svg>',
  },
];

onMenuAction(action: string) {
  if (action === 'signout') { /* handle sign out */ }
}

// ── With nav links ─────────────────────────────────────────────
<pui-header
  appTitle="DataHub"
  bgColor="#0f172a"
  [navLinks]="[
    { label: 'Dashboard', href: '/dashboard', active: true },
    { label: 'Users',     href: '/users' },
  ]"
  userName="Jane Smith"
  userEmail="jane@company.com">
</pui-header>

// ── Custom logo via slot ───────────────────────────────────────
<pui-header appTitle="My App" [hasLogoSlot]="true">
  <img logo src="/assets/logo.svg" height="32" alt="Logo">
</pui-header>`;

  api: ApiRow[] = [
    { input: 'appTitle',       type: 'string',        default: `'My App'`,   description: 'Primary brand / product name' },
    { input: 'appSubtitle',    type: 'string',        default: `''`,         description: 'Sub-label below the title (e.g. "PLATFORM MANAGEMENT")' },
    { input: 'logoText',       type: 'string',        default: `''`,         description: 'Short text or emoji before the title (no slot)' },
    { input: 'bgColor',        type: 'string',        default: `'#12C6A8'`,  description: 'Header background colour — any valid CSS colour' },
    { input: 'textColor',      type: 'string',        default: `'#ffffff'`,  description: 'Text and icon colour' },
    { input: 'badge',          type: 'HeaderBadge',   default: 'null',       description: '{ text, color, textColor? } — environment badge next to logo' },
    { input: 'navLinks',       type: 'NavLink[]',     default: '[]',         description: 'Array of { label, href, active? } nav links' },
    { input: 'showHelp',       type: 'boolean',       default: 'false',      description: 'Show the help (?) icon button' },
    { input: 'userName',       type: 'string',        default: `''`,         description: 'Full name of the signed-in user — activates the user area' },
    { input: 'userEmail',      type: 'string',        default: `''`,         description: 'Email shown in the dropdown header' },
    { input: 'greeting',       type: 'string',        default: `'Hi'`,       description: 'Greeting prefix — set to empty string to hide' },
    { input: 'userSubtext',    type: 'string',        default: `'Welcome back!'`, description: 'Small line below the greeting' },
    { input: 'avatarUrl',      type: 'string',        default: `''`,         description: 'Avatar image URL — falls back to initials when blank' },
    { input: 'avatarColor',    type: 'string',        default: `'#0d6e5f'`,  description: 'Avatar background colour' },
    { input: 'avatarTextColor',type: 'string',        default: `'#ffffff'`,  description: 'Avatar initials colour' },
    { input: 'hasLogoSlot',    type: 'boolean',       default: 'false',      description: 'Set true when projecting a custom logo via [logo] slot' },
    { input: 'menuItems',      type: 'UserMenuItem[]',default: '[Sign out]', description: 'Dropdown items — { label, action, icon?, danger? }' },
    { input: 'menuAction',     type: 'EventEmitter',  default: '—',          description: 'Output — emits item.action string on menu click' },
    { input: 'helpClick',      type: 'EventEmitter',  default: '—',          description: 'Output — emits when the help button is clicked' },
  ];
}
