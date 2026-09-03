import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  inject,
  ChangeDetectorRef,
  HostListener,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

export type DatePickerMode = 'single' | 'range';
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DpCell {
  date: Date;
  ts: number;
  cur: boolean;
  today: boolean;
  disabled: boolean;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Component({
  selector: 'pui-lib-datepicker',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PuiDatepickerComponent),
      multi: true,
    },
  ],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class PuiDatepickerComponent implements ControlValueAccessor {
  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  open = false;
  viewMode: 'days' | 'months' = 'days';
  viewYear = new Date().getFullYear();
  viewMonth = new Date().getMonth();

  _value: Date | null = null;
  _range: DateRange = { start: null, end: null };
  _hoverDate: Date | null = null;
  _mode: DatePickerMode = 'single';
  _min: Date | null = null;
  _max: Date | null = null;
  _disabled = false;
  _clearable = true;
  _placeholder = 'Select date…';
  _format = 'MMM d, yyyy';

  readonly dayNames = DAYS;
  readonly monthNames = MONTHS;

  private _cells: DpCell[] = [];
  private _cellsCacheKey = '';

  get calCells(): DpCell[] {
    const key = `${this.viewYear}-${this.viewMonth}-${this._min?.getTime() ?? ''}-${this._max?.getTime() ?? ''}`;
    if (key !== this._cellsCacheKey) {
      this._cellsCacheKey = key;
      this._cells = this._buildCells();
    }
    return this._cells;
  }

  trackByTs(_: number, cell: DpCell): number {
    return cell.ts;
  }
  trackByIdx(i: number): number {
    return i;
  }

  @Input() set value(v: Date | string | null) {
    if (!v) {
      this._value = null;
      this.cdr.markForCheck();
      return;
    }
    const d = v instanceof Date ? v : new Date(v as string);
    this._value = isNaN(d.getTime()) ? null : d;
    this.cdr.markForCheck();
  }

  @Input() set range(v: DateRange | string | null) {
    if (!v) {
      this._range = { start: null, end: null };
      this.cdr.markForCheck();
      return;
    }
    const r = typeof v === 'string' ? (this._parse<DateRange>(v) ?? { start: null, end: null }) : v;
    this._range = {
      start: r.start ? new Date(r.start) : null,
      end: r.end ? new Date(r.end) : null,
    };
    this.cdr.markForCheck();
  }

  @Input() set mode(v: DatePickerMode | string) {
    this._mode = v === 'range' ? 'range' : 'single';
  }
  @Input() set min(v: Date | string | null) {
    this._min = v ? new Date(v as string) : null;
    this._cellsCacheKey = '';
    this.cdr.markForCheck();
  }
  @Input() set max(v: Date | string | null) {
    this._max = v ? new Date(v as string) : null;
    this._cellsCacheKey = '';
    this.cdr.markForCheck();
  }
  @Input() set disabled(v: boolean | string) {
    this._disabled = v === true || v === 'true' || (v as unknown) === '';
  }
  @Input() set clearable(v: boolean | string) {
    this._clearable = v === true || v === 'true' || (v as unknown) === '';
  }
  @Input() set placeholder(v: string) {
    this._placeholder = v;
  }
  @Input() set format(v: string) {
    this._format = v;
  }

  private onChangeFn: (v: Date | DateRange | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(v: Date | DateRange | string | null): void {
    if (this._mode === 'range') {
      if (!v) {
        this._range = { start: null, end: null };
      } else {
        const r =
          typeof v === 'string'
            ? (this._parse<DateRange>(v) ?? { start: null, end: null })
            : (v as DateRange);
        this._range = {
          start: r.start ? new Date(r.start) : null,
          end: r.end ? new Date(r.end) : null,
        };
      }
    } else {
      if (!v) {
        this._value = null;
      } else {
        const d = v instanceof Date ? v : new Date(v as string);
        this._value = isNaN(d.getTime()) ? null : d;
      }
    }
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(d: boolean): void {
    this._disabled = d;
  }

  @Output() valueChange = new EventEmitter<Date | null>();
  @Output() rangeChange = new EventEmitter<DateRange>();
  // eslint-disable-next-line @angular-eslint/no-output-native -- public API, renaming breaks consumers
  @Output() change = new EventEmitter<Date | DateRange | null>();

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const path: EventTarget[] = e.composedPath ? e.composedPath() : [];
    const inside = path.length
      ? path.includes(this.el.nativeElement)
      : this.el.nativeElement.contains(e.target as Node);
    if (!inside && this.open) {
      this.open = false;
      this.onTouchedFn();
      this.cdr.markForCheck();
    }
  }

  get monthName(): string {
    return MONTHS[this.viewMonth];
  }

  get displayValue(): string {
    if (this._mode === 'range') {
      const { start, end } = this._range;
      if (!start) return '';
      return end ? `${this._fmt(start)} – ${this._fmt(end)}` : this._fmt(start);
    }
    return this._value ? this._fmt(this._value) : '';
  }

  toggle(): void {
    if (this._disabled) return;
    this.open = !this.open;
    if (this.open) {
      const nav = this._mode === 'single' ? this._value : this._range.start;
      if (nav) {
        this.viewYear = nav.getFullYear();
        this.viewMonth = nav.getMonth();
      }
    }
    this.cdr.markForCheck();
  }

  prevMonth(): void {
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear--;
    } else this.viewMonth--;
    this.cdr.markForCheck();
  }

  nextMonth(): void {
    if (this.viewMonth === 11) {
      this.viewMonth = 0;
      this.viewYear++;
    } else this.viewMonth++;
    this.cdr.markForCheck();
  }

  pickMonth(mi: number): void {
    this.viewMonth = mi;
    this.viewMode = 'days';
    this.cdr.markForCheck();
  }

  pickDay(d: Date): void {
    if (this._isDisabled(d)) return;

    if (this._mode === 'single') {
      this._value = d;
      this.open = false;
      this.valueChange.emit(d);
      this.change.emit(d);
      this.onChangeFn(d);
    } else {
      const { start, end } = this._range;
      if (!start || (start && end)) {
        this._range = { start: d, end: null };
      } else {
        const ordered = d < start ? { start: d, end: start } : { start, end: d };
        this._range = ordered;
        this.open = false;
        this.rangeChange.emit(ordered);
        this.change.emit(ordered);
        this.onChangeFn(ordered);
      }
    }
    this.cdr.markForCheck();
  }

  hoverDate(d: Date): void {
    if (this._mode === 'range' && this._range.start && !this._range.end) {
      this._hoverDate = d;
      this.cdr.markForCheck();
    }
  }

  goToday(): void {
    const t = new Date();
    this.viewYear = t.getFullYear();
    this.viewMonth = t.getMonth();
    this.viewMode = 'days';
    this.pickDay(t);
  }

  clear(): void {
    this._value = null;
    this._range = { start: null, end: null };
    this._hoverDate = null;
    this.valueChange.emit(null);
    this.rangeChange.emit({ start: null, end: null });
    this.change.emit(null);
    this.onChangeFn(null);
    this.cdr.markForCheck();
  }

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
    const end = this._range.end || this._hoverDate;
    if (!start || !end) return false;
    const lo = start < end ? start : end;
    const hi = start < end ? end : start;
    return d > lo && d < hi;
  }

  private _buildCells(): DpCell[] {
    const today = new Date();
    const first = new Date(this.viewYear, this.viewMonth, 1);
    const start = new Date(this.viewYear, this.viewMonth, 1 - first.getDay());

    const cells: DpCell[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      cells.push({
        date: d,
        ts: d.getTime(),
        cur: d.getMonth() === this.viewMonth,
        today: this._sameDay(d, today),
        disabled: this._isDisabled(d),
      });
    }
    if (!cells.slice(35).some((c) => c.cur)) cells.splice(35);
    return cells;
  }

  private _sameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  private _isDisabled(d: Date): boolean {
    if (this._min) {
      const min = new Date(this._min);
      min.setHours(0, 0, 0, 0);
      if (d < min) return true;
    }
    if (this._max) {
      const max = new Date(this._max);
      max.setHours(23, 59, 59, 999);
      if (d > max) return true;
    }
    return false;
  }

  private _fmt(d: Date): string {
    return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
  }

  private _parse<T>(s: string): T | null {
    try {
      return JSON.parse(s) as T;
    } catch {
      return null;
    }
  }
}
