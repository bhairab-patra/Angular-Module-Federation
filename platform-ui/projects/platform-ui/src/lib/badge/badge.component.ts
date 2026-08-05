import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BadgeVariant, BadgeSize } from '../models/badge.model';

@Component({
  selector: 'pui-badge',
  standalone: true,
  template: `<span [class]="hostClasses"><ng-content></ng-content></span>`,
  styles: [`
    .pui-badge {
      display: inline-flex; align-items: center;
      border-radius: 999px; font-weight: 600;
      white-space: nowrap; letter-spacing: .02em;
    }
    .pui-badge--sm  { padding: 2px 8px;  font-size: 11px; }
    .pui-badge--md  { padding: 4px 10px; font-size: 12px; }
    .pui-badge--default { background:#f1f5f9; color:#475569; border:1px solid #475569; }
    .pui-badge--primary { background:#dbeafe; color:#1d4ed8; border:1px solid #1d4ed8; }
    .pui-badge--success { background:#dcfce7; color:#15803d; border:1px solid #15803d; }
    .pui-badge--warning { background:#fef9c3; color:#a16207; border:1px solid #a16207; }
    .pui-badge--danger  { background:#fee2e2; color:#b91c1c; border:1px solid #b91c1c; }
    .pui-badge--info    { background:#e0f2fe; color:#0369a1; border:1px solid #0369a1; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';

  get hostClasses(): string {
    return `pui-badge pui-badge--${this.size} pui-badge--${this.variant}`;
  }
}
