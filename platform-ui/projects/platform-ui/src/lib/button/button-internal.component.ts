import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

/**
 * Identical to ButtonComponent, under a selector that's never globally
 * registered as a custom element. Used by composites that nest a button
 * internally (form-dialog, confirm-dialog), so the real `pui-lib-button`
 * tag stays free to register as its own standalone Web Component (see
 * elements/src/main.ts).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-button-internal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ButtonInternalComponent extends ButtonComponent {}
