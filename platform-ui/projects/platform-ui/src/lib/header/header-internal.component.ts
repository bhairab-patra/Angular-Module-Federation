import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from './header.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-header-internal',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderInternalComponent extends HeaderComponent {}
