import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'pink';
export type TagSize    = 'sm' | 'md';

@Component({
  selector: 'pui-tag',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="hostClass"><ng-content></ng-content></span>`,
  styles: [`
    :host { display: inline-flex; }

    .pui-tag {
      display: inline-flex; align-items: center;
      border-radius: 4px; font-weight: 600;
      letter-spacing: .03em; white-space: nowrap;
      text-transform: uppercase;
    }
    .pui-tag--sm { padding: 1px 6px;  font-size: 10px; }
    .pui-tag--md { padding: 3px 9px;  font-size: 11px; }

    .pui-tag--default { background: #f1f5f9; color: #475569; }
    .pui-tag--primary { background: #dbeafe; color: #1d4ed8; }
    .pui-tag--success { background: #dcfce7; color: #15803d; }
    .pui-tag--warning { background: #fef9c3; color: #a16207; }
    .pui-tag--danger  { background: #fee2e2; color: #b91c1c; }
    .pui-tag--info    { background: #e0f2fe; color: #0369a1; }
    .pui-tag--purple  { background: #f3e8ff; color: #7e22ce; }
    .pui-tag--pink    { background: #fce7f3; color: #be185d; }
  `],
})
export class PuiTagComponent {
  @Input() variant: TagVariant = 'default';
  @Input() size:    TagSize    = 'md';

  get hostClass(): string {
    return `pui-tag pui-tag--${this.size} pui-tag--${this.variant}`;
  }
}
