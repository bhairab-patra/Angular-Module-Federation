import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiTagComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-tag-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, PuiTagComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss'],
})
export class TagPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  angularCode = `import { PuiTagComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiTagComponent],
  template: \`
    <pui-lib-tag variant="success">Delivered</pui-lib-tag>
    <pui-lib-tag variant="warning">In Transit</pui-lib-tag>
    <pui-lib-tag variant="danger">Cancelled</pui-lib-tag>
    <pui-lib-tag variant="info">Processing</pui-lib-tag>
    <pui-lib-tag variant="default">Pending</pui-lib-tag>
  \`
})
export class MyComponent {}`;

  reactCode = `import '@bhairab-patra/platform-ui';

const STATUS_VARIANT = {
  delivered: 'success', cancelled: 'danger',
  transit: 'warning',   processing: 'info',
};

function StatusTag({ status }) {
  return (
    <pui-lib-tag variant={STATUS_VARIANT[status] ?? 'default'}>
      {status}
    </pui-lib-tag>
  );
}`;

  htmlCode = `<pui-lib-tag variant="success">Delivered</pui-lib-tag>
<pui-lib-tag variant="warning">In Transit</pui-lib-tag>
<pui-lib-tag variant="danger">Cancelled</pui-lib-tag>
<pui-lib-tag variant="info">Processing</pui-lib-tag>
<pui-lib-tag variant="purple" size="sm">Beta</pui-lib-tag>`;

  xfwRows = [
    {
      name: 'variant',
      angular: 'variant="success"',
      attr: 'variant="success"',
      js: 'el.variant = "success"',
    },
    { name: 'size', angular: 'size="sm"', attr: 'size="sm"', js: 'el.size = "sm"' },
  ];

  api: ApiRow[] = [
    {
      input: 'variant',
      type: `'default'|'primary'|'success'|'warning'|'danger'|'info'|'purple'|'pink'`,
      default: `'default'`,
      description: 'Colour variant.',
    },
    {
      input: 'size',
      type: `'sm'|'md'`,
      default: `'md'`,
      description: 'Tag size. Use sm in dense tables or alongside body text.',
    },
  ];
  trackByIndex(_i: number): number {
    return _i;
  }
}
