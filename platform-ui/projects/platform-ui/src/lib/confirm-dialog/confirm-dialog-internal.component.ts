import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonInternalComponent } from '../button/button-internal.component';
import { PuiConfirmDialogComponent } from './confirm-dialog.component';

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
