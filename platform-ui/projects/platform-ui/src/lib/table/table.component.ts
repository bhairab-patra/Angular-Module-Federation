import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges, inject
} from '@angular/core';
import { NgFor, NgIf, DecimalPipe, DatePipe } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  minWidth?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'currency' | 'badge';
  badgeMap?: Record<string, { label?: string; color?: string }>;
}

export type SortDir = 'asc' | 'desc' | '';

export interface SortState { key: string; dir: SortDir; }

@Component({
  selector: 'pui-lib-table',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class PuiTableComponent implements OnChanges {
  private cdr = inject(ChangeDetectorRef);

  /* ── Column / data ─────────────────── */
  _columns: TableColumn[] = [];
  _data: any[] = [];

  @Input() set columns(v: TableColumn[] | string) {
    this._columns = typeof v === 'string' ? (this._parseJson<TableColumn[]>(v) ?? []) : (v || []);
  }
  get columns() { return this._columns; }

  @Input() set data(v: any[] | string) {
    this._data = typeof v === 'string' ? (this._parseJson<any[]>(v) ?? []) : (v || []);
    this.page = 1;
    this.selectedRows.clear();
  }
  get data() { return this._data; }

  /* ── Boolean feature flags ──────────── */
  _sortable     = false;
  _searchable   = false;
  _paginated    = false;
  _stickyHeader = false;
  _striped      = false;
  _selectable   = false;
  _loading      = false;

  @Input() set sortable(v: boolean | string)     { this._sortable     = this._bool(v); }
  @Input() set searchable(v: boolean | string)   { this._searchable   = this._bool(v); }
  @Input() set paginated(v: boolean | string)    { this._paginated    = this._bool(v); }
  @Input() set stickyHeader(v: boolean | string) { this._stickyHeader = this._bool(v); }
  @Input() set striped(v: boolean | string)      { this._striped      = this._bool(v); }
  @Input() set selectable(v: boolean | string)   { this._selectable   = this._bool(v); }
  @Input() set loading(v: boolean | string)      { this._loading      = this._bool(v); }

  /* ── Numeric ────────────────────────── */
  _pageSize  = 10;
  _maxHeight = 0;

  @Input() set pageSize(v: number | string)  { this._pageSize  = Number(v) || 10; this.page = 1; }
  @Input() set maxHeight(v: number | string) { this._maxHeight = Number(v) || 0; }

  /* ── Outputs ────────────────────────── */
  @Output() sortChange      = new EventEmitter<SortState>();
  @Output() pageChange      = new EventEmitter<number>();
  @Output() searchChange    = new EventEmitter<string>();
  @Output() rowClick        = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();

  /* ── State ──────────────────────────── */
  sort: SortState       = { key: '', dir: '' };
  searchTerm            = '';
  page                  = 1;
  pageSizeOptions       = [5, 10, 20, 50, 100];
  selectedRows          = new Set<string>();
  skeletonRows          = Array(5).fill(null);
  rowClickEnabled       = false;

  /* ── Derived ────────────────────────── */
  get filteredRows(): any[] {
    let rows = [...this._data];
    if (this.searchTerm) {
      const t = this.searchTerm.toLowerCase();
      rows = rows.filter(row =>
        this._columns.some(col => String(row[col.key] ?? '').toLowerCase().includes(t))
      );
    }
    if (this.sort.key && this.sort.dir) {
      const key = this.sort.key;
      const mul = this.sort.dir === 'asc' ? 1 : -1;
      rows = rows.slice().sort((a, b) => {
        const av = a[key] ?? ''; const bv = b[key] ?? '';
        return av < bv ? -mul : av > bv ? mul : 0;
      });
    }
    return rows;
  }

  get displayRows(): any[] {
    const rows = this.filteredRows;
    if (!this._paginated) return rows;
    const start = (this.page - 1) * this._pageSize;
    return rows.slice(start, start + this._pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredRows.length / this._pageSize));
  }

  get rangeStart(): number {
    return this.filteredRows.length === 0 ? 0 : (this.page - 1) * this._pageSize + 1;
  }

  get rangeEnd(): number {
    return Math.min(this.page * this._pageSize, this.filteredRows.length);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const cur   = this.page;
    const delta = 2;
    const pages: number[] = [];
    for (let i = Math.max(1, cur - delta); i <= Math.min(total, cur + delta); i++) {
      pages.push(i);
    }
    return pages;
  }

  get allSelected(): boolean {
    return this.displayRows.length > 0 &&
      this.displayRows.every((r, i) => this.selectedRows.has(this.getRowId(r, i)));
  }

  get someSelected(): boolean {
    return this.displayRows.some((r, i) => this.selectedRows.has(this.getRowId(r, i)));
  }

  ngOnChanges(_: SimpleChanges) { this.cdr.markForCheck(); }

  /* ── Handlers ───────────────────────── */
  onSort(key: string): void {
    if (this.sort.key === key) {
      this.sort = { key, dir: this.sort.dir === 'asc' ? 'desc' : this.sort.dir === 'desc' ? '' : 'asc' };
    } else {
      this.sort = { key, dir: 'asc' };
    }
    if (!this.sort.dir) this.sort = { key: '', dir: '' };
    this.page = 1;
    this.sortChange.emit(this.sort);
    this.cdr.markForCheck();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.page = 1;
    this.searchChange.emit(term);
    this.cdr.markForCheck();
  }

  goPage(p: number): void {
    this.page = Math.max(1, Math.min(p, this.totalPages));
    this.pageChange.emit(this.page);
    this.cdr.markForCheck();
  }

  onPageSizeChange(val: string): void {
    this._pageSize = Number(val) || 10;
    this.page = 1;
    this.cdr.markForCheck();
  }

  onRowClick(row: any, _i: number): void {
    this.rowClick.emit(row);
  }

  getRowId(row: any, i: number): string {
    return row['id'] != null ? String(row['id']) : String(i);
  }

  toggleRow(row: any, i: number): void {
    const id = this.getRowId(row, i);
    if (this.selectedRows.has(id)) { this.selectedRows.delete(id); }
    else { this.selectedRows.add(id); }
    this._emitSelection();
    this.cdr.markForCheck();
  }

  toggleAll(checked: boolean): void {
    this.displayRows.forEach((r, i) => {
      const id = this.getRowId(r, i);
      if (checked) { this.selectedRows.add(id); }
      else { this.selectedRows.delete(id); }
    });
    this._emitSelection();
    this.cdr.markForCheck();
  }

  private _emitSelection(): void {
    const selected = this._data.filter((r, i) =>
      this.selectedRows.has(this.getRowId(r, i))
    );
    this.selectionChange.emit(selected);
  }

  private _bool(v: boolean | string): boolean {
    return v === true || v === 'true' || (v as any) === '';
  }

  private _parseJson<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
