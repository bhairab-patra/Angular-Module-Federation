import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ButtonVariant, ButtonSize } from '../models/button.model';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { IconSize } from '../icon/icon.component';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

export type IconButtonShape = 'circle' | 'square';

/** Icon scales up with the button so it always fills a consistent, legible
 * proportion of the button — a hardcoded icon size looked tiny inside lg. */
const ICON_SIZE_MAP: Record<ButtonSize, IconSize> = {
  sm: 'md',
  md: 'lg',
  lg: 'xl',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-icon-button',
  standalone: true,
  imports: [IconInternalComponent],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
})
export class IconButtonComponent {
  @Input() icon = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() shape: IconButtonShape = 'circle';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  /** Required for a11y — icon-only buttons have no visible text. */
  @Input() ariaLabel = '';

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get iconSize(): IconSize {
    return ICON_SIZE_MAP[this.size];
  }

  get hostClasses(): string {
    return [
      'pui-icon-btn',
      `pui-icon-btn--${this.variant}`,
      `pui-icon-btn--${this.size}`,
      `pui-icon-btn--${this.shape}`,
    ].join(' ');
  }

  onClick(e: MouseEvent): void {
    if (!this.disabled) this.buttonClick.emit(e);
  }
}
