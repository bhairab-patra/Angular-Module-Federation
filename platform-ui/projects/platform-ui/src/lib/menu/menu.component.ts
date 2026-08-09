import {
  Component, Input, Output, EventEmitter, HostListener,
  ChangeDetectionStrategy, ChangeDetectorRef, inject, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MenuItem, MenuPlacement, MenuVariant } from '../models/menu.model';

@Component({
  selector: 'pui-lib-menu',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  private cdr = inject(ChangeDetectorRef);

  /** Menu items (supports nested children for submenus) */
  @Input() items: MenuItem[] = [];

  /** Label shown on the trigger button when no ng-content is projected */
  @Input() trigger = 'Menu';

  /** Visual style of the trigger button */
  @Input() variant: MenuVariant = 'default';

  /** Where the dropdown opens relative to the trigger */
  @Input() placement: MenuPlacement = 'bottom-start';

  /** Disable the trigger */
  @Input() disabled = false;

  /** Max pixel height of the dropdown panel before it scrolls */
  @Input() maxHeight = 320;

  /** Emits the selected MenuItem (leaf items only) */
  @Output() menuSelect = new EventEmitter<MenuItem>();

  open = false;
  activeSubmenuId: string | null = null;

  toggle(): void {
    if (this.disabled) return;
    this.open = !this.open;
    if (!this.open) this.activeSubmenuId = null;
    this.cdr.markForCheck();
  }

  close(): void {
    this.open = false;
    this.activeSubmenuId = null;
    this.cdr.markForCheck();
  }

  select(item: MenuItem, event: Event): void {
    if (item.disabled) return;
    if (item.children?.length) {
      event.stopPropagation();
      this.activeSubmenuId = this.activeSubmenuId === item.id ? null : item.id;
      this.cdr.markForCheck();
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
