import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { ModalSize } from '../models/modal.model';

@Component({
  selector: 'pui-modal',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <div *ngIf="open" class="pui-modal-backdrop" (click)="onBackdropClick($event)">
      <div class="pui-modal pui-modal--{{size}}" role="dialog" [attr.aria-label]="title">
        <div class="pui-modal__header">
          <span class="pui-modal__title">{{ title }}</span>
          <button class="pui-modal__close" (click)="closed.emit()" aria-label="Close">✕</button>
        </div>
        <div class="pui-modal__body">
          <ng-content></ng-content>
        </div>
        <div class="pui-modal__footer">
          <ng-content select="[footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pui-modal-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.45);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000;
    }
    .pui-modal {
      background: #fff; border-radius: 10px;
      box-shadow: 0 20px 60px rgba(0,0,0,.18);
      display: flex; flex-direction: column;
      max-height: 90vh; overflow: hidden;
      animation: pui-modal-in .18s ease;
    }
    .pui-modal--sm { width: 360px; }
    .pui-modal--md { width: 520px; }
    .pui-modal--lg { width: 720px; }
    .pui-modal__header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px; border-bottom: 1px solid #e2e8f0;
    }
    .pui-modal__title { font-size: 16px; font-weight: 600; color: #0f172a; }
    .pui-modal__close {
      background: none; border: none; cursor: pointer;
      color: #94a3b8; font-size: 18px; padding: 0 4px;
      &:hover { color: #334155; }
    }
    .pui-modal__body   { padding: 20px; overflow-y: auto; flex: 1; color: #334155; }
    .pui-modal__footer {
      padding: 12px 20px; border-top: 1px solid #e2e8f0;
      display: flex; justify-content: flex-end; gap: 8px;
    }
    .pui-modal__footer:empty { display: none; }
    @keyframes pui-modal-in {
      from { opacity: 0; transform: translateY(-12px) scale(.97); }
      to   { opacity: 1; transform: none; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() open  = false;
  @Input() title = 'Dialog';
  @Input() size: ModalSize = 'md';
  @Input() closeOnBackdrop = true;

  @Output() closed = new EventEmitter<void>();

  onBackdropClick(e: MouseEvent): void {
    if (this.closeOnBackdrop && e.target === e.currentTarget) {
      this.closed.emit();
    }
  }
}
