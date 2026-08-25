import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PuiTableComponent, PuiDataTableComponent, TableColumn, TableAction } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../../shared/doc-page.component';
import { CodeBlockComponent } from '../../../shared/code-block.component';

@Component({
  selector: 'docs-table-display-page',
  standalone: true,
  imports: [NgFor, NgIf, PuiTableComponent, PuiDataTableComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-display-page.component.html',
  styleUrls: ['./table-display-page.component.scss'],
})
export class TableDisplayPageComponent {
  private cdr = inject(ChangeDetectorRef);

  t = true;
  fw = 'angular';
  copied = '';
  isLoading = false;
  lastAction = '';

  copy(id: string, text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  toggleLoading(): void { this.isLoading = !this.isLoading; this.cdr.markForCheck(); }

  trackByIndex(_i: number): number { return _i; }

  /* ── Simple demo data ───────────────────────── */
  simpleCols: TableColumn[] = [
    { key: 'lang', label: 'Language' },
    { key: 'version', label: 'Version', align: 'center' },
    { key: 'type', label: 'Type', align: 'center' },
    { key: 'license', label: 'License', align: 'center' },
  ];

  simpleData = [
    { lang: 'TypeScript', version: '5.4', type: 'Compiled', license: 'Apache 2.0' },
    { lang: 'Angular', version: '17', type: 'Framework', license: 'MIT' },
    { lang: 'RxJS', version: '7.8', type: 'Library', license: 'Apache 2.0' },
    { lang: 'Node.js', version: '20', type: 'Runtime', license: 'MIT' },
  ];

  /* ── Badge + loading demo ───────────────────── */
  orderCols: TableColumn[] = [
    { key: 'orderId', label: 'Order', width: '100px' },
    { key: 'customer', label: 'Customer', sortable: true, minWidth: '130px' },
    { key: 'date', label: 'Date', sortable: true, width: '120px', type: 'date' },
    { key: 'items', label: 'Items', width: '70px', align: 'center', type: 'number' },
    { key: 'total', label: 'Total', sortable: true, width: '110px', align: 'right', type: 'currency' },
    {
      key: 'status', label: 'Status', sortable: true, width: '120px', type: 'badge',
      badgeMap: {
        Completed: { color: '#10b981' }, Pending: { color: '#f59e0b' },
        Shipped: { color: '#3b82f6' }, Cancelled: { color: '#ef4444' },
        Refunded: { color: '#8b5cf6' },
      }
    },
  ];

  orders = [
    { orderId: '#ORD-001', customer: 'Alice Johnson', date: new Date('2024-11-01'), items: 3, total: 189.97, status: 'Completed' },
    { orderId: '#ORD-002', customer: 'Bob Martinez', date: new Date('2024-11-03'), items: 1, total: 49.99, status: 'Shipped' },
    { orderId: '#ORD-003', customer: 'Carol Smith', date: new Date('2024-11-05'), items: 5, total: 374.95, status: 'Pending' },
    { orderId: '#ORD-004', customer: 'David Lee', date: new Date('2024-11-07'), items: 2, total: 219.98, status: 'Completed' },
    { orderId: '#ORD-005', customer: 'Emma Wilson', date: new Date('2024-11-08'), items: 4, total: 99.96, status: 'Cancelled' },
    { orderId: '#ORD-006', customer: 'Frank Chen', date: new Date('2024-11-10'), items: 1, total: 129.99, status: 'Refunded' },
    { orderId: '#ORD-007', customer: 'Grace Kim', date: new Date('2024-11-11'), items: 7, total: 549.93, status: 'Completed' },
    { orderId: '#ORD-008', customer: 'Henry Davis', date: new Date('2024-11-12'), items: 2, total: 164.98, status: 'Shipped' },
    { orderId: '#ORD-009', customer: 'Isabella Moore', date: new Date('2024-11-14'), items: 3, total: 239.97, status: 'Pending' },
    { orderId: '#ORD-010', customer: 'James Taylor', date: new Date('2024-11-15'), items: 6, total: 399.94, status: 'Completed' },
  ];

  /* ── Sticky + action menu demo ──────────────── */
  /* Status renders as a neutral Chip/Badge here — status colors are reserved
     for the Loading State demo above (orderCols). */
  empCols: TableColumn[] = [
    { key: 'name', label: 'Name', sortable: true, minWidth: '140px' },
    { key: 'department', label: 'Department', sortable: true, minWidth: '120px' },
    { key: 'role', label: 'Role', minWidth: '140px' },
    { key: 'status', label: 'Status', width: '100px', type: 'badge' },
  ];

  empRows = [
    { id: 1, name: 'Alice Johnson', department: 'Engineering', role: 'Frontend Engineer', status: 'Active' },
    { id: 2, name: 'Bob Martinez', department: 'Product', role: 'Product Manager', status: 'Active' },
    { id: 3, name: 'Carol Smith', department: 'Design', role: 'UX Designer', status: 'On Leave' },
    { id: 4, name: 'David Lee', department: 'Engineering', role: 'Backend Engineer', status: 'Active' },
    { id: 5, name: 'Emma Wilson', department: 'Engineering', role: 'QA Engineer', status: 'Active' },
    { id: 6, name: 'Frank Chen', department: 'Operations', role: 'DevOps Engineer', status: 'Inactive' },
    { id: 7, name: 'Grace Kim', department: 'Analytics', role: 'Data Analyst', status: 'Active' },
  ];

  empActions: TableAction[] = [
    { label: 'Add Employee', action: (row) => { this.lastAction = `Add Employee above: ${row.name}`; this.cdr.markForCheck(); } },
    { label: 'Edit Employee', action: (row) => { this.lastAction = `Edit: ${row.name}`; this.cdr.markForCheck(); } },
    {
      label: 'Remove Employee', action: (row) => { this.lastAction = `Remove: ${row.name}`; this.cdr.markForCheck(); },
      disabled: (row) => row.status === 'Inactive'
    },
  ];

  /* ── Framework usage ─────────────────────────── */
  angHtml = `<pui-lib-table
  [columns]="columns"
  [data]="rows"
  [searchable]="true"
  [sortable]="true"
  [stickyHeader]="true"
  [maxHeight]="400"
  [striped]="true"
  [actions]="actions"
  (rowClick)="onRowClick($event)">
</pui-lib-table>`;

  angTs = `import { PuiTableComponent, TableColumn, TableAction } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiTableComponent] })
export class MyComponent {
  columns: TableColumn[] = [
    { key: 'name',   label: 'Name',   sortable: true },
    { key: 'role',   label: 'Role',   sortable: true },
    { key: 'status', label: 'Status', type: 'badge',
      badgeMap: { Active: { color: '#10b981' }, Inactive: { color: '#6b7280' } } },
  ];
  rows = [
    { name: 'Alice', role: 'Engineer', status: 'Active'   },
    { name: 'Bob',   role: 'Designer', status: 'Inactive' },
  ];
  actions: TableAction[] = [
    { label: 'Edit',   action: (row) => console.log('Edit', row)   },
    { label: 'Delete', action: (row) => console.log('Delete', row) },
  ];
  onRowClick(row: any) { console.log('Clicked', row); }
}`;

  reactCode = `import { useEffect, useRef } from 'react';

export function DisplayTable() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    el.columns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'status', label: 'Status', type: 'badge',
        badgeMap: { Active: { color: '#10b981' } } },
    ];
    el.data    = [{ name: 'Alice', status: 'Active' }];
    el.sortable = true;
    el.striped  = true;
    el.actions = [{ label: 'Edit', action: (r) => console.log(r) }];
    el.addEventListener('rowClick', e => console.log(e.detail));
  }, []);
  return <pui-lib-table ref={ref} />;
}`;

  htmlCode = `<pui-lib-table id="t" sortable="true" striped="true"></pui-lib-table>
<script>
  customElements.whenDefined('pui-lib-table').then(() => {
    const el = document.getElementById('t');
    el.columns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'status', label: 'Status', type: 'badge',
        badgeMap: { Active: { color: '#10b981' } } },
    ];
    el.data    = [{ name: 'Alice', status: 'Active' }];
    el.actions = [{ label: 'Edit', action: r => console.log(r) }];
    el.addEventListener('rowClick', e => console.log(e.detail));
  });
</script>`;

  xfwRows = [
    { name: 'columns', angular: '[columns]="colsArray"', attr: '— use JS property', js: 'el.columns = [{key,label,...}]' },
    { name: 'data', angular: '[data]="rowsArray"', attr: '— use JS property', js: 'el.data = [{...},...]' },
    { name: 'heading', angular: '[heading]="\'Account Summary\'"', attr: 'heading="Account Summary"', js: 'el.heading = "Account Summary"' },
    { name: 'searchable', angular: '[searchable]="bool"', attr: 'searchable="true"', js: 'el.searchable = true' },
    { name: 'sortable', angular: '[sortable]="bool"', attr: 'sortable="true"', js: 'el.sortable = true' },
    { name: 'stickyHeader', angular: '[stickyHeader]="bool"', attr: 'sticky-header="true"', js: 'el.stickyHeader = true' },
    { name: 'maxHeight', angular: '[maxHeight]="400"', attr: 'max-height="400"', js: 'el.maxHeight = 400' },
    { name: 'striped', angular: '[striped]="bool"', attr: 'striped="true"', js: 'el.striped = true' },
    { name: 'loading', angular: '[loading]="bool"', attr: 'loading="true"', js: 'el.loading = true' },
    { name: 'actions', angular: '[actions]="actionsArray"', attr: '— use JS property', js: 'el.actions = [{label,action}]' },
    { name: 'sortChange', angular: '(sortChange)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("sortChange", fn)' },
    { name: 'searchChange', angular: '(searchChange)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("searchChange", fn)' },
    { name: 'rowClick', angular: '(rowClick)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("rowClick", fn)' },
    { name: 'actionClick', angular: '(actionClick)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("actionClick", fn)' },
  ];

  api: ApiRow[] = [
    { input: 'columns', type: 'TableColumn[]', default: '[]', description: 'Column definitions: key, label, sortable, width, align, type, badgeMap' },
    { input: 'data', type: 'any[]', default: '[]', description: 'Row data array; each key must match a column key' },
    { input: 'heading', type: 'string', default: "''", description: 'Optional title on the left of the toolbar; omit to hide it' },
    { input: 'searchable', type: 'boolean', default: 'false', description: 'Shows a global search/filter input in the toolbar; leave false to hide it' },
    { input: 'sortable', type: 'boolean', default: 'false', description: 'Enables column-level sort toggling (asc → desc → none)' },
    { input: 'stickyHeader', type: 'boolean', default: 'false', description: 'Freezes the header row while the body scrolls' },
    { input: 'maxHeight', type: 'number', default: '0', description: 'Max height (px) of the scroll container; 0 = no limit' },
    { input: 'striped', type: 'boolean', default: 'false', description: 'Alternating row background shading' },
    { input: 'loading', type: 'boolean', default: 'false', description: 'Overlays a shimmer skeleton while data is fetching' },
    { input: 'actions', type: 'TableAction[]', default: '[]', description: 'Row-level actions shown in a 3-dot dropdown menu' },
    { input: 'tooltipPosition', type: "'top'|'bottom'|'left'|'right'", default: "'top'", description: 'Direction of the cell overflow tooltip' },
    { input: 'sortChange', type: 'EventEmitter<{key,dir}>', default: '—', description: 'Emits active sort key and direction on each toggle' },
    { input: 'searchChange', type: 'EventEmitter<string>', default: '—', description: 'Emits the current search term on every keystroke' },
    { input: 'rowClick', type: 'EventEmitter<any>', default: '—', description: 'Emits the clicked row object' },
    { input: 'actionClick', type: 'EventEmitter<{action,row}>', default: '—', description: 'Emits when an action menu item is clicked' },
  ];
}
