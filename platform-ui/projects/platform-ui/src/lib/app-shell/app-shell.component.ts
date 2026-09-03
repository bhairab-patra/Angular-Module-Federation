import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { PuiSolifiSidebarInternalComponent } from '../solifi-sidebar/solifi-sidebar-internal.component';
import { HeaderInternalComponent } from '../header/header-internal.component';
import {
  SolifiNavGroup,
  SolifiNavItem,
  SolifiUserMenuItem,
  SolifiSidebarTheme,
  SOLIFI_THEME,
} from '../models/solifi-sidebar.model';
import { UserMenuItem, HeaderBadge } from '../models/header.model';
import { PuiFooterInternalComponent } from '../footer/footer-internal.component';
import { FooterVariant, FooterLink, FooterNoticeSlide } from '../models/footer.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';
import { PUI_DEFAULT_SIDEBAR_WIDTH, PUI_DEFAULT_SIDEBAR_COLLAPSED_WIDTH } from '../constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-app-shell',
  standalone: true,
  imports: [
    NgIf,
    PuiSolifiSidebarInternalComponent,
    HeaderInternalComponent,
    PuiFooterInternalComponent,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class PuiAppShellComponent implements AfterViewInit, OnDestroy {
  private _cdr = inject(ChangeDetectorRef);
  @ViewChild('footerEl', { read: ElementRef }) private _footerEl?: ElementRef<HTMLElement>;
  private _footerResizeObserver: ResizeObserver | undefined;

  footerReservedHeight = 0;

  @Input() set showHeader(v: boolean | string) {
    this._showHeader = v !== false && v !== 'false';
  }
  get showHeader(): boolean {
    return this._showHeader;
  }
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
  get showHeaderLogo(): boolean {
    return this._showHeaderLogo;
  }
  private _showHeaderLogo = true;

  @Input() set showHeaderHeading(v: boolean | string) {
    this._showHeaderHeading = v !== false && v !== 'false';
  }
  get showHeaderHeading(): boolean {
    return this._showHeaderHeading;
  }
  private _showHeaderHeading = true;

  @Input() set showHeaderSearch(v: boolean | string) {
    this._showHeaderSearch = v !== false && v !== 'false';
  }
  get showHeaderSearch(): boolean {
    return this._showHeaderSearch;
  }
  private _showHeaderSearch = true;

  @Input() set showHeaderUser(v: boolean | string) {
    this._showHeaderUser = v !== false && v !== 'false';
  }
  get showHeaderUser(): boolean {
    return this._showHeaderUser;
  }
  private _showHeaderUser = true;

  @Input() headerAvatarMode: 'menu' | 'plain' = 'menu';
  @Input() headerUserName = '';
  @Input() headerUserEmail = '';
  @Input() headerAvatarUrl = '';
  @Input() headerAvatarColor = 'var(--pui-form-accent)';
  @Input() headerAvatarTextColor = 'var(--pui-accent-ink)';

  @Input() set headerMenuItems(v: UserMenuItem[] | string) {
    this._headerMenuItems =
      typeof v === 'string' ? (this._parse<UserMenuItem[]>(v) ?? []) : v || [];
  }
  get headerMenuItems(): UserMenuItem[] {
    return this._headerMenuItems;
  }
  private _headerMenuItems: UserMenuItem[] = [];

  @Input() set headerBadge(v: HeaderBadge | string | null) {
    this._headerBadge = typeof v === 'string' ? this._parse<HeaderBadge>(v) : v;
  }
  get headerBadge(): HeaderBadge | null {
    return this._headerBadge;
  }
  private _headerBadge: HeaderBadge | null = null;

  @Output() headerSearchQuery = new EventEmitter<string>();

  @Output() headerMenuAction = new EventEmitter<string>();

  @Input() set sidebarGroups(v: SolifiNavGroup[] | SolifiNavItem[] | string) {
    if (typeof v === 'string') {
      const parsed = this._parse<SolifiNavGroup[] | SolifiNavItem[]>(v) ?? [];
      this._sidebarGroups = this._normalize(parsed);
    } else {
      this._sidebarGroups = this._normalize(v || []);
    }
  }
  get sidebarGroups(): SolifiNavGroup[] {
    return this._sidebarGroups;
  }
  private _sidebarGroups: SolifiNavGroup[] = [];

  @Input() sidebarActiveId = '';
  @Input() sidebarBrandName = 'solifi';
  @Input() sidebarLogoUrl = '';

  @Input() set showSidebarBrand(v: boolean | string) {
    this._showSidebarBrand = v !== false && v !== 'false';
  }
  get showSidebarBrand(): boolean {
    return this._showSidebarBrand;
  }
  private _showSidebarBrand = true;

  @Input() set sidebarCollapsed(v: boolean | string) {
    this._sidebarCollapsed = v === true || v === 'true' || (v as any) === '';
  }
  get sidebarCollapsed(): boolean {
    return this._sidebarCollapsed;
  }
  private _sidebarCollapsed = false;

  @Input() set showSidebar(v: boolean | string) {
    this._showSidebar = v !== false && v !== 'false';
  }
  get showSidebar(): boolean {
    return this._showSidebar;
  }
  private _showSidebar = true;

  @Input() sidebarWidth = PUI_DEFAULT_SIDEBAR_WIDTH;
  @Input() sidebarCollapsedWidth = PUI_DEFAULT_SIDEBAR_COLLAPSED_WIDTH;

  @Input() set sidebarTheme(v: SolifiSidebarTheme | string) {
    this._sidebarTheme =
      typeof v === 'string'
        ? (this._parse<SolifiSidebarTheme>(v) ?? SOLIFI_THEME)
        : v || SOLIFI_THEME;
  }
  get sidebarTheme(): SolifiSidebarTheme {
    return this._sidebarTheme;
  }
  private _sidebarTheme: SolifiSidebarTheme = { ...SOLIFI_THEME };

  @Input() set showSidebarUser(v: boolean | string) {
    this._showSidebarUser = v === true || v === 'true' || (v as any) === '';
  }
  get showSidebarUser(): boolean {
    return this._showSidebarUser;
  }
  private _showSidebarUser = false;

  @Input() sidebarUserName = '';
  @Input() sidebarUserEmail = '';
  @Input() sidebarUserInitials = '';
  @Input() sidebarUserAvatarUrl = '';

  @Input() set sidebarUserMenuItems(v: SolifiUserMenuItem[] | string) {
    this._sidebarUserMenuItems =
      typeof v === 'string' ? (this._parse<SolifiUserMenuItem[]>(v) ?? []) : v || [];
  }
  get sidebarUserMenuItems(): SolifiUserMenuItem[] {
    return this._sidebarUserMenuItems;
  }
  private _sidebarUserMenuItems: SolifiUserMenuItem[] = [];

  @Output() sidebarItemSelect = new EventEmitter<SolifiNavItem>();

  @Output() sidebarCollapsedChange = new EventEmitter<boolean>();

  @Output() sidebarUserMenuSelect = new EventEmitter<SolifiUserMenuItem>();

  @Input() set showFooter(v: boolean | string) {
    this._showFooter = v === true || v === 'true' || (v as any) === '';
    this._scheduleFooterMeasure();
  }
  get showFooter(): boolean {
    return this._showFooter;
  }
  private _showFooter = false;

  @Input() footerVariant: FooterVariant = 'simple';

  @Input() set footerNoticeSlides(v: FooterNoticeSlide[] | string) {
    this._footerNoticeSlides =
      typeof v === 'string' ? (this._parse<FooterNoticeSlide[]>(v) ?? []) : v || [];
  }
  get footerNoticeSlides(): FooterNoticeSlide[] {
    return this._footerNoticeSlides;
  }
  private _footerNoticeSlides: FooterNoticeSlide[] = [];

  @Input() set footerActiveSlideIndex(v: number | string) {
    this._footerActiveSlideIndex = typeof v === 'string' ? parseInt(v, 10) || 0 : (v ?? 0);
  }
  get footerActiveSlideIndex(): number {
    return this._footerActiveSlideIndex;
  }
  private _footerActiveSlideIndex = 0;

  @Input() footerCopyrightText =
    `Copyright © ${new Date().getFullYear()} Solifi. All Rights Reserved.`;

  @Input() set footerLinks(v: FooterLink[] | string) {
    this._footerLinks = typeof v === 'string' ? (this._parse<FooterLink[]>(v) ?? []) : v || [];
  }
  get footerLinks(): FooterLink[] {
    return this._footerLinks;
  }
  private _footerLinks: FooterLink[] = [];

  @Input() footerPoweredByText = 'Powered by Solifi™';

  @Input() set showFooterPoweredBy(v: boolean | string) {
    this._showFooterPoweredBy = v !== false && v !== 'false';
  }
  get showFooterPoweredBy(): boolean {
    return this._showFooterPoweredBy;
  }
  private _showFooterPoweredBy = true;

  @Input() set footerStickyBottom(v: boolean | string) {
    this._footerStickyBottom = v === true || v === 'true' || (v as any) === '';
    this._scheduleFooterMeasure();
  }
  get footerStickyBottom(): boolean {
    return this._footerStickyBottom;
  }
  private _footerStickyBottom = false;

  @Output() footerActiveSlideIndexChange = new EventEmitter<number>();

  @Output() footerLinkClick = new EventEmitter<FooterLink>();

  @Output() footerContactClick = new EventEmitter<FooterNoticeSlide>();

  @Input() pageTitle = '';

  @Input() footerText = '';

  onSidebarCollapsedChange(v: boolean): void {
    this._sidebarCollapsed = v;
    this.sidebarCollapsedChange.emit(v);
  }

  onFooterActiveSlideIndexChange(v: number): void {
    this._footerActiveSlideIndex = v;
    this.footerActiveSlideIndexChange.emit(v);
  }

  private _normalize(v: SolifiNavGroup[] | SolifiNavItem[]): SolifiNavGroup[] {
    if (!v.length) return [];
    return 'items' in v[0]
      ? (v as SolifiNavGroup[])
      : [{ id: '__flat__', items: v as SolifiNavItem[] }];
  }

  private _parse<T>(s: string): T | null {
    try {
      return JSON.parse(s) as T;
    } catch {
      return null;
    }
  }

  ngAfterViewInit(): void {
    this._observeFooter();
  }

  ngOnDestroy(): void {
    this._footerResizeObserver?.disconnect();
  }

  private _scheduleFooterMeasure(): void {
    queueMicrotask(() => this._observeFooter());
  }

  private _observeFooter(): void {
    this._footerResizeObserver?.disconnect();
    this._footerResizeObserver = undefined;

    if (!this._showFooter || !this._footerStickyBottom || !this._footerEl) {
      this.footerReservedHeight = 0;
      this._cdr.markForCheck();
      return;
    }

    const el = this._footerEl.nativeElement;
    const measure = () => {
      this.footerReservedHeight = el.offsetHeight;
      this._cdr.markForCheck();
    };
    measure();
    this._footerResizeObserver = new ResizeObserver(measure);
    this._footerResizeObserver.observe(el);
  }
}
