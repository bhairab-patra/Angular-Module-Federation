import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PuiSearchComponent, SearchSuggestion } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

type FwTab = 'angular' | 'react' | 'html';

@Component({
  selector: 'docs-search-page',
  standalone: true,
  imports: [NgIf, NgFor, PuiSearchComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
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
