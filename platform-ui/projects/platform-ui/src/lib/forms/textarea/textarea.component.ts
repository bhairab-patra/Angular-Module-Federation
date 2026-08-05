import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormSize } from '../../models/form.model';

@Component({
  selector: 'pui-textarea',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiTextareaComponent),
    multi: true,
  }],
  template: `
    <div class="pui-field" [class.pui-field--error]="error" [class.pui-field--disabled]="disabled">

      <label *ngIf="label" class="pui-field__label">
        {{ label }}<span *ngIf="required" class="pui-field__req">*</span>
      </label>

      <div class="pui-ta-wrap"
           [class.pui-ta-wrap--sm]="size === 'sm'"
           [class.pui-ta-wrap--lg]="size === 'lg'"
           [class.pui-ta-wrap--focus]="isFocused"
           [class.pui-ta-wrap--error]="error"
           [class.pui-ta-wrap--disabled]="disabled"
           [class.pui-ta-wrap--readonly]="readonly"
           [class.pui-ta-wrap--resize-none]="resize === 'none'"
           [class.pui-ta-wrap--resize-h]="resize === 'vertical'">

        <textarea
          class="pui-ta"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readOnly]="readonly"
          [rows]="rows"
          [attr.maxlength]="maxLength || null"
          [value]="innerValue"
          (input)="onInput($any($event.target).value)"
          (focus)="isFocused = true; cdr.markForCheck()"
          (blur)="onBlur()">
        </textarea>
      </div>

      <div class="pui-ta-footer">
        <span *ngIf="hint && !error" class="pui-field__hint">{{ hint }}</span>
        <span *ngIf="error" class="pui-field__error">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#ef4444"/>
            <path d="M8 5v3M8 10.5h.01" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
          {{ error }}
        </span>
        <span *ngIf="!hint && !error" style="flex:1"></span>
        <span *ngIf="showCount && maxLength" class="pui-ta-footer__count">
          {{ (innerValue || '').length }}/{{ maxLength }}
        </span>
      </div>
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

    .pui-ta-wrap {
      border: 1.5px solid #d1d5db; border-radius: 9px; background: #fff;
      transition: border-color .15s, box-shadow .15s; overflow: hidden;
      display: flex;
    }
    .pui-ta-wrap:hover:not(.pui-ta-wrap--disabled):not(.pui-ta-wrap--focus):not(.pui-ta-wrap--error) {
      border-color: #9ca3af;
    }
    .pui-ta-wrap--focus:not(.pui-ta-wrap--error) {
      border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.14);
    }
    .pui-ta-wrap--error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,.1); }
    .pui-ta-wrap--disabled { background: #f9fafb; }
    .pui-ta-wrap--readonly  { background: #fafbfc; }
    .pui-ta-wrap--resize-none .pui-ta { resize: none; }
    .pui-ta-wrap--resize-h .pui-ta { resize: vertical; }

    .pui-ta {
      flex: 1; width: 100%; border: none; outline: none; background: transparent;
      font-size: 14px; color: #111827; font-family: 'Poppins', system-ui, sans-serif;
      padding: 10px 12px; resize: horizontal; min-width: 0; line-height: 1.55;
    }
    .pui-ta-wrap--sm .pui-ta { padding: 7px 10px; font-size: 13px; }
    .pui-ta-wrap--lg .pui-ta { padding: 14px 16px; font-size: 15px; }
    .pui-ta::placeholder { color: #9ca3af; }
    .pui-ta:disabled { cursor: not-allowed; color: #9ca3af; }

    .pui-ta-footer {
      display: flex; align-items: center; gap: 6px; min-height: 18px;
    }
    .pui-ta-footer__count {
      font-size: 11px; color: #9ca3af; margin-left: auto;
      font-family: 'Poppins', system-ui, sans-serif; flex-shrink: 0;
    }
  `],
})
export class PuiTextareaComponent implements ControlValueAccessor {
  @Input() label       = '';
  @Input() placeholder = '';
  @Input() size: FormSize = 'md';
  @Input() rows        = 4;
  @Input() disabled    = false;
  @Input() readonly    = false;
  @Input() required    = false;
  @Input() error       = '';
  @Input() hint        = '';
  @Input() maxLength: number | null = null;
  @Input() showCount   = false;
  @Input() resize: 'both' | 'vertical' | 'horizontal' | 'none' = 'vertical';

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
