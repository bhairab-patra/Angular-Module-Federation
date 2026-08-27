import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  PuiEditableTableComponent, TableColumn, TableAction, SortState, EditableRowSaveEvent, EditableRowEvent,
  PuiFormDialogComponent, FormDialogField, FormDialogSaveEvent,
  PuiConfirmDialogComponent, ICON_REGISTRY
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

  fw = 'angular';
  copied = '';
  editableLog: string[] = [];

  copy(id: string, text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  trackByIndex(_i: number): number { return _i; }

  /* ── Editable table demo ────────────────────── */
  /* `editable: false` keeps Department read-only while every other column
     stays editable — set per column so each table controls its own mix.
     `sortable` and the validation fields (required/minLength/pattern) are
     also per-column, so every table configures its own feature mix. */
  editableCols: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true, required: true, minLength: 2 },
    { key: 'department', label: 'Department', editable: false, sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'salary', label: 'Salary', type: 'currency', align: 'right', sortable: true,
      required: true, validationMessage: 'Salary is required',
    },
  ];

  editableRows = [
    { id: 1, name: 'Alice Johnson', department: 'Engineering', role: 'Frontend Engineer', salary: 95000 },
    { id: 2, name: 'Bob Martinez', department: 'Product', role: 'Product Manager', salary: 110000 },
    { id: 3, name: 'Carol Smith', department: 'Design', role: 'UX Designer', salary: 85000 },
    { id: 4, name: 'David Lee', department: 'Engineering', role: 'Backend Engineer', salary: 105000 },
    { id: 5, name: 'Emma Wilson', department: 'Engineering', role: 'QA Engineer', salary: 80000 },
    { id: 6, name: 'Frank Chen', department: 'Operations', role: 'DevOps Engineer', salary: 92000 },
    { id: 7, name: 'Grace Kim', department: 'Analytics', role: 'Data Analyst', salary: 88000 },
  ];

  /* Edit/Delete each toggle independently; rowActions adds extra buttons
     (here, "View") alongside them — reusing the same TableAction shape as
     pui-lib-table / pui-lib-data-table. */
  showEditAction = true;
  showDeleteAction = true;
  editableRowActions: TableAction[] = [
    {
      label: 'View', icon: ICON_REGISTRY['eye'], action: (row) => {
        this.editableLog = [`Viewing: ${row.name}`, ...this.editableLog.slice(0, 4)];
        this.cdr.markForCheck();
      }
    },
  ];

  onRowSave(e: EditableRowSaveEvent): void {
    this.editableLog = [`Saved row ${e.index + 1}: ${e.row.name}`, ...this.editableLog.slice(0, 4)];
    this.cdr.markForCheck();
  }
  onRowDelete(e: EditableRowEvent): void {
    this.editableLog = [`Deleted: ${e.row.name}`, ...this.editableLog.slice(0, 4)];
    this.cdr.markForCheck();
  }
  onRowEdit(e: EditableRowEvent): void {
    this.editableLog = [`Editing row ${e.index + 1}: ${e.row.name}`, ...this.editableLog.slice(0, 4)];
    this.cdr.markForCheck();
  }
  onSortChange(sort: SortState): void {
    this.editableLog = [`Sorted by ${sort.key || '—'} ${sort.dir || ''}`.trim(), ...this.editableLog.slice(0, 4)];
    this.cdr.markForCheck();
  }

  /* ── Form dialog demo ───────────────────────── */
  formOpen = false;
  formTitle = '';
  formData: Record<string, unknown> = {};
  formSaveLabel = 'Save';
  formLog: string[] = [];

  confirmOpen = false;
  confirmRow: Record<string, unknown> | null = null;

  employeeFields: FormDialogField[] = [
    { key: 'name', label: 'Full Name', required: true, span: 'half' },
    {
      key: 'department', label: 'Department', type: 'select', required: true, span: 'half',
      options: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Product', value: 'Product' },
        { label: 'Design', value: 'Design' },
        { label: 'Operations', value: 'Operations' },
        { label: 'Analytics', value: 'Analytics' },
        { label: 'Marketing', value: 'Marketing' },
      ]
    },
    { key: 'role', label: 'Job Title', placeholder: 'e.g. Frontend Engineer', span: 'half' },
    { key: 'salary', label: 'Salary', type: 'number', placeholder: '0', span: 'half' },
    {
      key: 'notes', label: 'Notes', type: 'textarea', span: 'full',
      placeholder: 'Any additional information...'
    },
  ];

  openAddForm(): void {
    this.formTitle = 'Add Employee'; this.formSaveLabel = 'Add Employee';
    this.formData = {}; this.formOpen = true; this.cdr.markForCheck();
  }

  openEditForm(row: Record<string, unknown>): void {
    this.formTitle = 'Edit Employee'; this.formSaveLabel = 'Save Changes';
    this.formData = { ...row }; this.formOpen = true; this.cdr.markForCheck();
  }

  openConfirm(row: Record<string, unknown>): void {
    this.confirmRow = row; this.confirmOpen = true; this.cdr.markForCheck();
  }

  onFormSave(e: FormDialogSaveEvent): void {
    this.formLog = [`${this.formTitle}: ${String(e.data['name'])}`, ...this.formLog.slice(0, 4)];
    this.formOpen = false; this.cdr.markForCheck();
  }
  onFormClose(): void { this.formOpen = false; this.cdr.markForCheck(); }
  onConfirmDelete(): void {
    if (this.confirmRow) this.formLog = [`Deleted: ${String(this.confirmRow['name'])}`, ...this.formLog.slice(0, 4)];
    this.confirmOpen = false; this.confirmRow = null; this.cdr.markForCheck();
  }
  onConfirmCancel(): void { this.confirmOpen = false; this.confirmRow = null; this.cdr.markForCheck(); }

  /* ── Code snippets ──────────────────────────── */
  editableHtml = `<pui-lib-editable-table
  heading="Team Members"
  [searchable]="true"
  [stickyHeader]="true"
  [pagination]="true"
  [pageSize]="10"
  [striped]="true"
  [showEditAction]="true"
  [showDeleteAction]="true"
  [rowActions]="rowActions"
  [columns]="columns"
  [data]="rows"
  [maxHeight]="400"
  (rowSave)="onSave($event)"
  (rowDelete)="onDelete($event)"
  (rowEdit)="onEdit($event)"
  (sortChange)="onSort($event)">
</pui-lib-editable-table>`;

  editableTs = `import { PuiEditableTableComponent, TableColumn, TableAction, EditableRowSaveEvent, ICON_REGISTRY } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiEditableTableComponent] })
export class MyComponent {
  columns: TableColumn[] = [
    // sortable + validation are per-column — mix and match as needed
    { key: 'name',   label: 'Name', sortable: true, required: true, minLength: 2 },
    { key: 'dept',   label: 'Department', editable: false, sortable: true }, // read-only while editing
    { key: 'email',  label: 'Email', pattern: '^[^@\\\\s]+@[^@\\\\s]+\\\\.[^@\\\\s]+$',
      validationMessage: 'Enter a valid email address' },
    { key: 'salary', label: 'Salary', type: 'currency', align: 'right', sortable: true, required: true },
  ];
  rows = [
    { name: 'Alice', dept: 'Engineering', email: 'alice@co.com', salary: 95000 },
    { name: 'Bob',   dept: 'Design',      email: 'bob@co.com',   salary: 85000 },
  ];
  // Only want Edit, or only Delete? Set [showEditAction]="false" or
  // [showDeleteAction]="false" — each toggles independently. Need another
  // button (e.g. "View")? Add it via rowActions instead of editing the
  // library — same TableAction shape used by pui-lib-table / pui-lib-data-table.
  rowActions: TableAction[] = [
    { label: 'View', icon: ICON_REGISTRY['eye'], action: (row) => console.log('View', row) },
  ];
  onSave(e: EditableRowSaveEvent) {
    console.log('Saved:', e.row, 'was:', e.oldRow); // a toast fires automatically too
  }
  onDelete(e: { index: number; row: any }) { console.log('Deleted:', e.row); }
  onEdit(e:   { index: number; row: any }) { console.log('Editing:', e.row); }
  onSort(s: { key: string; dir: string }) { console.log('Sorted by', s.key, s.dir); }
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

  xfwRows = [
    { name: 'columns', angular: '[columns]="colsArray"', attr: '— use JS property', js: 'el.columns = [{key,label,editable,sortable,...}]' },
    { name: 'data', angular: '[data]="rowsArray"', attr: '— use JS property', js: 'el.data = [{...},...]' },
    { name: 'heading', angular: 'heading="Team Members"', attr: 'heading="…"', js: 'el.heading = "…"' },
    { name: 'searchable', angular: '[searchable]="true"', attr: 'searchable', js: 'el.searchable = true' },
    { name: 'striped', angular: '[striped]="bool"', attr: 'striped="true"', js: 'el.striped = true' },
    { name: 'stickyHeader', angular: '[stickyHeader]="true"', attr: 'sticky-header', js: 'el.stickyHeader = true' },
    { name: 'pagination', angular: '[pagination]="true"', attr: 'pagination', js: 'el.pagination = true' },
    { name: 'pageSize', angular: '[pageSize]="10"', attr: 'page-size="10"', js: 'el.pageSize = 10' },
    { name: 'pageSizeOptions', angular: '[pageSizeOptions]="[10,25,50]"', attr: '— use JS property', js: 'el.pageSizeOptions = [10,25,50]' },
    { name: 'maxHeight', angular: '[maxHeight]="400"', attr: 'max-height="400"', js: 'el.maxHeight = 400' },
    { name: 'tooltipPosition', angular: '[tooltipPosition]="\'right\'"', attr: 'tooltip-position="right"', js: 'el.tooltipPosition = "right"' },
    { name: 'loading', angular: '[loading]="bool"', attr: 'loading="true"', js: 'el.loading = true' },
    { name: 'confirmDelete', angular: '[confirmDelete]="bool"', attr: 'confirm-delete="true"', js: 'el.confirmDelete = true' },
    { name: 'showToast', angular: '[showToast]="true"', attr: 'show-toast', js: 'el.showToast = true' },
    { name: 'saveToastMessage', angular: '[saveToastMessage]="\'…\'"', attr: 'save-toast-message="…"', js: 'el.saveToastMessage = "…"' },
    { name: 'deleteToastMessage', angular: '[deleteToastMessage]="\'…\'"', attr: 'delete-toast-message="…"', js: 'el.deleteToastMessage = "…"' },
    { name: 'showEditAction', angular: '[showEditAction]="bool"', attr: 'show-edit-action', js: 'el.showEditAction = false' },
    { name: 'showDeleteAction', angular: '[showDeleteAction]="bool"', attr: 'show-delete-action', js: 'el.showDeleteAction = false' },
    { name: 'rowActions', angular: '[rowActions]="actionsArray"', attr: '— use JS property', js: 'el.rowActions = [{label,icon,action,disabled}]' },
    { name: 'rowSave', angular: '(rowSave)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("rowSave", fn)' },
    { name: 'rowDelete', angular: '(rowDelete)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("rowDelete", fn)' },
    { name: 'rowEdit', angular: '(rowEdit)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("rowEdit", fn)' },
    { name: 'searchChange', angular: '(searchChange)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("searchChange", fn)' },
    { name: 'sortChange', angular: '(sortChange)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("sortChange", fn)' },
    { name: 'actionClick', angular: '(actionClick)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("actionClick", fn)' },
  ];

  api: ApiRow[] = [
    { input: 'columns', type: 'TableColumn[]', default: '[]', description: 'Column definitions (same as pui-lib-table TableColumn). type: badge/pills/currency/number/date render the same way as pui-lib-table when the row isn\'t being edited — badge/pills need badgeMap for badge. Set editable: false to keep a column read-only while editing, sortable: true to enable sorting on it, and required/minLength/maxLength/pattern/validationMessage for inline validation while editing.' },
    { input: 'data', type: 'any[]', default: '[]', description: 'Row data array; mutated in-place on save' },
    { input: 'heading', type: 'string', default: "''", description: 'Optional title shown on the left of the toolbar. The toolbar also appears (title-less) whenever searchable is true.' },
    { input: 'searchable', type: 'boolean', default: 'false', description: 'Shows a pui-lib-search box in the toolbar that filters rows by matching any column value, live as you type. Edit/delete/save/sort always act on the correct original row even while filtered.' },
    { input: 'striped', type: 'boolean', default: 'true', description: 'Alternating row background shading. Same input name/behavior as pui-lib-table and pui-lib-data-table.' },
    { input: 'stickyHeader', type: 'boolean', default: 'true', description: 'Keeps the header row pinned while the body scrolls. Set false to let it scroll away with the content.' },
    { input: 'pagination', type: 'boolean', default: 'false', description: 'Paginates rows (after search/sort) using pui-lib-simple-pagination in the footer, instead of showing every row in one scroll.' },
    { input: 'pageSize', type: 'number', default: '10', description: 'Rows per page when pagination is true.' },
    { input: 'pageSizeOptions', type: 'number[]', default: '[10, 25, 50, 100]', description: 'Options shown in the pagination page-size selector.' },
    { input: 'tooltipPosition', type: `'top'|'bottom'|'left'|'right'`, default: `'right'`, description: 'Placement of the tooltip that appears when a truncated header or cell is hovered.' },
    { input: 'maxHeight', type: 'number', default: '480', description: 'Max height (px) of the scroll container' },
    { input: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading skeleton overlay' },
    { input: 'confirmDelete', type: 'boolean', default: 'false', description: 'Shows a built-in confirm dialog before deleting a row' },
    { input: 'showToast', type: 'boolean', default: 'true', description: 'Shows a toast (via the shared ToastService) after a successful save or delete. Mount <pui-lib-toast-container> once at the app root for toasts to render.' },
    { input: 'saveToastMessage', type: 'string', default: "'Row saved successfully'", description: 'Toast message shown after a successful save.' },
    { input: 'deleteToastMessage', type: 'string', default: "'Row deleted successfully'", description: 'Toast message shown after a row is deleted.' },
    { input: 'showEditAction', type: 'boolean', default: 'true', description: 'Shows/hides the built-in Edit (pencil) button independently of Delete — e.g. set false for a view/delete-only row toolbar.' },
    { input: 'showDeleteAction', type: 'boolean', default: 'true', description: 'Shows/hides the built-in Delete (trash) button independently of Edit.' },
    { input: 'rowActions', type: 'TableAction[]', default: '[]', description: 'Extra per-row buttons shown alongside Edit/Delete (e.g. "View") — same TableAction shape as pui-lib-table / pui-lib-data-table: { label, icon?: rawSvgString, action(row), disabled?(row) }. Hidden entirely while any row is being edited. The whole Actions column (header + cell) disappears automatically when showEditAction, showDeleteAction, and rowActions are all off/empty — nothing to configure separately for that.' },
    { input: 'rowSave', type: 'EventEmitter<EditableRowSaveEvent>', default: '—', description: 'Emits {index, row, oldRow} when a row is saved (only after all validation rules pass)' },
    { input: 'rowDelete', type: 'EventEmitter<EditableRowEvent>', default: '—', description: 'Emits {index, row} after a row is deleted' },
    { input: 'rowEdit', type: 'EventEmitter<EditableRowEvent>', default: '—', description: 'Emits {index, row} when a row enters edit mode' },
    { input: 'searchChange', type: 'EventEmitter<string>', default: '—', description: 'Emits the current search term on every keystroke' },
    { input: 'sortChange', type: 'EventEmitter<SortState>', default: '—', description: 'Emits {key, dir} whenever the sort column/direction changes (dir cycles asc → desc → none)' },
    { input: 'actionClick', type: 'EventEmitter<{action,row,index}>', default: '—', description: 'Emits whenever a rowActions button is clicked, in addition to that action\'s own action(row) callback firing.' },
  ];

  formDialogApi: ApiRow[] = [
    { input: 'open', type: 'boolean', default: 'false', description: 'Controls dialog visibility' },
    { input: 'title', type: 'string', default: "''", description: 'Dialog heading text' },
    { input: 'fields', type: 'FormDialogField[]', default: '[]', description: 'Field definitions: key, label, type, required, placeholder, options, span' },
    { input: 'data', type: 'Record<string,any>', default: '{}', description: 'Pre-filled values for edit mode; empty for add' },
    { input: 'saveLabel', type: 'string', default: "'Save'", description: 'Save button label' },
    { input: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Cancel button label' },
    { input: 'size', type: "'sm'|'md'|'lg'", default: "'md'", description: 'Dialog width: sm=400px, md=560px, lg=720px' },
    { input: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Close when clicking the backdrop' },
    { input: 'save', type: 'EventEmitter<FormDialogSaveEvent>', default: '—', description: 'Emits {data} with all field values on save' },
    { input: 'cancel', type: 'EventEmitter<void>', default: '—', description: 'Emits when cancel is clicked' },
    { input: 'closed', type: 'EventEmitter<void>', default: '—', description: 'Emits when the dialog closes (any method)' },
  ];

  confirmDialogApi: ApiRow[] = [
    { input: 'open', type: 'boolean', default: 'false', description: 'Controls dialog visibility' },
    { input: 'title', type: 'string', default: "'Confirm?'", description: 'Dialog heading' },
    { input: 'message', type: 'string', default: "''", description: 'Body message text' },
    { input: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Confirm button label' },
    { input: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Cancel button label' },
    { input: 'confirmVariant', type: 'ButtonVariant', default: "'destructive'", description: 'Variant of the confirm button' },
    { input: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Close when clicking the backdrop' },
    { input: 'confirmed', type: 'EventEmitter<void>', default: '—', description: 'Emits when the user confirms' },
    { input: 'cancelled', type: 'EventEmitter<void>', default: '—', description: 'Emits when the user cancels' },
    { input: 'closed', type: 'EventEmitter<void>', default: '—', description: 'Emits when the dialog closes' },
  ];
}
