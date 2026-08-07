import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { PuiTagComponent } from '@solifi/platform-ui';

@Component({
  selector: 'app-tag-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiTagComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Tag"
  description="Compact uppercase labels for categorisation, metadata, and status annotation — eight colour variants in two sizes with no interactive behaviour."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. All variants -->
    <div class="demo-section">
      <h3 class="demo-section__title">Colour Variants</h3>
      <p class="demo-section__desc">Eight variants covering the full semantic palette plus purple and pink for product taxonomy.</p>
      <div class="demo-row">
        <pui-tag variant="default">Default</pui-tag>
        <pui-tag variant="primary">Primary</pui-tag>
        <pui-tag variant="success">Success</pui-tag>
        <pui-tag variant="warning">Warning</pui-tag>
        <pui-tag variant="danger">Danger</pui-tag>
        <pui-tag variant="info">Info</pui-tag>
        <pui-tag variant="purple">Purple</pui-tag>
        <pui-tag variant="pink">Pink</pui-tag>
      </div>
    </div>

    <!-- 2. Sizes -->
    <div class="demo-section">
      <h3 class="demo-section__title">Sizes</h3>
      <p class="demo-section__desc"><code>md</code> works inline with body text; <code>sm</code> suits dense tables and side-by-side labels.</p>
      <div class="demo-row" style="align-items:center">
        <pui-tag variant="primary" size="md">Medium</pui-tag>
        <pui-tag variant="primary" size="sm">Small</pui-tag>
      </div>
    </div>

    <!-- 3. Status usage -->
    <div class="demo-section">
      <h3 class="demo-section__title">Status Labels</h3>
      <p class="demo-section__desc">Tags are ideal for status columns in tables and data lists.</p>
      <div style="display:flex;flex-direction:column;gap:12px;max-width:380px">
        <div class="demo-row-between"><span class="demo-meta">Order #1042</span> <pui-tag variant="success">Delivered</pui-tag></div>
        <div class="demo-row-between"><span class="demo-meta">Order #1041</span> <pui-tag variant="warning">In Transit</pui-tag></div>
        <div class="demo-row-between"><span class="demo-meta">Order #1040</span> <pui-tag variant="danger">Cancelled</pui-tag></div>
        <div class="demo-row-between"><span class="demo-meta">Order #1039</span> <pui-tag variant="info">Processing</pui-tag></div>
        <div class="demo-row-between"><span class="demo-meta">Order #1038</span> <pui-tag variant="default">Pending</pui-tag></div>
      </div>
    </div>

    <!-- 4. Category labels -->
    <div class="demo-section">
      <h3 class="demo-section__title">Category & Taxonomy</h3>
      <p class="demo-section__desc">Use multiple tags together for article categories, product labels, or issue classification.</p>
      <div class="demo-row">
        <pui-tag variant="primary">Frontend</pui-tag>
        <pui-tag variant="purple">Design System</pui-tag>
        <pui-tag variant="info">TypeScript</pui-tag>
        <pui-tag variant="pink">New</pui-tag>
        <pui-tag variant="success">Open Source</pui-tag>
        <pui-tag variant="warning">Beta</pui-tag>
      </div>
    </div>

    <!-- 5. Inside body text -->
    <div class="demo-section">
      <h3 class="demo-section__title">Inline with Text</h3>
      <p class="demo-section__desc">Tags sit neatly inline thanks to <code>display: inline-flex</code> and consistent line-height.</p>
      <p class="demo-prose">
        The <pui-tag variant="success" size="sm">Stable</pui-tag> release of Platform UI v1.3 introduces
        <pui-tag variant="primary" size="sm">Data Grid</pui-tag> and <pui-tag variant="primary" size="sm">Tag</pui-tag>
        components. The previous API is <pui-tag variant="default" size="sm">Deprecated</pui-tag> but still available
        until v2.0, which is currently <pui-tag variant="warning" size="sm">Beta</pui-tag>.
      </p>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-tag</code> is a purely presentational Web Component — no events, no JS required. Pass <code>variant</code> and <code>size</code> as plain HTML attributes and put your label text as the slot content.</p>

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
      <div class="fw-note--angular">Import <code>PuiTagComponent</code> — no additional setup required. Bind <code>variant</code> dynamically for data-driven status columns.</div>
      <pre><code>import &#123; PuiTagComponent &#125; from '&#64;solifi/platform-ui';

&#64;Component(&#123;
  imports: [PuiTagComponent],
  template: &#96;
    &lt;pui-tag variant="success"&gt;Delivered&lt;/pui-tag&gt;
    &lt;pui-tag variant="warning"&gt;In Transit&lt;/pui-tag&gt;
    &lt;pui-tag variant="danger"&gt;Cancelled&lt;/pui-tag&gt;
    &lt;pui-tag variant="info"&gt;Processing&lt;/pui-tag&gt;
    &lt;pui-tag variant="default"&gt;Pending&lt;/pui-tag&gt;
  &#96;
&#125;)
export class MyComponent &#123;&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">No ref or event wiring needed — just render the element with props.</div>
      <pre><code>import '&#64;solifi/platform-ui';

const STATUS_VARIANT = &#123;
  delivered: 'success', cancelled: 'danger',
  transit: 'warning',   processing: 'info',
&#125;;

function StatusTag(&#123; status &#125;) &#123;
  return (
    &lt;pui-tag variant=&#123;STATUS_VARIANT[status] ?? 'default'&#125;&gt;
      &#123;status&#125;
    &lt;/pui-tag&gt;
  );
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">Pure HTML — no JavaScript needed at all.</div>
      <pre><code>&lt;pui-tag variant="success"&gt;Delivered&lt;/pui-tag&gt;
&lt;pui-tag variant="warning"&gt;In Transit&lt;/pui-tag&gt;
&lt;pui-tag variant="danger"&gt;Cancelled&lt;/pui-tag&gt;
&lt;pui-tag variant="info"&gt;Processing&lt;/pui-tag&gt;
&lt;pui-tag variant="purple" size="sm"&gt;Beta&lt;/pui-tag&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">Tag Quick Reference</h4>
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
    .demo-row         { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .demo-row-between { display: flex; justify-content: space-between; align-items: center;
                        padding: 10px 14px; border-radius: 8px; background: #f9fafb; border: 1px solid #f3f4f6; }
    .demo-meta  { font-size: 13px; color: #374151; font-weight: 500; }
    .demo-prose { font-size: 14px; line-height: 1.9; color: #374151; }
    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
})
export class TagPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  xfwRows = [
    { name: 'variant', angular: 'variant="success"', attr: 'variant="success"', js: 'el.variant = "success"' },
    { name: 'size',    angular: 'size="sm"',         attr: 'size="sm"',         js: 'el.size = "sm"'         },
  ];

  api: ApiRow[] = [
    { input: 'variant', type: `'default'|'primary'|'success'|'warning'|'danger'|'info'|'purple'|'pink'`, default: `'default'`, description: 'Colour variant.' },
    { input: 'size',    type: `'sm'|'md'`, default: `'md'`, description: 'Tag size. Use sm in dense tables or alongside body text.' },
  ];
}
