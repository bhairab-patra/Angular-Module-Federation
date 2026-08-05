import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormSize, SelectOption } from '../../models/form.model';

@Component({
  selector: 'pui-select',
  standalone: true,
  imports: [NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiSelectComponent),
    multi: true,
  }],
  template: `
    <div class="pui-field" [class.pui-field--error]="error" [class.pui-field--disabled]="disabled">

      <label *ngIf="label" class="pui-field__label">
        {{ label }}<span *ngIf="required" class="pui-field__req">*</span>
      </label>

      <div class="pui-select-wrap"
           [class.pui-select-wrap--sm]="size === 'sm'"
           [class.pui-select-wrap--lg]="size === 'lg'"
           [class.pui-select-wrap--error]="error"
           [class.pui-select-wrap--disabled]="disabled">

        <select class="pui-select"
                [disabled]="disabled"
                [value]="innerValue"
                (change)="onChange2($any($event.target).value)"
                (focus)="focused = true"
                (blur)="onBlur()">
          <option value="" disabled [selected]="!innerValue">{{ placeholder }}</option>
          <option *ngFor="let opt of options"
                  [value]="opt.value"
                  [disabled]="opt.disabled || false"
                  [selected]="innerValue === opt.value">
            {{ opt.label }}
          </option>
        </select>

        <!-- Chevron -->
        <span class="pui-select-wrap__arrow">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>

        <!-- Error icon -->
        <span *ngIf="error" class="pui-select-wrap__err-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#ef4444"/>
            <path d="M12 8v4M12 16h.01" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
      </div>

      <span *ngIf="hint && !error" class="pui-field__hint">{{ hint }}</span>
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
    .pui-field__label { font-size: 13px; font-weight: 600; color: #374151; font-family: 'Poppins', system-ui, sans-serif; }
    .pui-field__req   { color: #ef4444; margin-left: 2px; }
    .pui-field__hint  { font-size: 11px; color: #6b7280; font-family: 'Poppins', system-ui, sans-serif; }
    .pui-field__error {
      display: flex; align-items: center; gap: 5px;
      font-size: 11px; color: #ef4444; font-weight: 500;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .pui-field--disabled .pui-field__label { color: #9ca3af; }

    .pui-select-wrap {
      position: relative; display: flex; align-items: center;
      border: 1.5px solid #d1d5db; border-radius: 9px; background: #fff;
      transition: border-color .15s, box-shadow .15s;
      height: 42px;
    }
    .pui-select-wrap--sm { height: 34px; border-radius: 7px; }
    .pui-select-wrap--lg { height: 50px; border-radius: 11px; }
    .pui-select-wrap:hover:not(.pui-select-wrap--disabled):not(.pui-select-wrap--error) { border-color: #9ca3af; }
    .pui-select-wrap:focus-within:not(.pui-select-wrap--error) {
      border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.14);
    }
    .pui-select-wrap--error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,.1); }
    .pui-select-wrap--disabled { background: #f9fafb; }

    .pui-select {
      flex: 1; border: none; outline: none; background: transparent;
      font-size: 14px; color: #111827; font-family: 'Poppins', system-ui, sans-serif;
      padding: 0 36px 0 12px; height: 100%; width: 100%;
      appearance: none; -webkit-appearance: none; cursor: pointer;
    }
    .pui-select:disabled { cursor: not-allowed; color: #9ca3af; }
    .pui-select-wrap--sm .pui-select { padding: 0 32px 0 10px; font-size: 13px; }
    .pui-select-wrap--lg .pui-select { padding: 0 40px 0 16px; font-size: 15px; }

    .pui-select-wrap__arrow {
      position: absolute; right: 10px; pointer-events: none;
      color: #6b7280; display: flex; align-items: center;
    }
    .pui-select-wrap__err-icon {
      position: absolute; right: 30px; pointer-events: none;
      display: flex; align-items: center;
    }
  `],
})
export class PuiSelectComponent implements ControlValueAccessor {
  @Input() label       = '';
  @Input() placeholder = 'Select an option';
  @Input() options: SelectOption[] = [];
  @Input() size: FormSize = 'md';
  @Input() disabled    = false;
  @Input() required    = false;
  @Input() error       = '';
  @Input() hint        = '';

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
