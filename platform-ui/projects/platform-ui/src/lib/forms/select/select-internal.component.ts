import { Component, forwardRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PuiSelectComponent } from './select.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-select-internal',
  standalone: true,
  imports: [NgIf, NgFor],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PuiSelectInternalComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class PuiSelectInternalComponent extends PuiSelectComponent {}
