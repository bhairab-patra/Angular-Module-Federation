import {
  Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent }      from '../button/button.component';
import { PuiInputComponent }    from '../forms/input/input.component';
import { PuiSelectComponent }   from '../forms/select/select.component';
import { PuiTextareaComponent } from '../forms/textarea/textarea.component';
import { SelectOption } from '../models/form.model';

export interface FormDialogField {
  key:          string;
  label:        string;
  type?:        'text' | 'number' | 'email' | 'password' | 'textarea' | 'select';
  placeholder?: string;
  required?:    boolean;
  readonly?:    boolean;
  options?:     SelectOption[];   // used when type === 'select'
  span?:        'full' | 'half'; // grid span; default 'half' (2-col grid)
}

export interface FormDialogSaveEvent { data: Record<string, any>; }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-form-dialog',
  standalone: true,
  imports: [
    NgFor, NgIf, FormsModule,
    ButtonComponent,
    PuiInputComponent,
    PuiSelectComponent,
    PuiTextareaComponent,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class PuiFormDialogComponent {

  _open = false;
  @Input() set open(v: boolean | string) {
    this._open = v === true || v === 'true' || (v as any) === '';
    if (this._open) this._initDraft();
  }

  @Input() title       = 'Dialog';
  @Input() saveLabel   = 'Save';
  @Input() cancelLabel = 'Cancel';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() closeOnBackdrop = true;

  _fields: FormDialogField[] = [];
  @Input() set fields(v: FormDialogField[] | string) {
    this._fields = typeof v === 'string' ? (this._parse<FormDialogField[]>(v) ?? []) : (v || []);
  }

  _data: Record<string, any> = {};
  @Input() set data(v: Record<string, any> | string | null) {
    this._data = (typeof v === 'string' ? this._parse<Record<string, any>>(v) : v) ?? {};
    if (this._open) this._initDraft();
  }

  @Output() save   = new EventEmitter<FormDialogSaveEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() cancel = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  draft:  Record<string, any>    = {};
  errors: Record<string, string> = {};


  onBackdropClick(e: MouseEvent): void {
    if (this.closeOnBackdrop && e.target === e.currentTarget) this._close();
  }

  onSave(): void {
    if (!this._validate()) return;
    this.save.emit({ data: { ...this.draft } });
  }

  onCancel(): void {
    this.cancel.emit();
    this._close();
  }

  /* called externally by consumer after save succeeds to close dialog */
  private _close(): void {
    this.closed.emit();
    this.errors = {};
  }

  private _initDraft(): void {
    this.draft  = { ...this._data };
    this.errors = {};
  }

  private _validate(): boolean {
    this.errors = {};
    for (const f of this._fields) {
      if (f.required) {
        const val = this.draft[f.key];
        if (val === null || val === undefined || String(val).trim() === '') {
          this.errors[f.key] = `${f.label} is required`;
        }
      }
    }
    return Object.keys(this.errors).length === 0;
  }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
