import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonInternalComponent } from '../button/button-internal.component';
import { PuiInputInternalComponent } from '../forms/input/input-internal.component';
import { PuiSelectInternalComponent } from '../forms/select/select-internal.component';
import { PuiTextareaInternalComponent } from '../forms/textarea/textarea-internal.component';
import { PuiConfirmDialogInternalComponent } from '../confirm-dialog/confirm-dialog-internal.component';
import { SelectOption } from '../models/form.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

export interface FormDialogField {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  options?: SelectOption[];
  span?: 'full' | 'half';
}

export interface FormDialogSaveEvent {
  data: Record<string, any>;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-form-dialog',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    ButtonInternalComponent,
    PuiInputInternalComponent,
    PuiSelectInternalComponent,
    PuiTextareaInternalComponent,
    PuiConfirmDialogInternalComponent,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class PuiFormDialogComponent {
  _open = false;
  @Input() set open(v: boolean | string) {
    this._open = v === true || v === 'true' || (v as any) === '';
    if (this._open) this._initDraft();
  }

  @Input() title = 'Dialog';
  @Input() saveLabel = 'Save';
  @Input() cancelLabel = 'Cancel';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() closeOnBackdrop = true;

  @Input() set confirmDiscard(v: boolean | string) {
    this._confirmDiscard = v !== false && v !== 'false';
  }
  get confirmDiscard(): boolean {
    return this._confirmDiscard;
  }
  private _confirmDiscard = true;

  @Input() discardTitle = 'Discard changes?';
  @Input() discardMessage = 'You have unsaved changes that will be lost if you leave.';
  @Input() discardLabel = 'Discard';
  @Input() keepEditingLabel = 'Keep Editing';

  _fields: FormDialogField[] = [];
  @Input() set fields(v: FormDialogField[] | string) {
    this._fields = typeof v === 'string' ? (this._parse<FormDialogField[]>(v) ?? []) : v || [];
  }

  _data: Record<string, any> = {};
  @Input() set data(v: Record<string, any> | string | null) {
    this._data = (typeof v === 'string' ? this._parse<Record<string, any>>(v) : v) ?? {};
    if (this._open) this._initDraft();
  }

  @Output() save = new EventEmitter<FormDialogSaveEvent>();
  @Output() cancel = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  draft: Record<string, any> = {};
  errors: Record<string, string> = {};
  discardPromptOpen = false;
  private _initialDraft: Record<string, any> = {};

  get isDirty(): boolean {
    return JSON.stringify(this.draft) !== JSON.stringify(this._initialDraft);
  }

  onBackdropClick(e: MouseEvent): void {
    if (this.closeOnBackdrop && e.target === e.currentTarget) this._requestClose();
  }

  onSave(): void {
    if (!this._validate()) return;
    this.save.emit({ data: { ...this.draft } });
  }

  onCancel(): void {
    this._requestClose();
  }

  private _requestClose(): void {
    if (this._confirmDiscard && this.isDirty) {
      this.discardPromptOpen = true;
      return;
    }
    this.cancel.emit();
    this._close();
  }

  onConfirmDiscard(): void {
    this.discardPromptOpen = false;
    this.cancel.emit();
    this._close();
  }

  onKeepEditing(): void {
    this.discardPromptOpen = false;
  }

  private _close(): void {
    this.closed.emit();
    this.errors = {};
  }

  private _initDraft(): void {
    this.draft = { ...this._data };
    this._initialDraft = { ...this._data };
    this.errors = {};
    this.discardPromptOpen = false;
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
    try {
      return JSON.parse(s) as T;
    } catch {
      return null;
    }
  }
}
