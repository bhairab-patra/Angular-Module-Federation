import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormSize } from '../../models/form.model';

@Component({
  selector: 'pui-lib-switch',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiSwitchComponent),
    multi: true,
  }],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
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
