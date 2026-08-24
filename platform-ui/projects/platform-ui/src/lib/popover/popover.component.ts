import {
  Component, Input, Output, EventEmitter,
  HostListener, HostBinding, ElementRef, inject,
  ViewEncapsulation, ChangeDetectionStrategy,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { PopoverPlacement, PopoverTriggerMode } from '../models/popover.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-popover',
  standalone: true,
  imports: [NgIf],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PuiPopoverComponent {
  @HostBinding('style.position') readonly _pos = 'relative';
  @HostBinding('style.display') readonly _disp = 'inline-block';

  @Input() placement: PopoverPlacement = 'bottom';
  @Input() triggerMode: PopoverTriggerMode = 'click';
  @Input() showArrow = true;

  @Input() set disabled(v: boolean | string) {
    this._disabled = v === true || v === 'true' || (v as any) === '';
  }
  get disabled(): boolean { return this._disabled; }
  private _disabled = false;

  /** Two-way bindable open state — also drivable manually via triggerMode="manual". */
  @Input() set open(v: boolean | string) {
    this._open = v === true || v === 'true' || (v as any) === '';
  }
  get open(): boolean { return this._open; }
  private _open = false;

  @Output() openChange = new EventEmitter<boolean>();

  private _el = inject(ElementRef<HTMLElement>);
  private _hoverCloseTimer: ReturnType<typeof setTimeout> | null = null;

  get placementClass(): string { return `pui-pop__panel--${this.placement}`; }

  private _setOpen(v: boolean): void {
    if (this.disabled || this._open === v) return;
    this._open = v;
    this.openChange.emit(v);
  }

  toggle(): void {
    if (this.triggerMode !== 'click' || this.disabled) return;
    this._setOpen(!this._open);
  }

  onTriggerEnter(): void {
    if (this.triggerMode !== 'hover' || this.disabled) return;
    this._clearHoverTimer();
    this._setOpen(true);
  }

  onTriggerLeave(): void {
    if (this.triggerMode !== 'hover') return;
    this._scheduleHoverClose();
  }

  onPanelEnter(): void {
    if (this.triggerMode !== 'hover') return;
    this._clearHoverTimer();
  }

  onPanelLeave(): void {
    if (this.triggerMode !== 'hover') return;
    this._scheduleHoverClose();
  }

  private _scheduleHoverClose(): void {
    this._clearHoverTimer();
    this._hoverCloseTimer = setTimeout(() => this._setOpen(false), 120);
  }

  private _clearHoverTimer(): void {
    if (this._hoverCloseTimer) { clearTimeout(this._hoverCloseTimer); this._hoverCloseTimer = null; }
  }

  close(): void { this._setOpen(false); }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (this.triggerMode === 'manual') return;
    if (!this._el.nativeElement.contains(e.target as Node)) this._setOpen(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.triggerMode !== 'manual') this._setOpen(false);
  }
}
