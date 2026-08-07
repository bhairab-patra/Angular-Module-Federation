import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef
} from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormSize, InputType } from '../../models/form.model';

@Component({
  selector: 'pui-input',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiInputComponent),
    multi: true,
  }],
  template: `
    <div class="pui-field" [class.pui-field--error]="error" [class.pui-field--disabled]="disabled">

      <!-- Label -->
      <label *ngIf="label" class="pui-field__label">
        {{ label }}
        <span *ngIf="required" class="pui-field__req">*</span>
      </label>

      <!-- Input wrapper -->
      <div class="pui-input-wrap"
           [class.pui-input-wrap--sm]="size === 'sm'"
           [class.pui-input-wrap--lg]="size === 'lg'"
           [class.pui-input-wrap--focus]="isFocused"
           [class.pui-input-wrap--error]="error"
           [class.pui-input-wrap--disabled]="disabled"
           [class.pui-input-wrap--readonly]="readonly">

        <!-- Prefix icon -->
        <span *ngIf="prefixIcon" class="pui-input-wrap__icon pui-input-wrap__icon--pre"
              [innerHTML]="prefixIcon"></span>

        <!-- Native input -->
        <input #inputEl
               class="pui-input"
               [type]="showPass ? 'text' : type"
               [placeholder]="placeholder"
               [disabled]="disabled"
               [readOnly]="readonly"
               [value]="innerValue"
               [attr.maxlength]="maxLength || null"
               [attr.autocomplete]="autocomplete"
               (input)="onInput($any($event.target).value)"
               (blur)="onBlur()"
               (focus)="onFocus()"/>

        <!-- Character count -->
        <span *ngIf="showCount && maxLength" class="pui-input-wrap__count">
          {{ (innerValue || '').length }}/{{ maxLength }}
        </span>

        <!-- Clear button -->
        <button *ngIf="clearable && innerValue && !disabled && !readonly"
                class="pui-input-wrap__action"
                type="button"
                tabindex="-1"
                (mousedown)="clear($event)">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Password toggle -->
        <button *ngIf="type === 'password' && !disabled"
                class="pui-input-wrap__action"
                type="button"
                tabindex="-1"
                (mousedown)="togglePass($event)">
          <svg *ngIf="!showPass" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <svg *ngIf="showPass" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
        </button>

        <!-- Suffix icon -->
        <span *ngIf="suffixIcon && type !== 'password'" class="pui-input-wrap__icon pui-input-wrap__icon--suf"
              [innerHTML]="suffixIcon"></span>

        <!-- Error icon -->
        <span *ngIf="error" class="pui-input-wrap__icon pui-input-wrap__icon--err">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#ef4444"/>
            <path d="M12 8v4M12 16h.01" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
      </div>

      <!-- Hint -->
      <span *ngIf="hint && !error" class="pui-field__hint">{{ hint }}</span>

      <!-- Error message -->
      <span *ngIf="error" class="pui-field__error">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" fill="#ef4444"/>
          <path d="M8 5v3M8 10.5h.01" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
        {{ error }}
      </span>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .pui-field { display: flex; flex-direction: column; gap: 5px; }

    /* Label */
    .pui-field__label {
      font-size: 13px; font-weight: 600; color: #374151;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .pui-field__req { color: #ef4444; margin-left: 2px; }

    /* Wrapper */
    .pui-input-wrap {
      position: relative; display: flex; align-items: center;
      border: 1.5px solid #d1d5db; border-radius: 9px;
      background: #fff; transition: border-color .15s, box-shadow .15s;
      padding: 0 12px; height: 42px;
    }
    .pui-input-wrap--sm { height: 34px; border-radius: 7px; padding: 0 10px; }
    .pui-input-wrap--lg { height: 50px; border-radius: 11px; padding: 0 16px; }
    .pui-input-wrap:hover:not(.pui-input-wrap--disabled):not(.pui-input-wrap--focus):not(.pui-input-wrap--error) {
      border-color: #9ca3af;
    }
    .pui-input-wrap--focus:not(.pui-input-wrap--error) {
      border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.14);
    }
    .pui-input-wrap--error {
      border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,.1);
    }
    .pui-input-wrap--disabled { background: #f9fafb; cursor: not-allowed; }
    .pui-input-wrap--readonly { background: #fafbfc; }

    /* Native input */
    .pui-input {
      flex: 1; border: none; outline: none; background: transparent;
      font-size: 14px; color: #111827; font-family: 'Poppins', system-ui, sans-serif;
      min-width: 0; padding: 0;
    }
    .pui-input::placeholder { color: #9ca3af; }
    .pui-input:disabled { cursor: not-allowed; color: #9ca3af; }

    /* Icons */
    .pui-input-wrap__icon {
      display: flex; align-items: center; flex-shrink: 0;
      color: #9ca3af;
    }
    .pui-input-wrap__icon--pre { margin-right: 8px; }
    .pui-input-wrap__icon--suf { margin-left: 8px; }
    .pui-input-wrap__icon--err { margin-left: 6px; }
    .pui-input-wrap__icon svg { display: block; }

    /* Count */
    .pui-input-wrap__count {
      font-size: 11px; color: #9ca3af; flex-shrink: 0; margin-left: 6px;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* Action buttons (clear / eye) */
    .pui-input-wrap__action {
      background: none; border: none; cursor: pointer; padding: 3px;
      color: #9ca3af; display: flex; align-items: center; margin-left: 4px;
      border-radius: 4px; transition: color .12s, background .12s;
    }
    .pui-input-wrap__action:hover { color: #374151; background: #f3f4f6; }

    /* Hint & Error */
    .pui-field__hint  { font-size: 11px; color: #6b7280; font-family: 'Poppins', system-ui, sans-serif; }
    .pui-field__error {
      display: flex; align-items: center; gap: 5px;
      font-size: 11px; color: #ef4444; font-weight: 500;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    .pui-field--disabled .pui-field__label { color: #9ca3af; }
  `],
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
