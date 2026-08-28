import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { PuiSimplePaginationComponent } from './simple-pagination.component';

/**
 * Identical to PuiSimplePaginationComponent, under a selector that's never
 * globally registered as a custom element. Used by pui-lib-data-table and
 * pui-lib-editable-table to nest their pager, so the real
 * `pui-lib-simple-pagination` tag stays free to register as its own
 * standalone Web Component (see elements/src/main.ts).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-simple-pagination-internal',
  standalone: true,
  imports: [NgFor, NgIf, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './simple-pagination.component.html',
  styleUrls: ['./simple-pagination.component.scss'],
})
export class PuiSimplePaginationInternalComponent extends PuiSimplePaginationComponent {}
