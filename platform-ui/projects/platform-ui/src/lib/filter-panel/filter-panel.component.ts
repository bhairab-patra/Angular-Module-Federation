import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgIf, NgFor, KeyValuePipe } from '@angular/common';
import { FilterDef, FilterValues, ActiveFilter } from '../models/filter.model';

@Component({
  selector: 'pui-filter-panel',
  standalone: true,
  imports: [NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pui-fp" [class.pui-fp--inline]="inline">

      <!-- Header -->
      <div class="pui-fp__head">
        <div class="pui-fp__title-row">
          <span class="pui-fp__title">{{ title }}</span>
          <span *ngIf="activeCount > 0" class="pui-fp__badge">{{ activeCount }}</span>
        </div>
        <button *ngIf="activeCount > 0" class="pui-fp__clear-all" (click)="clearAll()">Clear all</button>
      </div>

      <!-- Active filter chips -->
      <div *ngIf="activeFilters.length" class="pui-fp__chips">
        <button *ngFor="let chip of activeFilters"
                class="pui-fp__chip"
                (click)="removeChip(chip)">
          <span>{{ chip.filterLabel }}: {{ chip.valueLabel }}</span>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Filter groups -->
      <div class="pui-fp__groups">
        <div *ngFor="let f of filters" class="pui-fp__group"
             [class.pui-fp__group--collapsed]="collapsed[f.id]">

          <!-- Group header -->
          <button class="pui-fp__group-head" (click)="toggleGroup(f.id)">
            <span class="pui-fp__group-label">{{ f.label }}</span>
            <span *ngIf="getGroupCount(f) > 0" class="pui-fp__group-count">{{ getGroupCount(f) }}</span>
            <svg class="pui-fp__chevron" [class.pui-fp__chevron--open]="!collapsed[f.id]"
                 width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Group body -->
          <div class="pui-fp__group-body">

            <!-- CHECKBOX -->
            <div *ngIf="f.type === 'checkbox'" class="pui-fp__opts">
              <label *ngFor="let opt of f.options" class="pui-fp__cb-row"
                     [class.pui-fp__cb-row--checked]="isChecked(f.id, opt.value)">
                <span class="pui-fp__cb-box"
                      [class.pui-fp__cb-box--checked]="isChecked(f.id, opt.value)">
                  <input type="checkbox" class="pui-fp__native"
                         [checked]="isChecked(f.id, opt.value)"
                         (change)="onCheckbox(f, opt.value, $any($event.target).checked)"/>
                  <svg *ngIf="isChecked(f.id, opt.value)" width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="pui-fp__opt-label">{{ opt.label }}</span>
                <span *ngIf="opt.count !== undefined" class="pui-fp__opt-count">{{ opt.count }}</span>
              </label>
            </div>

            <!-- RADIO -->
            <div *ngIf="f.type === 'radio'" class="pui-fp__opts">
              <label *ngFor="let opt of f.options" class="pui-fp__cb-row"
                     [class.pui-fp__cb-row--checked]="values[f.id] === opt.value">
                <span class="pui-fp__radio-ring"
                      [class.pui-fp__radio-ring--checked]="values[f.id] === opt.value">
                  <input type="radio" class="pui-fp__native" [name]="f.id"
                         [checked]="values[f.id] === opt.value"
                         (change)="onRadio(f, opt.value)"/>
                  <span *ngIf="values[f.id] === opt.value" class="pui-fp__radio-dot"></span>
                </span>
                <span class="pui-fp__opt-label">{{ opt.label }}</span>
                <span *ngIf="opt.count !== undefined" class="pui-fp__opt-count">{{ opt.count }}</span>
              </label>
            </div>

            <!-- SELECT -->
            <div *ngIf="f.type === 'select'" class="pui-fp__select-wrap">
              <select class="pui-fp__select" [value]="values[f.id] || ''"
                      (change)="onSelect(f, $any($event.target).value)">
                <option value="">{{ f.placeholder || 'Any' }}</option>
                <option *ngFor="let opt of f.options" [value]="opt.value">{{ opt.label }}</option>
              </select>
              <svg class="pui-fp__select-arrow" width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="#6b7280" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <!-- TEXT -->
            <div *ngIf="f.type === 'text'" class="pui-fp__text-wrap">
              <input class="pui-fp__text" type="text"
                     [placeholder]="f.placeholder || 'Enter value…'"
                     [value]="values[f.id] || ''"
                     (input)="onText(f, $any($event.target).value)"/>
            </div>

            <!-- RANGE -->
            <div *ngIf="f.type === 'range'" class="pui-fp__range">
              <div class="pui-fp__range-labels">
                <span>{{ getRangeMin(f) }}</span>
                <strong>{{ getRangeMin(f) }} – {{ getRangeMax(f) }}</strong>
                <span>{{ f.max }}</span>
              </div>
              <div class="pui-fp__range-track-wrap">
                <div class="pui-fp__range-track">
                  <div class="pui-fp__range-fill"
                       [style.left.%]="getRangeFillLeft(f)"
                       [style.width.%]="getRangeFillWidth(f)">
                  </div>
                </div>
                <input type="range" class="pui-fp__range-input pui-fp__range-input--min"
                       [min]="f.min" [max]="f.max" [step]="f.step || 1"
                       [value]="getRangeMin(f)"
                       (input)="onRangeMin(f, +$any($event.target).value)"/>
                <input type="range" class="pui-fp__range-input pui-fp__range-input--max"
                       [min]="f.min" [max]="f.max" [step]="f.step || 1"
                       [value]="getRangeMax(f)"
                       (input)="onRangeMax(f, +$any($event.target).value)"/>
              </div>
            </div>

            <!-- DATE RANGE -->
            <div *ngIf="f.type === 'date-range'" class="pui-fp__date-range">
              <div class="pui-fp__date-field">
                <label class="pui-fp__date-label">From</label>
                <input class="pui-fp__date-input" type="date"
                       [value]="values[f.id]?.from || ''"
                       (change)="onDateFrom(f, $any($event.target).value)"/>
              </div>
              <div class="pui-fp__date-field">
                <label class="pui-fp__date-label">To</label>
                <input class="pui-fp__date-input" type="date"
                       [value]="values[f.id]?.to || ''"
                       (change)="onDateTo(f, $any($event.target).value)"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer actions -->
      <div *ngIf="showActions" class="pui-fp__footer">
        <button class="pui-fp__btn pui-fp__btn--ghost" (click)="onReset()">Reset</button>
        <button class="pui-fp__btn pui-fp__btn--primary" (click)="apply()">Apply filters</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .pui-fp {
      background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px;
      font-family: 'Poppins', system-ui, sans-serif; overflow: hidden;
    }
    .pui-fp--inline { border: none; border-radius: 0; }

    /* Head */
    .pui-fp__head {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 18px 10px; border-bottom: 1px solid #f3f4f6;
    }
    .pui-fp__title-row { display: flex; align-items: center; gap: 8px; }
    .pui-fp__title { font-size: 14px; font-weight: 700; color: #111827; }
    .pui-fp__badge {
      background: #12C6A8; color: #fff; font-size: 10px; font-weight: 700;
      min-width: 18px; height: 18px; border-radius: 999px;
      display: flex; align-items: center; justify-content: center; padding: 0 5px;
    }
    .pui-fp__clear-all {
      font-size: 12px; color: #12C6A8; font-weight: 500; font-family: inherit;
      background: none; border: none; cursor: pointer; padding: 0;
    }
    .pui-fp__clear-all:hover { text-decoration: underline; }

    /* Chips */
    .pui-fp__chips {
      display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 18px;
      border-bottom: 1px solid #f3f4f6;
    }
    .pui-fp__chip {
      display: inline-flex; align-items: center; gap: 5px;
      background: #ecfdf5; color: #0d6e5f; border: 1px solid #a7f3d0;
      border-radius: 999px; padding: 3px 10px;
      font-size: 11px; font-weight: 500; font-family: inherit;
      cursor: pointer; transition: background .12s;
    }
    .pui-fp__chip:hover { background: #d1fae5; }

    /* Groups */
    .pui-fp__groups { padding: 4px 0; }

    .pui-fp__group { border-bottom: 1px solid #f3f4f6; }
    .pui-fp__group:last-child { border-bottom: none; }

    .pui-fp__group-head {
      display: flex; align-items: center; width: 100%;
      padding: 11px 18px; background: none; border: none; cursor: pointer;
      font-family: inherit; gap: 8px;
    }
    .pui-fp__group-head:hover { background: #fafafa; }
    .pui-fp__group-label { flex: 1; font-size: 13px; font-weight: 600; color: #374151; text-align: left; }
    .pui-fp__group-count {
      background: #f0fdf9; color: #12C6A8; border: 1px solid #a7f3d0;
      font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 999px;
    }
    .pui-fp__chevron { color: #9ca3af; transition: transform .2s; transform: rotate(-90deg); }
    .pui-fp__chevron--open { transform: rotate(0deg); }

    .pui-fp__group-body {
      overflow: hidden; max-height: 0; transition: max-height .25s cubic-bezier(.4,0,.2,1);
    }
    .pui-fp__group:not(.pui-fp__group--collapsed) .pui-fp__group-body {
      max-height: 600px;
    }
    .pui-fp__group-body > * { padding: 0 18px 14px; }

    /* Options (checkbox / radio) */
    .pui-fp__opts { display: flex; flex-direction: column; gap: 8px; }
    .pui-fp__cb-row {
      display: flex; align-items: center; gap: 9px;
      cursor: pointer; user-select: none;
    }

    /* Checkbox box */
    .pui-fp__cb-box {
      position: relative; width: 16px; height: 16px; flex-shrink: 0;
      border: 1.5px solid #d1d5db; border-radius: 4px; background: #fff;
      display: flex; align-items: center; justify-content: center;
      transition: border-color .12s, background .12s;
    }
    .pui-fp__cb-box--checked { background: #12C6A8 !important; border-color: #12C6A8 !important; }
    .pui-fp__cb-row:hover .pui-fp__cb-box:not(.pui-fp__cb-box--checked) { border-color: #12C6A8; }
    .pui-fp__native { position: absolute; opacity: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }

    /* Radio ring */
    .pui-fp__radio-ring {
      position: relative; width: 16px; height: 16px; flex-shrink: 0;
      border: 1.5px solid #d1d5db; border-radius: 50%; background: #fff;
      display: flex; align-items: center; justify-content: center;
      transition: border-color .12s;
    }
    .pui-fp__radio-ring--checked { border-color: #12C6A8 !important; }
    .pui-fp__cb-row:hover .pui-fp__radio-ring:not(.pui-fp__radio-ring--checked) { border-color: #12C6A8; }
    .pui-fp__radio-dot { width: 7px; height: 7px; border-radius: 50%; background: #12C6A8; position: relative; z-index: 1; }

    .pui-fp__opt-label { flex: 1; font-size: 13px; color: #374151; }
    .pui-fp__cb-row--checked .pui-fp__opt-label { color: #0d6e5f; font-weight: 500; }
    .pui-fp__opt-count { font-size: 11px; color: #9ca3af; }

    /* Select */
    .pui-fp__select-wrap { position: relative; display: flex; align-items: center; }
    .pui-fp__select {
      width: 100%; height: 36px; border: 1.5px solid #d1d5db; border-radius: 8px;
      background: #fff; font-size: 13px; font-family: inherit; color: #374151;
      padding: 0 32px 0 10px; appearance: none; cursor: pointer;
      transition: border-color .15s;
    }
    .pui-fp__select:focus { outline: none; border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.14); }
    .pui-fp__select-arrow { position: absolute; right: 10px; pointer-events: none; }

    /* Text */
    .pui-fp__text {
      width: 100%; height: 36px; border: 1.5px solid #d1d5db; border-radius: 8px;
      background: #fff; font-size: 13px; font-family: inherit; color: #374151;
      padding: 0 10px; box-sizing: border-box;
      transition: border-color .15s;
    }
    .pui-fp__text:focus { outline: none; border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.14); }
    .pui-fp__text::placeholder { color: #9ca3af; }

    /* Range */
    .pui-fp__range { display: flex; flex-direction: column; gap: 10px; }
    .pui-fp__range-labels { display: flex; justify-content: space-between; font-size: 12px; color: #6b7280; }
    .pui-fp__range-labels strong { color: #12C6A8; font-weight: 600; }
    .pui-fp__range-track-wrap { position: relative; height: 28px; display: flex; align-items: center; }
    .pui-fp__range-track { position: absolute; left: 0; right: 0; height: 4px; background: #e5e7eb; border-radius: 9px; }
    .pui-fp__range-fill { position: absolute; height: 100%; background: #12C6A8; border-radius: 9px; }
    .pui-fp__range-input {
      position: absolute; width: 100%; appearance: none; background: transparent;
      pointer-events: none; height: 4px;
    }
    .pui-fp__range-input::-webkit-slider-thumb {
      -webkit-appearance: none; pointer-events: all;
      width: 18px; height: 18px; border-radius: 50%;
      background: #fff; border: 2px solid #12C6A8;
      box-shadow: 0 1px 4px rgba(0,0,0,.12); cursor: grab;
    }
    .pui-fp__range-input::-webkit-slider-thumb:active { cursor: grabbing; }
    .pui-fp__range-input::-moz-range-thumb {
      pointer-events: all;
      width: 16px; height: 16px; border-radius: 50%;
      background: #fff; border: 2px solid #12C6A8; cursor: grab;
    }

    /* Date range */
    .pui-fp__date-range { display: flex; flex-direction: column; gap: 8px; }
    .pui-fp__date-field { display: flex; flex-direction: column; gap: 4px; }
    .pui-fp__date-label { font-size: 11px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
    .pui-fp__date-input {
      height: 34px; border: 1.5px solid #d1d5db; border-radius: 8px;
      background: #fff; font-size: 13px; font-family: inherit; color: #374151;
      padding: 0 8px; transition: border-color .15s;
    }
    .pui-fp__date-input:focus { outline: none; border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.14); }

    /* Footer */
    .pui-fp__footer {
      display: flex; gap: 8px; padding: 12px 18px;
      border-top: 1px solid #f3f4f6;
    }
    .pui-fp__btn {
      flex: 1; height: 36px; border-radius: 8px; font-size: 13px;
      font-weight: 600; font-family: inherit; cursor: pointer; transition: all .15s;
    }
    .pui-fp__btn--ghost {
      background: #fff; border: 1.5px solid #d1d5db; color: #374151;
    }
    .pui-fp__btn--ghost:hover { border-color: #9ca3af; }
    .pui-fp__btn--primary {
      background: #12C6A8; border: none; color: #fff;
    }
    .pui-fp__btn--primary:hover { background: #0fb090; }
  `],
})
export class PuiFilterPanelComponent implements OnChanges {
  @Input() title = 'Filters';

  @Input() set filters(v: FilterDef[] | string) {
    this._filters = typeof v === 'string' ? (this._parseJson<FilterDef[]>(v) ?? []) : (v || []);
  }
  get filters(): FilterDef[] { return this._filters; }
  private _filters: FilterDef[] = [];

  @Input() set values(v: FilterValues | string) {
    this._values = typeof v === 'string' ? (this._parseJson<FilterValues>(v) ?? {}) : (v || {});
  }
  get values(): FilterValues { return this._values; }
  private _values: FilterValues = {};

  @Input() set showActions(v: boolean | string) {
    this._showActions = v !== false && v !== 'false';
  }
  get showActions() { return this._showActions; }
  private _showActions = true;

  @Input() set inline(v: boolean | string) {
    this._inline = v === true || v === 'true' || (v as any) === '';
  }
  get inline() { return this._inline; }
  private _inline = false;

  private _parseJson<T>(s: string): T | null {
    if (!s) return null;
    try { return JSON.parse(s) as T; } catch { return null; }
  }

  @Output() valuesChange = new EventEmitter<FilterValues>();
  @Output() applied      = new EventEmitter<FilterValues>();
  @Output() reset        = new EventEmitter<void>();
  @Output() cleared      = new EventEmitter<void>();

  collapsed: Record<string, boolean> = {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(c: SimpleChanges): void {
    if (c['filters']) {
      for (const f of this.filters) {
        if (!(f.id in this.collapsed)) {
          this.collapsed[f.id] = f.collapsed ?? false;
        }
      }
    }
  }

  // ── Read helpers ──────────────────────────────────────

  isChecked(id: string, val: any): boolean {
    return Array.isArray(this.values[id]) && this.values[id].includes(val);
  }

  getGroupCount(f: FilterDef): number {
    const v = this.values[f.id];
    if (!v) return 0;
    if (Array.isArray(v)) return v.length;
    if (typeof v === 'object' && v !== null) return Object.values(v).filter(Boolean).length;
    return 1;
  }

  get activeCount(): number {
    return Object.values(this.values).filter(v => {
      if (Array.isArray(v)) return v.length > 0;
      if (v === null || v === undefined || v === '') return false;
      return true;
    }).length;
  }

  get activeFilters(): ActiveFilter[] {
    const out: ActiveFilter[] = [];
    for (const f of this.filters) {
      const v = this.values[f.id];
      if (!v) continue;
      if (Array.isArray(v) && v.length) {
        const labels = v.map(val => f.options?.find(o => o.value === val)?.label ?? val);
        out.push({ filterId: f.id, filterLabel: f.label, valueLabel: labels.join(', '), value: v });
      } else if (typeof v === 'string' && v) {
        const label = f.options?.find(o => o.value === v)?.label ?? v;
        out.push({ filterId: f.id, filterLabel: f.label, valueLabel: label, value: v });
      } else if (typeof v === 'object' && v !== null) {
        const parts = Object.entries(v).filter(([, x]) => x).map(([k, x]) => `${k}: ${x}`);
        if (parts.length) out.push({ filterId: f.id, filterLabel: f.label, valueLabel: parts.join(', '), value: v });
      }
    }
    return out;
  }

  getRangeMin(f: FilterDef): number { return this.values[f.id]?.min ?? f.min ?? 0; }
  getRangeMax(f: FilterDef): number { return this.values[f.id]?.max ?? f.max ?? 100; }
  getRangeFillLeft(f: FilterDef): number {
    const span = (f.max ?? 100) - (f.min ?? 0);
    return span ? ((this.getRangeMin(f) - (f.min ?? 0)) / span) * 100 : 0;
  }
  getRangeFillWidth(f: FilterDef): number {
    const span = (f.max ?? 100) - (f.min ?? 0);
    return span ? ((this.getRangeMax(f) - this.getRangeMin(f)) / span) * 100 : 0;
  }

  // ── Toggle ────────────────────────────────────────────

  toggleGroup(id: string): void {
    this.collapsed[id] = !this.collapsed[id];
    this.cdr.markForCheck();
  }

  // ── Change handlers ──────────────────────────────────

  private emit(vals: FilterValues): void {
    this.values = { ...vals };
    this.valuesChange.emit(this.values);
    if (!this.showActions) this.applied.emit(this.values);
    this.cdr.markForCheck();
  }

  onCheckbox(f: FilterDef, val: any, checked: boolean): void {
    const current: any[] = Array.isArray(this.values[f.id]) ? [...this.values[f.id]] : [];
    const next = checked ? [...current, val] : current.filter(v => v !== val);
    this.emit({ ...this.values, [f.id]: next });
  }

  onRadio(f: FilterDef, val: any): void {
    this.emit({ ...this.values, [f.id]: val });
  }

  onSelect(f: FilterDef, val: string): void {
    this.emit({ ...this.values, [f.id]: val || null });
  }

  onText(f: FilterDef, val: string): void {
    this.emit({ ...this.values, [f.id]: val });
  }

  onRangeMin(f: FilterDef, val: number): void {
    const max = this.getRangeMax(f);
    this.emit({ ...this.values, [f.id]: { min: Math.min(val, max - (f.step || 1)), max } });
  }

  onRangeMax(f: FilterDef, val: number): void {
    const min = this.getRangeMin(f);
    this.emit({ ...this.values, [f.id]: { min, max: Math.max(val, min + (f.step || 1)) } });
  }

  onDateFrom(f: FilterDef, val: string): void {
    const cur = this.values[f.id] ?? {};
    this.emit({ ...this.values, [f.id]: { ...cur, from: val } });
  }

  onDateTo(f: FilterDef, val: string): void {
    const cur = this.values[f.id] ?? {};
    this.emit({ ...this.values, [f.id]: { ...cur, to: val } });
  }

  removeChip(chip: ActiveFilter): void {
    const next = { ...this.values };
    delete next[chip.filterId];
    this.emit(next);
  }

  clearAll(): void {
    this.values = {};
    this.valuesChange.emit({});
    this.cleared.emit();
    this.cdr.markForCheck();
  }

  apply(): void  { this.applied.emit({ ...this.values }); }

  onReset(): void {
    this.values = {};
    this.valuesChange.emit({});
    this.reset.emit();
    this.cdr.markForCheck();
  }
}
