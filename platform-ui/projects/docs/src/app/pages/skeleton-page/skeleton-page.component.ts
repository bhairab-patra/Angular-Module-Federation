import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiSkeletonComponent } from '@solifi/platform-ui';

@Component({
  selector: 'app-skeleton-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton-page.component.html',
  styleUrls: ['./skeleton-page.component.scss'],
})
export class SkeletonPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  xfwRows = [
    { name: 'variant',  angular: 'variant="card"',       attr: 'variant="card"',    js: 'el.variant = "card"'    },
    { name: 'width',    angular: 'width="320px"',        attr: 'width="320px"',     js: 'el.width = "320px"'     },
    { name: 'height',   angular: 'height="14px"',        attr: 'height="14px"',     js: 'el.height = "14px"'     },
    { name: 'rows',     angular: '[rows]="3"',           attr: 'rows="3"',          js: 'el.rows = 3'            },
    { name: 'animated', angular: '[animated]="false"',   attr: 'animated="false"',  js: 'el.animated = false'    },
  ];

  api: ApiRow[] = [
    { input: 'variant',  type: `'text'|'circle'|'rect'|'card'`, default: `'text'`,  description: 'Shape of the skeleton placeholder.' },
    { input: 'width',    type: 'string',  default: `'100%'`,  description: 'CSS width of the skeleton (e.g. "320px", "50%").' },
    { input: 'height',   type: 'string',  default: `'16px'`,  description: 'CSS height. Ignored for circle (diameter = width) and card variants.' },
    { input: 'rows',     type: 'number',  default: '1',       description: 'Number of skeleton rows to render. Useful for paragraph placeholders.' },
    { input: 'animated', type: 'boolean', default: 'true',    description: 'Enables the shimmer sweep animation.' },
  ];
}
