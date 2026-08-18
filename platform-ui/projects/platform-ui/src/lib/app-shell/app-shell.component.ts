import {
  Component, Input, Output, EventEmitter,
  ViewEncapsulation, ChangeDetectionStrategy,
} from '@angular/core';
import { PuiSolifiSidebarComponent } from '../solifi-sidebar/solifi-sidebar.component';
import {
  SolifiNavGroup, SolifiNavItem, SolifiUserMenuItem,
  SolifiSidebarTheme, SOLIFI_THEME,
} from '../models/solifi-sidebar.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-app-shell',
  standalone: true,
  imports: [PuiSolifiSidebarComponent],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class PuiAppShellComponent {

  // ── Sidebar content ───────────────────────────────────────
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

  @Input() activeId  = '';
  @Input() brandName = 'solifi';
  @Input() logoUrl   = '';

  // ── Sidebar layout ────────────────────────────────────────
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

  @Input() width         = 240;
  @Input() collapsedWidth = 64;

  // ── Sidebar theme ─────────────────────────────────────────
  @Input() set theme(v: SolifiSidebarTheme | string) {
    this._theme = typeof v === 'string' ? (this._parse<SolifiSidebarTheme>(v) ?? SOLIFI_THEME) : (v || SOLIFI_THEME);
  }
  get theme(): SolifiSidebarTheme { return this._theme; }
  private _theme: SolifiSidebarTheme = { ...SOLIFI_THEME };

  // ── User profile ──────────────────────────────────────────
  @Input() set showUser(v: boolean | string) {
    this._showUser = v === true || v === 'true' || (v as any) === '';
  }
  get showUser(): boolean { return this._showUser; }
  private _showUser = false;

  @Input() userName      = '';
  @Input() userEmail     = '';
  @Input() userInitials  = '';
  @Input() userAvatarUrl = '';

  @Input() set userMenuItems(v: SolifiUserMenuItem[] | string) {
    this._userMenuItems = typeof v === 'string' ? (this._parse<SolifiUserMenuItem[]>(v) ?? []) : (v || []);
  }
  get userMenuItems(): SolifiUserMenuItem[] { return this._userMenuItems; }
  private _userMenuItems: SolifiUserMenuItem[] = [];

  // ── Outputs ───────────────────────────────────────────────
  @Output() itemSelect        = new EventEmitter<SolifiNavItem>();
  @Output() collapsedChange   = new EventEmitter<boolean>();
  @Output() userMenuSelect    = new EventEmitter<SolifiUserMenuItem>();

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
