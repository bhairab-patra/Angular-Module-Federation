import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  PuiEditableTableComponent, TableColumn, EditableRowSaveEvent, EditableRowEvent,
  PuiFormDialogComponent, FormDialogField, FormDialogSaveEvent,
  PuiConfirmDialogComponent
} from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../../shared/doc-page.component';
import { CodeBlockComponent } from '../../../shared/code-block.component';

@Component({
  selector: 'docs-table-editable-page',
  standalone: true,
  imports: [NgFor, NgIf, PuiEditableTableComponent, PuiFormDialogComponent, PuiConfirmDialogComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-editable-page.component.html',
  styleUrls: ['./table-editable-page.component.scss'],
})
export class TableEditablePageComponent {
  private cdr = inject(ChangeDetectorRef);

  copied = '';
  editableLog: string[] = [];

  copy(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  /* ── Editable table demo ────────────────────── */
  editableCols: TableColumn[] = [
    { key: 'name',       label: 'Name' },
    { key: 'department', label: 'Department' },
    { key: 'role',       label: 'Role' },
    { key: 'salary',     label: 'Salary', type: 'currency', align: 'right' },
  ];

  editableRows = [
    { id: 1, name: 'Alice Johnson',  department: 'Engineering', role: 'Frontend Engineer', salary: 95000  },
    { id: 2, name: 'Bob Martinez',   department: 'Product',     role: 'Product Manager',   salary: 110000 },
    { id: 3, name: 'Carol Smith',    department: 'Design',      role: 'UX Designer',       salary: 85000  },
    { id: 4, name: 'David Lee',      department: 'Engineering', role: 'Backend Engineer',  salary: 105000 },
    { id: 5, name: 'Emma Wilson',    department: 'Engineering', role: 'QA Engineer',       salary: 80000  },
    { id: 6, name: 'Frank Chen',     department: 'Operations',  role: 'DevOps Engineer',   salary: 92000  },
    { id: 7, name: 'Grace Kim',      department: 'Analytics',   role: 'Data Analyst',      salary: 88000  },
  ];

  onRowSave(e: EditableRowSaveEvent) {
    this.editableLog = [`Saved row ${e.index + 1}: ${e.row.name}`, ...this.editableLog.slice(0, 4)];
    this.cdr.markForCheck();
  }
  onRowDelete(e: EditableRowEvent) {
    this.editableLog = [`Deleted: ${e.row.name}`, ...this.editableLog.slice(0, 4)];
    this.cdr.markForCheck();
  }
  onRowEdit(e: EditableRowEvent) {
    this.editableLog = [`Editing row ${e.index + 1}: ${e.row.name}`, ...this.editableLog.slice(0, 4)];
    this.cdr.markForCheck();
  }

  /* ── Form dialog demo ───────────────────────── */
  formOpen      = false;
  formTitle     = '';
  formData: Record<string, any> = {};
  formSaveLabel = 'Save';
  formLog: string[] = [];

  confirmOpen     = false;
  confirmRow: any = null;

  employeeFields: FormDialogField[] = [
    { key: 'name',       label: 'Full Name',   required: true, span: 'half' },
    { key: 'department', label: 'Department',  type: 'select', required: true, span: 'half',
      options: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Product',     value: 'Product'     },
        { label: 'Design',      value: 'Design'      },
        { label: 'Operations',  value: 'Operations'  },
        { label: 'Analytics',   value: 'Analytics'   },
        { label: 'Marketing',   value: 'Marketing'   },
      ]
    },
    { key: 'role',   label: 'Job Title', placeholder: 'e.g. Frontend Engineer', span: 'half' },
    { key: 'salary', label: 'Salary',    type: 'number', placeholder: '0', span: 'half' },
    { key: 'notes',  label: 'Notes',     type: 'textarea', span: 'full',
      placeholder: 'Any additional information...' },
  ];

  openAddForm() {
    this.formTitle = 'Add Employee'; this.formSaveLabel = 'Add Employee';
    this.formData  = {}; this.formOpen = true; this.cdr.markForCheck();
  }

  openEditForm(row: any) {
    this.formTitle = 'Edit Employee'; this.formSaveLabel = 'Save Changes';
    this.formData  = { ...row }; this.formOpen = true; this.cdr.markForCheck();
  }

  openConfirm(row: any) {
    this.confirmRow = row; this.confirmOpen = true; this.cdr.markForCheck();
  }

  onFormSave(e: FormDialogSaveEvent) {
    this.formLog = [`${this.formTitle}: ${e.data['name']}`, ...this.formLog.slice(0, 4)];
    this.formOpen = false; this.cdr.markForCheck();
  }
  onFormClose() { this.formOpen = false; this.cdr.markForCheck(); }
  onConfirmDelete() {
    if (this.confirmRow) this.formLog = [`Deleted: ${this.confirmRow.name}`, ...this.formLog.slice(0, 4)];
    this.confirmOpen = false; this.confirmRow = null; this.cdr.markForCheck();
  }
  onConfirmCancel() { this.confirmOpen = false; this.confirmRow = null; this.cdr.markForCheck(); }

  /* ── Code snippets ──────────────────────────── */
  editableHtml = `<pui-lib-editable-table
  [columns]="columns"
  [data]="rows"
  [maxHeight]="400"
  (rowSave)="onSave($event)"
  (rowDelete)="onDelete($event)"
  (rowEdit)="onEdit($event)">
</pui-lib-editable-table>`;

  editableTs = `import { PuiEditableTableComponent, TableColumn, EditableRowSaveEvent } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiEditableTableComponent] })
export class MyComponent {
  columns: TableColumn[] = [
    { key: 'name',   label: 'Name' },
    { key: 'dept',   label: 'Department' },
    { key: 'salary', label: 'Salary', type: 'currency', align: 'right' },
  ];
  rows = [
    { name: 'Alice', dept: 'Engineering', salary: 95000 },
    { name: 'Bob',   dept: 'Design',      salary: 85000 },
  ];
  onSave(e: EditableRowSaveEvent) {
    console.log('Saved:', e.row, 'was:', e.oldRow);
  }
  onDelete(e: { index: number; row: any }) { console.log('Deleted:', e.row); }
  onEdit(e:   { index: number; row: any }) { console.log('Editing:', e.row); }
}`;

  formDialogHtml = `<pui-lib-form-dialog
  [open]="formOpen"
  [title]="formTitle"
  [fields]="fields"
  [data]="formData"
  [saveLabel]="saveLabel"
  size="md"
  (save)="onSave($event)"
  (closed)="formOpen = false">
</pui-lib-form-dialog>`;

  formDialogTs = `import { PuiFormDialogComponent, FormDialogField, FormDialogSaveEvent } from '@bhairab-patra/platform-ui';

fields: FormDialogField[] = [
  { key: 'name',  label: 'Name',     required: true,        span: 'half' },
  { key: 'dept',  label: 'Dept',     type: 'select',        span: 'half',
    options: [{ label: 'Engineering', value: 'Engineering' }] },
  { key: 'notes', label: 'Notes',    type: 'textarea',      span: 'full' },
];
formOpen  = false;
formData  = {};
openAdd()     { this.formData = {};       this.formOpen = true; }
openEdit(row) { this.formData = {...row}; this.formOpen = true; }
onSave(e: FormDialogSaveEvent) { console.log(e.data); this.formOpen = false; }`;

  confirmDialogHtml = `<pui-lib-confirm-dialog
  [open]="confirmOpen"
  title="Delete Employee?"
  message="This action cannot be undone."
  confirmLabel="Yes, Delete"
  cancelLabel="Cancel"
  confirmVariant="destructive"
  (confirmed)="onConfirmDelete()"
  (closed)="confirmOpen = false">
</pui-lib-confirm-dialog>`;

  api: ApiRow[] = [
    { input: 'columns',       type: 'TableColumn[]',                  default: '[]',    description: 'Column definitions (same as pui-lib-table TableColumn)' },
    { input: 'data',          type: 'any[]',                          default: '[]',    description: 'Row data array; mutated in-place on save' },
    { input: 'maxHeight',     type: 'number',                         default: '480',   description: 'Max height (px) of the scroll container' },
    { input: 'loading',       type: 'boolean',                        default: 'false', description: 'Shows a loading skeleton overlay' },
    { input: 'confirmDelete', type: 'boolean',                        default: 'false', description: 'Shows a built-in confirm dialog before deleting a row' },
    { input: 'rowSave',       type: 'EventEmitter<EditableRowSaveEvent>', default: '—', description: 'Emits {index, row, oldRow} when a row is saved' },
    { input: 'rowDelete',     type: 'EventEmitter<EditableRowEvent>', default: '—',     description: 'Emits {index, row} after a row is deleted' },
    { input: 'rowEdit',       type: 'EventEmitter<EditableRowEvent>', default: '—',     description: 'Emits {index, row} when a row enters edit mode' },
  ];

  formDialogApi: ApiRow[] = [
    { input: 'open',            type: 'boolean',           default: 'false',     description: 'Controls dialog visibility' },
    { input: 'title',           type: 'string',            default: "''",        description: 'Dialog heading text' },
    { input: 'fields',          type: 'FormDialogField[]', default: '[]',        description: 'Field definitions: key, label, type, required, placeholder, options, span' },
    { input: 'data',            type: 'Record<string,any>',default: '{}',        description: 'Pre-filled values for edit mode; empty for add' },
    { input: 'saveLabel',       type: 'string',            default: "'Save'",    description: 'Save button label' },
    { input: 'cancelLabel',     type: 'string',            default: "'Cancel'",  description: 'Cancel button label' },
    { input: 'size',            type: "'sm'|'md'|'lg'",    default: "'md'",      description: 'Dialog width: sm=400px, md=560px, lg=720px' },
    { input: 'closeOnBackdrop', type: 'boolean',           default: 'true',      description: 'Close when clicking the backdrop' },
    { input: 'save',            type: 'EventEmitter<FormDialogSaveEvent>', default: '—', description: 'Emits {data} with all field values on save' },
    { input: 'cancel',          type: 'EventEmitter<void>',default: '—',         description: 'Emits when cancel is clicked' },
    { input: 'closed',          type: 'EventEmitter<void>',default: '—',         description: 'Emits when the dialog closes (any method)' },
  ];

  confirmDialogApi: ApiRow[] = [
    { input: 'open',            type: 'boolean',           default: 'false',        description: 'Controls dialog visibility' },
    { input: 'title',           type: 'string',            default: "'Confirm?'",   description: 'Dialog heading' },
    { input: 'message',         type: 'string',            default: "''",           description: 'Body message text' },
    { input: 'confirmLabel',    type: 'string',            default: "'Confirm'",    description: 'Confirm button label' },
    { input: 'cancelLabel',     type: 'string',            default: "'Cancel'",     description: 'Cancel button label' },
    { input: 'confirmVariant',  type: 'ButtonVariant',     default: "'destructive'", description: 'Variant of the confirm button' },
    { input: 'closeOnBackdrop', type: 'boolean',           default: 'true',         description: 'Close when clicking the backdrop' },
    { input: 'confirmed',       type: 'EventEmitter<void>',default: '—',            description: 'Emits when the user confirms' },
    { input: 'cancelled',       type: 'EventEmitter<void>',default: '—',            description: 'Emits when the user cancels' },
    { input: 'closed',          type: 'EventEmitter<void>',default: '—',            description: 'Emits when the dialog closes' },
  ];
}
