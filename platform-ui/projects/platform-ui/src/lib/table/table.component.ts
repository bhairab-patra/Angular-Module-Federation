import {
  Component, Input, Output, EventEmitter, ElementRef, AfterViewInit,
  inject, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { NgFor, NgIf, DecimalPipe, DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TableColumn, SortState } from '../models/table.model';

export { TableColumn, SortDir, SortState } from '../models/table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-table',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe, DatePipe],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class PuiTableComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  _columns: TableColumn[] = [];
  _data: any[] = [];

  @Input() set columns(v: TableColumn[] | string) {
    this._columns = typeof v === 'string' ? (this._parse<TableColumn[]>(v) ?? []) : (v || []);
  }
  get columns() { return this._columns; }

  @Input() set data(v: any[] | string) {
    this._data = typeof v === 'string' ? (this._parse<any[]>(v) ?? []) : (v || []);
  }
  get data() { return this._data; }

  _sortable = false;
  _searchable = false;
  _stickyHeader = false;
  _striped = false;
  _loading = false;

  @Input() set sortable(v: boolean | string) { this._sortable = this._bool(v); }
  @Input() set searchable(v: boolean | string) { this._searchable = this._bool(v); }
  @Input() set stickyHeader(v: boolean | string) { this._stickyHeader = this._bool(v); }
  @Input() set striped(v: boolean | string) { this._striped = this._bool(v); }
  @Input() set loading(v: boolean | string) { this._loading = this._bool(v); }

  /** Optional title shown on the left of the table toolbar (e.g. "Account Summary"). */
  @Input() heading = '';

  _maxHeight = 0;
  @Input() set maxHeight(v: number | string) { this._maxHeight = Number(v) || 0; }

  _tooltipPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() set tooltipPosition(v: 'top' | 'bottom' | 'left' | 'right') {
    this._tooltipPos = v || 'top';
  }

  cellTooltipVisible = false;
  hoveredCellText = '';
  cellTooltipCoords = { top: 0, left: 0 };

  @Output() sortChange = new EventEmitter<SortState>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() rowClick = new EventEmitter<any>();

  sort: SortState = { key: '', dir: '' };
  searchTerm = '';
  skeletonRows = Array(5).fill(null);
  rowClickEnabled = false;

  get displayRows(): any[] {
    let rows = [...this._data];
    if (this.searchTerm) {
      const t = this.searchTerm.toLowerCase();
      rows = rows.filter(r =>
        this._columns.some(c => String(r[c.key] ?? '').toLowerCase().includes(t))
      );
    }
    if (this.sort.key && this.sort.dir) {
      const { key } = this.sort;
      const mul = this.sort.dir === 'asc' ? 1 : -1;
      rows = rows.slice().sort((a, b) => {
        const av = a[key] ?? ''; const bv = b[key] ?? '';
        return av < bv ? -mul : av > bv ? mul : 0;
      });
    }
    return rows;
  }


  ngAfterViewInit(): void {
    this.rowClickEnabled = this.rowClick.observed;
  }

  onSort(key: string): void {
    if (this.sort.key === key) {
      this.sort = { key, dir: this.sort.dir === 'asc' ? 'desc' : this.sort.dir === 'desc' ? '' : 'asc' };
    } else {
      this.sort = { key, dir: 'asc' };
    }
    if (!this.sort.dir) this.sort = { key: '', dir: '' };
    this.sortChange.emit(this.sort);
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.searchChange.emit(term);
  }

  onRowClick(row: any): void { this.rowClick.emit(row); }

  showCellTooltip(event: MouseEvent, text: string): void {
    if (!text) return;
    const td = event.currentTarget as HTMLElement;
    const textEl = td.querySelector('.pui-cell-text') as HTMLElement | null;
    if (!textEl || textEl.scrollWidth <= textEl.clientWidth) return;
    const hostRect = (this.el.nativeElement as HTMLElement).getBoundingClientRect();
    const rect = td.getBoundingClientRect();
    let top = 0, left = 0;
    switch (this._tooltipPos) {
      case 'top': top = rect.top - hostRect.top - 8; left = rect.left - hostRect.left + rect.width / 2; break;
      case 'bottom': top = rect.bottom - hostRect.top + 8; left = rect.left - hostRect.left + rect.width / 2; break;
      case 'left': top = rect.top - hostRect.top + rect.height / 2; left = rect.left - hostRect.left - 8; break;
      case 'right': top = rect.top - hostRect.top + rect.height / 2; left = rect.right - hostRect.left + 8; break;
    }
    this.hoveredCellText = text;
    this.cellTooltipCoords = { top, left };
    this.cellTooltipVisible = true;
  }

  hideCellTooltip(): void {
    this.cellTooltipVisible = false;
  }

  private _bool(v: boolean | string): boolean {
    return v === true || v === 'true' || (v as any) === '';
  }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
