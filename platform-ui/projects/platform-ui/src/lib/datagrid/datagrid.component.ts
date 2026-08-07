import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, NgStyle, DecimalPipe, DatePipe } from '@angular/common';

export interface DataGridColumn<T = any> {
  field:     keyof T;
  header:    string;
  width?:    string;
  sortable?: boolean;
  type?:     'text' | 'number' | 'badge' | 'date';
  align?:    'left' | 'center' | 'right';
  badgeMap?: Record<string, { label: string; color: string }>;
}

export interface DataGridSort {
  field: string;
  dir:   'asc' | 'desc';
}

export interface DataGridPageEvent {
  page:     number;
  pageSize: number;
}

@Component({
  selector: 'pui-datagrid',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, DecimalPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pui-dg-wrap">

      <!-- table -->
      <div class="pui-dg-scroll">
        <table class="pui-dg">
          <thead>
            <tr>
              <!-- checkbox column -->
              <th *ngIf="selectable" class="pui-dg__th pui-dg__th--check">
                <input type="checkbox" class="pui-dg__check"
                       [checked]="allSelected"
                       (change)="toggleAll($event)">
              </th>
              <th *ngFor="let col of columns"
                  class="pui-dg__th"
                  [class.pui-dg__th--sortable]="col.sortable"
                  [class.pui-dg__th--sorted]="sort?.field === col.field"
                  [style.width]="col.width"
                  [style.text-align]="col.align || 'left'"
                  (click)="col.sortable && doSort($any(col.field))">
                {{ col.header }}
                <span *ngIf="col.sortable" class="pui-dg__sort-icon">
                  <svg *ngIf="sort?.field !== col.field" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v8M2 4l3-3 3 3M2 7l3 3 3-3" stroke="#9ca3af" stroke-width="1.2" stroke-linecap="round"/>
                  </svg>
                  <svg *ngIf="sort?.field === col.field && sort?.dir === 'asc'" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 9V1M2 4l3-3 3 3" stroke="#0fa78d" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                  <svg *ngIf="sort?.field === col.field && sort?.dir === 'desc'" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v8M2 7l3 3 3-3" stroke="#0fa78d" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            <!-- empty state -->
            <tr *ngIf="!pagedRows.length">
              <td [attr.colspan]="columns.length + (selectable ? 1 : 0)" class="pui-dg__empty">
                {{ emptyText }}
              </td>
            </tr>

            <tr *ngFor="let row of pagedRows; let i = index"
                class="pui-dg__row"
                [class.pui-dg__row--selected]="isSelected(row)"
                (click)="rowClick.emit(row)">

              <td *ngIf="selectable" class="pui-dg__td pui-dg__td--check">
                <input type="checkbox" class="pui-dg__check"
                       [checked]="isSelected(row)"
                       (change)="toggleRow(row, $event)">
              </td>

              <td *ngFor="let col of columns"
                  class="pui-dg__td"
                  [style.text-align]="col.align || 'left'">

                <!-- badge cell -->
                <ng-container *ngIf="col.type === 'badge' && col.badgeMap">
                  <span class="pui-dg__badge"
                        [ngStyle]="getBadgeStyle(col, row)">
                    {{ getBadgeLabel(col, row) }}
                  </span>
                </ng-container>

                <!-- number cell -->
                <ng-container *ngIf="col.type === 'number'">
                  {{ row[col.field] | number }}
                </ng-container>

                <!-- date cell -->
                <ng-container *ngIf="col.type === 'date'">
                  {{ row[col.field] | date }}
                </ng-container>

                <!-- default text cell -->
                <ng-container *ngIf="!col.type || col.type === 'text'">
                  {{ row[col.field] }}
                </ng-container>

              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- pagination -->
      <div *ngIf="paginate" class="pui-dg-footer">
        <span class="pui-dg-footer__info">
          {{ pageStart }}–{{ pageEnd }} of {{ sortedRows.length }} rows
        </span>
        <div class="pui-dg-footer__pages">
          <button class="pui-dg-footer__btn" [disabled]="currentPage === 1" (click)="goPage(currentPage - 1)">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <span class="pui-dg-footer__num">{{ currentPage }} / {{ totalPages }}</span>
          <button class="pui-dg-footer__btn" [disabled]="currentPage === totalPages" (click)="goPage(currentPage + 1)">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: inherit; }

    .pui-dg-wrap  { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
    .pui-dg-scroll { overflow-x: auto; }

    .pui-dg { width: 100%; border-collapse: collapse; font-size: 13.5px; }

    .pui-dg__th {
      text-align: left; padding: 11px 16px;
      background: #f9fafb; color: #6b7280;
      font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .06em;
      border-bottom: 1px solid #e5e7eb;
      white-space: nowrap; user-select: none;
    }
    .pui-dg__th--sortable { cursor: pointer; }
    .pui-dg__th--sortable:hover { color: #374151; }
    .pui-dg__th--sorted { color: #0fa78d; }
    .pui-dg__th--check  { width: 40px; }

    .pui-dg__sort-icon { display: inline-flex; align-items: center; margin-left: 5px; vertical-align: middle; }

    .pui-dg__row { transition: background .1s; }
    .pui-dg__row:hover { background: #f9fafb; }
    .pui-dg__row--selected { background: #eff6ff !important; }

    .pui-dg__td {
      padding: 12px 16px;
      border-bottom: 1px solid #f3f4f6;
      color: #111827; vertical-align: middle;
    }
    .pui-dg__row:last-child .pui-dg__td { border-bottom: none; }
    .pui-dg__td--check { width: 40px; }

    .pui-dg__empty {
      padding: 40px 16px; text-align: center;
      color: #9ca3af; font-size: 14px;
      border-bottom: none;
    }

    .pui-dg__check { width: 15px; height: 15px; cursor: pointer; accent-color: #0fa78d; }

    .pui-dg__badge {
      display: inline-flex; align-items: center;
      padding: 2px 9px; border-radius: 999px;
      font-size: 11.5px; font-weight: 600;
    }

    /* footer */
    .pui-dg-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 16px; background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }
    .pui-dg-footer__info  { font-size: 12.5px; color: #6b7280; }
    .pui-dg-footer__pages { display: flex; align-items: center; gap: 6px; }
    .pui-dg-footer__num   { font-size: 13px; color: #374151; min-width: 48px; text-align: center; }
    .pui-dg-footer__btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: 6px;
      border: 1px solid #e5e7eb; background: #fff; color: #374151;
      cursor: pointer; transition: background .12s;
    }
    .pui-dg-footer__btn:disabled { opacity: .4; cursor: not-allowed; }
    .pui-dg-footer__btn:not(:disabled):hover { background: #f3f4f6; }
  `],
})
export class PuiDataGridComponent<T extends Record<string, any> = any> {
  @Input() columns:   DataGridColumn<T>[] = [];
  @Input() rows:      T[]                 = [];
  @Input() rowKey:    keyof T             = 'id' as keyof T;
  @Input() selectable  = false;
  @Input() paginate    = false;
  @Input() pageSize    = 10;
  @Input() emptyText   = 'No data to display.';

  @Output() rowClick      = new EventEmitter<T>();
  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() sortChange    = new EventEmitter<DataGridSort>();
  @Output() pageChange    = new EventEmitter<DataGridPageEvent>();

  sort:        DataGridSort | null = null;
  currentPage  = 1;
  selectedRows: Set<any> = new Set();

  get sortedRows(): T[] {
    if (!this.sort) return this.rows;
    const { field, dir } = this.sort;
    return [...this.rows].sort((a, b) => {
      const av = a[field], bv = b[field];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return dir === 'asc' ? cmp : -cmp;
    });
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.sortedRows.length / this.pageSize)); }
  get pageStart():  number { return (this.currentPage - 1) * this.pageSize + 1; }
  get pageEnd():    number { return Math.min(this.currentPage * this.pageSize, this.sortedRows.length); }

  get pagedRows(): T[] {
    if (!this.paginate) return this.sortedRows;
    return this.sortedRows.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  get allSelected(): boolean {
    return this.pagedRows.length > 0 && this.pagedRows.every(r => this.isSelected(r));
  }

  isSelected(row: T): boolean { return this.selectedRows.has(row[this.rowKey]); }

  toggleRow(row: T, e: Event): void {
    const checked = (e.target as HTMLInputElement).checked;
    if (checked) this.selectedRows.add(row[this.rowKey]);
    else         this.selectedRows.delete(row[this.rowKey]);
    this.selectionChange.emit(this.rows.filter(r => this.selectedRows.has(r[this.rowKey])));
  }

  toggleAll(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked;
    this.pagedRows.forEach(r => {
      if (checked) this.selectedRows.add(r[this.rowKey]);
      else         this.selectedRows.delete(r[this.rowKey]);
    });
    this.selectionChange.emit(this.rows.filter(r => this.selectedRows.has(r[this.rowKey])));
  }

  doSort(field: string): void {
    if (this.sort?.field === field) {
      this.sort = { field, dir: this.sort.dir === 'asc' ? 'desc' : 'asc' };
    } else {
      this.sort = { field, dir: 'asc' };
    }
    this.currentPage = 1;
    this.sortChange.emit(this.sort);
  }

  goPage(page: number): void {
    this.currentPage = Math.max(1, Math.min(page, this.totalPages));
    this.pageChange.emit({ page: this.currentPage, pageSize: this.pageSize });
  }

  getBadgeStyle(col: DataGridColumn<T>, row: T): Record<string, string> {
    const key = String(row[col.field]);
    const def = col.badgeMap?.[key];
    return def ? { background: def.color + '22', color: def.color } : {};
  }

  getBadgeLabel(col: DataGridColumn<T>, row: T): string {
    const key = String(row[col.field]);
    return col.badgeMap?.[key]?.label ?? key;
  }
}

