import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
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
  selector: 'pui-lib-list',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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
