import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { TooltipPosition } from '../tooltip/tooltip.component';
import { TooltipInternalComponent } from '../tooltip/tooltip-internal.component';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-label',
  standalone: true,
  imports: [NgIf, TooltipInternalComponent, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent {
  /** Label text. */
  @Input() text = '';

  /** Shows a red asterisk after the text. */
  @Input() set required(v: boolean | string) {
    this._required = v === true || v === 'true' || (v as unknown) === '';
  }
  get required(): boolean { return this._required; }
  private _required = false;

  /** Whether the info icon + tooltip renders at all. Off by default —
   * only pass true when there's actually a hint worth showing. */
  @Input() set showInfo(v: boolean | string) {
    this._showInfo = v === true || v === 'true' || (v as unknown) === '';
  }
  get showInfo(): boolean { return this._showInfo; }
  private _showInfo = false;

  /** Tooltip text shown on hover of the info icon. Has no effect unless showInfo is true. */
  @Input() info = '';

  /** Tooltip placement relative to the info icon. */
  @Input() infoPosition: TooltipPosition = 'top';
}
