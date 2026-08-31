import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonInternalComponent } from '../button/button-internal.component';
import { PuiConfirmDialogComponent } from './confirm-dialog.component';

/**
 * Identical to PuiConfirmDialogComponent, under a selector that's never
 * globally registered as a custom element. Used by pui-lib-form-dialog to
 * nest its "discard changes?" prompt, so the real `pui-lib-confirm-dialog`
 * tag stays free to register as its own standalone Web Component (see
 * elements/src/main.ts).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-confirm-dialog-internal',
  standalone: true,
  imports: [NgIf, ButtonInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class PuiConfirmDialogInternalComponent extends PuiConfirmDialogComponent {}
