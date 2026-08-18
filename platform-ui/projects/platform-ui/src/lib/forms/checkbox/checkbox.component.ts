import {
  Component, Input, Output, EventEmitter, forwardRef,
  ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-checkbox',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiCheckboxComponent),
    multi: true,
  }],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChangeFn: (v: any) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedFn: () => void = () => {};


  writeValue(val: any): void { this._checked = !!val; }
  registerOnChange(fn: any): void  { this.onChangeFn = fn; }
  registerOnTouched(fn: any): void { this.onTouchedFn = fn; }

  toggle(e: Event): void {
    if (this._disabled) return;
    this._checked = (e.target as HTMLInputElement).checked;
    this.onChangeFn(this._checked);
    this.onTouchedFn();
    this.checkedChange.emit(this._checked);
    this.changed.emit(this._checked);
  }
}
