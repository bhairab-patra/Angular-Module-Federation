import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

export type TagVariant =
  'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'pink';
export type TagSize = 'sm' | 'md';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-tag',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class PuiTagComponent {
  @Input() variant: TagVariant = 'default';
  @Input() size: TagSize = 'md';

  get hostClass(): string {
    return `pui-tag pui-tag--${this.size} pui-tag--${this.variant}`;
  }
}
