import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, inject,
  HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export type DatePickerMode = 'single' | 'range';

export interface DateRange { start: Date | null; end: Date | null; }

const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

@Component({
  selector: 'pui-lib-datepicker',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class PuiDatepickerComponent {
  private cdr = inject(ChangeDetectorRef);
  private el  = inject(ElementRef);

  /* -- Internal state ------------------- */
  open      = false;
  viewMode: 'days' | 'months' = 'days';
  viewYear  = new Date().getFullYear();
  viewMonth = new Date().getMonth();

  _value:       Date | null = null;
  _range:       DateRange   = { start: null, end: null };
  _hoverDate:   Date | null = null;
  _mode:        DatePickerMode = 'single';
  _min:         Date | null = null;
  _max:         Date | null = null;
  _disabled     = false;
  _clearable    = true;
  _placeholder  = 'Select date…';
  _format       = 'MMM d, yyyy';

  readonly dayNames   = DAYS;
  readonly monthNames = MONTHS;

  /* -- Inputs --------------------------- */
  @Input() set value(v: Date | string | null) {
    if (!v) { this._value = null; return; }
    const d = v instanceof Date ? v : new Date(v as string);
    this._value = isNaN(d.getTime()) ? null : d;
  }
  @Input() set range(v: DateRange | string | null) {
    if (!v) { this._range = { start: null, end: null }; return; }
    const r = typeof v === 'string' ? this._parse<DateRange>(v) ?? { start: null, end: null } : v;
    this._range = {
      start: r.start ? new Date(r.start) : null,
      end:   r.end   ? new Date(r.end)   : null,
    };
  }
  @Input() set mode(v: DatePickerMode | string)  { this._mode = v === 'range' ? 'range' : 'single'; }
  @Input() set min(v: Date | string | null)       { this._min  = v ? new Date(v as string) : null; }
  @Input() set max(v: Date | string | null)       { this._max  = v ? new Date(v as string) : null; }
  @Input() set disabled(v: boolean | string)      { this._disabled  = v === true || v === 'true' || (v as any) === ''; }
  @Input() set clearable(v: boolean | string)     { this._clearable = v === true || v === 'true' || (v as any) === ''; }
  @Input() set placeholder(v: string)             { this._placeholder = v; }
  @Input() set format(v: string)                  { this._format = v; }

  /* -- Outputs -------------------------- */
  @Output() valueChange  = new EventEmitter<Date | null>();
  @Output() rangeChange  = new EventEmitter<DateRange>();
  @Output() change       = new EventEmitter<Date | DateRange | null>();

  /* -- Click outside -------------------- */
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.el.nativeElement.contains(e.target as Node)) {
      this.open = false;
      this.cdr.markForCheck();
    }
  }

  /* -- Computed ------------------------- */
  get monthName() { return MONTHS[this.viewMonth]; }

  get displayValue(): string {
    if (this._mode === 'range') {
      const { start, end } = this._range;
      if (!start) return '';
      return end
        ? `${this._fmt(start)} — ${this._fmt(end)}`
        : this._fmt(start);
    }
    return this._value ? this._fmt(this._value) : '';
  }

  get calCells(): { date: Date; cur: boolean; today: boolean; disabled: boolean }[] {
    const today = new Date();
    const first = new Date(this.viewYear, this.viewMonth, 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay());  // back to Sunday

    const cells = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      cells.push({
        date:     d,
        cur:      d.getMonth() === this.viewMonth,
        today:    this._sameDay(d, today),
        disabled: this._isDisabled(d),
      });
    }
    // trim last row if all other-month
    if (!cells.slice(35).some(c => c.cur)) cells.splice(35);
    return cells;
  }

  /* -- Actions -------------------------- */
  toggle() { this.open = !this.open; this.cdr.markForCheck(); }

  prevMonth() {
    if (this.viewMonth === 0) { this.viewMonth = 11; this.viewYear--; }
    else this.viewMonth--;
    this.cdr.markForCheck();
  }

  nextMonth() {
    if (this.viewMonth === 11) { this.viewMonth = 0; this.viewYear++; }
    else this.viewMonth++;
    this.cdr.markForCheck();
  }

  pickMonth(mi: number) {
    this.viewMonth = mi;
    this.viewMode  = 'days';
    this.cdr.markForCheck();
  }

  pickDay(d: Date) {
    if (this._isDisabled(d)) return;

    if (this._mode === 'single') {
      this._value = d;
      this.valueChange.emit(d);
      this.change.emit(d);
      this.open = false;
    } else {
      // range mode
      const { start, end } = this._range;
      if (!start || (start && end)) {
        this._range = { start: d, end: null };
      } else {
        const ordered = d < start ? { start: d, end: start } : { start, end: d };
        this._range = ordered;
        this.rangeChange.emit(ordered);
        this.change.emit(ordered);
        this.open = false;
      }
    }
    this.cdr.markForCheck();
  }

  hoverDate(d: Date) {
    if (this._mode === 'range' && this._range.start && !this._range.end) {
      this._hoverDate = d;
      this.cdr.markForCheck();
    }
  }

  goToday() {
    const t = new Date();
    this.viewYear  = t.getFullYear();
    this.viewMonth = t.getMonth();
    this.viewMode  = 'days';
    this.cdr.markForCheck();
  }

  clear() {
    this._value = null;
    this._range = { start: null, end: null };
    this._hoverDate = null;
    this.valueChange.emit(null);
    this.rangeChange.emit({ start: null, end: null });
    this.change.emit(null);
    this.cdr.markForCheck();
  }

  /* -- Range helpers -------------------- */
  isSelected(d: Date): boolean {
    return this._mode === 'single' && !!this._value && this._sameDay(d, this._value);
  }

  isRangeStart(d: Date): boolean {
    return !!this._range.start && this._sameDay(d, this._range.start);
  }

  isRangeEnd(d: Date): boolean {
    const end = this._range.end || this._hoverDate;
    return !!end && !!this._range.start && this._sameDay(d, end);
  }

  isInRange(d: Date): boolean {
    const start = this._range.start;
    const end   = this._range.end || this._hoverDate;
    if (!start || !end) return false;
    const lo = start < end ? start : end;
    const hi = start < end ? end   : start;
    return d > lo && d < hi;
  }

  /* -- Utilities ------------------------ */
  private _sameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth()    === b.getMonth()    &&
           a.getDate()     === b.getDate();
  }

  private _isDisabled(d: Date) {
    if (this._min && d < this._min) return true;
    if (this._max && d > this._max) return true;
    return false;
  }

  private _fmt(d: Date): string {
    const m = MONTHS[d.getMonth()].slice(0, 3);
    return `${m} ${d.getDate()}, ${d.getFullYear()}`;
  }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
