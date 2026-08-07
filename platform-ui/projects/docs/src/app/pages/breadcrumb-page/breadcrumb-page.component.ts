import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-breadcrumb-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumb-page.component.html',
  styleUrls: ['./breadcrumb-page.component.scss'],
})
export class BreadcrumbPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  basic: BreadcrumbItem[] = [
    { label: 'Home',     route: '/' },
    { label: 'Settings', route: '/settings' },
    { label: 'Profile' },
  ];

  separators = [
    { name: 'chevron' },
    { name: 'slash'   },
    { name: 'dot'     },
    { name: 'arrow'   },
  ];

  deepPath: BreadcrumbItem[] = [
    { label: 'Home',        route: '/'                   },
    { label: 'Platform',    route: '/platform'           },
    { label: 'Engineering', route: '/platform/eng'       },
    { label: 'Services',    route: '/platform/eng/svc'   },
    { label: 'Auth API'                                  },
  ];

  withIcons: BreadcrumbItem[] = [
    {
      label: 'Home', route: '/',
      icon: '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>',
    },
    {
      label: 'Components', route: '/components',
      icon: '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"/></svg>',
    },
    { label: 'Breadcrumb' },
  ];

  xfwRows = [
    { name: 'items',     angular: '[items]="items"',          attr: '—',                 js: 'el.items = [...]'           },
    { name: 'separator', angular: 'separator="slash"',        attr: 'separator="slash"', js: 'el.separator = "slash"'     },
    { name: 'ariaLabel', angular: 'ariaLabel="Navigation"',   attr: 'aria-label="…"',    js: 'el.ariaLabel = "…"'         },
  ];

  api: ApiRow[] = [
    { input: 'items',     type: 'BreadcrumbItem[]', default: '[]',        description: 'Navigation items. Each has a label, an optional href for the link, and an optional icon SVG string.' },
    { input: 'separator', type: `'chevron'|'slash'|'dot'|'arrow'`, default: `'chevron'`, description: 'Visual separator rendered between breadcrumb items.' },
    { input: 'ariaLabel', type: 'string',            default: `'Breadcrumb'`, description: 'Accessible label for the <nav> landmark element.' },
  ];
}
