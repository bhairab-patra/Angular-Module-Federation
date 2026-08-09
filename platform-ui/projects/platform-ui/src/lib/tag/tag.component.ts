import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'pink';
export type TagSize    = 'sm' | 'md';

@Component({
  selector: 'pui-lib-tag',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class PuiTagComponent {
  @Input() variant: TagVariant = 'default';
  @Input() size:    TagSize    = 'md';

  get hostClass(): string {
    return `pui-tag pui-tag--${this.size} pui-tag--${this.variant}`;
  }
}
