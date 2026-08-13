import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy,
  HostListener, ElementRef, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchSuggestion, SearchSize } from '../models/search.model';

@Component({
  selector: 'pui-lib-search',
  standalone: true,
  imports: [NgIf, NgFor],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class PuiSearchComponent implements OnInit, OnDestroy {
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  @Input() placeholder  = 'Search�';
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

  private host = inject(ElementRef);

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

  onBlur(): void { this.focused = false; }

  onFocus(): void {
    this.focused = true;
    this.openDropdown();
  }


  onKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusIdx = Math.min(this.focusIdx + 1, this.totalFocusable - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusIdx = Math.max(this.focusIdx - 1, -1);
        break;
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
  }

  selectRecent(r: string): void {
    this.value = r;
    this.valueChange.emit(r);
    this.input$.next(r);
    this.closeDropdown();
  }

  clear(e: MouseEvent): void {
    e.preventDefault();
    this.value = '';
    this.valueChange.emit('');
    this.searchChange.emit('');
    this.cleared.emit();
    this.openDropdown();
    this.inputEl?.nativeElement.focus();
  }

  clearRecent(e: MouseEvent): void {
    e.preventDefault();
    this.recentItems = [];
  }

  private addToRecent(val: string): void {
    if (!val.trim()) return;
    this.recentItems = [val, ...this.recentItems.filter(r => r !== val)].slice(0, this.maxRecent);
  }

  private openDropdown(): void {
    this.isOpen = (this.value.length > 0 && this.filteredSuggestions.length > 0)
               || (!this.value && this.recentItems.length > 0);
  }

  private closeDropdown(): void {
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.host.nativeElement.contains(e.target)) {
      this.closeDropdown();
    }
  }
}
