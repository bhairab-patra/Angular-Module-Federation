import {
  Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MenuItem, MenuPlacement, MenuVariant } from '../models/menu.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-menu',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  @HostBinding('style.position') readonly _pos  = 'relative';
  @HostBinding('style.display')  readonly _disp = 'inline-block';

  @Input() items: MenuItem[] = [];

  @Input() trigger = 'Menu';

  @Input() variant: MenuVariant = 'default';

  @Input() placement: MenuPlacement = 'bottom-start';

  @Input() disabled = false;

  @Input() maxHeight = 320;

  @Output() menuSelect = new EventEmitter<MenuItem>();

  open = false;
  activeSubmenuId: string | null = null;

  toggle(): void {
    if (this.disabled) return;
    this.open = !this.open;
    if (!this.open) this.activeSubmenuId = null;
  }

  close(): void {
    this.open = false;
    this.activeSubmenuId = null;
  }

  select(item: MenuItem, event: Event): void {
    if (item.disabled) return;
    if (item.children?.length) {
      event.stopPropagation();
      this.activeSubmenuId = this.activeSubmenuId === item.id ? null : item.id;
      return;
    }
    this.menuSelect.emit(item);
    this.close();
  }

  hasActiveSubmenu(item: MenuItem): boolean {
    return this.activeSubmenuId === item.id;
  }

  trackById(_: number, item: MenuItem): string { return item.id; }

  get placementClass(): string { return `pui-menu--${this.placement}`; }
  get variantClass():   string { return `pui-menu-trigger--${this.variant}`; }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const host = (e.target as HTMLElement).closest('pui-lib-menu');
    if (!host) this.close();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (!this.open) return;
    if (e.key === 'Escape') { e.preventDefault(); this.close(); }
  }
}
