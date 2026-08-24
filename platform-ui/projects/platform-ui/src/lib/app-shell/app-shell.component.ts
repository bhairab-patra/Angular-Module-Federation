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

  @Output() headerSearchQuery = new EventEmitter<string>();
  @Output() headerMenuAction = new EventEmitter<string>();

  @Input() set groups(v: SolifiNavGroup[] | SolifiNavItem[] | string) {
    if (typeof v === 'string') {
      const parsed = this._parse<SolifiNavGroup[] | SolifiNavItem[]>(v) ?? [];
      this._groups = this._normalize(parsed);
    } else {
      this._groups = this._normalize(v || []);
    }
  }
  get groups(): SolifiNavGroup[] { return this._groups; }
  private _groups: SolifiNavGroup[] = [];

  @Input() activeId = '';
  @Input() brandName = 'solifi';
  @Input() logoUrl = '';

  @Input() set showBrand(v: boolean | string) {
    this._showBrand = v !== false && v !== 'false';
  }
  get showBrand(): boolean { return this._showBrand; }
  private _showBrand = true;

  @Input() set collapsed(v: boolean | string) {
    this._collapsed = v === true || v === 'true' || (v as any) === '';
  }
  get collapsed(): boolean { return this._collapsed; }
  private _collapsed = false;

  @Input() set showSidebar(v: boolean | string) {
    this._showSidebar = v !== false && v !== 'false';
  }
  get showSidebar(): boolean { return this._showSidebar; }
  private _showSidebar = true;

  @Input() width = 240;
  @Input() collapsedWidth = 64;

  @Input() set theme(v: SolifiSidebarTheme | string) {
    this._theme = typeof v === 'string' ? (this._parse<SolifiSidebarTheme>(v) ?? SOLIFI_THEME) : (v || SOLIFI_THEME);
  }
  get theme(): SolifiSidebarTheme { return this._theme; }
  private _theme: SolifiSidebarTheme = { ...SOLIFI_THEME };

  @Input() set showUser(v: boolean | string) {
    this._showUser = v === true || v === 'true' || (v as any) === '';
  }
  get showUser(): boolean { return this._showUser; }
  private _showUser = false;

  @Input() userName = '';
  @Input() userEmail = '';
  @Input() userInitials = '';
  @Input() userAvatarUrl = '';

  @Input() set userMenuItems(v: SolifiUserMenuItem[] | string) {
    this._userMenuItems = typeof v === 'string' ? (this._parse<SolifiUserMenuItem[]>(v) ?? []) : (v || []);
  }
  get userMenuItems(): SolifiUserMenuItem[] { return this._userMenuItems; }
  private _userMenuItems: SolifiUserMenuItem[] = [];

  @Input() pageTitle = '';
  @Input() footerText = '';

  @Output() itemSelect = new EventEmitter<SolifiNavItem>();
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() userMenuSelect = new EventEmitter<SolifiUserMenuItem>();

  onCollapsedChange(v: boolean): void {
    this._collapsed = v;
    this.collapsedChange.emit(v);
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
