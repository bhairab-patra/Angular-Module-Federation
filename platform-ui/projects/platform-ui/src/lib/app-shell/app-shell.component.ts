import {
  Component, Input, Output, EventEmitter,
  ViewEncapsulation, ChangeDetectionStrategy,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { PuiSolifiSidebarComponent } from '../solifi-sidebar/solifi-sidebar.component';
import { HeaderComponent } from '../header/header.component';
import {
  SolifiNavGroup, SolifiNavItem, SolifiUserMenuItem,
  SolifiSidebarTheme, SOLIFI_THEME,
} from '../models/solifi-sidebar.model';
import { UserMenuItem, HeaderBadge } from '../models/header.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-app-shell',
  standalone: true,
  imports: [NgIf, PuiSolifiSidebarComponent, HeaderComponent],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class PuiAppShellComponent {

  // ── HEADER — every input here affects only the top header bar ──────────

  /** Optional top header — set false for a flat layout (sidebar + content only, no header bar). */
  @Input() set showHeader(v: boolean | string) {
    this._showHeader = v !== false && v !== 'false';
  }
  get showHeader(): boolean { return this._showHeader; }
  private _showHeader = true;

  @Input() headerAppTitle = '';
  @Input() headerAppSubtitle = '';
  @Input() headerLogoUrl = '';
  @Input() headerLogoText = '';
  @Input() headerBgColor = 'var(--pui-header-bg, var(--pui-form-accent))';
  @Input() headerTextColor = 'var(--pui-header-text, var(--pui-neutral-900))';

  @Input() set showHeaderLogo(v: boolean | string) {
    this._showHeaderLogo = v !== false && v !== 'false';
  }
  get showHeaderLogo(): boolean { return this._showHeaderLogo; }
  private _showHeaderLogo = true;

  @Input() set showHeaderHeading(v: boolean | string) {
    this._showHeaderHeading = v !== false && v !== 'false';
  }
  get showHeaderHeading(): boolean { return this._showHeaderHeading; }
  private _showHeaderHeading = true;

  @Input() set showHeaderSearch(v: boolean | string) {
    this._showHeaderSearch = v !== false && v !== 'false';
  }
  get showHeaderSearch(): boolean { return this._showHeaderSearch; }
  private _showHeaderSearch = true;

  @Input() set showHeaderUser(v: boolean | string) {
    this._showHeaderUser = v !== false && v !== 'false';
  }
  get showHeaderUser(): boolean { return this._showHeaderUser; }
  private _showHeaderUser = true;

  @Input() headerAvatarMode: 'menu' | 'plain' = 'menu';
  @Input() headerUserName = '';
  @Input() headerUserEmail = '';
  @Input() headerAvatarUrl = '';
  @Input() headerAvatarColor = 'var(--pui-form-accent)';
  @Input() headerAvatarTextColor = 'var(--pui-accent-ink)';

  @Input() set headerMenuItems(v: UserMenuItem[] | string) {
    this._headerMenuItems = typeof v === 'string' ? (this._parse<UserMenuItem[]>(v) ?? []) : (v || []);
  }
  get headerMenuItems(): UserMenuItem[] { return this._headerMenuItems; }
  private _headerMenuItems: UserMenuItem[] = [];

  @Input() set headerBadge(v: HeaderBadge | string | null) {
    this._headerBadge = typeof v === 'string' ? this._parse<HeaderBadge>(v) : v;
  }
  get headerBadge(): HeaderBadge | null { return this._headerBadge; }
  private _headerBadge: HeaderBadge | null = null;

  /** Fires as the user types in the header's inline search field. */
  @Output() headerSearchQuery = new EventEmitter<string>();
  /** Fires when a header avatar dropdown item is clicked (menu mode only). */
  @Output() headerMenuAction = new EventEmitter<string>();

  // ── SIDEBAR — every input here affects only the left navigation rail ───

  @Input() set sidebarGroups(v: SolifiNavGroup[] | SolifiNavItem[] | string) {
    if (typeof v === 'string') {
      const parsed = this._parse<SolifiNavGroup[] | SolifiNavItem[]>(v) ?? [];
      this._sidebarGroups = this._normalize(parsed);
    } else {
      this._sidebarGroups = this._normalize(v || []);
    }
  }
  get sidebarGroups(): SolifiNavGroup[] { return this._sidebarGroups; }
  private _sidebarGroups: SolifiNavGroup[] = [];

  @Input() sidebarActiveId = '';
  @Input() sidebarBrandName = 'solifi';
  @Input() sidebarLogoUrl = '';

  @Input() set showSidebarBrand(v: boolean | string) {
    this._showSidebarBrand = v !== false && v !== 'false';
  }
  get showSidebarBrand(): boolean { return this._showSidebarBrand; }
  private _showSidebarBrand = true;

  @Input() set sidebarCollapsed(v: boolean | string) {
    this._sidebarCollapsed = v === true || v === 'true' || (v as any) === '';
  }
  get sidebarCollapsed(): boolean { return this._sidebarCollapsed; }
  private _sidebarCollapsed = false;

  /** Master switch for the whole sidebar — set false to hide it entirely (e.g. a mobile flat layout). */
  @Input() set showSidebar(v: boolean | string) {
    this._showSidebar = v !== false && v !== 'false';
  }
  get showSidebar(): boolean { return this._showSidebar; }
  private _showSidebar = true;

  @Input() sidebarWidth = 240;
  @Input() sidebarCollapsedWidth = 64;

  @Input() set sidebarTheme(v: SolifiSidebarTheme | string) {
    this._sidebarTheme = typeof v === 'string' ? (this._parse<SolifiSidebarTheme>(v) ?? SOLIFI_THEME) : (v || SOLIFI_THEME);
  }
  get sidebarTheme(): SolifiSidebarTheme { return this._sidebarTheme; }
  private _sidebarTheme: SolifiSidebarTheme = { ...SOLIFI_THEME };

  @Input() set showSidebarUser(v: boolean | string) {
    this._showSidebarUser = v === true || v === 'true' || (v as any) === '';
  }
  get showSidebarUser(): boolean { return this._showSidebarUser; }
  private _showSidebarUser = false;

  @Input() sidebarUserName = '';
  @Input() sidebarUserEmail = '';
  @Input() sidebarUserInitials = '';
  @Input() sidebarUserAvatarUrl = '';

  @Input() set sidebarUserMenuItems(v: SolifiUserMenuItem[] | string) {
    this._sidebarUserMenuItems = typeof v === 'string' ? (this._parse<SolifiUserMenuItem[]>(v) ?? []) : (v || []);
  }
  get sidebarUserMenuItems(): SolifiUserMenuItem[] { return this._sidebarUserMenuItems; }
  private _sidebarUserMenuItems: SolifiUserMenuItem[] = [];

  /** Fires when a sidebar nav item is clicked. */
  @Output() sidebarItemSelect = new EventEmitter<SolifiNavItem>();
  /** Fires when the sidebar's collapse state toggles. */
  @Output() sidebarCollapsedChange = new EventEmitter<boolean>();
  /** Fires when a sidebar user-menu item is clicked. */
  @Output() sidebarUserMenuSelect = new EventEmitter<SolifiUserMenuItem>();

  // ── SHELL — layout-level, not owned by either the header or the sidebar ─

  @Input() pageTitle = '';
  @Input() footerText = '';

  onSidebarCollapsedChange(v: boolean): void {
    this._sidebarCollapsed = v;
    this.sidebarCollapsedChange.emit(v);
  }

  private _normalize(v: SolifiNavGroup[] | SolifiNavItem[]): SolifiNavGroup[] {
    if (!v.length) return [];
    return 'items' in v[0]
      ? (v as SolifiNavGroup[])
      : [{ id: '__flat__', items: v as SolifiNavItem[] }];
  }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
