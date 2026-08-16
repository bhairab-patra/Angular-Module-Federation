import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiPaginationComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-pagination-page',
  standalone: true,
  imports: [DocPageComponent, PuiPaginationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination-page.component.html',
  styleUrls: ['./pagination-page.component.scss'],
})
export class PaginationPageComponent {
  private cdr = inject(ChangeDetectorRef);

  basicPage    = 1;
  sizePage     = 1;
  sizePerPage  = 25;
  simplePage   = 1;
  compactPage  = 1;
  largePage    = 42;

  onPageChange(page: number, target: 'basic' | 'size' | 'simple' | 'compact' | 'large'): void {
    if (target === 'basic')   this.basicPage   = page;
    if (target === 'size')    this.sizePage    = page;
    if (target === 'simple')  this.simplePage  = page;
    if (target === 'compact') this.compactPage = page;
    if (target === 'large')   this.largePage   = page;
    this.cdr.markForCheck();
  }

  onSizeChange(size: number): void {
    this.sizePerPage = size;
    this.sizePage    = 1;
    this.cdr.markForCheck();
  }

  angularCode = `import { PuiPaginationComponent } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiPaginationComponent],
  template: \`
    <pui-lib-pagination
      [total]="totalRecords"
      [page]="currentPage"
      [pageSize]="pageSize"
      (pageChange)="currentPage = $event"
      (pageSizeChange)="pageSize = $event; currentPage = 1">
    </pui-lib-pagination>
  \`
})
export class MyComponent {
  totalRecords = 245;
  currentPage  = 1;
  pageSize     = 10;
}`;

  api: ApiRow[] = [
    { input: 'total',               type: 'number',    default: '0',     description: 'Total number of records in the dataset.' },
    { input: 'page',                type: 'number',    default: '1',     description: 'Currently active page (1-indexed). Always set from outside — the component is fully controlled.' },
    { input: 'pageSize',            type: 'number',    default: '10',    description: 'Number of records per page.' },
    { input: 'pageSizeOptions',     type: 'number[]',  default: '[10,25,50,100]', description: 'Options in the per-page dropdown.' },
    { input: 'showPageSizeSelector',type: 'boolean',   default: 'true',  description: 'Show or hide the per-page dropdown.' },
    { input: 'showFirstLast',       type: 'boolean',   default: 'true',  description: 'Show or hide the first-page and last-page jump buttons.' },
    { input: 'maxVisible',          type: 'number',    default: '7',     description: 'Maximum page buttons before ellipsis is applied.' },
    { input: 'itemLabel',           type: 'string',    default: `'items'`, description: 'Record noun in the info text, e.g. "orders" → "1–10 of 245 orders".' },
    { input: 'compact',             type: 'boolean',   default: 'false', description: 'Compact mode — hides info text and page-size selector, reduces button size.' },
    { input: 'pageChange',          type: 'EventEmitter<number> (output)', default: '—', description: 'Emits the new page number. Update your [page] binding and reload data.' },
    { input: 'pageSizeChange',      type: 'EventEmitter<number> (output)', default: '—', description: 'Emits the new page size. Reset to page 1 and reload.' },
  ];
}
