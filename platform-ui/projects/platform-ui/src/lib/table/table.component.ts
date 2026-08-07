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
  selector: 'pui-table',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="pui-tbl-host">

  <!-- ── Toolbar ─────────────────────────────────────── -->
  <div class="pui-tbl-toolbar" *ngIf="_searchable || _selectable">
    <div class="pui-tbl-toolbar__left">
      <span *ngIf="_selectable && selectedRows.size > 0" class="pui-tbl-sel-info">
        {{ selectedRows.size }} row{{ selectedRows.size === 1 ? '' : 's' }} selected
      </span>
    </div>
    <div class="pui-tbl-toolbar__right">
      <div class="pui-tbl-search" *ngIf="_searchable">
        <svg class="pui-tbl-search__icon" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.6"/>
          <path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
        <input class="pui-tbl-search__input"
               type="text"
               placeholder="Search…"
               [value]="searchTerm"
               (input)="onSearch($any($event.target).value)">
        <button *ngIf="searchTerm" class="pui-tbl-search__clear" (click)="onSearch('')">✕</button>
      </div>
    </div>
  </div>

  <!-- ── Table wrapper (scroll container) ────────────── -->
  <div class="pui-tbl-wrap"
       [class.pui-tbl-wrap--scroll]="_stickyHeader"
       [style.maxHeight]="_maxHeight ? _maxHeight + 'px' : null">

    <!-- Loading skeleton overlay -->
    <div class="pui-tbl-loading" *ngIf="_loading">
      <div class="pui-tbl-skeleton" *ngFor="let r of skeletonRows">
        <div class="pui-tbl-skeleton__cell" *ngFor="let c of _columns"
             [style.width]="c.width || '100%'"></div>
      </div>
    </div>

    <table class="pui-tbl">
      <!-- Header -->
      <thead class="pui-tbl-head" [class.pui-tbl-head--sticky]="_stickyHeader">
        <tr>
          <!-- Select-all checkbox -->
          <th *ngIf="_selectable" class="pui-tbl-th pui-tbl-th--sel">
            <label class="pui-tbl-cb">
              <input type="checkbox"
                     [checked]="allSelected"
                     [indeterminate]="someSelected && !allSelected"
                     (change)="toggleAll($any($event.target).checked)">
              <span class="pui-tbl-cb__box"></span>
            </label>
          </th>
          <!-- Column headers -->
          <th *ngFor="let col of _columns"
              class="pui-tbl-th"
              [class.pui-tbl-th--sortable]="col.sortable"
              [class.pui-tbl-th--sorted]="sort.key === col.key && sort.dir"
              [class.pui-tbl-th--right]="col.align === 'right'"
              [class.pui-tbl-th--center]="col.align === 'center'"
              [style.width]="col.width"
              [style.minWidth]="col.minWidth"
              (click)="col.sortable && onSort(col.key)">
            <span class="pui-tbl-th__label">{{ col.label }}</span>
            <span *ngIf="col.sortable" class="pui-tbl-sort-icon">
              <svg viewBox="0 0 12 16" fill="none" width="10" height="13">
                <!-- Up arrow -->
                <path d="M6 1.5L6 7M6 1.5L3.5 4M6 1.5L8.5 4"
                      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                      [class.pui-sort--active]="sort.key === col.key && sort.dir === 'asc'"
                      [class.pui-sort--dim]="!(sort.key === col.key && sort.dir === 'asc')"/>
                <!-- Down arrow -->
                <path d="M6 14.5L6 9M6 14.5L3.5 12M6 14.5L8.5 12"
                      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                      [class.pui-sort--active]="sort.key === col.key && sort.dir === 'desc'"
                      [class.pui-sort--dim]="!(sort.key === col.key && sort.dir === 'desc')"/>
              </svg>
            </span>
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="pui-tbl-body">
        <!-- Empty state -->
        <tr *ngIf="!_loading && displayRows.length === 0">
          <td [colSpan]="_selectable ? _columns.length + 1 : _columns.length" class="pui-tbl-empty">
            <div class="pui-tbl-empty__inner">
              <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
                <rect x="6" y="8" width="36" height="32" rx="3" stroke="#d1d5db" stroke-width="2"/>
                <path d="M6 16h36" stroke="#d1d5db" stroke-width="2"/>
                <path d="M14 24h4M22 24h12M14 32h8" stroke="#d1d5db" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <p>{{ searchTerm ? 'No results for "' + searchTerm + '"' : 'No data available' }}</p>
            </div>
          </td>
        </tr>

        <!-- Data rows -->
        <tr *ngFor="let row of displayRows; let i = index"
            class="pui-tbl-row"
            [class.pui-tbl-row--striped]="_striped && i % 2 !== 0"
            [class.pui-tbl-row--selected]="selectedRows.has(getRowId(row, i))"
            [class.pui-tbl-row--clickable]="rowClickEnabled"
            (click)="onRowClick(row, i)">

          <!-- Row checkbox -->
          <td *ngIf="_selectable" class="pui-tbl-td pui-tbl-td--sel"
              (click)="$event.stopPropagation(); toggleRow(row, i)">
            <label class="pui-tbl-cb">
              <input type="checkbox" [checked]="selectedRows.has(getRowId(row, i))"
                     (change)="toggleRow(row, i)">
              <span class="pui-tbl-cb__box"></span>
            </label>
          </td>

          <!-- Cells -->
          <td *ngFor="let col of _columns"
              class="pui-tbl-td"
              [class.pui-tbl-td--right]="col.align === 'right'"
              [class.pui-tbl-td--center]="col.align === 'center'">

            <!-- Badge type -->
            <ng-container *ngIf="col.type === 'badge'; else plain">
              <ng-container *ngIf="col.badgeMap && col.badgeMap[row[col.key]]; let bm">
                <span class="pui-tbl-badge"
                      [style.backgroundColor]="bm.color + '1a'"
                      [style.color]="bm.color"
                      [style.borderColor]="bm.color + '40'">
                  {{ bm.label ?? row[col.key] }}
                </span>
              </ng-container>
              <ng-container *ngIf="!(col.badgeMap && col.badgeMap[row[col.key]])">
                <span class="pui-tbl-badge pui-tbl-badge--default">{{ row[col.key] }}</span>
              </ng-container>
            </ng-container>

            <!-- Currency type -->
            <ng-template #plain>
              <ng-container *ngIf="col.type === 'currency'; else number">
                <span class="pui-tbl-cell--mono">{{ row[col.key] | number:'1.2-2' }}</span>
              </ng-container>
            </ng-template>
            <ng-template #number>
              <ng-container *ngIf="col.type === 'number'; else date">
                <span class="pui-tbl-cell--mono">{{ row[col.key] | number }}</span>
              </ng-container>
            </ng-template>
            <ng-template #date>
              <ng-container *ngIf="col.type === 'date'; else text">
                {{ row[col.key] | date:'mediumDate' }}
              </ng-container>
            </ng-template>
            <ng-template #text>{{ row[col.key] ?? '—' }}</ng-template>

          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ── Pagination ───────────────────────────────────── -->
  <div class="pui-tbl-pager" *ngIf="_paginated && filteredRows.length > 0">
    <span class="pui-tbl-pager__info">
      {{ rangeStart }}–{{ rangeEnd }} of {{ filteredRows.length }} rows
    </span>
    <div class="pui-tbl-pager__controls">
      <select class="pui-tbl-pager__size" [value]="_pageSize" (change)="onPageSizeChange($any($event.target).value)">
        <option *ngFor="let s of pageSizeOptions" [value]="s">{{ s }} / page</option>
      </select>
      <button class="pui-tbl-pager__btn" [disabled]="page <= 1" (click)="goPage(1)" title="First">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M11 12L7 8l4-4M5 4v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="pui-tbl-pager__btn" [disabled]="page <= 1" (click)="goPage(page - 1)" title="Previous">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <span class="pui-tbl-pager__pages">
        <button *ngFor="let p of pageNumbers"
                class="pui-tbl-pager__page"
                [class.pui-tbl-pager__page--active]="p === page"
                (click)="goPage(p)">{{ p }}</button>
      </span>
      <button class="pui-tbl-pager__btn" [disabled]="page >= totalPages" (click)="goPage(page + 1)" title="Next">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="pui-tbl-pager__btn" [disabled]="page >= totalPages" (click)="goPage(totalPages)" title="Last">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M5 12l4-4-4-4M11 4v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
  </div>

</div>
  `,
  styles: [`
    /* ── Host ─────────────────────────────────── */
    .pui-tbl-host {
      display: flex; flex-direction: column; gap: 0;
      border: 1px solid #e5e7eb; border-radius: 12px;
      overflow: hidden; background: #fff;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      font-size: 13.5px; color: #111827;
    }

    /* ── Toolbar ──────────────────────────────── */
    .pui-tbl-toolbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px; border-bottom: 1px solid #f3f4f6;
      background: #fafafa; gap: 12px; flex-wrap: wrap;
    }
    .pui-tbl-toolbar__left { display: flex; align-items: center; gap: 10px; }
    .pui-tbl-toolbar__right { display: flex; align-items: center; gap: 10px; margin-left: auto; }
    .pui-tbl-sel-info {
      font-size: 12px; font-weight: 600; color: #0d9e87;
      background: rgba(18,198,168,.1); padding: 3px 10px; border-radius: 20px;
    }

    /* Search */
    .pui-tbl-search {
      position: relative; display: flex; align-items: center;
    }
    .pui-tbl-search__icon {
      position: absolute; left: 9px; width: 14px; height: 14px;
      color: #9ca3af; pointer-events: none;
    }
    .pui-tbl-search__input {
      padding: 6px 28px 6px 30px; border: 1px solid #e5e7eb;
      border-radius: 8px; font-size: 13px; font-family: inherit;
      background: #fff; color: #111827; outline: none; width: 220px;
      transition: border-color .15s, box-shadow .15s;
    }
    .pui-tbl-search__input:focus {
      border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.12);
    }
    .pui-tbl-search__input::placeholder { color: #c4c9d4; }
    .pui-tbl-search__clear {
      position: absolute; right: 8px; background: none; border: none;
      color: #9ca3af; cursor: pointer; font-size: 11px; padding: 2px; line-height: 1;
    }
    .pui-tbl-search__clear:hover { color: #374151; }

    /* ── Scroll wrapper ───────────────────────── */
    .pui-tbl-wrap { position: relative; overflow-x: auto; }
    .pui-tbl-wrap--scroll { overflow-y: auto; }

    /* ── Loading skeleton ─────────────────────── */
    .pui-tbl-loading {
      position: absolute; inset: 0; z-index: 10;
      background: rgba(255,255,255,.85); backdrop-filter: blur(1px);
      display: flex; flex-direction: column; gap: 1px; padding-top: 48px;
    }
    .pui-tbl-skeleton {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px;
    }
    .pui-tbl-skeleton__cell {
      height: 12px; border-radius: 6px;
      background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: pui-shimmer 1.4s infinite linear;
      min-width: 60px; flex: 1;
    }
    @keyframes pui-shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* ── Table ────────────────────────────────── */
    .pui-tbl {
      width: 100%; border-collapse: collapse;
      font-family: inherit;
    }

    /* Header */
    .pui-tbl-head { background: #f9fafb; }
    .pui-tbl-head--sticky { position: sticky; top: 0; z-index: 5; }

    .pui-tbl-th {
      padding: 11px 14px;
      text-align: left; font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .06em; color: #6b7280;
      border-bottom: 2px solid #e5e7eb;
      white-space: nowrap; user-select: none;
    }
    .pui-tbl-th--sel { width: 44px; padding: 11px 10px 11px 16px; }
    .pui-tbl-th--right { text-align: right; }
    .pui-tbl-th--center { text-align: center; }
    .pui-tbl-th--sortable {
      cursor: pointer; transition: background .12s, color .12s;
    }
    .pui-tbl-th--sortable:hover { background: #f3f4f6; color: #374151; }
    .pui-tbl-th--sorted { color: #0d9e87; }
    .pui-tbl-th__label { vertical-align: middle; }

    /* Sort icon */
    .pui-tbl-sort-icon {
      display: inline-flex; align-items: center;
      margin-left: 5px; vertical-align: middle;
    }
    .pui-sort--active { stroke: #12C6A8; transition: stroke .15s; }
    .pui-sort--dim    { stroke: #d1d5db; transition: stroke .15s; }

    /* Body */
    .pui-tbl-row {
      transition: background .12s;
      animation: pui-row-in .18s ease both;
    }
    .pui-tbl-row:hover { background: #f9fafb; }
    .pui-tbl-row--striped { background: #fafafa; }
    .pui-tbl-row--striped:hover { background: #f3f4f6; }
    .pui-tbl-row--selected { background: #f0fdfb !important; }
    .pui-tbl-row--selected:hover { background: #e6faf7 !important; }
    .pui-tbl-row--clickable { cursor: pointer; }

    @keyframes pui-row-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .pui-tbl-td {
      padding: 12px 14px; color: #374151;
      border-bottom: 1px solid #f3f4f6;
      font-size: 13px; vertical-align: middle;
    }
    .pui-tbl-td--sel { padding: 12px 10px 12px 16px; width: 44px; }
    .pui-tbl-td--right { text-align: right; }
    .pui-tbl-td--center { text-align: center; }
    .pui-tbl-row:last-child .pui-tbl-td { border-bottom: none; }
    .pui-tbl-cell--mono { font-family: 'SF Mono', ui-monospace, monospace; font-size: 12.5px; }

    /* Checkbox */
    .pui-tbl-cb { display: inline-flex; align-items: center; cursor: pointer; }
    .pui-tbl-cb input { position: absolute; opacity: 0; width: 0; height: 0; }
    .pui-tbl-cb__box {
      width: 16px; height: 16px; border: 1.5px solid #d1d5db; border-radius: 4px;
      background: #fff; display: inline-flex; align-items: center; justify-content: center;
      transition: border-color .12s, background .12s;
      flex-shrink: 0;
    }
    .pui-tbl-cb input:checked + .pui-tbl-cb__box {
      background: #12C6A8; border-color: #12C6A8;
    }
    .pui-tbl-cb input:checked + .pui-tbl-cb__box::after {
      content: ''; width: 4px; height: 7px;
      border: 1.5px solid #fff; border-top: none; border-left: none;
      transform: rotate(45deg) translate(-1px, -1px);
    }
    .pui-tbl-cb input:indeterminate + .pui-tbl-cb__box {
      background: #12C6A8; border-color: #12C6A8;
    }
    .pui-tbl-cb input:indeterminate + .pui-tbl-cb__box::after {
      content: ''; width: 8px; height: 1.5px; background: #fff; border: none;
    }

    /* Badge cell */
    .pui-tbl-badge {
      display: inline-flex; align-items: center;
      padding: 2px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 600;
      border: 1px solid transparent; white-space: nowrap;
      transition: opacity .12s;
    }
    .pui-tbl-badge--default { background: #f3f4f6; color: #6b7280; border-color: #e5e7eb; }

    /* Empty state */
    .pui-tbl-empty {
      padding: 52px 16px; text-align: center; color: #9ca3af;
    }
    .pui-tbl-empty__inner {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
    }
    .pui-tbl-empty__inner p { font-size: 13.5px; color: #9ca3af; margin: 0; }

    /* ── Pagination ───────────────────────────── */
    .pui-tbl-pager {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 16px; border-top: 1px solid #f3f4f6;
      background: #fafafa; flex-wrap: wrap; gap: 8px;
    }
    .pui-tbl-pager__info { font-size: 12px; color: #9ca3af; white-space: nowrap; }
    .pui-tbl-pager__controls { display: flex; align-items: center; gap: 4px; }

    .pui-tbl-pager__size {
      font-size: 12px; padding: 4px 8px; border: 1px solid #e5e7eb;
      border-radius: 6px; background: #fff; color: #374151;
      font-family: inherit; cursor: pointer; outline: none;
      margin-right: 4px;
    }
    .pui-tbl-pager__size:focus { border-color: #12C6A8; }

    .pui-tbl-pager__btn {
      display: flex; align-items: center; justify-content: center;
      width: 30px; height: 30px; border: 1px solid #e5e7eb;
      border-radius: 7px; background: #fff; cursor: pointer; color: #374151;
      transition: background .12s, border-color .12s, color .12s;
    }
    .pui-tbl-pager__btn:hover:not([disabled]) {
      background: #f0fdfb; border-color: #12C6A8; color: #0d9e87;
    }
    .pui-tbl-pager__btn[disabled] { opacity: .35; cursor: not-allowed; }

    .pui-tbl-pager__pages { display: flex; align-items: center; gap: 2px; }
    .pui-tbl-pager__page {
      min-width: 30px; height: 30px; padding: 0 5px;
      border: 1px solid #e5e7eb; border-radius: 7px;
      background: #fff; cursor: pointer; color: #374151;
      font-size: 12.5px; font-family: inherit;
      transition: background .12s, border-color .12s, color .12s;
    }
    .pui-tbl-pager__page:hover { background: #f3f4f6; }
    .pui-tbl-pager__page--active {
      background: #12C6A8; border-color: #12C6A8;
      color: #fff; font-weight: 700;
    }
  `],
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
