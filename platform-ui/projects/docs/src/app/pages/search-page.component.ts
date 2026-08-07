import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PuiSearchComponent, SearchSuggestion } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

type FwTab = 'angular' | 'react' | 'html';

@Component({
  selector: 'docs-search-page',
  standalone: true,
  imports: [NgIf, NgFor, PuiSearchComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <docs-page
      title="Search"
      description="Smart search with real-time suggestions, keyboard navigation, category grouping, recent history, loading states, and debounced input. Works identically in Angular, React, and plain HTML."
      [hasFramework]="true"
      [api]="api">

      <!-- ══ DEMO ═════════════════════════════════════════════ -->
      <ng-container demo>

        <div class="demo-label"><span>Basic Search</span></div>
        <div class="demo-block">
          <pui-search
            placeholder="Search anything…"
            [debounce]="300"
            (searchChange)="lastQuery = $event">
          </pui-search>
          <p class="live-out" *ngIf="lastQuery">Debounced query: <strong>{{ lastQuery }}</strong></p>
        </div>

        <div class="demo-label"><span>With Suggestions & Categories</span></div>
        <div class="demo-block">
          <pui-search
            placeholder="Type to search components…"
            [suggestions]="suggestions"
            [minChars]="1"
            (suggestionSelected)="selected = $event">
          </pui-search>
          <p class="live-out" *ngIf="selected">
            Selected: <strong>{{ selected.label }}</strong>
            <span class="cat-badge">{{ selected.category }}</span>
          </p>
        </div>

        <div class="demo-label"><span>Sizes — sm / md / lg</span></div>
        <div class="demo-block demo-block--col">
          <div class="size-row"><span class="sz">sm</span><pui-search size="sm" placeholder="Small"></pui-search></div>
          <div class="size-row"><span class="sz">md</span><pui-search size="md" placeholder="Medium (default)"></pui-search></div>
          <div class="size-row"><span class="sz">lg</span><pui-search size="lg" placeholder="Large"></pui-search></div>
        </div>

        <div class="demo-label"><span>States</span></div>
        <div class="demo-block demo-block--grid2">
          <div class="state-card">
            <span class="state-tag state-tag--gray">Disabled</span>
            <pui-search placeholder="Not interactive" [disabled]="true"></pui-search>
          </div>
          <div class="state-card">
            <span class="state-tag state-tag--blue">Loading</span>
            <pui-search placeholder="Fetching results…" [loading]="true"></pui-search>
          </div>
        </div>

        <div class="demo-label"><span>Recent Searches + Keyboard Shortcut</span></div>
        <div class="demo-block">
          <pui-search
            placeholder="Click to see history…"
            shortcut="⌘K"
            [recentSearches]="recentSearches"
            [maxRecent]="5">
          </pui-search>
        </div>

      </ng-container>

      <!-- ══ FRAMEWORK USAGE ══════════════════════════════════ -->
      <ng-container framework>

        <h2 class="fw-title">Framework Usage</h2>
        <p class="fw-lead">
          <code>pui-search</code> is a Web Component — drop it in any framework.
          Simple inputs (strings, numbers, booleans) work as HTML attributes.
          Arrays (<code>suggestions</code>, <code>recentSearches</code>) work as a JSON string attribute
          or as a JS property via <code>ref</code>.
        </p>

        <div class="fw-tabs">
          <button class="fw-tab" [class.fw-tab--active]="fw==='angular'" (click)="fw='angular'">
            <svg width="15" height="15" viewBox="0 0 24 24"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.31H4.936L12 3.405z" fill="#c3002f"/></svg>
            Angular
          </button>
          <button class="fw-tab" [class.fw-tab--active]="fw==='react'" (click)="fw='react'">
            <svg width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.05" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/></svg>
            React
          </button>
          <button class="fw-tab" [class.fw-tab--active]="fw==='html'" (click)="fw='html'">
            <svg width="15" height="15" viewBox="0 0 24 24"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/></svg>
            Plain HTML
          </button>
        </div>

        <div *ngIf="fw==='angular'" class="fw-panel">
          <div class="fw-note fw-note--angular">Use Angular template binding — arrays bind directly with <code>[suggestions]</code>.</div>
          <app-code lang="html"       id="s-ng-tpl" [text]="angularTpl" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <app-code lang="typescript" id="s-ng-ts"  [text]="angularTs"  [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <div *ngIf="fw==='react'" class="fw-panel">
          <div class="fw-note fw-note--react">Pass arrays as a JSON string attribute or set them via <code>ref</code> in <code>useEffect</code>.</div>
          <app-code lang="tsx" id="s-react" [text]="reactCode" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <div *ngIf="fw==='html'" class="fw-panel">
          <div class="fw-note fw-note--html">Load the bundle once. Strings/booleans as attributes, arrays as JSON string or JS property.</div>
          <app-code lang="html" id="s-html" [text]="htmlCode" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <h3 class="fw-ref-title">Input Quick Reference</h3>
        <div class="xfw-wrap">
          <table class="xfw-table">
            <thead><tr><th>Input</th><th>Angular</th><th>React / HTML attribute</th><th>JS property</th></tr></thead>
            <tbody>
              <tr *ngFor="let r of xfwRows; let odd=odd" [class.xfw-odd]="odd">
                <td><code class="tag-name">{{ r.name }}</code></td>
                <td><code class="tag-ng">{{ r.angular }}</code></td>
                <td><code class="tag-html">{{ r.attr }}</code></td>
                <td><code class="tag-js">{{ r.js }}</code></td>
              </tr>
            </tbody>
          </table>
        </div>

      </ng-container>

    </docs-page>
  `,
  styles: [`
    .demo-label { width:100%; padding-top:14px; margin-top:2px; border-top:1px solid #e5e7eb; }
    .demo-label span { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#9ca3af; }
    .demo-block { width:100%; background:#fff; border:1px solid #e5e7eb; border-radius:10px; padding:20px; display:flex; flex-direction:column; gap:12px; }
    .demo-block--col { gap:10px; }
    .demo-block--grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    .live-out { font-size:13px; color:#6b7280; margin:0; display:flex; align-items:center; gap:8px; }
    .live-out strong { color:#111827; }
    .cat-badge { font-size:11px; font-weight:600; background:#eff6ff; color:#2563eb; padding:1px 8px; border-radius:20px; }
    .size-row { display:flex; align-items:center; gap:14px; }
    .sz { font-size:11px; font-weight:700; color:#9ca3af; text-transform:uppercase; width:22px; flex-shrink:0; }
    .size-row pui-search { flex:1; }
    .state-card { background:#f9fafb; border:1px solid #f0f0f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:10px; }
    .state-tag { font-size:11px; font-weight:700; padding:2px 10px; border-radius:20px; text-transform:uppercase; letter-spacing:.05em; align-self:flex-start; }
    .state-tag--gray { background:#f3f4f6; color:#6b7280; }
    .state-tag--blue { background:#eff6ff; color:#2563eb; }

    .fw-title { font-size:22px; font-weight:700; color:#111827; margin:0 0 8px; }
    .fw-lead { font-size:14px; color:#6b7280; line-height:1.7; margin:0 0 22px; }
    .fw-lead code { background:#f3f4f6; padding:1px 5px; border-radius:4px; font-size:13px; color:#1f2937; }
    .fw-tabs { display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
    .fw-tab { display:flex; align-items:center; gap:7px; padding:8px 18px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; font-size:13px; font-weight:500; color:#374151; cursor:pointer; font-family:inherit; transition:all .14s; }
    .fw-tab:hover { border-color:#12C6A8; color:#0d9e87; }
    .fw-tab--active { border-color:#12C6A8; background:#f0fdfb; color:#0d9e87; font-weight:600; }
    .fw-panel { display:flex; flex-direction:column; gap:14px; }
    .fw-note { padding:12px 16px; border-radius:8px; font-size:13px; line-height:1.65; border-left:4px solid #e5e7eb; background:#f9fafb; color:#374151; }
    .fw-note code { font-size:12px; background:rgba(0,0,0,.06); padding:1px 4px; border-radius:3px; }
    .fw-note--angular { border-color:#c3002f; background:#fff5f5; color:#7f1d1d; }
    .fw-note--react   { border-color:#38bdf8; background:#f0f9ff; color:#0c4a6e; }
    .fw-note--html    { border-color:#e34c26; background:#fff8f5; color:#7c2d12; }
    .fw-ref-title { font-size:16px; font-weight:700; color:#111827; margin:32px 0 12px; }
    .xfw-wrap { overflow-x:auto; border-radius:10px; border:1px solid #e5e7eb; }
    .xfw-table { width:100%; border-collapse:collapse; font-size:13px; }
    .xfw-table th { background:#f9fafb; padding:10px 14px; text-align:left; font-size:11px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:.06em; border-bottom:1px solid #e5e7eb; }
    .xfw-table td { padding:9px 14px; color:#374151; border-bottom:1px solid #f3f4f6; }
    .xfw-table tr:last-child td { border-bottom:none; }
    .xfw-odd td { background:#f9fafb; }
    .tag-name { color:#7c3aed; background:#f5f3ff; padding:1px 6px; border-radius:4px; font-size:12px; }
    .tag-ng   { color:#991b1b; background:#fff5f5; padding:1px 6px; border-radius:4px; font-size:12px; }
    .tag-html { color:#92400e; background:#fffbeb; padding:1px 6px; border-radius:4px; font-size:12px; }
    .tag-js   { color:#065f46; background:#f0fdf9; padding:1px 6px; border-radius:4px; font-size:12px; }
  `],
})
export class SearchPageComponent {
  fw: FwTab = 'angular';
  copied    = '';
  lastQuery = '';
  selected: SearchSuggestion | null = null;

  doCopy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => { this.copied = id; setTimeout(() => this.copied = '', 2000); });
  }

  recentSearches = ['Button component', 'Input validation', 'Toast service', 'Modal dialog'];

  suggestions: SearchSuggestion[] = [
    { label: 'Button',           value: 'button',   category: 'Forms'      },
    { label: 'Input',            value: 'input',    category: 'Forms'      },
    { label: 'Select',           value: 'select',   category: 'Forms'      },
    { label: 'Checkbox',         value: 'checkbox', category: 'Forms'      },
    { label: 'Modal',            value: 'modal',    category: 'Components' },
    { label: 'Toast',            value: 'toast',    category: 'Utilities'  },
    { label: 'Advanced Filters', value: 'filters',  category: 'Utilities'  },
    { label: 'Badge',            value: 'badge',    category: 'Components' },
    { label: 'Spinner',          value: 'spinner',  category: 'Components' },
  ];

  angularTpl = `<pui-search
  placeholder="Search components…"
  size="md"
  shortcut="⌘K"
  [suggestions]="suggestions"
  [recentSearches]="recentSearches"
  [debounce]="300"
  [minChars]="1"
  [clearable]="true"
  (searchChange)="onSearch($event)"
  (suggestionSelected)="onSelect($event)"
  (submitted)="onSubmit($event)">
</pui-search>`;

  angularTs = `import { PuiSearchComponent, SearchSuggestion } from '@bhairab-patra/platform-ui';

@Component({ standalone: true, imports: [PuiSearchComponent] })
export class MyComponent {
  suggestions: SearchSuggestion[] = [
    { label: 'Button',  value: 'button',  category: 'Forms'      },
    { label: 'Modal',   value: 'modal',   category: 'Components' },
    { label: 'Toast',   value: 'toast',   category: 'Utilities'  },
  ];
  recentSearches = ['Button', 'Modal'];

  onSearch(q: string) { /* call API */ }
  onSelect(s: SearchSuggestion) { this.router.navigate([s.value]); }
  onSubmit(q: string) { console.log('submitted:', q); }
}`;

  reactCode = `import { useRef, useEffect } from 'react';
// main.tsx: import '@bhairab-patra/platform-ui/elements';

export function AppSearch() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Arrays → JS property (or use JSON string attribute below)
    el.suggestions = [
      { label: 'Button', value: 'button', category: 'Forms' },
      { label: 'Modal',  value: 'modal',  category: 'Components' },
    ];
    el.recentSearches = ['Button', 'Modal'];

    const onSearch = (e) => console.log('search:', e.detail);
    const onSelect = (e) => console.log('selected:', e.detail);
    el.addEventListener('searchChange',       onSearch);
    el.addEventListener('suggestionSelected', onSelect);
    return () => {
      el.removeEventListener('searchChange',       onSearch);
      el.removeEventListener('suggestionSelected', onSelect);
    };
  }, []);

  return (
    <pui-search
      ref={ref}
      placeholder="Search…"
      shortcut="⌘K"
      debounce="300"
      min-chars="1"
      clearable="true"
    />
  );
}`;

  htmlCode = `<script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>

<pui-search
  id="srch"
  placeholder="Search…"
  shortcut="⌘K"
  debounce="300"
  clearable="true">
</pui-search>

<script>
  customElements.whenDefined('pui-search').then(() => {
    const el = document.getElementById('srch');

    // Arrays as JS properties
    el.suggestions = [
      { label: 'Button', value: 'button', category: 'Forms' },
      { label: 'Modal',  value: 'modal',  category: 'Components' },
    ];
    el.recentSearches = ['Button', 'Modal'];

    el.addEventListener('searchChange',       (e) => console.log('search:', e.detail));
    el.addEventListener('suggestionSelected', (e) => console.log('selected:', e.detail));
  });
</script>`;

  xfwRows = [
    { name: 'placeholder',        angular: 'placeholder="…"',          attr: 'placeholder="…"',       js: 'el.placeholder = "…"' },
    { name: 'size',               angular: 'size="sm"',                 attr: 'size="sm"',             js: 'el.size = "sm"' },
    { name: 'debounce',           angular: '[debounce]="300"',          attr: 'debounce="300"',        js: 'el.debounce = 300' },
    { name: 'suggestions',        angular: '[suggestions]="items"',     attr: '— use JS property',     js: 'el.suggestions = [...]' },
    { name: 'recentSearches',     angular: '[recentSearches]="hist"',   attr: '— use JS property',     js: 'el.recentSearches = [...]' },
    { name: 'disabled',           angular: '[disabled]="true"',         attr: 'disabled="true"',       js: 'el.disabled = true' },
    { name: 'loading',            angular: '[loading]="true"',          attr: 'loading="true"',        js: 'el.loading = true' },
    { name: 'shortcut',           angular: 'shortcut="⌘K"',            attr: 'shortcut="⌘K"',        js: 'el.shortcut = "⌘K"' },
    { name: 'searchChange',       angular: '(searchChange)="fn($e)"',   attr: '— addEventListener',    js: 'el.addEventListener("searchChange", fn)' },
    { name: 'suggestionSelected', angular: '(suggestionSelected)="fn"', attr: '— addEventListener',    js: 'el.addEventListener("suggestionSelected", fn)' },
  ];

  api: ApiRow[] = [
    { input: 'placeholder',         type: 'string',                 default: "'Search…'",  description: 'Placeholder text in the input field.' },
    { input: 'size',                type: "'sm'|'md'|'lg'",         default: "'md'",       description: 'Input size variant.' },
    { input: 'value',               type: 'string',                 default: "''",         description: 'Bound search value.' },
    { input: 'suggestions',         type: 'SearchSuggestion[]|string', default: '[]',      description: 'Suggestion items; accepts JSON string from HTML.' },
    { input: 'debounce',            type: 'number',                 default: '300',        description: 'Debounce delay (ms) for searchChange.' },
    { input: 'minChars',            type: 'number',                 default: '1',          description: 'Minimum chars before suggestions appear.' },
    { input: 'clearable',           type: 'boolean|string',         default: 'true',       description: 'Shows × clear button. Accepts "true"/"false".' },
    { input: 'disabled',            type: 'boolean|string',         default: 'false',      description: 'Disables the input. Accepts "true".' },
    { input: 'loading',             type: 'boolean|string',         default: 'false',      description: 'Shows animated spinner. Accepts "true".' },
    { input: 'shortcut',            type: 'string',                 default: "''",         description: 'Keyboard shortcut badge (e.g. ⌘K).' },
    { input: 'emptyText',           type: 'string',                 default: "'No results'", description: 'Empty state message.' },
    { input: 'recentSearches',      type: 'string[]|string',        default: '[]',         description: 'Recent searches shown on focus. Accepts JSON string.' },
    { input: 'maxRecent',           type: 'number',                 default: '5',          description: 'Maximum recent searches displayed.' },
    { input: 'searchChange',        type: 'EventEmitter<string>',   default: '—',          description: 'Emits debounced query on input.' },
    { input: 'valueChange',         type: 'EventEmitter<string>',   default: '—',          description: 'Emits every keystroke.' },
    { input: 'suggestionSelected',  type: 'EventEmitter<SearchSuggestion>', default: '—',  description: 'Emits the selected suggestion.' },
    { input: 'cleared',             type: 'EventEmitter<void>',     default: '—',          description: 'Emits when × is clicked.' },
    { input: 'submitted',           type: 'EventEmitter<string>',   default: '—',          description: 'Emits on Enter key press.' },
  ];
}
