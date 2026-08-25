import {
  Component, Input, Output, EventEmitter,
  ViewEncapsulation, ChangeDetectionStrategy,
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { FooterVariant, FooterLink, FooterNoticeSlide } from '../models/footer.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-footer',
  standalone: true,
  imports: [NgIf, NgFor, IconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class PuiFooterComponent {
  @Input() variant: FooterVariant = 'simple';

  /** Pins the footer to the bottom of the viewport (position: fixed, full
   * width) instead of flowing wherever it lands in the page content. Off
   * by default so the footer behaves like a normal block by default. */
  @Input() set stickyBottom(v: boolean | string) {
    this._stickyBottom = v === true || v === 'true' || (v as any) === '';
  }
  get stickyBottom(): boolean { return this._stickyBottom; }
  private _stickyBottom = false;

  @Input() set noticeSlides(v: FooterNoticeSlide[] | string) {
    this._noticeSlides = typeof v === 'string' ? (this._parse<FooterNoticeSlide[]>(v) ?? []) : (v || []);
    if (this._activeSlideIndex >= this._noticeSlides.length) this._activeSlideIndex = 0;
  }
  get noticeSlides(): FooterNoticeSlide[] { return this._noticeSlides; }
  private _noticeSlides: FooterNoticeSlide[] = [];

  @Input() set activeSlideIndex(v: number | string) {
    this._activeSlideIndex = typeof v === 'string' ? (parseInt(v, 10) || 0) : (v ?? 0);
  }
  get activeSlideIndex(): number { return this._activeSlideIndex; }
  private _activeSlideIndex = 0;

  @Input() copyrightText = `Copyright © ${new Date().getFullYear()} Solifi. All Rights Reserved.`;

  @Input() set links(v: FooterLink[] | string) {
    this._links = typeof v === 'string' ? (this._parse<FooterLink[]>(v) ?? []) : (v || []);
  }
  get links(): FooterLink[] { return this._links; }
  private _links: FooterLink[] = [];

  @Input() poweredByText = 'Powered by Solifi™';

  @Input() set showPoweredBy(v: boolean | string) {
    this._showPoweredBy = v !== false && v !== 'false';
  }
  get showPoweredBy(): boolean { return this._showPoweredBy; }
  private _showPoweredBy = true;

  @Output() activeSlideIndexChange = new EventEmitter<number>();
  @Output() linkClick = new EventEmitter<FooterLink>();
  @Output() contactClick = new EventEmitter<FooterNoticeSlide>();

  get activeSlide(): FooterNoticeSlide | null {
    return this._noticeSlides[this._activeSlideIndex] ?? null;
  }

  prevSlide(): void {
    if (!this._noticeSlides.length) return;
    this._activeSlideIndex = (this._activeSlideIndex - 1 + this._noticeSlides.length) % this._noticeSlides.length;
    this.activeSlideIndexChange.emit(this._activeSlideIndex);
  }

  nextSlide(): void {
    if (!this._noticeSlides.length) return;
    this._activeSlideIndex = (this._activeSlideIndex + 1) % this._noticeSlides.length;
    this.activeSlideIndexChange.emit(this._activeSlideIndex);
  }

  goToSlide(i: number): void {
    if (i === this._activeSlideIndex) return;
    this._activeSlideIndex = i;
    this.activeSlideIndexChange.emit(this._activeSlideIndex);
  }

  selectLink(link: FooterLink, event: Event): void {
    if (!link.href) event.preventDefault();
    this.linkClick.emit(link);
  }

  onContactClick(event: Event): void {
    if (!this.activeSlide?.contactHref) event.preventDefault();
    if (this.activeSlide) this.contactClick.emit(this.activeSlide);
  }

  trackSlide(i: number): number { return i; }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
