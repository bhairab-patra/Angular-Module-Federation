import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { IconButtonComponent } from './icon-button.component';

/**
 * Identical to IconButtonComponent, under a selector that's never globally
 * registered as a custom element. Used by composites that nest an icon
 * button internally (solifi-sidebar's collapsed rail), so the real
 * `pui-lib-icon-button` tag stays free to register as its own standalone
 * Web Component if it's ever added to elements/src/main.ts.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-icon-button-internal',
  standalone: true,
  imports: [IconInternalComponent],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class IconButtonInternalComponent extends IconButtonComponent {}
