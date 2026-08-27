import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiSimplePaginationComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-simple-pagination-page',
  standalone: true,
  imports: [DocPageComponent, PuiSimplePaginationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './simple-pagination-page.component.html',
  styleUrls: ['./simple-pagination-page.component.scss'],
})
export class SimplePaginationPageComponent {
  private cdr = inject(ChangeDetectorRef);

  basicPage = 1;
  midPage = 5;
  endPage = 10;
  disabledPage = 3;
  singlePage = 1;

  onPageChange(page: number, target: 'basic' | 'mid' | 'end' | 'single'): void {
    if (target === 'basic') this.basicPage = page;
    if (target === 'mid') this.midPage = page;
    if (target === 'end') this.endPage = page;
    if (target === 'single') this.singlePage = page;
    this.cdr.markForCheck();
  }

  angularCode = `import { PuiSimplePaginationComponent } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiSimplePaginationComponent],
  template: \`
    <pui-lib-simple-pagination
      [total]="totalRecords"
      [page]="currentPage"
      [pageSize]="pageSize"
      (pageChange)="currentPage = $event">
    </pui-lib-simple-pagination>
  \`
})
export class MyComponent {
  totalRecords = 245;
  currentPage  = 1;
  pageSize     = 10;
}`;

  api: ApiRow[] = [
    { input: 'total', type: 'number', default: '0', description: 'Total number of records in the dataset.' },
    { input: 'page', type: 'number', default: '1', description: 'Currently active page (1-indexed). Always set from outside — the component is fully controlled.' },
    { input: 'pageSize', type: 'number', default: '10', description: 'Number of records per page.' },
    { input: 'maxVisible', type: 'number', default: '5', description: 'Maximum page links before the middle range collapses with an ellipsis.' },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Disables all navigation and dims the links.' },
    { input: 'pageChange', type: 'EventEmitter<number> (output)', default: '—', description: 'Emits the new page number. Update your [page] binding and reload data.' },
  ];
}
