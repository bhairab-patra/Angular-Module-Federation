import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PuiFormDialogComponent, FormDialogField, FormDialogSaveEvent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'docs-form-dialog-page',
  standalone: true,
  imports: [NgFor, NgIf, PuiFormDialogComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-dialog-page.component.html',
  styleUrls: ['./form-dialog-page.component.scss'],
})
export class FormDialogPageComponent {
  private cdr = inject(ChangeDetectorRef);

  copied = '';
  copy(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id; this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  /* ── Demo 1: Basic add/edit ─────────────────── */
  basicOpen      = false;
  basicTitle     = '';
  basicSaveLabel = 'Save';
  basicData: Record<string, any> = {};
  basicLog: string[] = [];

  basicFields: FormDialogField[] = [
    { key: 'firstName', label: 'First Name', required: true, span: 'half', placeholder: 'e.g. Alice' },
    { key: 'lastName',  label: 'Last Name',  required: true, span: 'half', placeholder: 'e.g. Johnson' },
    { key: 'email',     label: 'Email',      type: 'email',  required: true, span: 'full', placeholder: 'alice@example.com' },
    { key: 'role',      label: 'Role',       type: 'select', required: true, span: 'half',
      options: [
        { label: 'Admin',     value: 'admin'     },
        { label: 'Editor',    value: 'editor'    },
        { label: 'Viewer',    value: 'viewer'    },
        { label: 'Developer', value: 'developer' },
      ]
    },
    { key: 'bio', label: 'Bio', type: 'textarea', span: 'full', placeholder: 'Short bio...' },
  ];

  openAdd()  { this.basicTitle = 'Add User';  this.basicSaveLabel = 'Add User';     this.basicData = {};                      this.basicOpen = true; this.cdr.markForCheck(); }
  openEdit() { this.basicTitle = 'Edit User'; this.basicSaveLabel = 'Save Changes'; this.basicData = { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', role: 'admin', bio: 'Frontend Engineer at Platform UI.' }; this.basicOpen = true; this.cdr.markForCheck(); }

  onBasicSave(e: FormDialogSaveEvent) {
    this.basicLog = [`Saved: ${e.data['firstName']} ${e.data['lastName']} (${e.data['role']})`, ...this.basicLog.slice(0, 3)];
    this.basicOpen = false; this.cdr.markForCheck();
  }
  onBasicClose() { this.basicOpen = false; this.cdr.markForCheck(); }

  /* ── Demo 2: Sizes ──────────────────────────── */
  sizeOpen: 'sm' | 'md' | 'lg' | '' = '';

  sizeFields: FormDialogField[] = [
    { key: 'name', label: 'Name', required: true, span: 'full' },
    { key: 'note', label: 'Note', type: 'textarea', span: 'full' },
  ];

  /* ── Demo 3: Custom fields ──────────────────── */
  productOpen  = false;
  productData: Record<string, any> = {};
  productLog: string[] = [];

  productFields: FormDialogField[] = [
    { key: 'sku',      label: 'SKU',          span: 'half', placeholder: 'PRD-0001' },
    { key: 'name',     label: 'Product Name', span: 'half', required: true, placeholder: 'e.g. Wireless Headphones' },
    { key: 'category', label: 'Category',     type: 'select', required: true, span: 'half',
      options: [
        { label: 'Audio',        value: 'Audio'        },
        { label: 'Input',        value: 'Input'        },
        { label: 'Connectivity', value: 'Connectivity' },
        { label: 'Accessories',  value: 'Accessories'  },
        { label: 'Furniture',    value: 'Furniture'    },
      ]
    },
    { key: 'stock',       label: 'Stock',       type: 'number',   span: 'half', placeholder: '0' },
    { key: 'price',       label: 'Price ($)',   type: 'number',   span: 'half', placeholder: '0.00', required: true },
    { key: 'status',      label: 'Status',      type: 'select',   span: 'half',
      options: [
        { label: 'In Stock',     value: 'In Stock'     },
        { label: 'Low Stock',    value: 'Low Stock'    },
        { label: 'Out of Stock', value: 'Out of Stock' },
      ]
    },
    { key: 'description', label: 'Description', type: 'textarea', span: 'full', placeholder: 'Product description...' },
  ];

  onProductSave(e: FormDialogSaveEvent) {
    this.productLog = [`Saved: ${e.data['name']} — $${e.data['price']}`, ...this.productLog.slice(0, 3)];
    this.productOpen = false; this.cdr.markForCheck();
  }

  /* ── Code snippets ──────────────────────────── */
  angHtml = `<pui-lib-button variant="primary" (buttonClick)="dialogOpen = true">Open Dialog</pui-lib-button>

<pui-lib-form-dialog
  [open]="dialogOpen"
  [title]="dialogTitle"
  [fields]="fields"
  [data]="dialogData"
  [saveLabel]="saveLabel"
  size="md"
  (save)="onSave($event)"
  (cancel)="dialogOpen = false"
  (closed)="dialogOpen = false">
</pui-lib-form-dialog>`;

  angTs = `import { PuiFormDialogComponent, FormDialogField, FormDialogSaveEvent } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiFormDialogComponent] })
export class MyComponent {
  dialogOpen  = false;
  dialogTitle = 'Add User';
  saveLabel   = 'Save';
  dialogData: Record<string, any> = {};

  fields: FormDialogField[] = [
    { key: 'name',  label: 'Name',  required: true,  span: 'half' },
    { key: 'email', label: 'Email', type: 'email',   span: 'half' },
    { key: 'role',  label: 'Role',  type: 'select',  span: 'half',
      options: [
        { label: 'Admin',  value: 'admin'  },
        { label: 'Editor', value: 'editor' },
      ]
    },
    { key: 'bio',   label: 'Bio',   type: 'textarea', span: 'full' },
  ];

  openAdd()  {
    this.dialogTitle = 'Add User';
    this.saveLabel   = 'Add User';
    this.dialogData  = {};
    this.dialogOpen  = true;
  }

  openEdit(row: any) {
    this.dialogTitle = 'Edit User';
    this.saveLabel   = 'Save Changes';
    this.dialogData  = { ...row };
    this.dialogOpen  = true;
  }

  onSave(e: FormDialogSaveEvent) {
    console.log('Saved data:', e.data);
    this.dialogOpen = false;
  }
}`;

  api: ApiRow[] = [
    { input: 'open',            type: 'boolean',              default: 'false',    description: 'Controls dialog visibility' },
    { input: 'title',           type: 'string',               default: "''",       description: 'Dialog heading text' },
    { input: 'fields',          type: 'FormDialogField[]',    default: '[]',       description: 'Field definitions — see FormDialogField below' },
    { input: 'data',            type: 'Record<string,any>',   default: '{}',       description: 'Pre-filled values for edit mode; pass empty object for add' },
    { input: 'saveLabel',       type: 'string',               default: "'Save'",   description: 'Primary (save) button label' },
    { input: 'cancelLabel',     type: 'string',               default: "'Cancel'", description: 'Secondary (cancel) button label' },
    { input: 'size',            type: "'sm'|'md'|'lg'",       default: "'md'",     description: 'Dialog max-width: sm = 400 px, md = 560 px, lg = 720 px' },
    { input: 'closeOnBackdrop', type: 'boolean',              default: 'true',     description: 'Close when the backdrop is clicked' },
    { input: 'save',            type: 'EventEmitter<FormDialogSaveEvent>', default: '—', description: 'Emits { data } with all field values when Save is clicked' },
    { input: 'cancel',          type: 'EventEmitter<void>',   default: '—',        description: 'Emits when the Cancel button is clicked' },
    { input: 'closed',          type: 'EventEmitter<void>',   default: '—',        description: 'Emits when the dialog fully closes (any method)' },
  ];

  fieldApi: ApiRow[] = [
    { input: 'key',         type: 'string',                                              default: '—',        description: 'Field key — maps to the data object property' },
    { input: 'label',       type: 'string',                                              default: '—',        description: 'Field label text shown above the input' },
    { input: 'type',        type: "'text'|'email'|'number'|'password'|'textarea'|'select'", default: "'text'", description: 'Field control type' },
    { input: 'placeholder', type: 'string',                                              default: "''",       description: 'Input placeholder text' },
    { input: 'required',    type: 'boolean',                                             default: 'false',    description: 'Marks the field as required and validates before save' },
    { input: 'readonly',    type: 'boolean',                                             default: 'false',    description: 'Renders the field as read-only' },
    { input: 'options',     type: 'SelectOption[]',                                      default: '[]',       description: 'Dropdown options — used when type is "select"' },
    { input: 'span',        type: "'half'|'full'",                                       default: "'full'",   description: 'Column span in the 2-column grid layout' },
  ];
}
