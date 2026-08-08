import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiSkeletonComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-skeleton-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiSkeletonComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton-page.component.html',
  styleUrls: ['./skeleton-page.component.scss'],
})
export class SkeletonPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  angularCode = `import { PuiSkeletonComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [NgIf, PuiSkeletonComponent],
  template: \`
    <!-- show skeleton while loading, real content after -->
    <ng-container *ngIf="loading; else content">
      <pui-lib-skeleton variant="card" [rows]="3"></pui-lib-skeleton>
    </ng-container>
    <ng-template #content>
      <user-card [user]="user"></user-card>
    </ng-template>
  \`
})
export class MyComponent {
  loading = true;
  user: User | null = null;

  ngOnInit() {
    this.userService.get(1).subscribe(u => {
      this.user = u;
      this.loading = false;
    });
  }
}`;

  reactCode = `import '@bhairab-patra/platform-ui';

function UserCard({ loading, user }) {
  if (loading) {
    return <pui-lib-skeleton variant="card" rows="3" />;
  }
  return <div>{user.name}</div>;
}`;

  htmlCode = `<!-- text lines -->
<pui-lib-skeleton variant="text" width="100%" height="14px" rows="3"></pui-lib-skeleton>

<!-- circle avatar -->
<pui-lib-skeleton variant="circle" width="48px"></pui-lib-skeleton>

<!-- image placeholder -->
<pui-lib-skeleton variant="rect" width="100%" height="200px"></pui-lib-skeleton>

<!-- card preset -->
<pui-lib-skeleton variant="card"></pui-lib-skeleton>

<!-- static (no shimmer) -->
<pui-lib-skeleton variant="text" animated="false"></pui-lib-skeleton>`;

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
