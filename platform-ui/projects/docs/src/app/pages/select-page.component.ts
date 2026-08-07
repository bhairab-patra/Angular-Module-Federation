import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiSelectComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

@Component({
  selector: 'docs-select-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, PuiSelectComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Select"
  description="A styled native dropdown with consistent cross-browser appearance. Supports validation states, disabled options, and custom placeholder. Works in Angular, React, and plain HTML."
  [hasFramework]="true"
  [api]="api">

  <ng-container demo>

    <div class="demo-section">
      <h3 class="demo-section__title">Basic</h3>
      <div class="demo-row">
        <pui-select label="Country" [options]="countries" [(ngModel)]="vCountry"
                    placeholder="Choose a country" style="flex:1"/>
        <pui-select label="Role"    [options]="roles"     [(ngModel)]="vRole" style="flex:1"/>
      </div>
      <p class="demo-desc">Country: <strong>{{ vCountry || '—' }}</strong> · Role: <strong>{{ vRole || '—' }}</strong></p>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Sizes</h3>
      <div class="demo-col">
        <pui-select label="Small"  size="sm" [options]="roles" placeholder="Select role…"/>
        <pui-select label="Medium" size="md" [options]="roles" placeholder="Select role…"/>
        <pui-select label="Large"  size="lg" [options]="roles" placeholder="Select role…"/>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Validation States</h3>
      <div class="demo-row">
        <pui-select label="Error"    [options]="roles" error="Please select a role" style="flex:1"/>
        <pui-select label="Hint"     [options]="roles" hint="Select your job function" style="flex:1"/>
      </div>
      <div class="demo-row" style="margin-top:12px">
        <pui-select label="Required" [options]="roles" [required]="requiredFlag" placeholder="Required" style="flex:1"/>
        <pui-select label="Disabled" [options]="roles" [disabled]="disabledFlag" style="flex:1"/>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">With Disabled Options</h3>
      <pui-select label="Tier" [options]="tiersWithDisabled" [(ngModel)]="vTier" style="width:100%"/>
    </div>

  </ng-container>

  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-select</code> is a Web Component — works in Angular, React, and plain HTML with no extra config. The <code>options</code> array must be set as a JS property from React/HTML — assign <code>el.options = [...]</code> after mount, or use Angular's <code>[options]</code> binding directly.</p>

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
      <div class="fw-note fw-note--angular">Use <code>[(ngModel)]</code> or <code>[formControl]</code>. Pass a typed <code>[options]</code> array — no JSON serialization needed.</div>
      <app-code lang="html"       id="ang-html" [text]="angHtml" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
      <app-code lang="typescript" id="ang-ts"   [text]="angTs"   [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='react'" class="fw-panel">
      <div class="fw-note fw-note--react">Set <code>options</code> as a JS property via ref. Listen to <code>valueChange</code> CustomEvent for selection changes.</div>
      <app-code lang="tsx" id="react-code" [text]="reactCode" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='html'" class="fw-panel">
      <div class="fw-note fw-note--html">Assign <code>options</code> as a JS array property after the element loads, or pass a JSON string attribute.</div>
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
export class SelectPageComponent {
  private cdr = inject(ChangeDetectorRef);

  countries = [
    { label: 'United States', value: 'us' }, { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },        { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
  ];
  roles = [
    { label: 'Developer', value: 'dev' }, { label: 'Designer', value: 'des' },
    { label: 'Manager',   value: 'mgr' }, { label: 'Analyst',  value: 'ana' },
  ];
  tiersWithDisabled = [
    { label: 'Free', value: 'free' },
    { label: 'Pro',  value: 'pro'  },
    { label: 'Enterprise (contact sales)', value: 'ent', disabled: true },
  ];

  vCountry = ''; vRole = ''; vTier = '';
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
    { name: 'label',           angular: 'label="str"',                      attr: 'label="str"',           js: 'el.label = "..."' },
    { name: 'placeholder',     angular: 'placeholder="str"',                attr: 'placeholder="str"',     js: 'el.placeholder = "..."' },
    { name: 'options',         angular: '[options]="optionsArray"',          attr: '— use JS property',     js: 'el.options = [{label,value}]' },
    { name: 'size',            angular: 'size="sm|md|lg"',                  attr: 'size="sm|md|lg"',       js: 'el.size = "md"' },
    { name: 'disabled',        angular: '[disabled]="bool"',                attr: '— use JS property',     js: 'el.disabled = true' },
    { name: 'required',        angular: '[required]="bool"',                attr: 'required="true"',       js: 'el.required = true' },
    { name: 'error',           angular: '[error]="str"',                    attr: 'error="msg"',           js: 'el.error = "msg"' },
    { name: 'hint',            angular: '[hint]="str"',                     attr: 'hint="str"',            js: 'el.hint = "..."' },
    { name: 'valueChange',     angular: '(valueChange)="fn($event)"',       attr: '— use addEventListener', js: 'el.addEventListener("valueChange", fn)' },
    { name: 'selectionChange', angular: '(selectionChange)="fn($event)"',   attr: '— use addEventListener', js: 'el.addEventListener("selectionChange", fn)' },
  ];

  angHtml = `<pui-select
  label="Country"
  [options]="countries"
  [(ngModel)]="selectedCountry"
  placeholder="Choose a country"
  (valueChange)="onCountryChange($event)"/>

<pui-select label="Role" size="sm" [options]="roles" [(ngModel)]="role"/>
<pui-select label="Required" [options]="roles" [required]="true" [error]="roleError"/>
<pui-select label="Disabled" [options]="roles" [disabled]="true"/>`;

  angTs = `import { PuiSelectComponent } from '@bhairab-patra/platform-ui';
import { SelectOption } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiSelectComponent, FormsModule] })
export class MyComponent {
  countries: SelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'Germany',       value: 'de' },
  ];
  roles: SelectOption[] = [
    { label: 'Developer', value: 'dev' },
    { label: 'Designer',  value: 'des' },
  ];
  selectedCountry = ''; role = ''; roleError = '';

  onCountryChange(val: string) { console.log('Country:', val); }
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

const ROLES = [
  { label: 'Developer', value: 'dev' },
  { label: 'Designer',  value: 'des' },
];

export function RolePicker() {
  const [role, setRole] = useState('');
  const selectRef = useRef<any>(null);

  useEffect(() => {
    const el = selectRef.current;
    if (!el) return;
    el.options = ROLES;             // JS property (array)
    const handler = (e: CustomEvent) => setRole(e.detail);
    el.addEventListener('valueChange', handler);
    return () => el.removeEventListener('valueChange', handler);
  }, []);

  return <pui-select ref={selectRef} label="Role" placeholder="Select a role"/>;
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-select id="roleSelect" label="Role" placeholder="Select your role"></pui-select>

<script>
  const el = document.getElementById('roleSelect');

  el.options = [
    { label: 'Developer', value: 'dev' },
    { label: 'Designer',  value: 'des' },
  ];

  // OR: el.setAttribute('options', JSON.stringify([...]));

  el.addEventListener('valueChange', e => console.log('Selected:', e.detail));
</script>`;

  api: ApiRow[] = [
    { input: 'label',           type: 'string',           default: "''",              description: 'Label shown above the select' },
    { input: 'placeholder',     type: 'string',           default: "'Select an option'", description: 'Disabled placeholder option shown when no value selected' },
    { input: 'options',         type: 'SelectOption[]',   default: '[]',              description: 'Array of { label, value, disabled? }' },
    { input: 'size',            type: "'sm'|'md'|'lg'",  default: "'md'",            description: 'Visual size variant' },
    { input: 'disabled',        type: 'boolean',          default: 'false',           description: 'Disables the dropdown' },
    { input: 'required',        type: 'boolean',          default: 'false',           description: 'Shows required asterisk' },
    { input: 'error',           type: 'string',           default: "''",              description: 'Error message; applies error styling' },
    { input: 'hint',            type: 'string',           default: "''",              description: 'Helper text below the dropdown' },
    { input: 'valueChange',     type: 'EventEmitter<any>', default: '—',             description: 'Emits the selected value on change' },
    { input: 'selectionChange', type: 'EventEmitter<any>', default: '—',             description: 'Alias output for selection events' },
  ];
}
