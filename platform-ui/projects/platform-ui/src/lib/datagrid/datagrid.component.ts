import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, NgStyle, DecimalPipe, DatePipe } from '@angular/common';

export interface DataGridColumn<T = any> {
  field:     keyof T;
  header:    string;
  width?:    string;
  sortable?: boolean;
  type?:     'text' | 'number' | 'badge' | 'date';
  align?:    'left' | 'center' | 'right';
  /** color is optional — omit it for a neutral default Chip/Badge instead of a status color. */
  badgeMap?: Record<string, { label: string; color?: string }>;
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-datagrid',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, DecimalPipe, DatePipe],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
})
export class PuiDataGridComponent<T extends Record<string, any> = any> {
  @Input() columns:   DataGridColumn<T>[] = [];
  @Input() rows:      T[]                 = [];
  @Input() rowKey:    keyof T             = 'id' as keyof T;
  @Input() selectable  = false;
  @Input() paginate    = false;
  @Input() pageSize    = 10;
  @Input() emptyText   = 'No data to display.';
  /** Optional title shown on the left of the grid toolbar (e.g. "Account Summary"). */
  @Input() heading     = '';

  @Output() rowClick      = new EventEmitter<T>();
  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() sortChange    = new EventEmitter<DataGridSort>();
  @Output() pageChange    = new EventEmitter<DataGridPageEvent>();

  sort:        DataGridSort | null = null;
  currentPage  = 1;
  selectedRows = new Set<any>();

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
    return def?.color ? { background: def.color + '22', color: def.color } : {};
  }

  getBadgeLabel(col: DataGridColumn<T>, row: T): string {
    const key = String(row[col.field]);
    return col.badgeMap?.[key]?.label ?? key;
  }
}

