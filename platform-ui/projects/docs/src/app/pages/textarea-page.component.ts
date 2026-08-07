import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiTextareaComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

@Component({
  selector: 'docs-textarea-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, PuiTextareaComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Textarea"
  description="A multi-line text input with configurable rows, resize control, character counter, and full validation states. Works in Angular, React, and plain HTML as a Web Component."
  [hasFramework]="true"
  [api]="api">

  <ng-container demo>

    <div class="demo-section">
      <h3 class="demo-section__title">Basic</h3>
      <pui-textarea label="Description" placeholder="Tell us about yourself…"
                    [(ngModel)]="v1" [rows]="rows4" style="width:100%"/>
      <p class="demo-desc">{{ v1.length }} characters</p>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Character Count</h3>
      <pui-textarea label="Bio (max 200)" placeholder="Write your bio…"
                    [(ngModel)]="vBio" [maxLength]="maxLen" [showCount]="showCount"
                    hint="Shown on your public profile" style="width:100%"/>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Sizes</h3>
      <div class="demo-col">
        <pui-textarea label="Small"  size="sm" placeholder="Small textarea"  [rows]="rows3"/>
        <pui-textarea label="Medium" size="md" placeholder="Medium textarea" [rows]="rows3"/>
        <pui-textarea label="Large"  size="lg" placeholder="Large textarea"  [rows]="rows3"/>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Resize Control</h3>
      <div class="demo-row">
        <pui-textarea label="Vertical (default)" resize="vertical" placeholder="Resize vertically" style="flex:1"/>
        <pui-textarea label="No resize"          resize="none"     placeholder="Fixed size"        style="flex:1"/>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Validation States</h3>
      <div class="demo-col">
        <pui-textarea label="Error"     error="Description is required" placeholder="Required…" style="width:100%"/>
        <pui-textarea label="Disabled"  [disabled]="disabledFlag"  placeholder="Cannot edit" style="width:100%"/>
        <pui-textarea label="Read-only" [readonly]="readonlyFlag"  placeholder="Read-only content" style="width:100%"/>
      </div>
    </div>

  </ng-container>

  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-textarea</code> is a Web Component — works in Angular, React, and plain HTML with no extra config. Booleans (<code>disabled</code>, <code>readonly</code>, <code>showCount</code>) accept <code>"true"</code> strings or JS properties. Numbers (<code>rows</code>, <code>maxLength</code>) accept a numeric string attribute or JS property.</p>

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
      <div class="fw-note fw-note--angular">Use <code>[(ngModel)]</code>. All inputs bind natively via property binding — numeric and boolean coercion is automatic.</div>
      <app-code lang="html"       id="ang-html" [text]="angHtml" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
      <app-code lang="typescript" id="ang-ts"   [text]="angTs"   [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='react'" class="fw-panel">
      <div class="fw-note fw-note--react">Use a ref to set numeric/boolean JS properties. Listen to <code>valueChange</code> CustomEvent for text changes.</div>
      <app-code lang="tsx" id="react-code" [text]="reactCode" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='html'" class="fw-panel">
      <div class="fw-note fw-note--html">Numeric attributes like <code>rows="5"</code> are automatically coerced to numbers — no JS needed for simple cases.</div>
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
export class TextareaPageComponent {
  private cdr = inject(ChangeDetectorRef);

  v1 = ''; vBio = '';
  rows4 = 4; rows3 = 3; maxLen = 200; showCount = true;
  disabledFlag = true; readonlyFlag = true;
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
    { name: 'label',       angular: 'label="str"',                  attr: 'label="str"',         js: 'el.label = "..."' },
    { name: 'placeholder', angular: 'placeholder="str"',            attr: 'placeholder="str"',   js: 'el.placeholder = "..."' },
    { name: 'size',        angular: 'size="sm|md|lg"',              attr: 'size="sm|md|lg"',     js: 'el.size = "md"' },
    { name: 'rows',        angular: '[rows]="4"',                   attr: 'rows="4"',            js: 'el.rows = 4' },
    { name: 'maxLength',   angular: '[maxLength]="200"',            attr: 'max-length="200"',    js: 'el.maxLength = 200' },
    { name: 'showCount',   angular: '[showCount]="bool"',           attr: '— use JS property',   js: 'el.showCount = true' },
    { name: 'resize',      angular: 'resize="vertical|none|both"',  attr: 'resize="none"',       js: 'el.resize = "none"' },
    { name: 'disabled',    angular: '[disabled]="bool"',            attr: '— use JS property',   js: 'el.disabled = true' },
    { name: 'readonly',    angular: '[readonly]="bool"',            attr: '— use JS property',   js: 'el.readonly = true' },
    { name: 'required',    angular: '[required]="bool"',            attr: 'required="true"',     js: 'el.required = true' },
    { name: 'error',       angular: '[error]="str"',                attr: 'error="msg"',         js: 'el.error = "msg"' },
    { name: 'hint',        angular: '[hint]="str"',                 attr: 'hint="str"',          js: 'el.hint = "..."' },
    { name: 'valueChange', angular: '(valueChange)="fn($event)"',   attr: '— use addEventListener', js: 'el.addEventListener("valueChange", fn)' },
  ];

  angHtml = `<pui-textarea
  label="Description"
  placeholder="Tell us about yourself…"
  [(ngModel)]="bio"
  [rows]="5"
  [maxLength]="500"
  [showCount]="true"
  hint="Shown on your public profile"/>

<pui-textarea label="No resize" resize="none" [(ngModel)]="notes"/>
<pui-textarea label="Error"     [error]="bioError" [(ngModel)]="bio"/>
<pui-textarea label="Disabled"  [disabled]="true"/>`;

  angTs = `import { PuiTextareaComponent } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiTextareaComponent, FormsModule] })
export class MyComponent {
  bio = ''; notes = ''; bioError = '';

  validateBio() {
    this.bioError = this.bio.length < 10
      ? 'Bio must be at least 10 characters' : '';
  }
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

export function BioEditor() {
  const [bio, setBio] = useState('');
  const taRef = useRef<any>(null);

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.rows      = 5;         // JS property (number)
    el.maxLength = 200;
    el.showCount = true;
    const handler = (e: CustomEvent) => setBio(e.detail);
    el.addEventListener('valueChange', handler);
    return () => el.removeEventListener('valueChange', handler);
  }, []);

  return (
    <>
      <pui-textarea ref={taRef} label="Bio" placeholder="Tell us about yourself…"/>
      <p>{bio.length} / 200</p>
    </>
  );
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<!-- Numeric/string attributes auto-coerced -->
<pui-textarea
  id="bioField"
  label="Bio"
  placeholder="Tell us about yourself…"
  rows="5"
  max-length="200"
  hint="Shown on your public profile">
</pui-textarea>

<pui-textarea label="Fixed size" resize="none" rows="3"></pui-textarea>
<pui-textarea label="Disabled"   disabled="true"></pui-textarea>

<script>
  const el = document.getElementById('bioField');
  el.showCount = true;
  el.addEventListener('valueChange', e => console.log(e.detail.length, 'chars'));
</script>`;

  api: ApiRow[] = [
    { input: 'label',       type: 'string',                default: "''",        description: 'Label shown above the textarea' },
    { input: 'placeholder', type: 'string',                default: "''",        description: 'Placeholder text' },
    { input: 'size',        type: "'sm'|'md'|'lg'",       default: "'md'",      description: 'Visual size variant' },
    { input: 'rows',        type: 'number',                default: '4',         description: 'Initial number of visible rows' },
    { input: 'maxLength',   type: 'number | null',         default: 'null',      description: 'Max character count' },
    { input: 'showCount',   type: 'boolean',               default: 'false',     description: 'Shows character count badge' },
    { input: 'resize',      type: "'both'|'vertical'|'horizontal'|'none'", default: "'vertical'", description: 'CSS resize direction' },
    { input: 'disabled',    type: 'boolean',               default: 'false',     description: 'Disables the field' },
    { input: 'readonly',    type: 'boolean',               default: 'false',     description: 'Makes the field read-only' },
    { input: 'required',    type: 'boolean',               default: 'false',     description: 'Shows required asterisk' },
    { input: 'error',       type: 'string',                default: "''",        description: 'Error message; applies error styling' },
    { input: 'hint',        type: 'string',                default: "''",        description: 'Helper text below the field' },
    { input: 'valueChange', type: 'EventEmitter<string>',  default: '—',         description: 'Emits current value on every keystroke' },
    { input: 'blurred',     type: 'EventEmitter<void>',    default: '—',         description: 'Emits when the field loses focus' },
  ];
}
