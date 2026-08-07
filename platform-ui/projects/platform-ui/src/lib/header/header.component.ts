import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef,
  HostListener, ElementRef, ViewEncapsulation
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NavLink, UserMenuItem, HeaderBadge } from '../models/header.model';

@Component({
  selector: 'pui-lib-header',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // ── Simple string inputs (work as HTML attributes everywhere) ──────────
  @Input() appTitle    = 'My App';
  @Input() appSubtitle = '';
  @Input() logoText    = '';
  @Input() logoUrl     = '';
  @Input() bgColor     = '#12C6A8';
  @Input() textColor   = '#ffffff';
  @Input() userName    = '';
  @Input() userEmail   = '';
  @Input() greeting    = 'Hi';
  @Input() userSubtext = 'Welcome back!';
  @Input() avatarUrl   = '';
  @Input() avatarColor      = '#0d6e5f';
  @Input() avatarTextColor  = '#ffffff';
  @Input() hasLogoSlot = false;

  // ── Boolean input — accepts true/false OR the strings "true"/"false" ──
  // React: show-help="true"  Angular: [showHelp]="true"  JS: el.showHelp = true
  @Input() set showHelp(v: boolean | string) {
    this._showHelp = v === true || v === 'true' || (v as any) === '';
    this.cdr.markForCheck();
  }
  get showHelp() { return this._showHelp; }
  private _showHelp = false;

  // ── Object input — accepts JSON string OR plain object ────────────────
  // React: badge='{"text":"UAT","color":"#f59e0b"}'
  // Angular: [badge]="{ text: 'UAT', color: '#f59e0b' }"
  // JS: el.badge = { text: 'UAT', color: '#f59e0b' }
  @Input() set badge(v: HeaderBadge | string | null) {
    this._badge = typeof v === 'string' ? this._parseJson<HeaderBadge>(v) : v;
    this.cdr.markForCheck();
  }
  get badge(): HeaderBadge | null { return this._badge; }
  private _badge: HeaderBadge | null = null;

  // ── Array input — accepts JSON string OR plain array ──────────────────
  // React: nav-links='[{"label":"Home","href":"/"}]'
  // Angular: [navLinks]="links"   JS: el.navLinks = [...]
  @Input() set navLinks(v: NavLink[] | string) {
    this._navLinks = typeof v === 'string' ? (this._parseJson<NavLink[]>(v) ?? []) : (v ?? []);
    this.cdr.markForCheck();
  }
  get navLinks(): NavLink[] { return this._navLinks; }
  private _navLinks: NavLink[] = [];

  // ── Array input — accepts JSON string OR plain array ──────────────────
  @Input() set menuItems(v: UserMenuItem[] | string) {
    this._menuItems = typeof v === 'string'
      ? (this._parseJson<UserMenuItem[]>(v) ?? this._defaultMenuItems())
      : (v ?? this._defaultMenuItems());
    this.cdr.markForCheck();
  }
  get menuItems(): UserMenuItem[] { return this._menuItems; }
  private _menuItems: UserMenuItem[] = this._defaultMenuItems();

  /** Emitted when a menu item is clicked — payload is item.action */
  @Output() menuAction = new EventEmitter<string>();
  /** Emitted when the help button is clicked */
  @Output() helpClick  = new EventEmitter<void>();

  menuOpen = false;

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) {}

  private _parseJson<T>(s: string): T | null {
    if (!s) return null;
    try { return JSON.parse(s) as T; } catch { return null; }
  }

  private _defaultMenuItems(): UserMenuItem[] {
    return [{
      label: 'Sign out', action: 'signout', danger: true,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>`,
    }];
  }

  get initials(): string {
    return this.userName.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  }

  get firstName(): string {
    return this.userName.split(' ')[0] || this.userName;
  }

  toggleMenu(e: MouseEvent): void {
    e.stopPropagation();
    this.menuOpen = !this.menuOpen;
    this.cdr.markForCheck();
  }

  onMenuAction(item: UserMenuItem): void {
    this.menuAction.emit(item.action);
    this.menuOpen = false;
    this.cdr.markForCheck();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target)) {
      if (this.menuOpen) {
        this.menuOpen = false;
        this.cdr.markForCheck();
      }
    }
  }
}
