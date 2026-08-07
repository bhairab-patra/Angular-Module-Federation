import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { PuiChipComponent } from '@solifi/platform-ui';

@Component({
  selector: 'app-chip-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Chip"
  description="Interactive inline elements for filters, selections, and input tags — support removable, selectable, and disabled states in six colour variants."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Variants -->
    <div class="demo-section">
      <h3 class="demo-section__title">Colour Variants</h3>
      <p class="demo-section__desc">Six semantic variants map to the design system colour palette.</p>
      <div class="demo-row">
        <pui-chip variant="default">Default</pui-chip>
        <pui-chip variant="primary">Primary</pui-chip>
        <pui-chip variant="success">Success</pui-chip>
        <pui-chip variant="warning">Warning</pui-chip>
        <pui-chip variant="danger">Danger</pui-chip>
        <pui-chip variant="info">Info</pui-chip>
      </div>
    </div>

    <!-- 2. Sizes -->
    <div class="demo-section">
      <h3 class="demo-section__title">Sizes</h3>
      <p class="demo-section__desc">Two sizes — <code>md</code> (default) and <code>sm</code> — for use in different density contexts.</p>
      <div class="demo-row" style="align-items:center">
        <pui-chip variant="primary" size="md">Medium chip</pui-chip>
        <pui-chip variant="primary" size="sm">Small chip</pui-chip>
      </div>
    </div>

    <!-- 3. Removable -->
    <div class="demo-section">
      <h3 class="demo-section__title">Removable</h3>
      <p class="demo-section__desc">Add a remove (×) button with <code>[removable]="true"</code>. Listen to the <code>(removed)</code> output to update your model.</p>
      <div class="demo-row">
        <pui-chip *ngFor="let tag of activeTags"
          variant="primary"
          [removable]="true"
          (removed)="removeTag(tag)">{{ tag }}</pui-chip>
        <span *ngIf="!activeTags.length" class="demo-empty">All chips removed — refresh to reset.</span>
      </div>
    </div>

    <!-- 4. Selectable / toggle -->
    <div class="demo-section">
      <h3 class="demo-section__title">Selectable</h3>
      <p class="demo-section__desc">Bind <code>[selected]</code> to create toggle chips. The ring highlight follows the active state.</p>
      <div class="demo-row">
        <pui-chip *ngFor="let skill of skills"
          variant="success"
          [selected]="skill.active"
          (clicked)="toggleSkill(skill);cdr.markForCheck()">{{ skill.label }}</pui-chip>
      </div>
      <p class="demo-result" *ngIf="selectedSkills.length">Selected: {{ selectedSkills.join(', ') }}</p>
    </div>

    <!-- 5. Disabled & States -->
    <div class="demo-section">
      <h3 class="demo-section__title">Disabled State</h3>
      <p class="demo-section__desc">Set <code>[disabled]="true"</code> to prevent all interaction including removal.</p>
      <div class="demo-row">
        <pui-chip variant="default"  [disabled]="true">Disabled</pui-chip>
        <pui-chip variant="primary"  [disabled]="true">Disabled</pui-chip>
        <pui-chip variant="success"  [disabled]="true" [removable]="true">Non-removable</pui-chip>
        <pui-chip variant="danger"   [disabled]="true">Disabled</pui-chip>
      </div>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-chip</code> is a standalone Web Component. Use <code>(clicked)</code> and <code>(removed)</code> for interaction in Angular; listen to <code>clicked</code> and <code>removed</code> custom events in React and HTML.</p>

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
      <div class="fw-note--angular">Import <code>PuiChipComponent</code> and iterate with <code>*ngFor</code> for tag-input or filter patterns.</div>
      <pre><code [textContent]="ngExample"></code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">Listen to <code>clicked</code> and <code>removed</code> custom events via <code>addEventListener</code> in a <code>useEffect</code>.</div>
      <pre><code>import '&#64;solifi/platform-ui';

function TagList(&#123; tags, onRemove &#125;) &#123;
  return tags.map(t =&gt; (
    &lt;pui-chip
      key=&#123;t&#125;
      variant="primary"
      removable
      onRemoved=&#123;() =&gt; onRemove(t)&#125;&gt;
      &#123;t&#125;
    &lt;/pui-chip&gt;
  ));
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">All props are kebab-case HTML attributes. Boolean props only need to be present.</div>
      <pre><code>&lt;pui-chip variant="primary" removable id="c1"&gt;Angular&lt;/pui-chip&gt;
&lt;pui-chip variant="success" selected&gt;TypeScript&lt;/pui-chip&gt;
&lt;pui-chip variant="default" disabled&gt;Disabled&lt;/pui-chip&gt;

&lt;script&gt;
document.getElementById('c1').addEventListener('removed', () =&gt; &#123;
  document.getElementById('c1').remove();
&#125;);
&lt;/script&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">Chip Quick Reference</h4>
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
    .demo-row   { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .demo-result { margin-top:10px; font-size:12px; color:#6b7280; }
    .demo-empty  { font-size:13px; color:#9ca3af; font-style:italic; }
    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
})
export class ChipPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  readonly ngExample =
`import { PuiChipComponent } from '@solifi/platform-ui';

@Component({
  imports: [NgFor, PuiChipComponent],
  template: \`
    <pui-chip *ngFor="let t of tags"
      variant="primary"
      [removable]="true"
      (removed)="remove(t)">
      {{ t }}
    </pui-chip>

    <pui-chip *ngFor="let f of filters"
      variant="success"
      [selected]="f.active"
      (clicked)="f.active = !f.active">
      {{ f.label }}
    </pui-chip>
  \`
})
export class MyComponent {
  tags = ['Angular', 'TypeScript', 'RxJS'];
  filters = [
    { label: 'Active',   active: true  },
    { label: 'Archived', active: false },
  ];
  remove(t: string) { this.tags = this.tags.filter(x => x !== t); }
}`;

  activeTags = ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Tailwind'];
  removeTag(tag: string) { this.activeTags = this.activeTags.filter(t => t !== tag); this.cdr.markForCheck(); }

  skills = [
    { label: 'Angular',     active: true  },
    { label: 'React',       active: false },
    { label: 'Vue',         active: false },
    { label: 'TypeScript',  active: true  },
    { label: 'Docker',      active: false },
  ];
  get selectedSkills() { return this.skills.filter(s => s.active).map(s => s.label); }
  toggleSkill(s: { label: string; active: boolean }) { s.active = !s.active; }

  xfwRows = [
    { name: 'variant',   angular: 'variant="primary"',        attr: 'variant="primary"',   js: 'el.variant = "primary"'  },
    { name: 'size',      angular: 'size="sm"',                attr: 'size="sm"',            js: 'el.size = "sm"'          },
    { name: 'selected',  angular: '[selected]="true"',        attr: 'selected',             js: 'el.selected = true'      },
    { name: 'removable', angular: '[removable]="true"',       attr: 'removable',            js: 'el.removable = true'     },
    { name: 'disabled',  angular: '[disabled]="true"',        attr: 'disabled',             js: 'el.disabled = true'      },
    { name: 'clicked',   angular: '(clicked)="fn()"',         attr: '—',                    js: 'el.addEventListener(…)'  },
    { name: 'removed',   angular: '(removed)="fn()"',         attr: '—',                    js: 'el.addEventListener(…)'  },
  ];

  api: ApiRow[] = [
    { input: 'variant',   type: `'default'|'primary'|'success'|'warning'|'danger'|'info'`, default: `'default'`, description: 'Colour variant.' },
    { input: 'size',      type: `'sm'|'md'`,    default: `'md'`,   description: 'Chip size.' },
    { input: 'selected',  type: 'boolean',       default: 'false',  description: 'Renders a selection ring. Bind dynamically to create toggle filters.' },
    { input: 'removable', type: 'boolean',       default: 'false',  description: 'Shows a × button. Disabled chips ignore this prop.' },
    { input: 'disabled',  type: 'boolean',       default: 'false',  description: 'Prevents clicks and hides the remove button.' },
    { input: 'icon',      type: 'string',        default: `''`,     description: 'Raw SVG or emoji rendered before the label.' },
    { input: 'clicked',   type: 'EventEmitter',  default: '—',      description: 'Emits when the chip body is clicked (disabled state suppressed).' },
    { input: 'removed',   type: 'EventEmitter',  default: '—',      description: 'Emits when the × button is clicked.' },
  ];
}
