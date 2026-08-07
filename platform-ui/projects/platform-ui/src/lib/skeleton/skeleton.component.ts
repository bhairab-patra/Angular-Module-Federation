import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';

export type SkeletonVariant = 'text' | 'circle' | 'rect' | 'card';

@Component({
  selector: 'pui-lib-skeleton',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class PuiSkeletonComponent {
  @Input() variant: SkeletonVariant = 'text';
  @Input() width  = '100%';
  @Input() height = '16px';
  @Input() rows   = 1;
  @Input() animated = true;

  get _rows(): number[] { return Array.from({ length: this.rows }); }
}
