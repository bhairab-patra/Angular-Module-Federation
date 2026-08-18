import {
  Component, Input, Output, EventEmitter,
  ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { AccordionItem, AccordionVariant } from '../models/accordion.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-accordion',
  standalone: true,
  imports: [NgFor, NgIf, IconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './accordion.component.html',
  styleUrls:   ['./accordion.component.scss'],
})
export class PuiAccordionComponent {
  @Input() items:         AccordionItem[]      = [];
  @Input() allowMultiple  = false;
  @Input() variant:       AccordionVariant     = 'default';
  @Input() openIds:       (string | number)[]  = [];

  @Output() openIdsChange = new EventEmitter<(string | number)[]>();
  @Output() itemToggle    = new EventEmitter<{ id: string | number; open: boolean }>();

  isOpen(id: string | number): boolean {
    return this.openIds.includes(id);
  }

  toggle(item: AccordionItem): void {
    if (item.disabled) return;

    const wasOpen = this.isOpen(item.id);
    if (wasOpen) {
      this.openIds = this.openIds.filter(i => i !== item.id);
    } else {
      this.openIds = this.allowMultiple ? [...this.openIds, item.id] : [item.id];
    }

    this.openIdsChange.emit(this.openIds);
    this.itemToggle.emit({ id: item.id, open: !wasOpen });
  }

  trackItem(_: number, item: AccordionItem): string | number { return item.id; }
}
