import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { PuiFooterComponent } from './footer.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-footer-internal',
  standalone: true,
  imports: [NgIf, NgFor, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class PuiFooterInternalComponent extends PuiFooterComponent {}
