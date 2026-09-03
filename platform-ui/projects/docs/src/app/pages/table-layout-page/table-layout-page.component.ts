import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  PuiDataTableComponent,
  TableColumn,
  TableAction,
  SortState,
} from '@bhairab-patra/platform-ui';
import { DocPageComponent } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

interface Order {
  id: string;
  customer: string;
  items: string[];
  amount: number;
  placedOn: string;
  status: 'Paid' | 'Pending' | 'Refunded' | 'Cancelled';
}

const COLUMNS: TableColumn[] = [
  { key: 'id', label: 'Order ID', sortable: true, width: '110px' },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'items', label: 'Items', type: 'pills' },
  { key: 'amount', label: 'Amount', type: 'currency', align: 'right', sortable: true },
  { key: 'placedOn', label: 'Placed On', type: 'date', sortable: true },
  {
    key: 'status',
    label: 'Status',
    type: 'badge',
    badgeMap: {
      Paid: { label: 'Paid', color: '#12C6A8' },
      Pending: { label: 'Pending', color: '#d97706' },
      Refunded: { label: 'Refunded', color: '#3b82f6' },
      Cancelled: { label: 'Cancelled', color: '#dc2626' },
    },
  },
];

const ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    customer: 'Alice Johnson',
    items: ['Laptop', 'Mouse'],
    amount: 1499.99,
    placedOn: '2026-08-01',
    status: 'Paid',
  },
  {
    id: 'ORD-1002',
    customer: 'Bob Smith',
    items: ['Monitor'],
    amount: 329.5,
    placedOn: '2026-08-03',
    status: 'Pending',
  },
  {
    id: 'ORD-1003',
    customer: 'Carol White',
    items: ['Keyboard', 'Headset', 'Webcam'],
    amount: 214.0,
    placedOn: '2026-08-05',
    status: 'Paid',
  },
  {
    id: 'ORD-1004',
    customer: 'David Lee',
    items: ['Chair'],
    amount: 189.0,
    placedOn: '2026-08-06',
    status: 'Refunded',
  },
  {
    id: 'ORD-1005',
    customer: 'Eve Brown',
    items: ['Desk', 'Lamp'],
    amount: 540.25,
    placedOn: '2026-08-09',
    status: 'Paid',
  },
  {
    id: 'ORD-1006',
    customer: 'Frank Miller',
    items: ['Laptop Stand'],
    amount: 49.99,
    placedOn: '2026-08-10',
    status: 'Cancelled',
  },
  {
    id: 'ORD-1007',
    customer: 'Grace Kim',
    items: ['Tablet'],
    amount: 699.0,
    placedOn: '2026-08-11',
    status: 'Pending',
  },
  {
    id: 'ORD-1008',
    customer: 'Henry Ford',
    items: ['Router'],
    amount: 89.99,
    placedOn: '2026-08-12',
    status: 'Paid',
  },
];

type FileTab = 'ts' | 'html' | 'scss';

@Component({
  selector: 'docs-table-layout-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, PuiDataTableComponent, DocPageComponent, CodeBlockComponent],
  templateUrl: './table-layout-page.component.html',
  styleUrls: ['./table-layout-page.component.scss'],
})
export class TableLayoutPageComponent {
  private cdr = inject(ChangeDetectorRef);

  columns = COLUMNS;
  orders = ORDERS;
  page = 1;
  lastEvent = 'None yet — interact with the table above.';

  actions: TableAction[] = [
    { label: 'View', action: (row: Order) => this.log(`View clicked: ${row.id}`) },
    { label: 'Edit', action: (row: Order) => this.log(`Edit clicked: ${row.id}`) },
    {
      label: 'Cancel Order',
      action: (row: Order) => this.log(`Cancel clicked: ${row.id}`),
      disabled: (row: Order) => row.status === 'Cancelled' || row.status === 'Refunded',
    },
  ];

  private log(msg: string): void {
    this.lastEvent = msg;
    this.cdr.markForCheck();
  }

  onSort(sort: SortState): void {
    this.log(`sortChange → ${sort.key} (${sort.dir})`);
  }
  onPage(page: number): void {
    this.page = page;
    this.log(`pageChange → page ${page}`);
  }
  onSearch(term: string): void {
    this.log(`searchChange → "${term}"`);
  }
  onRowClick(row: Order): void {
    this.log(`rowClick → ${row.id}`);
  }
  onSelectionChange(rows: Order[]): void {
    this.log(`selectionChange → ${rows.length} row(s) selected`);
  }
  onActionClick(evt: { action: TableAction; row: Order }): void {
    this.log(`actionClick → "${evt.action.label}" on ${evt.row.id}`);
  }

  activeTab: FileTab = 'ts';
  copied = '';

  setTab(t: FileTab): void {
    this.activeTab = t;
    this.cdr.markForCheck();
  }

  doCopy(text: string, id: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => {
        this.copied = '';
        this.cdr.markForCheck();
      }, 2000);
    });
  }

  files: Record<FileTab, string> = {
    ts: `import { Component } from '@angular/core';
import {
  PuiDataTableComponent, TableColumn, TableAction, SortState,
} from '@bhairab-patra/platform-ui';

interface Order {
  id: string;
  customer: string;
  items: string[];
  amount: number;
  placedOn: string;
  status: 'Paid' | 'Pending' | 'Refunded' | 'Cancelled';
}

const COLUMNS: TableColumn[] = [
  { key: 'id',       label: 'Order ID', sortable: true, width: '110px' },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'items',    label: 'Items',    type: 'pills' },
  { key: 'amount',   label: 'Amount',   type: 'currency', align: 'right', sortable: true },
  { key: 'placedOn', label: 'Placed On', type: 'date', sortable: true },
  {
    key: 'status', label: 'Status', type: 'badge',
    badgeMap: {
      Paid:      { label: 'Paid',      color: '#12C6A8' },
      Pending:   { label: 'Pending',   color: '#d97706' },
      Refunded:  { label: 'Refunded',  color: '#3b82f6' },
      Cancelled: { label: 'Cancelled', color: '#dc2626' },
    },
  },
];

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [PuiDataTableComponent],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss',
})
export class OrdersTableComponent {
  columns = COLUMNS;
  orders: Order[] = []; // fetch from your API

  // Row action menu (the 3-dot button per row) — TableAction.action's row
  // param is untyped (any), so cast/annotate it per-callback like this.
  // TableAction.icon (optional) takes a raw SVG string, not an icon name.
  actions: TableAction[] = [
    { label: 'View', action: (row: Order) => this.viewOrder(row) },
    { label: 'Edit', action: (row: Order) => this.editOrder(row) },
    {
      label: 'Cancel Order',
      action: (row: Order) => this.cancelOrder(row),
      // Grey out + block the click for rows this doesn't apply to
      disabled: (row: Order) => row.status === 'Cancelled' || row.status === 'Refunded',
    },
  ];

  viewOrder(row: Order)   { /* ... */ }
  editOrder(row: Order)   { /* ... */ }
  cancelOrder(row: Order) { /* ... */ }

  onSort(sort: SortState)              { /* re-sort / re-fetch */ }
  onPage(page: number)                 { /* re-fetch this page from the server, if server-paginated */ }
  onSearch(term: string)               { /* re-fetch filtered by term, if server-searched */ }
  onRowClick(row: Order)               { /* navigate to a detail view, etc. */ }
  onSelectionChange(rows: Order[])     { /* bulk-action toolbar, etc. */ }
  onActionClick(evt: { action: TableAction; row: Order }) { /* already routed via action.action(row) above — use this only if you need a single combined handler instead */ }
}`,

    html: `<pui-lib-data-table
  heading="Orders"
  [columns]="columns"
  [data]="orders"
  [actions]="actions"

  [sortable]="true"
  [searchable]="true"
  [selectable]="true"
  [paginated]="true"
  [pageSize]="5"
  [stickyHeader]="true"
  [striped]="true"
  [maxHeight]="480"

  emptyTitle="No orders yet"
  emptyDescription="Orders will show up here once customers start checking out."

  (sortChange)="onSort($event)"
  (pageChange)="onPage($event)"
  (searchChange)="onSearch($event)"
  (rowClick)="onRowClick($event)"
  (selectionChange)="onSelectionChange($event)"
  (actionClick)="onActionClick($event)">
</pui-lib-data-table>`,

    scss: `:host {
  display: block;
}`,
  };
}
