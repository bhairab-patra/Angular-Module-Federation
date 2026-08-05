import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant  = 'dark' | 'light' | 'teal';

@Component({
  selector: 'pui-tooltip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="pui-tt-host" [class]="hostClass">
      <ng-content></ng-content>
      <span class="pui-tt__bubble" role="tooltip">{{ text }}</span>
    </span>
  `,
  styles: [`
    :host { display: inline-block; }

    .pui-tt-host {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Bubble ─────────────────────────────────── */
    .pui-tt__bubble {
      position: absolute;
      white-space: nowrap;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      font-family: inherit;
      line-height: 1.4;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s ease, transform 0.15s ease;
      z-index: 9999;
    }

    /* Arrow shared */
    .pui-tt__bubble::after {
      content: '';
      position: absolute;
      border: 5px solid transparent;
    }

    /* ── Variants ────────────────────────────────── */
    .pui-tt--dark .pui-tt__bubble {
      background: #0f172a;
      color: #f8fafc;
    }
    .pui-tt--dark .pui-tt__bubble::after { border-color: transparent; }

    .pui-tt--light .pui-tt__bubble {
      background: #ffffff;
      color: #111827;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 12px rgba(0,0,0,.1);
    }

    .pui-tt--teal .pui-tt__bubble {
      background: #0d6e5f;
      color: #ffffff;
    }

    /* ── Positions ───────────────────────────────── */

    /* TOP */
    .pui-tt--top .pui-tt__bubble {
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%) translateY(4px);
    }
    .pui-tt--top .pui-tt__bubble::after {
      top: 100%; left: 50%; transform: translateX(-50%);
      border-top-color: inherit;
    }
    .pui-tt--top.pui-tt--dark  .pui-tt__bubble::after { border-top-color: #0f172a; }
    .pui-tt--top.pui-tt--light .pui-tt__bubble::after { border-top-color: #e5e7eb; }
    .pui-tt--top.pui-tt--teal  .pui-tt__bubble::after { border-top-color: #0d6e5f; }

    /* BOTTOM */
    .pui-tt--bottom .pui-tt__bubble {
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%) translateY(-4px);
    }
    .pui-tt--bottom .pui-tt__bubble::after {
      bottom: 100%; left: 50%; transform: translateX(-50%);
    }
    .pui-tt--bottom.pui-tt--dark  .pui-tt__bubble::after { border-bottom-color: #0f172a; }
    .pui-tt--bottom.pui-tt--light .pui-tt__bubble::after { border-bottom-color: #ffffff; }
    .pui-tt--bottom.pui-tt--teal  .pui-tt__bubble::after { border-bottom-color: #0d6e5f; }

    /* LEFT */
    .pui-tt--left .pui-tt__bubble {
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%) translateX(4px);
    }
    .pui-tt--left .pui-tt__bubble::after {
      left: 100%; top: 50%; transform: translateY(-50%);
    }
    .pui-tt--left.pui-tt--dark  .pui-tt__bubble::after { border-left-color: #0f172a; }
    .pui-tt--left.pui-tt--light .pui-tt__bubble::after { border-left-color: #e5e7eb; }
    .pui-tt--left.pui-tt--teal  .pui-tt__bubble::after { border-left-color: #0d6e5f; }

    /* RIGHT */
    .pui-tt--right .pui-tt__bubble {
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%) translateX(-4px);
    }
    .pui-tt--right .pui-tt__bubble::after {
      right: 100%; top: 50%; transform: translateY(-50%);
    }
    .pui-tt--right.pui-tt--dark  .pui-tt__bubble::after { border-right-color: #0f172a; }
    .pui-tt--right.pui-tt--light .pui-tt__bubble::after { border-right-color: #ffffff; }
    .pui-tt--right.pui-tt--teal  .pui-tt__bubble::after { border-right-color: #0d6e5f; }

    /* ── Hover reveal ────────────────────────────── */
    .pui-tt-host:hover .pui-tt__bubble { opacity: 1; }

    .pui-tt--top:hover    .pui-tt__bubble { transform: translateX(-50%) translateY(0); }
    .pui-tt--bottom:hover .pui-tt__bubble { transform: translateX(-50%) translateY(0); }
    .pui-tt--left:hover   .pui-tt__bubble { transform: translateY(-50%) translateX(0); }
    .pui-tt--right:hover  .pui-tt__bubble { transform: translateY(-50%) translateX(0); }
  `],
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
