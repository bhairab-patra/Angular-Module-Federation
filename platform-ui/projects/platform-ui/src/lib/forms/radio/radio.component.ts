import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioOption } from '../../models/form.model';
import { PuiCustomCssDirective } from '../../pui-custom-css.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-radio-group',
  standalone: true,
  imports: [NgIf, NgFor],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PuiRadioGroupComponent),
      multi: true,
    },
  ],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class PuiRadioGroupComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() error = '';
  @Input() hint = '';
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  @Input() groupName = `pui-rg-${Math.random().toString(36).slice(2, 7)}`;

  @Input() set options(v: RadioOption[] | string) {
    this._options = typeof v === 'string' ? (this._parseJson<RadioOption[]>(v) ?? []) : v || [];
  }
  get options(): RadioOption[] {
    return this._options;
  }
  private _options: RadioOption[] = [];

  @Input() set disabled(v: boolean | string) {
    this._disabled = v === true || v === 'true' || (v as any) === '';
  }
  get disabled() {
    return this._disabled;
  }
  private _disabled = false;

  @Input() set required(v: boolean | string) {
    this._required = v === true || v === 'true' || (v as any) === '';
  }
  get required() {
    return this._required;
  }
  private _required = false;

  private _parseJson<T>(s: string): T | null {
    try {
      return JSON.parse(s) as T;
    } catch {
      return null;
    }
  }

  @Output() valueChange = new EventEmitter<any>();
  @Output() changed = new EventEmitter<any>();

  innerValue: any = null;

  private onChangeFn: (v: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(val: any): void {
    this.innerValue = val ?? null;
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  select(val: any): void {
    this.innerValue = val;
    this.onChangeFn(val);
    this.onTouchedFn();
    this.valueChange.emit(val);
    this.changed.emit(val);
  }

  get describedBy(): string | null {
    if (this.error) return 'pui-radio-error';
    if (this.hint) return 'pui-radio-hint';
    return null;
  }
}
