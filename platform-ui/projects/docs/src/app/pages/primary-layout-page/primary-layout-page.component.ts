import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  PuiAppShellComponent,
  SolifiNavGroup,
  SolifiNavItem,
  SolifiUserMenuItem,
  UserMenuItem,
} from '@bhairab-patra/platform-ui';
import { DocPageComponent } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

const NAV_GROUPS: SolifiNavGroup[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    items: [
      { id: 'overview', label: 'Overview', iconName: 'dashboard' },
      { id: 'reports', label: 'Reports', iconName: 'chart' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    items: [
      { id: 'users', label: 'Users', iconName: 'users' },
      { id: 'settings', label: 'Settings', iconName: 'settings' },
    ],
  },
];

const SIDEBAR_USER_MENU: SolifiUserMenuItem[] = [
  { id: 'profile', label: 'My Profile', iconName: 'user' },
  { id: 'logout', label: 'Sign Out', iconName: 'logout', divider: true },
];

const HEADER_MENU: UserMenuItem[] = [
  { label: 'My Profile', action: 'profile' },
  { label: 'Sign Out', action: 'logout', danger: true },
];

type FileTab = 'ts' | 'html' | 'scss';

@Component({
  selector: 'docs-primary-layout-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, PuiAppShellComponent, DocPageComponent, CodeBlockComponent],
  templateUrl: './primary-layout-page.component.html',
  styleUrls: ['./primary-layout-page.component.scss'],
})
export class PrimaryLayoutPageComponent {
  private cdr = inject(ChangeDetectorRef);

  navGroups = NAV_GROUPS;
  sidebarUserMenu = SIDEBAR_USER_MENU;
  headerMenu = HEADER_MENU;
  activeId = 'overview';

  get pageTitle(): string {
    for (const group of this.navGroups) {
      const item = group.items.find((i) => i.id === this.activeId);
      if (item) return item.label;
    }
    return '';
  }

  onNav(item: SolifiNavItem): void {
    this.activeId = item.id;
    this.cdr.markForCheck();
  }

  onUserMenu(_item: SolifiUserMenuItem): void {}
  onHeaderMenu(_action: string): void {}

  activeTab: FileTab = 'ts';
  copied = '';

  setTab(t: FileTab): void {
    this.activeTab = t;
    this.cdr.markForCheck();
  }

  doCopy(text: string, id: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => {
        this.copied = '';
        this.cdr.markForCheck();
      }, 2000);
    });
  }

  files: Record<FileTab, string> = {
    ts: `import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  PuiAppShellComponent,
  SolifiNavGroup, SolifiNavItem, SolifiUserMenuItem, UserMenuItem,
} from '@bhairab-patra/platform-ui';

const NAV_GROUPS: SolifiNavGroup[] = [
  {
    id: 'dashboard', label: 'Dashboard',
    items: [
      { id: 'overview', label: 'Overview', iconName: 'dashboard' },
      { id: 'reports',  label: 'Reports',  iconName: 'chart' },
    ],
  },
  {
    id: 'admin', label: 'Admin',
    items: [
      { id: 'users',    label: 'Users',    iconName: 'users' },
      { id: 'settings', label: 'Settings', iconName: 'settings' },
    ],
  },
];

const SIDEBAR_USER_MENU: SolifiUserMenuItem[] = [
  { id: 'profile', label: 'My Profile', iconName: 'user' },
  { id: 'logout',  label: 'Sign Out',   iconName: 'logout', divider: true },
];

const HEADER_MENU: UserMenuItem[] = [
  { label: 'My Profile', action: 'profile' },
  { label: 'Sign Out',   action: 'logout', danger: true },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PuiAppShellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  navGroups       = NAV_GROUPS;
  sidebarUserMenu = SIDEBAR_USER_MENU;
  headerMenu      = HEADER_MENU;
  activeId        = 'overview';

  // Derive the page title from whichever nav item is active — keeps
  // [pageTitle] and the sidebar's highlighted item in sync automatically.
  get pageTitle(): string {
    for (const group of this.navGroups) {
      const item = group.items.find(i => i.id === this.activeId);
      if (item) return item.label;
    }
    return '';
  }

  onNav(item: SolifiNavItem): void {
    this.activeId = item.id;
  }

  onUserMenu(item: SolifiUserMenuItem): void {
    if (item.id === 'logout') {
      // Sign-out logic here
    }
  }

  onHeaderMenu(action: string): void {
    // Header avatar-menu logic here
  }
}`,

    html: `<!--
  Every input is prefixed by which part of the shell it controls:
  sidebarX only ever touches the left nav rail, headerX only ever
  touches the top bar. pageTitle and footerText are shell-level.
-->
<pui-lib-app-shell
  [sidebarGroups]="navGroups"
  [sidebarActiveId]="activeId"
  sidebarBrandName="Solifi"
  [showSidebarUser]="true"
  sidebarUserName="Admin User"
  sidebarUserEmail="admin@solifi.com"
  [sidebarUserMenuItems]="sidebarUserMenu"
  sidebarLogoUrl="logo1.png"
  sidebarCollapsed="false"
  pageTitle="DEMO PAGE"
  [showSidebarUser]="true"
  showSidebar = "true"

  
  [showHeader]="true"
  headerAppTitle="Solifi Platform"
  headerAppSubtitle="Admin Portal"
  headerUserName="Admin User"
  headerUserEmail="admin@solifi.com"
  [headerMenuItems]="headerMenu"
  headerLogoUrl="logo.png"
 
  headerAvatarMode="menu"
  showHeaderLogo="true"
  showHeaderHeading="true"
  showHeaderSearch="true"
  showHeaderUse="true"

  [pageTitle]="pageTitle"
  footerText="Copyright © 2026 Solifi. All Rights Reserved."

  (sidebarItemSelect)="onNav($event)"
  (sidebarUserMenuSelect)="onUserMenu($event)"
  (headerMenuAction)="onHeaderMenu($event)" 
  showFooter = "true"
  >

   

  <!-- Your routed page content goes here, as children of the shell -->
  <router-outlet />

</pui-lib-app-shell>`,

    scss: `:host {
  display: block;
  height: 100vh;
}`,
  };
}
