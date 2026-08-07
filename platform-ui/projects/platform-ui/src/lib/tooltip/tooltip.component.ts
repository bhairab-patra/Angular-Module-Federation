import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant  = 'dark' | 'light' | 'teal';

@Component({
  selector: 'pui-lib-tooltip',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  /** Text shown inside the tooltip bubble. */
  @Input() text = '';

  /** Placement relative to the trigger element. */
  @Input() position: TooltipPosition = 'top';

  /** Visual style. */
  @Input() variant: TooltipVariant = 'dark';

  get hostClass(): string {
    return `pui-tt--${this.position} pui-tt--${this.variant}`;
  }
}
