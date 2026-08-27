import {
  Component, Input, Output, EventEmitter,
  HostListener, ElementRef, ViewEncapsulation, inject, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NavLink, UserMenuItem, HeaderBadge } from '../models/header.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-header',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() appTitle = 'My App';
  @Input() appSubtitle = '';
  @Input() logoText = '';
  @Input() logoUrl = '';
  @Input() bgColor = 'var(--pui-brand)';
  @Input() textColor = 'var(--pui-white)';
  @Input() userName = '';
  @Input() userEmail = '';
  @Input() greeting = 'Hi';
  @Input() userSubtext = 'Welcome back!';
  @Input() avatarUrl = '';
  @Input() avatarColor = 'var(--pui-brand-deep)';
  @Input() avatarTextColor = 'var(--pui-white)';
  @Input() hasLogoSlot = false;

  @Input() set showLogo(v: boolean | string) {
    this._showLogo = v !== false && v !== 'false';
  }
  get showLogo() { return this._showLogo; }
  private _showLogo = true;

  @Input() set showHeading(v: boolean | string) {
    this._showHeading = v !== false && v !== 'false';
  }
  get showHeading() { return this._showHeading; }
  private _showHeading = true;

  @Input() set showUser(v: boolean | string) {
    this._showUser = v !== false && v !== 'false';
  }
  get showUser() { return this._showUser; }
  private _showUser = true;

  /** 'menu' = name/email + avatar + dropdown (default). 'plain' = round avatar only, no menu. */
  @Input() avatarMode: 'menu' | 'plain' = 'menu';

  @Input() set showHamburger(v: boolean | string) {
    this._showHamburger = v === true || v === 'true' || (v as any) === '';
  }
  get showHamburger() { return this._showHamburger; }
  private _showHamburger = false;

  @Input() set hamburgerOpen(v: boolean | string) {
    this._hamburgerOpen = v === true || v === 'true' || (v as any) === '';
  }
  get hamburgerOpen() { return this._hamburgerOpen; }
  private _hamburgerOpen = false;

  @Output() hamburgerToggle = new EventEmitter<void>();

  @Input() set showHelp(v: boolean | string) {
    this._showHelp = v === true || v === 'true' || (v as any) === '';
  }
  get showHelp() { return this._showHelp; }
  private _showHelp = false;

  @Input() set showSearch(v: boolean | string) {
    this._showSearch = v !== false && v !== 'false';
  }
  get showSearch() { return this._showSearch; }
  private _showSearch = true;

  @Output() searchClick = new EventEmitter<void>();
  @Output() searchOpenChange = new EventEmitter<boolean>();
  @Output() searchQuery = new EventEmitter<string>();

  searchOpen = false;

  @ViewChild('searchInput') private searchInputRef!: ElementRef<HTMLInputElement>;
  private cdr = inject(ChangeDetectorRef);

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
    this.searchClick.emit();
    this.searchOpenChange.emit(this.searchOpen);
    if (this.searchOpen) {
      setTimeout(() => this.searchInputRef?.nativeElement.focus());
    }
  }

  closeSearch(): void {
    if (!this.searchOpen) return;
    this.searchOpen = false;
    this.searchOpenChange.emit(false);
    this.cdr.markForCheck();
  }

  onSearchInput(value: string): void {
    this.searchQuery.emit(value);
  }

  @Input() set badge(v: HeaderBadge | string | null) {
    this._badge = typeof v === 'string' ? this._parseJson<HeaderBadge>(v) : v;
  }
  get badge(): HeaderBadge | null { return this._badge; }
  private _badge: HeaderBadge | null = null;

  @Input() set navLinks(v: NavLink[] | string) {
    this._navLinks = typeof v === 'string' ? (this._parseJson<NavLink[]>(v) ?? []) : (v ?? []);
  }
  get navLinks(): NavLink[] { return this._navLinks; }
  private _navLinks: NavLink[] = [];

  @Input() set menuItems(v: UserMenuItem[] | string) {
    this._menuItems = typeof v === 'string'
      ? (this._parseJson<UserMenuItem[]>(v) ?? [])
      : (v ?? []);
  }
  get menuItems(): UserMenuItem[] { return this._menuItems; }
  private _menuItems: UserMenuItem[] = [];

  @Output() menuAction = new EventEmitter<string>();
  @Output() helpClick = new EventEmitter<void>();

  menuOpen = false;
  menuTop = '0px';
  menuRight = '0px';

  @ViewChild('userArea') private userAreaRef!: ElementRef<HTMLElement>;
  private el = inject(ElementRef);

  private _parseJson<T>(s: string): T | null {
    if (!s) return null;
    try { return JSON.parse(s) as T; } catch { return null; }
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
    if (this.menuOpen && this.userAreaRef) {
      const rect = this.userAreaRef.nativeElement.getBoundingClientRect();
      this.menuTop = `${rect.bottom + 8}px`;
      this.menuRight = `${window.innerWidth - rect.right}px`;
    }
  }

  onMenuAction(item: UserMenuItem): void {
    this.menuAction.emit(item.action);
    this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const path: EventTarget[] = e.composedPath ? e.composedPath() : [];
    const inside = path.length
      ? path.includes(this.el.nativeElement)
      : this.el.nativeElement.contains(e.target as Node);
    if (!inside) {
      if (this.menuOpen) {
        this.menuOpen = false;
      }
      this.closeSearch();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
    }
  }
}
