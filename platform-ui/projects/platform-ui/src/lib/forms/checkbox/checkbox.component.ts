import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'pui-checkbox',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiCheckboxComponent),
    multi: true,
  }],
  template: `
    <label class="pui-cb" [class.pui-cb--disabled]="disabled" [class.pui-cb--error]="error">

      <span class="pui-cb__box"
            [class.pui-cb__box--checked]="checked"
            [class.pui-cb__box--indeterminate]="indeterminate && !checked"
            [class.pui-cb__box--disabled]="disabled"
            [class.pui-cb__box--error]="error">
        <input type="checkbox"
               class="pui-cb__native"
               [checked]="checked"
               [disabled]="disabled"
               [indeterminate]="indeterminate && !checked"
               (change)="toggle($event)"/>
        <!-- Check icon -->
        <svg *ngIf="checked && !indeterminate" class="pui-cb__check"
             width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <!-- Indeterminate -->
        <svg *ngIf="indeterminate && !checked" class="pui-cb__check"
             width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6h7" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>

      <span *ngIf="label" class="pui-cb__label">
        {{ label }}
        <span *ngIf="required" class="pui-cb__req">*</span>
      </span>
    </label>

    <span *ngIf="hint && !error" class="pui-field__hint">{{ hint }}</span>
    <span *ngIf="error" class="pui-field__error">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" fill="#ef4444"/>
        <path d="M8 5v3M8 10.5h.01" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
      </svg>
      {{ error }}
    </span>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; gap: 4px; }

    .pui-cb {
      display: inline-flex; align-items: center; gap: 9px;
      cursor: pointer; user-select: none;
    }
    .pui-cb--disabled { cursor: not-allowed; }

    /* Box */
    .pui-cb__box {
      position: relative; width: 18px; height: 18px; flex-shrink: 0;
      border: 1.8px solid #d1d5db; border-radius: 5px;
      background: #fff; display: flex; align-items: center; justify-content: center;
      transition: border-color .15s, background .15s, box-shadow .15s;
    }
    .pui-cb__box:hover:not(.pui-cb__box--disabled) { border-color: #12C6A8; }
    .pui-cb__box--checked { background: #12C6A8 !important; border-color: #12C6A8 !important; }
    .pui-cb__box--indeterminate { background: #12C6A8 !important; border-color: #12C6A8 !important; }
    .pui-cb__box--error { border-color: #ef4444 !important; }
    .pui-cb__box--error.pui-cb__box--checked { background: #ef4444 !important; }
    .pui-cb__box--disabled { background: #f3f4f6 !important; border-color: #e5e7eb !important; }

    /* Focus ring via child input */
    .pui-cb__box:focus-within {
      box-shadow: 0 0 0 3px rgba(18,198,168,.18);
    }

    .pui-cb__native {
      position: absolute; opacity: 0; width: 100%; height: 100%;
      margin: 0; cursor: inherit;
    }
    .pui-cb__check { pointer-events: none; position: relative; z-index: 1; }

    /* Label */
    .pui-cb__label { font-size: 14px; color: #374151; font-family: 'Poppins', system-ui, sans-serif; }
    .pui-cb--disabled .pui-cb__label { color: #9ca3af; }
    .pui-cb__req { color: #ef4444; margin-left: 2px; }

    .pui-field__hint  { font-size: 11px; color: #6b7280; font-family: 'Poppins', system-ui, sans-serif; padding-left: 27px; }
    .pui-field__error {
      display: flex; align-items: center; gap: 5px;
      font-size: 11px; color: #ef4444; font-weight: 500;
      font-family: 'Poppins', system-ui, sans-serif; padding-left: 27px;
    }
  `],
})
export class PuiCheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() error = '';
  @Input() hint  = '';

  @Input() set checked(v: boolean | string) { this._checked = v === true || v === 'true' || (v as any) === ''; }
  get checked() { return this._checked; }
  private _checked = false;

  @Input() set indeterminate(v: boolean | string) { this._indeterminate = v === true || v === 'true' || (v as any) === ''; }
  get indeterminate() { return this._indeterminate; }
  private _indeterminate = false;

  @Input() set disabled(v: boolean | string) { this._disabled = v === true || v === 'true' || (v as any) === ''; }
  get disabled() { return this._disabled; }
  private _disabled = false;

  @Input() set required(v: boolean | string) { this._required = v === true || v === 'true' || (v as any) === ''; }
  get required() { return this._required; }
  private _required = false;

  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() changed       = new EventEmitter<boolean>();

  private onChangeFn: (v: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(val: any): void { this._checked = !!val; this.cdr.markForCheck(); }
  registerOnChange(fn: any): void  { this.onChangeFn = fn; }
  registerOnTouched(fn: any): void { this.onTouchedFn = fn; }
  setDisabledState(d: boolean): void { this._disabled = d; this.cdr.markForCheck(); }

  toggle(e: Event): void {
    if (this._disabled) return;
    this._checked = (e.target as HTMLInputElement).checked;
    this.onChangeFn(this._checked);
    this.onTouchedFn();
    this.checkedChange.emit(this._checked);
    this.changed.emit(this._checked);
    this.cdr.markForCheck();
  }
}
