import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, inject,
  HostListener, ElementRef
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface ComboboxOption {
  value: string | number;
  label: string;
  group?: string;
  description?: string;
  disabled?: boolean;
}

@Component({
  selector: 'pui-combobox',
  standalone: true,
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="pui-cb-host"
     [class.pui-cb--disabled]="_disabled"
     [class.pui-cb--open]="open"
     [class.pui-cb--error]="_error">

  <!-- ── Trigger input ──────────────────── -->
  <div class="pui-cb-field">
    <input
      #cbInput
      class="pui-cb-input"
      type="text"
      [value]="displayValue"
      [disabled]="_disabled || null"
      [placeholder]="_placeholder"
      [readonly]="!_searchable || null"
      (focus)="onFocus()"
      (input)="onInputChange($any($event.target).value)"
      (keydown)="onKey($event)"
      (click)="!_disabled && !open && openDropdown()"
      [attr.aria-expanded]="open"
      [attr.aria-haspopup]="'listbox'"
      role="combobox">

    <!-- Clear button -->
    <button *ngIf="_clearable && _value !== null && _value !== ''"
            class="pui-cb-clear"
            type="button"
            title="Clear"
            (click)="clear(); $event.stopPropagation()">
      <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
        <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round"/>
      </svg>
    </button>

    <!-- Chevron -->
    <button class="pui-cb-chevron" type="button"
            (click)="!_disabled && toggle()">
      <svg [class.pui-cb-chevron--up]="open"
           viewBox="0 0 16 16" fill="none" width="14" height="14">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>

  <!-- ── Dropdown ───────────────────────── -->
  <div *ngIf="open" class="pui-cb-dropdown" role="listbox">

    <!-- Free-text option when no match -->
    <ng-container *ngIf="_allowFreeText && query && filteredOptions.length === 0">
      <button class="pui-cb-option pui-cb-option--freetext"
              role="option"
              (click)="selectFreeText()">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round"/>
        </svg>
        Use "{{ query }}"
      </button>
    </ng-container>

    <!-- Empty state -->
    <ng-container *ngIf="!_allowFreeText && filteredOptions.length === 0">
      <div class="pui-cb-empty">No options found</div>
    </ng-container>

    <!-- Option groups -->
    <ng-container *ngFor="let group of groupedOptions">
      <div *ngIf="group.name" class="pui-cb-group-label">{{ group.name }}</div>

      <button *ngFor="let opt of group.items; let i = index"
              class="pui-cb-option"
              role="option"
              [class.pui-cb-option--active]="focusedIndex === globalIndex(group.name, i)"
              [class.pui-cb-option--selected]="opt.value === _value"
              [class.pui-cb-option--disabled]="opt.disabled"
              [disabled]="opt.disabled || null"
              [attr.aria-selected]="opt.value === _value"
              (mouseenter)="focusedIndex = globalIndex(group.name, i)"
              (click)="selectOption(opt)">

        <span class="pui-cb-option-body">
          <span class="pui-cb-option-label">{{ opt.label }}</span>
          <span *ngIf="opt.description" class="pui-cb-option-desc">{{ opt.description }}</span>
        </span>

        <svg *ngIf="opt.value === _value" class="pui-cb-check"
             viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path d="M3 8l4 4 6-6" stroke="#12C6A8" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </ng-container>

  </div>

  <!-- Error / hint -->
  <div *ngIf="_error" class="pui-cb-error-msg">{{ _error }}</div>
  <div *ngIf="_hint && !_error" class="pui-cb-hint">{{ _hint }}</div>

</div>
  `,
  styles: [`
    :host { display: block; position: relative; }

    .pui-cb-host {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      font-size: 13.5px; position: relative;
    }
    .pui-cb--disabled { opacity: .5; pointer-events: none; }

    /* ── Field ────────────────────────────── */
    .pui-cb-field {
      position: relative; display: flex; align-items: center;
    }
    .pui-cb-input {
      width: 100%; height: 42px; padding: 0 66px 0 13px;
      border: 1.5px solid #e5e7eb; border-radius: 10px;
      font-size: 13.5px; font-family: inherit; color: #111827;
      background: #fff; outline: none; cursor: pointer;
      transition: border-color .15s, box-shadow .15s;
      box-sizing: border-box;
    }
    .pui-cb-input::placeholder { color: #9ca3af; }
    .pui-cb-input[readonly]   { cursor: pointer; }
    .pui-cb-input:not([readonly]) { cursor: text; }
    .pui-cb-input:focus {
      border-color: #12C6A8;
      box-shadow: 0 0 0 3px rgba(18,198,168,.14);
    }
    .pui-cb--open .pui-cb-input {
      border-color: #12C6A8;
      box-shadow: 0 0 0 3px rgba(18,198,168,.14);
    }
    .pui-cb--error .pui-cb-input { border-color: #ef4444; }
    .pui-cb--error.pui-cb--open .pui-cb-input {
      box-shadow: 0 0 0 3px rgba(239,68,68,.14);
    }

    .pui-cb-clear, .pui-cb-chevron {
      position: absolute; right: 0; background: none; border: none;
      cursor: pointer; color: #9ca3af; display: flex; align-items: center;
      justify-content: center; height: 42px; padding: 0 8px;
      transition: color .1s;
    }
    .pui-cb-clear { right: 30px; }
    .pui-cb-clear:hover { color: #374151; }
    .pui-cb-chevron:hover { color: #374151; }

    .pui-cb-chevron svg { transition: transform .18s; }
    .pui-cb-chevron--up { transform: rotate(180deg); }

    /* ── Dropdown ─────────────────────────── */
    .pui-cb-dropdown {
      position: absolute; top: calc(100% + 5px); left: 0; right: 0;
      z-index: 1000; background: #fff;
      border: 1px solid #e5e7eb; border-radius: 12px;
      box-shadow: 0 8px 28px rgba(0,0,0,.11);
      overflow: hidden; max-height: 260px; overflow-y: auto;
      animation: pui-cb-in .15s ease;
    }
    @keyframes pui-cb-in {
      from { opacity: 0; transform: translateY(-5px) scale(.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .pui-cb-empty {
      padding: 14px; color: #9ca3af; font-size: 13px; text-align: center;
    }
    .pui-cb-group-label {
      padding: 6px 14px 3px;
      font-size: 10.5px; font-weight: 700; color: #9ca3af;
      text-transform: uppercase; letter-spacing: .06em;
    }

    /* Option */
    .pui-cb-option {
      display: flex; align-items: center; gap: 8px;
      width: 100%; padding: 9px 14px;
      background: none; border: none; cursor: pointer;
      font-size: 13.5px; font-family: inherit; color: #374151;
      text-align: left; transition: background .1s;
    }
    .pui-cb-option:hover:not(:disabled),
    .pui-cb-option--active:not(:disabled) { background: #f9fafb; }
    .pui-cb-option--selected { color: #111827; font-weight: 500; }
    .pui-cb-option--disabled { opacity: .4; cursor: not-allowed; }
    .pui-cb-option--freetext {
      color: #12C6A8; font-style: italic; gap: 6px;
    }

    .pui-cb-option-body { display: flex; flex-direction: column; gap: 1px; flex: 1; }
    .pui-cb-option-label { line-height: 1.3; }
    .pui-cb-option-desc  { font-size: 11.5px; color: #9ca3af; font-weight: 400; }

    .pui-cb-check { flex-shrink: 0; }

    /* Messages */
    .pui-cb-error-msg { font-size: 12px; color: #ef4444; margin-top: 4px; }
    .pui-cb-hint      { font-size: 12px; color: #9ca3af; margin-top: 4px; }
  `],
})
export class PuiComboboxComponent {
  cdr = inject(ChangeDetectorRef);
  private el = inject(ElementRef);

  /* ── State ──────────────────────────────── */
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

  /* ── Inputs ─────────────────────────────── */
  @Input() set options(v: ComboboxOption[] | string) {
    this._options = typeof v === 'string' ? (this._parse<ComboboxOption[]>(v) ?? []) : (v || []);
    this.cdr.markForCheck();
  }
  @Input() set value(v: string | number | null) {
    this._value = v;
    this.query  = this.labelFor(v) ?? '';
    this.cdr.markForCheck();
  }
  @Input() set placeholder(v: string)            { this._placeholder   = v; }
  @Input() set searchable(v: boolean | string)   { this._searchable    = this._bool(v); }
  @Input() set clearable(v: boolean | string)    { this._clearable     = this._bool(v); }
  @Input() set allowFreeText(v: boolean | string){ this._allowFreeText = this._bool(v); }
  @Input() set disabled(v: boolean | string)     { this._disabled      = this._bool(v); }
  @Input() set error(v: string)                  { this._error = v; }
  @Input() set hint(v: string)                   { this._hint  = v; }

  /* ── Outputs ────────────────────────────── */
  @Output() valueChange = new EventEmitter<string | number | null>();
  @Output() change      = new EventEmitter<string | number | null>();

  /* ── Click outside ──────────────────────── */
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.el.nativeElement.contains(e.target as Node)) {
      this.close();
    }
  }

  /* ── Computed ───────────────────────────── */
  get displayValue(): string {
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

  /* ── Handlers ───────────────────────────── */
  onFocus() {
    if (!this._disabled) this.openDropdown();
  }

  onInputChange(v: string) {
    this.query = v;
    this._value = null;
    this.open = true;
    this.focusedIndex = -1;
    this.cdr.markForCheck();
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
    this.cdr.markForCheck();
  }

  openDropdown() {
    this.open = true;
    if (this._searchable) this.query = '';
    this.focusedIndex = -1;
    this.cdr.markForCheck();
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
    this.valueChange.emit(opt.value);
    this.change.emit(opt.value);
    this.cdr.markForCheck();
  }

  selectFreeText() {
    this._value = this.query;
    this.open   = false;
    this.valueChange.emit(this.query);
    this.change.emit(this.query);
    this.cdr.markForCheck();
  }

  clear() {
    this._value = null;
    this.query  = '';
    this.open   = false;
    this.valueChange.emit(null);
    this.change.emit(null);
    this.cdr.markForCheck();
  }

  close() {
    this.open = false;
    if (this._value === null && !this._allowFreeText) this.query = '';
    else if (this._value !== null) this.query = this.labelFor(this._value) ?? this.query;
    this.cdr.markForCheck();
  }

  private _bool(v: boolean | string): boolean {
    return v === true || v === 'true' || (v as any) === '';
  }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
