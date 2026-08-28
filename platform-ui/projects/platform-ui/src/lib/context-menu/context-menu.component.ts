import {
  Component, Input, Output, EventEmitter,
  HostListener, ElementRef, inject,
  ViewEncapsulation, ChangeDetectionStrategy,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { MenuItem } from '../models/menu.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-context-menu',
  standalone: true,
  imports: [NgFor, NgIf, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class PuiContextMenuComponent {
  @Input() items: MenuItem[] = [];

  @Input() set disabled(v: boolean | string) {
    this._disabled = v === true || v === 'true' || (v as any) === '';
  }
  get disabled(): boolean { return this._disabled; }
  private _disabled = false;

  @Output() menuSelect = new EventEmitter<MenuItem>();
  @Output() openChange = new EventEmitter<boolean>();

  open = false;
  x = 0;
  y = 0;

  private _el = inject(ElementRef<HTMLElement>);
  private static readonly MENU_W = 220;
  private static readonly MENU_H_ESTIMATE = 320;

  onContextMenu(e: MouseEvent): void {
    if (this.disabled || !this.items.length) return;
    e.preventDefault();

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    this.x = Math.min(e.clientX, vw - PuiContextMenuComponent.MENU_W - 8);
    this.y = Math.min(e.clientY, vh - PuiContextMenuComponent.MENU_H_ESTIMATE - 8);

    this.open = true;
    this.openChange.emit(true);
  }

  select(item: MenuItem): void {
    if (item.disabled || item.children?.length) return;
    this.menuSelect.emit(item);
    this.close();
  }

  close(): void {
    if (!this.open) return;
    this.open = false;
    this.openChange.emit(false);
  }

  trackById(_: number, item: MenuItem): string { return item.id; }

  @HostListener('document:click')
  onDocClick(): void { this.close(); }

  @HostListener('document:contextmenu', ['$event'])
  onDocContextMenu(e: MouseEvent): void {
    // A second right-click outside this component's own zone should close
    // any menu this instance already opened, instead of leaving it stuck.
    const path: EventTarget[] = e.composedPath ? e.composedPath() : [];
    const inside = path.length
      ? path.includes(this._el.nativeElement)
      : this._el.nativeElement.contains(e.target as Node);
    if (this.open && !inside) this.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.close(); }

  @HostListener('window:scroll')
  onScroll(): void { this.close(); }

  @HostListener('window:resize')
  onResize(): void { this.close(); }
}
