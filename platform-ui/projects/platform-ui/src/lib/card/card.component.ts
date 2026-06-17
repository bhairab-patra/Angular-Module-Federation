import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardData } from '../models/card.model';

@Component({
  selector: 'pui-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  /** Provide a CardData object to render a stat/metric layout automatically. */
  @Input() data?: CardData;

  /** Apply extra CSS class on the card wrapper. */
  @Input() cardClass = '';

  /** Enables subtle drop-shadow. Default: true. */
  @Input() elevated = true;

  /** Adds a hover lift effect — use when the card is interactive. */
  @Input() clickable = false;

  get hostClasses(): string {
    return [
      'pui-card',
      this.elevated  ? 'pui-card--elevated'  : '',
      this.clickable ? 'pui-card--clickable' : '',
      this.cardClass,
    ].filter(Boolean).join(' ');
  }

  get trendClass(): string {
    return this.data?.trend ? `pui-card__trend--${this.data.trend}` : '';
  }

  get trendIcon(): string {
    switch (this.data?.trend) {
      case 'up':      return '▲';
      case 'down':    return '▼';
      default:        return '—';
    }
  }
}
