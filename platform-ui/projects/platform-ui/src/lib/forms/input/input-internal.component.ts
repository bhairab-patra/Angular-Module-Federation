import { Component, forwardRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { PuiInputComponent } from './input.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-input-internal',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PuiInputInternalComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PuiInputInternalComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class PuiInputInternalComponent extends PuiInputComponent {}
