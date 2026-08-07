import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiRadioGroupComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

@Component({
  selector: 'docs-radio-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, PuiRadioGroupComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Radio Group"
  description="A group of radio buttons for single-selection. Supports vertical and horizontal layouts, per-option hints, and disabled states. Works in Angular, React, and plain HTML."
  [hasFramework]="true"
  [api]="api">

  <ng-container demo>

    <div class="demo-section">
      <h3 class="demo-section__title">Basic — Vertical</h3>
      <div class="demo-row">
        <pui-radio-group label="Subscription" [options]="plans"   [(ngModel)]="vPlan"/>
        <pui-radio-group label="Contact via"  [options]="contact" [(ngModel)]="vContact"/>
      </div>
      <p class="demo-desc">Plan: <strong>{{ vPlan || 'none' }}</strong> · Contact: <strong>{{ vContact || 'none' }}</strong></p>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Horizontal Layout</h3>
      <pui-radio-group label="Size" [options]="sizes" [(ngModel)]="vSize" direction="horizontal"/>
      <p class="demo-desc">Size: <strong>{{ vSize || 'none' }}</strong></p>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">With Hints & Error</h3>
      <div class="demo-row">
        <pui-radio-group label="Priority" [options]="priority" [(ngModel)]="vPri" hint="Choose urgency level"/>
        <pui-radio-group label="Region"   [options]="regions"  [(ngModel)]="vReg" error="Selection is required" [required]="requiredFlag"/>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Disabled</h3>
      <pui-radio-group label="Locked" [options]="plans" [disabled]="disabledFlag" [(ngModel)]="vPlan"/>
    </div>

  </ng-container>

  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-radio-group</code> is a Web Component — works in Angular, React, and plain HTML with no extra config. The <code>options</code> array must be passed as a JS property — assign <code>el.options = [...]</code> after mount, or pass a JSON string attribute. Angular uses <code>[options]</code> binding natively.</p>

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
      <div class="fw-note fw-note--angular">Use <code>[(ngModel)]</code>. Pass a typed <code>[options]</code> array directly — no JSON serialization needed.</div>
      <app-code lang="html"       id="ang-html"   [text]="angHtml"   [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
      <app-code lang="typescript" id="ang-ts"     [text]="angTs"     [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='react'" class="fw-panel">
      <div class="fw-note fw-note--react">Set <code>options</code> as a JS property via ref. Listen to <code>valueChange</code> CustomEvent for selection changes.</div>
      <app-code lang="tsx" id="react-code" [text]="reactCode" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='html'" class="fw-panel">
      <div class="fw-note fw-note--html">Assign <code>options</code> as a JS array property or pass a JSON string as an attribute.</div>
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
export class RadioPageComponent {
  private cdr = inject(ChangeDetectorRef);

  plans   = [{ label: 'Free',         value: 'free' },
             { label: 'Pro — $9/mo',  value: 'pro'  },
             { label: 'Enterprise',   value: 'ent'  }];
  contact = [{ label: 'Email', value: 'email' },
             { label: 'Phone', value: 'phone' },
             { label: 'Slack', value: 'slack' }];
  sizes   = [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }];
  priority = [
    { label: 'Low',    value: 'low',    hint: 'Response within 3 days'  },
    { label: 'Medium', value: 'medium', hint: 'Response within 24 hours' },
    { label: 'High',   value: 'high',   hint: 'Response within 2 hours' },
  ];
  regions = [{ label: 'Americas', value: 'amer' }, { label: 'EMEA', value: 'emea' }, { label: 'APAC', value: 'apac' }];

  vPlan = 'free'; vContact = ''; vSize = 'md'; vPri = ''; vReg = '';
  disabledFlag = true; requiredFlag = true;
  fw = 'angular';
  copied = '';

  copy(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  xfwRows = [
    { name: 'label',       angular: 'label="str"',                    attr: 'label="str"',            js: 'el.label = "..."' },
    { name: 'options',     angular: '[options]="optionsArray"',        attr: '— use JS property',      js: 'el.options = [{label,value}]' },
    { name: 'disabled',    angular: '[disabled]="bool"',               attr: 'disabled="true"',        js: 'el.disabled = true' },
    { name: 'required',    angular: '[required]="bool"',               attr: 'required="true"',        js: 'el.required = true' },
    { name: 'error',       angular: '[error]="str"',                   attr: 'error="msg"',            js: 'el.error = "msg"' },
    { name: 'hint',        angular: '[hint]="str"',                    attr: 'hint="str"',             js: 'el.hint = "..."' },
    { name: 'direction',   angular: 'direction="vertical|horizontal"', attr: 'direction="horizontal"', js: 'el.direction = "horizontal"' },
    { name: 'valueChange', angular: '(valueChange)="fn($event)"',      attr: '— use addEventListener', js: 'el.addEventListener("valueChange", fn)' },
  ];

  angHtml = `<pui-radio-group
  label="Subscription plan"
  [options]="plans"
  [(ngModel)]="selectedPlan"
  (valueChange)="onPlanChange($event)"/>

<pui-radio-group label="Size" [options]="sizes" [(ngModel)]="size" direction="horizontal"/>

<pui-radio-group label="Region" [options]="regions"
  [(ngModel)]="region" [error]="regionError" [required]="true"/>
<pui-radio-group label="Locked" [options]="plans" [disabled]="true"/>`;

  angTs = `import { PuiRadioGroupComponent } from '@bhairab-patra/platform-ui';
import { RadioOption } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiRadioGroupComponent, FormsModule] })
export class MyComponent {
  plans: RadioOption[] = [
    { label: 'Free',       value: 'free' },
    { label: 'Pro',        value: 'pro'  },
    { label: 'Enterprise', value: 'ent'  },
  ];
  sizes:       RadioOption[] = [{label:'S',value:'sm'},{label:'M',value:'md'}];
  regions:     RadioOption[] = [{label:'Americas',value:'amer'},{label:'EMEA',value:'emea'}];
  selectedPlan = 'free';
  size = 'md'; region = ''; regionError = '';

  onPlanChange(val: string) { console.log('Plan:', val); }
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

const OPTIONS = [
  { label: 'Free', value: 'free' },
  { label: 'Pro',  value: 'pro'  },
];

export function PlanPicker() {
  const [plan, setPlan] = useState('free');
  const radioRef = useRef<any>(null);

  useEffect(() => {
    const el = radioRef.current;
    if (!el) return;
    el.options = OPTIONS;                // JS property (array)
    const handler = (e: CustomEvent) => setPlan(e.detail);
    el.addEventListener('valueChange', handler);
    return () => el.removeEventListener('valueChange', handler);
  }, []);

  return <pui-radio-group ref={radioRef} label="Subscription"/>;
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-radio-group id="planGroup" label="Subscription plan"></pui-radio-group>

<script>
  const el = document.getElementById('planGroup');

  // Set options as a JS property
  el.options = [
    { label: 'Free', value: 'free' },
    { label: 'Pro',  value: 'pro'  },
  ];

  // OR pass as JSON string attribute
  // el.setAttribute('options', JSON.stringify([...]));

  el.addEventListener('valueChange', e => console.log('Selected:', e.detail));
</script>`;

  api: ApiRow[] = [
    { input: 'label',      type: 'string',          default: "''",        description: 'Legend label for the radio group' },
    { input: 'options',    type: 'RadioOption[]',   default: '[]',        description: 'Array of { label, value, hint?, disabled? }' },
    { input: 'disabled',   type: 'boolean',         default: 'false',     description: 'Disables all options in the group' },
    { input: 'required',   type: 'boolean',         default: 'false',     description: 'Shows required asterisk on the legend' },
    { input: 'error',      type: 'string',          default: "''",        description: 'Error message shown below the group' },
    { input: 'hint',       type: 'string',          default: "''",        description: 'Helper text shown below the group' },
    { input: 'direction',  type: "'vertical'|'horizontal'", default: "'vertical'", description: 'Layout direction of the options' },
    { input: 'groupName',  type: 'string',          default: 'auto',      description: 'HTML name attribute for radio inputs (auto-generated)' },
    { input: 'valueChange',type: 'EventEmitter<any>', default: '—',       description: 'Emits the selected value on change' },
    { input: 'changed',    type: 'EventEmitter<any>', default: '—',       description: 'Alias output for change events' },
  ];
}
