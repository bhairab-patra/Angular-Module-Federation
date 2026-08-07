import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { PuiComboboxComponent, ComboboxOption } from '@solifi/platform-ui';

@Component({
  selector: 'app-combobox-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiComboboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Combobox"
  description="A searchable single-select input combining a text field with a dropdown list — with keyboard navigation, grouped options, option descriptions, and optional free-text entry."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Basic -->
    <div class="demo-section">
      <h3 class="demo-section__title">Basic Combobox</h3>
      <p class="demo-section__desc">Type to filter options in real-time. Arrow keys navigate the list; Enter selects; Escape closes.</p>
      <div style="width:320px">
        <label class="demo-label">Select Country</label>
        <pui-combobox
          [options]="countryOptions"
          [value]="selectedCountry"
          placeholder="Search countries…"
          (valueChange)="selectedCountry = $event; cdr.markForCheck()">
        </pui-combobox>
        <p *ngIf="selectedCountry" class="demo-result">Selected: {{ selectedCountry }}</p>
      </div>
    </div>

    <!-- 2. Grouped -->
    <div class="demo-section">
      <h3 class="demo-section__title">Grouped Options</h3>
      <p class="demo-section__desc">Options with the same <code>group</code> value are rendered under a labelled section divider.</p>
      <div style="width:340px">
        <label class="demo-label">Assign Priority</label>
        <pui-combobox
          [options]="priorityOptions"
          [value]="selectedPriority"
          placeholder="Choose priority…"
          (valueChange)="selectedPriority = $event; cdr.markForCheck()">
        </pui-combobox>
        <p *ngIf="selectedPriority" class="demo-result">Priority: {{ selectedPriority }}</p>
      </div>
    </div>

    <!-- 3. With descriptions -->
    <div class="demo-section">
      <h3 class="demo-section__title">Options with Descriptions</h3>
      <p class="demo-section__desc">Each option can carry a <code>description</code> line for extra context rendered below the label.</p>
      <div style="width:380px">
        <label class="demo-label">Select Plan</label>
        <pui-combobox
          [options]="planOptions"
          [value]="selectedPlan"
          placeholder="Choose a plan…"
          (valueChange)="selectedPlan = $event; cdr.markForCheck()">
        </pui-combobox>
        <p *ngIf="selectedPlan" class="demo-result">Plan: {{ selectedPlan }}</p>
      </div>
    </div>

    <!-- 4. Free text -->
    <div class="demo-section">
      <h3 class="demo-section__title">Free Text Entry</h3>
      <p class="demo-section__desc">Enable <code>allowFreeText</code> to let users type a value not in the list. A "Use …" option appears when no match exists.</p>
      <div style="width:340px">
        <label class="demo-label">Tag or Create New</label>
        <pui-combobox
          [options]="tagOptions"
          [value]="selectedTag"
          placeholder="Search or create a tag…"
          [allowFreeText]="true"
          (valueChange)="selectedTag = $event; cdr.markForCheck()">
        </pui-combobox>
        <p *ngIf="selectedTag" class="demo-result">Tag: "{{ selectedTag }}"</p>
      </div>
    </div>

    <!-- 5. States -->
    <div class="demo-section">
      <h3 class="demo-section__title">States</h3>
      <p class="demo-section__desc">Individual options can be disabled. The full combobox can be disabled. Error and hint states for validation feedback.</p>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        <div style="width:260px">
          <label class="demo-label">Some options disabled</label>
          <pui-combobox
            [options]="statusOptions"
            [value]="selectedStatus"
            placeholder="Select status…"
            (valueChange)="selectedStatus = $event; cdr.markForCheck()">
          </pui-combobox>
        </div>
        <div style="width:260px">
          <label class="demo-label">Disabled</label>
          <pui-combobox
            [options]="countryOptions"
            value="US"
            [disabled]="true"
            placeholder="Select country…">
          </pui-combobox>
        </div>
        <div style="width:260px">
          <label class="demo-label">Error state</label>
          <pui-combobox
            [options]="countryOptions"
            placeholder="Select country…"
            error="Please select a valid country">
          </pui-combobox>
        </div>
      </div>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-combobox</code> is a standalone Web Component with smart JSON-parse setters — pass arrays from Angular with <code>[options]</code> bindings, from React via ref, and from HTML via JS property assignment.</p>

    <div class="fw-tabs">
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='angular'" (click)="fwTab='angular'; cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.310H4.936L12 3.405z" fill="#c3002f"/></svg>
        Angular
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='react'" (click)="fwTab='react'; cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><circle cx="12" cy="12" r="2.05" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/></svg>
        React
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='html'" (click)="fwTab='html'; cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/></svg>
        HTML
      </button>
    </div>

    <div *ngIf="fwTab==='angular'" class="fw-panel">
      <div class="fw-note--angular">Import <code>PuiComboboxComponent</code> into your component's <code>imports</code> array.</div>
      <pre><code>import &#123; PuiComboboxComponent, ComboboxOption &#125; from '&#64;solifi/platform-ui';

&#64;Component(&#123;
  imports: [PuiComboboxComponent],
  template: &#96;
    &lt;pui-combobox
      [options]="options"
      [value]="selected"
      placeholder="Search…"
      [allowFreeText]="true"
      (valueChange)="selected = $event"&gt;
    &lt;/pui-combobox&gt;
  &#96;
&#125;)
export class MyComponent &#123;
  options: ComboboxOption[] = [
    &#123; value: 'a', label: 'Alpha', description: 'First letter' &#125;,
    &#123; value: 'b', label: 'Beta',  group: 'Greek' &#125;,
  ];
  selected: string | number | null = null;
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">Assign the <code>options</code> array via a <code>ref</code> in <code>useEffect</code> — HTML attributes only accept strings.</div>
      <pre><code>import &#123; useRef, useEffect, useState &#125; from 'react';
import '&#64;solifi/platform-ui';

function MyComponent() &#123;
  const ref = useRef(null);
  const [value, setValue] = useState(null);

  useEffect(() =&gt; &#123;
    if (ref.current) &#123;
      ref.current.options = [
        &#123; value: 'ng', label: 'Angular' &#125;,
        &#123; value: 'rx', label: 'React' &#125;,
      ];
    &#125;
  &#125;, []);

  return (
    &lt;pui-combobox
      ref=&#123;ref&#125;
      placeholder="Select framework…"
      onValueChange=&#123;e =&gt; setValue(e.detail)&#125;
    /&gt;
  );
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">Set <code>el.options</code> as a JS property after <code>customElements.whenDefined</code>.</div>
      <pre><code>&lt;pui-combobox id="cb" placeholder="Select…" allow-free-text clearable&gt;&lt;/pui-combobox&gt;

&lt;script&gt;
customElements.whenDefined('pui-combobox').then(() =&gt; &#123;
  const el = document.getElementById('cb');
  el.options = [
    &#123; value: 'ng', label: 'Angular', group: 'Frontend' &#125;,
    &#123; value: 'rx', label: 'React',   group: 'Frontend' &#125;,
    &#123; value: 'nj', label: 'Node.js', group: 'Backend'  &#125;,
  ];
  el.addEventListener('valueChange', e =&gt; console.log(e.detail));
&#125;);
&lt;/script&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">Combobox Quick Reference</h4>
    <div class="xfw-wrap">
      <table class="xfw-table">
        <thead><tr><th>Property</th><th>Angular</th><th>HTML attr</th><th>JS property</th></tr></thead>
        <tbody>
          <tr *ngFor="let r of xfwRows">
            <td><span class="tag-name">{{ r.name }}</span></td>
            <td><span class="tag-ng">{{ r.angular }}</span></td>
            <td><span class="tag-html">{{ r.attr }}</span></td>
            <td><span class="tag-js">{{ r.js }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

  </ng-container>

</docs-page>
  `,
  styles: [`
    .demo-section { margin-bottom: 40px; }
    .demo-section__title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 6px; }
    .demo-section__desc  { font-size: 13px; color: #6b7280; margin-bottom: 14px; }
    .demo-section__desc code { background:#f3f4f6;padding:1px 5px;border-radius:4px;font-size:12px; }
    .demo-label  { font-size:12px;font-weight:600;color:#374151;margin-bottom:6px;display:block; }
    .demo-result { margin-top:8px;font-size:12px;color:#6b7280; }
    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
})
export class ComboboxPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  countryOptions: ComboboxOption[] = [
    { value: 'US', label: 'United States' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'IN', label: 'India' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'BR', label: 'Brazil' },
    { value: 'SG', label: 'Singapore' },
  ];
  selectedCountry: string | number | null = null;

  priorityOptions: ComboboxOption[] = [
    { value: 'critical', label: 'Critical', group: 'High'   },
    { value: 'high',     label: 'High',     group: 'High'   },
    { value: 'medium',   label: 'Medium',   group: 'Medium' },
    { value: 'low',      label: 'Low',      group: 'Low'    },
    { value: 'backlog',  label: 'Backlog',  group: 'Low'    },
  ];
  selectedPriority: string | number | null = null;

  planOptions: ComboboxOption[] = [
    { value: 'free',       label: 'Free',       description: '1 user · 5 projects · community support' },
    { value: 'pro',        label: 'Pro',         description: '5 users · unlimited projects · email support' },
    { value: 'team',       label: 'Team',        description: '20 users · unlimited everything · priority support' },
    { value: 'enterprise', label: 'Enterprise',  description: 'Unlimited users · SLA · dedicated CSM' },
  ];
  selectedPlan: string | number | null = null;

  tagOptions: ComboboxOption[] = [
    { value: 'bug',         label: 'bug' },
    { value: 'feature',     label: 'feature' },
    { value: 'enhancement', label: 'enhancement' },
    { value: 'docs',        label: 'docs' },
    { value: 'refactor',    label: 'refactor' },
    { value: 'security',    label: 'security' },
  ];
  selectedTag: string | number | null = null;

  statusOptions: ComboboxOption[] = [
    { value: 'active',    label: 'Active' },
    { value: 'pending',   label: 'Pending' },
    { value: 'suspended', label: 'Suspended', disabled: true },
    { value: 'deleted',   label: 'Deleted',   disabled: true },
  ];
  selectedStatus: string | number | null = 'active';

  xfwRows = [
    { name: 'options',       angular: '[options]="opts"',          attr: '—',              js: 'el.options = [...]'      },
    { name: 'value',         angular: '[value]="selected"',        attr: 'value="a"',      js: 'el.value = "a"'          },
    { name: 'placeholder',   angular: 'placeholder="…"',           attr: 'placeholder="…"',js: 'el.placeholder = "…"'    },
    { name: 'searchable',    angular: '[searchable]="true"',       attr: 'searchable',     js: 'el.searchable = true'    },
    { name: 'clearable',     angular: '[clearable]="true"',        attr: 'clearable',      js: 'el.clearable = true'     },
    { name: 'allowFreeText', angular: '[allowFreeText]="true"',    attr: 'allow-free-text',js: 'el.allowFreeText = true' },
    { name: 'disabled',      angular: '[disabled]="true"',         attr: 'disabled',       js: 'el.disabled = true'      },
    { name: 'error',         angular: 'error="msg"',               attr: 'error="msg"',    js: 'el.error = "msg"'        },
    { name: 'valueChange',   angular: '(valueChange)="fn($event)"',attr: '—',              js: 'el.addEventListener(…)'  },
  ];

  api: ApiRow[] = [
    { input: 'options',       type: 'ComboboxOption[]',   default: '[]',   description: 'Option list. Each has value, label, and optional group, description, and disabled.' },
    { input: 'value',         type: 'string|number|null', default: 'null', description: 'Currently selected value. Supports two-way binding via (valueChange).' },
    { input: 'placeholder',   type: 'string',             default: '"Select or search…"', description: 'Input placeholder text.' },
    { input: 'searchable',    type: 'boolean',            default: 'true', description: 'Enables type-to-filter on the options list.' },
    { input: 'clearable',     type: 'boolean',            default: 'true', description: 'Shows an × button to clear the current selection.' },
    { input: 'allowFreeText', type: 'boolean',            default: 'false',description: 'Lets users type a value not present in the options list.' },
    { input: 'disabled',      type: 'boolean',            default: 'false',description: 'Disables the entire combobox.' },
    { input: 'error',         type: 'string',             default: '""',   description: 'Validation error message (red border + text below the input).' },
    { input: 'hint',          type: 'string',             default: '""',   description: 'Helper text shown below the input (hidden when error is set).' },
    { input: 'valueChange',   type: 'EventEmitter',       default: '—',    description: 'Emits the selected value (or free-text string) on selection.' },
    { input: 'change',        type: 'EventEmitter',       default: '—',    description: 'Alias for valueChange — preferred in React / HTML event listeners.' },
  ];
}
