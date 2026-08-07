import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PuiDatepickerComponent, DateRange } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

@Component({
  selector: 'docs-datepicker-page',
  standalone: true,
  imports: [NgFor, NgIf, PuiDatepickerComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Date Picker"
  description="A fully interactive calendar date picker with single-date and date-range modes, min/max constraints, month-grid navigation, Today shortcut, and clear action. Works in Angular, React, and plain HTML."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Single date -->
    <div class="demo-section">
      <h3 class="demo-section__title">Single Date Selection</h3>
      <div class="demo-row" style="align-items:flex-start;gap:24px;flex-wrap:wrap;">
        <div style="min-width:240px;flex:1;max-width:340px;">
          <p class="demo-desc" style="margin-bottom:8px;">Default — no constraints</p>
          <pui-datepicker
            placeholder="Pick a date…"
            (valueChange)="singleDate = $event; cdr.markForCheck()">
          </pui-datepicker>
          <p class="demo-desc" style="margin-top:6px;">
            Selected: <strong>{{ singleDate ? fmtDate(singleDate) : '—' }}</strong>
          </p>
        </div>

        <div style="min-width:240px;flex:1;max-width:340px;">
          <p class="demo-desc" style="margin-bottom:8px;">With min &amp; max constraint</p>
          <pui-datepicker
            placeholder="Within next 30 days…"
            [min]="minDate"
            [max]="maxDate"
            (valueChange)="constrainedDate = $event; cdr.markForCheck()">
          </pui-datepicker>
          <p class="demo-desc" style="margin-top:6px;">
            Range: {{ fmtDate(minDate) }} to {{ fmtDate(maxDate) }}
          </p>
        </div>
      </div>
    </div>

    <!-- 2. Range mode -->
    <div class="demo-section">
      <h3 class="demo-section__title">Date Range Selection</h3>
      <div class="demo-row" style="align-items:flex-start;gap:24px;flex-wrap:wrap;">
        <div style="min-width:240px;flex:1;max-width:360px;">
          <p class="demo-desc" style="margin-bottom:8px;">Click start date, then end date</p>
          <pui-datepicker
            mode="range"
            placeholder="Select date range…"
            (rangeChange)="dateRange = $event; cdr.markForCheck()">
          </pui-datepicker>
          <p class="demo-desc" style="margin-top:6px;">
            <ng-container *ngIf="!dateRange.start">—</ng-container>
            <ng-container *ngIf="dateRange.start && !dateRange.end">{{ fmtDate(dateRange.start) }} — select end date</ng-container>
            <ng-container *ngIf="dateRange.start && dateRange.end">{{ fmtDate(dateRange.start) }} to {{ fmtDate(dateRange.end) }} &mdash; {{ daysBetween(dateRange.start, dateRange.end) }} days</ng-container>
          </p>
        </div>
      </div>
    </div>

    <!-- 3. Disabled state -->
    <div class="demo-section">
      <h3 class="demo-section__title">Disabled State</h3>
      <pui-datepicker
        disabled="true"
        placeholder="Not available"
        style="max-width:280px; display:block;">
      </pui-datepicker>
    </div>

    <!-- 4. Pre-filled value -->
    <div class="demo-section">
      <h3 class="demo-section__title">Pre-filled Value</h3>
      <pui-datepicker
        [value]="prefilled"
        style="max-width:280px; display:block;"
        (valueChange)="prefilled = $event; cdr.markForCheck()">
      </pui-datepicker>
      <p class="demo-desc" style="margin-top:6px;">
        Value: <strong>{{ prefilled ? fmtDate(prefilled) : '—' }}</strong>
      </p>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-datepicker</code> is a Web Component — works in Angular, React, and plain HTML. Pass <code>value</code> as a JS <code>Date</code> from Angular; use an ISO string from React/HTML. Listen to <code>valueChange</code> (single) or <code>rangeChange</code> (range) for selection events.</p>

    <div class="fw-tabs">
      <button class="fw-tab" [class.fw-tab--active]="fw==='angular'" (click)="fw='angular'">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.31H4.936L12 3.405z" fill="#c3002f"/></svg>
        Angular
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fw==='react'" (click)="fw='react'">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><circle cx="12" cy="12" r="2.05" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/></svg>
        React
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fw==='html'" (click)="fw='html'">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/></svg>
        Plain HTML
      </button>
    </div>

    <div *ngIf="fw==='angular'" class="fw-panel">
      <div class="fw-note fw-note--angular">Use <code>[value]</code> for a controlled Date value and <code>(valueChange)</code> to sync back. For range mode, use <code>(rangeChange)</code> which emits a <code>DateRange</code> object with <code>start</code> and <code>end</code> properties.</div>
      <app-code lang="html"       id="ang-html" [text]="angHtml" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
      <app-code lang="typescript" id="ang-ts"   [text]="angTs"   [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='react'" class="fw-panel">
      <div class="fw-note fw-note--react">Set the <code>value</code> property as an ISO string via <code>ref</code>. Listen to <code>valueChange</code> and <code>rangeChange</code> custom events — <code>e.detail</code> carries the selected Date or DateRange.</div>
      <app-code lang="tsx" id="react-code" [text]="reactCode" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='html'" class="fw-panel">
      <div class="fw-note fw-note--html">Load <code>pui-elements.js</code> once. Set <code>min</code> / <code>max</code> as ISO date strings. Listen to <code>valueChange</code> to get the selected <code>Date</code> object from <code>e.detail</code>.</div>
      <app-code lang="html" id="html-code" [text]="htmlCode" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <h3 class="fw-ref-title">Input / Event Quick Reference</h3>
    <div class="xfw-wrap">
      <table class="xfw-table">
        <thead><tr><th>Input / Event</th><th>Angular</th><th>React / HTML attribute</th><th>JS property</th></tr></thead>
        <tbody>
          <tr *ngFor="let r of xfwRows; let odd = odd" [class.xfw-odd]="odd">
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
})
export class DatepickerPageComponent {
  cdr = inject(ChangeDetectorRef);

  fw = 'angular';
  copied = '';

  singleDate:     Date | null = null;
  constrainedDate: Date | null = null;
  dateRange: DateRange = { start: null, end: null };
  prefilled: Date | null = new Date(2024, 10, 15);

  minDate = new Date();
  maxDate = (() => { const d = new Date(); d.setDate(d.getDate() + 30); return d; })();

  copy(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  fmtDate(d: Date | null): string {
    if (!d) return '—';
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  daysBetween(a: Date, b: Date): number {
    return Math.round(Math.abs(b.getTime() - a.getTime()) / 86400000);
  }

  /* ── Quick-ref table ────────────────────────────── */
  xfwRows = [
    { name: 'value',       angular: '[value]="dateObj"',              attr: '— use JS property',     js: 'el.value = new Date(...)' },
    { name: 'mode',        angular: 'mode="range"',                   attr: 'mode="range"',           js: 'el.mode = "range"'        },
    { name: 'min',         angular: '[min]="minDate"',                attr: 'min="2024-01-01"',       js: 'el.min = new Date(...)'   },
    { name: 'max',         angular: '[max]="maxDate"',                attr: 'max="2024-12-31"',       js: 'el.max = new Date(...)'   },
    { name: 'disabled',    angular: '[disabled]="bool"',              attr: 'disabled="true"',        js: 'el.disabled = true'       },
    { name: 'clearable',   angular: '[clearable]="bool"',             attr: 'clearable="true"',       js: 'el.clearable = true'      },
    { name: 'placeholder', angular: 'placeholder="Pick date…"',       attr: 'placeholder="Pick…"',    js: 'el.placeholder = "…"'     },
    { name: 'valueChange', angular: '(valueChange)="fn($event)"',     attr: '— use addEventListener', js: 'el.addEventListener("valueChange", fn)'  },
    { name: 'rangeChange', angular: '(rangeChange)="fn($event)"',     attr: '— use addEventListener', js: 'el.addEventListener("rangeChange", fn)'  },
    { name: 'change',      angular: '(change)="fn($event)"',          attr: '— use addEventListener', js: 'el.addEventListener("change", fn)'       },
  ];

  /* ── Code snippets ──────────────────────────────── */
  angHtml = `<!-- Single date -->
<pui-datepicker
  [value]="selectedDate"
  [min]="minDate"
  [max]="maxDate"
  placeholder="Select date…"
  (valueChange)="selectedDate = $event">
</pui-datepicker>

<!-- Range mode -->
<pui-datepicker
  mode="range"
  placeholder="Start date → End date"
  (rangeChange)="onRangeChange($event)">
</pui-datepicker>`;

  angTs = `import { PuiDatepickerComponent, DateRange } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiDatepickerComponent] })
export class BookingComponent {
  selectedDate: Date | null = null;
  minDate = new Date();
  maxDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d;
  })();

  tripRange: DateRange = { start: null, end: null };

  onRangeChange(r: DateRange) {
    this.tripRange = r;
    if (r.start && r.end) {
      console.log('Trip:', r.start, '→', r.end);
    }
  }
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

export function BookingPicker() {
  const ref = useRef(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set constraints as Date objects
    el.min = new Date();
    const max = new Date();
    max.setDate(max.getDate() + 90);
    el.max = max;

    el.clearable = true;
    el.placeholder = 'Select check-in date…';

    const onPick = (e) => {
      setDate(e.detail);   // e.detail is a Date object
    };
    el.addEventListener('valueChange', onPick);
    return () => el.removeEventListener('valueChange', onPick);
  }, []);

  return (
    <>
      <pui-datepicker ref={ref} />
      {date && <p>Check-in: {date.toLocaleDateString()}</p>}
    </>
  );
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-datepicker
  id="myPicker"
  placeholder="Select a date…"
  clearable="true">
</pui-datepicker>

<p id="output">No date selected</p>

<script>
  customElements.whenDefined('pui-datepicker').then(() => {
    const el = document.getElementById('myPicker');
    const out = document.getElementById('output');

    // Set min/max as Date objects
    el.min = new Date();
    const max = new Date();
    max.setDate(max.getDate() + 30);
    el.max = max;

    el.addEventListener('valueChange', (e) => {
      const d = e.detail;  // Date object or null
      out.textContent = d
        ? 'Selected: ' + d.toLocaleDateString()
        : 'No date selected';
    });

    // Range mode example:
    // el.mode = 'range';
    // el.addEventListener('rangeChange', (e) => {
    //   const { start, end } = e.detail;
    //   console.log(start, end);
    // });
  });
</script>`;

  /* ── Component API ──────────────────────────────── */
  api: ApiRow[] = [
    { input: 'value',       type: 'Date | null',        default: 'null',    description: 'Selected date for single mode — pass a JS Date or ISO string' },
    { input: 'range',       type: 'DateRange',          default: 'start/end: null',  description: 'Selected range for range mode — start: Date, end: Date' },
    { input: 'mode',        type: '"single"|"range"',   default: '"single"', description: 'Single date or date range selection mode' },
    { input: 'min',         type: 'Date | null',        default: 'null',    description: 'Minimum selectable date — earlier dates are disabled and grayed' },
    { input: 'max',         type: 'Date | null',        default: 'null',    description: 'Maximum selectable date — later dates are disabled and grayed' },
    { input: 'disabled',    type: 'boolean',            default: 'false',   description: 'Disables the entire picker — trigger is dimmed and unclickable' },
    { input: 'clearable',   type: 'boolean',            default: 'true',    description: 'Shows a × clear button and a Clear action in the calendar footer' },
    { input: 'placeholder', type: 'string',             default: '"Select date…"', description: 'Placeholder text shown when no date is selected' },
    { input: 'valueChange', type: 'EventEmitter<Date|null>', default: '—',  description: 'Emits the selected Date on pick, or null on clear (single mode)' },
    { input: 'rangeChange', type: 'EventEmitter<DateRange>', default: '—',  description: 'Emits { start, end } when both dates are chosen (range mode)' },
    { input: 'change',      type: 'EventEmitter<Date|DateRange|null>', default: '—', description: 'Unified event emitted on every selection or clear in any mode' },
  ];
}
