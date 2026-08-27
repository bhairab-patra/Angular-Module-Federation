import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BadgeVariant, BadgeSize } from '../models/badge.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-badge',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';

  get hostClasses(): string {
    return `pui-badge pui-badge--${this.size} pui-badge--${this.variant}`;
  }
}
