import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

export interface ListItem {
  id: string | number;
  label: string;
  description?: string;
  icon?: string;
  badge?: string;
  meta?: string;
  disabled?: boolean;
  divider?: boolean;
}

export type ListVariant = 'default' | 'bordered' | 'striped' | 'flush';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-list',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PuiListComponent {
  @Input() items: ListItem[] = [];
  @Input() variant: ListVariant = 'bordered';
  @Input() selectable = false;
  @Input() selectedId: string | number | null = null;

  @Input() textColor = '';
  @Input() activeColor = 'var(--pui-list-active-default)';
  @Input() hoverColor = 'var(--pui-list-hover-bg-default)';

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
