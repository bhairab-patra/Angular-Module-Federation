import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { ModalSize } from '../models/modal.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';
import { getDeepActiveElement } from '../focus-utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-modal',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnChanges {
  @Input() open = false;
  @Input() title = 'Dialog';
  @Input() size: ModalSize = 'md';
  @Input() closeOnBackdrop = true;

  @Output() closed = new EventEmitter<void>();

  private _previouslyFocused: HTMLElement | null = null;

  constructor(private _elRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['open']) return;
    if (this.open) {
      this._previouslyFocused = getDeepActiveElement();
      setTimeout(() => {
        const panel = this._elRef.nativeElement.shadowRoot?.querySelector(
          '.pui-modal',
        ) as HTMLElement | null;
        panel?.focus();
      });
    } else {
      const toFocus = this._previouslyFocused;
      this._previouslyFocused = null;
      setTimeout(() => toFocus?.focus());
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open && this.closeOnBackdrop) this.closed.emit();
  }

  onBackdropClick(e: MouseEvent): void {
    if (this.closeOnBackdrop && e.target === e.currentTarget) {
      this.closed.emit();
    }
  }
}
