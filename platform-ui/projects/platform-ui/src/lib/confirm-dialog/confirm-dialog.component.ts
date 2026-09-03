import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonInternalComponent } from '../button/button-internal.component';
import { ButtonVariant } from '../models/button.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';
import { getDeepActiveElement } from '../focus-utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-confirm-dialog',
  standalone: true,
  imports: [NgIf, ButtonInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class PuiConfirmDialogComponent {
  private _previouslyFocused: HTMLElement | null = null;

  constructor(private _elRef: ElementRef<HTMLElement>) {}

  _open = false;
  @Input() set open(v: boolean | string) {
    const next = v === true || v === 'true' || (v as any) === '';
    if (next && !this._open) {
      this._previouslyFocused = getDeepActiveElement();
      setTimeout(() => {
        const panel = this._elRef.nativeElement.shadowRoot?.querySelector(
          '.pui-cd',
        ) as HTMLElement | null;
        panel?.focus();
      });
    } else if (!next && this._open) {
      const toFocus = this._previouslyFocused;
      this._previouslyFocused = null;
      setTimeout(() => toFocus?.focus());
    }
    this._open = next;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this._open && this.closeOnBackdrop) this.onCancel();
  }

  @Input() title = 'Are you sure?';
  @Input() message = 'This action cannot be undone.';
  @Input() confirmLabel = 'Confirm';
  @Input() cancelLabel = 'Cancel';
  @Input() confirmVariant: ButtonVariant = 'destructive';
  @Input() tone: 'danger' | 'warning' = 'danger';
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

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
    this.closed.emit();
  }
}
