import {
  Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { ButtonVariant } from '../models/button.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-confirm-dialog',
  standalone: true,
  imports: [NgIf, ButtonComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class PuiConfirmDialogComponent {

  _open = false;
  @Input() set open(v: boolean | string) {
    this._open = v === true || v === 'true' || (v as any) === '';
  }

  @Input() title = 'Are you sure?';
  @Input() message = 'This action cannot be undone.';
  @Input() confirmLabel = 'Confirm';
  @Input() cancelLabel = 'Cancel';
  @Input() confirmVariant: ButtonVariant = 'destructive';
  @Input() closeOnBackdrop = true;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();


  onBackdropClick(e: MouseEvent): void {
    if (this.closeOnBackdrop && e.target === e.currentTarget) {
      this.cancelled.emit();
      this.closed.emit();
    }
  }

  onConfirm(): void { this.confirmed.emit(); }

  onCancel(): void {
    this.cancelled.emit();
    this.closed.emit();
  }
}
