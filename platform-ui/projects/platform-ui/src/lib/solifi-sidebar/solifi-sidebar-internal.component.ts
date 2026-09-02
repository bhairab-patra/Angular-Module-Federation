import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { IconButtonInternalComponent } from '../icon-button/icon-button-internal.component';
import { PuiSolifiSidebarComponent } from './solifi-sidebar.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-solifi-sidebar-internal',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, IconInternalComponent, IconButtonInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './solifi-sidebar.component.html',
  styleUrls: ['./solifi-sidebar.component.scss'],
})
export class PuiSolifiSidebarInternalComponent extends PuiSolifiSidebarComponent {}
