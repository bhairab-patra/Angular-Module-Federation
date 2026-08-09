import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormSize, SelectOption } from '../../models/form.model';

@Component({
  selector: 'pui-lib-select',
  standalone: true,
  imports: [NgIf, NgFor],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiSelectComponent),
    multi: true,
  }],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class PuiSelectComponent implements ControlValueAccessor {
  @Input() label       = '';
  @Input() placeholder = 'Select an option';
  @Input() size: FormSize = 'md';
  @Input() error       = '';
  @Input() hint        = '';

  @Input() set options(v: SelectOption[] | string) {
    this._options = typeof v === 'string' ? (this._parseJson<SelectOption[]>(v) ?? []) : (v || []);
  }
  get options(): SelectOption[] { return this._options; }
  private _options: SelectOption[] = [];

  @Input() set disabled(v: boolean | string) { this._disabled = v === true || v === 'true' || (v as any) === ''; }
  get disabled() { return this._disabled; }
  private _disabled = false;

  @Input() set required(v: boolean | string) { this._required = v === true || v === 'true' || (v as any) === ''; }
  get required() { return this._required; }
  private _required = false;

  private _parseJson<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }

  @Output() valueChange = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any>();

  innerValue: any = '';
  focused = false;

  private onChangeFn: (v: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(val: any): void { this.innerValue = val ?? ''; this.cdr.markForCheck(); }
  registerOnChange(fn: any): void  { this.onChangeFn = fn; }
  registerOnTouched(fn: any): void { this.onTouchedFn = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; this.cdr.markForCheck(); }

  onChange2(val: any): void {
    this.innerValue = val;
    this.onChangeFn(val);
    this.valueChange.emit(val);
    this.selectionChange.emit(val);
    this.cdr.markForCheck();
  }

  onBlur(): void {
    this.focused = false;
    this.onTouchedFn();
    this.cdr.markForCheck();
  }
}
