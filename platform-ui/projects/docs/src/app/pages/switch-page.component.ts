import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiSwitchComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

@Component({
  selector: 'docs-switch-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, PuiSwitchComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Switch"
  description="A toggle switch for binary on/off settings. Three sizes, dynamic labels per state, error state, and full form integration. Works in Angular, React, and plain HTML."
  [hasFramework]="true"
  [api]="api">

  <ng-container demo>

    <div class="demo-section">
      <h3 class="demo-section__title">Basic</h3>
      <div class="demo-col">
        <pui-switch label="Enable notifications" [(ngModel)]="v1"/>
        <pui-switch label="Dark mode"            [(ngModel)]="v2"/>
        <pui-switch label="Pre-enabled"          [checked]="preChecked"/>
      </div>
      <p class="demo-desc">Notifications: <strong>{{ v1 ? 'On' : 'Off' }}</strong></p>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Sizes</h3>
      <div class="demo-col">
        <pui-switch label="Small"  size="sm" [(ngModel)]="vSm"/>
        <pui-switch label="Medium" size="md" [(ngModel)]="vMd"/>
        <pui-switch label="Large"  size="lg" [(ngModel)]="vLg"/>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">Dynamic Labels</h3>
      <div class="demo-col">
        <pui-switch labelOn="Enabled"  labelOff="Disabled" [(ngModel)]="vDyn1"/>
        <pui-switch labelOn="Active"   labelOff="Inactive" [(ngModel)]="vDyn2"/>
        <pui-switch labelOn="Online"   labelOff="Offline"  [(ngModel)]="vDyn3"/>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section__title">States</h3>
      <div class="demo-col">
        <pui-switch label="Disabled (off)" [disabled]="disabledFlag"/>
        <pui-switch label="Disabled (on)"  [disabled]="disabledFlag" [checked]="preChecked"/>
        <pui-switch label="Error state"    error="This setting is required" [(ngModel)]="vErr"/>
        <pui-switch label="With hint"      hint="Restart required to apply" [(ngModel)]="vHint"/>
      </div>
    </div>

  </ng-container>

  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-switch</code> is a Web Component — works in Angular, React, and plain HTML with no extra config. Boolean inputs (<code>checked</code>, <code>disabled</code>, <code>required</code>) accept <code>true</code>/<code>false</code> JS properties or the string <code>"true"</code> as an HTML attribute. String inputs (<code>label</code>, <code>labelOn</code>, <code>labelOff</code>) work as plain attributes.</p>

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
      <div class="fw-note fw-note--angular">Use <code>[(ngModel)]</code> for two-way binding. All inputs bind natively via property binding — no wrappers needed.</div>
      <app-code lang="html"       id="ang-html" [text]="angHtml" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
      <app-code lang="typescript" id="ang-ts"   [text]="angTs"   [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='react'" class="fw-panel">
      <div class="fw-note fw-note--react">Use a ref to set boolean JS properties. Listen to <code>checkedChange</code> CustomEvent for state changes.</div>
      <app-code lang="tsx" id="react-code" [text]="reactCode" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='html'" class="fw-panel">
      <div class="fw-note fw-note--html">Set boolean attributes as strings or assign JS properties directly after the element is defined.</div>
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
export class SwitchPageComponent {
  private cdr = inject(ChangeDetectorRef);

  v1 = true; v2 = false; vSm = false; vMd = true; vLg = false;
  vDyn1 = true; vDyn2 = false; vDyn3 = true;
  vErr = false; vHint = true;
  preChecked = true; disabledFlag = true;
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
    { name: 'label',         angular: 'label="str"',                     attr: 'label="str"',            js: 'el.label = "..."' },
    { name: 'labelOn',       angular: 'labelOn="On"',                    attr: 'label-on="On"',           js: 'el.labelOn = "On"' },
    { name: 'labelOff',      angular: 'labelOff="Off"',                  attr: 'label-off="Off"',         js: 'el.labelOff = "Off"' },
    { name: 'size',          angular: 'size="sm|md|lg"',                 attr: 'size="sm|md|lg"',         js: 'el.size = "md"' },
    { name: 'checked',       angular: '[checked]="bool" or [(ngModel)]', attr: 'checked="true"',          js: 'el.checked = true' },
    { name: 'disabled',      angular: '[disabled]="bool"',               attr: '— use JS property',       js: 'el.disabled = true' },
    { name: 'required',      angular: '[required]="bool"',               attr: 'required="true"',         js: 'el.required = true' },
    { name: 'error',         angular: '[error]="str"',                   attr: 'error="msg"',             js: 'el.error = "msg"' },
    { name: 'hint',          angular: '[hint]="str"',                    attr: 'hint="str"',              js: 'el.hint = "..."' },
    { name: 'checkedChange', angular: '(checkedChange)="fn($event)"',    attr: '— use addEventListener',  js: 'el.addEventListener("checkedChange", fn)' },
  ];

  angHtml = `<pui-switch label="Enable notifications" [(ngModel)]="notifications"/>

<!-- Dynamic labels -->
<pui-switch labelOn="Active" labelOff="Inactive" [(ngModel)]="isActive"/>

<!-- Sizes -->
<pui-switch label="Small" size="sm" [(ngModel)]="sm"/>
<pui-switch label="Large" size="lg" [(ngModel)]="lg"/>

<!-- States -->
<pui-switch label="Disabled" [disabled]="true" [checked]="true"/>
<pui-switch label="Error"    [error]="'This setting is required'" [(ngModel)]="err"/>`;

  angTs = `import { PuiSwitchComponent } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiSwitchComponent, FormsModule] })
export class MyComponent {
  notifications = true;
  isActive = false;
  sm = false; lg = true; err = false;
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

export function SettingsToggle() {
  const [enabled, setEnabled] = useState(false);
  const swRef = useRef<any>(null);

  useEffect(() => {
    const el = swRef.current;
    if (!el) return;
    const handler = (e: CustomEvent) => setEnabled(e.detail);
    el.addEventListener('checkedChange', handler);
    return () => el.removeEventListener('checkedChange', handler);
  }, []);

  return (
    <>
      <pui-switch
        ref={swRef}
        label="Enable notifications"
        label-on="Enabled"
        label-off="Disabled"
      />
      <p>Status: {enabled ? 'ON' : 'OFF'}</p>
    </>
  );
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-switch id="notifSwitch"
  label="Notifications"
  label-on="Enabled"
  label-off="Disabled">
</pui-switch>

<pui-switch label="Dark mode"  checked="true"></pui-switch>
<pui-switch label="Disabled"   disabled="true" checked="true"></pui-switch>

<script>
  const sw = document.getElementById('notifSwitch');
  sw.checked = true;          // JS property
  sw.addEventListener('checkedChange', e => console.log('Value:', e.detail));
</script>`;

  api: ApiRow[] = [
    { input: 'label',          type: 'string',               default: "''",    description: 'Label text shown next to the switch' },
    { input: 'labelOn',        type: 'string',               default: "''",    description: 'Label when switch is ON (overrides label)' },
    { input: 'labelOff',       type: 'string',               default: "''",    description: 'Label when switch is OFF (overrides label)' },
    { input: 'size',           type: "'sm'|'md'|'lg'",      default: "'md'",  description: 'Visual size variant' },
    { input: 'checked',        type: 'boolean',              default: 'false', description: 'Whether the switch is on' },
    { input: 'disabled',       type: 'boolean',              default: 'false', description: 'Disables interaction' },
    { input: 'required',       type: 'boolean',              default: 'false', description: 'Shows required asterisk' },
    { input: 'error',          type: 'string',               default: "''",    description: 'Error message shown below the switch' },
    { input: 'hint',           type: 'string',               default: "''",    description: 'Helper text shown below the switch' },
    { input: 'checkedChange',  type: 'EventEmitter<boolean>', default: '—',   description: 'Emits the new checked state on toggle' },
    { input: 'changed',        type: 'EventEmitter<boolean>', default: '—',   description: 'Alias output for change events' },
  ];
}
