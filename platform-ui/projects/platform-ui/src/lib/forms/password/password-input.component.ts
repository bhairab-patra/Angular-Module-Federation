import {
  Component, Input, Output, EventEmitter, forwardRef,
  ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { NgIf } from '@angular/common';
import {
  NG_VALUE_ACCESSOR, NG_VALIDATORS,
  ControlValueAccessor, Validator, AbstractControl, ValidationErrors
} from '@angular/forms';
import { PuiCustomCssDirective } from '../../pui-custom-css.directive';
import { FormSize } from '../../models/form.model';

export type PasswordStrength = 'weak' | 'fair' | 'strong' | 'very-strong';

const SPECIAL_RE = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-password-input',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PuiPasswordInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PuiPasswordInputComponent),
      multi: true,
    },
  ],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PuiPasswordInputComponent implements ControlValueAccessor, Validator {

  show = false;
  focused = false;
  copied = false;

  _value = '';
  _placeholder = 'Enter password';
  _disabled = false;
  _showStrength = false;
  _showRules = false;
  _copyable = false;
  _size: FormSize = 'md';

  @Input() set size(v: FormSize | string) {
    this._size = (['sm', 'md', 'lg'].includes(v as FormSize) ? v as FormSize : 'md');
  }
  get size(): FormSize { return this._size; }
  _minLength = 8;
  _requireUpper = false;
  _requireNumber = false;
  _requireSpecial = false;
  _autocomplete = 'current-password';
  _error = '';
  _hint = '';

  /** Plain property binding — [value]="x" without Reactive Forms. Kept
   * alongside writeValue() below (the Reactive Forms entry point) so both
   * usage styles keep working. */
  @Input() set value(v: string) { this._value = v || ''; }
  @Input() set placeholder(v: string) { this._placeholder = v; }
  @Input() set disabled(v: boolean | string) { this._disabled = this._bool(v); }
  @Input() set showStrength(v: boolean | string) { this._showStrength = this._bool(v); }
  @Input() set showRules(v: boolean | string) { this._showRules = this._bool(v); }
  @Input() set copyable(v: boolean | string) { this._copyable = this._bool(v); }
  @Input() set requireUpper(v: boolean | string) { this._requireUpper = this._bool(v); }
  @Input() set requireNumber(v: boolean | string) { this._requireNumber = this._bool(v); }
  @Input() set requireSpecial(v: boolean | string) { this._requireSpecial = this._bool(v); }
  @Input() set minLength(v: number | string) { this._minLength = Number(v) || 8; }
  @Input() set autocomplete(v: string) { this._autocomplete = v; }
  @Input() set error(v: string) { this._error = v; }
  @Input() set hint(v: string) { this._hint = v; }

  @Output() valueChange = new EventEmitter<string>();
  @Output() change = new EventEmitter<string>();
  @Output() strengthChange = new EventEmitter<PasswordStrength>();

  get hasUpper() { return /[A-Z]/.test(this._value); }
  get hasNumber() { return /\d/.test(this._value); }
  get hasSpecial() { return SPECIAL_RE.test(this._value); }

  get strength(): PasswordStrength {
    if (!this._value) return 'weak';
    let score = 0;
    if (this._value.length >= 8) score++;
    if (this._value.length >= 12) score++;
    if (this.hasUpper) score++;
    if (this.hasNumber) score++;
    if (this.hasSpecial) score++;
    if (score <= 1) return 'weak';
    if (score <= 2) return 'fair';
    if (score <= 3) return 'strong';
    return 'very-strong';
  }

  get strengthLabel(): string {
    return { weak: 'Weak', fair: 'Fair', strong: 'Strong', 'very-strong': 'Very strong' }[this.strength];
  }

  strengthLevel(index: number): string {
    const map: Record<PasswordStrength, number> = { weak: 1, fair: 2, strong: 3, 'very-strong': 4 };
    return index < map[this.strength] ? `active-${this.strength}` : '';
  }

  private hasBlurred = false;
  private onChangeFn: (v: string) => void = () => { };
  private onTouchedFn: () => void = () => { };
  private onValidatorChange: () => void = () => { };

  writeValue(val: any): void { this._value = val ?? ''; }
  registerOnChange(fn: any): void { this.onChangeFn = fn; }
  registerOnTouched(fn: any): void { this.onTouchedFn = fn; }
  setDisabledState(d: boolean): void { this._disabled = d; }
  registerOnValidatorChange(fn: () => void): void { this.onValidatorChange = fn; }

  /** Angular Validator hook — the same minLength/requireUpper/requireNumber/
   * requireSpecial rules the rule-list UI already shows are now enforced as
   * a real Validator, so formControlName sees them in form.get('x').errors
   * instead of them being purely cosmetic. */
  validate(control: AbstractControl): ValidationErrors | null {
    return this.computeErrors(control.value ?? this._value);
  }

  private computeErrors(value: string): ValidationErrors | null {
    if (!value) return null; // required (if any) is a separate, standard Validator
    const missing: string[] = [];
    if (value.length < this._minLength) missing.push(`at least ${this._minLength} characters`);
    if (this._requireUpper && !/[A-Z]/.test(value)) missing.push('one uppercase letter');
    if (this._requireNumber && !/[0-9]/.test(value)) missing.push('one number');
    if (this._requireSpecial && !SPECIAL_RE.test(value)) missing.push('one special character');
    return missing.length
      ? { passwordStrength: `Password needs ${missing.join(', ')}.` }
      : null;
  }

  /** Internal message shown when the consumer hasn't passed their own
   * [error] — external error always wins. Only shows after blur. */
  get displayError(): string {
    if (this._error) return this._error;
    if (!this.hasBlurred) return '';
    const errs = this.computeErrors(this._value);
    return errs ? (errs['passwordStrength'] as string) : '';
  }

  onInput(v: string) {
    this._value = v;
    this.onChangeFn(v);
    this.valueChange.emit(v);
    this.change.emit(v);
    this.strengthChange.emit(this.strength);
    this.onValidatorChange();
  }

  onFocus(): void { this.focused = true; }

  onBlur(): void {
    this.focused = false;
    this.hasBlurred = true;
    this.onTouchedFn();
  }

  copyValue() {
    navigator.clipboard.writeText(this._value).then(() => {
      this.copied = true;
    });
  }

  private _bool(v: boolean | string): boolean {
    return v === true || v === 'true' || (v as any) === '';
  }
}
