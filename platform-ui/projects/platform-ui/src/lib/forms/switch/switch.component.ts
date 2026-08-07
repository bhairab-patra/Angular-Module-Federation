import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormSize } from '../../models/form.model';

@Component({
  selector: 'pui-switch',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiSwitchComponent),
    multi: true,
  }],
  template: `
    <div class="pui-sw-host" [class.pui-sw-host--disabled]="disabled">

      <label class="pui-sw" [class.pui-sw--on]="checked" [class.pui-sw--disabled]="disabled"
             [class.pui-sw--sm]="size === 'sm'" [class.pui-sw--lg]="size === 'lg'"
             [class.pui-sw--error]="error">

        <input type="checkbox" class="pui-sw__native"
               [checked]="checked" [disabled]="disabled"
               (change)="toggle($event)"/>

        <span class="pui-sw__track">
          <span class="pui-sw__thumb"></span>
        </span>

        <span *ngIf="label || labelOn || labelOff" class="pui-sw__label">
          <ng-container *ngIf="labelOn || labelOff; else plain">
            {{ checked ? (labelOn || label) : (labelOff || label) }}
          </ng-container>
          <ng-template #plain>{{ label }}</ng-template>
          <span *ngIf="required" class="pui-sw__req">*</span>
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
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; gap: 4px; }

    .pui-sw-host { display: flex; flex-direction: column; gap: 4px; }

    .pui-sw {
      display: inline-flex; align-items: center; gap: 10px;
      cursor: pointer; user-select: none;
    }
    .pui-sw--disabled { cursor: not-allowed; }

    /* Native hidden */
    .pui-sw__native {
      position: absolute; opacity: 0; width: 0; height: 0;
    }
    .pui-sw__native:focus-visible + .pui-sw__track {
      box-shadow: 0 0 0 3px rgba(18,198,168,.25);
    }

    /* Track */
    .pui-sw__track {
      position: relative; width: 42px; height: 24px; border-radius: 24px;
      background: #d1d5db; transition: background .2s;
      flex-shrink: 0;
    }
    .pui-sw--on .pui-sw__track   { background: #12C6A8; }
    .pui-sw--error .pui-sw__track { background: #fca5a5; }
    .pui-sw--error.pui-sw--on .pui-sw__track { background: #ef4444; }
    .pui-sw--disabled .pui-sw__track { background: #e5e7eb !important; }

    /* Thumb */
    .pui-sw__thumb {
      position: absolute; top: 3px; left: 3px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.18);
      transition: transform .2s cubic-bezier(.4,0,.2,1);
    }
    .pui-sw--on .pui-sw__thumb { transform: translateX(18px); }

    /* Size: sm */
    .pui-sw--sm .pui-sw__track  { width: 32px; height: 18px; }
    .pui-sw--sm .pui-sw__thumb  { width: 12px; height: 12px; top: 3px; left: 3px; }
    .pui-sw--sm.pui-sw--on .pui-sw__thumb { transform: translateX(14px); }

    /* Size: lg */
    .pui-sw--lg .pui-sw__track  { width: 54px; height: 30px; }
    .pui-sw--lg .pui-sw__thumb  { width: 22px; height: 22px; top: 4px; left: 4px; }
    .pui-sw--lg.pui-sw--on .pui-sw__thumb { transform: translateX(24px); }

    /* Hover glow */
    .pui-sw:not(.pui-sw--disabled):hover .pui-sw__track {
      filter: brightness(.95);
    }

    /* Label */
    .pui-sw__label {
      font-size: 14px; color: #374151; font-family: 'Poppins', system-ui, sans-serif;
    }
    .pui-sw--sm .pui-sw__label { font-size: 13px; }
    .pui-sw--lg .pui-sw__label { font-size: 15px; }
    .pui-sw--disabled .pui-sw__label { color: #9ca3af; }
    .pui-sw__req { color: #ef4444; margin-left: 2px; }

    .pui-field__hint  { font-size: 11px; color: #6b7280; font-family: 'Poppins', system-ui, sans-serif; padding-left: 52px; }
    .pui-field__error {
      display: flex; align-items: center; gap: 5px;
      font-size: 11px; color: #ef4444; font-weight: 500;
      font-family: 'Poppins', system-ui, sans-serif; padding-left: 52px;
    }
  `],
})
export class PuiSwitchComponent implements ControlValueAccessor {
  @Input() label    = '';
  @Input() labelOn  = '';
  @Input() labelOff = '';
  @Input() size: FormSize = 'md';
  @Input() error    = '';
  @Input() hint     = '';

  @Input() set checked(v: boolean | string) { this._checked = v === true || v === 'true' || (v as any) === ''; }
  get checked() { return this._checked; }
  private _checked = false;

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

  writeValue(val: any): void { this.checked = !!val; this.cdr.markForCheck(); }
  registerOnChange(fn: any): void  { this.onChangeFn = fn; }
  registerOnTouched(fn: any): void { this.onTouchedFn = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; this.cdr.markForCheck(); }

  toggle(e: Event): void {
    if (this.disabled) return;
    this.checked = (e.target as HTMLInputElement).checked;
    this.onChangeFn(this.checked);
    this.onTouchedFn();
    this.checkedChange.emit(this.checked);
    this.changed.emit(this.checked);
    this.cdr.markForCheck();
  }
}
