import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormSize } from '../../models/form.model';

@Component({
  selector: 'pui-lib-textarea',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiTextareaComponent),
    multi: true,
  }],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class PuiTextareaComponent implements ControlValueAccessor {
  @Input() label       = '';
  @Input() placeholder = '';
  @Input() size: FormSize = 'md';
  @Input() error       = '';
  @Input() hint        = '';
  @Input() resize: 'both' | 'vertical' | 'horizontal' | 'none' = 'vertical';

  @Input() set rows(v: number | string) { this._rows = Number(v) || 4; }
  get rows() { return this._rows; }
  private _rows = 4;

  @Input() set maxLength(v: number | string | null) {
    this._maxLength = v === null || v === '' ? null : Number(v);
  }
  get maxLength() { return this._maxLength; }
  private _maxLength: number | null = null;

  @Input() set disabled(v: boolean | string) { this._disabled = v === true || v === 'true' || (v as any) === ''; }
  get disabled() { return this._disabled; }
  private _disabled = false;

  @Input() set readonly(v: boolean | string) { this._readonly = v === true || v === 'true' || (v as any) === ''; }
  get readonly() { return this._readonly; }
  private _readonly = false;

  @Input() set required(v: boolean | string) { this._required = v === true || v === 'true' || (v as any) === ''; }
  get required() { return this._required; }
  private _required = false;

  @Input() set showCount(v: boolean | string) { this._showCount = v === true || v === 'true' || (v as any) === ''; }
  get showCount() { return this._showCount; }
  private _showCount = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() inputChange = new EventEmitter<string>();
  @Output() blurred     = new EventEmitter<void>();

  innerValue = '';
  isFocused  = false;

  private onChangeFn: (v: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(public cdr: ChangeDetectorRef) {}

  writeValue(val: any): void { this.innerValue = val ?? ''; this.cdr.markForCheck(); }
  registerOnChange(fn: any): void  { this.onChangeFn = fn; }
  registerOnTouched(fn: any): void { this.onTouchedFn = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; this.cdr.markForCheck(); }

  onInput(val: string): void {
    this.innerValue = val;
    this.onChangeFn(val);
    this.valueChange.emit(val);
    this.inputChange.emit(val);
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouchedFn();
    this.blurred.emit();
    this.cdr.markForCheck();
  }
}
