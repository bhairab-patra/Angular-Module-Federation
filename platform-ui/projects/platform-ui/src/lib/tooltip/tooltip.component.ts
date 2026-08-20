import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant  = 'dark' | 'light' | 'teal';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-tooltip',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() text = '';

  @Input() position: TooltipPosition = 'top';

  @Input() variant: TooltipVariant = 'dark';

  get hostClass(): string {
    return `pui-tt--${this.position} pui-tt--${this.variant}`;
  }
}
