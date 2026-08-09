import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormSize, InputType } from '../../models/form.model';

@Component({
  selector: 'pui-lib-input',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiInputComponent),
    multi: true,
  }],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class PuiInputComponent implements ControlValueAccessor {
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  @Input() label        = '';
  @Input() placeholder  = '';
  @Input() type: InputType = 'text';
  @Input() size: FormSize  = 'md';
  @Input() error        = '';
  @Input() hint         = '';
  @Input() prefixIcon   = '';
  @Input() suffixIcon   = '';
  @Input() autocomplete = 'off';

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

  @Input() set clearable(v: boolean | string) { this._clearable = v === true || v === 'true' || (v as any) === ''; }
  get clearable() { return this._clearable; }
  private _clearable = false;

  @Input() set maxLength(v: number | string | null) {
    this._maxLength = v === null || v === '' ? null : Number(v);
  }
  get maxLength() { return this._maxLength; }
  private _maxLength: number | null = null;

  @Output() valueChange = new EventEmitter<string>();
  @Output() inputChange = new EventEmitter<string>();
  @Output() blurred     = new EventEmitter<void>();

  innerValue = '';
  isFocused  = false;
  showPass   = false;

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(val: any): void {
    this.innerValue = val ?? '';
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any): void  { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; this.cdr.markForCheck(); }

  onInput(val: string): void {
    this.innerValue = val;
    this.onChange(val);
    this.valueChange.emit(val);
    this.inputChange.emit(val);
  }

  onFocus(): void {
    this.isFocused = true;
    this.cdr.markForCheck();
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
    this.blurred.emit();
    this.cdr.markForCheck();
  }

  clear(e: MouseEvent): void {
    e.preventDefault();
    this.innerValue = '';
    this.onChange('');
    this.valueChange.emit('');
    this.inputEl?.nativeElement.focus();
    this.cdr.markForCheck();
  }

  togglePass(e: MouseEvent): void {
    e.preventDefault();
    this.showPass = !this.showPass;
    this.cdr.markForCheck();
  }
}
