import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiInputComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

@Component({
  selector: 'docs-input-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, PuiInputComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Input"
  description="A single-line text field with focus, hover, error, disabled, and readonly states. Works seamlessly in Angular forms, React, and plain HTML as a Web Component."
  [hasFramework]="true"
  [api]="api">

  <ng-container demo>

    <div class="demo-section">
      <h3 class="demo-section__title">Basic</h3>
      <div class="demo-row">
        <pui-input label="Full name"  placeholder="John Doe"        [(ngModel)]="v1" style="flex:1"/>
        <pui-input label="Email"      placeholder="you@company.com" type="email" [(ngModel)]="v2" style="flex:1"/>
      </div>
      <p class="demo-desc">Name: <strong>{{ v1 || '—' }}</strong></p>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Sizes</h3>
      <div class="demo-col">
        <pui-input label="Small"  size="sm" placeholder="Small input"/>
        <pui-input label="Medium" size="md" placeholder="Medium input (default)"/>
        <pui-input label="Large"  size="lg" placeholder="Large input"/>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Password & Clearable</h3>
      <div class="demo-row">
        <pui-input label="Password" type="password" placeholder="Enter password" [(ngModel)]="vPass" style="flex:1"/>
        <pui-input label="Search"   [clearable]="clearable" placeholder="Type to search…" [(ngModel)]="vSearch" style="flex:1"/>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Character Count</h3>
      <pui-input label="Bio" placeholder="Tell us about yourself" [(ngModel)]="vBio"
                 [maxLength]="maxLen" [showCount]="showCount" style="width:100%"/>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Validation States</h3>
      <div class="demo-row">
        <pui-input label="Disabled"  [disabled]="disabledFlag" placeholder="Cannot edit" style="flex:1"/>
        <pui-input label="Read-only" [readonly]="readonlyFlag" placeholder="Read-only value" style="flex:1"/>
      </div>
      <div class="demo-row" style="margin-top:12px">
        <pui-input label="Error" error="Email is not valid" placeholder="bad@" style="flex:1"/>
        <pui-input label="With hint" hint="We'll never share your email" placeholder="Email" style="flex:1"/>
      </div>
    </div>

  </ng-container>

  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-input</code> is a Web Component — works in Angular, React, and plain HTML with no extra config. String inputs work as HTML attributes. Booleans (<code>disabled</code>, <code>readonly</code>, <code>clearable</code>, <code>showCount</code>) accept <code>"true"</code> strings or JS properties. <code>maxLength</code> accepts a number or numeric string.</p>

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
      <div class="fw-note fw-note--angular">Use <code>[(ngModel)]</code> or <code>[formControl]</code>. All inputs bind natively via property binding — no wrappers needed.</div>
      <app-code lang="html"       id="ang-html" [text]="angHtml" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
      <app-code lang="typescript" id="ang-ts"   [text]="angTs"   [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='react'" class="fw-panel">
      <div class="fw-note fw-note--react">Use a <code>ref</code> to set JS properties. Listen to <code>valueChange</code> CustomEvent for value updates.</div>
      <app-code lang="tsx" id="react-code" [text]="reactCode" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='html'" class="fw-panel">
      <div class="fw-note fw-note--html">String attributes work directly. Use JS to set boolean/numeric properties after the element is defined.</div>
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
export class InputPageComponent {
  private cdr = inject(ChangeDetectorRef);

  v1 = ''; v2 = ''; vPass = ''; vSearch = ''; vBio = '';
  clearable = true; disabledFlag = true; readonlyFlag = true;
  showCount = true; maxLen = 100;
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
    { name: 'label',       angular: 'label="str"',                       attr: 'label="str"',           js: 'el.label = "..."' },
    { name: 'placeholder', angular: 'placeholder="str"',                 attr: 'placeholder="str"',     js: 'el.placeholder = "..."' },
    { name: 'type',        angular: 'type="text|email|password"',        attr: 'type="email"',          js: 'el.type = "email"' },
    { name: 'size',        angular: 'size="sm|md|lg"',                   attr: 'size="sm|md|lg"',       js: 'el.size = "md"' },
    { name: 'disabled',    angular: '[disabled]="bool"',                 attr: '— use JS property',     js: 'el.disabled = true' },
    { name: 'readonly',    angular: '[readonly]="bool"',                 attr: '— use JS property',     js: 'el.readonly = true' },
    { name: 'clearable',   angular: '[clearable]="bool"',                attr: '— use JS property',     js: 'el.clearable = true' },
    { name: 'maxLength',   angular: '[maxLength]="100"',                 attr: 'max-length="100"',      js: 'el.maxLength = 100' },
    { name: 'showCount',   angular: '[showCount]="bool"',                attr: '— use JS property',     js: 'el.showCount = true' },
    { name: 'error',       angular: '[error]="errMsg"',                  attr: 'error="msg"',           js: 'el.error = "msg"' },
    { name: 'hint',        angular: '[hint]="str"',                      attr: 'hint="str"',            js: 'el.hint = "..."' },
    { name: 'valueChange', angular: '(valueChange)="fn($event)"',        attr: '— use addEventListener', js: 'el.addEventListener("valueChange", fn)' },
  ];

  angHtml = `<pui-input label="Full name" placeholder="John Doe" [(ngModel)]="name"/>

<pui-input label="Password" type="password" [(ngModel)]="pass"/>

<pui-input label="Bio" [(ngModel)]="bio"
  [maxLength]="200" [showCount]="true" [clearable]="true"
  hint="Max 200 characters"/>

<pui-input label="Email" [(ngModel)]="email" [error]="emailError" [required]="true"/>
<pui-input label="Read-only" [readonly]="true" placeholder="Fixed value"/>
<pui-input label="Disabled"  [disabled]="true"/>`;

  angTs = `import { PuiInputComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiInputComponent, FormsModule],
})
export class MyComponent {
  name = ''; pass = ''; bio = ''; email = ''; emailError = '';

  validate() {
    this.emailError = this.email.includes('@') ? '' : 'Invalid email address';
  }
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

export function MyForm() {
  const [name, setName] = useState('');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.clearable = true;
    el.maxLength  = 100;
    const handler = (e: CustomEvent) => setName(e.detail);
    el.addEventListener('valueChange', handler);
    return () => el.removeEventListener('valueChange', handler);
  }, []);

  return (
    <>
      <pui-input ref={inputRef} label="Full name" placeholder="John Doe"/>
      <pui-input label="Email"  type="email" placeholder="you@company.com"/>
    </>
  );
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-input id="nameInput" label="Full name" placeholder="John Doe"></pui-input>
<pui-input label="Email" type="email" error="Invalid email"></pui-input>

<script>
  const el = document.getElementById('nameInput');
  el.clearable = true;
  el.maxLength  = 100;
  el.showCount  = true;

  el.addEventListener('valueChange', e => console.log('Value:', e.detail));
</script>`;

  api: ApiRow[] = [
    { input: 'label',       type: 'string',           default: "''",    description: 'Label shown above the input' },
    { input: 'placeholder', type: 'string',           default: "''",    description: 'Placeholder text' },
    { input: 'type',        type: 'InputType',        default: "'text'", description: "text | email | password | number | tel | url" },
    { input: 'size',        type: "'sm'|'md'|'lg'",  default: "'md'",  description: 'Visual size variant' },
    { input: 'disabled',    type: 'boolean',          default: 'false', description: 'Disables the field' },
    { input: 'readonly',    type: 'boolean',          default: 'false', description: 'Makes the field read-only' },
    { input: 'required',    type: 'boolean',          default: 'false', description: 'Shows required asterisk' },
    { input: 'error',       type: 'string',           default: "''",    description: 'Error message; applies error styling' },
    { input: 'hint',        type: 'string',           default: "''",    description: 'Helper text below the field' },
    { input: 'prefixIcon',  type: 'string (HTML)',    default: "''",    description: 'SVG/HTML injected as leading icon' },
    { input: 'suffixIcon',  type: 'string (HTML)',    default: "''",    description: 'SVG/HTML injected as trailing icon' },
    { input: 'maxLength',   type: 'number | null',    default: 'null',  description: 'Max character count' },
    { input: 'showCount',   type: 'boolean',          default: 'false', description: 'Shows character count badge' },
    { input: 'clearable',   type: 'boolean',          default: 'false', description: 'Shows × button to clear the value' },
    { input: 'autocomplete',type: 'string',           default: "'off'", description: 'Native autocomplete attribute' },
    { input: 'valueChange', type: 'EventEmitter<string>', default: '—', description: 'Emits current value on every keystroke' },
    { input: 'blurred',     type: 'EventEmitter<void>',  default: '—', description: 'Emits when the field loses focus' },
  ];
}
