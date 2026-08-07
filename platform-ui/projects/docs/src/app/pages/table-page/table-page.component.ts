import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PuiTableComponent, TableColumn } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'docs-table-page',
  standalone: true,
  imports: [NgFor, NgIf, PuiTableComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent {
  private cdr = inject(ChangeDetectorRef);

  t = true;  // shorthand for boolean true in template bindings
  fw = 'angular';
  copied = '';
  lastRow: any = null;
  selectedCount = 0;
  isLoading = false;

  copy(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
    this.cdr.markForCheck();
  }

  /* ── Demo data ──────────────────────────────────── */
  employeeCols: TableColumn[] = [
    { key: 'id',         label: 'ID',         sortable: true,  width: '60px',  align: 'center', type: 'number' },
    { key: 'name',       label: 'Name',       sortable: true,  minWidth: '140px' },
    { key: 'role',       label: 'Role',       sortable: true,  minWidth: '120px' },
    { key: 'department', label: 'Department', sortable: true,  minWidth: '120px' },
    { key: 'status',     label: 'Status',     sortable: true,  width: '110px',  type: 'badge',
      badgeMap: {
        Active:     { color: '#10b981' },
        Inactive:   { color: '#6b7280' },
        'On Leave': { color: '#f59e0b' },
      }
    },
    { key: 'salary', label: 'Salary', sortable: true, width: '110px', align: 'right', type: 'currency' },
  ];

  employees = [
    { id: 1,  name: 'Alice Johnson',   role: 'Frontend Engineer',  department: 'Engineering', status: 'Active',   salary: 95000 },
    { id: 2,  name: 'Bob Martinez',    role: 'Product Manager',    department: 'Product',     status: 'Active',   salary: 110000 },
    { id: 3,  name: 'Carol Smith',     role: 'UX Designer',        department: 'Design',      status: 'On Leave', salary: 85000 },
    { id: 4,  name: 'David Lee',       role: 'Backend Engineer',   department: 'Engineering', status: 'Active',   salary: 105000 },
    { id: 5,  name: 'Emma Wilson',     role: 'QA Engineer',        department: 'Engineering', status: 'Active',   salary: 80000 },
    { id: 6,  name: 'Frank Chen',      role: 'DevOps Engineer',    department: 'Operations',  status: 'Inactive', salary: 92000 },
    { id: 7,  name: 'Grace Kim',       role: 'Data Analyst',       department: 'Analytics',   status: 'Active',   salary: 88000 },
    { id: 8,  name: 'Henry Davis',     role: 'Tech Lead',          department: 'Engineering', status: 'Active',   salary: 120000 },
    { id: 9,  name: 'Isabella Moore',  role: 'Scrum Master',       department: 'Product',     status: 'Active',   salary: 95000 },
    { id: 10, name: 'James Taylor',    role: 'Security Engineer',  department: 'Operations',  status: 'On Leave', salary: 102000 },
    { id: 11, name: 'Karen White',     role: 'Mobile Engineer',    department: 'Engineering', status: 'Active',   salary: 98000 },
    { id: 12, name: 'Liam Anderson',   role: 'Content Strategist', department: 'Marketing',   status: 'Active',   salary: 72000 },
    { id: 13, name: 'Mia Thompson',    role: 'Marketing Lead',     department: 'Marketing',   status: 'Inactive', salary: 84000 },
    { id: 14, name: 'Noah Jackson',    role: 'SRE',                department: 'Operations',  status: 'Active',   salary: 115000 },
    { id: 15, name: 'Olivia Harris',   role: 'Product Designer',   department: 'Design',      status: 'Active',   salary: 90000 },
  ];

  productCols: TableColumn[] = [
    { key: 'sku',      label: 'SKU',      sortable: true, width: '90px' },
    { key: 'name',     label: 'Product',  sortable: true, minWidth: '160px' },
    { key: 'category', label: 'Category', sortable: true, minWidth: '110px' },
    { key: 'stock',    label: 'Stock',    sortable: true, width: '80px',  align: 'right', type: 'number' },
    { key: 'price',    label: 'Price',    sortable: true, width: '100px', align: 'right', type: 'currency' },
    { key: 'status',   label: 'Status',   sortable: true, width: '110px', type: 'badge',
      badgeMap: {
        'In Stock':    { color: '#10b981' },
        'Low Stock':   { color: '#f59e0b' },
        'Out of Stock':{ color: '#ef4444' },
      }
    },
  ];

  products = Array.from({ length: 22 }, (_, i) => ({
    sku:      `PRD-${String(i + 1).padStart(4, '0')}`,
    name:     ['Wireless Headphones', 'Mechanical Keyboard', 'USB-C Hub', 'Monitor Stand', 'Webcam HD',
                'Laptop Sleeve', 'Mouse Pad XL', 'LED Desk Lamp', 'Cable Organizer', 'Ergonomic Chair',
                'Standing Desk', 'Monitor Arm', 'Keyboard Wrist Rest', 'Screen Cleaner', 'Cable Clips',
                'Surge Protector', 'Laptop Stand', 'Blue Light Glasses', 'Desk Organizer', 'Phone Stand',
                'Noise Machine', 'Task Light'][i],
    category: ['Audio', 'Input', 'Connectivity', 'Accessories', 'Cameras',
                'Cases', 'Accessories', 'Lighting', 'Cables', 'Furniture',
                'Furniture', 'Mounting', 'Accessories', 'Cleaning', 'Cables',
                'Power', 'Mounting', 'Eyewear', 'Storage', 'Accessories',
                'Audio', 'Lighting'][i],
    stock:    [48, 12, 0, 35, 5, 23, 0, 67, 89, 4, 11, 29, 52, 108, 0, 19, 37, 14, 61, 3, 26, 45][i],
    price:    [79.99, 129.99, 49.99, 39.99, 99.99, 29.99, 24.99, 59.99, 14.99, 349.99,
               599.99, 79.99, 19.99, 9.99, 8.99, 34.99, 44.99, 29.99, 39.99, 12.99, 49.99, 39.99][i],
    status:   [48,12,0,35,5,23,0,67,89,4,11,29,52,108,0,19,37,14,61,3,26,45][i] === 0
               ? 'Out of Stock'
               : [48,12,0,35,5,23,0,67,89,4,11,29,52,108,0,19,37,14,61,3,26,45][i] < 10
               ? 'Low Stock' : 'In Stock',
  }));

  orderCols: TableColumn[] = [
    { key: 'orderId',  label: 'Order',    width: '100px' },
    { key: 'customer', label: 'Customer', sortable: true, minWidth: '130px' },
    { key: 'date',     label: 'Date',     sortable: true, width: '120px', type: 'date' },
    { key: 'items',    label: 'Items',    width: '70px',  align: 'center', type: 'number' },
    { key: 'total',    label: 'Total',    sortable: true, width: '110px', align: 'right', type: 'currency' },
    { key: 'status',   label: 'Status',   sortable: true, width: '120px', type: 'badge',
      badgeMap: {
        Completed: { color: '#10b981' },
        Pending:   { color: '#f59e0b' },
        Shipped:   { color: '#3b82f6' },
        Cancelled: { color: '#ef4444' },
        Refunded:  { color: '#8b5cf6' },
      }
    },
  ];

  orders = [
    { orderId: '#ORD-001', customer: 'Alice Johnson',  date: new Date('2024-11-01'), items: 3, total: 189.97, status: 'Completed' },
    { orderId: '#ORD-002', customer: 'Bob Martinez',   date: new Date('2024-11-03'), items: 1, total: 49.99,  status: 'Shipped'   },
    { orderId: '#ORD-003', customer: 'Carol Smith',    date: new Date('2024-11-05'), items: 5, total: 374.95, status: 'Pending'   },
    { orderId: '#ORD-004', customer: 'David Lee',      date: new Date('2024-11-07'), items: 2, total: 219.98, status: 'Completed' },
    { orderId: '#ORD-005', customer: 'Emma Wilson',    date: new Date('2024-11-08'), items: 4, total: 99.96,  status: 'Cancelled' },
    { orderId: '#ORD-006', customer: 'Frank Chen',     date: new Date('2024-11-10'), items: 1, total: 129.99, status: 'Refunded'  },
    { orderId: '#ORD-007', customer: 'Grace Kim',      date: new Date('2024-11-11'), items: 7, total: 549.93, status: 'Completed' },
    { orderId: '#ORD-008', customer: 'Henry Davis',    date: new Date('2024-11-12'), items: 2, total: 164.98, status: 'Shipped'   },
    { orderId: '#ORD-009', customer: 'Isabella Moore', date: new Date('2024-11-14'), items: 3, total: 239.97, status: 'Pending'   },
    { orderId: '#ORD-010', customer: 'James Taylor',   date: new Date('2024-11-15'), items: 6, total: 399.94, status: 'Completed' },
  ];

  simpleCols: TableColumn[] = [
    { key: 'lang',    label: 'Language' },
    { key: 'version', label: 'Version',  align: 'center' },
    { key: 'type',    label: 'Type',     align: 'center' },
    { key: 'license', label: 'License',  align: 'center' },
  ];

  simpleData = [
    { lang: 'TypeScript', version: '5.4', type: 'Compiled', license: 'Apache 2.0' },
    { lang: 'Angular',    version: '17',  type: 'Framework', license: 'MIT'       },
    { lang: 'RxJS',       version: '7.8', type: 'Library',   license: 'Apache 2.0' },
    { lang: 'Node.js',    version: '20',  type: 'Runtime',   license: 'MIT'       },
  ];

  /* ── Framework usage quick-ref ──────────────────── */
  xfwRows = [
    { name: 'columns',         angular: '[columns]="colsArray"',         attr: '— use JS property',      js: 'el.columns = [{key,label,...}]' },
    { name: 'data',            angular: '[data]="rowsArray"',            attr: '— use JS property',      js: 'el.data = [{...},...]' },
    { name: 'searchable',      angular: '[searchable]="bool"',           attr: 'searchable="true"',      js: 'el.searchable = true' },
    { name: 'sortable',        angular: '[sortable]="bool"',             attr: 'sortable="true"',        js: 'el.sortable = true' },
    { name: 'paginated',       angular: '[paginated]="bool"',            attr: 'paginated="true"',       js: 'el.paginated = true' },
    { name: 'pageSize',        angular: '[pageSize]="10"',               attr: 'page-size="10"',         js: 'el.pageSize = 10' },
    { name: 'stickyHeader',    angular: '[stickyHeader]="bool"',         attr: 'sticky-header="true"',   js: 'el.stickyHeader = true' },
    { name: 'maxHeight',       angular: '[maxHeight]="400"',             attr: 'max-height="400"',       js: 'el.maxHeight = 400' },
    { name: 'striped',         angular: '[striped]="bool"',              attr: 'striped="true"',         js: 'el.striped = true' },
    { name: 'selectable',      angular: '[selectable]="bool"',           attr: 'selectable="true"',      js: 'el.selectable = true' },
    { name: 'loading',         angular: '[loading]="bool"',              attr: 'loading="true"',         js: 'el.loading = true' },
    { name: 'sortChange',      angular: '(sortChange)="fn($event)"',     attr: '— use addEventListener', js: 'el.addEventListener("sortChange", fn)' },
    { name: 'pageChange',      angular: '(pageChange)="fn($event)"',     attr: '— use addEventListener', js: 'el.addEventListener("pageChange", fn)' },
    { name: 'rowClick',        angular: '(rowClick)="fn($event)"',       attr: '— use addEventListener', js: 'el.addEventListener("rowClick", fn)' },
    { name: 'selectionChange', angular: '(selectionChange)="fn($event)"',attr: '— use addEventListener', js: 'el.addEventListener("selectionChange", fn)' },
  ];

  /* ── Code snippets ──────────────────────────────── */
  angHtml = `<pui-lib-table
  [columns]="columns"
  [data]="employees"
  [searchable]="true"
  [sortable]="true"
  [paginated]="true"
  [pageSize]="10"
  [striped]="true"
  [selectable]="true"
  (sortChange)="onSort($event)"
  (rowClick)="onRowClick($event)"
  (selectionChange)="onSelectionChange($event)">
</pui-lib-table>`;

  angTs = `import { PuiTableComponent, TableColumn } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiTableComponent] })
export class MyComponent {
  columns: TableColumn[] = [
    { key: 'name',   label: 'Name',   sortable: true },
    { key: 'role',   label: 'Role',   sortable: true },
    { key: 'status', label: 'Status', sortable: true, type: 'badge',
      badgeMap: {
        Active:   { color: '#10b981' },
        Inactive: { color: '#6b7280' },
      }
    },
    { key: 'salary', label: 'Salary', sortable: true,
      align: 'right', type: 'currency' },
  ];

  employees = [
    { name: 'Alice', role: 'Engineer',  status: 'Active',   salary: 95000 },
    { name: 'Bob',   role: 'Designer',  status: 'Inactive', salary: 85000 },
  ];

  onSort(e: { key: string; dir: string }) { console.log('Sort:', e); }
  onRowClick(row: any)    { console.log('Row:', row); }
  onSelectionChange(rows: any[]) { console.log('Selected:', rows.length); }
}`;

  reactCode = `import { useEffect, useRef } from 'react';

const COLUMNS = [
  { key: 'name',   label: 'Name',   sortable: true },
  { key: 'role',   label: 'Role',   sortable: true },
  { key: 'status', label: 'Status', type: 'badge',
    badgeMap: {
      Active:   { color: '#10b981' },
      Inactive: { color: '#6b7280' },
    }
  },
  { key: 'salary', label: 'Salary', align: 'right', type: 'currency' },
];

const DATA = [
  { name: 'Alice', role: 'Engineer',  status: 'Active',   salary: 95000 },
  { name: 'Bob',   role: 'Designer',  status: 'Inactive', salary: 85000 },
];

export function EmployeeTable() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.columns   = COLUMNS;       // JS property — array
    el.data      = DATA;          // JS property — array
    el.searchable  = true;
    el.sortable    = true;
    el.paginated   = true;
    el.pageSize    = 10;
    el.striped     = true;
    el.selectable  = true;

    const onRow = (e) => console.log('Row:', e.detail);
    el.addEventListener('rowClick', onRow);
    return () => el.removeEventListener('rowClick', onRow);
  }, []);

  return <pui-lib-table ref={ref}/>;
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-lib-table
  id="myTable"
  searchable="true"
  sortable="true"
  paginated="true"
  page-size="10"
  striped="true"
  selectable="true">
</pui-lib-table>

<script>
  customElements.whenDefined('pui-lib-table').then(() => {
    const el = document.getElementById('myTable');

    el.columns = [
      { key: 'name',   label: 'Name',   sortable: true },
      { key: 'role',   label: 'Role',   sortable: true },
      { key: 'status', label: 'Status', type: 'badge',
        badgeMap: {
          Active:   { color: '#10b981' },
          Inactive: { color: '#6b7280' },
        }
      },
      { key: 'salary', label: 'Salary', align: 'right', type: 'currency' },
    ];

    el.data = [
      { name: 'Alice', role: 'Engineer',  status: 'Active',   salary: 95000 },
      { name: 'Bob',   role: 'Designer',  status: 'Inactive', salary: 85000 },
    ];

    el.addEventListener('rowClick',  e => console.log('Row:', e.detail));
    el.addEventListener('sortChange',e => console.log('Sort:', e.detail));
    el.addEventListener('selectionChange', e =>
      console.log('Selected:', e.detail.length, 'rows'));
  });
</script>`;

  /* ── Component API ──────────────────────────────── */
  api: ApiRow[] = [
    { input: 'columns',         type: 'TableColumn[]',    default: '[]',     description: 'Column definitions — key, label, sortable, width, align, type, badgeMap' },
    { input: 'data',            type: 'any[]',            default: '[]',     description: 'Row data array; each object key must match a column key' },
    { input: 'searchable',      type: 'boolean',          default: 'false',  description: 'Shows a global search/filter input in the toolbar' },
    { input: 'sortable',        type: 'boolean',          default: 'false',  description: 'Enables column-level sort toggling (asc → desc → none)' },
    { input: 'paginated',       type: 'boolean',          default: 'false',  description: 'Enables pagination controls at the bottom' },
    { input: 'pageSize',        type: 'number',           default: '10',     description: 'Initial rows per page (user can change with the dropdown)' },
    { input: 'stickyHeader',    type: 'boolean',          default: 'false',  description: 'Freezes the header row while the body scrolls vertically' },
    { input: 'maxHeight',       type: 'number',           default: '0',      description: 'Max height (px) of the scroll container; 0 = no limit' },
    { input: 'striped',         type: 'boolean',          default: 'false',  description: 'Alternating row background shading' },
    { input: 'selectable',      type: 'boolean',          default: 'false',  description: 'Shows checkboxes for row selection with a select-all header' },
    { input: 'loading',         type: 'boolean',          default: 'false',  description: 'Overlays a shimmer skeleton while data is fetching' },
    { input: 'sortChange',      type: 'EventEmitter<{key,dir}>',default: '—','description': 'Emits the active sort key and direction on each sort toggle' },
    { input: 'pageChange',      type: 'EventEmitter<number>',   default: '—','description': 'Emits the new page number when the user navigates pages' },
    { input: 'searchChange',    type: 'EventEmitter<string>',   default: '—','description': 'Emits the current search term on every keystroke' },
    { input: 'rowClick',        type: 'EventEmitter<any>',      default: '—','description': 'Emits the clicked row object' },
    { input: 'selectionChange', type: 'EventEmitter<any[]>',    default: '—','description': 'Emits the full array of currently selected row objects' },
  ];
}
