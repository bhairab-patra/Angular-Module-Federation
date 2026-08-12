import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ChangeDetectorRef, OnChanges, SimpleChanges, inject, ViewEncapsulation
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableColumn } from '../table/table.component';

export interface EditableRowSaveEvent { index: number; row: any; oldRow: any; }
export interface EditableRowEvent { index: number; row: any; }

@Component({
  selector: 'pui-lib-editable-table',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
})
export class PuiEditableTableComponent implements OnChanges {
  private cdr = inject(ChangeDetectorRef);

  /* ── Columns ─────────────────────────── */
  _columns: TableColumn[] = [];
  @Input() set columns(v: TableColumn[] | string) {
    this._columns = typeof v === 'string' ? (this._parse<TableColumn[]>(v) ?? []) : (v || []);
  }
  get columns() { return this._columns; }

  /* ── Data ────────────────────────────── */
  _rows: any[] = [];
  @Input() set data(v: any[] | string) {
    this._rows = typeof v === 'string' ? (this._parse<any[]>(v) ?? []) : ([...(v || [])]);
    if (this.editingIndex !== null && this.editingIndex >= this._rows.length) {
      this._cancelEdit();
    }
  }
  get data() { return this._rows; }

  /* ── Options ─────────────────────────── */
  _maxHeight = 480;
  @Input() set maxHeight(v: number | string) { this._maxHeight = Number(v) || 480; }

  _loading = false;
  @Input() set loading(v: boolean | string) {
    this._loading = v === true || v === 'true' || (v as any) === '';
  }

  _confirmDelete = false;
  @Input() set confirmDelete(v: boolean | string) {
    this._confirmDelete = v === true || v === 'true' || (v as any) === '';
  }

  /* ── Outputs ─────────────────────────── */
  @Output() rowSave = new EventEmitter<EditableRowSaveEvent>();
  @Output() rowDelete = new EventEmitter<EditableRowEvent>();
  @Output() rowEdit = new EventEmitter<EditableRowEvent>();

  /* ── Edit state ──────────────────────── */
  editingIndex: number | null = null;
  draft: Record<string, any> = {};

  /* ── Pending delete state ────────────── */
  _pendingDeleteIndex: number | null = null;
  _pendingDeleteRow: any = null;

  skeletonRows = Array(5).fill(null);

  ngOnChanges(_: SimpleChanges) { this.cdr.markForCheck(); }

  startEdit(i: number): void {
    if (this.editingIndex !== null) return;
    this.editingIndex = i;
    this.draft = { ...this._rows[i] };
    this.rowEdit.emit({ index: i, row: this._rows[i] });
    this.cdr.markForCheck();
  }

  saveEdit(): void {
    if (this.editingIndex === null) return;
    const idx = this.editingIndex;
    const oldRow = this._rows[idx];
    const newRow = { ...oldRow, ...this.draft };
    this._rows = this._rows.map((r, _i) => _i === idx ? newRow : r);
    this.rowSave.emit({ index: idx, row: newRow, oldRow });
    this._cancelEdit();
  }

  cancelEdit(): void { this._cancelEdit(); }

  deleteRow(i: number): void {
    if (this.editingIndex !== null) return;
    if (this._confirmDelete) {
      this._pendingDeleteIndex = i;
      this._pendingDeleteRow = this._rows[i];
      this.cdr.markForCheck();
      return;
    }
    this._doDelete(i);
  }

  confirmDeleteRow(): void {
    if (this._pendingDeleteIndex === null) return;
    this._doDelete(this._pendingDeleteIndex);
    this._pendingDeleteIndex = null;
    this._pendingDeleteRow = null;
  }

  cancelDeleteRow(): void {
    this._pendingDeleteIndex = null;
    this._pendingDeleteRow = null;
    this.cdr.markForCheck();
  }

  private _doDelete(i: number): void {
    const row = this._rows[i];
    this._rows = this._rows.filter((_, idx) => idx !== i);
    this.rowDelete.emit({ index: i, row });
    this.cdr.markForCheck();
  }

  private _cancelEdit(): void {
    this.editingIndex = null;
    this.draft = {};
    this.cdr.markForCheck();
  }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
