import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgIf } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { FormSize, InputType } from '../../models/form.model';
import { PuiCustomCssDirective } from '../../pui-custom-css.directive';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-input',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PuiInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PuiInputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class PuiInputComponent implements ControlValueAccessor, Validator {
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() size: FormSize = 'md';
  @Input() error = '';
  @Input() hint = '';
  @Input() prefixIcon = '';
  @Input() suffixIcon = '';
  @Input() autocomplete = 'off';

  @Input() pattern = '';

  @Input() set validateEmail(v: boolean | string | undefined) {
    this._validateEmailExplicit =
      v === undefined ? undefined : v === true || v === 'true' || (v as unknown) === '';
  }
  get validateEmail(): boolean {
    return this._validateEmailExplicit ?? this.type === 'email';
  }
  private _validateEmailExplicit: boolean | undefined;

  @Input() set minLength(v: number | string | null) {
    this._minLength = v === null || v === '' ? null : Number(v);
  }
  get minLength(): number | null {
    return this._minLength;
  }
  private _minLength: number | null = null;

  @Input() set noNumbers(v: boolean | string) {
    this._noNumbers = v === true || v === 'true' || (v as unknown) === '';
  }
  get noNumbers(): boolean {
    return this._noNumbers;
  }
  private _noNumbers = false;

  @Input() set noSpaces(v: boolean | string) {
    this._noSpaces = v === true || v === 'true' || (v as unknown) === '';
  }
  get noSpaces(): boolean {
    return this._noSpaces;
  }
  private _noSpaces = false;

  @Input() set lettersOnly(v: boolean | string) {
    this._lettersOnly = v === true || v === 'true' || (v as unknown) === '';
  }
  get lettersOnly(): boolean {
    return this._lettersOnly;
  }
  private _lettersOnly = false;

  @Input() textCase: 'upper' | 'lower' | 'any' = 'any';

  @Input() set disabled(v: boolean | string) {
    this._disabled = v === true || v === 'true' || (v as any) === '';
  }
  get disabled() {
    return this._disabled;
  }
  private _disabled = false;

  @Input() set readonly(v: boolean | string) {
    this._readonly = v === true || v === 'true' || (v as any) === '';
  }
  get readonly() {
    return this._readonly;
  }
  private _readonly = false;

  @Input() set required(v: boolean | string) {
    this._required = v === true || v === 'true' || (v as any) === '';
  }
  get required() {
    return this._required;
  }
  private _required = false;

  @Input() set showCount(v: boolean | string) {
    this._showCount = v === true || v === 'true' || (v as any) === '';
  }
  get showCount() {
    return this._showCount;
  }
  private _showCount = false;

  @Input() set clearable(v: boolean | string) {
    this._clearable = v === true || v === 'true' || (v as any) === '';
  }
  get clearable() {
    return this._clearable;
  }
  private _clearable = false;

  @Input() set maxLength(v: number | string | null) {
    this._maxLength = v === null || v === '' ? null : Number(v);
  }
  get maxLength() {
    return this._maxLength;
  }
  private _maxLength: number | null = null;

  @Output() valueChange = new EventEmitter<string>();
  @Output() inputChange = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();

  @Output() validityChange = new EventEmitter<boolean>();

  innerValue = '';
  isFocused = false;
  showPass = false;
  private hasBlurred = false;
  private lastEmittedValid: boolean | null = null;

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};
  private onValidatorChange: () => void = () => {};

  writeValue(val: any): void {
    this.innerValue = val ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(d: boolean): void {
    this.disabled = d;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.computeErrors(control.value ?? this.innerValue);
  }
  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  private computeErrors(value: string): ValidationErrors | null {
    if (!value) return null;
    const errors: ValidationErrors = {};

    if (this.minLength !== null && value.length < this.minLength) {
      errors['minlength'] = { requiredLength: this.minLength, actualLength: value.length };
    }
    if (this.noNumbers && /[0-9]/.test(value)) {
      errors['noNumbers'] = true;
    }
    if (this.noSpaces && /\s/.test(value)) {
      errors['noSpaces'] = true;
    }
    if (this.lettersOnly && !/^[A-Za-z]+$/.test(value)) {
      errors['lettersOnly'] = true;
    }
    if (this.textCase === 'upper' && value !== value.toUpperCase()) {
      errors['textCase'] = 'upper';
    }
    if (this.textCase === 'lower' && value !== value.toLowerCase()) {
      errors['textCase'] = 'lower';
    }
    if (this.pattern) {
      let re: RegExp;
      try {
        re = new RegExp(this.pattern);
      } catch {
        re = /.^/;
      }
      if (!re.test(value))
        errors['pattern'] = { requiredPattern: this.pattern, actualValue: value };
    }
    if (this.validateEmail && !EMAIL_RE.test(value)) {
      errors['email'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  get displayError(): string {
    if (this.error) return this.error;
    if (!this.hasBlurred) return '';
    const errs = this.computeErrors(this.innerValue);
    if (!errs) return '';

    if (errs['email']) return 'Enter a valid email address.';

    const missing: string[] = [];
    if (errs['minlength']) missing.push(`at least ${errs['minlength'].requiredLength} characters`);
    if (errs['lettersOnly']) missing.push('letters only (no numbers, symbols, or spaces)');
    if (errs['noNumbers'] && !errs['lettersOnly']) missing.push('no numbers');
    if (errs['noSpaces'] && !errs['lettersOnly']) missing.push('no spaces');
    if (errs['textCase'] === 'upper') missing.push('uppercase letters only');
    if (errs['textCase'] === 'lower') missing.push('lowercase letters only');
    if (missing.length) return `Must have ${missing.join(', ')}.`;

    if (errs['pattern']) return "This value doesn't match the required format.";
    return '';
  }

  get describedBy(): string | null {
    if (this.displayError) return 'pui-input-error';
    if (this.hint) return 'pui-input-hint';
    return null;
  }

  private emitValidity(): void {
    const valid = !this.computeErrors(this.innerValue);
    if (valid !== this.lastEmittedValid) {
      this.lastEmittedValid = valid;
      this.validityChange.emit(valid);
    }
  }

  onInput(val: string): void {
    this.innerValue = val;
    this.onChange(val);
    this.valueChange.emit(val);
    this.inputChange.emit(val);
    this.onValidatorChange();
    this.emitValidity();
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.hasBlurred = true;
    this.onTouched();
    this.blurred.emit();
  }

  clear(e: MouseEvent): void {
    e.preventDefault();
    this.innerValue = '';
    this.onChange('');
    this.valueChange.emit('');
    this.onValidatorChange();
    this.emitValidity();
    this.inputEl?.nativeElement.focus();
  }

  togglePass(e: MouseEvent): void {
    e.preventDefault();
    this.showPass = !this.showPass;
  }
}
