import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, inject
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;          // SVG string or emoji
  badge?: string | number;
  disabled?: boolean;
}

export type TabsVariant     = 'line' | 'pill' | 'card';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize        = 'sm' | 'md' | 'lg';

@Component({
  selector: 'pui-tabs',
  standalone: true,
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="pui-tabs-host"
     [class.pui-tabs--vertical]="_orientation === 'vertical'"
     [attr.data-variant]="_variant">

  <!-- ── Tab strip ─────────────────────────────── -->
  <div class="pui-tabs-strip"
       role="tablist"
       [attr.aria-orientation]="_orientation">

    <button *ngFor="let tab of _tabs; let i = index"
            class="pui-tab-btn"
            role="tab"
            [class.pui-tab-btn--active]="tab.id === _active"
            [class.pui-tab-btn--disabled]="tab.disabled"
            [class.pui-tab-btn--sm]="_size === 'sm'"
            [class.pui-tab-btn--lg]="_size === 'lg'"
            [attr.aria-selected]="tab.id === _active"
            [attr.aria-disabled]="tab.disabled || null"
            [disabled]="tab.disabled || null"
            (click)="select(tab)"
            (keydown)="onKey($event, i)">

      <!-- optional icon -->
      <span *ngIf="tab.icon" class="pui-tab-icon" [innerHTML]="tab.icon"></span>

      <span class="pui-tab-label">{{ tab.label }}</span>

      <!-- optional badge -->
      <span *ngIf="tab.badge !== undefined && tab.badge !== null"
            class="pui-tab-badge"
            [class.pui-tab-badge--active]="tab.id === _active">
        {{ tab.badge }}
      </span>

      <!-- active indicator for line variant -->
      <span *ngIf="_variant === 'line' && tab.id === _active"
            class="pui-tab-indicator" aria-hidden="true"></span>
    </button>
  </div>

  <!-- ── Panel ─────────────────────────────────── -->
  <div class="pui-tabs-panel" role="tabpanel">
    <ng-content></ng-content>
  </div>

</div>
  `,
  styles: [`
    :host { display: block; }

    /* ── Host layout ─────────────────── */
    .pui-tabs-host {
      display: flex;
      flex-direction: column;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    }
    .pui-tabs--vertical {
      flex-direction: row;
      gap: 0;
    }

    /* ── Strip ───────────────────────── */
    .pui-tabs-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
    }
    .pui-tabs--vertical .pui-tabs-strip {
      flex-direction: column;
      flex-wrap: nowrap;
      min-width: 160px;
      border-right: 1px solid #e5e7eb;
      padding-right: 0;
    }

    /* ── Shared button base ──────────── */
    .pui-tab-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 9px 16px;
      border: none;
      background: transparent;
      font-size: 13.5px;
      font-weight: 500;
      font-family: inherit;
      color: #6b7280;
      cursor: pointer;
      border-radius: 0;
      transition: color .15s, background .15s;
      white-space: nowrap;
      outline: none;
      user-select: none;
    }
    .pui-tab-btn--sm { padding: 6px 12px; font-size: 12px; }
    .pui-tab-btn--lg { padding: 11px 20px; font-size: 15px; }

    .pui-tab-btn:focus-visible {
      outline: 2px solid #12C6A8;
      outline-offset: -2px;
      border-radius: 6px;
    }
    .pui-tab-btn--disabled {
      opacity: .45;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── LINE variant (default) ──────── */
    [data-variant='line'] .pui-tabs-strip {
      border-bottom: 1px solid #e5e7eb;
      gap: 0;
    }
    [data-variant='line'] .pui-tabs--vertical .pui-tabs-strip {
      border-bottom: none;
      border-right: 1px solid #e5e7eb;
    }
    [data-variant='line'] .pui-tab-btn {
      border-radius: 0;
      padding-bottom: 11px;
    }
    [data-variant='line'] .pui-tab-btn:hover:not(.pui-tab-btn--disabled) {
      color: #0d9e87;
      background: rgba(18,198,168,.05);
    }
    [data-variant='line'] .pui-tab-btn--active {
      color: #12C6A8;
      font-weight: 600;
    }

    /* sliding indicator */
    .pui-tab-indicator {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 2.5px;
      background: #12C6A8;
      border-radius: 2px 2px 0 0;
      animation: pui-tab-slide-in .18s ease;
    }
    .pui-tabs--vertical .pui-tab-indicator {
      top: 0; bottom: 0; right: 0; left: auto;
      width: 2.5px;
      height: auto;
      border-radius: 2px 0 0 2px;
    }
    @keyframes pui-tab-slide-in {
      from { opacity: 0; transform: scaleX(.4); }
      to   { opacity: 1; transform: scaleX(1); }
    }

    /* ── PILL variant ────────────────── */
    [data-variant='pill'] .pui-tabs-strip {
      background: #f3f4f6;
      border-radius: 10px;
      padding: 4px;
      border: none;
      gap: 2px;
      align-self: flex-start;
    }
    [data-variant='pill'] .pui-tab-btn {
      border-radius: 7px;
    }
    [data-variant='pill'] .pui-tab-btn:hover:not(.pui-tab-btn--disabled) {
      background: rgba(0,0,0,.06);
      color: #374151;
    }
    [data-variant='pill'] .pui-tab-btn--active {
      background: #fff;
      color: #111827;
      font-weight: 600;
      box-shadow: 0 1px 4px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.06);
    }

    /* ── CARD variant ────────────────── */
    [data-variant='card'] .pui-tabs-strip {
      gap: 4px;
      border-bottom: 1px solid #e5e7eb;
    }
    [data-variant='card'] .pui-tab-btn {
      border: 1px solid transparent;
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      background: transparent;
      margin-bottom: -1px;
    }
    [data-variant='card'] .pui-tab-btn:hover:not(.pui-tab-btn--disabled) {
      background: #f9fafb;
      border-color: #e5e7eb #e5e7eb transparent;
      color: #374151;
    }
    [data-variant='card'] .pui-tab-btn--active {
      background: #fff;
      border-color: #e5e7eb #e5e7eb #fff;
      color: #111827;
      font-weight: 600;
    }

    /* ── Icon ────────────────────────── */
    .pui-tab-icon {
      display: inline-flex;
      align-items: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
    .pui-tab-icon :deep(svg) { width: 100%; height: 100%; }

    /* ── Badge ───────────────────────── */
    .pui-tab-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 9px;
      font-size: 11px;
      font-weight: 600;
      background: #e5e7eb;
      color: #374151;
      transition: background .15s, color .15s;
    }
    .pui-tab-badge--active {
      background: rgba(18,198,168,.18);
      color: #0d9e87;
    }

    /* ── Panel ───────────────────────── */
    .pui-tabs-panel {
      flex: 1;
      padding: 16px 0 0;
      animation: pui-panel-in .18s ease;
    }
    .pui-tabs--vertical .pui-tabs-panel {
      padding: 0 0 0 20px;
    }
    @keyframes pui-panel-in {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
})
export class PuiTabsComponent {
  private cdr = inject(ChangeDetectorRef);

  /* ── Internal state ─────────────────── */
  _tabs: TabItem[]          = [];
  _active                   = '';
  _variant: TabsVariant     = 'line';
  _orientation: TabsOrientation = 'horizontal';
  _size: TabsSize           = 'md';

  /* ── Inputs ─────────────────────────── */
  @Input() set tabs(v: TabItem[] | string) {
    this._tabs = typeof v === 'string' ? (this._parse<TabItem[]>(v) ?? []) : (v || []);
    if (this._tabs.length && !this._tabs.find(t => t.id === this._active)) {
      this._active = this._tabs.find(t => !t.disabled)?.id ?? '';
    }
    this.cdr.markForCheck();
  }

  @Input() set activeTab(v: string) {
    if (v && v !== this._active) {
      this._active = v;
      this.cdr.markForCheck();
    }
  }

  @Input() set variant(v: TabsVariant | string) {
    this._variant = (['line','pill','card'].includes(v as TabsVariant)
      ? v as TabsVariant : 'line');
  }

  @Input() set orientation(v: TabsOrientation | string) {
    this._orientation = v === 'vertical' ? 'vertical' : 'horizontal';
  }

  @Input() set size(v: TabsSize | string) {
    this._size = (['sm','md','lg'].includes(v as TabsSize) ? v as TabsSize : 'md');
  }

  /* ── Output ─────────────────────────── */
  @Output() tabChange = new EventEmitter<TabItem>();

  /* ── Actions ────────────────────────── */
  select(tab: TabItem) {
    if (tab.disabled || tab.id === this._active) return;
    this._active = tab.id;
    this.tabChange.emit(tab);
    this.cdr.markForCheck();
  }

  onKey(e: KeyboardEvent, i: number) {
    const enabled = this._tabs.filter(t => !t.disabled);
    const cur  = enabled.findIndex(t => t.id === this._active);
    const isH  = this._orientation === 'horizontal';
    let   next = -1;

    if ((isH && e.key === 'ArrowRight') || (!isH && e.key === 'ArrowDown'))
      next = (cur + 1) % enabled.length;
    else if ((isH && e.key === 'ArrowLeft') || (!isH && e.key === 'ArrowUp'))
      next = (cur - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End')  next = enabled.length - 1;

    if (next >= 0) {
      e.preventDefault();
      this.select(enabled[next]);
    }
  }

  private _parse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
