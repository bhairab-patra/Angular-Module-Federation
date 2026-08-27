import {
  Component, Input, Output, EventEmitter, forwardRef,
  ViewChild, ElementRef, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { NgIf } from '@angular/common';
import {
  NG_VALUE_ACCESSOR, NG_VALIDATORS,
  ControlValueAccessor, Validator, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormSize, InputType } from '../../models/form.model';
import { PuiCustomCssDirective } from '../../pui-custom-css.directive';

// RFC-5322-ish, good-enough email check — same shape of check Angular's own
// Validators.email uses internally, kept local so this works standalone too
// (plain HTML / React usage has no Angular Validators to reach for).
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

  /** Consumer-supplied regex the value must match — e.g. pattern="^[0-9]{6}$"
   * for a 6-digit code. Applied both as live self-validation (so this
   * component shows its own error even outside Reactive Forms) and as an
   * Angular Validator (so formControlName="x" sees the same pattern error
   * Validators.pattern would produce). Empty string/undefined = no check.
   * For common cases (length, no digits, no spaces, letter case) reach for
   * minLength/noNumbers/noSpaces/lettersOnly/textCase below instead of
   * writing a regex by hand — pattern is the escape hatch for anything
   * those don't cover. */
  @Input() pattern: string = '';

  /** Turns on built-in email-format validation. Auto-enabled when
   * type="email" — set explicitly if you want email validation on a field
   * that isn't type="email" for some reason, or to force it off. */
  @Input() set validateEmail(v: boolean | string | undefined) {
    this._validateEmailExplicit = v === undefined ? undefined : (v === true || v === 'true' || (v as unknown) === '');
  }
  get validateEmail(): boolean {
    return this._validateEmailExplicit ?? (this.type === 'email');
  }
  private _validateEmailExplicit: boolean | undefined;

  /** Minimum character count — a real validator (unlike maxLength below,
   * which just caps what the user can physically type via the native
   * maxlength attribute). Produces the same {minlength:{requiredLength,
   * actualLength}} error shape Angular's own Validators.minLength does. */
  @Input() set minLength(v: number | string | null) {
    this._minLength = v === null || v === '' ? null : Number(v);
  }
  get minLength(): number | null { return this._minLength; }
  private _minLength: number | null = null;

  /** Rejects any digit 0-9 — e.g. for a name field. */
  @Input() set noNumbers(v: boolean | string) { this._noNumbers = v === true || v === 'true' || (v as unknown) === ''; }
  get noNumbers(): boolean { return this._noNumbers; }
  private _noNumbers = false;

  /** Rejects whitespace anywhere in the value — e.g. for a username or code. */
  @Input() set noSpaces(v: boolean | string) { this._noSpaces = v === true || v === 'true' || (v as unknown) === ''; }
  get noSpaces(): boolean { return this._noSpaces; }
  private _noSpaces = false;

  /** Only a-z/A-Z allowed — no digits, symbols, or spaces. Combine with
   * textCase if you also need to pin the letters to one case. */
  @Input() set lettersOnly(v: boolean | string) { this._lettersOnly = v === true || v === 'true' || (v as unknown) === ''; }
  get lettersOnly(): boolean { return this._lettersOnly; }
  private _lettersOnly = false;

  /** Requires every letter in the value to be a specific case. 'any'
   * (default) applies no case restriction at all. */
  @Input() textCase: 'upper' | 'lower' | 'any' = 'any';

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
  @Output() blurred = new EventEmitter<void>();
  /** Emits the field's own pattern/email validity whenever it changes —
   * fires even when there's no surrounding Angular form at all. */
  @Output() validityChange = new EventEmitter<boolean>();

  innerValue = '';
  isFocused = false;
  showPass = false;
  private hasBlurred = false;
  private lastEmittedValid: boolean | null = null;

  private onChange: (v: any) => void = () => { };
  private onTouched: () => void = () => { };
  private onValidatorChange: () => void = () => { };

  writeValue(val: any): void { this.innerValue = val ?? ''; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }

  /** Angular Validator hook — runs whenever the bound FormControl
   * revalidates, independent of this component's own blur-gated display. */
  validate(control: AbstractControl): ValidationErrors | null {
    return this.computeErrors(control.value ?? this.innerValue);
  }
  registerOnValidatorChange(fn: () => void): void { this.onValidatorChange = fn; }

  private computeErrors(value: string): ValidationErrors | null {
    if (!value) return null; // required (if any) is a separate, standard Validator
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
      try { re = new RegExp(this.pattern); } catch { re = /.^/; } // never matches on bad regex
      if (!re.test(value)) errors['pattern'] = { requiredPattern: this.pattern, actualValue: value };
    }
    if (this.validateEmail && !EMAIL_RE.test(value)) {
      errors['email'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  /** Internal message shown when the consumer hasn't passed their own
   * [error] — external error always wins. Only shows after blur, so it
   * doesn't flash red while the user is still mid-typing. Lists every
   * unmet rule at once (like pui-lib-password-input's rule list) rather
   * than stopping at the first one, since these rules are usually combined
   * — e.g. minLength + noNumbers + noSpaces + textCase all on one field. */
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

    if (errs['pattern']) return 'This value doesn\'t match the required format.';
    return '';
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

  onFocus(): void { this.isFocused = true; }

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
