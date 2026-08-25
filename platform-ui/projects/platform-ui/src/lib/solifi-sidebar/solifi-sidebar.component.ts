import {
  Component, Input, Output, EventEmitter,
  ViewEncapsulation, ChangeDetectionStrategy, HostListener, ElementRef,
} from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { SolifiNavGroup, SolifiNavItem, SolifiSidebarTheme, SolifiUserMenuItem } from '../models/solifi-sidebar.model';

const MAX_LABEL_LEN = 22;

const DEFAULT_LOGO = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="14,1 27,7.5 27,20.5 14,27 1,20.5 1,7.5" fill="var(--pui-brand)"/>
  <text x="14" y="19" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="var(--pui-white)">S</text>
</svg>`;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-solifi-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, IconComponent, TooltipComponent],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './solifi-sidebar.component.html',
  styleUrls: ['./solifi-sidebar.component.scss'],
})
export class PuiSolifiSidebarComponent {

  @Input() set groups(v: SolifiNavGroup[] | SolifiNavItem[] | string) {
    if (typeof v === 'string') {
      const parsed = this._parse<SolifiNavGroup[] | SolifiNavItem[]>(v) ?? [];
      this._groups = this._normalizeGroups(parsed);
    } else {
      this._groups = this._normalizeGroups(v || []);
    }
  }
  get groups(): SolifiNavGroup[] { return this._groups; }
  private _groups: SolifiNavGroup[] = [];

  private _normalizeGroups(v: SolifiNavGroup[] | SolifiNavItem[]): SolifiNavGroup[] {
    if (!v.length) return [];
    return 'items' in v[0]
      ? (v as SolifiNavGroup[])
      : [{ id: '__flat__', items: v as SolifiNavItem[] }];
  }

  @Input() activeId = '';
  @Input() brandName = 'solifi';
  @Input() logo = '';
  @Input() logoUrl = '';

  @Input() set showBrand(v: boolean | string) {
    this._showBrand = v !== false && v !== 'false';
  }
  get showBrand(): boolean { return this._showBrand; }
  private _showBrand = true;

  @Input() set showUser(v: boolean | string) {
    this._showUser = v === true || v === 'true' || (v as any) === '';
  }
  get showUser() { return this._showUser; }
  private _showUser = false;

  @Input() userName = '';
  @Input() userEmail = '';
  @Input() userInitials = '';
  @Input() userAvatarUrl = '';

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

  @Input() width = 240;
  @Input() collapsedWidth = 64;

  @Input() set theme(v: SolifiSidebarTheme | string) {
    this._theme = typeof v === 'string' ? (this._parse<SolifiSidebarTheme>(v) ?? {}) : (v || {});
  }
  get theme(): SolifiSidebarTheme { return this._theme; }
  private _theme: SolifiSidebarTheme = {};

  @Input() bgColor = '';
  @Input() textColor = '';
  @Input() activeColor = '';

  @Input() set userMenuItems(v: SolifiUserMenuItem[] | string) {
    this._userMenuItems = typeof v === 'string' ? (this._parse<SolifiUserMenuItem[]>(v) ?? []) : (v || []);
  }
  get userMenuItems(): SolifiUserMenuItem[] { return this._userMenuItems; }
  private _userMenuItems: SolifiUserMenuItem[] = [];

  userMenuOpen = false;
  openIds = new Set<string>();

  hoveredItem: SolifiNavItem | null = null;
  tooltipTop = 0;

  onNavItemEnter(item: SolifiNavItem, event: MouseEvent): void {
    if (!this._collapsed) return;
    const btn = event.currentTarget as HTMLElement;
    const ssbEl = (this._elRef.nativeElement as HTMLElement).querySelector('.ssb') as HTMLElement;
    const ssbRect = ssbEl.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    this.tooltipTop = btnRect.top - ssbRect.top + btnRect.height / 2;
    this.hoveredItem = item;
  }

  onNavItemLeave(): void { this.hoveredItem = null; }

  itemAbbr(item: SolifiNavItem): string {
    return item.label.charAt(0).toUpperCase();
  }

  needsEllipsis(label: string): boolean {
    return label.length > MAX_LABEL_LEN;
  }

  @Output() itemSelect = new EventEmitter<SolifiNavItem>();
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() userMenuSelect = new EventEmitter<SolifiUserMenuItem>();

  defaultLogo = DEFAULT_LOGO;

  constructor(private _elRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (this.userMenuOpen && !this._elRef.nativeElement.contains(e.target)) {
      this.userMenuOpen = false;
    }
  }

  get avatarInitials(): string {
    if (this.userInitials) return this.userInitials;
    return this.userName.split(' ').map(p => p[0] ?? '').join('').toUpperCase().slice(0, 2);
  }

  get cssVars(): Record<string, string> {
    const t = this.theme;
    return {
      '--ssb-bg': t.bg || this.bgColor || 'var(--pui-solifi-sb-bg)',
      '--ssb-text': t.textColor || this.textColor || 'var(--pui-solifi-sb-text)',
      '--ssb-active': t.activeColor || this.activeColor || 'var(--pui-brand)',
      '--ssb-active-bg': t.activeBg || 'var(--pui-solifi-sb-icon-active-bg)',
      '--ssb-hover': t.hoverBg || 'var(--pui-overlay-white-06)',
      '--ssb-border': t.borderColor || 'var(--pui-overlay-white-07)',
      '--ssb-group': t.groupColor || 'var(--pui-solifi-sb-group)',
      '--ssb-avatar': t.avatarBg || 'var(--pui-brand)',
      '--ssb-w': `${this.width}px`,
      '--ssb-cw': `${this.collapsedWidth}px`,
    };
  }

  toggle(): void {
    this._collapsed = !this._collapsed;
    this.userMenuOpen = false;
    this.collapsedChange.emit(this._collapsed);
  }

  select(item: SolifiNavItem): void {
    if (item.disabled) return;
    if (item.children?.length) {
      const wasOpen = this.openIds.has(item.id);
      this.openIds.clear(); // accordion: only one submenu open at a time
      if (!wasOpen) { this.openIds.add(item.id); }
      return;
    }
    this.itemSelect.emit(item);
  }

  toggleUserMenu(event: Event): void {
    if (!this._userMenuItems.length) return;
    event.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
  }

  selectUserMenuItem(item: SolifiUserMenuItem, event: Event): void {
    event.stopPropagation();
    if (item.disabled) return;
    this.userMenuOpen = false;
    this.userMenuSelect.emit(item);
  }

  closeUserMenu(): void { this.userMenuOpen = false; }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
