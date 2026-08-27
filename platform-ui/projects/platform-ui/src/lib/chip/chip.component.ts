import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

export type ChipVariant = 'default' | 'primary' | 'primary-light' | 'primary-outline' | 'secondary' | 'secondary-light';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-chip',
  standalone: true,
  imports: [NgIf, IconComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class PuiChipComponent {
  @Input() variant:  ChipVariant = 'default';
  @Input() selected  = false;
  @Input() removable = false;
  @Input() disabled  = false;
  @Input() icon      = '';

  @Output() clicked = new EventEmitter<void>();
  @Output() removed = new EventEmitter<void>();

  get hostClass(): string {
    return `pui-chip pui-chip--${this.variant}`;
  }
}
