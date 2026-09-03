import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { IconButtonComponent } from './icon-button.component';

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
