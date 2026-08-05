import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import {
  PuiSidebarComponent, SidebarGroup, SidebarNavItem,
  SidebarTheme, SidebarConfig, SIDEBAR_THEMES
} from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

// ── Demo nav data ──────────────────────────────────────────────────────────
const NAV_GROUPS: SidebarGroup[] = [
  {
    id: 'main', label: 'Main Menu',
    items: [
      {
        id: 'dashboard', label: 'Dashboard', route: '/dashboard',
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
      },
      {
        id: 'analytics', label: 'Analytics', badge: 'New', badgeVariant: 'success',
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
        children: [
          { id: 'reports',   label: 'Reports',         route: '/analytics/reports'   },
          { id: 'charts',    label: 'Charts & Graphs', route: '/analytics/charts'    },
          { id: 'exports',   label: 'Data Exports',    route: '/analytics/exports', badge: 3, badgeVariant: 'primary' },
        ],
      },
      {
        id: 'products', label: 'Products',
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8l-2 4h12l-2-4z"/></svg>`,
        children: [
          { id: 'prod-list',    label: 'All Products', route: '/products/list'    },
          { id: 'prod-add',     label: 'Add Product',  route: '/products/add'     },
          { id: 'prod-cats',    label: 'Categories',   route: '/products/cats'    },
          { id: 'prod-pricing', label: 'Pricing Rules (Enterprise Plan)', route: '/products/pricing', disabled: true },
        ],
      },
      {
        id: 'orders', label: 'Orders', badge: 12, badgeVariant: 'warning',
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 11l3 3 8-8"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        dividerAfter: true,
      },
    ],
  },
  {
    id: 'admin', label: 'Administration',
    items: [
      {
        id: 'users', label: 'Users & Permissions',
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
        children: [
          { id: 'user-list',  label: 'All Users',    route: '/admin/users'        },
          { id: 'user-roles', label: 'Roles',        route: '/admin/roles'        },
          { id: 'user-audit', label: 'Audit Log',    route: '/admin/audit', badge: '!', badgeVariant: 'danger' },
        ],
      },
      {
        id: 'settings', label: 'Settings',
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
      },
      {
        id: 'help', label: 'Help & Documentation',
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>`,
      },
    ],
  },
];

@Component({
  selector: 'docs-sidebar-page',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, PuiSidebarComponent, DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <docs-page
      title="Sidebar"
      description="A fully-featured navigation sidebar with collapsible groups, submenu expansion, live search with text highlighting, badge indicators, active state, ellipsis with tooltip for long labels, and complete theme customization via CSS variables. Drop into any layout — standalone or combined with PuiHeader."
      [code]="importCode"
      [api]="api">

      <ng-container demo>

        <!-- ── Live App Shell Preview ───────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Live Preview</h3>
            <p class="ds__desc">
              Full interactive demo. Try expanding submenus, searching, collapsing, switching themes, and clicking items.
            </p>
          </div>

          <!-- Controls bar -->
          <div class="controls-bar">
            <div class="ctrl-group">
              <span class="ctrl-label">Theme</span>
              <div class="theme-pills">
                <button *ngFor="let t of themeKeys"
                        class="theme-pill"
                        [class.theme-pill--active]="activeThemeName === t"
                        (click)="setTheme(t)">
                  <span class="theme-dot" [style.background]="themeColors[t]"></span>
                  {{ t }}
                </button>
              </div>
            </div>
            <div class="ctrl-group">
              <span class="ctrl-label">Width</span>
              <div class="ctrl-btns">
                <button class="ctrl-btn" [class.ctrl-btn--active]="demoConfig.width === 200" (click)="setWidth(200)">Compact</button>
                <button class="ctrl-btn" [class.ctrl-btn--active]="demoConfig.width === 260" (click)="setWidth(260)">Default</button>
                <button class="ctrl-btn" [class.ctrl-btn--active]="demoConfig.width === 300" (click)="setWidth(300)">Wide</button>
              </div>
            </div>
            <div class="ctrl-group">
              <span class="ctrl-label">Options</span>
              <div class="ctrl-btns">
                <button class="ctrl-btn" [class.ctrl-btn--active]="demoConfig.showSearch" (click)="toggleSearch()">Search</button>
                <button class="ctrl-btn" [class.ctrl-btn--active]="demoConfig.collapsible" (click)="toggleCollapsible()">Collapsible</button>
                <button class="ctrl-btn" [class.ctrl-btn--active]="demoShowHeader" (click)="demoShowHeader = !demoShowHeader">Header</button>
                <button class="ctrl-btn" [class.ctrl-btn--active]="!demoShowSidebar" (click)="demoShowSidebar = !demoShowSidebar">Hide Sidebar</button>
              </div>
            </div>
          </div>

          <!-- App shell frame -->
          <div class="shell-frame">
            <pui-sidebar
              brandName="Platform"
              [logo]="logoSvg"
              [groups]="navGroups"
              [activeId]="activeId"
              [collapsed]="collapsed"
              [config]="demoConfig"
              [theme]="activeTheme"
              [showHeader]="demoShowHeader"
              [showSidebar]="demoShowSidebar"
              headerAppTitle="Admin Portal"
              headerAppSubtitle="Management Console"
              [headerBgColor]="headerBg"
              headerUserName="Bhairab Patra"
              headerUserEmail="bhairab@example.com"
              headerGreeting="Hi"
              [headerBadge]="{ text: 'UAT', color: '#f59e0b', textColor: '#fff' }"
              [headerMenuItems]="demoHeaderMenuItems"
              (collapsedChange)="collapsed = $event"
              (itemSelect)="onItemSelect($event)"
              (headerMenuAction)="onHeaderMenuAction($event)">

              <!-- Content projected into pui-sidebar's <ng-content> -->
              <div class="fake-content">
                <div class="fake-page-head">
                  <div>
                    <div class="fake-page-title">{{ activePage }}</div>
                    <div class="fake-page-sub">{{ activeDesc }}</div>
                  </div>
                </div>
                <div class="fake-cards">
                  <div class="fake-card" *ngFor="let c of fakeCards">
                    <div class="fake-card__label">{{ c.label }}</div>
                    <div class="fake-card__value" [style.color]="c.color">{{ c.value }}</div>
                    <div class="fake-card__change">{{ c.change }}</div>
                  </div>
                </div>
                <div class="fake-table-row" *ngFor="let r of [1,2,3,4,5]">
                  <div class="fake-cell fake-cell--name"></div>
                  <div class="fake-cell fake-cell--val"></div>
                  <div class="fake-cell fake-cell--badge"></div>
                  <div class="fake-cell fake-cell--action"></div>
                </div>
              </div>
            </pui-sidebar>
          </div>

          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copy(codeBasic, 'basic')">{{ copied['basic'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeBasic }}</code></pre>
          </div>
        </div>

        <!-- ── Theme Customization ────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Theme Customization</h3>
            <p class="ds__desc">
              Pass any <code class="ic">SidebarTheme</code> object to override colors.
              Four built-in presets are exported as <code class="ic">SIDEBAR_THEMES</code>.
            </p>
          </div>
          <div class="theme-showcase">
            <div class="theme-card" *ngFor="let t of themeKeys" (click)="setTheme(t)">
              <div class="theme-card__preview" [style.background]="SIDEBAR_THEMES[t].bg">
                <div class="theme-card__item theme-card__item--active"
                     [style.borderLeftColor]="SIDEBAR_THEMES[t].activeBorder"
                     [style.background]="SIDEBAR_THEMES[t].activeBg"
                     [style.color]="SIDEBAR_THEMES[t].activeText">
                  <span class="theme-card__dot" [style.background]="SIDEBAR_THEMES[t].activeBorder"></span>
                  Dashboard
                </div>
                <div class="theme-card__item"
                     [style.color]="SIDEBAR_THEMES[t].textColor">
                  <span class="theme-card__dot" style="background:currentColor;opacity:.4"></span>
                  Analytics
                </div>
                <div class="theme-card__item"
                     [style.color]="SIDEBAR_THEMES[t].textColor">
                  <span class="theme-card__dot" style="background:currentColor;opacity:.4"></span>
                  Settings
                </div>
              </div>
              <div class="theme-card__name"
                   [class.theme-card__name--active]="activeThemeName === t">
                {{ t }}
                <span *ngIf="activeThemeName === t" class="theme-card__check">✓</span>
              </div>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copy(codeTheme, 'theme')">{{ copied['theme'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeTheme }}</code></pre>
          </div>
        </div>

        <!-- ── Nav Data Structure ─────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Navigation Data Structure</h3>
            <p class="ds__desc">
              Build your nav tree with <code class="ic">SidebarGroup[]</code>.
              Groups contain <code class="ic">SidebarNavItem[]</code> — items support icons, badges, children (submenu), disabled state, and dividers.
            </p>
          </div>
          <div class="feature-grid">
            <div class="feature-card" *ngFor="let f of features">
              <div class="feature-card__icon" [innerHTML]="f.icon"></div>
              <div class="feature-card__name">{{ f.name }}</div>
              <div class="feature-card__desc">{{ f.desc }}</div>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copy(codeData, 'data')">{{ copied['data'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeData }}</code></pre>
          </div>
        </div>

        <!-- ── With PuiHeader (App Shell) ────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">App Shell — Combined with PuiHeader</h3>
            <p class="ds__desc">
              Use <code class="ic">pui-sidebar</code> alongside the existing <code class="ic">pui-header</code>
              to build a complete admin layout. The sidebar emits <code class="ic">(itemSelect)</code> — wire it to <code class="ic">Router.navigate()</code> for full routing support.
            </p>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copy(codeShell, 'shell')">{{ copied['shell'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeShell }}</code></pre>
          </div>
        </div>

      </ng-container>
    </docs-page>
  `,
  styles: [`
    /* ── Section block ──────────────────────────────────── */
    .ds {
      width: 100%; display: flex; flex-direction: column;
      gap: 20px; padding: 32px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .ds:last-child  { border-bottom: none; padding-bottom: 0; }
    .ds:first-child { padding-top: 0; }

    .ds__head { display: flex; flex-direction: column; gap: 6px; }
    .ds__title {
      font-size: 16px; font-weight: 700; color: #111827; margin: 0;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .ds__desc {
      font-size: 13.5px; color: #6b7280; margin: 0; line-height: 1.7;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .ic {
      background: #f3f4f6; color: #1f2937;
      padding: 1px 6px; border-radius: 4px;
      font-size: 12.5px; border: 1px solid #e5e7eb;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }

    /* ── Controls bar ───────────────────────────────────── */
    .controls-bar {
      display: flex; flex-wrap: wrap; gap: 20px;
      padding: 14px 18px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      align-items: center;
    }
    .ctrl-group {
      display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    }
    .ctrl-label {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .07em; color: #9ca3af;
      font-family: 'Poppins', system-ui, sans-serif;
      white-space: nowrap;
    }
    .ctrl-btns { display: flex; gap: 6px; }
    .ctrl-btn {
      padding: 5px 12px; border-radius: 6px;
      border: 1.5px solid #e2e8f0; background: #fff;
      font-size: 12px; font-weight: 500; color: #6b7280;
      cursor: pointer; font-family: 'Poppins', system-ui, sans-serif;
      transition: border-color .12s, color .12s, background .12s;
    }
    .ctrl-btn:hover    { border-color: #12C6A8; color: #0fa78d; }
    .ctrl-btn--active  { border-color: #12C6A8; background: #f0fdfb; color: #0fa78d; font-weight: 600; }

    .theme-pills { display: flex; gap: 6px; flex-wrap: wrap; }
    .theme-pill {
      display: flex; align-items: center; gap: 6px;
      padding: 5px 12px; border-radius: 6px;
      border: 1.5px solid #e2e8f0; background: #fff;
      font-size: 12px; font-weight: 500; color: #6b7280;
      cursor: pointer; font-family: 'Poppins', system-ui, sans-serif;
      transition: border-color .12s, color .12s, background .12s;
      text-transform: capitalize;
    }
    .theme-pill:hover   { border-color: #12C6A8; color: #0fa78d; }
    .theme-pill--active { border-color: #12C6A8; background: #f0fdfb; color: #0fa78d; font-weight: 600; }
    .theme-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

    /* ── App shell frame ────────────────────────────────── */
    .shell-frame {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,.06);
      height: 480px;
    }
    .shell-frame pui-sidebar { height: 100%; }

    .fake-content {
      flex: 1; overflow-y: auto;
      background: #f8fafc;
      padding: 24px;
      display: flex; flex-direction: column; gap: 16px;
    }

    /* Fake page header */
    .fake-page-head {
      display: flex; align-items: flex-start; justify-content: space-between;
    }
    .fake-page-title {
      font-size: 20px; font-weight: 700; color: #111827;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .fake-page-sub {
      font-size: 13px; color: #9ca3af; margin-top: 2px;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* Fake stat cards */
    .fake-cards {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
    }
    .fake-card {
      background: #fff; border: 1px solid #e5e7eb;
      border-radius: 10px; padding: 16px;
    }
    .fake-card__label {
      font-size: 11px; color: #9ca3af; text-transform: uppercase;
      letter-spacing: .06em; font-weight: 600;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .fake-card__value {
      font-size: 24px; font-weight: 800; margin: 6px 0 2px;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .fake-card__change {
      font-size: 11.5px; color: #6b7280;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* Fake table rows */
    .fake-table-row {
      background: #fff; border: 1px solid #e5e7eb;
      border-radius: 8px; padding: 12px 16px;
      display: flex; align-items: center; gap: 16px;
    }
    .fake-cell { border-radius: 4px; background: #f3f4f6; }
    .fake-cell--name  { flex: 1; height: 10px; }
    .fake-cell--val   { width: 80px; height: 10px; }
    .fake-cell--badge { width: 50px; height: 18px; border-radius: 20px; background: #e0fdf4; }
    .fake-cell--action{ width: 28px; height: 28px; border-radius: 6px; }

    /* ── Theme showcase ─────────────────────────────────── */
    .theme-showcase {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
    }
    .theme-card {
      cursor: pointer;
      border-radius: 10px; overflow: hidden;
      border: 2px solid #e5e7eb;
      transition: border-color .14s, transform .14s;
    }
    .theme-card:hover { border-color: #12C6A8; transform: translateY(-2px); }
    .theme-card__preview {
      padding: 14px 10px; display: flex; flex-direction: column; gap: 2px;
    }
    .theme-card__item {
      display: flex; align-items: center; gap: 8px;
      padding: 7px 10px; border-radius: 6px;
      font-size: 12px; font-weight: 500;
      font-family: 'Poppins', system-ui, sans-serif;
      border-left: 3px solid transparent;
    }
    .theme-card__item--active { border-left-width: 3px; font-weight: 600; }
    .theme-card__dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
    .theme-card__name {
      padding: 10px 12px;
      font-size: 13px; font-weight: 600; color: #374151;
      background: #f9fafb;
      font-family: 'Poppins', system-ui, sans-serif;
      text-transform: capitalize;
      display: flex; align-items: center; justify-content: space-between;
    }
    .theme-card__name--active { color: #0fa78d; }
    .theme-card__check { color: #12C6A8; font-size: 14px; }

    /* ── Feature grid ───────────────────────────────────── */
    .feature-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
    }
    .feature-card {
      padding: 16px 18px;
      border: 1.5px solid #e5e7eb;
      border-radius: 10px; background: #fafafa;
      display: flex; flex-direction: column; gap: 6px;
    }
    .feature-card__icon {
      display: flex; width: 32px; height: 32px;
      background: #f0fdfb; border-radius: 8px;
      align-items: center; justify-content: center;
      color: #12C6A8;
    }
    .feature-card__icon svg { width: 16px; height: 16px; }
    .feature-card__name {
      font-size: 13.5px; font-weight: 600; color: #111827;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .feature-card__desc {
      font-size: 12.5px; color: #6b7280; line-height: 1.5;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* ── Code block ─────────────────────────────────────── */
    .code-wrap   { border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; }
    .code-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 20px; background: #1e293b; border-bottom: 1px solid #334155;
    }
    .code-lang {
      font-size: 11px; color: #64748b;
      font-weight: 700; text-transform: uppercase; letter-spacing: .07em;
    }
    .copy-btn {
      padding: 3px 12px; border-radius: 5px;
      border: 1px solid #334155; background: #0f172a;
      color: #94a3b8; font-size: 12px; cursor: pointer;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .copy-btn:hover { color: #e2e8f0; border-color: #475569; }
    pre { border-radius: 0; border: none; margin: 0; }
  `],
})
export class SidebarPageComponent {
  navGroups = NAV_GROUPS;
  SIDEBAR_THEMES = SIDEBAR_THEMES;

  activeId   = 'dashboard';
  collapsed  = false;

  themeKeys  = ['dark', 'slate', 'light', 'brand'] as const;
  themeColors: Record<string, string> = {
    dark: '#0f172a', slate: '#1e293b', light: '#ffffff', brand: '#0d9d8a',
  };
  activeThemeName: string = 'dark';
  activeTheme: SidebarTheme = SIDEBAR_THEMES['dark'];

  demoConfig: SidebarConfig = { width: 260, showSearch: true, collapsible: true };

  activePage = 'Dashboard';
  activeDesc = 'Welcome back! Here\'s what\'s happening on your platform today.';

  fakeCards = [
    { label: 'Total Revenue', value: '$84,250', change: '↑ 12% from last month', color: '#111827' },
    { label: 'Active Users',  value: '2,340',   change: '↑ 8% from last month',  color: '#12C6A8' },
    { label: 'New Orders',    value: '142',      change: '↓ 3% from last month',  color: '#f59e0b' },
    { label: 'Open Tickets',  value: '17',       change: '↑ 2 since yesterday',   color: '#ef4444' },
  ];

  demoShowHeader  = false;
  demoShowSidebar = true;

  demoHeaderMenuItems = [
    { label: 'My Profile', action: 'profile', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
    { label: 'Settings',   action: 'settings', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>` },
    { label: 'Sign Out',   action: 'logout', danger: true, icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>` },
  ];

  copied: Record<string, boolean> = {};

  get headerBg(): string {
    if (this.activeThemeName === 'brand') return '#0a8a79';
    return '#12C6A8';
  }

  logoSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#12C6A8"/>
    <path d="M8 16h16M16 8l8 8-8 8" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  setWidth(w: number): void {
    this.demoConfig = { ...this.demoConfig, width: w };
  }

  toggleSearch(): void {
    this.demoConfig = { ...this.demoConfig, showSearch: !this.demoConfig.showSearch };
  }

  toggleCollapsible(): void {
    this.demoConfig = { ...this.demoConfig, collapsible: !this.demoConfig.collapsible };
  }

  setTheme(name: string): void {
    this.activeThemeName = name;
    this.activeTheme = SIDEBAR_THEMES[name];
  }

  onItemSelect(item: SidebarNavItem): void {
    this.activeId   = item.id;
    this.activePage = item.label;
    this.activeDesc = item.route
      ? `Route: ${item.route}`
      : 'Select a menu item to navigate.';
  }

  onHeaderMenuAction(action: string): void {
    console.log('Header menu action:', action);
  }

  features = [
    {
      name: 'Groups & Labels',
      desc: 'Organize items into named sections with optional group headings.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="5" rx="1"/><rect x="3" y="10" width="18" height="5" rx="1"/><rect x="3" y="17" width="18" height="5" rx="1"/></svg>`,
    },
    {
      name: 'Submenus',
      desc: 'Nest items under a parent with smooth accordion expand/collapse.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M8 12h12M12 18h8"/></svg>`,
    },
    {
      name: 'Live Search',
      desc: 'Filters all groups and submenus. Matches highlighted in teal.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>`,
    },
    {
      name: 'Badges',
      desc: '5 badge variants: primary, success, warning, danger, info.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
    },
    {
      name: 'Collapse',
      desc: 'Animates to icon-only rail. Tooltip shows full label when hovering.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>`,
    },
    {
      name: 'Theme Tokens',
      desc: 'Full color control via SidebarTheme. 4 built-in presets included.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
    },
  ];

  importCode = `import { PuiSidebarComponent, SIDEBAR_THEMES } from '@solifi/platform-ui';
import type { SidebarGroup, SidebarTheme, SidebarConfig } from '@solifi/platform-ui';

@Component({
  imports: [PuiSidebarComponent],
})`;

  codeBasic = `<!-- HTML -->
<div class="app-shell">
  <pui-sidebar
    brandName="My App"
    [groups]="navGroups"
    [activeId]="activeId"
    [collapsed]="sidebarCollapsed"
    [config]="{ width: 260, showSearch: true, collapsible: true }"
    [theme]="SIDEBAR_THEMES['dark']"
    (collapsedChange)="sidebarCollapsed = $event"
    (itemSelect)="onNav($event)">
  </pui-sidebar>

  <main class="app-content">
    <router-outlet></router-outlet>
  </main>
</div>

// TypeScript
import { PuiSidebarComponent, SIDEBAR_THEMES, SidebarNavItem } from '@solifi/platform-ui';

sidebarCollapsed = false;
activeId = 'dashboard';

onNav(item: SidebarNavItem): void {
  this.activeId = item.id;
  if (item.route) this.router.navigate([item.route]);
}`;

  codeTheme = `import { SIDEBAR_THEMES } from '@solifi/platform-ui';

// ── Built-in presets ─────────────────────────────────
[theme]="SIDEBAR_THEMES['dark']"    // #0f172a background
[theme]="SIDEBAR_THEMES['slate']"   // #1e293b background
[theme]="SIDEBAR_THEMES['light']"   // #ffffff background
[theme]="SIDEBAR_THEMES['brand']"   // teal background

// ── Custom theme ─────────────────────────────────────
customTheme: SidebarTheme = {
  bg:            '#1a1a2e',
  textColor:     '#a0a0c0',
  activeText:    '#ffffff',
  activeBg:      'rgba(255,255,255,.1)',
  activeBorder:  '#6c63ff',          // purple accent
  hoverBg:       'rgba(255,255,255,.06)',
  hoverText:     '#e0e0ff',
  borderColor:   'rgba(255,255,255,.08)',
  groupTextColor:'#505070',
  subitemBg:     'rgba(0,0,0,.2)',
};`;

  codeData = `import { SidebarGroup } from '@solifi/platform-ui';

navGroups: SidebarGroup[] = [
  {
    id: 'main',
    label: 'Main Menu',          // optional group heading
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        route: '/dashboard',
        icon: \`<svg>…</svg>\`,    // inline SVG string
      },
      {
        id: 'analytics',
        label: 'Analytics',
        badge: 'New',
        badgeVariant: 'success', // primary | success | warning | danger | info
        children: [              // submenu items
          { id: 'reports', label: 'Reports',       route: '/reports' },
          { id: 'charts',  label: 'Charts',        route: '/charts'  },
          { id: 'exports', label: 'Data Exports',  route: '/exports',
            badge: 3, badgeVariant: 'primary' },
        ],
      },
      {
        id: 'orders',
        label: 'Orders',
        badge: 12,
        badgeVariant: 'warning',
        dividerAfter: true,      // renders a divider below this item
      },
      {
        id: 'legacy',
        label: 'Legacy Portal',
        disabled: true,          // shown but not clickable
      },
    ],
  },
];`;

  codeShell = `// app.component.ts — full admin shell
import { PuiHeaderComponent, PuiSidebarComponent,
         SIDEBAR_THEMES, SidebarNavItem } from '@solifi/platform-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PuiHeaderComponent, PuiSidebarComponent, PuiToastContainerComponent],
  template: \`
    <!-- Top header — full width -->
    <pui-header
      appTitle="Admin Portal"
      appSubtitle="Platform Management"
      [badge]="{ text: 'UAT', color: '#f59e0b' }"
      [navLinks]="headerLinks"
      [userMenu]="userMenu"
      (menuAction)="onHeaderAction($event)">
    </pui-header>

    <!-- Body: sidebar + content -->
    <div class="shell">
      <pui-sidebar
        brandName="Platform"
        [groups]="navGroups"
        [activeId]="activeId"
        [collapsed]="sidebarCollapsed"
        [theme]="SIDEBAR_THEMES['dark']"
        (collapsedChange)="sidebarCollapsed = $event"
        (itemSelect)="onNav($event)">
      </pui-sidebar>

      <main class="shell__content">
        <router-outlet></router-outlet>
      </main>
    </div>

    <pui-toast-container></pui-toast-container>
  \`,
  styles: [\`
    :host { display: flex; flex-direction: column; height: 100vh; }
    .shell { display: flex; flex: 1; overflow: hidden; }
    .shell__content { flex: 1; overflow-y: auto; }
  \`]
})
export class AppComponent {
  private router = inject(Router);
  sidebarCollapsed = false;
  activeId = 'dashboard';
  SIDEBAR_THEMES = SIDEBAR_THEMES;

  onNav(item: SidebarNavItem): void {
    this.activeId = item.id;
    if (item.route) this.router.navigate([item.route]);
  }
}`;

  api: ApiRow[] = [
    { input: 'groups',          type: 'SidebarGroup[]',  default: '[]',       description: 'Navigation groups — each has an id, optional label, and items array.' },
    { input: 'activeId',        type: 'string',           default: "''",       description: 'Id of the currently active nav item.' },
    { input: 'collapsed',       type: 'boolean',          default: 'false',    description: 'Whether the sidebar is in icon-only collapsed mode.' },
    { input: 'config',          type: 'SidebarConfig',    default: '{}',       description: 'width, collapsedWidth, showSearch, collapsible, maxLabelLen.' },
    { input: 'theme',           type: 'SidebarTheme',     default: 'dark',     description: 'Color token overrides. Use SIDEBAR_THEMES presets or supply custom object.' },
    { input: 'brandName',       type: 'string',           default: "''",       description: 'Brand text shown next to the logo in expanded state.' },
    { input: 'logo',            type: 'string',           default: 'built-in', description: 'SVG string or HTML for the logo. Defaults to the PlatformUI icon.' },
    { input: '(itemSelect)',    type: 'SidebarNavItem',   default: '—',        description: 'Emits when a leaf nav item (no children) is clicked.' },
    { input: '(collapsedChange)', type: 'boolean',        default: '—',        description: 'Emits the new collapsed state when the toggle is clicked.' },
  ];

  copy(code: string, key: string): void {
    navigator.clipboard?.writeText(code);
    this.copied[key] = true;
    setTimeout(() => this.copied[key] = false, 2000);
  }
}
