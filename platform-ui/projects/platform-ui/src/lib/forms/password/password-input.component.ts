import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, inject
} from '@angular/core';
import { NgIf } from '@angular/common';

export type PasswordStrength = 'weak' | 'fair' | 'strong' | 'very-strong';

@Component({
  selector: 'pui-password-input',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="pui-pw-host"
     [class.pui-pw--disabled]="_disabled"
     [class.pui-pw--error]="_error">

  <!-- Input row -->
  <div class="pui-pw-field">
    <input
      class="pui-pw-input"
      [type]="show ? 'text' : 'password'"
      [value]="_value"
      [disabled]="_disabled || null"
      [placeholder]="_placeholder"
      [attr.autocomplete]="_autocomplete"
      (input)="onInput($any($event.target).value)"
      (focus)="focused=true; cdr.markForCheck()"
      (blur)="focused=false; cdr.markForCheck()">

    <!-- Actions -->
    <div class="pui-pw-actions">

      <!-- Copy -->
      <button *ngIf="_copyable && _value"
              class="pui-pw-btn"
              type="button"
              [title]="copied ? 'Copied!' : 'Copy password'"
              (click)="copyValue()">
        <svg *ngIf="!copied" viewBox="0 0 20 20" fill="none" width="16" height="16">
          <rect x="7" y="7" width="9" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/>
          <path d="M13 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h2"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <svg *ngIf="copied" viewBox="0 0 20 20" fill="none" width="16" height="16">
          <path d="M5 10l4 4 6-7" stroke="#22c55e" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Show / Hide toggle -->
      <button class="pui-pw-btn"
              type="button"
              [title]="show ? 'Hide password' : 'Show password'"
              (click)="show = !show; cdr.markForCheck()">
        <!-- Eye open -->
        <svg *ngIf="!show" viewBox="0 0 20 20" fill="none" width="18" height="18">
          <path d="M1.5 10S5 4 10 4s8.5 6 8.5 6-3.5 6-8.5 6S1.5 10 1.5 10z"
                stroke="currentColor" stroke-width="1.5"/>
          <circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <!-- Eye closed -->
        <svg *ngIf="show" viewBox="0 0 20 20" fill="none" width="18" height="18">
          <path d="M3 3l14 14M8.5 8.5A2.5 2.5 0 0011.5 11.5"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M6.5 6.5C4.5 7.7 2.5 9.5 1.5 10c1 1.5 4.5 6 8.5 6 1.5 0 2.9-.5 4-1.2"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M13.5 13.5C15.5 12.3 17.5 10.5 18.5 10 17.5 8.5 14 4 10 4c-1.5 0-2.9.5-4 1.2"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Strength meter -->
  <ng-container *ngIf="_showStrength && _value">
    <div class="pui-pw-strength-bar">
      <span class="pui-pw-bar-seg" [class]="'pui-pw-bar-seg--' + strengthLevel(0)"></span>
      <span class="pui-pw-bar-seg" [class]="'pui-pw-bar-seg--' + strengthLevel(1)"></span>
      <span class="pui-pw-bar-seg" [class]="'pui-pw-bar-seg--' + strengthLevel(2)"></span>
      <span class="pui-pw-bar-seg" [class]="'pui-pw-bar-seg--' + strengthLevel(3)"></span>
    </div>
    <div class="pui-pw-strength-label" [class]="'pui-pw-label--' + strength">
      {{ strengthLabel }}
    </div>
  </ng-container>

  <!-- Rules hints -->
  <ng-container *ngIf="_showRules && focused && _value">
    <ul class="pui-pw-rules">
      <li *ngIf="_minLength > 0" class="pui-pw-rule" [class.pui-pw-rule--ok]="_value.length >= _minLength">
        <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" stroke-width="1"/>
          <path *ngIf="_value.length >= _minLength" d="M3 6l2 2 4-3"
                stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
        At least {{ _minLength }} characters
      </li>
      <li *ngIf="_requireUpper" class="pui-pw-rule" [class.pui-pw-rule--ok]="hasUpper">
        <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" stroke-width="1"/>
          <path *ngIf="hasUpper" d="M3 6l2 2 4-3"
                stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
        One uppercase letter
      </li>
      <li *ngIf="_requireNumber" class="pui-pw-rule" [class.pui-pw-rule--ok]="hasNumber">
        <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" stroke-width="1"/>
          <path *ngIf="hasNumber" d="M3 6l2 2 4-3"
                stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
        One number
      </li>
      <li *ngIf="_requireSpecial" class="pui-pw-rule" [class.pui-pw-rule--ok]="hasSpecial">
        <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" stroke-width="1"/>
          <path *ngIf="hasSpecial" d="M3 6l2 2 4-3"
                stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
        One special character
      </li>
    </ul>
  </ng-container>

  <!-- Error / hint -->
  <div *ngIf="_error" class="pui-pw-error-msg">{{ _error }}</div>
  <div *ngIf="_hint && !_error" class="pui-pw-hint">{{ _hint }}</div>

</div>
  `,
  styles: [`
    :host { display: block; }

    .pui-pw-host {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      font-size: 13.5px;
    }
    .pui-pw--disabled { opacity: .5; pointer-events: none; }

    /* ── Field ────────────────────────────── */
    .pui-pw-field {
      position: relative; display: flex; align-items: center;
    }
    .pui-pw-input {
      width: 100%; height: 42px; padding: 0 88px 0 13px;
      border: 1.5px solid #e5e7eb; border-radius: 10px;
      font-size: 13.5px; font-family: inherit; color: #111827;
      background: #fff; outline: none;
      transition: border-color .15s, box-shadow .15s;
      box-sizing: border-box;
    }
    .pui-pw-input::placeholder { color: #9ca3af; }
    .pui-pw-input:focus {
      border-color: #12C6A8;
      box-shadow: 0 0 0 3px rgba(18,198,168,.14);
    }
    .pui-pw--error .pui-pw-input { border-color: #ef4444; }
    .pui-pw--error .pui-pw-input:focus {
      box-shadow: 0 0 0 3px rgba(239,68,68,.14);
    }

    .pui-pw-actions {
      position: absolute; right: 8px;
      display: flex; align-items: center; gap: 2px;
    }
    .pui-pw-btn {
      display: flex; align-items: center; justify-content: center;
      width: 30px; height: 30px; border-radius: 7px;
      background: none; border: none; cursor: pointer;
      color: #9ca3af; transition: background .1s, color .1s;
    }
    .pui-pw-btn:hover { background: #f3f4f6; color: #374151; }

    /* ── Strength bar ─────────────────────── */
    .pui-pw-strength-bar {
      display: flex; gap: 4px; margin-top: 8px;
    }
    .pui-pw-bar-seg {
      flex: 1; height: 4px; border-radius: 99px;
      background: #e5e7eb; transition: background .25s;
    }
    .pui-pw-bar-seg--active-weak    { background: #ef4444; }
    .pui-pw-bar-seg--active-fair    { background: #f97316; }
    .pui-pw-bar-seg--active-strong  { background: #eab308; }
    .pui-pw-bar-seg--active-very-strong { background: #22c55e; }

    .pui-pw-strength-label {
      font-size: 11.5px; font-weight: 600; margin-top: 4px;
    }
    .pui-pw-label--weak        { color: #ef4444; }
    .pui-pw-label--fair        { color: #f97316; }
    .pui-pw-label--strong      { color: #eab308; }
    .pui-pw-label--very-strong { color: #22c55e; }

    /* ── Rules ────────────────────────────── */
    .pui-pw-rules {
      list-style: none; margin: 8px 0 0; padding: 0;
      display: flex; flex-direction: column; gap: 4px;
    }
    .pui-pw-rule {
      display: flex; align-items: center; gap: 5px;
      font-size: 12px; color: #9ca3af;
      transition: color .15s;
    }
    .pui-pw-rule svg { flex-shrink: 0; }
    .pui-pw-rule--ok { color: #22c55e; }

    /* Messages */
    .pui-pw-error-msg { font-size: 12px; color: #ef4444; margin-top: 4px; }
    .pui-pw-hint      { font-size: 12px; color: #9ca3af; margin-top: 4px; }
  `],
})
export class PuiPasswordInputComponent {
  cdr = inject(ChangeDetectorRef);

  /* ── State ──────────────────────────────── */
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

  /* ── Inputs ─────────────────────────────── */
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

  /* ── Outputs ────────────────────────────── */
  @Output() valueChange = new EventEmitter<string>();
  @Output() change      = new EventEmitter<string>();
  @Output() strengthChange = new EventEmitter<PasswordStrength>();

  /* ── Derived ────────────────────────────── */
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

  /* ── Handlers ───────────────────────────── */
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
