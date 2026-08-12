import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
  ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FilterDef, FilterValues, ActiveFilter } from '../models/filter.model';

@Component({
  selector: 'pui-lib-filter-panel',
  standalone: true,
  imports: [NgIf, NgFor],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
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
  // eslint-disable-next-line @angular-eslint/no-output-native
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

  // -- Read helpers --------------------------------------

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

  // -- Toggle --------------------------------------------

  toggleGroup(id: string): void {
    this.collapsed[id] = !this.collapsed[id];
    this.cdr.markForCheck();
  }

  // -- Change handlers ----------------------------------

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
