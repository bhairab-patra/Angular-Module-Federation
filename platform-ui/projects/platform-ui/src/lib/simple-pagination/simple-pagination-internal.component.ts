import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { PuiSimplePaginationComponent } from './simple-pagination.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-simple-pagination-internal',
  standalone: true,
  imports: [NgFor, NgIf, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './simple-pagination.component.html',
  styleUrls: ['./simple-pagination.component.scss'],
})
export class PuiSimplePaginationInternalComponent extends PuiSimplePaginationComponent {}
