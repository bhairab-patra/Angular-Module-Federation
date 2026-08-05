import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { SpinnerType, SpinnerSize } from '../models/spinner.model';

const SIZE_MAP: Record<SpinnerSize, number> = {
  sm: 24, md: 40, lg: 56, xl: 80,
};

@Component({
  selector: 'pui-spinner',
  standalone: true,
  imports: [NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Full-screen overlay -->
    <div *ngIf="overlay"
         class="pui-sp-overlay"
         [style.background]="overlayColor"
         [style.opacity]="overlayOpacity"
         [style.z-index]="zIndex">
    </div>

    <!-- Spinner container -->
    <div class="pui-sp-wrap"
         [class.pui-sp-wrap--overlay]="overlay"
         [style.z-index]="overlay ? zIndex + 1 : zIndex">

      <div class="pui-sp-box">

        <!-- ── DASH: radiating lines ── -->
        <svg *ngIf="type === 'dash'"
             class="pui-sp-dash"
             [style.width.px]="px" [style.height.px]="px"
             [style.animation-duration]="dur"
             viewBox="0 0 40 40">
          <!-- 12 lines at 30° intervals, fading in opacity -->
          <line *ngFor="let l of dashLines; let i = index"
                class="pui-sp-dash__line"
                x1="20" [attr.y1]="dashY1" x2="20" [attr.y2]="dashY2"
                [attr.stroke]="color"
                stroke-width="3"
                stroke-linecap="round"
                [attr.opacity]="lineOpacity(i)"
                [attr.transform]="'rotate(' + (i * 30) + ' 20 20)'"/>
        </svg>

        <!-- ── DOTS: orbiting dot ring ── -->
        <svg *ngIf="type === 'dots'"
             class="pui-sp-dots"
             [style.width.px]="px" [style.height.px]="px"
             [style.animation-duration]="dur"
             viewBox="0 0 40 40">
          <!-- 12 dots on a circle, one bright active dot -->
          <circle *ngFor="let d of dotPositions; let i = index"
                  [attr.cx]="d.cx" [attr.cy]="d.cy"
                  [attr.r]="dotR"
                  [attr.fill]="color"
                  [attr.opacity]="dotOpacity(i)"/>
        </svg>

        <!-- Label -->
        <span *ngIf="label" class="pui-sp-label" [style.color]="labelColor">{{ label }}</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: inline-block; }

    /* Overlay */
    .pui-sp-overlay {
      position: fixed; inset: 0; pointer-events: all;
    }

    /* Wrap */
    .pui-sp-wrap {
      display: inline-flex; align-items: center; justify-content: center;
    }
    .pui-sp-wrap--overlay {
      position: fixed; inset: 0;
      display: flex; align-items: center; justify-content: center;
      pointer-events: none;
    }

    .pui-sp-box {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
    }

    /* Dash spinner */
    .pui-sp-dash {
      animation: pui-spin steps(12, end) infinite;
    }

    /* Dots spinner */
    .pui-sp-dots {
      animation: pui-spin steps(12, end) infinite;
    }

    @keyframes pui-spin {
      to { transform: rotate(360deg); }
    }

    /* Label */
    .pui-sp-label {
      font-size: 13px; font-weight: 500;
      font-family: 'Poppins', system-ui, sans-serif;
      letter-spacing: .01em;
    }
  `],
})
export class SpinnerComponent {
  @Input() type: SpinnerType = 'dash';
  @Input() size: SpinnerSize = 'md';
  @Input() sizePx: number | null = null;
  @Input() color = '#12C6A8';
  @Input() speed = 800;
  @Input() overlay = false;
  @Input() overlayColor = '#ffffff';
  @Input() overlayOpacity: number | string = 0.7;
  @Input() zIndex = 1000;
  @Input() label = '';
  @Input() labelColor = '#6b7280';

  readonly dashLines = Array(12).fill(0);
  readonly dotPositions = this.buildDotPositions();

  get px(): number { return this.sizePx ?? SIZE_MAP[this.size]; }
  get dur(): string { return `${this.speed}ms`; }

  /* Dash line positions — inner 11, outer 18 (of 20 radius viewBox) */
  get dashY1(): number { return 6; }
  get dashY2(): number { return 12; }

  lineOpacity(i: number): number {
    /* Step from dim (index 0 = top = trailing) to bright (index 11 = just before top) */
    const steps = 12;
    return parseFloat(((i + 1) / steps).toFixed(2));
  }

  dotOpacity(i: number): number {
    const steps = 12;
    return parseFloat(((i + 1) / steps).toFixed(2));
  }

  get dotR(): number {
    /* dot radius scales with overall size */
    return 2.0;
  }

  private buildDotPositions(): { cx: number; cy: number }[] {
    const count = 12;
    const r = 14; // orbit radius in viewBox units (centre = 20,20)
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      return {
        cx: parseFloat((20 + r * Math.cos(angle)).toFixed(3)),
        cy: parseFloat((20 + r * Math.sin(angle)).toFixed(3)),
      };
    });
  }
}
