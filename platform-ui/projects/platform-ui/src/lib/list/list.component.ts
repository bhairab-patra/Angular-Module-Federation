import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding } from '@angular/core';
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
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PuiListComponent {
  @Input() items:      ListItem[]  = [];
  @Input() variant:    ListVariant = 'bordered';
  @Input() selectable  = false;
  @Input() selectedId: string | number | null = null;

  /** Label text color for all items. Default: inherits neutral-900. */
  @Input() textColor    = '';
  /** Text + accent color for the selected row. Default: teal (#0d9488). */
  @Input() activeColor  = '#0d9488';
  /** Background color on row hover. Default: teal-50 (#f0fdfa). */
  @Input() hoverColor   = '#f0fdfa';

  @Output() itemSelect = new EventEmitter<ListItem>();

  @HostBinding('style')
  get cssVars(): string {
    const parts: string[] = [
      `--pui-list-hover-bg: ${this.hoverColor}`,
      `--pui-list-active-color: ${this.activeColor}`,
    ];
    if (this.textColor) parts.push(`--pui-list-text-color: ${this.textColor}`);
    return parts.join(';');
  }

  get hostClass(): string { return `pui-list pui-list--${this.variant}`; }

  select(item: ListItem): void {
    this.selectedId = item.id;
    this.itemSelect.emit(item);
  }
}
