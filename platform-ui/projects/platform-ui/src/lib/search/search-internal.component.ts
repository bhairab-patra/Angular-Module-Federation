import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PuiSearchComponent } from './search.component';

/**
 * Identical to PuiSearchComponent, under a selector that's never globally
 * registered as a custom element. Used by every OTHER component that nests
 * a search box internally (table, data-table, editable-table, sidebar), so
 * the real `pui-lib-search` tag stays free to register as its own
 * standalone Web Component (see elements/src/main.ts).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-search-internal',
  standalone: true,
  imports: [NgIf, NgFor],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class PuiSearchInternalComponent extends PuiSearchComponent {}
