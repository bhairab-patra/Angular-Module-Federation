import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgFor, NgIf, NgClass, NgStyle } from '@angular/common';
import { PuiSearchComponent } from '../search/search.component';
import { HeaderComponent } from '../header/header.component';
import { NavLink, UserMenuItem, HeaderBadge } from '../models/header.model';
import {
  SidebarGroup, SidebarNavItem, SidebarConfig, SidebarTheme, SIDEBAR_THEMES
} from '../models/sidebar.model';

const DEFAULT_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/></svg>`;

@Component({
  selector: 'pui-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, NgStyle, PuiSearchComponent, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="pui-shell">

    <!-- ── Optional PuiHeader ────────────────────────── -->
    <pui-header *ngIf="showHeader"
      [appTitle]="headerAppTitle"
      [appSubtitle]="headerAppSubtitle"
      [logoText]="headerLogoText"
      [bgColor]="headerBgColor"
      [textColor]="headerTextColor"
      [navLinks]="headerNavLinks"
      [userName]="headerUserName"
      [userEmail]="headerUserEmail"
      [greeting]="headerGreeting"
      [userSubtext]="headerUserSubtext"
      [avatarUrl]="headerAvatarUrl"
      [avatarColor]="headerAvatarColor"
      [badge]="headerBadge"
      [showHelp]="headerShowHelp"
      [menuItems]="headerMenuItems"
      (menuAction)="headerMenuAction.emit($event)"
      (helpClick)="headerHelpClick.emit()">
    </pui-header>

    <!-- ── Shell body row ────────────────────────────── -->
    <div class="pui-shell__body">

      <!-- ── Sidebar rail (hideable via showSidebar) ── -->
      <aside class="pui-sb"
             [class.pui-sb--collapsed]="collapsed"
             [class.pui-sb--hidden]="!showSidebar"
             [ngStyle]="cssVars">

        <!-- Brand / Logo area -->
        <div class="pui-sb__brand">
          <div class="pui-sb__logo-wrap">
            <span class="pui-sb__logo" [innerHTML]="logo || defaultLogo"></span>
            <span class="pui-sb__brand-name" *ngIf="!collapsed && brandName">{{ brandName }}</span>
          </div>
          <button
            *ngIf="cfg.collapsible && !collapsed"
            class="pui-sb__toggle"
            (click)="toggleCollapse()"
            title="Collapse sidebar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        </div>

        <!-- Search -->
        <div class="pui-sb__search" *ngIf="cfg.showSearch && !collapsed">
          <pui-search
            size="sm"
            placeholder="Search menu…"
            [debounce]="200"
            [clearable]="true"
            (searchChange)="onSearch($event)"
            (cleared)="onSearch('')">
          </pui-search>
        </div>

        <!-- Navigation -->
        <nav class="pui-sb__nav">
          <div class="pui-sb__group" *ngFor="let group of displayGroups">

            <div class="pui-sb__group-label" *ngIf="group.label && !collapsed">
              {{ group.label }}
            </div>

            <ul class="pui-sb__list">
              <li *ngFor="let item of group.items"
                  class="pui-sb__li"
                  [class.pui-sb__li--divider]="item.dividerAfter">

                <button
                  class="pui-sb__item"
                  [class.pui-sb__item--active]="activeId === item.id"
                  [class.pui-sb__item--disabled]="item.disabled"
                  [title]="collapsed ? item.label : (needsEllipsis(item.label) ? item.label : '')"
                  (click)="clickItem(item)">

                  <span class="pui-sb__item-icon" [innerHTML]="item.icon || defaultIcon"></span>

                  <span class="pui-sb__item-body" *ngIf="!collapsed">
                    <span class="pui-sb__item-label"
                          [innerHTML]="highlight(item.label)"
                          [class.pui-sb__item-label--ellipsis]="needsEllipsis(item.label)">
                    </span>
                    <span *ngIf="item.badge !== undefined"
                          class="pui-sb__badge"
                          [ngClass]="'pui-sb__badge--' + (item.badgeVariant || 'primary')">
                      {{ item.badge }}
                    </span>
                  </span>

                  <span *ngIf="item.children?.length && !collapsed"
                        class="pui-sb__arrow"
                        [class.pui-sb__arrow--open]="openIds.has(item.id)">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
                  </span>
                </button>

                <ul class="pui-sb__sub"
                    [class.pui-sb__sub--open]="openIds.has(item.id) && !collapsed"
                    *ngIf="item.children?.length">
                  <li *ngFor="let child of item.children">
                    <button
                      class="pui-sb__subitem"
                      [class.pui-sb__subitem--active]="activeId === child.id"
                      [class.pui-sb__subitem--disabled]="child.disabled"
                      [title]="needsEllipsis(child.label) ? child.label : ''"
                      (click)="clickItem(child)">
                      <span class="pui-sb__subitem-dot"></span>
                      <span class="pui-sb__subitem-label"
                            [innerHTML]="highlight(child.label)"
                            [class.pui-sb__item-label--ellipsis]="needsEllipsis(child.label)">
                      </span>
                      <span *ngIf="child.badge !== undefined"
                            class="pui-sb__badge"
                            [ngClass]="'pui-sb__badge--' + (child.badgeVariant || 'primary')">
                        {{ child.badge }}
                      </span>
                    </button>
                  </li>
                </ul>

              </li>
            </ul>
          </div>

          <div class="pui-sb__empty" *ngIf="displayGroups.length === 0 && searchQuery">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
            <span>No results for "{{ searchQuery }}"</span>
          </div>
        </nav>

        <!-- Footer -->
        <div class="pui-sb__footer">
          <button
            *ngIf="cfg.collapsible && collapsed"
            class="pui-sb__expand-btn"
            (click)="toggleCollapse()"
            title="Expand sidebar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <ng-content select="[sidebar-footer]"></ng-content>
        </div>

      </aside>

      <!-- ── Main content slot ──────────────────────── -->
      <div class="pui-shell__content">
        <ng-content></ng-content>
      </div>

    </div><!-- /pui-shell__body -->
  </div><!-- /pui-shell -->
  `,
  styles: [`
    :host { display: block; height: 100%; }

    /* ── Shell wrapper ───────────────────────────────────── */
    .pui-shell {
      display: flex; flex-direction: column;
      height: 100%; overflow: hidden;
    }
    .pui-shell__body {
      display: flex; flex: 1; overflow: hidden;
    }
    .pui-shell__content {
      flex: 1; overflow: auto; min-width: 0;
    }

    /* ── Sidebar rail ────────────────────────────────────── */
    .pui-sb {
      display: flex; flex-direction: column;
      height: 100%; overflow: hidden;
      background: var(--pui-sb-bg);
      border-right: 1px solid var(--pui-sb-border);
      width: var(--pui-sb-w);
      min-width: var(--pui-sb-w);
      transition: width .22s cubic-bezier(.4,0,.2,1), min-width .22s cubic-bezier(.4,0,.2,1);
      font-family: 'Poppins', system-ui, sans-serif;
      position: relative;
    }
    .pui-sb--collapsed {
      width: var(--pui-sb-cw);
      min-width: var(--pui-sb-cw);
    }
    .pui-sb--hidden {
      width: 0 !important; min-width: 0 !important;
      overflow: hidden; border-right: none;
      transition: width .22s cubic-bezier(.4,0,.2,1);
    }

    /* ── Brand ──────────────────────────────────────────── */
    .pui-sb__brand {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 16px 16px;
      border-bottom: 1px solid var(--pui-sb-border);
      flex-shrink: 0;
      gap: 8px;
    }
    .pui-sb__logo-wrap {
      display: flex; align-items: center; gap: 10px;
      overflow: hidden; min-width: 0;
    }
    .pui-sb__logo {
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; width: 32px; height: 32px;
    }
    .pui-sb__logo svg, .pui-sb__logo img { width: 32px; height: 32px; }
    .pui-sb__brand-name {
      font-size: 15px; font-weight: 700;
      color: var(--pui-sb-active-txt);
      white-space: nowrap; overflow: hidden;
      text-overflow: ellipsis;
      opacity: 1; transition: opacity .18s;
    }
    .pui-sb--collapsed .pui-sb__brand-name { opacity: 0; width: 0; }

    .pui-sb__toggle {
      flex-shrink: 0; width: 28px; height: 28px;
      border-radius: 7px; border: 1px solid var(--pui-sb-border);
      background: transparent; color: var(--pui-sb-text);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background .14s, color .14s, border-color .14s;
    }
    .pui-sb__toggle:hover {
      background: var(--pui-sb-hover-bg);
      color: var(--pui-sb-hover-txt);
      border-color: var(--pui-sb-active-brd);
    }

    /* ── Search ─────────────────────────────────────────── */
    .pui-sb__search {
      padding: 12px 12px 8px;
      flex-shrink: 0;
    }
    .pui-sb__search pui-search { display: block; width: 100%; }

    /* ── Nav ─────────────────────────────────────────────── */
    .pui-sb__nav {
      flex: 1; overflow-y: auto; overflow-x: hidden;
      padding: 8px 0 12px;
      scrollbar-width: thin;
      scrollbar-color: var(--pui-sb-border) transparent;
    }
    .pui-sb__nav::-webkit-scrollbar { width: 4px; }
    .pui-sb__nav::-webkit-scrollbar-thumb {
      background: var(--pui-sb-border); border-radius: 4px;
    }

    /* ── Group ───────────────────────────────────────────── */
    .pui-sb__group { margin-bottom: 4px; }
    .pui-sb__group-label {
      font-size: 10.5px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .08em;
      color: var(--pui-sb-group-txt);
      padding: 14px 16px 4px;
      white-space: nowrap; overflow: hidden;
    }
    .pui-sb__list { list-style: none; margin: 0; padding: 0; }
    .pui-sb__li { position: relative; }
    .pui-sb__li--divider { border-bottom: 1px solid var(--pui-sb-border); margin-bottom: 8px; padding-bottom: 8px; }

    /* ── Item ────────────────────────────────────────────── */
    .pui-sb__item {
      width: 100%; display: flex; align-items: center; gap: 10px;
      padding: 0 10px 0 12px; height: 40px;
      border: none; background: transparent;
      color: var(--pui-sb-text);
      cursor: pointer; text-align: left;
      transition: background .13s, color .13s;
      position: relative;
      font-family: inherit;
    }
    .pui-sb__item::before {
      content: ''; position: absolute; left: 0; top: 6px; bottom: 6px;
      width: 3px; border-radius: 0 3px 3px 0;
      background: transparent;
      transition: background .13s;
    }
    .pui-sb__item:hover:not(.pui-sb__item--disabled) {
      background: var(--pui-sb-hover-bg);
      color: var(--pui-sb-hover-txt);
    }
    .pui-sb__item--active {
      background: var(--pui-sb-active-bg) !important;
      color: var(--pui-sb-active-txt) !important;
    }
    .pui-sb__item--active::before { background: var(--pui-sb-active-brd) !important; }
    .pui-sb__item--disabled { opacity: .42; cursor: not-allowed; }

    /* ── Collapsed: center icon ──────────────────────────── */
    .pui-sb--collapsed .pui-sb__item {
      padding: 0; justify-content: center;
    }
    .pui-sb--collapsed .pui-sb__item::before { display: none; }

    /* ── Icon ────────────────────────────────────────────── */
    .pui-sb__item-icon {
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; width: 18px; height: 18px;
      opacity: .85;
      transition: opacity .13s;
    }
    .pui-sb__item--active .pui-sb__item-icon,
    .pui-sb__item:hover .pui-sb__item-icon { opacity: 1; }
    .pui-sb__item-icon svg { width: 18px; height: 18px; }

    /* ── Label ───────────────────────────────────────────── */
    .pui-sb__item-body {
      flex: 1; display: flex; align-items: center;
      gap: 8px; min-width: 0; overflow: hidden;
    }
    .pui-sb__item-label {
      flex: 1; font-size: 13.5px; font-weight: 500;
      white-space: nowrap; overflow: hidden;
      text-overflow: ellipsis;
    }
    .pui-sb__item-label--ellipsis { cursor: help; }
    .pui-sb__item-label mark {
      background: rgba(18,198,168,.35);
      color: inherit; border-radius: 2px; padding: 0 1px;
    }

    /* ── Arrow ───────────────────────────────────────────── */
    .pui-sb__arrow {
      flex-shrink: 0; display: flex; align-items: center;
      color: var(--pui-sb-text); opacity: .6;
      transition: transform .2s, opacity .13s;
    }
    .pui-sb__arrow--open { transform: rotate(90deg); opacity: 1; }
    .pui-sb__item:hover .pui-sb__arrow { opacity: 1; }

    /* ── Badge ───────────────────────────────────────────── */
    .pui-sb__badge {
      flex-shrink: 0;
      font-size: 10.5px; font-weight: 700;
      padding: 1px 7px; border-radius: 20px;
      line-height: 1.6;
    }
    .pui-sb__badge--primary { background: rgba(18,198,168,.2); color: #12C6A8; }
    .pui-sb__badge--success { background: rgba(34,197,94,.2);  color: #22c55e; }
    .pui-sb__badge--warning { background: rgba(245,158,11,.2); color: #f59e0b; }
    .pui-sb__badge--danger  { background: rgba(239,68,68,.2);  color: #ef4444; }
    .pui-sb__badge--info    { background: rgba(59,130,246,.2); color: #3b82f6; }

    /* ── Submenu ─────────────────────────────────────────── */
    .pui-sb__sub {
      list-style: none; margin: 0; padding: 0;
      max-height: 0; overflow: hidden;
      transition: max-height .22s cubic-bezier(.4,0,.2,1);
      background: var(--pui-sb-sub-bg);
    }
    .pui-sb__sub--open { max-height: 600px; }

    .pui-sb__subitem {
      width: 100%; display: flex; align-items: center; gap: 10px;
      padding: 0 10px 0 44px; height: 36px;
      border: none; background: transparent;
      color: var(--pui-sb-text); opacity: .85;
      cursor: pointer; text-align: left;
      font-family: inherit;
      transition: background .13s, color .13s, opacity .13s;
    }
    .pui-sb__subitem:hover:not(.pui-sb__subitem--disabled) {
      background: var(--pui-sb-hover-bg);
      color: var(--pui-sb-hover-txt);
      opacity: 1;
    }
    .pui-sb__subitem--active {
      color: var(--pui-sb-active-txt) !important;
      opacity: 1 !important;
    }
    .pui-sb__subitem--disabled { opacity: .35; cursor: not-allowed; }

    .pui-sb__subitem-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: currentColor; opacity: .5; flex-shrink: 0;
      transition: opacity .13s;
    }
    .pui-sb__subitem--active .pui-sb__subitem-dot,
    .pui-sb__subitem:hover .pui-sb__subitem-dot { opacity: 1; }

    .pui-sb__subitem-label {
      flex: 1; font-size: 13px; font-weight: 400;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    /* ── Empty state ─────────────────────────────────────── */
    .pui-sb__empty {
      display: flex; flex-direction: column; align-items: center;
      gap: 10px; padding: 32px 16px;
      color: var(--pui-sb-group-txt);
      font-size: 13px; text-align: center;
    }

    /* ── Footer ──────────────────────────────────────────── */
    .pui-sb__footer {
      flex-shrink: 0;
      padding: 12px;
      border-top: 1px solid var(--pui-sb-border);
      display: flex; justify-content: center;
    }
    .pui-sb__expand-btn {
      width: 36px; height: 36px; border-radius: 8px;
      border: 1px solid var(--pui-sb-border);
      background: transparent; color: var(--pui-sb-text);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: background .13s, color .13s;
    }
    .pui-sb__expand-btn:hover {
      background: var(--pui-sb-hover-bg);
      color: var(--pui-sb-hover-txt);
    }
  `],
})
export class PuiSidebarComponent implements OnChanges {

  // ── Sidebar rail ───────────────────────────────────────
  @Input() groups: SidebarGroup[] = [];
  @Input() activeId = '';
  @Input() collapsed = false;
  @Input() config: SidebarConfig = {};
  @Input() theme: SidebarTheme = {};
  @Input() brandName = '';
  @Input() logo = '';
  @Input() showSidebar = true;

  // ── Header integration ─────────────────────────────────
  @Input() showHeader = false;
  @Input() headerAppTitle = 'My App';
  @Input() headerAppSubtitle = '';
  @Input() headerLogoText = '';
  @Input() headerBgColor = '#12C6A8';
  @Input() headerTextColor = '#ffffff';
  @Input() headerNavLinks: NavLink[] = [];
  @Input() headerUserName = '';
  @Input() headerUserEmail = '';
  @Input() headerGreeting = 'Hi';
  @Input() headerUserSubtext = 'Welcome back!';
  @Input() headerAvatarUrl = '';
  @Input() headerAvatarColor = '#0d6e5f';
  @Input() headerBadge: HeaderBadge | null = null;
  @Input() headerShowHelp = false;
  @Input() headerMenuItems: UserMenuItem[] = [];

  @Output() collapsedChange  = new EventEmitter<boolean>();
  @Output() itemSelect       = new EventEmitter<SidebarNavItem>();
  @Output() headerMenuAction = new EventEmitter<string>();
  @Output() headerHelpClick  = new EventEmitter<void>();

  defaultIcon = DEFAULT_ICON;
  defaultLogo = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#12C6A8"/><path d="M8 16h16M16 8l8 8-8 8" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  openIds      = new Set<string>();
  searchQuery  = '';
  displayGroups: SidebarGroup[] = [];

  get cfg(): Required<SidebarConfig> {
    return {
      width:          this.config.width          ?? 260,
      collapsedWidth: this.config.collapsedWidth ?? 64,
      showSearch:     this.config.showSearch     ?? true,
      collapsible:    this.config.collapsible    ?? true,
      maxLabelLen:    this.config.maxLabelLen    ?? 22,
    };
  }

  get cssVars(): Record<string, string> {
    const t = this.theme;
    return {
      '--pui-sb-bg':         t.bg             || '#0f172a',
      '--pui-sb-text':       t.textColor      || '#94a3b8',
      '--pui-sb-active-txt': t.activeText     || '#ffffff',
      '--pui-sb-active-bg':  t.activeBg       || 'rgba(255,255,255,.08)',
      '--pui-sb-active-brd': t.activeBorder   || '#12C6A8',
      '--pui-sb-hover-bg':   t.hoverBg        || 'rgba(255,255,255,.05)',
      '--pui-sb-hover-txt':  t.hoverText      || '#e2e8f0',
      '--pui-sb-border':     t.borderColor    || 'rgba(255,255,255,.08)',
      '--pui-sb-group-txt':  t.groupTextColor || '#475569',
      '--pui-sb-sub-bg':     t.subitemBg      || 'rgba(0,0,0,.15)',
      '--pui-sb-w':          `${this.cfg.width}px`,
      '--pui-sb-cw':         `${this.cfg.collapsedWidth}px`,
    };
  }

  ngOnChanges(c: SimpleChanges): void {
    if (c['groups']) {
      this.displayGroups = this.groups;
      this.searchQuery   = '';
    }
  }

  onSearch(q: string): void {
    this.searchQuery = q.trim().toLowerCase();
    if (!this.searchQuery) {
      this.displayGroups = this.groups;
      return;
    }
    this.displayGroups = this.groups
      .map(g => ({ ...g, items: this.filterItems(g.items) }))
      .filter(g => g.items.length > 0);

    // auto-expand groups that have matching children
    this.displayGroups.forEach(g =>
      g.items.forEach(item => {
        if (item.children?.length) this.openIds.add(item.id);
      })
    );
  }

  private filterItems(items: SidebarNavItem[]): SidebarNavItem[] {
    const q = this.searchQuery;
    return items.reduce<SidebarNavItem[]>((acc, item) => {
      const selfMatch     = item.label.toLowerCase().includes(q);
      const filteredKids  = item.children ? this.filterItems(item.children) : [];
      if (selfMatch) {
        acc.push(item);
      } else if (filteredKids.length) {
        acc.push({ ...item, children: filteredKids });
      }
      return acc;
    }, []);
  }

  highlight(text: string): string {
    if (!this.searchQuery) return text;
    const safe = this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${safe})`, 'gi'), '<mark>$1</mark>');
  }

  needsEllipsis(label: string): boolean {
    return label.length > this.cfg.maxLabelLen;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    if (this.collapsed) this.searchQuery = '';
    this.collapsedChange.emit(this.collapsed);
  }

  clickItem(item: SidebarNavItem): void {
    if (item.disabled) return;
    if (item.children?.length) {
      // toggle submenu
      this.openIds.has(item.id) ? this.openIds.delete(item.id) : this.openIds.add(item.id);
    } else {
      this.itemSelect.emit(item);
    }
  }
}
