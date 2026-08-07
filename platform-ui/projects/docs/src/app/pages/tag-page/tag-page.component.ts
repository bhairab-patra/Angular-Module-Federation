import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiTagComponent } from '@solifi/platform-ui';

@Component({
  selector: 'app-tag-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiTagComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss'],
})
export class TagPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  xfwRows = [
    { name: 'variant', angular: 'variant="success"', attr: 'variant="success"', js: 'el.variant = "success"' },
    { name: 'size',    angular: 'size="sm"',         attr: 'size="sm"',         js: 'el.size = "sm"'         },
  ];

  api: ApiRow[] = [
    { input: 'variant', type: `'default'|'primary'|'success'|'warning'|'danger'|'info'|'purple'|'pink'`, default: `'default'`, description: 'Colour variant.' },
    { input: 'size',    type: `'sm'|'md'`, default: `'md'`, description: 'Tag size. Use sm in dense tables or alongside body text.' },
  ];
}
