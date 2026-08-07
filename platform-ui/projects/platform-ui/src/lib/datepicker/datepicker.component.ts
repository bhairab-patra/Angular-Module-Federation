import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, inject,
  HostListener, ElementRef
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export type DatePickerMode = 'single' | 'range';

export interface DateRange { start: Date | null; end: Date | null; }

const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

@Component({
  selector: 'pui-datepicker',
  standalone: true,
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="pui-dp-host" [class.pui-dp--disabled]="_disabled">

  <!-- ── Trigger input ─────────────────────────────────── -->
  <div class="pui-dp-trigger"
       [class.pui-dp-trigger--open]="open"
       [class.pui-dp-trigger--focused]="open"
       (click)="!_disabled && toggle()">

    <svg class="pui-dp-cal-icon" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="14" rx="2.5" stroke="currentColor" stroke-width="1.4"/>
      <path d="M2 8h16M6 2v4M14 2v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>

    <span class="pui-dp-value" [class.pui-dp-placeholder]="!displayValue">
      {{ displayValue || _placeholder }}
    </span>

    <button *ngIf="_clearable && displayValue"
            class="pui-dp-clear"
            (click)="$event.stopPropagation(); clear()"
            aria-label="Clear date">✕</button>

    <svg class="pui-dp-chevron" [class.pui-dp-chevron--up]="open"
         viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

  <!-- ── Calendar popup ────────────────────────────────── -->
  <div *ngIf="open" class="pui-dp-popup" (click)="$event.stopPropagation()">

    <!-- Month/Year nav -->
    <div class="pui-dp-nav">
      <button class="pui-dp-nav-btn" (click)="prevMonth()" title="Previous month">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="pui-dp-nav-label">
        <button class="pui-dp-nav-month" (click)="viewMode = viewMode==='months' ? 'days' : 'months'">
          {{ monthName }} {{ viewYear }}
        </button>
      </div>

      <button class="pui-dp-nav-btn" (click)="nextMonth()" title="Next month">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Month grid picker -->
    <div *ngIf="viewMode === 'months'" class="pui-dp-month-grid">
      <button *ngFor="let m of monthNames; let mi = index"
              class="pui-dp-month-cell"
              [class.pui-dp-month-cell--active]="mi === viewMonth"
              (click)="pickMonth(mi)">
        {{ m.slice(0,3) }}
      </button>
    </div>

    <!-- Day grid -->
    <div *ngIf="viewMode === 'days'" class="pui-dp-grid">

      <!-- Weekday headers -->
      <div class="pui-dp-dayname" *ngFor="let d of dayNames">{{ d }}</div>

      <!-- Day cells -->
      <button *ngFor="let cell of calCells"
              class="pui-dp-cell"
              [class.pui-dp-cell--other]="!cell.cur"
              [class.pui-dp-cell--today]="cell.today"
              [class.pui-dp-cell--selected]="isSelected(cell.date)"
              [class.pui-dp-cell--range-start]="_mode==='range' && isRangeStart(cell.date)"
              [class.pui-dp-cell--range-end]="_mode==='range' && isRangeEnd(cell.date)"
              [class.pui-dp-cell--in-range]="_mode==='range' && isInRange(cell.date)"
              [class.pui-dp-cell--disabled]="cell.disabled"
              [disabled]="cell.disabled || null"
              (click)="pickDay(cell.date)"
              (mouseenter)="_mode==='range' && hoverDate(cell.date)">
        {{ cell.date.getDate() }}
      </button>
    </div>

    <!-- Footer -->
    <div class="pui-dp-footer">
      <button class="pui-dp-today-btn" (click)="goToday()">Today</button>
      <button *ngIf="_clearable" class="pui-dp-clear-btn" (click)="clear()">Clear</button>
    </div>
  </div>

</div>
  `,
  styles: [`
    :host { display: inline-block; position: relative; }

    /* ── Host ──────────────────────────────────── */
    .pui-dp-host {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      font-size: 13.5px;
      position: relative;
      display: inline-block;
      width: 100%;
    }
    .pui-dp--disabled { opacity: .5; pointer-events: none; }

    /* ── Trigger ───────────────────────────────── */
    .pui-dp-trigger {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px;
      border: 1.5px solid #e5e7eb;
      border-radius: 10px;
      background: #fff;
      cursor: pointer;
      transition: border-color .15s, box-shadow .15s;
      min-width: 200px;
    }
    .pui-dp-trigger:hover { border-color: #12C6A8; }
    .pui-dp-trigger--focused {
      border-color: #12C6A8;
      box-shadow: 0 0 0 3px rgba(18,198,168,.14);
    }
    .pui-dp-cal-icon {
      width: 16px; height: 16px; flex-shrink: 0; color: #9ca3af;
    }
    .pui-dp-value {
      flex: 1; font-size: 13.5px; color: #111827; white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis;
    }
    .pui-dp-placeholder { color: #9ca3af; }
    .pui-dp-chevron {
      color: #9ca3af; flex-shrink: 0;
      transition: transform .18s;
    }
    .pui-dp-chevron--up { transform: rotate(180deg); }
    .pui-dp-clear {
      background: none; border: none; cursor: pointer; padding: 0 2px;
      font-size: 11px; color: #9ca3af; line-height: 1;
    }
    .pui-dp-clear:hover { color: #374151; }

    /* ── Popup ─────────────────────────────────── */
    .pui-dp-popup {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: 1000;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 14px;
      box-shadow: 0 8px 30px rgba(0,0,0,.12);
      padding: 14px;
      min-width: 280px;
      animation: pui-dp-in .16s ease;
    }
    @keyframes pui-dp-in {
      from { opacity: 0; transform: translateY(-6px) scale(.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* ── Nav ───────────────────────────────────── */
    .pui-dp-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .pui-dp-nav-btn {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px;
      border: 1px solid #e5e7eb; border-radius: 7px;
      background: #fff; cursor: pointer; color: #374151;
      transition: all .12s;
    }
    .pui-dp-nav-btn:hover { border-color: #12C6A8; color: #0d9e87; background: #f0fdfb; }
    .pui-dp-nav-label { flex: 1; text-align: center; }
    .pui-dp-nav-month {
      background: none; border: none; cursor: pointer;
      font-size: 14px; font-weight: 600; color: #111827; font-family: inherit;
      padding: 4px 8px; border-radius: 6px;
      transition: background .12s;
    }
    .pui-dp-nav-month:hover { background: #f3f4f6; }

    /* ── Month grid ────────────────────────────── */
    .pui-dp-month-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      margin-bottom: 10px;
    }
    .pui-dp-month-cell {
      padding: 8px 4px;
      border: 1px solid transparent;
      border-radius: 7px;
      background: none;
      font-size: 12.5px; font-family: inherit;
      color: #374151; cursor: pointer; text-align: center;
      transition: all .12s;
    }
    .pui-dp-month-cell:hover { background: #f3f4f6; border-color: #e5e7eb; }
    .pui-dp-month-cell--active {
      background: #12C6A8 !important;
      color: #fff !important;
      border-color: #12C6A8 !important;
      font-weight: 600;
    }

    /* ── Day grid ──────────────────────────────── */
    .pui-dp-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
    }
    .pui-dp-dayname {
      text-align: center;
      font-size: 11px;
      font-weight: 600;
      color: #9ca3af;
      padding: 3px 0 6px;
      text-transform: uppercase;
      letter-spacing: .04em;
    }

    /* ── Day cell ──────────────────────────────── */
    .pui-dp-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      border: none;
      border-radius: 7px;
      background: transparent;
      font-size: 12.5px;
      font-family: inherit;
      color: #374151;
      cursor: pointer;
      transition: background .12s, color .12s;
      position: relative;
    }
    .pui-dp-cell:hover:not(:disabled) { background: #f0fdfb; color: #0d9e87; }
    .pui-dp-cell--other { color: #d1d5db; }
    .pui-dp-cell--other:hover:not(:disabled) { color: #9ca3af; }
    .pui-dp-cell--today {
      font-weight: 700;
      color: #0d9e87;
    }
    .pui-dp-cell--today::after {
      content: '';
      position: absolute;
      bottom: 3px;
      left: 50%; transform: translateX(-50%);
      width: 4px; height: 4px;
      border-radius: 50%;
      background: #12C6A8;
    }
    .pui-dp-cell--selected {
      background: #12C6A8 !important;
      color: #fff !important;
      font-weight: 600;
    }
    .pui-dp-cell--selected::after { display: none; }
    .pui-dp-cell--range-start,
    .pui-dp-cell--range-end {
      background: #12C6A8 !important;
      color: #fff !important;
      font-weight: 600;
      border-radius: 7px;
      z-index: 1;
    }
    .pui-dp-cell--in-range {
      background: rgba(18,198,168,.12) !important;
      border-radius: 0;
      color: #0d9e87;
    }
    .pui-dp-cell--disabled {
      opacity: .35;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Footer ────────────────────────────────── */
    .pui-dp-footer {
      display: flex;
      gap: 8px;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #f3f4f6;
    }
    .pui-dp-today-btn, .pui-dp-clear-btn {
      flex: 1;
      padding: 6px;
      border: 1px solid #e5e7eb;
      border-radius: 7px;
      background: #fff;
      font-size: 12px;
      font-family: inherit;
      color: #374151;
      cursor: pointer;
      transition: all .12s;
    }
    .pui-dp-today-btn:hover {
      border-color: #12C6A8; color: #0d9e87; background: #f0fdfb;
    }
    .pui-dp-clear-btn:hover {
      border-color: #fca5a5; color: #dc2626; background: #fff5f5;
    }
  `],
})
export class PuiDatepickerComponent {
  private cdr = inject(ChangeDetectorRef);
  private el  = inject(ElementRef);

  /* ── Internal state ─────────────────── */
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

  /* ── Inputs ─────────────────────────── */
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

  /* ── Outputs ────────────────────────── */
  @Output() valueChange  = new EventEmitter<Date | null>();
  @Output() rangeChange  = new EventEmitter<DateRange>();
  @Output() change       = new EventEmitter<Date | DateRange | null>();

  /* ── Click outside ──────────────────── */
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.el.nativeElement.contains(e.target as Node)) {
      this.open = false;
      this.cdr.markForCheck();
    }
  }

  /* ── Computed ───────────────────────── */
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

  /* ── Actions ────────────────────────── */
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

  /* ── Range helpers ──────────────────── */
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

  /* ── Utilities ──────────────────────── */
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
