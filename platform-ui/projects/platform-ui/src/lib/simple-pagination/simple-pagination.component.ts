import {
  Component, Input, Output, EventEmitter,
  OnChanges, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-simple-pagination',
  standalone: true,
  imports: [NgFor, NgIf, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './simple-pagination.component.html',
  styleUrls: ['./simple-pagination.component.scss'],
})
export class PuiSimplePaginationComponent implements OnChanges {
  @Input() total = 0;
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() maxVisible = 5;
  _disabled = false;
  @Input() set disabled(v: boolean | string) {
    this._disabled = v === true || v === 'true' || (v as any) === '';
  }

  @Output() pageChange = new EventEmitter<number>();

  pages: (number | '...')[] = [];
  totalPages = 0;

  ngOnChanges(): void {
    this.totalPages = Math.max(1, Math.ceil(this.total / this.pageSize));
    this.pages = this._buildPages();
  }

  goTo(p: number): void {
    if (this._disabled || p < 1 || p > this.totalPages || p === this.page) return;
    this.pageChange.emit(p);
  }

  isEllipsis(p: number | '...'): p is '...' { return p === '...'; }
  trackPage(_: number, p: number | '...'): string { return String(p); }

  private _buildPages(): (number | '...')[] {
    const total = this.totalPages;
    const cur = this.page;
    const max = this.maxVisible;

    if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);

    const half = Math.floor(max / 2);
    let start = Math.max(2, cur - half);
    let end = Math.min(total - 1, cur + half);

    if (cur - half < 2) end = Math.min(total - 1, max - 2);
    if (cur + half > total - 1) start = Math.max(2, total - max + 2);

    const pages: (number | '...')[] = [1];
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push('...');
    pages.push(total);

    return pages;
  }
}
