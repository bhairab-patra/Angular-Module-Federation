import { Component, forwardRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PuiTextareaComponent } from './textarea.component';

/**
 * Identical to PuiTextareaComponent, under a selector that's never globally
 * registered as a custom element. Used by composites that nest a textarea
 * internally (form-dialog), so the real `pui-lib-textarea` tag stays free
 * to register as its own standalone Web Component (see elements/src/main.ts).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-textarea-internal',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PuiTextareaInternalComponent),
    multi: true,
  }],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class PuiTextareaInternalComponent extends PuiTextareaComponent {}
