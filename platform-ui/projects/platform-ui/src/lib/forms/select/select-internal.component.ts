import { Component, forwardRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PuiSelectComponent } from './select.component';

/**
 * Identical to PuiSelectComponent, under a selector that's never globally
 * registered as a custom element. Used by composites that nest a select
 * internally (form-dialog), so the real `pui-lib-select` tag stays free to
 * register as its own standalone Web Component (see elements/src/main.ts).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-select-internal',
  standalone: true,
  imports: [NgIf, NgFor],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiSelectInternalComponent),
    multi: true,
  }],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class PuiSelectInternalComponent extends PuiSelectComponent {}
