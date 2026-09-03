import { Component, forwardRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PuiTextareaComponent } from './textarea.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-textarea-internal',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PuiTextareaInternalComponent),
      multi: true,
    },
  ],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class PuiTextareaInternalComponent extends PuiTextareaComponent {}
