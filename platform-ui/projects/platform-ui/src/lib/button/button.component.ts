import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonVariant, ButtonSize } from '../models/button.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label?: string;
  @Input() progress = 0;
  @Input() forceState?: 'hover' | 'focus';

  @Output() buttonClick = new EventEmitter<MouseEvent>();
  @Output() buttonFocus = new EventEmitter<FocusEvent>();
  @Output() buttonBlur = new EventEmitter<FocusEvent>();
  @Output() buttonHover = new EventEmitter<MouseEvent>();
  @Output() buttonLeave = new EventEmitter<MouseEvent>();

  get isUploadProgress(): boolean { return this.variant === 'upload-progress'; }

  get hostClasses(): string {
    return [
      'pui-btn',
      `pui-btn--${this.variant}`,
      `pui-btn--${this.size}`,
      this.fullWidth ? 'pui-btn--full' : '',
      this.loading ? 'pui-btn--loading' : '',
      this.forceState ? `pui-btn--state-${this.forceState}` : '',
    ].filter(Boolean).join(' ');
  }

  onClick(e: MouseEvent): void { if (!this.disabled && !this.loading) this.buttonClick.emit(e); }
  onFocus(e: FocusEvent): void { this.buttonFocus.emit(e); }
  onBlur(e: FocusEvent): void { this.buttonBlur.emit(e); }
  onHover(e: MouseEvent): void { this.buttonHover.emit(e); }
  onLeave(e: MouseEvent): void { this.buttonLeave.emit(e); }
}
