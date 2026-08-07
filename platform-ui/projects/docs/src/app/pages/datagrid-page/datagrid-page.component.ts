import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiDataGridComponent, DataGridColumn } from '@bhairab-patra/platform-ui';

interface Employee { id: number; name: string; role: string; department: string; status: string; salary: number; joined: string; }

@Component({
  selector: 'app-datagrid-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiDataGridComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datagrid-page.component.html',
  styleUrls: ['./datagrid-page.component.scss'],
})
export class DataGridPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';
  selected: Employee[] = [];

  selectedNames(): string { return this.selected.map((r: any) => r['name']).join(', '); }

  basicCols: DataGridColumn<Employee>[] = [
    { field: 'name',       header: 'Name',       sortable: true },
    { field: 'role',       header: 'Role',       sortable: true },
    { field: 'department', header: 'Department'               },
  ];

  basicRows: any[] = [
    { id: 1, name: 'Alice Johnson',  role: 'Senior Engineer', department: 'Engineering' },
    { id: 2, name: 'Bob Smith',      role: 'Product Designer',department: 'Design'      },
    { id: 3, name: 'Carol Williams', role: 'Product Manager', department: 'Product'     },
    { id: 4, name: 'David Brown',    role: 'Frontend Dev',    department: 'Engineering' },
  ];

  empCols: DataGridColumn<Employee>[] = [
    { field: 'name',       header: 'Name',       sortable: true, width: '200px' },
    { field: 'role',       header: 'Role',       sortable: true },
    { field: 'department', header: 'Department', sortable: true },
    { field: 'status',     header: 'Status',     type: 'badge',
      badgeMap: {
        Active:   { label: 'Active',   color: '#15803d' },
        Inactive: { label: 'Inactive', color: '#b91c1c' },
        Pending:  { label: 'Pending',  color: '#a16207' },
      }
    },
    { field: 'salary', header: 'Salary', type: 'number', sortable: true, align: 'right' },
  ];

  empRows: Employee[] = [
    { id: 1, name: 'Alice Johnson',  role: 'Senior Engineer', department: 'Engineering', status: 'Active',   salary: 95000, joined: '2021-03-12' },
    { id: 2, name: 'Bob Smith',      role: 'Product Designer',department: 'Design',      status: 'Active',   salary: 88000, joined: '2020-07-01' },
    { id: 3, name: 'Carol Williams', role: 'Product Manager', department: 'Product',     status: 'Pending',  salary: 102000,joined: '2022-01-15' },
    { id: 4, name: 'David Brown',    role: 'Frontend Dev',    department: 'Engineering', status: 'Inactive', salary: 78000, joined: '2019-11-20' },
    { id: 5, name: 'Eve Davis',      role: 'Data Analyst',    department: 'Analytics',   status: 'Active',   salary: 91000, joined: '2023-05-08' },
  ];

  largeRows: Employee[] = [
    ...this.empRows,
    { id: 6,  name: 'Frank Miller',  role: 'DevOps Engineer',   department: 'Engineering', status: 'Active',   salary: 99000, joined: '2021-09-14' },
    { id: 7,  name: 'Grace Lee',     role: 'UX Researcher',     department: 'Design',      status: 'Active',   salary: 85000, joined: '2022-03-22' },
    { id: 8,  name: 'Henry Wilson',  role: 'Backend Engineer',  department: 'Engineering', status: 'Pending',  salary: 94000, joined: '2020-12-01' },
    { id: 9,  name: 'Iris Taylor',   role: 'Scrum Master',      department: 'Product',     status: 'Active',   salary: 87000, joined: '2021-06-17' },
    { id: 10, name: 'Jack Anderson', role: 'Security Engineer',  department: 'Engineering', status: 'Inactive', salary: 103000,joined: '2018-04-03' },
    { id: 11, name: 'Kate Thomas',   role: 'QA Engineer',       department: 'Engineering', status: 'Active',   salary: 82000, joined: '2022-08-29' },
    { id: 12, name: 'Liam Martinez', role: 'Mobile Developer',  department: 'Engineering', status: 'Active',   salary: 96000, joined: '2023-01-10' },
  ];

  xfwRows = [
    { name: 'columns',         angular: '[columns]="cols"',             attr: '—',                  js: 'el.columns = [...]'          },
    { name: 'rows',            angular: '[rows]="rows"',                attr: '—',                  js: 'el.rows = [...]'             },
    { name: 'rowKey',          angular: 'rowKey="id"',                  attr: 'row-key="id"',       js: 'el.rowKey = "id"'            },
    { name: 'selectable',      angular: '[selectable]="true"',          attr: 'selectable',         js: 'el.selectable = true'        },
    { name: 'paginate',        angular: '[paginate]="true"',            attr: 'paginate',           js: 'el.paginate = true'          },
    { name: 'pageSize',        angular: '[pageSize]="10"',              attr: 'page-size="10"',     js: 'el.pageSize = 10'            },
    { name: 'emptyText',       angular: 'emptyText="No data."',         attr: 'empty-text="…"',     js: 'el.emptyText = "…"'          },
    { name: 'rowClick',        angular: '(rowClick)="fn($event)"',      attr: '—',                  js: 'el.addEventListener(…)'      },
    { name: 'selectionChange', angular: '(selectionChange)="fn($event)"',attr: '—',                js: 'el.addEventListener(…)'      },
    { name: 'sortChange',      angular: '(sortChange)="fn($event)"',    attr: '—',                  js: 'el.addEventListener(…)'      },
  ];

  api: ApiRow[] = [
    { input: 'columns',         type: 'DataGridColumn[]', default: '[]',                   description: 'Column definitions. Each has field, header, and optional sortable, type, align, width, badgeMap.' },
    { input: 'rows',            type: 'T[]',              default: '[]',                   description: 'Data rows as plain objects. Each field key must match a column\'s field.' },
    { input: 'rowKey',          type: 'keyof T',          default: `'id'`,                 description: 'Unique identifier field used for row selection tracking.' },
    { input: 'selectable',      type: 'boolean',          default: 'false',                description: 'Adds a checkbox column. Header checkbox selects/clears all visible rows.' },
    { input: 'paginate',        type: 'boolean',          default: 'false',                description: 'Enables pagination footer with page count and prev/next controls.' },
    { input: 'pageSize',        type: 'number',           default: '10',                   description: 'Number of rows per page when paginate is true.' },
    { input: 'emptyText',       type: 'string',           default: `'No data to display.'`,description: 'Message shown when rows is empty.' },
    { input: 'rowClick',        type: 'EventEmitter<T>',  default: '—',                   description: 'Emits the full row object when a row is clicked.' },
    { input: 'selectionChange', type: 'EventEmitter<T[]>',default: '—',                   description: 'Emits the array of currently selected rows when checkboxes change.' },
    { input: 'sortChange',      type: 'EventEmitter<DataGridSort>', default: '—',          description: 'Emits { field, dir } when a sortable column header is clicked.' },
    { input: 'pageChange',      type: 'EventEmitter<DataGridPageEvent>', default: '—',     description: 'Emits { page, pageSize } when the user navigates pages.' },
  ];
}
