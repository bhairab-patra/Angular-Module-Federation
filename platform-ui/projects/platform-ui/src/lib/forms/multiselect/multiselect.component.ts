import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, inject,
  HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface MultiSelectOption {
  value: string | number;
  label: string;
  group?: string;
  disabled?: boolean;
}

@Component({
  selector: 'pui-lib-multiselect',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
})
export class PuiMultiSelectComponent {
  cdr = inject(ChangeDetectorRef);
  private el = inject(ElementRef);

  /* -- State -------------------------------- */
  open      = false;
  query     = '';
  selected: (string | number)[] = [];

  _options:       MultiSelectOption[] = [];
  _placeholder    = 'Select options�';
  _searchable     = true;
  _showSelectAll  = true;
  _maxChips       = 3;
  _disabled       = false;
  _error          = '';
  _hint           = '';

  /* -- Inputs ------------------------------- */
  @Input() set options(v: MultiSelectOption[] | string) {
    this._options = typeof v === 'string' ? (this._parse<MultiSelectOption[]>(v) ?? []) : (v || []);
    this.cdr.markForCheck();
  }
  @Input() set value(v: (string | number)[] | string) {
    this.selected = typeof v === 'string' ? (this._parse<(string|number)[]>(v) ?? []) : (v || []);
    this.cdr.markForCheck();
  }
  @Input() set placeholder(v: string)      { this._placeholder   = v; }
  @Input() set searchable(v: boolean | string)   { this._searchable   = this._bool(v); }
  @Input() set showSelectAll(v: boolean | string){ this._showSelectAll = this._bool(v); }
  @Input() set maxChips(v: number | string)      { this._maxChips     = Number(v) || 3; }
  @Input() set disabled(v: boolean | string)     { this._disabled     = this._bool(v); }
  @Input() set error(v: string)            { this._error = v; }
  @Input() set hint(v: string)             { this._hint  = v; }

  /* -- Outputs ------------------------------ */
  @Output() valueChange = new EventEmitter<(string | number)[]>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change      = new EventEmitter<(string | number)[]>();

  /* -- Click outside ------------------------ */
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.el.nativeElement.contains(e.target as Node)) {
      this.open = false;
      this.cdr.markForCheck();
    }
  }

  /* -- Computed ----------------------------- */
  get filteredOptions(): MultiSelectOption[] {
    if (!this.query.trim()) return this._options;
    const q = this.query.toLowerCase();
    return this._options.filter(o => o.label.toLowerCase().includes(q));
  }

  get groupedOptions(): { name: string; items: MultiSelectOption[] }[] {
    const opts = this.filteredOptions;
    const map = new Map<string, MultiSelectOption[]>();
    opts.forEach(o => {
      const g = o.group ?? '';
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(o);
    });
    return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
  }

  /* -- Actions ------------------------------ */
  toggle() { this.open = !this.open; this.cdr.markForCheck(); }

  toggle_option(opt: MultiSelectOption) {
    if (opt.disabled) return;
    const idx = this.selected.indexOf(opt.value);
    if (idx >= 0) this.selected = this.selected.filter(v => v !== opt.value);
    else          this.selected = [...this.selected, opt.value];
    this._emit();
    this.cdr.markForCheck();
  }

  deselect(v: string | number) {
    this.selected = this.selected.filter(s => s !== v);
    this._emit();
    this.cdr.markForCheck();
  }

  selectAll() {
    const enabledVals = this.filteredOptions.filter(o => !o.disabled).map(o => o.value);
    const combined = Array.from(new Set([...this.selected, ...enabledVals]));
    this.selected = combined;
    this._emit();
    this.cdr.markForCheck();
  }

  clearAll() {
    this.selected = [];
    this._emit();
    this.cdr.markForCheck();
  }

  apply() {
    this.open = false;
    this.cdr.markForCheck();
  }

  isSelected(v: string | number): boolean {
    return this.selected.includes(v);
  }

  labelOf(v: string | number): string {
    return this._options.find(o => o.value === v)?.label ?? String(v);
  }

  private _emit() {
    this.valueChange.emit(this.selected);
    this.change.emit(this.selected);
  }

  private _bool(v: boolean | string): boolean {
    return v === true || v === 'true' || (v as any) === '';
  }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
