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
  
  @Input() data?: CardData;
  @Input() variant: CardVariant = 'default';
  @Input() size: CardSize = 'md';
  @Input() elevated = true;
  @Input() clickable = false;
  @Input() fullWidth = false;
  @Input() accent = false;
  @Input() cardClass = '';

  @Output() cardClick = new EventEmitter<MouseEvent>();

  get hostClasses(): string {
    return [
      'pui-card',
      `pui-card--${this.variant}`,
      `pui-card--${this.size}`,
      this.elevated ? 'pui-card--elevated' : '',
      this.clickable ? 'pui-card--clickable' : '',
      this.fullWidth ? 'pui-card--full' : '',
      this.accent ? 'pui-card--accent' : '',
      this.cardClass,
    ].filter(Boolean).join(' ');
  }

  get trendClass(): string {
    return this.data?.trend ? `pui-card__trend--${this.data.trend}` : '';
  }

  get trendIcon(): string {
    switch (this.data?.trend) {
      case 'up': return '▲';
      case 'down': return '▼';
      default: return '—';
    }
  }

  onClick(e: MouseEvent): void {
    if (this.clickable) this.cardClick.emit(e);
  }
}
