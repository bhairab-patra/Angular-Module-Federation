import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormSize, RadioOption } from '../../models/form.model';

@Component({
  selector: 'pui-radio-group',
  standalone: true,
  imports: [NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiRadioGroupComponent),
    multi: true,
  }],
  template: `
    <fieldset class="pui-rg" [class.pui-rg--horizontal]="direction === 'horizontal'"
              [disabled]="disabled">
      <legend *ngIf="label" class="pui-rg__legend">
        {{ label }}<span *ngIf="required" class="pui-field__req">*</span>
      </legend>

      <label *ngFor="let opt of options"
             class="pui-rb"
             [class.pui-rb--disabled]="disabled || opt.disabled"
             [class.pui-rb--checked]="innerValue === opt.value">

        <span class="pui-rb__ring"
              [class.pui-rb__ring--checked]="innerValue === opt.value"
              [class.pui-rb__ring--disabled]="disabled || opt.disabled"
              [class.pui-rb__ring--error]="error">
          <input type="radio"
                 class="pui-rb__native"
                 [name]="groupName"
                 [value]="opt.value"
                 [disabled]="disabled || opt.disabled || false"
                 [checked]="innerValue === opt.value"
                 (change)="select(opt.value)"/>
          <span *ngIf="innerValue === opt.value" class="pui-rb__dot"></span>
        </span>

        <span class="pui-rb__content">
          <span class="pui-rb__label">{{ opt.label }}</span>
          <span *ngIf="opt.hint" class="pui-rb__hint">{{ opt.hint }}</span>
        </span>
      </label>

      <span *ngIf="hint && !error" class="pui-field__hint" style="margin-top:4px">{{ hint }}</span>
      <span *ngIf="error" class="pui-field__error" style="margin-top:4px">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" fill="#ef4444"/>
          <path d="M8 5v3M8 10.5h.01" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
        {{ error }}
      </span>
    </fieldset>
  `,
  styles: [`
    :host { display: block; }

    .pui-rg {
      border: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 10px;
    }
    .pui-rg--horizontal { flex-direction: row; flex-wrap: wrap; gap: 16px; }
    .pui-rg__legend {
      font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;
      font-family: 'Poppins', system-ui, sans-serif; display: block; float: left; width: 100%;
    }
    .pui-rg--horizontal .pui-rg__legend { width: 100%; }

    .pui-rb {
      display: inline-flex; align-items: flex-start; gap: 10px;
      cursor: pointer; user-select: none;
    }
    .pui-rb--disabled { cursor: not-allowed; }

    .pui-rb__ring {
      position: relative; width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px;
      border: 1.8px solid #d1d5db; border-radius: 50%;
      background: #fff; display: flex; align-items: center; justify-content: center;
      transition: border-color .15s, box-shadow .15s;
    }
    .pui-rb__ring:hover:not(.pui-rb__ring--disabled) { border-color: #12C6A8; }
    .pui-rb__ring--checked  { border-color: #12C6A8 !important; }
    .pui-rb__ring--error    { border-color: #ef4444 !important; }
    .pui-rb__ring--disabled { background: #f3f4f6 !important; border-color: #e5e7eb !important; }
    .pui-rb__ring:focus-within { box-shadow: 0 0 0 3px rgba(18,198,168,.18); }

    .pui-rb__native {
      position: absolute; opacity: 0; width: 100%; height: 100%; margin: 0; cursor: inherit;
    }
    .pui-rb__dot {
      width: 8px; height: 8px; border-radius: 50%; background: #12C6A8;
      position: relative; z-index: 1; pointer-events: none;
    }
    .pui-rb__ring--error .pui-rb__dot { background: #ef4444; }
    .pui-rb__ring--disabled .pui-rb__dot { background: #9ca3af; }

    .pui-rb__content { display: flex; flex-direction: column; gap: 1px; }
    .pui-rb__label { font-size: 14px; color: #374151; font-family: 'Poppins', system-ui, sans-serif; }
    .pui-rb__hint  { font-size: 11px; color: #6b7280; font-family: 'Poppins', system-ui, sans-serif; }
    .pui-rb--disabled .pui-rb__label,
    .pui-rb--disabled .pui-rb__hint { color: #9ca3af; }

    .pui-field__req   { color: #ef4444; margin-left: 2px; }
    .pui-field__hint  { font-size: 11px; color: #6b7280; font-family: 'Poppins', system-ui, sans-serif; }
    .pui-field__error {
      display: flex; align-items: center; gap: 5px;
      font-size: 11px; color: #ef4444; font-weight: 500;
      font-family: 'Poppins', system-ui, sans-serif;
    }
  `],
})
export class PuiRadioGroupComponent implements ControlValueAccessor {
  @Input() label     = '';
  @Input() error     = '';
  @Input() hint      = '';
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  @Input() groupName = `pui-rg-${Math.random().toString(36).slice(2,7)}`;

  @Input() set options(v: RadioOption[] | string) {
    this._options = typeof v === 'string' ? (this._parseJson<RadioOption[]>(v) ?? []) : (v || []);
  }
  get options(): RadioOption[] { return this._options; }
  private _options: RadioOption[] = [];

  @Input() set disabled(v: boolean | string) { this._disabled = v === true || v === 'true' || (v as any) === ''; }
  get disabled() { return this._disabled; }
  private _disabled = false;

  @Input() set required(v: boolean | string) { this._required = v === true || v === 'true' || (v as any) === ''; }
  get required() { return this._required; }
  private _required = false;

  private _parseJson<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }

  @Output() valueChange = new EventEmitter<any>();
  @Output() changed     = new EventEmitter<any>();

  innerValue: any = null;

  private onChangeFn: (v: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(val: any): void { this.innerValue = val; this.cdr.markForCheck(); }
  registerOnChange(fn: any): void  { this.onChangeFn = fn; }
  registerOnTouched(fn: any): void { this.onTouchedFn = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; this.cdr.markForCheck(); }

  select(val: any): void {
    this.innerValue = val;
    this.onChangeFn(val);
    this.onTouchedFn();
    this.valueChange.emit(val);
    this.changed.emit(val);
    this.cdr.markForCheck();
  }
}
