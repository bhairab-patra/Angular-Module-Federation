import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';

export type SkeletonVariant = 'text' | 'circle' | 'rect' | 'card';

@Component({
  selector: 'pui-skeleton',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pui-sk-wrap" [class.pui-sk--animated]="animated">

      <ng-container *ngFor="let _ of _rows">
        <!-- circle -->
        <div *ngIf="variant === 'circle'"
             class="pui-sk pui-sk--circle"
             [ngStyle]="{ width: width, height: width }">
        </div>

        <!-- text line -->
        <div *ngIf="variant === 'text'"
             class="pui-sk pui-sk--text"
             [ngStyle]="{ width: width, height: height }">
        </div>

        <!-- rect block -->
        <div *ngIf="variant === 'rect'"
             class="pui-sk pui-sk--rect"
             [ngStyle]="{ width: width, height: height }">
        </div>

        <!-- card: avatar + 3 lines -->
        <div *ngIf="variant === 'card'" class="pui-sk--card">
          <div class="pui-sk pui-sk--circle pui-sk--card-avatar"></div>
          <div class="pui-sk--card-lines">
            <div class="pui-sk pui-sk--text" style="width:60%;height:14px"></div>
            <div class="pui-sk pui-sk--text" style="width:90%;height:12px"></div>
            <div class="pui-sk pui-sk--text" style="width:75%;height:12px"></div>
          </div>
        </div>
      </ng-container>

    </div>
  `,
  styles: [`
    :host { display: block; }

    .pui-sk-wrap { display: flex; flex-direction: column; gap: 10px; }

    .pui-sk {
      background: #e5e7eb;
      border-radius: 6px;
      position: relative;
      overflow: hidden;
    }
    .pui-sk--circle { border-radius: 50%; }
    .pui-sk--text   { border-radius: 4px; min-height: 14px; }
    .pui-sk--rect   { border-radius: 8px; min-height: 80px; }

    /* Card layout */
    .pui-sk--card {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 16px; border: 1px solid #f3f4f6; border-radius: 10px;
    }
    .pui-sk--card-avatar { width: 44px; height: 44px; flex-shrink: 0; }
    .pui-sk--card-lines  { flex: 1; display: flex; flex-direction: column; gap: 8px; padding-top: 4px; }

    /* Shimmer animation */
    .pui-sk--animated .pui-sk::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(90deg,
        transparent 0%, rgba(255,255,255,.6) 50%, transparent 100%);
      animation: pui-shimmer 1.4s infinite;
    }
    @keyframes pui-shimmer {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(100%);  }
    }
  `],
})
export class PuiSkeletonComponent {
  @Input() variant: SkeletonVariant = 'text';
  @Input() width  = '100%';
  @Input() height = '16px';
  @Input() rows   = 1;
  @Input() animated = true;

  get _rows(): number[] { return Array.from({ length: this.rows }); }
}
