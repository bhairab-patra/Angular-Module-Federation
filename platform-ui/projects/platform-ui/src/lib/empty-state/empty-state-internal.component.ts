import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { PuiEmptyStateComponent } from './empty-state.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-empty-state-internal',
  standalone: true,
  imports: [NgIf, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class PuiEmptyStateInternalComponent extends PuiEmptyStateComponent {}
