import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, inject,
  HostListener, ElementRef
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface MultiSelectOption {
  value: string | number;
  label: string;
  group?: string;
  disabled?: boolean;
}

@Component({
  selector: 'pui-multiselect',
  standalone: true,
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="pui-ms-host"
     [class.pui-ms--disabled]="_disabled"
     [class.pui-ms--open]="open"
     [class.pui-ms--error]="_error">

  <!-- ── Trigger ─────────────────────────────── -->
  <div class="pui-ms-trigger" (click)="!_disabled && toggle()">

    <!-- Chips / placeholder -->
    <div class="pui-ms-values">
      <ng-container *ngIf="selected.length === 0">
        <span class="pui-ms-placeholder">{{ _placeholder }}</span>
      </ng-container>

      <ng-container *ngIf="selected.length > 0 && selected.length <= _maxChips">
        <span *ngFor="let v of selected" class="pui-ms-chip">
          {{ labelOf(v) }}
          <button class="pui-ms-chip-rm"
                  (click)="$event.stopPropagation(); deselect(v)"
                  [attr.aria-label]="'Remove ' + labelOf(v)">✕</button>
        </span>
      </ng-container>

      <ng-container *ngIf="selected.length > _maxChips">
        <span class="pui-ms-chip pui-ms-chip--count">
          {{ selected.length }} selected
          <button class="pui-ms-chip-rm"
                  (click)="$event.stopPropagation(); clearAll()"
                  aria-label="Clear all">✕</button>
        </span>
      </ng-container>
    </div>

    <span class="pui-ms-count" *ngIf="selected.length > 0 && selected.length <= _maxChips">
      {{ selected.length }}/{{ _options.length }}
    </span>

    <svg class="pui-ms-chevron" [class.pui-ms-chevron--up]="open"
         viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

  <!-- ── Dropdown ─────────────────────────────── -->
  <div *ngIf="open" class="pui-ms-dropdown" (click)="$event.stopPropagation()">

    <!-- Search -->
    <div class="pui-ms-search-wrap" *ngIf="_searchable">
      <svg class="pui-ms-search-icon" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <input #searchInput
             class="pui-ms-search"
             type="text"
             placeholder="Search…"
             [value]="query"
             (input)="query = $any($event.target).value; cdr.markForCheck()"
             (click)="$event.stopPropagation()">
      <button *ngIf="query" class="pui-ms-search-clear"
              (click)="query=''; cdr.markForCheck()">✕</button>
    </div>

    <!-- Select all / Clear all -->
    <div class="pui-ms-actions" *ngIf="_showSelectAll && filteredOptions.length > 0">
      <button class="pui-ms-action-btn" (click)="selectAll()">Select all</button>
      <span class="pui-ms-action-sep">·</span>
      <button class="pui-ms-action-btn" (click)="clearAll()">Clear</button>
    </div>

    <!-- Options list -->
    <div class="pui-ms-list" role="listbox" [attr.aria-multiselectable]="true">
      <ng-container *ngIf="filteredOptions.length === 0">
        <div class="pui-ms-empty">No options found</div>
      </ng-container>

      <ng-container *ngFor="let group of groupedOptions">

        <!-- Group label -->
        <div *ngIf="group.name" class="pui-ms-group-label">{{ group.name }}</div>

        <button *ngFor="let opt of group.items"
                class="pui-ms-option"
                role="option"
                [class.pui-ms-option--selected]="isSelected(opt.value)"
                [class.pui-ms-option--disabled]="opt.disabled"
                [disabled]="opt.disabled || null"
                [attr.aria-selected]="isSelected(opt.value)"
                (click)="toggle_option(opt)">

          <!-- Checkbox -->
          <span class="pui-ms-checkbox" [class.pui-ms-checkbox--checked]="isSelected(opt.value)">
            <svg *ngIf="isSelected(opt.value)" viewBox="0 0 12 12" fill="none" width="10" height="10">
              <path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>

          <span class="pui-ms-option-label">{{ opt.label }}</span>
        </button>

      </ng-container>
    </div>

    <!-- Footer -->
    <div class="pui-ms-footer" *ngIf="selected.length > 0">
      <span class="pui-ms-footer-count">{{ selected.length }} selected</span>
      <button class="pui-ms-apply-btn" (click)="apply()">Apply</button>
    </div>
  </div>

  <!-- Error / hint -->
  <div *ngIf="_error" class="pui-ms-error-msg">{{ _error }}</div>
  <div *ngIf="_hint && !_error" class="pui-ms-hint">{{ _hint }}</div>

</div>
  `,
  styles: [`
    :host { display: block; position: relative; }

    .pui-ms-host {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      font-size: 13.5px;
      position: relative;
    }
    .pui-ms--disabled { opacity: .5; pointer-events: none; }

    /* ── Trigger ─────────────────────────── */
    .pui-ms-trigger {
      display: flex; align-items: center; gap: 6px;
      min-height: 42px; padding: 6px 12px;
      border: 1.5px solid #e5e7eb; border-radius: 10px;
      background: #fff; cursor: pointer;
      transition: border-color .15s, box-shadow .15s;
      flex-wrap: wrap;
    }
    .pui-ms-trigger:hover { border-color: #12C6A8; }
    .pui-ms--open .pui-ms-trigger {
      border-color: #12C6A8;
      box-shadow: 0 0 0 3px rgba(18,198,168,.14);
    }
    .pui-ms--error .pui-ms-trigger { border-color: #ef4444; }
    .pui-ms--error.pui-ms--open .pui-ms-trigger {
      box-shadow: 0 0 0 3px rgba(239,68,68,.14);
    }

    .pui-ms-values { display: flex; flex-wrap: wrap; gap: 4px; flex: 1; align-items: center; }
    .pui-ms-placeholder { color: #9ca3af; font-size: 13.5px; }

    /* Chips */
    .pui-ms-chip {
      display: inline-flex; align-items: center; gap: 4px;
      background: #f0fdfb; border: 1px solid #12C6A8;
      color: #0d9e87; border-radius: 6px;
      padding: 2px 6px; font-size: 12px; font-weight: 500;
    }
    .pui-ms-chip--count { background: #f3f4f6; border-color: #d1d5db; color: #374151; }
    .pui-ms-chip-rm {
      background: none; border: none; cursor: pointer;
      font-size: 10px; color: inherit; padding: 0; line-height: 1;
      display: flex; align-items: center;
    }
    .pui-ms-chip-rm:hover { opacity: .7; }

    .pui-ms-count { font-size: 11px; color: #9ca3af; flex-shrink: 0; }

    .pui-ms-chevron { color: #9ca3af; flex-shrink: 0; transition: transform .18s; }
    .pui-ms-chevron--up { transform: rotate(180deg); }

    /* ── Dropdown ───────────────────────── */
    .pui-ms-dropdown {
      position: absolute; top: calc(100% + 5px); left: 0; right: 0;
      z-index: 1000; background: #fff;
      border: 1px solid #e5e7eb; border-radius: 12px;
      box-shadow: 0 8px 28px rgba(0,0,0,.11);
      overflow: hidden;
      animation: pui-ms-in .15s ease;
    }
    @keyframes pui-ms-in {
      from { opacity: 0; transform: translateY(-5px) scale(.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* Search */
    .pui-ms-search-wrap {
      position: relative; padding: 10px 10px 6px;
      border-bottom: 1px solid #f3f4f6;
    }
    .pui-ms-search-icon {
      position: absolute; left: 18px; top: 50%; transform: translateY(-2px);
      width: 14px; height: 14px; color: #9ca3af; pointer-events: none;
    }
    .pui-ms-search {
      width: 100%; padding: 7px 28px 7px 32px;
      border: 1px solid #e5e7eb; border-radius: 8px;
      font-size: 13px; font-family: inherit; background: #f9fafb;
      color: #111827; outline: none; box-sizing: border-box;
      transition: border-color .15s;
    }
    .pui-ms-search:focus { border-color: #12C6A8; background: #fff; }
    .pui-ms-search-clear {
      position: absolute; right: 18px; top: 50%; transform: translateY(-2px);
      background: none; border: none; cursor: pointer;
      font-size: 11px; color: #9ca3af;
    }

    /* Actions */
    .pui-ms-actions {
      display: flex; align-items: center; gap: 8px;
      padding: 6px 12px; border-bottom: 1px solid #f3f4f6;
    }
    .pui-ms-action-btn {
      background: none; border: none; cursor: pointer;
      font-size: 12px; color: #0d9e87; font-family: inherit;
      padding: 0; font-weight: 500;
    }
    .pui-ms-action-btn:hover { text-decoration: underline; }
    .pui-ms-action-sep { color: #d1d5db; }

    /* List */
    .pui-ms-list { max-height: 220px; overflow-y: auto; padding: 4px 0; }
    .pui-ms-empty { padding: 14px 14px; color: #9ca3af; font-size: 13px; text-align: center; }
    .pui-ms-group-label {
      padding: 6px 14px 3px;
      font-size: 10.5px; font-weight: 700; color: #9ca3af;
      text-transform: uppercase; letter-spacing: .06em;
    }

    /* Option */
    .pui-ms-option {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 8px 14px;
      background: none; border: none; cursor: pointer;
      font-size: 13.5px; font-family: inherit; color: #374151;
      text-align: left; transition: background .1s;
    }
    .pui-ms-option:hover:not(:disabled) { background: #f9fafb; }
    .pui-ms-option--selected { color: #111827; font-weight: 500; }
    .pui-ms-option--disabled { opacity: .4; cursor: not-allowed; }

    /* Checkbox */
    .pui-ms-checkbox {
      width: 16px; height: 16px; flex-shrink: 0;
      border: 1.5px solid #d1d5db; border-radius: 4px;
      background: #fff; display: flex; align-items: center; justify-content: center;
      transition: background .12s, border-color .12s;
    }
    .pui-ms-checkbox--checked {
      background: #12C6A8; border-color: #12C6A8;
    }
    .pui-ms-option-label { flex: 1; }

    /* Footer */
    .pui-ms-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 12px; border-top: 1px solid #f3f4f6;
      background: #fafafa;
    }
    .pui-ms-footer-count { font-size: 12px; color: #6b7280; }
    .pui-ms-apply-btn {
      padding: 5px 16px; border-radius: 7px;
      background: #12C6A8; color: #fff;
      border: none; cursor: pointer; font-size: 12.5px; font-family: inherit;
      font-weight: 600; transition: background .12s;
    }
    .pui-ms-apply-btn:hover { background: #0d9e87; }

    /* Messages */
    .pui-ms-error-msg { font-size: 12px; color: #ef4444; margin-top: 4px; }
    .pui-ms-hint      { font-size: 12px; color: #9ca3af; margin-top: 4px; }
  `],
})
export class PuiMultiSelectComponent {
  cdr = inject(ChangeDetectorRef);
  private el = inject(ElementRef);

  /* ── State ──────────────────────────────── */
  open      = false;
  query     = '';
  selected: (string | number)[] = [];

  _options:       MultiSelectOption[] = [];
  _placeholder    = 'Select options…';
  _searchable     = true;
  _showSelectAll  = true;
  _maxChips       = 3;
  _disabled       = false;
  _error          = '';
  _hint           = '';

  /* ── Inputs ─────────────────────────────── */
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

  /* ── Outputs ────────────────────────────── */
  @Output() valueChange = new EventEmitter<(string | number)[]>();
  @Output() change      = new EventEmitter<(string | number)[]>();

  /* ── Click outside ──────────────────────── */
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.el.nativeElement.contains(e.target as Node)) {
      this.open = false;
      this.cdr.markForCheck();
    }
  }

  /* ── Computed ───────────────────────────── */
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

  /* ── Actions ────────────────────────────── */
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
