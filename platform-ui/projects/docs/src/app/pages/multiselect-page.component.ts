import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { PuiMultiSelectComponent, MultiSelectOption } from '@solifi/platform-ui';

@Component({
  selector: 'app-multiselect-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiMultiSelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Multi Select"
  description="A multi-value dropdown with chips, search, select-all, and keyboard navigation — works in Angular, React, and plain HTML."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Basic -->
    <div class="demo-section">
      <h3 class="demo-section__title">Basic Multi Select</h3>
      <p class="demo-section__desc">Choose one or more items from a searchable dropdown. Selected values appear as chips in the trigger.</p>
      <div style="width:340px">
        <label class="demo-label">Assign Team Members</label>
        <pui-multiselect
          [options]="teamOptions"
          [value]="teamSelected"
          placeholder="Search team members…"
          [searchable]="true"
          [showSelectAll]="true"
          (valueChange)="teamSelected = $event; cdr.markForCheck()">
        </pui-multiselect>
        <p *ngIf="teamSelected.length" class="demo-result">Selected: {{ teamSelected.join(', ') }}</p>
      </div>
    </div>

    <!-- 2. Grouped -->
    <div class="demo-section">
      <h3 class="demo-section__title">Grouped Options</h3>
      <p class="demo-section__desc">Options can be organised into named groups by setting a <code>group</code> field on each option.</p>
      <div style="width:360px">
        <label class="demo-label">Select Technologies</label>
        <pui-multiselect
          [options]="techOptions"
          [value]="techSelected"
          placeholder="Pick your stack…"
          [showSelectAll]="true"
          (valueChange)="techSelected = $event; cdr.markForCheck()">
        </pui-multiselect>
        <p *ngIf="techSelected.length" class="demo-result">{{ techSelected.length }} selected: {{ techSelected.join(', ') }}</p>
      </div>
    </div>

    <!-- 3. Chip limit -->
    <div class="demo-section">
      <h3 class="demo-section__title">Chip Limit &amp; Badge Count</h3>
      <p class="demo-section__desc">When more items are selected than <code>maxChips</code>, a single count badge replaces individual chips.</p>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        <div style="width:300px">
          <label class="demo-label">Max 2 chips (then badge)</label>
          <pui-multiselect
            [options]="skillOptions"
            [value]="skillSelected"
            placeholder="Select skills…"
            [maxChips]="2"
            (valueChange)="skillSelected = $event; cdr.markForCheck()">
          </pui-multiselect>
        </div>
        <div style="width:300px">
          <label class="demo-label">Always badge (maxChips=1)</label>
          <pui-multiselect
            [options]="skillOptions"
            [value]="skillSelected2"
            placeholder="Select skills…"
            [maxChips]="1"
            (valueChange)="skillSelected2 = $event; cdr.markForCheck()">
          </pui-multiselect>
        </div>
      </div>
    </div>

    <!-- 4. Disabled -->
    <div class="demo-section">
      <h3 class="demo-section__title">Disabled Options &amp; Disabled State</h3>
      <p class="demo-section__desc">Individual options can be disabled via their <code>disabled</code> flag. The entire component can be disabled too.</p>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        <div style="width:300px">
          <label class="demo-label">Some options disabled</label>
          <pui-multiselect
            [options]="roleOptions"
            [value]="roleSelected"
            placeholder="Select roles…"
            (valueChange)="roleSelected = $event; cdr.markForCheck()">
          </pui-multiselect>
        </div>
        <div style="width:300px">
          <label class="demo-label">Entire component disabled</label>
          <pui-multiselect
            [options]="teamOptions"
            [value]="['alice','bob']"
            [disabled]="true"
            placeholder="Select team members…">
          </pui-multiselect>
        </div>
      </div>
    </div>

    <!-- 5. States -->
    <div class="demo-section">
      <h3 class="demo-section__title">Validation States</h3>
      <p class="demo-section__desc">Pass <code>error</code> for a validation message (red border + text) or <code>hint</code> for helper text.</p>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        <div style="width:300px">
          <label class="demo-label">Error state</label>
          <pui-multiselect
            [options]="skillOptions"
            placeholder="Select at least one skill…"
            error="Please select at least one skill">
          </pui-multiselect>
        </div>
        <div style="width:300px">
          <label class="demo-label">With hint</label>
          <pui-multiselect
            [options]="skillOptions"
            [value]="['angular']"
            placeholder="Select skills…"
            hint="You can select multiple skills">
          </pui-multiselect>
        </div>
      </div>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-multiselect</code> is a standalone Web Component — the same element tag works in Angular, React, and plain HTML. The <code>options</code> and <code>value</code> inputs accept typed arrays (Angular binding) or JSON strings (HTML attribute).</p>

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
      <div class="fw-note--angular">Import <code>PuiMultiSelectComponent</code> into your component's <code>imports</code> array.</div>
      <pre><code>// component.ts
import &#123; PuiMultiSelectComponent, MultiSelectOption &#125; from '&#64;solifi/platform-ui';

&#64;Component(&#123;
  imports: [PuiMultiSelectComponent],
  template: &#96;
    &lt;pui-multiselect
      [options]="options"
      [value]="selected"
      placeholder="Select items…"
      [searchable]="true"
      [showSelectAll]="true"
      (valueChange)="selected = $event"&gt;
    &lt;/pui-multiselect&gt;
  &#96;
&#125;)
export class MyComponent &#123;
  options: MultiSelectOption[] = [
    &#123; value: 'a', label: 'Alpha' &#125;,
    &#123; value: 'b', label: 'Beta', group: 'Greek' &#125;,
  ];
  selected: (string | number)[] = [];
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">Use a <code>ref</code> to pass arrays — HTML attributes accept JSON strings only.</div>
      <pre><code>import &#123; useRef, useEffect, useState &#125; from 'react';
import '&#64;solifi/platform-ui';

function MyComponent() &#123;
  const ref = useRef(null);
  const [selected, setSelected] = useState([]);

  useEffect(() =&gt; &#123;
    if (ref.current) &#123;
      ref.current.options = [
        &#123; value: 'a', label: 'Alpha' &#125;,
        &#123; value: 'b', label: 'Beta' &#125;,
      ];
    &#125;
  &#125;, []);

  return (
    &lt;pui-multiselect
      ref=&#123;ref&#125;
      placeholder="Select items…"
      onValueChange=&#123;e =&gt; setSelected(e.detail)&#125;
    /&gt;
  );
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">Assign array properties via JS after <code>customElements.whenDefined</code>.</div>
      <pre><code>&lt;pui-multiselect id="ms" placeholder="Select items…" searchable show-select-all&gt;&lt;/pui-multiselect&gt;

&lt;script&gt;
customElements.whenDefined('pui-multiselect').then(() =&gt; &#123;
  const el = document.getElementById('ms');
  el.options = [
    &#123; value: 'a', label: 'Alpha' &#125;,
    &#123; value: 'b', label: 'Beta' &#125;,
  ];
  el.addEventListener('valueChange', e =&gt; console.log(e.detail));
&#125;);
&lt;/script&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">Multi Select Quick Reference</h4>
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
    .demo-label { font-size:12px;font-weight:600;color:#374151;margin-bottom:6px;display:block; }
    .demo-result { margin-top:8px;font-size:12px;color:#6b7280; }

    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
})
export class MultiSelectPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  teamOptions: MultiSelectOption[] = [
    { value: 'alice',  label: 'Alice Johnson',  group: 'Engineering' },
    { value: 'bob',    label: 'Bob Smith',       group: 'Engineering' },
    { value: 'carol',  label: 'Carol Williams',  group: 'Design' },
    { value: 'david',  label: 'David Brown',     group: 'Design' },
    { value: 'eve',    label: 'Eve Davis',       group: 'Product' },
    { value: 'frank',  label: 'Frank Miller',    group: 'Product' },
  ];
  teamSelected: (string | number)[] = ['alice'];

  techOptions: MultiSelectOption[] = [
    { value: 'angular',  label: 'Angular',    group: 'Frontend' },
    { value: 'react',    label: 'React',      group: 'Frontend' },
    { value: 'vue',      label: 'Vue',        group: 'Frontend' },
    { value: 'node',     label: 'Node.js',    group: 'Backend'  },
    { value: 'java',     label: 'Java',       group: 'Backend'  },
    { value: 'python',   label: 'Python',     group: 'Backend'  },
    { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
    { value: 'mongo',    label: 'MongoDB',    group: 'Database' },
    { value: 'redis',    label: 'Redis',      group: 'Database' },
  ];
  techSelected: (string | number)[] = ['angular', 'node'];

  skillOptions: MultiSelectOption[] = [
    { value: 'angular',    label: 'Angular' },
    { value: 'react',      label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'docker',     label: 'Docker' },
    { value: 'k8s',        label: 'Kubernetes' },
    { value: 'aws',        label: 'AWS' },
  ];
  skillSelected:  (string | number)[] = ['angular', 'react', 'typescript'];
  skillSelected2: (string | number)[] = ['angular', 'react', 'docker'];

  roleOptions: MultiSelectOption[] = [
    { value: 'admin',    label: 'Admin' },
    { value: 'editor',   label: 'Editor' },
    { value: 'viewer',   label: 'Viewer' },
    { value: 'billing',  label: 'Billing',   disabled: true },
    { value: 'superuser',label: 'Superuser', disabled: true },
  ];
  roleSelected: (string | number)[] = ['editor'];

  xfwRows = [
    { name: 'options',       angular: '[options]="opts"',         attr: "options='[…]'",      js: 'el.options = [...]'      },
    { name: 'value',         angular: '[value]="selected"',       attr: "value='[\"a\"]'",    js: 'el.value = ["a"]'        },
    { name: 'placeholder',   angular: 'placeholder="…"',          attr: 'placeholder="…"',    js: 'el.placeholder = "…"'    },
    { name: 'searchable',    angular: '[searchable]="true"',      attr: 'searchable',         js: 'el.searchable = true'    },
    { name: 'showSelectAll', angular: '[showSelectAll]="true"',   attr: 'show-select-all',    js: 'el.showSelectAll = true' },
    { name: 'maxChips',      angular: '[maxChips]="2"',           attr: 'max-chips="2"',      js: 'el.maxChips = 2'         },
    { name: 'disabled',      angular: '[disabled]="true"',        attr: 'disabled',           js: 'el.disabled = true'      },
    { name: 'error',         angular: 'error="msg"',              attr: 'error="msg"',        js: 'el.error = "msg"'        },
    { name: 'hint',          angular: 'hint="msg"',               attr: 'hint="msg"',         js: 'el.hint = "msg"'         },
    { name: 'valueChange',   angular: '(valueChange)="fn($event)"', attr: '—',               js: 'el.addEventListener(…)'  },
  ];

  api: ApiRow[] = [
    { input: 'options',       type: 'MultiSelectOption[]', default: '[]',              description: 'Array of option objects. Each has value, label, and optional group and disabled.' },
    { input: 'value',         type: '(string|number)[]',  default: '[]',              description: 'Currently selected values. Supports two-way binding via (valueChange).' },
    { input: 'placeholder',   type: 'string',             default: '"Select options…"', description: 'Placeholder shown when no items are selected.' },
    { input: 'searchable',    type: 'boolean',            default: 'true',            description: 'Shows a search input inside the dropdown.' },
    { input: 'showSelectAll', type: 'boolean',            default: 'true',            description: 'Shows Select all / Clear action links above the list.' },
    { input: 'maxChips',      type: 'number',             default: '3',               description: 'Maximum chips shown before collapsing to a count badge.' },
    { input: 'disabled',      type: 'boolean',            default: 'false',           description: 'Disables the entire component.' },
    { input: 'error',         type: 'string',             default: '""',              description: 'Error message — adds red border and displays below the trigger.' },
    { input: 'hint',          type: 'string',             default: '""',              description: 'Helper text shown below the trigger (hidden when error is set).' },
    { input: 'valueChange',   type: 'EventEmitter',       default: '—',               description: 'Emits the updated selected-values array on every change.' },
    { input: 'change',        type: 'EventEmitter',       default: '—',               description: 'Alias for valueChange — useful in React / HTML event listeners.' },
  ];
}
