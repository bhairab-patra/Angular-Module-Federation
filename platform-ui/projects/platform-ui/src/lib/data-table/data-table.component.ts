import {
  Component, Input, Output, EventEmitter, NgZone, ElementRef, AfterViewInit,
  OnDestroy, inject, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { NgFor, NgIf, DecimalPipe, DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TableColumn, TableAction, SortState } from '../models/table.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';
import { PuiSearchInternalComponent } from '../search/search-internal.component';
import { PuiSimplePaginationInternalComponent } from '../simple-pagination/simple-pagination-internal.component';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { IconButtonInternalComponent } from '../icon-button/icon-button-internal.component';


export { TableColumn, TableAction, SortDir, SortState } from '../models/table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-data-table',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe, DatePipe, PuiSearchInternalComponent, PuiSimplePaginationInternalComponent, IconInternalComponent, IconButtonInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class PuiDataTableComponent implements AfterViewInit, OnDestroy {
  private zone = inject(NgZone);
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
    this.page = 1;
    this.selectedRows.clear();
  }
  get data() { return this._data; }

  _sortable = false;
  _searchable = false;
  _paginated = false;
  _stickyHeader = false;
  _striped = false;
  _selectable = false;
  _loading = false;

  @Input() set sortable(v: boolean | string) { this._sortable = this._bool(v); }
  @Input() set searchable(v: boolean | string) { this._searchable = this._bool(v); }
  @Input() set paginated(v: boolean | string) { this._paginated = this._bool(v); }
  @Input() set stickyHeader(v: boolean | string) { this._stickyHeader = this._bool(v); }
  @Input() set striped(v: boolean | string) { this._striped = this._bool(v); }
  @Input() set selectable(v: boolean | string) { this._selectable = this._bool(v); }
  @Input() set loading(v: boolean | string) { this._loading = this._bool(v); }

  /** Optional title shown on the left of the table toolbar (e.g. "Account Summary"). */
  @Input() heading = '';

  /** Optional icon name shown in a square icon-button before the heading.
   * Omit it and no icon renders — the title looks exactly as before. */
  @Input() headingIcon = '';

  /** Optional overrides for the built-in empty state (shown when there's no active search term). */
  @Input() emptyTitle = '';
  @Input() emptyDescription = '';

  _pageSize = 10;
  _maxHeight = 0;

  @Input() set pageSize(v: number | string) { this._pageSize = Number(v) || 10; this.page = 1; }
  @Input() set maxHeight(v: number | string) { this._maxHeight = Number(v) || 0; }

  _actions: TableAction[] = [];
  @Input() set actions(v: TableAction[] | string) {
    this._actions = typeof v === 'string' ? (this._parse<TableAction[]>(v) ?? []) : (v || []);
  }
  get actions() { return this._actions; }

  _tooltipPos: 'top' | 'bottom' | 'left' | 'right' = 'right';
  @Input() set tooltipPosition(v: 'top' | 'bottom' | 'left' | 'right') {
    this._tooltipPos = v || 'right';
  }

  cellTooltipVisible = false;
  hoveredCellText = '';
  cellTooltipCoords = { top: 0, left: 0 };

  @Output() sortChange = new EventEmitter<SortState>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() actionClick = new EventEmitter<{ action: TableAction; row: any }>();

  sort: SortState = { key: '', dir: '' };
  openActionRow: number | null = null;
  openActionRowData: any = null;
  actionMenuPos = { top: 0, left: 0 };
  private _closeMenuListener: (() => void) | null = null;
  private _closeMenuScrollListener: (() => void) | null = null;
  pageSizeMenuOpen = false;
  private _closePageSizeListener: (() => void) | null = null;
  searchTerm = '';
  page = 1;
  pageSizeOptions = [5, 10, 20, 50, 100];
  selectedRows = new Set<string>();
  skeletonRows = Array(5).fill(null);
  rowClickEnabled = false;

  /** Varied bar widths per column so skeleton rows read as realistic
   * content placeholders instead of a uniform grid of equal-width bars. */
  private readonly skeletonWidths = ['70%', '45%', '60%', '80%', '50%'];
  skeletonCellWidth(colIndex: number): string {
    return this.skeletonWidths[colIndex % this.skeletonWidths.length];
  }

  get filteredRows(): any[] {
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

  get displayRows(): any[] {
    const rows = this.filteredRows;
    if (!this._paginated) return rows;
    const start = (this.page - 1) * this._pageSize;
    return rows.slice(start, start + this._pageSize);
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.filteredRows.length / this._pageSize)); }
  get rangeStart(): number { return this.filteredRows.length === 0 ? 0 : (this.page - 1) * this._pageSize + 1; }
  get rangeEnd(): number { return Math.min(this.page * this._pageSize, this.filteredRows.length); }

  get pageNumbers(): number[] {
    const total = this.totalPages; const cur = this.page; const delta = 2;
    const pages: number[] = [];
    for (let i = Math.max(1, cur - delta); i <= Math.min(total, cur + delta); i++) pages.push(i);
    return pages;
  }

  get allSelected(): boolean {
    return this.displayRows.length > 0 &&
      this.displayRows.every((r, i) => this.selectedRows.has(this.getRowId(r, i)));
  }
  get someSelected(): boolean {
    return this.displayRows.some((r, i) => this.selectedRows.has(this.getRowId(r, i)));
  }

  ngOnDestroy(): void { this._detachCloseListener(); this._closePageSizeMenu(); }

  onSort(key: string): void {
    if (this.sort.key === key) {
      this.sort = { key, dir: this.sort.dir === 'asc' ? 'desc' : this.sort.dir === 'desc' ? '' : 'asc' };
    } else {
      this.sort = { key, dir: 'asc' };
    }
    if (!this.sort.dir) this.sort = { key: '', dir: '' };
    this.page = 1;
    this.sortChange.emit(this.sort);
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.page = 1;
    this.searchChange.emit(term);
  }

  goPage(p: number): void {
    this.page = Math.max(1, Math.min(p, this.totalPages));
    this.pageChange.emit(this.page);
  }

  onPageSizeChange(val: string): void {
    this._pageSize = Number(val) || 10;
    this.page = 1;
  }

  togglePageSizeMenu(event: Event): void {
    event.stopPropagation();
    if (this.pageSizeMenuOpen) { this._closePageSizeMenu(); return; }
    this.pageSizeMenuOpen = true;
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this._closePageSizeListener = () => this.zone.run(() => this._closePageSizeMenu());
        document.addEventListener('click', this._closePageSizeListener, { once: true });
      });
    });
  }

  selectPageSize(size: number, event: Event): void {
    event.stopPropagation();
    this.onPageSizeChange(String(size));
    this._closePageSizeMenu();
  }

  private _closePageSizeMenu(): void {
    this.pageSizeMenuOpen = false;
    if (this._closePageSizeListener) {
      document.removeEventListener('click', this._closePageSizeListener);
      this._closePageSizeListener = null;
    }
  }

  onRowClick(row: any): void { this.rowClick.emit(row); }

  getRowId(row: any, i: number): string {
    return row['id'] !== null && row['id'] !== undefined ? String(row['id']) : String(i);
  }

  toggleRow(row: any, i: number): void {
    const id = this.getRowId(row, i);
    if (this.selectedRows.has(id)) { this.selectedRows.delete(id); }
    else { this.selectedRows.add(id); }
    this._emitSelection();
  }

  toggleAll(checked: boolean): void {
    this.displayRows.forEach((r, i) => {
      const id = this.getRowId(r, i);
      if (checked) { this.selectedRows.add(id); } else { this.selectedRows.delete(id); }
    });
    this._emitSelection();
  }

  /** Positioned as position: fixed with raw viewport coordinates (not
   * relative to the host) so the menu can never be clipped by an ancestor's
   * overflow:hidden / max-height scroll region, and never gets clamped into
   * the wrong spot (previously: flipping upward near the top of a short
   * table could compute a negative top that got clamped to 0, pinning the
   * menu over the table header instead of near the clicked row). */
  toggleActionMenu(rowIndex: number, event: Event): void {
    event.stopPropagation();
    if (this.openActionRow === rowIndex) { this._closeMenu(); return; }
    const btn = event.currentTarget as HTMLElement;
    const btnRect = btn.getBoundingClientRect();
    const menuW = 200;
    const menuH = this._actions.length * 40 + 12;
    const spaceBelow = window.innerHeight - btnRect.bottom;
    const spaceAbove = btnRect.top;
    const openUp = spaceBelow < menuH + 8 && spaceAbove > spaceBelow;
    const top = openUp ? btnRect.top - menuH - 8 : btnRect.bottom + 8;
    const left = Math.min(btnRect.right - menuW, window.innerWidth - menuW - 8);
    this.actionMenuPos = { top: Math.max(8, top), left: Math.max(8, left) };
    this.openActionRow = rowIndex;
    this.openActionRowData = this.displayRows[rowIndex];
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this._closeMenuListener = () => this.zone.run(() => this._closeMenu());
        document.addEventListener('click', this._closeMenuListener, { once: true });
        // Position is computed once at open time; rather than tracking every
        // scrollable ancestor to keep it glued to the trigger, just close it
        // on the first scroll (capture:true so this also fires for the
        // table's own internal .pui-dt-scroll, not just window/page scroll).
        // Clicking the trigger again reopens it at the correct new position.
        this._closeMenuScrollListener = () => this.zone.run(() => this._closeMenu());
        window.addEventListener('scroll', this._closeMenuScrollListener, { capture: true, once: true });
      });
    });
  }

  onActionClick(action: TableAction, row: any, event: Event): void {
    event.stopPropagation();
    this.openActionRow = null;
    action.action(row);
    this.actionClick.emit({ action, row });
  }

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


  ngAfterViewInit(): void { }

  hideCellTooltip(): void { this.cellTooltipVisible = false; }

  private _closeMenu(): void {
    this.openActionRow = null; this.openActionRowData = null;
    this._detachCloseListener();
  }

  private _detachCloseListener(): void {
    if (this._closeMenuListener) {
      document.removeEventListener('click', this._closeMenuListener);
      this._closeMenuListener = null;
    }
    if (this._closeMenuScrollListener) {
      window.removeEventListener('scroll', this._closeMenuScrollListener, true);
      this._closeMenuScrollListener = null;
    }
  }

  private _emitSelection(): void {
    const selected = this._data.filter((r, i) => this.selectedRows.has(this.getRowId(r, i)));
    this.selectionChange.emit(selected);
  }

  private _bool(v: boolean | string): boolean {
    return v === true || v === 'true' || (v as any) === '';
  }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
