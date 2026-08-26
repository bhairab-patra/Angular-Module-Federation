import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { SpinnerType, SpinnerSize } from '../models/spinner.model';

const SIZE_MAP: Record<SpinnerSize, number> = {
  sm: 24, md: 40, lg: 56, xl: 80,
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-spinner',
  standalone: true,
  imports: [NgIf, NgFor],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() type: SpinnerType = 'dash';
  @Input() size: SpinnerSize = 'md';
  @Input() sizePx: number | null = null;
  @Input() color = 'var(--pui-form-accent, var(--pui-brand))';
  @Input() speed = 800;
  @Input() overlay = false;
  @Input() overlayColor = 'var(--pui-white)';
  @Input() overlayOpacity: number | string = 0.7;
  @Input() zIndex = 1000;
  @Input() label = '';
  @Input() labelColor = 'var(--pui-neutral-500)';

  readonly dashLines = Array(12).fill(0);
  readonly dotPositions = this.buildDotPositions();

  get px(): number { return this.sizePx ?? SIZE_MAP[this.size]; }
  get dur(): string { return `${this.speed}ms`; }

  readonly dashY1 = 6;
  readonly dashY2 = 12;

  lineOpacity(i: number): number {
    const steps = 12;
    return parseFloat(((i + 1) / steps).toFixed(2));
  }

  dotOpacity(i: number): number {
    const steps = 12;
    return parseFloat(((i + 1) / steps).toFixed(2));
  }

  readonly dotR = 2.0;

  private buildDotPositions(): { cx: number; cy: number }[] {
    const count = 12;
    const r = 14;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      return {
        cx: parseFloat((20 + r * Math.cos(angle)).toFixed(3)),
        cy: parseFloat((20 + r * Math.sin(angle)).toFixed(3)),
      };
    });
  }
}
