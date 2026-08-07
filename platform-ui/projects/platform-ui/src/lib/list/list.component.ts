import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface ListItem {
  id:          string | number;
  label:       string;
  description?: string;
  icon?:       string;       // raw SVG or emoji
  badge?:      string;
  meta?:       string;
  disabled?:   boolean;
  divider?:    boolean;      // renders a separator after this item
}

export type ListVariant = 'default' | 'bordered' | 'striped' | 'flush';

@Component({
  selector: 'pui-list',
  standalone: true,
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul [class]="hostClass" role="list">
      <ng-container *ngFor="let item of items">

        <li class="pui-list__item"
            [class.pui-list__item--clickable]="selectable && !item.disabled"
            [class.pui-list__item--selected]="selectedId === item.id"
            [class.pui-list__item--disabled]="item.disabled"
            [attr.aria-selected]="selectable ? selectedId === item.id : null"
            (click)="!item.disabled && selectable && select(item)">

          <!-- icon -->
          <span *ngIf="item.icon" class="pui-list__icon" [innerHTML]="item.icon"></span>

          <!-- text -->
          <span class="pui-list__text">
            <span class="pui-list__label">{{ item.label }}</span>
            <span *ngIf="item.description" class="pui-list__desc">{{ item.description }}</span>
          </span>

          <!-- right side -->
          <span class="pui-list__right">
            <span *ngIf="item.meta"  class="pui-list__meta">{{ item.meta }}</span>
            <span *ngIf="item.badge" class="pui-list__badge">{{ item.badge }}</span>
          </span>
        </li>

        <li *ngIf="item.divider" class="pui-list__divider" role="separator"></li>

      </ng-container>
    </ul>
  `,
  styles: [`
    :host { display: block; }

    .pui-list {
      list-style: none; margin: 0; padding: 0;
      font-family: inherit; font-size: 14px; color: #111827;
    }

    /* variants */
    .pui-list--bordered { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
    .pui-list--striped .pui-list__item:nth-child(even) { background: #f9fafb; }
    .pui-list--flush   .pui-list__item { border-bottom: 1px solid #f3f4f6; }
    .pui-list--flush   .pui-list__item:last-child { border-bottom: none; }
    .pui-list--default {}

    .pui-list__item {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px;
    }
    .pui-list--bordered .pui-list__item { border-bottom: 1px solid #f3f4f6; }
    .pui-list--bordered .pui-list__item:last-child { border-bottom: none; }

    .pui-list__item--clickable { cursor: pointer; transition: background .12s; }
    .pui-list__item--clickable:hover { background: #f9fafb; }
    .pui-list__item--selected  { background: #eff6ff !important; color: #1d4ed8; }
    .pui-list__item--disabled  { opacity: .45; cursor: not-allowed; }

    .pui-list__icon { display: inline-flex; align-items: center; flex-shrink: 0; }

    .pui-list__text  { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .pui-list__label { font-weight: 500; }
    .pui-list__desc  { font-size: 12.5px; color: #6b7280; }

    .pui-list__right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .pui-list__meta  { font-size: 12px; color: #9ca3af; }
    .pui-list__badge {
      background: #e0f2fe; color: #0369a1;
      font-size: 11px; font-weight: 700;
      padding: 2px 7px; border-radius: 999px;
    }

    .pui-list__divider {
      height: 1px; background: #e5e7eb;
      margin: 4px 0; padding: 0;
    }
  `],
})
export class PuiListComponent {
  @Input() items:      ListItem[]  = [];
  @Input() variant:    ListVariant = 'bordered';
  @Input() selectable  = false;
  @Input() selectedId: string | number | null = null;

  @Output() itemSelect = new EventEmitter<ListItem>();

  get hostClass(): string { return `pui-list pui-list--${this.variant}`; }

  select(item: ListItem): void {
    this.selectedId = item.id;
    this.itemSelect.emit(item);
  }
}
