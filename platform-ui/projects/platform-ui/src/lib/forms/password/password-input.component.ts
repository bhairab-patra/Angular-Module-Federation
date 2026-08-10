import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, inject

 , ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';

export type PasswordStrength = 'weak' | 'fair' | 'strong' | 'very-strong';

@Component({
  selector: 'pui-lib-password-input',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PuiPasswordInputComponent {
  cdr = inject(ChangeDetectorRef);

  /* -- State -------------------------------- */
  show    = false;
  focused = false;
  copied  = false;

  _value        = '';
  _placeholder  = 'Enter password';
  _disabled     = false;
  _showStrength = false;
  _showRules    = false;
  _copyable     = false;
  _minLength    = 8;
  _requireUpper   = false;
  _requireNumber  = false;
  _requireSpecial = false;
  _autocomplete   = 'current-password';
  _error = '';
  _hint  = '';

  /* -- Inputs ------------------------------- */
  @Input() set value(v: string)            { this._value = v || ''; }
  @Input() set placeholder(v: string)      { this._placeholder = v; }
  @Input() set disabled(v: boolean | string)      { this._disabled = this._bool(v); }
  @Input() set showStrength(v: boolean | string)  { this._showStrength = this._bool(v); }
  @Input() set showRules(v: boolean | string)     { this._showRules = this._bool(v); }
  @Input() set copyable(v: boolean | string)      { this._copyable = this._bool(v); }
  @Input() set requireUpper(v: boolean | string)  { this._requireUpper = this._bool(v); }
  @Input() set requireNumber(v: boolean | string) { this._requireNumber = this._bool(v); }
  @Input() set requireSpecial(v: boolean | string){ this._requireSpecial = this._bool(v); }
  @Input() set minLength(v: number | string)      { this._minLength = Number(v) || 8; }
  @Input() set autocomplete(v: string)     { this._autocomplete = v; }
  @Input() set error(v: string)            { this._error = v; }
  @Input() set hint(v: string)             { this._hint  = v; }

  /* -- Outputs ------------------------------ */
  @Output() valueChange = new EventEmitter<string>();
  @Output() change      = new EventEmitter<string>();
  @Output() strengthChange = new EventEmitter<PasswordStrength>();

  /* -- Derived ------------------------------ */
  get hasUpper()   { return /[A-Z]/.test(this._value); }
  get hasNumber()  { return /\d/.test(this._value); }
  get hasSpecial() { return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(this._value); }

  get strength(): PasswordStrength {
    if (!this._value) return 'weak';
    let score = 0;
    if (this._value.length >= 8)  score++;
    if (this._value.length >= 12) score++;
    if (this.hasUpper)   score++;
    if (this.hasNumber)  score++;
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

  /* -- Handlers ----------------------------- */
  onInput(v: string) {
    this._value = v;
    this.valueChange.emit(v);
    this.change.emit(v);
    this.strengthChange.emit(this.strength);
    this.cdr.markForCheck();
  }

  copyValue() {
    navigator.clipboard.writeText(this._value).then(() => {
      this.copied = true;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = false; this.cdr.markForCheck(); }, 2000);
    });
  }

  private _bool(v: boolean | string): boolean {
    return v === true || v === 'true' || (v as any) === '';
  }
}
