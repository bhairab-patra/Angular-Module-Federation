import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { PuiSearchComponent, SearchSuggestion } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-search-page',
  standalone: true,
  imports: [NgIf, PuiSearchComponent, DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <docs-page
      title="Search"
      description="A powerful search component with real-time suggestions, keyboard navigation, category grouping, recent searches, loading states, and debounced input. Built for full customization and accessible keyboard-first use."
      [code]="importCode"
      [api]="api">

      <ng-container demo>

        <!-- ── Basic ─────────────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Basic Search</h3>
            <p class="ds__desc">
              Simple search with placeholder and debounce.
              Listen to <code class="ic">(searchChange)</code> for debounced input.
            </p>
          </div>
          <div class="ds__preview">
            <div class="preview-frame">
              <pui-search
                placeholder="Search anything…"
                [debounce]="300"
                (searchChange)="lastQuery = $event">
              </pui-search>
              <p class="live-label" *ngIf="lastQuery">
                Last query: <strong>{{ lastQuery }}</strong>
              </p>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeBasic, 'basic')">{{ copied['basic'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeBasic }}</code></pre>
          </div>
        </div>

        <!-- ── Suggestions ───────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Suggestions & Categories</h3>
            <p class="ds__desc">
              Pass a <code class="ic">suggestions</code> array. Items support
              <code class="ic">category</code>, <code class="ic">icon</code>, and
              <code class="ic">meta</code> fields. Matching text is highlighted automatically.
              Keyboard navigate with <kbd>↑</kbd><kbd>↓</kbd> and select with <kbd>Enter</kbd>.
            </p>
          </div>
          <div class="ds__preview">
            <div class="preview-frame">
              <pui-search
                placeholder="Type to search components…"
                [suggestions]="suggestions"
                [minChars]="1"
                (suggestionSelected)="selectedSuggestion = $event">
              </pui-search>
              <p class="live-label" *ngIf="selectedSuggestion">
                Selected: <strong>{{ selectedSuggestion.label }}</strong>
                <span class="live-badge">{{ selectedSuggestion.category }}</span>
              </p>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeSuggestions, 'suggestions')">{{ copied['suggestions'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeSuggestions }}</code></pre>
          </div>
        </div>

        <!-- ── Sizes ─────────────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Sizes</h3>
            <p class="ds__desc">Three sizes to match your layout density.</p>
          </div>
          <div class="ds__preview">
            <div class="preview-frame preview-frame--col">
              <div class="size-row">
                <span class="size-label">sm</span>
                <pui-search size="sm" placeholder="Small"></pui-search>
              </div>
              <div class="size-row">
                <span class="size-label">md</span>
                <pui-search size="md" placeholder="Medium (default)"></pui-search>
              </div>
              <div class="size-row">
                <span class="size-label">lg</span>
                <pui-search size="lg" placeholder="Large"></pui-search>
              </div>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeSizes, 'sizes')">{{ copied['sizes'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeSizes }}</code></pre>
          </div>
        </div>

        <!-- ── States ────────────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">States</h3>
            <p class="ds__desc">Disabled prevents interaction. Loading shows an animated spinner while async results are fetched.</p>
          </div>
          <div class="ds__preview">
            <div class="preview-frame preview-frame--grid2">
              <div class="state-card">
                <span class="state-chip state-chip--gray">Disabled</span>
                <pui-search placeholder="Not interactive" [disabled]="true"></pui-search>
              </div>
              <div class="state-card">
                <span class="state-chip state-chip--blue">Loading</span>
                <pui-search placeholder="Fetching results…" [loading]="true"></pui-search>
              </div>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeStates, 'states')">{{ copied['states'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeStates }}</code></pre>
          </div>
        </div>

        <!-- ── Recent + Shortcut ─────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Recent Searches & Keyboard Shortcut</h3>
            <p class="ds__desc">
              Pass <code class="ic">recentSearches</code> to show search history on focus when the input is empty.
              Use <code class="ic">shortcut</code> to display a keyboard hint badge — clicking focuses the input.
            </p>
          </div>
          <div class="ds__preview">
            <div class="preview-frame">
              <pui-search
                placeholder="Search… (click to see history)"
                shortcut="⌘K"
                [recentSearches]="recentSearches"
                [maxRecent]="5"
                [clearable]="true">
              </pui-search>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeRecent, 'recent')">{{ copied['recent'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeRecent }}</code></pre>
          </div>
        </div>

      </ng-container>
    </docs-page>
  `,
  styles: [`
    /* ── Demo section block ─────────────────────────────── */
    .ds {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 32px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .ds:last-child { border-bottom: none; padding-bottom: 0; }
    .ds:first-child { padding-top: 0; }

    /* ── Section header ─────────────────────────────────── */
    .ds__head { display: flex; flex-direction: column; gap: 6px; }
    .ds__title {
      font-size: 16px; font-weight: 700;
      color: #111827; margin: 0;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .ds__desc {
      font-size: 13.5px; color: #6b7280; margin: 0;
      line-height: 1.7;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* ── Live preview frame ─────────────────────────────── */
    .ds__preview { width: 100%; }

    .preview-frame {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .preview-frame--col { gap: 12px; }
    .preview-frame--grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 20px;
    }

    /* ── Inline code ────────────────────────────────────── */
    .ic {
      background: #f3f4f6;
      color: #1f2937;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 12.5px;
      border: 1px solid #e5e7eb;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }

    kbd {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 4px;
      border: 1px solid #d1d5db;
      background: #f9fafb;
      font-size: 11px;
      color: #374151;
      font-family: inherit;
      margin: 0 1px;
    }

    /* ── Live result label ──────────────────────────────── */
    .live-label {
      font-size: 13px;
      color: #6b7280;
      margin: 4px 0 0;
      font-family: 'Poppins', system-ui, sans-serif;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .live-label strong { color: #111827; }
    .live-badge {
      font-size: 11px;
      font-weight: 600;
      background: #eff6ff;
      color: #2563eb;
      padding: 1px 8px;
      border-radius: 20px;
    }

    /* ── Size rows ──────────────────────────────────────── */
    .size-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .size-label {
      font-size: 11px;
      font-weight: 700;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: .06em;
      width: 24px;
      flex-shrink: 0;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .size-row pui-search { flex: 1; }

    /* ── State cards ────────────────────────────────────── */
    .state-card {
      background: #f9fafb;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .state-chip {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: .05em;
      align-self: flex-start;
    }
    .state-chip--gray { background: #f3f4f6; color: #6b7280; }
    .state-chip--blue { background: #eff6ff; color: #2563eb; }

    /* ── Code block (matching doc-page standard) ────────── */
    .code-wrap   { border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; }
    .code-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 20px;
      background: #1e293b; border-bottom: 1px solid #334155;
    }
    .code-lang {
      font-size: 11px; color: #64748b;
      font-weight: 700; text-transform: uppercase; letter-spacing: .07em;
    }
    .copy-btn {
      padding: 3px 12px; border-radius: 5px;
      border: 1px solid #334155; background: #0f172a;
      color: #94a3b8; font-size: 12px; cursor: pointer;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .copy-btn:hover { color: #e2e8f0; border-color: #475569; }
    pre { border-radius: 0; border: none; margin: 0; }
  `],
})
export class SearchPageComponent {
  lastQuery = '';
  selectedSuggestion: SearchSuggestion | null = null;
  copied: Record<string, boolean> = {};

  recentSearches = ['Button component', 'Input validation', 'Toast service', 'Modal dialog'];

  suggestions: SearchSuggestion[] = [
    { label: 'Button',           value: 'button',   category: 'Forms'      },
    { label: 'Input',            value: 'input',    category: 'Forms'      },
    { label: 'Select',           value: 'select',   category: 'Forms'      },
    { label: 'Checkbox',         value: 'checkbox', category: 'Forms'      },
    { label: 'Radio',            value: 'radio',    category: 'Forms'      },
    { label: 'Switch',           value: 'switch',   category: 'Forms'      },
    { label: 'Textarea',         value: 'textarea', category: 'Forms'      },
    { label: 'Modal',            value: 'modal',    category: 'Components' },
    { label: 'Toast',            value: 'toast',    category: 'Utilities'  },
    { label: 'Advanced Filters', value: 'filters',  category: 'Utilities'  },
    { label: 'Badge',            value: 'badge',    category: 'Components' },
    { label: 'Spinner',          value: 'spinner',  category: 'Components' },
    { label: 'Tooltip',          value: 'tooltip',  category: 'Components' },
  ];

  importCode = `import { PuiSearchComponent } from '@solifi/platform-ui';

@Component({
  imports: [PuiSearchComponent],
})`;

  codeBasic = `<!-- HTML -->
<pui-search
  placeholder="Search anything…"
  [debounce]="300"
  (searchChange)="onSearch($event)">
</pui-search>

// TypeScript
onSearch(query: string): void {
  console.log('Debounced query:', query);
}`;

  codeSuggestions = `<!-- HTML -->
<pui-search
  placeholder="Search components…"
  [suggestions]="suggestions"
  [minChars]="1"
  (suggestionSelected)="onSelect($event)">
</pui-search>

// TypeScript
import { SearchSuggestion } from '@solifi/platform-ui';

suggestions: SearchSuggestion[] = [
  { label: 'Button',  value: 'button',  category: 'Forms'      },
  { label: 'Modal',   value: 'modal',   category: 'Components' },
  { label: 'Toast',   value: 'toast',   category: 'Utilities'  },
];

onSelect(suggestion: SearchSuggestion): void {
  this.router.navigate([suggestion.value]);
}`;

  codeSizes = `<pui-search size="sm" placeholder="Small (sm)"></pui-search>
<pui-search size="md" placeholder="Medium (md)"></pui-search>
<pui-search size="lg" placeholder="Large (lg)"></pui-search>`;

  codeStates = `<!-- Disabled -->
<pui-search placeholder="Not interactive" [disabled]="true"></pui-search>

<!-- Loading — show while async results are fetched -->
<pui-search placeholder="Fetching results…" [loading]="true"></pui-search>`;

  codeRecent = `<!-- HTML -->
<pui-search
  placeholder="Search…"
  shortcut="⌘K"
  [recentSearches]="recentSearches"
  [maxRecent]="5"
  [clearable]="true">
</pui-search>

// TypeScript
recentSearches = ['Button component', 'Modal dialog', 'Toast service'];`;

  api: ApiRow[] = [
    { input: 'placeholder',      type: 'string',           default: "'Search…'",     description: 'Placeholder text shown in the input.' },
    { input: 'size',             type: "'sm'|'md'|'lg'",  default: "'md'",           description: 'Input size variant.' },
    { input: 'value',            type: 'string',           default: "''",             description: 'Bound search value (supports ngModel).' },
    { input: 'suggestions',      type: 'SearchSuggestion[]', default: '[]',           description: 'Suggestion items shown in the dropdown.' },
    { input: 'debounce',         type: 'number',           default: '300',            description: 'Debounce delay (ms) for searchChange.' },
    { input: 'minChars',         type: 'number',           default: '1',              description: 'Minimum characters before suggestions appear.' },
    { input: 'clearable',        type: 'boolean',          default: 'true',           description: 'Shows an × clear button when there is a value.' },
    { input: 'disabled',         type: 'boolean',          default: 'false',          description: 'Disables the search input.' },
    { input: 'loading',          type: 'boolean',          default: 'false',          description: 'Shows a spinner inside the input.' },
    { input: 'shortcut',         type: 'string',           default: 'undefined',      description: 'Keyboard shortcut badge (e.g. ⌘K).' },
    { input: 'emptyText',        type: 'string',           default: "'No results'",   description: 'Message when suggestions array is empty.' },
    { input: 'recentSearches',   type: 'string[]',         default: '[]',             description: 'Recent search terms shown on focus when input is empty.' },
    { input: 'maxRecent',        type: 'number',           default: '5',              description: 'Maximum number of recent searches to show.' },
    { input: '(searchChange)',   type: 'string',           default: '—',              description: 'Emits debounced query on input.' },
    { input: '(valueChange)',    type: 'string',           default: '—',              description: 'Emits every keystroke value change.' },
    { input: '(suggestionSelected)', type: 'SearchSuggestion', default: '—',         description: 'Emits the selected suggestion object.' },
    { input: '(cleared)',        type: 'void',             default: '—',              description: 'Emits when the clear button is clicked.' },
    { input: '(submitted)',      type: 'string',           default: '—',              description: 'Emits query when Enter is pressed.' },
  ];

  copyCode(code: string, key: string): void {
    navigator.clipboard?.writeText(code);
    this.copied[key] = true;
    setTimeout(() => this.copied[key] = false, 2000);
  }
}
