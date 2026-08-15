import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, JsonPipe } from '@angular/common';
import { PuiFilterPanelComponent, FilterDef, FilterValues } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

const LOAN_FILTERS: FilterDef[] = [
  {
    id: 'status', label: 'Loan Status', type: 'checkbox',
    options: [
      { label: 'Active',      value: 'active',      count: 142 },
      { label: 'Pending',     value: 'pending',     count: 38  },
      { label: 'Closed',      value: 'closed',      count: 215 },
      { label: 'Defaulted',   value: 'defaulted',   count: 12  },
    ],
  },
  {
    id: 'type', label: 'Loan Type', type: 'radio',
    options: [
      { label: 'All types',   value: ''          },
      { label: 'Personal',    value: 'personal'  },
      { label: 'Business',    value: 'business'  },
      { label: 'Mortgage',    value: 'mortgage'  },
    ],
  },
  {
    id: 'amount', label: 'Loan Amount', type: 'range',
    min: 0, max: 500000, step: 5000,
  },
  {
    id: 'region', label: 'Region', type: 'select',
    placeholder: 'Any region',
    options: [
      { label: 'North America', value: 'na'  },
      { label: 'Europe',        value: 'eu'  },
      { label: 'Asia Pacific',  value: 'apac'},
    ],
  },
  {
    id: 'created', label: 'Created Date', type: 'date-range',
  },
];

@Component({
  selector: 'docs-filter-page',
  standalone: true,
  imports: [NgFor, NgIf, JsonPipe, PuiFilterPanelComponent, DocPageComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
})
export class FilterPageComponent {
  copied = '';

  get angularCode(): string { return `${this.angularTpl}\n\n// component.ts\n${this.angularTs}`; }

  filters        = LOAN_FILTERS;
  values: FilterValues = {};
  applied: FilterValues = {};

  inlineFilters: FilterDef[] = [
    { id: 'status', label: 'Status', type: 'radio',
      options: [
        { label: 'All',     value: ''         },
        { label: 'Active',  value: 'active'   },
        { label: 'Pending', value: 'pending'  },
        { label: 'Closed',  value: 'closed'   },
      ] },
    { id: 'search', label: 'Keyword', type: 'text', placeholder: 'Filter by name…' },
  ];
  inlineValues: FilterValues = {};
  inlineApplied: FilterValues = {};

  get hasApplied(): boolean { return Object.keys(this.applied).length > 0; }

  trackByIndex(_i: number): number { return _i; }

  doCopy(text: string, id: string): void {
    navigator.clipboard.writeText(text).then(() => { this.copied = id; setTimeout(() => this.copied = '', 2000); });
  }

  angularTpl = `<pui-lib-filter-panel
  title="Loan Filters"
  [filters]="loanFilters"
  [values]="filterValues"
  (valuesChange)="filterValues = $event"
  (applied)="onApply($event)"
  (reset)="onReset()"
  (cleared)="filterValues = {}">
</pui-lib-filter-panel>

<!-- Inline mode — no Apply button, updates fire immediately -->
<pui-lib-filter-panel
  title="Quick Filters"
  [inline]="true"
  [showActions]="false"
  [filters]="quickFilters"
  [values]="quickValues"
  (valuesChange)="onQuickChange($event)">
</pui-lib-filter-panel>`;

  angularTs = `import { PuiFilterPanelComponent, FilterDef, FilterValues } from '@bhairab-patra/platform-ui';

@Component({ standalone: true, imports: [PuiFilterPanelComponent] })
export class MyComponent {
  filterValues: FilterValues = {};

  loanFilters: FilterDef[] = [
    {
      id: 'status', label: 'Loan Status', type: 'checkbox',
      options: [
        { label: 'Active',  value: 'active',  count: 142 },
        { label: 'Pending', value: 'pending', count: 38  },
        { label: 'Closed',  value: 'closed',  count: 215 },
      ],
    },
    {
      id: 'amount', label: 'Loan Amount', type: 'range',
      min: 0, max: 500000, step: 5000,
    },
    {
      id: 'created', label: 'Created Date', type: 'date-range',
    },
  ];

  onApply(values: FilterValues) { this.loadData(values); }
  onReset()                      { this.filterValues = {}; this.loadData({}); }
}`;

  reactCode = `import { useRef, useEffect, useState } from 'react';
// main.tsx: import '@bhairab-patra/platform-ui/elements';

const FILTERS = [
  {
    id: 'status', label: 'Status', type: 'checkbox',
    options: [
      { label: 'Active',  value: 'active'  },
      { label: 'Pending', value: 'pending' },
      { label: 'Closed',  value: 'closed'  },
    ],
  },
  { id: 'amount', label: 'Amount', type: 'range', min: 0, max: 500000, step: 5000 },
];

export function FilterSidebar({ onApply }) {
  const ref = useRef(null);
  const [vals, setVals] = useState({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Complex arrays/objects → JS properties
    el.filters = FILTERS;
    el.values  = vals;

    const onValChange = (e) => setVals(e.detail);
    const onApplied   = (e) => onApply(e.detail);
    el.addEventListener('valuesChange', onValChange);
    el.addEventListener('applied',      onApplied);
    return () => {
      el.removeEventListener('valuesChange', onValChange);
      el.removeEventListener('applied',      onApplied);
    };
  }, []);

  // Sync values back whenever local state changes
  useEffect(() => {
    if (ref.current) ref.current.values = vals;
  }, [vals]);

  return (
    <pui-lib-filter-panel
      ref={ref}
      title="Filters"
      show-actions="true"
    />
  );
}`;

  htmlCode = `<script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>

<pui-lib-filter-panel id="fp" title="Filters"></pui-lib-filter-panel>

<script>
  customElements.whenDefined('pui-lib-filter-panel').then(() => {
    const el = document.getElementById('fp');

    el.filters = [
      {
        id: 'status', label: 'Status', type: 'checkbox',
        options: [
          { label: 'Active',  value: 'active'  },
          { label: 'Pending', value: 'pending' },
          { label: 'Closed',  value: 'closed'  },
        ],
      },
      { id: 'amount', label: 'Amount', type: 'range', min: 0, max: 100000, step: 1000 },
    ];

    el.addEventListener('valuesChange', (e) => console.log('live:', e.detail));
    el.addEventListener('applied',      (e) => fetchData(e.detail));
    el.addEventListener('reset',        ()  => fetchData({}));
  });
</script>`;

  xfwRows = [
    { name: 'title',        angular: 'title="Filters"',              attr: 'title="Filters"',          js: 'el.title = "Filters"' },
    { name: 'filters',      angular: '[filters]="defs"',             attr: '— use JS property',         js: 'el.filters = [...]' },
    { name: 'values',       angular: '[values]="vals"',              attr: '— use JS property',         js: 'el.values = {...}' },
    { name: 'showActions',  angular: '[showActions]="true"',         attr: 'show-actions="true"',       js: 'el.showActions = true' },
    { name: 'inline',       angular: '[inline]="false"',             attr: 'inline="false"',            js: 'el.inline = false' },
    { name: 'valuesChange', angular: '(valuesChange)="fn($event)"',  attr: '— addEventListener',        js: 'el.addEventListener("valuesChange", fn)' },
    { name: 'applied',      angular: '(applied)="fn($event)"',       attr: '— addEventListener',        js: 'el.addEventListener("applied", fn)' },
    { name: 'reset',        angular: '(reset)="fn()"',               attr: '— addEventListener',        js: 'el.addEventListener("reset", fn)' },
    { name: 'cleared',      angular: '(cleared)="fn()"',             attr: '— addEventListener',        js: 'el.addEventListener("cleared", fn)' },
  ];

  api: ApiRow[] = [
    { input: 'title',        type: 'string',                   default: "'Filters'", description: 'Panel header title.' },
    { input: 'filters',      type: 'FilterDef[]|string',       default: '[]',        description: 'Filter definition array — drives the panel structure.' },
    { input: 'values',       type: 'FilterValues|string',      default: '{}',        description: 'Current filter values object. Use [(values)] for two-way.' },
    { input: 'showActions',  type: 'boolean|string',           default: 'true',      description: 'Show Reset / Apply buttons at the bottom.' },
    { input: 'inline',       type: 'boolean|string',           default: 'false',     description: 'Inline mode — no border/radius, fires applied immediately.' },
    { input: 'valuesChange', type: 'EventEmitter<FilterValues>', default: '—',       description: 'Fires on every internal change.' },
    { input: 'applied',      type: 'EventEmitter<FilterValues>', default: '—',       description: 'Fires when Apply is clicked (or on every change in inline mode).' },
    { input: 'reset',        type: 'EventEmitter<void>',       default: '—',         description: 'Fires when Reset is clicked.' },
    { input: 'cleared',      type: 'EventEmitter<void>',       default: '—',         description: 'Fires when Clear all chips is clicked.' },
  ];
}
