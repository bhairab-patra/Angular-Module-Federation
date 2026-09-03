import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { BadgeComponent } from '@bhairab-patra/platform-ui';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-badge-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, BadgeComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './badge-page.component.html',
  styleUrls: ['./badge-page.component.scss'],
})
export class BadgePageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  angularCode = `import { BadgeComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [BadgeComponent],
  template: \`
    <pui-lib-badge variant="success">Active</pui-lib-badge>
    <pui-lib-badge variant="warning" size="sm">Pending</pui-lib-badge>
    <pui-lib-badge variant="danger">Error</pui-lib-badge>
    <pui-lib-badge [variant]="statusVariant">Dynamic</pui-lib-badge>
  \`
})
export class MyComponent {
  statusVariant = 'info';
}`;

  reactCode = `import '@bhairab-patra/platform-ui';

function StatusBadge({ status }) {
  const variantMap = {
    active:  'success',
    pending: 'warning',
    error:   'danger',
    info:    'info',
  };
  return (
    <pui-lib-badge variant={variantMap[status] ?? 'default'} size="sm">
      {status}
    </pui-lib-badge>
  );
}

// Usage in a deployment list
export default function DeploymentList() {
  const deployments = [
    { id: 47, name: 'Deploy #47', status: 'active' },
    { id: 46, name: 'Deploy #46', status: 'error' },
    { id: 45, name: 'Deploy #45', status: 'pending' },
    { id: 44, name: 'Deploy #44', status: 'info' },
  ];
  return (
    <ul className="deploy-list">
      {deployments.map(d => (
        <li key={d.id} className="deploy-row">
          <span>{d.name}</span>
          <StatusBadge status={d.status} />
        </li>
      ))}
    </ul>
  );
}`;

  htmlCode = `<!-- Load the bundle once in your page -->
<script type="module" src="pui-elements.js"></script>

<pui-lib-badge variant="success">Active</pui-lib-badge>
<pui-lib-badge variant="warning" size="sm">Pending</pui-lib-badge>
<pui-lib-badge variant="danger">Error</pui-lib-badge>
<pui-lib-badge variant="info">Informational</pui-lib-badge>
<pui-lib-badge variant="primary">New</pui-lib-badge>
<pui-lib-badge variant="default">Draft</pui-lib-badge>`;

  variants: {
    id:
      | 'default'
      | 'primary'
      | 'primary-light'
      | 'primary-outline'
      | 'secondary'
      | 'secondary-light'
      | 'success'
      | 'warning'
      | 'danger'
      | 'info';
    label: string;
  }[] = [
    { id: 'default', label: 'Default' },
    { id: 'primary', label: 'Primary' },
    { id: 'primary-light', label: 'Primary Light' },
    { id: 'primary-outline', label: 'Primary Outline' },
    { id: 'secondary', label: 'Secondary' },
    { id: 'secondary-light', label: 'Secondary Light' },
    { id: 'success', label: 'Success' },
    { id: 'warning', label: 'Warning' },
    { id: 'danger', label: 'Danger' },
    { id: 'info', label: 'Info' },
  ];

  xfwRows = [
    {
      name: 'variant',
      angular: '[variant]="\'success\'"',
      attr: 'variant="success"',
      js: 'el.variant = "success"',
    },
    { name: 'size', angular: 'size="sm"', attr: 'size="sm"', js: 'el.size = "sm"' },
  ];

  trackByIndex(_i: number): number {
    return _i;
  }

  api: ApiRow[] = [
    {
      input: 'variant',
      type: `'default'|'primary'|'primary-light'|'primary-outline'|'secondary'|'secondary-light'|'success'|'warning'|'danger'|'info'`,
      default: `'default'`,
      description:
        'Colour variant. primary/primary-light/primary-outline/secondary/secondary-light follow the brand theme toggle (same palette as Button and Chip); success/warning/danger/info are fixed status colours: success=active/passed, warning=pending, danger=error/failed, info=informational.',
    },
    {
      input: 'size',
      type: `'sm'|'md'`,
      default: `'md'`,
      description:
        'Badge size. sm fits inside table cells or inline with body text; md is suitable for standalone status labels.',
    },
  ];
}
