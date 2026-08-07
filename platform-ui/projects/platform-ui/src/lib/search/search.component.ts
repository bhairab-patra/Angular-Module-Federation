import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy,
  HostListener, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchSuggestion, SearchSize } from '../models/search.model';

@Component({
  selector: 'pui-search',
  standalone: true,
  imports: [NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pui-search" [class.pui-search--open]="isOpen"
         [class.pui-search--sm]="size==='sm'" [class.pui-search--lg]="size==='lg'"
         [class.pui-search--focused]="focused" [class.pui-search--disabled]="disabled">

      <!-- Input row -->
      <div class="pui-search__field">
        <!-- Search icon / spinner -->
        <span class="pui-search__icon">
          <svg *ngIf="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span *ngIf="loading" class="pui-search__spinner"></span>
        </span>

        <input #inputEl
               class="pui-search__input"
               type="search"
               [placeholder]="placeholder"
               [disabled]="disabled"
               [value]="value"
               autocomplete="off"
               (input)="onInput($any($event.target).value)"
               (focus)="onFocus()"
               (blur)="onBlur()"
               (keydown)="onKeydown($event)"/>

        <!-- Clear -->
        <button *ngIf="value && clearable && !disabled"
                class="pui-search__clear" type="button" tabindex="-1"
                (mousedown)="clear($event)">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Kbd shortcut hint -->
        <span *ngIf="!value && shortcut && !focused" class="pui-search__kbd">{{ shortcut }}</span>
      </div>

      <!-- Dropdown -->
      <div class="pui-search__dropdown" *ngIf="isOpen">

        <!-- Recent searches -->
        <div *ngIf="recentItems.length && !value" class="pui-search__group">
          <div class="pui-search__group-label">
            Recent
            <button class="pui-search__clear-recent" (mousedown)="clearRecent($event)">Clear</button>
          </div>
          <button *ngFor="let r of recentItems; let i = index"
                  class="pui-search__item"
                  [class.pui-search__item--active]="focusIdx === i"
                  type="button"
                  (mousedown)="selectRecent(r)">
            <svg class="pui-search__item-icon" width="13" height="13" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
            </svg>
            <span>{{ r }}</span>
          </button>
        </div>

        <!-- Suggestions (grouped by category) -->
        <ng-container *ngIf="value && filteredSuggestions.length">
          <ng-container *ngFor="let grp of groupedSuggestions">
            <div *ngIf="grp.category" class="pui-search__group-label">{{ grp.category }}</div>
            <button *ngFor="let s of grp.items; let i = index"
                    class="pui-search__item"
                    [class.pui-search__item--active]="focusIdx === getSuggestionGlobalIdx(grp, i)"
                    type="button"
                    (mousedown)="selectSuggestion(s)">
              <span *ngIf="s.icon" class="pui-search__item-icon" [innerHTML]="s.icon"></span>
              <svg *ngIf="!s.icon" class="pui-search__item-icon" width="13" height="13" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span class="pui-search__item-label" [innerHTML]="highlight(s.label)"></span>
              <span *ngIf="s.meta" class="pui-search__item-meta">{{ s.meta }}</span>
            </button>
          </ng-container>
        </ng-container>

        <!-- No results -->
        <div *ngIf="value && !filteredSuggestions.length && !loading" class="pui-search__empty">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span>{{ emptyText }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; position: relative; }

    .pui-search {
      position: relative; font-family: 'Poppins', system-ui, sans-serif;
    }

    /* Field */
    .pui-search__field {
      display: flex; align-items: center;
      border: 1.5px solid #d1d5db; border-radius: 10px;
      background: #fff; height: 44px; padding: 0 12px; gap: 8px;
      transition: border-color .15s, box-shadow .15s;
    }
    .pui-search--sm .pui-search__field { height: 34px; border-radius: 8px; padding: 0 10px; }
    .pui-search--lg .pui-search__field { height: 52px; border-radius: 12px; padding: 0 16px; }

    .pui-search--focused .pui-search__field {
      border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.14);
    }
    .pui-search--open .pui-search__field {
      border-color: #12C6A8; border-radius: 10px 10px 0 0; box-shadow: none;
    }
    .pui-search--sm.pui-search--open .pui-search__field { border-radius: 8px 8px 0 0; }
    .pui-search--lg.pui-search--open .pui-search__field { border-radius: 12px 12px 0 0; }
    .pui-search--disabled .pui-search__field { background: #f9fafb; cursor: not-allowed; }

    .pui-search__icon { display: flex; align-items: center; color: #9ca3af; flex-shrink: 0; }

    /* Spinner */
    .pui-search__spinner {
      display: block; width: 14px; height: 14px;
      border: 2px solid #e5e7eb; border-top-color: #12C6A8;
      border-radius: 50%; animation: pui-spin .7s linear infinite;
    }
    @keyframes pui-spin { to { transform: rotate(360deg); } }

    /* Input */
    .pui-search__input {
      flex: 1; border: none; outline: none; background: transparent;
      font-size: 14px; color: #111827; font-family: inherit; min-width: 0;
    }
    .pui-search--sm .pui-search__input { font-size: 13px; }
    .pui-search--lg .pui-search__input { font-size: 15px; }
    .pui-search__input::placeholder { color: #9ca3af; }
    .pui-search__input:disabled { cursor: not-allowed; }
    /* Remove native search clear button */
    .pui-search__input::-webkit-search-cancel-button { display: none; }

    /* Clear */
    .pui-search__clear {
      background: none; border: none; cursor: pointer; padding: 3px;
      color: #9ca3af; display: flex; align-items: center;
      border-radius: 4px; flex-shrink: 0;
      transition: color .12s, background .12s;
    }
    .pui-search__clear:hover { color: #374151; background: #f3f4f6; }

    /* Kbd shortcut */
    .pui-search__kbd {
      font-size: 11px; color: #9ca3af; background: #f3f4f6;
      border: 1px solid #e5e7eb; border-radius: 5px;
      padding: 1px 6px; flex-shrink: 0; letter-spacing: .02em;
    }

    /* Dropdown */
    .pui-search__dropdown {
      position: absolute; top: 100%; left: 0; right: 0; z-index: 999;
      background: #fff; border: 1.5px solid #12C6A8; border-top: none;
      border-radius: 0 0 10px 10px;
      box-shadow: 0 12px 32px rgba(0,0,0,.12);
      max-height: 360px; overflow-y: auto;
      padding: 6px 0;
    }

    .pui-search__group-label {
      display: flex; align-items: center; justify-content: space-between;
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .08em; color: #9ca3af;
      padding: 8px 14px 4px; user-select: none;
    }
    .pui-search__clear-recent {
      font-size: 11px; font-weight: 500; color: #12C6A8;
      background: none; border: none; cursor: pointer; padding: 0; font-family: inherit;
    }
    .pui-search__clear-recent:hover { text-decoration: underline; }

    .pui-search__item {
      display: flex; align-items: center; gap: 10px; width: 100%;
      padding: 8px 14px; background: none; border: none; text-align: left;
      cursor: pointer; font-family: inherit; font-size: 14px; color: #374151;
      transition: background .1s;
    }
    .pui-search--sm .pui-search__item { font-size: 13px; padding: 7px 12px; }
    .pui-search__item:hover, .pui-search__item--active { background: #f0fdf9; color: #0d6e5f; }

    .pui-search__item-icon { flex-shrink: 0; color: #9ca3af; display: flex; align-items: center; }
    .pui-search__item-label { flex: 1; }
    .pui-search__item-label mark {
      background: rgba(18,198,168,.18); color: #0d6e5f;
      border-radius: 2px; padding: 0 2px; font-style: normal; font-weight: 600;
    }
    .pui-search__item-meta { font-size: 11px; color: #9ca3af; flex-shrink: 0; }

    .pui-search__empty {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      padding: 24px 16px; color: #9ca3af; font-size: 13px;
    }
  `],
})
export class PuiSearchComponent implements OnInit, OnDestroy {
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  @Input() placeholder  = 'Search…';
  @Input() size: SearchSize = 'md';
  @Input() value        = '';
  @Input() debounce     = 300;
  @Input() minChars     = 1;
  @Input() shortcut     = '';
  @Input() emptyText    = 'No results found';
  @Input() maxRecent    = 5;

  @Input() set suggestions(v: SearchSuggestion[] | string) {
    this._suggestions = typeof v === 'string' ? (this._parseJson<SearchSuggestion[]>(v) ?? []) : (v || []);
  }
  get suggestions(): SearchSuggestion[] { return this._suggestions; }
  private _suggestions: SearchSuggestion[] = [];

  @Input() set recentSearches(v: string[] | string) {
    this._recentSearches = typeof v === 'string' ? (this._parseJson<string[]>(v) ?? []) : (v || []);
  }
  get recentSearches(): string[] { return this._recentSearches; }
  private _recentSearches: string[] = [];

  @Input() set clearable(v: boolean | string) {
    this._clearable = v === true || v === 'true' || (v as any) === '';
  }
  get clearable() { return this._clearable; }
  private _clearable = true;

  @Input() set disabled(v: boolean | string) {
    this._disabled = v === true || v === 'true' || (v as any) === '';
  }
  get disabled() { return this._disabled; }
  private _disabled = false;

  @Input() set loading(v: boolean | string) {
    this._loading = v === true || v === 'true' || (v as any) === '';
    this.cdr.markForCheck();
  }
  get loading() { return this._loading; }
  private _loading = false;

  private _parseJson<T>(s: string): T | null {
    if (!s) return null;
    try { return JSON.parse(s) as T; } catch { return null; }
  }

  @Output() searchChange        = new EventEmitter<string>();
  @Output() valueChange         = new EventEmitter<string>();
  @Output() suggestionSelected  = new EventEmitter<SearchSuggestion>();
  @Output() cleared             = new EventEmitter<void>();
  @Output() submitted           = new EventEmitter<string>();

  isOpen    = false;
  focused   = false;
  focusIdx  = -1;
  recentItems: string[] = [];

  private input$ = new Subject<string>();
  private sub!: Subscription;

  constructor(private cdr: ChangeDetectorRef, private host: ElementRef) {}

  ngOnInit(): void {
    this.recentItems = [...this.recentSearches].slice(0, this.maxRecent);
    this.sub = this.input$.pipe(
      debounceTime(this.debounce),
      distinctUntilChanged(),
    ).subscribe(val => {
      if (val.length >= this.minChars || val === '') {
        this.searchChange.emit(val);
      }
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  get filteredSuggestions(): SearchSuggestion[] {
    if (!this.value) return [];
    const q = this.value.toLowerCase();
    return this.suggestions.filter(s => s.label.toLowerCase().includes(q));
  }

  get groupedSuggestions(): { category: string; items: SearchSuggestion[] }[] {
    const map = new Map<string, SearchSuggestion[]>();
    for (const s of this.filteredSuggestions) {
      const cat = s.category ?? '';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(s);
    }
    return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
  }

  getSuggestionGlobalIdx(grp: { category: string; items: SearchSuggestion[] }, localIdx: number): number {
    let offset = 0;
    for (const g of this.groupedSuggestions) {
      if (g === grp) return offset + localIdx;
      offset += g.items.length;
    }
    return -1;
  }

  get totalFocusable(): number {
    return this.value ? this.filteredSuggestions.length : this.recentItems.length;
  }

  highlight(label: string): string {
    if (!this.value) return label;
    const esc = this.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return label.replace(new RegExp(`(${esc})`, 'gi'), '<mark>$1</mark>');
  }

  onInput(val: string): void {
    this.value = val;
    this.focusIdx = -1;
    this.valueChange.emit(val);
    this.input$.next(val);
    this.openDropdown();
  }

  onFocus(): void {
    this.focused = true;
    this.openDropdown();
    this.cdr.markForCheck();
  }

  onBlur(): void { this.focused = false; this.cdr.markForCheck(); }

  onKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusIdx = Math.min(this.focusIdx + 1, this.totalFocusable - 1);
        this.cdr.markForCheck(); break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusIdx = Math.max(this.focusIdx - 1, -1);
        this.cdr.markForCheck(); break;
      case 'Enter':
        e.preventDefault();
        if (this.focusIdx >= 0 && this.value) {
          const s = this.filteredSuggestions[this.focusIdx];
          if (s) this.selectSuggestion(s);
        } else if (this.focusIdx >= 0 && !this.value) {
          const r = this.recentItems[this.focusIdx];
          if (r) this.selectRecent(r);
        } else {
          this.submitted.emit(this.value);
          this.addToRecent(this.value);
          this.closeDropdown();
        }
        break;
      case 'Escape':
        this.closeDropdown();
        this.inputEl?.nativeElement.blur();
        break;
    }
  }

  selectSuggestion(s: SearchSuggestion): void {
    this.value = s.label;
    this.addToRecent(s.label);
    this.valueChange.emit(s.label);
    this.searchChange.emit(s.label);
    this.suggestionSelected.emit(s);
    this.closeDropdown();
    this.cdr.markForCheck();
  }

  selectRecent(r: string): void {
    this.value = r;
    this.valueChange.emit(r);
    this.input$.next(r);
    this.closeDropdown();
    this.cdr.markForCheck();
  }

  clear(e: MouseEvent): void {
    e.preventDefault();
    this.value = '';
    this.valueChange.emit('');
    this.searchChange.emit('');
    this.cleared.emit();
    this.openDropdown();
    this.inputEl?.nativeElement.focus();
    this.cdr.markForCheck();
  }

  clearRecent(e: MouseEvent): void {
    e.preventDefault();
    this.recentItems = [];
    this.cdr.markForCheck();
  }

  private addToRecent(val: string): void {
    if (!val.trim()) return;
    this.recentItems = [val, ...this.recentItems.filter(r => r !== val)].slice(0, this.maxRecent);
  }

  private openDropdown(): void {
    this.isOpen = (this.value.length > 0 && this.filteredSuggestions.length > 0)
               || (!this.value && this.recentItems.length > 0);
    this.cdr.markForCheck();
  }

  private closeDropdown(): void {
    this.isOpen = false; this.focusIdx = -1; this.cdr.markForCheck();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.host.nativeElement.contains(e.target)) {
      this.closeDropdown();
    }
  }
}
