import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PuiSearchComponent } from './search.component';

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
