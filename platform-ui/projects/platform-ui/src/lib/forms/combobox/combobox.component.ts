import {
  Component, Input, Output, EventEmitter,
  inject, ViewChild, ElementRef,
  HostListener, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface ComboboxOption {
  value: string | number;
  label: string;
  group?: string;
  description?: string;
  disabled?: boolean;
}

@Component({
  selector: 'pui-lib-combobox',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
})
export class PuiComboboxComponent {
  private host = inject(ElementRef);

  @ViewChild('cbInput') cbInput?: ElementRef<HTMLInputElement>;

  /* -- State -------------------------------- */
  open         = false;
  query        = '';
  focusedIndex = -1;

  _options:      ComboboxOption[] = [];
  _value:        string | number | null = null;
  _placeholder   = 'Select or search…';
  _searchable    = true;
  _clearable     = true;
  _allowFreeText = false;
  _disabled      = false;
  _error         = '';
  _hint          = '';

  /* -- Inputs ------------------------------- */
  @Input() set options(v: ComboboxOption[] | string) {
    this._options = typeof v === 'string' ? (this._parse<ComboboxOption[]>(v) ?? []) : (v || []);
  }
  @Input() set value(v: string | number | null) {
    this._value = v;
    const lbl = this.labelFor(v) ?? '';
    this.query  = lbl;
    this._setInput(lbl);
  }
  @Input() set placeholder(v: string)            { this._placeholder   = v; }
  @Input() set searchable(v: boolean | string)   { this._searchable    = this._bool(v); }
  @Input() set clearable(v: boolean | string)    { this._clearable     = this._bool(v); }
  @Input() set allowFreeText(v: boolean | string){ this._allowFreeText = this._bool(v); }
  @Input() set disabled(v: boolean | string)     { this._disabled      = this._bool(v); }
  @Input() set error(v: string)                  { this._error = v; }
  @Input() set hint(v: string)                   { this._hint  = v; }

  /* -- Outputs ------------------------------ */
  @Output() valueChange = new EventEmitter<string | number | null>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change      = new EventEmitter<string | number | null>();

  /* -- Click outside ------------------------ */
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (this.open && !this.host.nativeElement.contains(e.target as Node)) {
      this.close();
    }
  }

  /* -- Computed ----------------------------- */
  get inputDisplay(): string {
    if (this.open && this._searchable) return this.query;
    return this.labelFor(this._value) ?? this.query;
  }

  get filteredOptions(): ComboboxOption[] {
    if (!this.query.trim() || !this._searchable) return this._options;
    const q = this.query.toLowerCase();
    return this._options.filter(o =>
      o.label.toLowerCase().includes(q) ||
      (o.description?.toLowerCase().includes(q))
    );
  }

  get groupedOptions(): { name: string; items: ComboboxOption[] }[] {
    const opts = this.filteredOptions;
    const map  = new Map<string, ComboboxOption[]>();
    opts.forEach(o => {
      const g = o.group ?? '';
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(o);
    });
    return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
  }

  globalIndex(groupName: string, localIndex: number): number {
    let idx = 0;
    for (const g of this.groupedOptions) {
      if (g.name === groupName) return idx + localIndex;
      idx += g.items.length;
    }
    return -1;
  }

  labelFor(v: string | number | null): string | null {
    if (v === null || v === undefined) return null;
    return this._options.find(o => o.value === v)?.label ?? null;
  }

  /* -- Handlers ----------------------------- */
  onFocus() {
    if (!this._disabled && !this.open) this.openDropdown();
  }

  onInputChange(v: string) {
    this.query = v;
    this._value = null;
    this.open = true;
    this.focusedIndex = -1;
  }

  onKey(e: KeyboardEvent) {
    const opts = this.filteredOptions;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.open = true;
      this.focusedIndex = Math.min(this.focusedIndex + 1, opts.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.focusedIndex >= 0 && opts[this.focusedIndex]) {
        this.selectOption(opts[this.focusedIndex]);
      } else if (this._allowFreeText && this.query) {
        this.selectFreeText();
      }
    } else if (e.key === 'Escape') {
      this.close();
    }
  }

  openDropdown() {
    this.open = true;
    if (this._searchable) {
      this.query = '';
      this._setInput('');
    }
    this.focusedIndex = -1;
  }

  toggle() {
    if (this.open) this.close();
    else this.openDropdown();
  }

  selectOption(opt: ComboboxOption) {
    if (opt.disabled) return;
    this._value = opt.value;
    this.query  = opt.label;
    this.open   = false;
    this.focusedIndex = -1;
    this._setInput(opt.label);   // immediate DOM update — no CD cycle needed
    this.valueChange.emit(opt.value);
    this.change.emit(opt.value);
  }

  selectFreeText() {
    this._value = this.query;
    this.open   = false;
    this._setInput(this.query);
    this.valueChange.emit(this.query);
    this.change.emit(this.query);
  }

  clear() {
    this._value = null;
    this.query  = '';
    this.open   = false;
    this._setInput('');
    this.valueChange.emit(null);
    this.change.emit(null);
  }

  close() {
    this.open = false;
    if (this._value === null && !this._allowFreeText) {
      this.query = '';
      this._setInput('');
    } else if (this._value !== null) {
      const lbl = this.labelFor(this._value) ?? this.query;
      this.query = lbl;
      this._setInput(lbl);
    }
  }

  /** Write directly to the native input — bypasses Angular CD timing issues. */
  private _setInput(val: string) {
    if (this.cbInput) {
      this.cbInput.nativeElement.value = val;
    }
  }

  private _bool(v: boolean | string): boolean {
    return v === true || v === 'true' || (v as any) === '';
  }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
