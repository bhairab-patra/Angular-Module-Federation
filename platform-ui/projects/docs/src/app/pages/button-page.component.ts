import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { ButtonComponent, FileUploadButtonComponent } from '@solifi/platform-ui';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, ButtonComponent, FileUploadButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Button"
  description="Fully configurable shared button — 11 variants, 3 sizes, dynamic labels, upload progress, and file upload. Wire any action, label, or state from the parent."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Variant grid -->
    <div class="demo-section">
      <h3 class="demo-section__title">Variants & States</h3>
      <p class="demo-section__desc">All 11 variants shown at Default, Hover, Focused, and Disabled states.</p>
      <div class="variant-table">
        <div class="vt-head"></div>
        <div class="vt-head">Default</div>
        <div class="vt-head">Hover</div>
        <div class="vt-head">Focused</div>
        <div class="vt-head">Disabled</div>

        <div class="vt-label">Primary</div>
        <div class="vt-cell"><pui-button variant="primary">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="primary" forceState="hover">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="primary" forceState="focus">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="primary" [disabled]="true">Button</pui-button></div>

        <div class="vt-label">Primary Light</div>
        <div class="vt-cell"><pui-button variant="primary-light">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="primary-light" forceState="hover">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="primary-light" forceState="focus">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="primary-light" [disabled]="true">Button</pui-button></div>

        <div class="vt-label">Primary Outline</div>
        <div class="vt-cell"><pui-button variant="primary-outline">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="primary-outline" forceState="hover">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="primary-outline" forceState="focus">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="primary-outline" [disabled]="true">Button</pui-button></div>

        <div class="vt-label">Secondary</div>
        <div class="vt-cell"><pui-button variant="secondary">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="secondary" forceState="hover">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="secondary" forceState="focus">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="secondary" [disabled]="true">Button</pui-button></div>

        <div class="vt-label">Secondary Light</div>
        <div class="vt-cell"><pui-button variant="secondary-light">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="secondary-light" forceState="hover">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="secondary-light" forceState="focus">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="secondary-light" [disabled]="true">Button</pui-button></div>

        <div class="vt-label">Tertiary Outline</div>
        <div class="vt-cell"><pui-button variant="tertiary-outline">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="tertiary-outline" forceState="hover">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="tertiary-outline" forceState="focus">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="tertiary-outline" [disabled]="true">Button</pui-button></div>

        <div class="vt-label">Text Button</div>
        <div class="vt-cell"><pui-button variant="text">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="text" forceState="hover">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="text" forceState="focus">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="text" [disabled]="true">Button</pui-button></div>

        <div class="vt-label">Destructive</div>
        <div class="vt-cell"><pui-button variant="destructive">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="destructive" forceState="hover">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="destructive" forceState="focus">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="destructive" [disabled]="true">Button</pui-button></div>

        <div class="vt-label">Destructive Light</div>
        <div class="vt-cell"><pui-button variant="destructive-light">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="destructive-light" forceState="hover">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="destructive-light" forceState="focus">Button</pui-button></div>
        <div class="vt-cell"><pui-button variant="destructive-light" [disabled]="true">Button</pui-button></div>

        <div class="vt-label">Chip</div>
        <div class="vt-cell"><pui-button variant="chip">Chip</pui-button></div>
        <div class="vt-cell"><pui-button variant="chip" forceState="hover">Chip</pui-button></div>
        <div class="vt-cell"><pui-button variant="chip" forceState="focus">Chip</pui-button></div>
        <div class="vt-cell"><pui-button variant="chip" [disabled]="true">Chip</pui-button></div>
      </div>
    </div>

    <!-- 2. Sizes -->
    <div class="demo-section">
      <h3 class="demo-section__title">Sizes</h3>
      <p class="demo-section__desc">Three sizes — <code>sm</code>, <code>md</code> (default), and <code>lg</code> — scale padding and font size while keeping the same border radius.</p>
      <div class="demo-row" style="align-items:center">
        <pui-button variant="primary" size="sm">Small</pui-button>
        <pui-button variant="primary" size="md">Medium</pui-button>
        <pui-button variant="primary" size="lg">Large</pui-button>
        <pui-button variant="secondary" size="sm">Small</pui-button>
        <pui-button variant="secondary" size="md">Medium</pui-button>
        <pui-button variant="secondary" size="lg">Large</pui-button>
      </div>
    </div>

    <!-- 3. File upload -->
    <div class="demo-section">
      <h3 class="demo-section__title">File Upload</h3>
      <p class="demo-section__desc"><code>pui-file-button</code> opens a native file picker and emits the <code>FileList</code> via <code>(fileSelected)</code>.</p>
      <div class="demo-row">
        <pui-file-button
          label="Choose File"
          fileTypesLabel=".pdf, .png, .doc"
          accept=".pdf,.png,.doc"
          (fileSelected)="onFileSelected($event)">
        </pui-file-button>
      </div>
      <p *ngIf="selectedFile" class="demo-result">Selected: <strong>{{ selectedFile }}</strong></p>
    </div>

    <!-- 4. Upload progress -->
    <div class="demo-section">
      <h3 class="demo-section__title">Upload Progress</h3>
      <p class="demo-section__desc">Use <code>variant="upload-progress"</code> with a <code>[progress]</code> value (0–100) to show an inline fill bar.</p>
      <div class="progress-col">
        <pui-button variant="upload-progress" label="Idle (0%)"        [progress]="0"   [fullWidth]="true"></pui-button>
        <pui-button variant="upload-progress" label="Uploading (45%)"  [progress]="45"  [fullWidth]="true"></pui-button>
        <pui-button variant="upload-progress" label="Almost done (80%)" [progress]="80" [fullWidth]="true"></pui-button>
      </div>
    </div>

    <!-- 5. Live playground -->
    <div class="demo-section">
      <h3 class="demo-section__title">Live Playground</h3>
      <p class="demo-section__desc">Adjust label, variant, and disabled state in real time.</p>
      <div class="live-demo">
        <div class="live-controls">
          <label class="ctrl-label">Label
            <input class="ctrl-input" [value]="demoLabel" (input)="demoLabel = $any($event.target).value; cdr.markForCheck()" placeholder="Button label">
          </label>
          <label class="ctrl-label">Variant
            <select class="ctrl-input" (change)="demoVariant = $any($event.target).value; cdr.markForCheck()">
              <option *ngFor="let v of variantOptions" [value]="v" [selected]="v === demoVariant">{{ v }}</option>
            </select>
          </label>
          <label class="ctrl-label" style="flex-direction:row;align-items:center;gap:8px">
            <input type="checkbox" [checked]="demoDisabled" (change)="demoDisabled = $any($event.target).checked; cdr.markForCheck()">
            Disabled
          </label>
        </div>
        <div class="live-preview">
          <pui-button [variant]="demoVariant" [label]="demoLabel" [disabled]="demoDisabled"></pui-button>
        </div>
      </div>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-button</code> supports static text via <code>ng-content</code> or a dynamic <code>[label]</code> input. All click, focus, hover, and blur events are emitted as typed Angular <code>EventEmitter</code>s or DOM custom events.</p>

    <div class="fw-tabs">
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='angular'" (click)="fwTab='angular';cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.310H4.936L12 3.405z" fill="#c3002f"/></svg>
        Angular
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='react'" (click)="fwTab='react';cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><circle cx="12" cy="12" r="2.05" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/></svg>
        React
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='html'" (click)="fwTab='html';cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/></svg>
        HTML
      </button>
    </div>

    <div *ngIf="fwTab==='angular'" class="fw-panel">
      <div class="fw-note--angular">Import <code>ButtonComponent</code> (and optionally <code>FileUploadButtonComponent</code>) into your component's <code>imports</code> array.</div>
      <pre><code>import &#123; ButtonComponent, FileUploadButtonComponent &#125; from '&#64;solifi/platform-ui';

&#64;Component(&#123;
  imports: [ButtonComponent, FileUploadButtonComponent],
  template: &#96;
    &lt;!-- Static label via ng-content --&gt;
    &lt;pui-button variant="primary" (buttonClick)="onSave($event)"&gt;Save&lt;/pui-button&gt;

    &lt;!-- Dynamic label input --&gt;
    &lt;pui-button [variant]="btnVariant" [label]="btnLabel" [disabled]="isBusy"&gt;&lt;/pui-button&gt;

    &lt;!-- Upload progress --&gt;
    &lt;pui-button variant="upload-progress" [label]="'Uploading…'" [progress]="pct" [fullWidth]="true"&gt;&lt;/pui-button&gt;

    &lt;!-- File picker --&gt;
    &lt;pui-file-button label="Attach File" accept=".pdf,.png" (fileSelected)="onFile($event)"&gt;&lt;/pui-file-button&gt;
  &#96;
&#125;)
export class MyComponent &#123;
  btnVariant = 'secondary';
  btnLabel   = 'Cancel';
  isBusy     = false;
  pct        = 60;

  onSave(e: MouseEvent)    &#123; /* ... */ &#125;
  onFile(f: FileList)      &#123; console.log(f[0].name); &#125;
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">Listen to DOM custom events via <code>onButtonclick</code> (camelCase). Pass booleans as string attributes or via a ref for JS property access.</div>
      <pre><code>import '&#64;solifi/platform-ui';

function Actions(&#123; onSave, isSaving &#125;) &#123;
  return (
    &lt;&gt;
      &lt;pui-button
        variant="primary"
        onButtonclick=&#123;onSave&#125;
        disabled=&#123;isSaving ? '' : undefined&#125;&gt;
        Save
      &lt;/pui-button&gt;

      &lt;pui-button
        variant="secondary"
        onButtonclick=&#123;() =&gt; history.back()&#125;&gt;
        Cancel
      &lt;/pui-button&gt;
    &lt;/&gt;
  );
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">Boolean props (<code>disabled</code>, <code>loading</code>, <code>full-width</code>) only need to be present as attributes. Listen to events with <code>addEventListener</code>.</div>
      <pre><code>&lt;pui-button id="btn-save" variant="primary"&gt;Save Changes&lt;/pui-button&gt;
&lt;pui-button variant="secondary"&gt;Cancel&lt;/pui-button&gt;
&lt;pui-button variant="destructive" disabled&gt;Delete&lt;/pui-button&gt;
&lt;pui-button variant="primary" full-width&gt;Full Width&lt;/pui-button&gt;

&lt;script&gt;
  document.getElementById('btn-save')
    .addEventListener('buttonClick', e =&gt; console.log('clicked', e));
&lt;/script&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">Button Quick Reference</h4>
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
    .demo-section { margin-bottom: 48px; }
    .demo-section__title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 6px; }
    .demo-section__desc  { font-size: 13px; color: #6b7280; margin-bottom: 14px; }
    .demo-section__desc code { background:#f3f4f6;padding:1px 5px;border-radius:4px;font-size:12px; }
    .demo-row  { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
    .demo-result { margin-top:10px;font-size:12px;color:#6b7280; }

    .variant-table {
      display: grid;
      grid-template-columns: 148px repeat(4, 1fr);
      gap: 10px 12px;
      align-items: center;
    }
    .vt-head { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#9ca3af;padding-bottom:4px;border-bottom:1px solid #f3f4f6; }
    .vt-label { font-size:13px;color:#374151;font-weight:500; }
    .vt-cell  { display:flex;align-items:center; }

    .progress-col { display:flex;flex-direction:column;gap:12px;max-width:480px; }

    .live-demo { display:grid;grid-template-columns:1fr 1fr;gap:16px; }
    .live-controls { display:flex;flex-direction:column;gap:10px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px; }
    .ctrl-label { display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.05em; }
    .ctrl-input { padding:6px 10px;border:1px solid #e5e7eb;border-radius:6px;font-size:13px;font-family:inherit;background:#fff; }
    .live-preview { display:flex;align-items:center;justify-content:center;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:24px; }

    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
})
export class ButtonPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  demoLabel    = 'Save Changes';
  demoVariant: any = 'primary';
  demoDisabled = false;
  selectedFile = '';

  variantOptions = [
    'primary', 'primary-light', 'primary-outline',
    'secondary', 'secondary-light',
    'tertiary-outline', 'text',
    'destructive', 'destructive-light', 'chip',
  ];

  onFileSelected(files: FileList): void {
    this.selectedFile = files[0]?.name ?? '';
    this.cdr.markForCheck();
  }

  xfwRows = [
    { name: 'variant',   angular: 'variant="primary"',       attr: 'variant="primary"',  js: 'el.variant = "primary"'   },
    { name: 'label',     angular: '[label]="label"',          attr: '—',                  js: 'el.label = "Save"'        },
    { name: 'size',      angular: 'size="lg"',                attr: 'size="lg"',           js: 'el.size = "lg"'           },
    { name: 'disabled',  angular: '[disabled]="true"',        attr: 'disabled',            js: 'el.disabled = true'       },
    { name: 'loading',   angular: '[loading]="true"',         attr: 'loading',             js: 'el.loading = true'        },
    { name: 'fullWidth', angular: '[fullWidth]="true"',       attr: 'full-width',          js: 'el.fullWidth = true'      },
    { name: 'progress',  angular: '[progress]="pct"',         attr: 'progress="50"',       js: 'el.progress = 50'         },
    { name: 'buttonClick', angular: '(buttonClick)="fn($event)"', attr: '—',              js: 'el.addEventListener(…)'   },
  ];

  api: ApiRow[] = [
    { input: 'variant',      type: `'primary'|'primary-light'|'primary-outline'|'secondary'|'secondary-light'|'tertiary-outline'|'text'|'destructive'|'destructive-light'|'chip'|'upload-progress'`, default: `'primary'`, description: 'Visual style of the button.' },
    { input: 'label',        type: 'string',                  default: 'undefined', description: 'Dynamic text label rendered inside the button; overrides ng-content when set.' },
    { input: 'size',         type: `'sm'|'md'|'lg'`,          default: `'md'`,      description: 'Button size — scales padding and font.' },
    { input: 'disabled',     type: 'boolean',                 default: 'false',     description: 'Disables interaction and reduces opacity to 40%.' },
    { input: 'loading',      type: 'boolean',                 default: 'false',     description: 'Shows a spinner and blocks click events.' },
    { input: 'progress',     type: 'number (0–100)',           default: '0',         description: 'Upload fill percentage (variant="upload-progress" only).' },
    { input: 'fullWidth',    type: 'boolean',                 default: 'false',     description: 'Stretches the button to 100% of its container.' },
    { input: 'type',         type: `'button'|'submit'|'reset'`, default: `'button'`, description: 'Native HTML button type attribute.' },
    { input: '(buttonClick)', type: 'EventEmitter<MouseEvent>', default: '—',        description: 'Fired on click — suppressed when disabled or loading.' },
    { input: '(buttonFocus)', type: 'EventEmitter<FocusEvent>', default: '—',        description: 'Fired when the button receives focus.' },
    { input: '(buttonBlur)',  type: 'EventEmitter<FocusEvent>', default: '—',        description: 'Fired when the button loses focus.' },
    { input: '(buttonHover)', type: 'EventEmitter<MouseEvent>', default: '—',        description: 'Fired on mouseenter.' },
    { input: '(buttonLeave)', type: 'EventEmitter<MouseEvent>', default: '—',        description: 'Fired on mouseleave.' },
  ];
}
