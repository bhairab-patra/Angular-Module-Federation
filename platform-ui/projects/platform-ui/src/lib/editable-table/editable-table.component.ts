import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  inject,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { NgFor, NgIf, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TableColumn, TableAction, SortState } from '../models/table.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';
import { PUI_DEFAULT_PAGE_SIZE } from '../constants';
import { getDeepActiveElement } from '../focus-utils';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { PuiSimplePaginationInternalComponent } from '../simple-pagination/simple-pagination-internal.component';
import { PuiSearchInternalComponent } from '../search/search-internal.component';
import { PuiEmptyStateInternalComponent } from '../empty-state/empty-state-internal.component';
import { ToastService } from '../toast/toast.service';

export { TableColumn, TableAction, SortState } from '../models/table.model';
export interface EditableRowSaveEvent {
  index: number;
  row: any;
  oldRow: any;
}
export interface EditableRowEvent {
  index: number;
  row: any;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-editable-table',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DecimalPipe,
    DatePipe,
    FormsModule,
    IconInternalComponent,
    PuiSimplePaginationInternalComponent,
    PuiSearchInternalComponent,
    PuiEmptyStateInternalComponent,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
})
export class PuiEditableTableComponent {
  private el = inject(ElementRef);
  private toast = inject(ToastService);
  private sanitizer = inject(DomSanitizer);

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  _columns: TableColumn[] = [];
  @Input() set columns(v: TableColumn[] | string) {
    this._columns = typeof v === 'string' ? (this._parse<TableColumn[]>(v) ?? []) : v || [];
  }
  get columns() {
    return this._columns;
  }

  _rows: any[] = [];
  @Input() set data(v: any[] | string) {
    this._rows = typeof v === 'string' ? (this._parse<any[]>(v) ?? []) : [...(v || [])];
    if (this.editingIndex !== null && this.editingIndex >= this._rows.length) {
      this._cancelEdit();
    }
    this._clampPage();
  }
  get data() {
    return this._rows;
  }

  _maxHeight = 480;
  @Input() set maxHeight(v: number | string) {
    this._maxHeight = Number(v) || 480;
  }

  @Input() heading = '';

  _loading = false;
  @Input() set loading(v: boolean | string) {
    this._loading = this._bool(v);
  }

  _confirmDelete = false;
  @Input() set confirmDelete(v: boolean | string) {
    this._confirmDelete = this._bool(v);
  }

  _showEditAction = true;
  @Input() set showEditAction(v: boolean | string) {
    this._showEditAction = this._bool(v);
  }

  _showDeleteAction = true;
  @Input() set showDeleteAction(v: boolean | string) {
    this._showDeleteAction = this._bool(v);
  }

  _rowActions: TableAction[] = [];
  @Input() set rowActions(v: TableAction[] | string) {
    this._rowActions = typeof v === 'string' ? (this._parse<TableAction[]>(v) ?? []) : v || [];
  }
  get rowActions() {
    return this._rowActions;
  }

  get hasRowActions(): boolean {
    return (
      this._showEditAction ||
      this._showDeleteAction ||
      this._rowActions.length > 0 ||
      this.editingIndex !== null
    );
  }

  _searchable = false;
  @Input() set searchable(v: boolean | string) {
    this._searchable = this._bool(v);
  }

  _striped = true;
  @Input() set striped(v: boolean | string) {
    this._striped = this._bool(v);
  }

  _stickyHeader = true;
  @Input() set stickyHeader(v: boolean | string) {
    this._stickyHeader = this._bool(v);
  }

  _pagination = false;
  @Input() set pagination(v: boolean | string) {
    this._pagination = this._bool(v);
    this._clampPage();
  }

  _pageSize = PUI_DEFAULT_PAGE_SIZE;
  @Input() set pageSize(v: number | string) {
    this._pageSize = Number(v) || PUI_DEFAULT_PAGE_SIZE;
    this.page = 1;
  }
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];

  _tooltipPos: 'top' | 'bottom' | 'left' | 'right' = 'right';
  @Input() set tooltipPosition(v: 'top' | 'bottom' | 'left' | 'right') {
    this._tooltipPos = v || 'right';
  }

  _showToast = true;
  @Input() set showToast(v: boolean | string) {
    this._showToast = this._bool(v);
  }
  @Input() saveToastMessage = 'Row saved successfully';
  @Input() deleteToastMessage = 'Row deleted successfully';

  @Output() rowSave = new EventEmitter<EditableRowSaveEvent>();
  @Output() rowDelete = new EventEmitter<EditableRowEvent>();
  @Output() rowEdit = new EventEmitter<EditableRowEvent>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<SortState>();
  @Output() actionClick = new EventEmitter<{ action: TableAction; row: any; index: number }>();

  editingIndex: number | null = null;
  draft: Record<string, any> = {};
  fieldErrors: Record<string, string> = {};
  searchTerm = '';
  sort: SortState = { key: '', dir: '' };
  page = 1;

  cellTooltipVisible = false;
  hoveredCellText = '';
  cellTooltipCoords = { top: 0, left: 0 };

  _pendingDeleteIndex: number | null = null;
  _pendingDeleteRow: any = null;

  skeletonRows = Array(5).fill(null);

  get displayRows(): { row: any; idx: number }[] {
    let paired = this._rows.map((row, idx) => ({ row, idx }));

    if (this.searchTerm) {
      const t = this.searchTerm.toLowerCase();
      paired = paired.filter(({ row }) =>
        this._columns.some((c) =>
          String(row[c.key] ?? '')
            .toLowerCase()
            .includes(t),
        ),
      );
    }

    if (this.sort.key && this.sort.dir) {
      const { key } = this.sort;
      const mul = this.sort.dir === 'asc' ? 1 : -1;
      paired = paired.slice().sort((a, b) => {
        const av = a.row[key] ?? '';
        const bv = b.row[key] ?? '';
        return av < bv ? -mul : av > bv ? mul : 0;
      });
    }

    return paired;
  }

  get pagedRows(): { row: any; idx: number }[] {
    const rows = this.displayRows;
    if (!this._pagination) return rows;
    const start = (this.page - 1) * this._pageSize;
    return rows.slice(start, start + this._pageSize);
  }

  trackByIdx(_i: number, item: { idx: number }): number {
    return item.idx;
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.page = 1;
    this.searchChange.emit(term);
  }

  onSort(key: string): void {
    if (this.sort.key === key) {
      this.sort = {
        key,
        dir: this.sort.dir === 'asc' ? 'desc' : this.sort.dir === 'desc' ? '' : 'asc',
      };
    } else {
      this.sort = { key, dir: 'asc' };
    }
    if (!this.sort.dir) this.sort = { key: '', dir: '' };
    this.sortChange.emit(this.sort);
  }

  onPageChange(p: number): void {
    this.page = p;
  }
  onPageSizeChange(size: number | string): void {
    this._pageSize = Number(size) || PUI_DEFAULT_PAGE_SIZE;
    this.page = 1;
  }

  private _clampPage(): void {
    const totalPages = Math.max(1, Math.ceil(this.displayRows.length / this._pageSize));
    if (this.page > totalPages) this.page = totalPages;
  }

  showCellTooltip(event: MouseEvent, text: string): void {
    if (!text) return;
    const td = event.currentTarget as HTMLElement;
    const textEl = td.querySelector(
      '.pui-etbl-cell-text, .pui-etbl-th__label',
    ) as HTMLElement | null;
    if (!textEl || textEl.scrollWidth <= textEl.clientWidth) return;
    const hostRect = (this.el.nativeElement as HTMLElement).getBoundingClientRect();
    const rect = td.getBoundingClientRect();
    let top = 0,
      left = 0;
    switch (this._tooltipPos) {
      case 'top':
        top = rect.top - hostRect.top - 8;
        left = rect.left - hostRect.left + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom - hostRect.top + 8;
        left = rect.left - hostRect.left + rect.width / 2;
        break;
      case 'left':
        top = rect.top - hostRect.top + rect.height / 2;
        left = rect.left - hostRect.left - 8;
        break;
      case 'right':
        top = rect.top - hostRect.top + rect.height / 2;
        left = rect.right - hostRect.left + 8;
        break;
    }
    this.hoveredCellText = text;
    this.cellTooltipCoords = { top, left };
    this.cellTooltipVisible = true;
  }

  hideCellTooltip(): void {
    this.cellTooltipVisible = false;
  }

  startEdit(i: number): void {
    if (this.editingIndex !== null) return;
    this.editingIndex = i;
    this.draft = { ...this._rows[i] };
    this.fieldErrors = {};
    this.rowEdit.emit({ index: i, row: this._rows[i] });
  }

  onRowAction(act: TableAction, i: number): void {
    if (this.editingIndex !== null) return;
    if (act.disabled && act.disabled(this._rows[i])) return;
    const row = this._rows[i];
    act.action(row);
    this.actionClick.emit({ action: act, row, index: i });
  }

  onFieldChange(col: TableColumn): void {
    const err = this._computeFieldError(col, this.draft[col.key]);
    if (err) this.fieldErrors[col.key] = err;
    else delete this.fieldErrors[col.key];
  }

  get hasFieldErrors(): boolean {
    return Object.keys(this.fieldErrors).length > 0;
  }

  saveEdit(): void {
    if (this.editingIndex === null) return;

    const errors: Record<string, string> = {};
    for (const col of this._columns) {
      if (col.editable === false) continue;
      const err = this._computeFieldError(col, this.draft[col.key]);
      if (err) errors[col.key] = err;
    }
    this.fieldErrors = errors;
    if (Object.keys(errors).length > 0) return;

    const idx = this.editingIndex;
    const oldRow = this._rows[idx];
    const newRow = { ...oldRow, ...this.draft };
    this._rows = this._rows.map((r, _i) => (_i === idx ? newRow : r));
    this.rowSave.emit({ index: idx, row: newRow, oldRow });
    if (this._showToast) this.toast.success(this.saveToastMessage);
    this._cancelEdit();
  }

  cancelEdit(): void {
    this._cancelEdit();
  }

  private _previouslyFocusedForDelete: HTMLElement | null = null;

  deleteRow(i: number): void {
    if (this.editingIndex !== null) return;
    if (this._confirmDelete) {
      this._pendingDeleteIndex = i;
      this._pendingDeleteRow = this._rows[i];
      this._previouslyFocusedForDelete = getDeepActiveElement();
      setTimeout(() => {
        const panel = this.el.nativeElement.shadowRoot?.querySelector(
          '.pui-etbl-confirm',
        ) as HTMLElement | null;
        panel?.focus();
      });
      return;
    }
    this._doDelete(i);
  }

  confirmDeleteRow(): void {
    if (this._pendingDeleteIndex === null) return;
    this._doDelete(this._pendingDeleteIndex);
    this._pendingDeleteIndex = null;
    this._pendingDeleteRow = null;
    const toFocus = this._previouslyFocusedForDelete;
    this._previouslyFocusedForDelete = null;
    setTimeout(() => toFocus?.focus());
  }

  cancelDeleteRow(): void {
    this._pendingDeleteIndex = null;
    this._pendingDeleteRow = null;
    const toFocus = this._previouslyFocusedForDelete;
    this._previouslyFocusedForDelete = null;
    setTimeout(() => toFocus?.focus());
  }

  @HostListener('document:keydown.escape')
  onEscapeDelete(): void {
    if (this._pendingDeleteIndex !== null) this.cancelDeleteRow();
  }

  private _doDelete(i: number): void {
    const row = this._rows[i];
    this._rows = this._rows.filter((_, idx) => idx !== i);
    this.rowDelete.emit({ index: i, row });
    if (this._showToast) this.toast.success(this.deleteToastMessage);
    this._clampPage();
  }

  private _cancelEdit(): void {
    this.editingIndex = null;
    this.draft = {};
    this.fieldErrors = {};
  }

  private _computeFieldError(col: TableColumn, value: any): string | null {
    const v = value === null || value === undefined ? '' : String(value);
    if (col.required && !v.trim()) return col.validationMessage || `${col.label} is required`;
    if (col.minLength && v.length > 0 && v.length < col.minLength) {
      return col.validationMessage || `${col.label} must be at least ${col.minLength} characters`;
    }
    if (col.maxLength && v.length > col.maxLength) {
      return col.validationMessage || `${col.label} must be at most ${col.maxLength} characters`;
    }
    if (col.pattern && v && !new RegExp(col.pattern).test(v)) {
      return col.validationMessage || `${col.label} format is invalid`;
    }
    return null;
  }

  private _bool(v: boolean | string): boolean {
    return v === true || v === 'true' || (v as any) === '';
  }

  private _parse<T>(s: string): T | null {
    try {
      return JSON.parse(s) as T;
    } catch {
      return null;
    }
  }
}
