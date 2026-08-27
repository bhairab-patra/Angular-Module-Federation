import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
  ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { NgFor, NgIf, NgClass, NgStyle } from '@angular/common';
import { PuiSearchComponent } from '../search/search.component';
import { SidebarGroup, SidebarNavItem, SidebarConfig, SidebarTheme } from '../models/sidebar.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

const DEFAULT_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/></svg>`;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, NgStyle, PuiSearchComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class PuiSidebarComponent implements OnChanges {

  @Input() activeId = '';
  @Input() brandName = '';
  @Input() logo = '';

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

  @Input() bgColor = '';
  @Input() textColor = '';
  @Input() activeColor = '';
  @Input() hoverColor = '';
  @Input() borderColor = '';
  @Input() width = 0;

  @Input() set theme(v: SidebarTheme | string) {
    this._theme = typeof v === 'string' ? (this._parseJson<SidebarTheme>(v) ?? {}) : (v || {});
  }
  get theme(): SidebarTheme { return this._theme; }
  private _theme: SidebarTheme = {};

  @Input() userName = '';
  @Input() userEmail = '';
  @Input() userInitials = '';
  @Input() userAvatarUrl = '';
  @Input() userAvatarBg = '';

  @Input() set showUser(v: boolean | string) {
    this._showUser = v === true || v === 'true' || (v as any) === '';
  }
  get showUser() { return this._showUser; }
  private _showUser = false;

  @Input() set showIcons(v: boolean | string) {
    this._showIcons = v === true || v === 'true' || (v as any) === '';
  }
  get showIcons() { return this._showIcons; }
  private _showIcons = false;

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

  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() itemSelect = new EventEmitter<SidebarNavItem>();

  defaultIcon = DEFAULT_ICON;
  defaultLogo = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="var(--pui-brand)"/><path d="M8 16h16M16 8l8 8-8 8" stroke="var(--pui-white)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  openIds = new Set<string>();
  searchQuery = '';
  displayGroups: SidebarGroup[] = [];

  private _parseJson<T>(s: string): T | null {
    if (!s) return null;
    try { return JSON.parse(s) as T; } catch { return null; }
  }

  get cfg(): Required<SidebarConfig> {
    return {
      width: this.width || this.config.width || 260,
      collapsedWidth: this.config.collapsedWidth || 64,
      showSearch: this.config.showSearch ?? true,
      collapsible: this.config.collapsible ?? true,
      maxLabelLen: this.config.maxLabelLen || 22,
    };
  }

  get avatarInitials(): string {
    if (this.userInitials) return this.userInitials;
    return this.userName.split(' ').map(p => p[0] ?? '').join('').toUpperCase().slice(0, 2);
  }

  get cssVars(): Record<string, string> {
    const t = this.theme;
    return {
      '--pui-sb-bg': t.bg || this.bgColor || 'var(--pui-solifi-sb-bg)',
      '--pui-sb-text': t.textColor || this.textColor || 'var(--pui-slate-400)',
      '--pui-sb-active-txt': t.activeText || this.activeColor || 'var(--pui-white)',
      '--pui-sb-active-bg': t.activeBg || (this.activeColor ? this.activeColor + '22' : 'var(--pui-overlay-white-08)'),
      '--pui-sb-active-brd': t.activeBorder || this.activeColor || 'var(--pui-brand)',
      '--pui-sb-hover-bg': t.hoverBg || this.hoverColor || 'var(--pui-overlay-white-06)',
      '--pui-sb-hover-txt': t.hoverText || 'var(--pui-slate-200)',
      '--pui-sb-border': t.borderColor || this.borderColor || 'var(--pui-overlay-white-08)',
      '--pui-sb-group-txt': t.groupTextColor || 'var(--pui-solifi-sb-group)',
      '--pui-sb-sub-bg': t.subitemBg || 'var(--pui-overlay-black-12)',
      '--pui-sb-avatar-bg': this.userAvatarBg || t.avatarBg || 'var(--pui-brand)',
      '--pui-sb-w': `${this.cfg.width}px`,
      '--pui-sb-cw': `${this.cfg.collapsedWidth}px`,
    };
  }

  ngOnChanges(c: SimpleChanges): void {
    if (c['groups']) {
      this.displayGroups = this.groups;
      this.searchQuery = '';
    }
  }

  onSearch(q: string): void {
    this.searchQuery = q.trim().toLowerCase();
    if (!this.searchQuery) { this.displayGroups = this.groups; return; }
    this.displayGroups = this.groups
      .map(g => ({ ...g, items: this.filterItems(g.items) }))
      .filter(g => g.items.length > 0);
    this.displayGroups.forEach(g =>
      g.items.forEach(item => { if (item.children?.length) this.openIds.add(item.id); })
    );
  }

  private filterItems(items: SidebarNavItem[]): SidebarNavItem[] {
    const q = this.searchQuery;
    return items.reduce<SidebarNavItem[]>((acc, item) => {
      const selfMatch = item.label.toLowerCase().includes(q);
      const filteredKids = item.children ? this.filterItems(item.children) : [];
      if (selfMatch) acc.push(item);
      else if (filteredKids.length) acc.push({ ...item, children: filteredKids });
      return acc;
    }, []);
  }

  highlight(text: string): string {
    if (!this.searchQuery) return text;
    const safe = this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${safe})`, 'gi'), '<mark>$1</mark>');
  }

  needsEllipsis(label: string): boolean { return label.length > this.cfg.maxLabelLen; }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    if (this.collapsed) this.searchQuery = '';
    this.collapsedChange.emit(this.collapsed);
  }

  clickItem(item: SidebarNavItem): void {
    if (item.disabled) return;
    if (item.children?.length) {
      if (this.openIds.has(item.id)) { this.openIds.delete(item.id); } else { this.openIds.add(item.id); }
    } else {
      this.itemSelect.emit(item);
    }
  }
}
