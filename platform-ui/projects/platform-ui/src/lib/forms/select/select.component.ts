import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormSize, SelectOption } from '../../models/form.model';
import { PuiCustomCssDirective } from '../../pui-custom-css.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-select',
  standalone: true,
  imports: [NgIf, NgFor],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PuiSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class PuiSelectComponent implements ControlValueAccessor {
  private el = inject(ElementRef);

  @Input() label = '';
  @Input() placeholder = 'Select an option';
  @Input() size: FormSize = 'md';
  @Input() error = '';
  @Input() hint = '';
  @Input() searchable = false;
  @Input() searchPlaceholder = 'Search…';

  @Input() set options(v: SelectOption[] | string) {
    this._options = typeof v === 'string' ? (this._parseJson<SelectOption[]>(v) ?? []) : v || [];
    this._applyFilter();
  }
  get options(): SelectOption[] {
    return this._options;
  }
  private _options: SelectOption[] = [];

  @Input() set disabled(v: boolean | string) {
    this._disabled = v === true || v === 'true' || (v as unknown) === '';
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  @Input() set required(v: boolean | string) {
    this._required = v === true || v === 'true' || (v as unknown) === '';
  }
  get required(): boolean {
    return this._required;
  }
  private _required = false;

  @Output() valueChange = new EventEmitter<unknown>();
  @Output() selectionChange = new EventEmitter<unknown>();

  innerValue: unknown = '';
  open = false;
  searchText = '';
  filtered: SelectOption[] = [];

  get selectedOption(): SelectOption | undefined {
    return this._options.find((o) => o.value === this.innerValue);
  }

  get displayLabel(): string {
    return this.selectedOption?.label ?? '';
  }

  private _onChangeFn: (v: unknown) => void = () => {};
  private _onTouchedFn: () => void = () => {};

  writeValue(val: unknown): void {
    this.innerValue = val ?? '';
  }
  registerOnChange(fn: (v: unknown) => void): void {
    this._onChangeFn = fn;
  }
  registerOnTouched(fn: () => void): void {
    this._onTouchedFn = fn;
  }

  toggle(): void {
    if (this._disabled) return;
    this.open = !this.open;
    if (this.open) {
      this.searchText = '';
      this._applyFilter();
    }
  }

  close(): void {
    this.open = false;
    this._onTouchedFn();
  }

  pick(e: MouseEvent, opt: SelectOption): void {
    e.preventDefault();
    e.stopPropagation();
    if (opt.disabled) return;
    this.innerValue = opt.value;
    this.open = false;
    this._onChangeFn(opt.value);
    this._onTouchedFn();
    this.valueChange.emit(opt.value);
    this.selectionChange.emit(opt.value);
  }

  onSearch(text: string): void {
    this.searchText = text;
    this._applyFilter();
  }

  trackByValue(_: number, opt: SelectOption): unknown {
    return opt.value;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.open) return;
    const path: EventTarget[] = e.composedPath ? e.composedPath() : [];
    const inside = path.length
      ? path.includes(this.el.nativeElement)
      : this.el.nativeElement.contains(e.target as Node);
    if (!inside) this.close();
  }

  private _applyFilter(): void {
    const q = this.searchText.toLowerCase().trim();
    this.filtered = q
      ? this._options.filter((o) => o.label.toLowerCase().includes(q))
      : [...this._options];
  }

  private _parseJson<T>(s: string): T | null {
    try {
      return JSON.parse(s) as T;
    } catch {
      return null;
    }
  }

  get describedBy(): string | null {
    if (this.error) return 'pui-select-error';
    if (this.hint) return 'pui-select-hint';
    return null;
  }
}
