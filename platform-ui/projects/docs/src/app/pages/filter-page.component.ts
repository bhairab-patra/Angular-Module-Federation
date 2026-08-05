import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, JsonPipe } from '@angular/common';
import { PuiFilterPanelComponent, FilterDef, FilterValues } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-filter-page',
  standalone: true,
  imports: [NgFor, NgIf, JsonPipe, PuiFilterPanelComponent, DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <docs-page
      title="Advanced Filters"
      description="A composable filter panel supporting checkbox groups, radio buttons, select dropdowns, dual-thumb range sliders, text inputs, and date-range pickers. Filters show as removable chips and can be applied as a batch or respond instantly in inline mode."
      [code]="importCode"
      [api]="api">

      <ng-container demo>

        <!-- ── Sidebar Panel ──────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Sidebar Filter Panel</h3>
            <p class="ds__desc">
              The default mode: all changes stage locally and emit via <code class="ic">(applied)</code>
              only when the user clicks <strong>Apply</strong>.
              Active selections appear as removable chips at the top.
            </p>
          </div>

          <div class="ds__preview">
            <div class="preview-split">
              <!-- Panel -->
              <div class="preview-split__panel">
                <pui-filter-panel
                  title="Filters"
                  [filters]="sidebarFilters"
                  [values]="sidebarValues"
                  (valuesChange)="sidebarValues = $event"
                  (applied)="appliedValues = $event"
                  (cleared)="sidebarValues = {}; appliedValues = {}">
                </pui-filter-panel>
              </div>
              <!-- Result -->
              <div class="preview-split__result">
                <div class="result-label">Applied values</div>
                <pre class="result-pre">{{ appliedValues | json }}</pre>
                <p class="result-hint" *ngIf="!hasApplied">
                  Click <strong>Apply</strong> in the panel to see values here.
                </p>
              </div>
            </div>
          </div>

          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copy(codeSidebar, 'sidebar')">{{ copied['sidebar'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeSidebar }}</code></pre>
          </div>
        </div>

        <!-- ── Inline / Immediate ─────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Inline / Immediate Mode</h3>
            <p class="ds__desc">
              Set <code class="ic">[showActions]="false"</code> and <code class="ic">[inline]="true"</code>
              to emit on every change — no Apply button needed.
              Ideal for toolbars, filter bars, and sidebars that refresh results live.
            </p>
          </div>

          <div class="ds__preview">
            <div class="preview-frame">
              <pui-filter-panel
                title="Quick Filters"
                [filters]="inlineFilters"
                [values]="inlineValues"
                [showActions]="false"
                [inline]="true"
                (valuesChange)="inlineValues = $event">
              </pui-filter-panel>
              <div class="live-result" *ngIf="inlineValues['status']?.length || inlineValues['priority']">
                <span class="live-result__label">Live values:</span>
                <span class="live-chip" *ngFor="let s of inlineValues['status']">{{ s }}</span>
                <span class="live-chip live-chip--purple" *ngIf="inlineValues['priority'] && inlineValues['priority'] !== 'all'">
                  {{ inlineValues['priority'] }}
                </span>
              </div>
            </div>
          </div>

          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copy(codeInline, 'inline')">{{ copied['inline'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeInline }}</code></pre>
          </div>
        </div>

        <!-- ── Range & Date ───────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Range, Date & Text Filters</h3>
            <p class="ds__desc">
              Use <code class="ic">type: 'range'</code> for a dual-thumb slider with configurable
              <code class="ic">min</code>, <code class="ic">max</code>, and <code class="ic">step</code>.
              <code class="ic">type: 'date-range'</code> provides start/end date inputs.
              <code class="ic">type: 'text'</code> gives a free-text search field.
            </p>
          </div>

          <div class="ds__preview">
            <div class="preview-split">
              <div class="preview-split__panel">
                <pui-filter-panel
                  title="Advanced"
                  [filters]="rangeFilters"
                  [values]="rangeValues"
                  (valuesChange)="rangeValues = $event">
                </pui-filter-panel>
              </div>
              <div class="preview-split__result">
                <div class="result-label">Current values</div>
                <pre class="result-pre">{{ rangeValues | json }}</pre>
              </div>
            </div>
          </div>

          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copy(codeRange, 'range')">{{ copied['range'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeRange }}</code></pre>
          </div>
        </div>

        <!-- ── Filter Types Reference ─────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Filter Types Reference</h3>
            <p class="ds__desc">All six <code class="ic">FilterDef</code> types at a glance.</p>
          </div>
          <div class="type-grid">
            <div class="type-card" *ngFor="let t of filterTypes">
              <span class="type-card__badge">{{ t.type }}</span>
              <div class="type-card__name">{{ t.name }}</div>
              <div class="type-card__desc">{{ t.desc }}</div>
            </div>
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
    .ds:last-child  { border-bottom: none; padding-bottom: 0; }
    .ds:first-child { padding-top: 0; }

    .ds__head { display: flex; flex-direction: column; gap: 6px; }
    .ds__title {
      font-size: 16px; font-weight: 700; color: #111827; margin: 0;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .ds__desc {
      font-size: 13.5px; color: #6b7280; margin: 0; line-height: 1.7;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* ── Inline code ────────────────────────────────────── */
    .ic {
      background: #f3f4f6; color: #1f2937;
      padding: 1px 6px; border-radius: 4px;
      font-size: 12.5px; border: 1px solid #e5e7eb;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }

    /* ── Preview frame ──────────────────────────────────── */
    .preview-frame {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* ── Split layout: panel + result ───────────────────── */
    .preview-split {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 20px;
      align-items: flex-start;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
    }
    .preview-split__panel {
      border-right: 1px solid #e5e7eb;
      background: #fafafa;
    }
    .preview-split__result {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* ── Result display ─────────────────────────────────── */
    .result-label {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .07em; color: #9ca3af;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .result-pre {
      font-size: 12px; line-height: 1.7;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px 16px;
      margin: 0;
      color: #374151;
      min-height: 80px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      overflow: auto;
    }
    .result-hint {
      font-size: 12.5px; color: #9ca3af; margin: 0;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* ── Live result chips ──────────────────────────────── */
    .live-result {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
      padding: 10px 12px;
      background: #f9fafb; border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    .live-result__label {
      font-size: 12px; color: #9ca3af;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .live-chip {
      font-size: 12px; font-weight: 600;
      padding: 2px 10px; border-radius: 20px;
      background: #dcfce7; color: #16a34a;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .live-chip--purple { background: #f5f3ff; color: #7c3aed; }

    /* ── Filter type reference grid ─────────────────────── */
    .type-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .type-card {
      border: 1.5px solid #e5e7eb;
      border-radius: 10px;
      padding: 16px 18px;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .type-card__badge {
      font-size: 11px; font-weight: 700;
      background: #f5f3ff; color: #7c3aed;
      padding: 2px 8px; border-radius: 4px;
      align-self: flex-start;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }
    .type-card__name {
      font-size: 13.5px; font-weight: 600; color: #111827;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .type-card__desc {
      font-size: 12.5px; color: #6b7280; line-height: 1.5;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* ── Code block ─────────────────────────────────────── */
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
export class FilterPageComponent {
  copied: Record<string, boolean> = {};
  sidebarValues: FilterValues = {};
  appliedValues: FilterValues = {};
  inlineValues:  FilterValues = {};
  rangeValues:   FilterValues = {};

  get hasApplied(): boolean {
    return Object.keys(this.appliedValues).length > 0;
  }

  filterTypes = [
    { type: 'checkbox',   name: 'Checkbox Group',   desc: 'Multi-select from a list of options. Returns an array of selected values.' },
    { type: 'radio',      name: 'Radio Group',       desc: 'Single selection from a list. Returns a single value string.' },
    { type: 'select',     name: 'Select Dropdown',   desc: 'Native dropdown for long option lists. Returns a single value string.' },
    { type: 'range',      name: 'Range Slider',      desc: 'Dual-thumb slider for numeric min/max. Returns { min, max } object.' },
    { type: 'date-range', name: 'Date Range',        desc: 'Start and end date inputs. Returns { start, end } date strings.' },
    { type: 'text',       name: 'Text Input',        desc: 'Free-text keyword search. Returns a string value.' },
  ];

  sidebarFilters: FilterDef[] = [
    {
      id: 'category', label: 'Category', type: 'checkbox',
      options: [
        { value: 'forms',      label: 'Forms'      },
        { value: 'components', label: 'Components' },
        { value: 'utilities',  label: 'Utilities'  },
        { value: 'layout',     label: 'Layout'     },
      ],
    },
    {
      id: 'status', label: 'Status', type: 'radio',
      options: [
        { value: 'all',    label: 'All'    },
        { value: 'stable', label: 'Stable' },
        { value: 'beta',   label: 'Beta'   },
        { value: 'new',    label: 'New'    },
      ],
    },
    {
      id: 'sort', label: 'Sort By', type: 'select',
      options: [
        { value: 'name',    label: 'Name A–Z'     },
        { value: 'newest',  label: 'Newest First' },
        { value: 'popular', label: 'Most Popular' },
      ],
    },
  ];

  inlineFilters: FilterDef[] = [
    {
      id: 'status', label: 'Status', type: 'checkbox',
      options: [
        { value: 'active',   label: 'Active'   },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending',  label: 'Pending'  },
        { value: 'archived', label: 'Archived' },
      ],
    },
    {
      id: 'priority', label: 'Priority', type: 'radio',
      options: [
        { value: 'all',    label: 'All'    },
        { value: 'high',   label: 'High'   },
        { value: 'medium', label: 'Medium' },
        { value: 'low',    label: 'Low'    },
      ],
    },
  ];

  rangeFilters: FilterDef[] = [
    { id: 'price',   label: 'Price Range ($)',  type: 'range',      min: 0, max: 1000, step: 10 },
    { id: 'created', label: 'Created Date',     type: 'date-range' },
    { id: 'keyword', label: 'Keyword',          type: 'text',       placeholder: 'Type to filter…' },
  ];

  importCode = `import { PuiFilterPanelComponent } from '@solifi/platform-ui';
import type { FilterDef, FilterValues } from '@solifi/platform-ui';

@Component({
  imports: [PuiFilterPanelComponent],
})`;

  codeSidebar = `<!-- HTML -->
<pui-filter-panel
  title="Filters"
  [filters]="filters"
  [values]="filterValues"
  (valuesChange)="filterValues = $event"
  (applied)="onApply($event)"
  (reset)="onReset()"
  (cleared)="filterValues = {}">
</pui-filter-panel>

// TypeScript
import { FilterDef, FilterValues } from '@solifi/platform-ui';

filters: FilterDef[] = [
  {
    id: 'category', label: 'Category', type: 'checkbox',
    options: [
      { value: 'forms',      label: 'Forms'      },
      { value: 'components', label: 'Components' },
    ],
  },
  {
    id: 'status', label: 'Status', type: 'radio',
    options: [
      { value: 'all',    label: 'All'    },
      { value: 'stable', label: 'Stable' },
      { value: 'beta',   label: 'Beta'   },
    ],
  },
  {
    id: 'sort', label: 'Sort By', type: 'select',
    options: [
      { value: 'name',   label: 'Name A–Z'     },
      { value: 'newest', label: 'Newest First' },
    ],
  },
];

filterValues: FilterValues = {};

onApply(values: FilterValues): void {
  // Send to API or filter local data
  console.log('Applied:', values);
}`;

  codeInline = `<!-- No Apply button — fires on every change -->
<pui-filter-panel
  title="Quick Filters"
  [filters]="filters"
  [values]="filterValues"
  [showActions]="false"
  [inline]="true"
  (valuesChange)="filterValues = $event">
</pui-filter-panel>`;

  codeRange = `// TypeScript
filters: FilterDef[] = [
  {
    id: 'price',
    label: 'Price Range ($)',
    type: 'range',
    min: 0, max: 1000, step: 10,
    // value shape: { min: number, max: number }
  },
  {
    id: 'created',
    label: 'Created Date',
    type: 'date-range',
    // value shape: { start: string, end: string }
  },
  {
    id: 'keyword',
    label: 'Keyword',
    type: 'text',
    placeholder: 'Type to filter…',
    // value shape: string
  },
];`;

  api: ApiRow[] = [
    { input: 'title',          type: 'string',      default: "'Filters'", description: 'Heading shown at the top of the panel.' },
    { input: 'filters',        type: 'FilterDef[]', default: '[]',        description: 'Array of filter definitions (see type reference above).' },
    { input: 'values',         type: 'FilterValues',default: '{}',        description: 'Current values object, keyed by filter id.' },
    { input: 'showActions',    type: 'boolean',     default: 'true',      description: 'Show Apply / Reset buttons at the bottom.' },
    { input: 'inline',         type: 'boolean',     default: 'false',     description: 'Removes card shadow for embedding in toolbars.' },
    { input: '(valuesChange)', type: 'FilterValues',default: '—',         description: 'Emits on every user interaction.' },
    { input: '(applied)',      type: 'FilterValues',default: '—',         description: 'Emits when Apply button is clicked.' },
    { input: '(reset)',        type: 'void',        default: '—',         description: 'Emits when Reset clears all values.' },
    { input: '(cleared)',      type: 'void',        default: '—',         description: 'Emits when Clear All chips link is clicked.' },
  ];

  copy(code: string, key: string): void {
    navigator.clipboard?.writeText(code);
    this.copied[key] = true;
    setTimeout(() => this.copied[key] = false, 2000);
  }
}
