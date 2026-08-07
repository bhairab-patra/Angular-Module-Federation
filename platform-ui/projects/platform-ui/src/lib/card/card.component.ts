import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardData, CardVariant, CardSize } from '../models/card.model';

@Component({
  selector: 'pui-lib-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  /** Structured stat/metric data — renders the metric layout automatically. */
  @Input() data?: CardData;

  /** Visual style variant. */
  @Input() variant: CardVariant = 'default';

  /** Card size — controls internal padding. */
  @Input() size: CardSize = 'md';

  /** Drop-shadow. */
  @Input() elevated = true;

  /** Hover lift — use when the card is interactive/clickable. */
  @Input() clickable = false;

  /** Stretch to full container width. */
  @Input() fullWidth = false;

  /** Show a top-border accent strip. */
  @Input() accent = false;

  /** Extra CSS class on the host wrapper. */
  @Input() cardClass = '';

  /** Emitted when clickable=true and user clicks the card. */
  @Output() cardClick = new EventEmitter<MouseEvent>();

  get hostClasses(): string {
    return [
      'pui-card',
      `pui-card--${this.variant}`,
      `pui-card--${this.size}`,
      this.elevated  ? 'pui-card--elevated'  : '',
      this.clickable ? 'pui-card--clickable' : '',
      this.fullWidth ? 'pui-card--full'      : '',
      this.accent    ? 'pui-card--accent'    : '',
      this.cardClass,
    ].filter(Boolean).join(' ');
  }

  get trendClass(): string {
    return this.data?.trend ? `pui-card__trend--${this.data.trend}` : '';
  }

  get trendIcon(): string {
    switch (this.data?.trend) {
      case 'up':   return '▲';
      case 'down': return '▼';
      default:     return '—';
    }
  }

  onClick(e: MouseEvent): void {
    if (this.clickable) this.cardClick.emit(e);
  }
}
