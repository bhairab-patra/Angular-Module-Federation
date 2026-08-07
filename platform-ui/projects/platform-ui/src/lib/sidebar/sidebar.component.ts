import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
  ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation
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
  selector: 'pui-lib-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, NgStyle, PuiSearchComponent, HeaderComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class PuiSidebarComponent implements OnChanges {

  // ── Sidebar rail ───────────────────────────────────────
  @Input() activeId  = '';
  @Input() brandName = '';
  @Input() logo      = '';

  @Input() set groups(v: SidebarGroup[] | string) {
    this._groups = typeof v === 'string' ? (this._parseJson<SidebarGroup[]>(v) ?? []) : (v || []);
  }
  get groups(): SidebarGroup[] { return this._groups; }
  private _groups: SidebarGroup[] = [];

  @Input() set config(v: SidebarConfig | string) {
    this._config = typeof v === 'string' ? (this._parseJson<SidebarConfig>(v) ?? {}) : (v || {});
  }
  get config(): SidebarConfig { return this._config; }
  private _config: SidebarConfig = {};

  @Input() set theme(v: SidebarTheme | string) {
    this._theme = typeof v === 'string' ? (this._parseJson<SidebarTheme>(v) ?? {}) : (v || {});
  }
  get theme(): SidebarTheme { return this._theme; }
  private _theme: SidebarTheme = {};

  @Input() set collapsed(v: boolean | string) {
    this._collapsed = v === true || v === 'true' || (v as any) === '';
  }
  get collapsed() { return this._collapsed; }
  private _collapsed = false;

  @Input() set showSidebar(v: boolean | string) {
    this._showSidebar = v !== false && v !== 'false';
  }
  get showSidebar() { return this._showSidebar; }
  private _showSidebar = true;

  // ── Header integration ─────────────────────────────────
  @Input() headerAppTitle    = 'My App';
  @Input() headerAppSubtitle = '';
  @Input() headerLogoText    = '';
  @Input() headerBgColor     = '#12C6A8';
  @Input() headerTextColor   = '#ffffff';
  @Input() headerUserName    = '';
  @Input() headerUserEmail   = '';
  @Input() headerGreeting    = 'Hi';
  @Input() headerUserSubtext = 'Welcome back!';
  @Input() headerAvatarUrl   = '';
  @Input() headerAvatarColor = '#0d6e5f';

  @Input() set showHeader(v: boolean | string) {
    this._showHeader = v === true || v === 'true' || (v as any) === '';
  }
  get showHeader() { return this._showHeader; }
  private _showHeader = false;

  @Input() set headerShowHelp(v: boolean | string) {
    this._headerShowHelp = v === true || v === 'true' || (v as any) === '';
  }
  get headerShowHelp() { return this._headerShowHelp; }
  private _headerShowHelp = false;

  @Input() set headerBadge(v: HeaderBadge | string | null) {
    this._headerBadge = typeof v === 'string' ? this._parseJson<HeaderBadge>(v) : v;
  }
  get headerBadge(): HeaderBadge | null { return this._headerBadge; }
  private _headerBadge: HeaderBadge | null = null;

  @Input() set headerNavLinks(v: NavLink[] | string) {
    this._headerNavLinks = typeof v === 'string' ? (this._parseJson<NavLink[]>(v) ?? []) : (v || []);
  }
  get headerNavLinks(): NavLink[] { return this._headerNavLinks; }
  private _headerNavLinks: NavLink[] = [];

  @Input() set headerMenuItems(v: UserMenuItem[] | string) {
    this._headerMenuItems = typeof v === 'string' ? (this._parseJson<UserMenuItem[]>(v) ?? []) : (v || []);
  }
  get headerMenuItems(): UserMenuItem[] { return this._headerMenuItems; }
  private _headerMenuItems: UserMenuItem[] = [];

  private _parseJson<T>(s: string): T | null {
    if (!s) return null;
    try { return JSON.parse(s) as T; } catch { return null; }
  }

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
