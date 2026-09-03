import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

export type SkeletonVariant = 'text' | 'circle' | 'rect' | 'card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-skeleton',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class PuiSkeletonComponent {
  @Input() variant: SkeletonVariant = 'text';
  @Input() width = '100%';
  @Input() height = '16px';
  @Input() rows = 1;
  @Input() animated = true;

  get _rows(): number[] {
    return Array.from({ length: this.rows });
  }
}
