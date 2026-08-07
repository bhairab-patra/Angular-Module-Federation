import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { PuiDataGridComponent, DataGridColumn } from '@solifi/platform-ui';

interface Employee { id: number; name: string; role: string; department: string; status: string; salary: number; joined: string; }

@Component({
  selector: 'app-datagrid-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiDataGridComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Data Grid"
  description="A feature-rich data table with sortable columns, row selection, badge cells, pagination, and an empty state — designed for large datasets."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Basic -->
    <div class="demo-section">
      <h3 class="demo-section__title">Basic Grid</h3>
      <p class="demo-section__desc">Define columns via the <code>columns</code> array and pass rows as plain objects. Column headers are uppercase automatically.</p>
      <pui-datagrid [columns]="basicCols" [rows]="basicRows"></pui-datagrid>
    </div>

    <!-- 2. Sortable + badge column -->
    <div class="demo-section">
      <h3 class="demo-section__title">Sortable Columns & Badge Cells</h3>
      <p class="demo-section__desc">Mark any column <code>sortable: true</code> to enable client-side sorting. Use <code>type: 'badge'</code> with a <code>badgeMap</code> for colour-coded status pills.</p>
      <pui-datagrid
        [columns]="empCols"
        [rows]="empRows"
        rowKey="id">
      </pui-datagrid>
    </div>

    <!-- 3. Row selection -->
    <div class="demo-section">
      <h3 class="demo-section__title">Row Selection</h3>
      <p class="demo-section__desc">Enable <code>[selectable]="true"</code> to add a checkbox column. A header checkbox selects/deselects all visible rows.</p>
      <pui-datagrid
        [columns]="empCols"
        [rows]="empRows"
        rowKey="id"
        [selectable]="true"
        (selectionChange)="selected = $event; cdr.markForCheck()">
      </pui-datagrid>
      <p *ngIf="selected.length" class="demo-result">{{ selected.length }} row(s) selected: {{ selectedNames() }}</p>
    </div>

    <!-- 4. Pagination -->
    <div class="demo-section">
      <h3 class="demo-section__title">Pagination</h3>
      <p class="demo-section__desc">Enable <code>[paginate]="true"</code> with a <code>[pageSize]</code> to add a row-count footer with prev/next navigation.</p>
      <pui-datagrid
        [columns]="empCols"
        [rows]="largeRows"
        rowKey="id"
        [paginate]="true"
        [pageSize]="5">
      </pui-datagrid>
    </div>

    <!-- 5. Empty state -->
    <div class="demo-section">
      <h3 class="demo-section__title">Empty State</h3>
      <p class="demo-section__desc">When <code>rows</code> is empty the grid renders a centred empty message. Customise it with <code>emptyText</code>.</p>
      <pui-datagrid
        [columns]="basicCols"
        [rows]="[]"
        emptyText="No employees found. Try adjusting your filters.">
      </pui-datagrid>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-datagrid</code> is a full-featured Angular component. Pass <code>columns</code> and <code>rows</code> as typed arrays. For React and HTML, set both as JS properties via a ref after element upgrade.</p>

    <div class="fw-tabs">
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='angular'" (click)="fwTab='angular';cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.310H4.936L12 3.405z" fill="#c3002f"/></svg>
        Angular
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='react'" (click)="fwTab='react';cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><circle cx="12" cy="12" r="2.05" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/></svg>
        React
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='html'" (click)="fwTab='html';cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/></svg>
        HTML
      </button>
    </div>

    <div *ngIf="fwTab==='angular'" class="fw-panel">
      <div class="fw-note--angular">Import <code>PuiDataGridComponent</code> and define typed <code>DataGridColumn</code> arrays.</div>
      <pre><code>import &#123; PuiDataGridComponent, DataGridColumn &#125; from '&#64;solifi/platform-ui';

&#64;Component(&#123;
  imports: [PuiDataGridComponent],
  template: &#96;
    &lt;pui-datagrid
      [columns]="columns"
      [rows]="rows"
      rowKey="id"
      [selectable]="true"
      [paginate]="true"
      [pageSize]="10"
      (selectionChange)="onSelect($event)"
      (sortChange)="onSort($event)"&gt;
    &lt;/pui-datagrid&gt;
  &#96;
&#125;)
export class MyComponent &#123;
  columns: DataGridColumn[] = [
    &#123; field: 'name',   header: 'Name',   sortable: true &#125;,
    &#123; field: 'status', header: 'Status', type: 'badge',
      badgeMap: &#123;
        active:   &#123; label: 'Active',   color: '#15803d' &#125;,
        inactive: &#123; label: 'Inactive', color: '#b91c1c' &#125;,
      &#125; &#125;,
    &#123; field: 'salary', header: 'Salary', type: 'number', align: 'right' &#125;,
  ];
  rows = [
    &#123; id: 1, name: 'Alice', status: 'active',   salary: 95000 &#125;,
    &#123; id: 2, name: 'Bob',   status: 'inactive', salary: 82000 &#125;,
  ];
  onSelect(rows: any[]) &#123; console.log(rows); &#125;
  onSort(sort: any)     &#123; console.log(sort); &#125;
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">Set <code>columns</code> and <code>rows</code> via a ref — both are object arrays and cannot be passed as HTML attributes.</div>
      <pre><code>import &#123; useRef, useEffect &#125; from 'react';
import '&#64;solifi/platform-ui';

function EmployeeGrid() &#123;
  const ref = useRef(null);

  useEffect(() =&gt; &#123;
    if (!ref.current) return;
    ref.current.columns = [
      &#123; field: 'name',   header: 'Name',   sortable: true &#125;,
      &#123; field: 'status', header: 'Status', type: 'badge',
        badgeMap: &#123; active: &#123; label: 'Active', color: '#15803d' &#125; &#125; &#125;,
    ];
    ref.current.rows = [
      &#123; id: 1, name: 'Alice', status: 'active' &#125;,
    ];
  &#125;, []);

  return &lt;pui-datagrid ref=&#123;ref&#125; selectable paginate page-size="10" /&gt;;
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">Set <code>columns</code> and <code>rows</code> as JS properties — they cannot be serialised as HTML attributes.</div>
      <pre><code>&lt;pui-datagrid id="grid" selectable paginate page-size="10"&gt;&lt;/pui-datagrid&gt;

&lt;script&gt;
customElements.whenDefined('pui-datagrid').then(() =&gt; &#123;
  const el = document.getElementById('grid');
  el.columns = [
    &#123; field: 'name',   header: 'Name',   sortable: true &#125;,
    &#123; field: 'status', header: 'Status', type: 'badge',
      badgeMap: &#123; active: &#123; label: 'Active', color: '#15803d' &#125; &#125; &#125;,
  ];
  el.rows = [&#123; id: 1, name: 'Alice', status: 'active' &#125;];
  el.addEventListener('selectionChange', e =&gt; console.log(e.detail));
&#125;);
&lt;/script&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">Data Grid Quick Reference</h4>
    <div class="xfw-wrap">
      <table class="xfw-table">
        <thead><tr><th>Property</th><th>Angular</th><th>HTML attr</th><th>JS property</th></tr></thead>
        <tbody>
          <tr *ngFor="let r of xfwRows">
            <td><span class="tag-name">{{ r.name }}</span></td>
            <td><span class="tag-ng">{{ r.angular }}</span></td>
            <td><span class="tag-html">{{ r.attr }}</span></td>
            <td><span class="tag-js">{{ r.js }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

  </ng-container>

</docs-page>
  `,
  styles: [`
    .demo-section { margin-bottom: 48px; }
    .demo-section__title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 6px; }
    .demo-section__desc  { font-size: 13px; color: #6b7280; margin-bottom: 14px; }
    .demo-section__desc code { background:#f3f4f6;padding:1px 5px;border-radius:4px;font-size:12px; }
    .demo-result { margin-top:10px;font-size:12px;color:#6b7280; }
    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
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
