import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiCheckboxComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

@Component({
  selector: 'docs-checkbox-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, PuiCheckboxComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Checkbox"
  description="A styled checkbox with checked, indeterminate, error, and disabled states. Works with Angular forms, React refs, and plain HTML via Web Component."
  [hasFramework]="true"
  [api]="api">

  <ng-container demo>

    <div class="demo-section">
      <h3 class="demo-section__title">Basic</h3>
      <div class="demo-col">
        <pui-checkbox label="Accept terms and conditions" [(ngModel)]="v1"/>
        <pui-checkbox label="Subscribe to newsletter"    [(ngModel)]="v2"/>
        <pui-checkbox label="Pre-checked"               [checked]="preChecked"/>
      </div>
      <p class="demo-desc">Terms: <strong>{{ v1 ? 'Accepted' : 'Not accepted' }}</strong></p>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Indeterminate</h3>
      <div class="demo-col">
        <pui-checkbox label="Select all" [indeterminate]="indeterminate"/>
        <pui-checkbox label="Option A"   [checked]="preChecked"/>
        <pui-checkbox label="Option B"/>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">States</h3>
      <div class="demo-col">
        <pui-checkbox label="Disabled (unchecked)" [disabled]="disabledFlag"/>
        <pui-checkbox label="Disabled (checked)"   [disabled]="disabledFlag" [checked]="preChecked"/>
        <pui-checkbox label="Error state" error="You must accept the terms" [(ngModel)]="vErr"/>
        <pui-checkbox label="With hint"  hint="We'll never spam you" [(ngModel)]="vHint"/>
        <pui-checkbox label="Required"   [required]="requiredFlag"/>
      </div>
    </div>

  </ng-container>

  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-checkbox</code> is a Web Component — works in Angular, React, and plain HTML with no extra config. Boolean inputs (<code>checked</code>, <code>disabled</code>, <code>indeterminate</code>, <code>required</code>) accept <code>true</code>/<code>false</code> JS properties or the string <code>"true"</code> as an HTML attribute.</p>

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
      <div class="fw-note fw-note--angular">All Angular template bindings work directly — <code>[(ngModel)]</code>, <code>[formControl]</code>, <code>[checked]</code>, <code>(checkedChange)</code>.</div>
      <app-code lang="html"       id="ang-html"   [text]="angHtml"   [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
      <app-code lang="typescript" id="ang-ts"     [text]="angTs"     [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='react'" class="fw-panel">
      <div class="fw-note fw-note--react">Use a <code>ref</code> to set <code>.checked</code> as a JS property. Listen to the <code>checkedChange</code> CustomEvent.</div>
      <app-code lang="tsx" id="react-code" [text]="reactCode" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='html'" class="fw-panel">
      <div class="fw-note fw-note--html">Set boolean attributes as strings or use JS to assign properties directly on the element.</div>
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
export class CheckboxPageComponent {
  private cdr = inject(ChangeDetectorRef);

  v1 = false; v2 = true; vErr = false; vHint = false;
  preChecked = true; indeterminate = true; disabledFlag = true; requiredFlag = true;
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
    { name: 'label',         angular: 'label="str"',                       attr: 'label="str"',           js: 'el.label = "..."' },
    { name: 'checked',       angular: '[checked]="bool" or [(ngModel)]',   attr: 'checked="true"',        js: 'el.checked = true' },
    { name: 'indeterminate', angular: '[indeterminate]="bool"',            attr: 'indeterminate="true"',  js: 'el.indeterminate = true' },
    { name: 'disabled',      angular: '[disabled]="bool"',                 attr: 'disabled="true"',       js: 'el.disabled = true' },
    { name: 'required',      angular: '[required]="bool"',                 attr: 'required="true"',       js: 'el.required = true' },
    { name: 'error',         angular: '[error]="str"',                     attr: 'error="msg"',           js: 'el.error = "msg"' },
    { name: 'hint',          angular: '[hint]="str"',                      attr: 'hint="str"',            js: 'el.hint = "..."' },
    { name: 'checkedChange', angular: '(checkedChange)="fn($event)"',      attr: '— use addEventListener', js: 'el.addEventListener("checkedChange", fn)' },
  ];

  angHtml = `<pui-checkbox
  label="Accept terms"
  [(ngModel)]="accepted"
  (checkedChange)="onCheck($event)"/>

<pui-checkbox label="Select all" [indeterminate]="partial" [checked]="allSelected"/>
<pui-checkbox label="Disabled"   [disabled]="true" [checked]="true"/>
<pui-checkbox label="Required"   [required]="true" [error]="formError" hint="Hint text"/>`;

  angTs = `import { PuiCheckboxComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiCheckboxComponent, FormsModule],
})
export class MyComponent {
  accepted    = false;
  partial     = true;
  allSelected = false;
  formError   = '';

  onCheck(val: boolean) {
    this.formError = val ? '' : 'You must accept the terms.';
  }
}`;

  reactCode = `import { useEffect, useRef } from 'react';

export function MyForm() {
  const cbRef = useRef<any>(null);

  useEffect(() => {
    const el = cbRef.current;
    if (!el) return;
    const handler = (e: CustomEvent) => console.log('checked:', e.detail);
    el.addEventListener('checkedChange', handler);
    return () => el.removeEventListener('checkedChange', handler);
  }, []);

  return (
    <pui-checkbox
      ref={cbRef}
      label="Accept terms and conditions"
      required="true"
    />
  );
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-checkbox label="Accept terms"></pui-checkbox>
<pui-checkbox label="Pre-checked"   checked="true"></pui-checkbox>
<pui-checkbox label="Indeterminate" indeterminate="true"></pui-checkbox>
<pui-checkbox label="Disabled"      disabled="true"></pui-checkbox>

<script>
  const cb = document.querySelector('pui-checkbox');
  cb.checked = true;                              // JS property
  cb.addEventListener('checkedChange', e => {
    console.log('New value:', e.detail);
  });
</script>`;

  api: ApiRow[] = [
    { input: 'label',         type: 'string',  default: "''",     description: 'Label text shown next to the checkbox' },
    { input: 'checked',       type: 'boolean', default: 'false',  description: 'Whether the checkbox is checked' },
    { input: 'indeterminate', type: 'boolean', default: 'false',  description: 'Indeterminate (partial-select) state' },
    { input: 'disabled',      type: 'boolean', default: 'false',  description: 'Disables interaction' },
    { input: 'required',      type: 'boolean', default: 'false',  description: 'Shows required asterisk' },
    { input: 'error',         type: 'string',  default: "''",     description: 'Error message; hides hint when set' },
    { input: 'hint',          type: 'string',  default: "''",     description: 'Helper text shown below the checkbox' },
    { input: 'checkedChange', type: 'EventEmitter<boolean>', default: '—', description: 'Emits the new checked value on change' },
    { input: 'changed',       type: 'EventEmitter<boolean>', default: '—', description: 'Alias output for change events' },
  ];
}
