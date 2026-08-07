import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { BadgeComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-badge-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './badge-page.component.html',
  styleUrls: ['./badge-page.component.scss'],
})
export class BadgePageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  variants = [
    { id: 'default', label: 'Default' },
    { id: 'primary', label: 'Primary' },
    { id: 'success', label: 'Success' },
    { id: 'warning', label: 'Warning' },
    { id: 'danger',  label: 'Danger'  },
    { id: 'info',    label: 'Info'    },
  ];

  inlineDemo = [
    { name: 'Deployment #47', variant: 'success', label: 'Passed'      },
    { name: 'Deployment #46', variant: 'danger',  label: 'Failed'      },
    { name: 'Deployment #45', variant: 'warning', label: 'In Progress' },
    { name: 'Deployment #44', variant: 'info',    label: 'Queued'      },
    { name: 'Deployment #43', variant: 'default', label: 'Draft'       },
  ];

  xfwRows = [
    { name: 'variant', angular: '[variant]="\'success\'"', attr: 'variant="success"', js: 'el.variant = "success"' },
    { name: 'size',    angular: 'size="sm"',               attr: 'size="sm"',         js: 'el.size = "sm"'         },
  ];

  api: ApiRow[] = [
    { input: 'variant', type: `'default'|'primary'|'success'|'warning'|'danger'|'info'`, default: `'default'`, description: 'Colour variant. Semantically: success=active/passed, warning=pending, danger=error/failed, info=informational.' },
    { input: 'size',    type: `'sm'|'md'`, default: `'md'`, description: 'Badge size. sm fits inside table cells or inline with body text; md is suitable for standalone status labels.' },
  ];
}
