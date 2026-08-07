import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, JsonPipe } from '@angular/common';
import { PuiFilterPanelComponent, FilterDef, FilterValues } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

type FwTab = 'angular' | 'react' | 'html';

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
  imports: [NgFor, NgIf, JsonPipe, PuiFilterPanelComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <docs-page
      title="Advanced Filters"
      description="Composable filter panel with checkbox groups, radio buttons, select dropdowns, dual-thumb range sliders, text inputs, and date-range pickers. Active filters display as removable chips. Works in Angular, React, and plain HTML."
      [hasFramework]="true"
      [api]="api">

      <!-- ══ DEMO ═════════════════════════════════════════════ -->
      <ng-container demo>

        <div class="demo-label"><span>Sidebar Filter Panel (batch apply)</span></div>
        <div class="demo-split">
          <div class="panel-col">
            <pui-filter-panel
              title="Loan Filters"
              [filters]="filters"
              [values]="values"
              (valuesChange)="values = $event"
              (applied)="applied = $event"
              (cleared)="values = {}; applied = {}">
            </pui-filter-panel>
          </div>
          <div class="result-col">
            <div class="result-label">Applied filters</div>
            <pre class="result-pre">{{ applied | json }}</pre>
            <p class="result-hint" *ngIf="!hasApplied">Click <strong>Apply filters</strong> to see the values here.</p>
          </div>
        </div>

        <div class="demo-label"><span>Inline Mode (auto-apply on change)</span></div>
        <div class="demo-split">
          <div class="panel-col">
            <pui-filter-panel
              title="Quick Filters"
              [inline]="true"
              [showActions]="false"
              [filters]="inlineFilters"
              [values]="inlineValues"
              (valuesChange)="inlineValues = $event"
              (applied)="inlineApplied = $event">
            </pui-filter-panel>
          </div>
          <div class="result-col">
            <div class="result-label">Live values</div>
            <pre class="result-pre">{{ inlineValues | json }}</pre>
          </div>
        </div>

      </ng-container>

      <!-- ══ FRAMEWORK USAGE ══════════════════════════════════ -->
      <ng-container framework>

        <h2 class="fw-title">Framework Usage</h2>
        <p class="fw-lead">
          <code>pui-filter-panel</code> is a Web Component. The <code>filters</code> definition array and
          <code>values</code> object are complex structures — pass them as JS properties or as a JSON string attribute.
          The component emits <code>valuesChange</code>, <code>applied</code>, <code>reset</code>, and <code>cleared</code> CustomEvents.
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
          <div class="fw-note fw-note--angular">Bind <code>[filters]</code> and <code>[(values)]</code> directly — full two-way binding supported.</div>
          <app-code lang="html"       id="fp-ng-tpl" [text]="angularTpl" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <app-code lang="typescript" id="fp-ng-ts"  [text]="angularTs"  [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <div *ngIf="fw==='react'" class="fw-panel">
          <div class="fw-note fw-note--react">Set <code>filters</code> and <code>values</code> as JS properties via <code>ref</code>. Listen to <code>valuesChange</code> and <code>applied</code> events.</div>
          <app-code lang="tsx" id="fp-react" [text]="reactCode" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <div *ngIf="fw==='html'" class="fw-panel">
          <div class="fw-note fw-note--html">Load bundle, set <code>filters</code> via JS property after <code>whenDefined</code>, listen to CustomEvents.</div>
          <app-code lang="html" id="fp-html" [text]="htmlCode" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <h3 class="fw-ref-title">Input Quick Reference</h3>
        <div class="xfw-wrap">
          <table class="xfw-table">
            <thead><tr><th>Input / Event</th><th>Angular</th><th>React / HTML attribute</th><th>JS property / event</th></tr></thead>
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
    .demo-split { display:grid; grid-template-columns:320px 1fr; gap:20px; width:100%; align-items:start; }
    .panel-col { min-width:0; }
    .result-col { background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; min-height:200px; }
    .result-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#9ca3af; margin-bottom:10px; }
    .result-pre { margin:0; font-size:12px; color:#374151; background:transparent; border:none; white-space:pre-wrap; word-break:break-all; font-family:'Fira Code',monospace; }
    .result-hint { font-size:13px; color:#9ca3af; margin:12px 0 0; }
    .result-hint strong { color:#374151; }

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
export class FilterPageComponent {
  fw: FwTab = 'angular';
  copied    = '';

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

  doCopy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => { this.copied = id; setTimeout(() => this.copied = '', 2000); });
  }

  angularTpl = `<pui-filter-panel
  title="Loan Filters"
  [filters]="loanFilters"
  [values]="filterValues"
  (valuesChange)="filterValues = $event"
  (applied)="onApply($event)"
  (reset)="onReset()"
  (cleared)="filterValues = {}">
</pui-filter-panel>

<!-- Inline mode — no Apply button, updates fire immediately -->
<pui-filter-panel
  title="Quick Filters"
  [inline]="true"
  [showActions]="false"
  [filters]="quickFilters"
  [values]="quickValues"
  (valuesChange)="onQuickChange($event)">
</pui-filter-panel>`;

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
    <pui-filter-panel
      ref={ref}
      title="Filters"
      show-actions="true"
    />
  );
}`;

  htmlCode = `<script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>

<pui-filter-panel id="fp" title="Filters"></pui-filter-panel>

<script>
  customElements.whenDefined('pui-filter-panel').then(() => {
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
