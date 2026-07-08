import { Component } from '@angular/core';
import { BadgeComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-badge-page',
  standalone: true,
  imports: [DocPageComponent, BadgeComponent],
  template: `
    <docs-page
      title="Badge"
      description="Small label for status, counts, or categories."
      [code]="code"
      [api]="api">

      <ng-container demo>
        <pui-badge variant="default">Default</pui-badge>
        <pui-badge variant="primary">Primary</pui-badge>
        <pui-badge variant="success">Active</pui-badge>
        <pui-badge variant="warning">Pending</pui-badge>
        <pui-badge variant="danger">Error</pui-badge>
        <pui-badge variant="info">Info</pui-badge>
        <pui-badge variant="success" size="sm">Small</pui-badge>
      </ng-container>
    </docs-page>
  `,
})
export class BadgePageComponent {
  code = `import { BadgeComponent } from '@solifi/platform-ui';

<pui-badge variant="success">Active</pui-badge>
<pui-badge variant="danger">Error</pui-badge>
<pui-badge variant="warning">Pending</pui-badge>
<pui-badge variant="info" size="sm">Info</pui-badge>`;

  api: ApiRow[] = [
    { input: 'variant', type: `'default'|'primary'|'success'|'warning'|'danger'|'info'`, default: `'default'`, description: 'Color variant' },
    { input: 'size',    type: `'sm' | 'md'`,                                              default: `'md'`,      description: 'Badge size' },
  ];
}
