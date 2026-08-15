import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  PuiDataTableComponent, TableColumn, TableAction,
  PuiFormDialogComponent, FormDialogField, FormDialogSaveEvent,
  PuiConfirmDialogComponent
} from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../../shared/doc-page.component';
import { CodeBlockComponent } from '../../../shared/code-block.component';

@Component({
  selector: 'docs-table-data-grid-page',
  standalone: true,
  imports: [NgFor, NgIf, PuiDataTableComponent, PuiFormDialogComponent, PuiConfirmDialogComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-data-grid-page.component.html',
  styleUrls: ['./table-data-grid-page.component.scss'],
})
export class TableDataGridPageComponent {
  private cdr = inject(ChangeDetectorRef);

  t = true;
  fw = 'angular';
  copied = '';
  lastRow: Record<string, unknown> | null = null;
  selectedCount = 0;
  isLoading = false;
  dialogLog: string[] = [];

  copy(id: string, text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  toggleLoading(): void { this.isLoading = !this.isLoading; this.cdr.markForCheck(); }

  trackByIndex(_i: number): number { return _i; }

  /* ── Employee data (full-featured demo) ─────── */
  employeeCols: TableColumn[] = [
    { key: 'id',         label: 'ID',         sortable: true, width: '60px', align: 'center', type: 'number' },
    { key: 'name',       label: 'Name',        sortable: true, minWidth: '140px' },
    { key: 'role',       label: 'Role',        sortable: true, minWidth: '120px' },
    { key: 'department', label: 'Department',  sortable: true, minWidth: '120px' },
    {
      key: 'status', label: 'Status', sortable: true, width: '110px', type: 'badge',
      badgeMap: {
        Active:    { color: '#10b981' },
        Inactive:  { color: '#6b7280' },
        'On Leave':{ color: '#f59e0b' },
      }
    },
    { key: 'salary', label: 'Salary', sortable: true, width: '110px', align: 'right', type: 'currency' },
  ];

  employees = [
    { id: 1,  name: 'Alice Johnson',   role: 'Frontend Engineer', department: 'Engineering', status: 'Active',    salary: 95000  },
    { id: 2,  name: 'Bob Martinez',    role: 'Product Manager',   department: 'Product',     status: 'Active',    salary: 110000 },
    { id: 3,  name: 'Carol Smith',     role: 'UX Designer',       department: 'Design',      status: 'On Leave',  salary: 85000  },
    { id: 4,  name: 'David Lee',       role: 'Backend Engineer',  department: 'Engineering', status: 'Active',    salary: 105000 },
    { id: 5,  name: 'Emma Wilson',     role: 'QA Engineer',       department: 'Engineering', status: 'Active',    salary: 80000  },
    { id: 6,  name: 'Frank Chen',      role: 'DevOps Engineer',   department: 'Operations',  status: 'Inactive',  salary: 92000  },
    { id: 7,  name: 'Grace Kim',       role: 'Data Analyst',      department: 'Analytics',   status: 'Active',    salary: 88000  },
    { id: 8,  name: 'Henry Davis',     role: 'Tech Lead',         department: 'Engineering', status: 'Active',    salary: 120000 },
    { id: 9,  name: 'Isabella Moore',  role: 'Scrum Master',      department: 'Product',     status: 'Active',    salary: 95000  },
    { id: 10, name: 'James Taylor',    role: 'Security Engineer', department: 'Operations',  status: 'On Leave',  salary: 102000 },
    { id: 11, name: 'Karen White',     role: 'Mobile Engineer',   department: 'Engineering', status: 'Active',    salary: 98000  },
    { id: 12, name: 'Liam Anderson',   role: 'Content Strategist',department: 'Marketing',   status: 'Active',    salary: 72000  },
    { id: 13, name: 'Mia Thompson',    role: 'Marketing Lead',    department: 'Marketing',   status: 'Inactive',  salary: 84000  },
    { id: 14, name: 'Noah Jackson',    role: 'SRE',               department: 'Operations',  status: 'Active',    salary: 115000 },
    { id: 15, name: 'Olivia Harris',   role: 'Product Designer',  department: 'Design',      status: 'Active',    salary: 90000  },
  ];

  /* ── Product data (action menu + dialog demo) ── */
  productCols: TableColumn[] = [
    { key: 'sku',      label: 'SKU',      sortable: true, width: '90px' },
    { key: 'name',     label: 'Product',  sortable: true, minWidth: '160px' },
    { key: 'category', label: 'Category', sortable: true, minWidth: '110px' },
    { key: 'stock',    label: 'Stock',    sortable: true, width: '80px', align: 'right', type: 'number' },
    { key: 'price',    label: 'Price',    sortable: true, width: '100px', align: 'right', type: 'currency' },
    {
      key: 'status', label: 'Status', sortable: true, width: '130px', type: 'badge',
      badgeMap: {
        'In Stock':     { color: '#10b981' },
        'Low Stock':    { color: '#f59e0b' },
        'Out of Stock': { color: '#ef4444' },
      }
    },
  ];

  products = Array.from({ length: 22 }, (_, i) => {
    const stocks = [48,12,0,35,5,23,0,67,89,4,11,29,52,108,0,19,37,14,61,3,26,45];
    const s = stocks[i];
    return {
      sku: `PRD-${String(i+1).padStart(4,'0')}`,
      name: ['Wireless Headphones','Mechanical Keyboard','USB-C Hub','Monitor Stand','Webcam HD',
        'Laptop Sleeve','Mouse Pad XL','LED Desk Lamp','Cable Organizer','Ergonomic Chair',
        'Standing Desk','Monitor Arm','Keyboard Wrist Rest','Screen Cleaner','Cable Clips',
        'Surge Protector','Laptop Stand','Blue Light Glasses','Desk Organizer','Phone Stand',
        'Noise Machine','Task Light'][i],
      category: ['Audio','Input','Connectivity','Accessories','Cameras',
        'Cases','Accessories','Lighting','Cables','Furniture',
        'Furniture','Mounting','Accessories','Cleaning','Cables',
        'Power','Mounting','Eyewear','Storage','Accessories','Audio','Lighting'][i],
      stock: s,
      price: [79.99,129.99,49.99,39.99,99.99,29.99,24.99,59.99,14.99,349.99,
        599.99,79.99,19.99,9.99,8.99,34.99,44.99,29.99,39.99,12.99,49.99,39.99][i],
      status: s === 0 ? 'Out of Stock' : s < 10 ? 'Low Stock' : 'In Stock',
    };
  });

  /* ── Form & confirm dialogs ─────────────────── */
  dialogOpen      = false;
  dialogTitle     = '';
  dialogData: Record<string, unknown> = {};
  dialogSaveLabel = 'Save';
  confirmOpen     = false;
  confirmRow: Record<string, unknown> | null = null;

  productFormFields: FormDialogField[] = [
    { key: 'sku',      label: 'SKU',          placeholder: 'PRD-0001', span: 'half' },
    { key: 'name',     label: 'Product Name', placeholder: 'e.g. Wireless Headphones', required: true, span: 'half' },
    { key: 'category', label: 'Category', type: 'select', required: true, span: 'half',
      options: [
        { label: 'Audio',        value: 'Audio'        },
        { label: 'Input',        value: 'Input'        },
        { label: 'Connectivity', value: 'Connectivity' },
        { label: 'Accessories',  value: 'Accessories'  },
        { label: 'Furniture',    value: 'Furniture'    },
        { label: 'Lighting',     value: 'Lighting'     },
      ]
    },
    { key: 'stock',  label: 'Stock',     type: 'number', placeholder: '0',    span: 'half' },
    { key: 'price',  label: 'Price ($)', type: 'number', placeholder: '0.00', span: 'half', required: true },
    { key: 'status', label: 'Status',    type: 'select', span: 'half',
      options: [
        { label: 'In Stock',     value: 'In Stock'     },
        { label: 'Low Stock',    value: 'Low Stock'    },
        { label: 'Out of Stock', value: 'Out of Stock' },
      ]
    },
  ];

  dialogActions: TableAction[] = [
    {
      label: 'Add Product',
      icon: '<svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
      action: (_row) => {
        this.dialogTitle = 'Add Product'; this.dialogSaveLabel = 'Add Product';
        this.dialogData  = {}; this.dialogOpen = true; this.cdr.markForCheck();
      },
    },
    {
      label: 'Edit Product',
      icon: '<svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="M13.586 3.586a2 2 0 112.828 2.828l-9.9 9.9-3.414.586.586-3.414 9.9-9.9z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      action: (row) => {
        this.dialogTitle = 'Edit Product'; this.dialogSaveLabel = 'Save Changes';
        this.dialogData  = { ...row }; this.dialogOpen = true; this.cdr.markForCheck();
      },
    },
    {
      label: 'Remove Product',
      icon: '<svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="M4 5h12M8 5V4a1 1 0 011-1h2a1 1 0 011 1v1M6 5l1 11h6l1-11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      action: (row) => { this.confirmRow = row; this.confirmOpen = true; this.cdr.markForCheck(); },
    },
  ];

  onDialogSave(e: FormDialogSaveEvent): void {
    this.dialogLog = [`${this.dialogTitle}: ${String(e.data['name'])}`, ...this.dialogLog.slice(0, 4)];
    this.dialogOpen = false; this.cdr.markForCheck();
  }
  onDialogClose(): void { this.dialogOpen = false; this.cdr.markForCheck(); }
  onConfirmDelete(): void {
    if (this.confirmRow) this.dialogLog = [`Deleted: ${String(this.confirmRow['name'])}`, ...this.dialogLog.slice(0, 4)];
    this.confirmOpen = false; this.confirmRow = null; this.cdr.markForCheck();
  }
  onConfirmCancel(): void { this.confirmOpen = false; this.confirmRow = null; this.cdr.markForCheck(); }

  /* ── Code snippets ──────────────────────────── */
  angHtml = `<pui-lib-data-table
  [columns]="columns"
  [data]="employees"
  [searchable]="true"
  [sortable]="true"
  [paginated]="true"
  [pageSize]="10"
  [striped]="true"
  [selectable]="true"
  (rowClick)="onRowClick($event)"
  (selectionChange)="onSelectionChange($event)">
</pui-lib-data-table>`;

  angTs = `import { PuiDataTableComponent, TableColumn, TableAction } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiDataTableComponent] })
export class MyComponent {
  columns: TableColumn[] = [
    { key: 'name',   label: 'Name',   sortable: true },
    { key: 'status', label: 'Status', type: 'badge',
      badgeMap: { Active: { color: '#10b981' }, Inactive: { color: '#6b7280' } } },
    { key: 'salary', label: 'Salary', align: 'right', type: 'currency' },
  ];
  employees = [
    { name: 'Alice', status: 'Active',   salary: 95000 },
    { name: 'Bob',   status: 'Inactive', salary: 85000 },
  ];
  actions: TableAction[] = [
    { label: 'Edit',   action: (row) => this.onEdit(row)   },
    { label: 'Delete', action: (row) => this.onDelete(row) },
  ];
  onRowClick(row: any) { console.log('Row:', row); }
  onSelectionChange(rows: any[]) { console.log('Selected:', rows.length); }
  onEdit(row: any)   { /* open dialog */ }
  onDelete(row: any) { /* confirm then delete */ }
}`;

  xfwRows = [
    { name: 'columns',         angular: '[columns]="colsArray"',           attr: '— use JS property',      js: 'el.columns = [{key,label,...}]' },
    { name: 'data',            angular: '[data]="rowsArray"',              attr: '— use JS property',      js: 'el.data = [{...},...]' },
    { name: 'searchable',      angular: '[searchable]="bool"',             attr: 'searchable="true"',      js: 'el.searchable = true' },
    { name: 'sortable',        angular: '[sortable]="bool"',               attr: 'sortable="true"',        js: 'el.sortable = true' },
    { name: 'paginated',       angular: '[paginated]="bool"',              attr: 'paginated="true"',       js: 'el.paginated = true' },
    { name: 'pageSize',        angular: '[pageSize]="10"',                 attr: 'page-size="10"',         js: 'el.pageSize = 10' },
    { name: 'selectable',      angular: '[selectable]="bool"',             attr: 'selectable="true"',      js: 'el.selectable = true' },
    { name: 'stickyHeader',    angular: '[stickyHeader]="bool"',           attr: 'sticky-header="true"',   js: 'el.stickyHeader = true' },
    { name: 'maxHeight',       angular: '[maxHeight]="400"',               attr: 'max-height="400"',       js: 'el.maxHeight = 400' },
    { name: 'striped',         angular: '[striped]="bool"',                attr: 'striped="true"',         js: 'el.striped = true' },
    { name: 'loading',         angular: '[loading]="bool"',                attr: 'loading="true"',         js: 'el.loading = true' },
    { name: 'actions',         angular: '[actions]="actionsArray"',        attr: '— use JS property',      js: 'el.actions = [{label,action}]' },
    { name: 'rowClick',        angular: '(rowClick)="fn($event)"',         attr: '— use addEventListener', js: 'el.addEventListener("rowClick", fn)' },
    { name: 'selectionChange', angular: '(selectionChange)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("selectionChange", fn)' },
    { name: 'pageChange',      angular: '(pageChange)="fn($event)"',       attr: '— use addEventListener', js: 'el.addEventListener("pageChange", fn)' },
    { name: 'sortChange',      angular: '(sortChange)="fn($event)"',       attr: '— use addEventListener', js: 'el.addEventListener("sortChange", fn)' },
  ];

  api: ApiRow[] = [
    { input: 'columns',         type: 'TableColumn[]',            default: '[]',    description: 'Column definitions: key, label, sortable, width, align, type, badgeMap' },
    { input: 'data',            type: 'any[]',                    default: '[]',    description: 'Row data array' },
    { input: 'searchable',      type: 'boolean',                  default: 'false', description: 'Shows a global search/filter input in the toolbar' },
    { input: 'sortable',        type: 'boolean',                  default: 'false', description: 'Enables column-level sort toggling' },
    { input: 'paginated',       type: 'boolean',                  default: 'false', description: 'Enables pagination controls at the bottom' },
    { input: 'pageSize',        type: 'number',                   default: '10',    description: 'Initial rows per page' },
    { input: 'selectable',      type: 'boolean',                  default: 'false', description: 'Shows checkboxes for row selection with select-all header' },
    { input: 'stickyHeader',    type: 'boolean',                  default: 'false', description: 'Freezes the header row while the body scrolls' },
    { input: 'maxHeight',       type: 'number',                   default: '0',     description: 'Max height (px) of the scroll container; 0 = no limit' },
    { input: 'striped',         type: 'boolean',                  default: 'false', description: 'Alternating row background shading' },
    { input: 'loading',         type: 'boolean',                  default: 'false', description: 'Overlays a shimmer skeleton while data is fetching' },
    { input: 'actions',         type: 'TableAction[]',            default: '[]',    description: 'Row-level actions shown in a 3-dot dropdown menu' },
    { input: 'rowId',           type: 'string',                   default: "'id'",  description: 'Row identity key for stable selection across pages' },
    { input: 'rowClick',        type: 'EventEmitter<any>',        default: '—',     description: 'Emits the clicked row object' },
    { input: 'selectionChange', type: 'EventEmitter<any[]>',      default: '—',     description: 'Emits the full array of currently selected rows' },
    { input: 'pageChange',      type: 'EventEmitter<number>',     default: '—',     description: 'Emits the new page number' },
    { input: 'sortChange',      type: 'EventEmitter<{key,dir}>',  default: '—',     description: 'Emits the active sort key and direction' },
    { input: 'searchChange',    type: 'EventEmitter<string>',     default: '—',     description: 'Emits the current search term on every keystroke' },
    { input: 'actionClick',     type: 'EventEmitter<{action,row}>',default: '—',    description: 'Emits when an action menu item is clicked' },
  ];
}
