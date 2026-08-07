import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';

export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ChipSize    = 'sm' | 'md';

@Component({
  selector: 'pui-chip',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="hostClass" [class.pui-chip--selected]="selected" [class.pui-chip--disabled]="disabled"
          (click)="!disabled && clicked.emit()">
      <!-- leading icon slot -->
      <span *ngIf="icon" class="pui-chip__icon" [innerHTML]="icon"></span>
      <span class="pui-chip__label"><ng-content></ng-content></span>
      <!-- removable × -->
      <button *ngIf="removable && !disabled"
              class="pui-chip__remove"
              (click)="$event.stopPropagation(); removed.emit()"
              aria-label="Remove">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </button>
    </span>
  `,
  styles: [`
    :host { display: inline-flex; }

    .pui-chip {
      display: inline-flex; align-items: center; gap: 5px;
      border-radius: 999px; font-weight: 500; cursor: pointer;
      border: 1px solid transparent; white-space: nowrap;
      font-family: inherit; transition: opacity .15s, box-shadow .15s;
      user-select: none;
    }
    .pui-chip--sm { padding: 3px 10px;  font-size: 12px; }
    .pui-chip--md { padding: 5px 14px;  font-size: 13px; }

    /* variants */
    .pui-chip--default { background: #f1f5f9; color: #475569; border-color: #cbd5e1; }
    .pui-chip--primary { background: #dbeafe; color: #1d4ed8; border-color: #93c5fd; }
    .pui-chip--success { background: #dcfce7; color: #15803d; border-color: #86efac; }
    .pui-chip--warning { background: #fef9c3; color: #a16207; border-color: #fde047; }
    .pui-chip--danger  { background: #fee2e2; color: #b91c1c; border-color: #fca5a5; }
    .pui-chip--info    { background: #e0f2fe; color: #0369a1; border-color: #7dd3fc; }

    .pui-chip--selected { box-shadow: 0 0 0 2px currentColor; }
    .pui-chip--disabled { opacity: .45; cursor: not-allowed; }
    .pui-chip:not(.pui-chip--disabled):hover { opacity: .85; }

    .pui-chip__icon { display: inline-flex; align-items: center; line-height: 1; }
    .pui-chip__remove {
      display: inline-flex; align-items: center; justify-content: center;
      width: 16px; height: 16px; border-radius: 50%;
      border: none; background: transparent; color: inherit;
      cursor: pointer; padding: 0; opacity: .7;
      margin-left: 2px;
    }
    .pui-chip__remove:hover { opacity: 1; background: rgba(0,0,0,.08); }
  `],
})
export class PuiChipComponent {
  @Input() variant:  ChipVariant = 'default';
  @Input() size:     ChipSize    = 'md';
  @Input() selected  = false;
  @Input() removable = false;
  @Input() disabled  = false;
  @Input() icon      = '';

  @Output() clicked = new EventEmitter<void>();
  @Output() removed = new EventEmitter<void>();

  get hostClass(): string {
    return `pui-chip pui-chip--${this.size} pui-chip--${this.variant}`;
  }
}
