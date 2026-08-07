import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { BadgeVariant, BadgeSize } from '../models/badge.model';

@Component({
  selector: 'pui-lib-badge',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';

  get hostClasses(): string {
    return `pui-badge pui-badge--${this.size} pui-badge--${this.variant}`;
  }
}
