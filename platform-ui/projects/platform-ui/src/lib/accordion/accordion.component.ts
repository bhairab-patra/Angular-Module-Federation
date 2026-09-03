import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { AccordionItem, AccordionVariant } from '../models/accordion.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-accordion',
  standalone: true,
  imports: [NgFor, NgIf, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class PuiAccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input() allowMultiple = false;
  @Input() variant: AccordionVariant = 'default';
  @Input() openIds: (string | number)[] = [];

  @Output() openIdsChange = new EventEmitter<(string | number)[]>();
  @Output() itemToggle = new EventEmitter<{ id: string | number; open: boolean }>();

  constructor(private _sanitizer: DomSanitizer) {}

  private _trustedHtml = new Map<string, SafeHtml>();

  trustHtml(html: string): SafeHtml {
    let trusted = this._trustedHtml.get(html);
    if (!trusted) {
      trusted = this._sanitizer.bypassSecurityTrustHtml(html);
      this._trustedHtml.set(html, trusted);
    }
    return trusted;
  }

  isOpen(id: string | number): boolean {
    return this.openIds.includes(id);
  }

  toggle(item: AccordionItem): void {
    if (item.disabled) return;

    const wasOpen = this.isOpen(item.id);
    if (wasOpen) {
      this.openIds = this.openIds.filter((i) => i !== item.id);
    } else {
      this.openIds = this.allowMultiple ? [...this.openIds, item.id] : [item.id];
    }

    this.openIdsChange.emit(this.openIds);
    this.itemToggle.emit({ id: item.id, open: !wasOpen });
  }

  trackItem(_: number, item: AccordionItem): string | number {
    return item.id;
  }
}
