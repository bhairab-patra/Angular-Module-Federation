import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  inject,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

export interface TabItem {
  id: string;
  label: string;
  iconName?: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
}

export type TabsVariant = 'line' | 'pill' | 'card';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'sm' | 'md' | 'lg';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-tabs',
  standalone: true,
  imports: [NgFor, NgIf, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class PuiTabsComponent {
  private sanitizer = inject(DomSanitizer);
  private el = inject(ElementRef<HTMLElement>);

  safeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  _tabs: TabItem[] = [];
  _active = '';
  _variant: TabsVariant = 'line';
  _orientation: TabsOrientation = 'horizontal';
  _size: TabsSize = 'md';

  @Input() set tabs(v: TabItem[] | string) {
    this._tabs = typeof v === 'string' ? (this._parse<TabItem[]>(v) ?? []) : v || [];
    if (this._tabs.length && !this._tabs.find((t) => t.id === this._active)) {
      this._active = this._tabs.find((t) => !t.disabled)?.id ?? '';
    }
  }

  @Input() set activeTab(v: string) {
    if (v && v !== this._active) {
      this._active = v;
    }
  }

  @Input() set variant(v: TabsVariant | string) {
    this._variant = ['line', 'pill', 'card'].includes(v as TabsVariant)
      ? (v as TabsVariant)
      : 'line';
  }

  @Input() set orientation(v: TabsOrientation | string) {
    this._orientation = v === 'vertical' ? 'vertical' : 'horizontal';
  }

  @Input() set size(v: TabsSize | string) {
    this._size = ['sm', 'md', 'lg'].includes(v as TabsSize) ? (v as TabsSize) : 'md';
  }

  @Input() panel = true;

  @Output() tabChange = new EventEmitter<TabItem>();

  select(tab: TabItem) {
    if (tab.disabled || tab.id === this._active) return;
    this._active = tab.id;
    this.tabChange.emit(tab);
  }

  onKey(e: KeyboardEvent, _i: number) {
    const enabled = this._tabs.filter((t) => !t.disabled);
    const cur = enabled.findIndex((t) => t.id === this._active);
    const isH = this._orientation === 'horizontal';
    let next = -1;

    if ((isH && e.key === 'ArrowRight') || (!isH && e.key === 'ArrowDown'))
      next = (cur + 1) % enabled.length;
    else if ((isH && e.key === 'ArrowLeft') || (!isH && e.key === 'ArrowUp'))
      next = (cur - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = enabled.length - 1;

    if (next >= 0) {
      e.preventDefault();
      const target = enabled[next];
      this.select(target);
      const idx = this._tabs.findIndex((t) => t.id === target.id);
      const root = this.el.nativeElement.shadowRoot;
      const buttons = root ? (Array.from(root.querySelectorAll('.pui-tab-btn')) as HTMLElement[]) : [];
      buttons[idx]?.focus();
    }
  }

  private _parse<T>(s: string): T | null {
    try {
      return JSON.parse(s) as T;
    } catch {
      return null;
    }
  }
}
