import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { PuiSkeletonComponent } from '@solifi/platform-ui';

@Component({
  selector: 'app-skeleton-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Skeleton Loader"
  description="Animated placeholder shapes that mimic content layout while data is loading — reduces perceived wait time and prevents layout shift."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Text lines -->
    <div class="demo-section">
      <h3 class="demo-section__title">Text Lines</h3>
      <p class="demo-section__desc">Use <code>variant="text"</code> with <code>rows</code> to mimic paragraph content. Widths can vary per instance.</p>
      <div style="width:360px;display:flex;flex-direction:column;gap:10px">
        <pui-skeleton variant="text" width="55%" height="22px"></pui-skeleton>
        <pui-skeleton variant="text" width="100%" height="14px" [rows]="3"></pui-skeleton>
        <pui-skeleton variant="text" width="80%" height="14px"></pui-skeleton>
      </div>
    </div>

    <!-- 2. Circle & Avatar -->
    <div class="demo-section">
      <h3 class="demo-section__title">Circle (Avatar)</h3>
      <p class="demo-section__desc">Use <code>variant="circle"</code> for avatars, icons, or any round placeholder. The <code>width</code> prop controls the diameter.</p>
      <div style="display:flex;align-items:center;gap:16px">
        <pui-skeleton variant="circle" width="32px"></pui-skeleton>
        <pui-skeleton variant="circle" width="44px"></pui-skeleton>
        <pui-skeleton variant="circle" width="64px"></pui-skeleton>
        <pui-skeleton variant="circle" width="80px"></pui-skeleton>
      </div>
    </div>

    <!-- 3. Rect block -->
    <div class="demo-section">
      <h3 class="demo-section__title">Rectangle Block</h3>
      <p class="demo-section__desc">Use <code>variant="rect"</code> for images, banners, chart areas, or video thumbnails.</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <pui-skeleton variant="rect" width="180px" height="120px"></pui-skeleton>
        <pui-skeleton variant="rect" width="180px" height="120px"></pui-skeleton>
        <pui-skeleton variant="rect" width="180px" height="120px"></pui-skeleton>
      </div>
    </div>

    <!-- 4. Card preset -->
    <div class="demo-section">
      <h3 class="demo-section__title">Card Preset</h3>
      <p class="demo-section__desc">The <code>card</code> variant renders an avatar + three text lines in a bordered card — ideal for list or feed placeholders.</p>
      <div style="width:360px">
        <pui-skeleton variant="card" [rows]="3"></pui-skeleton>
      </div>
    </div>

    <!-- 5. Animation toggle -->
    <div class="demo-section">
      <h3 class="demo-section__title">Animation Toggle</h3>
      <p class="demo-section__desc">The shimmer animation is on by default. Set <code>[animated]="false"</code> to render a static grey placeholder.</p>
      <div style="display:flex;gap:32px;flex-wrap:wrap">
        <div>
          <p class="demo-label">Animated (default)</p>
          <div style="width:240px"><pui-skeleton variant="text" width="100%" height="14px" [rows]="4"></pui-skeleton></div>
        </div>
        <div>
          <p class="demo-label">Static</p>
          <div style="width:240px"><pui-skeleton variant="text" width="100%" height="14px" [rows]="4" [animated]="false"></pui-skeleton></div>
        </div>
      </div>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-skeleton</code> is a self-contained Web Component. All props are plain attributes — no JS needed for basic usage. For dynamic loading states in Angular, toggle visibility with <code>*ngIf</code> or <code>[hidden]</code>.</p>

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
      <div class="fw-note--angular">Import <code>PuiSkeletonComponent</code> and toggle it while data is loading.</div>
      <pre><code>import &#123; PuiSkeletonComponent &#125; from '&#64;solifi/platform-ui';

&#64;Component(&#123;
  imports: [NgIf, PuiSkeletonComponent],
  template: &#96;
    &lt;!-- show skeleton while loading, real content after --&gt;
    &lt;ng-container *ngIf="loading; else content"&gt;
      &lt;pui-skeleton variant="card" [rows]="3"&gt;&lt;/pui-skeleton&gt;
    &lt;/ng-container&gt;
    &lt;ng-template #content&gt;
      &lt;user-card [user]="user"&gt;&lt;/user-card&gt;
    &lt;/ng-template&gt;
  &#96;
&#125;)
export class MyComponent &#123;
  loading = true;
  user: User | null = null;

  ngOnInit() &#123;
    this.userService.get(1).subscribe(u =&gt; &#123;
      this.user = u;
      this.loading = false;
    &#125;);
  &#125;
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">Use the element directly — all props are standard HTML attributes.</div>
      <pre><code>import '&#64;solifi/platform-ui';

function UserCard(&#123; loading, user &#125;) &#123;
  if (loading) &#123;
    return &lt;pui-skeleton variant="card" rows="3" /&gt;;
  &#125;
  return &lt;div&gt;&#123;user.name&#125;&lt;/div&gt;;
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">All variants and options are available as kebab-case HTML attributes.</div>
      <pre><code>&lt;!-- text lines --&gt;
&lt;pui-skeleton variant="text" width="100%" height="14px" rows="3"&gt;&lt;/pui-skeleton&gt;

&lt;!-- circle avatar --&gt;
&lt;pui-skeleton variant="circle" width="48px"&gt;&lt;/pui-skeleton&gt;

&lt;!-- image placeholder --&gt;
&lt;pui-skeleton variant="rect" width="100%" height="200px"&gt;&lt;/pui-skeleton&gt;

&lt;!-- card preset --&gt;
&lt;pui-skeleton variant="card"&gt;&lt;/pui-skeleton&gt;

&lt;!-- static (no shimmer) --&gt;
&lt;pui-skeleton variant="text" animated="false"&gt;&lt;/pui-skeleton&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">Skeleton Quick Reference</h4>
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
    .demo-label { font-size:12px;font-weight:600;color:#374151;margin-bottom:8px;display:block; }
    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
})
export class SkeletonPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  xfwRows = [
    { name: 'variant',  angular: 'variant="card"',       attr: 'variant="card"',    js: 'el.variant = "card"'    },
    { name: 'width',    angular: 'width="320px"',        attr: 'width="320px"',     js: 'el.width = "320px"'     },
    { name: 'height',   angular: 'height="14px"',        attr: 'height="14px"',     js: 'el.height = "14px"'     },
    { name: 'rows',     angular: '[rows]="3"',           attr: 'rows="3"',          js: 'el.rows = 3'            },
    { name: 'animated', angular: '[animated]="false"',   attr: 'animated="false"',  js: 'el.animated = false'    },
  ];

  api: ApiRow[] = [
    { input: 'variant',  type: `'text'|'circle'|'rect'|'card'`, default: `'text'`,  description: 'Shape of the skeleton placeholder.' },
    { input: 'width',    type: 'string',  default: `'100%'`,  description: 'CSS width of the skeleton (e.g. "320px", "50%").' },
    { input: 'height',   type: 'string',  default: `'16px'`,  description: 'CSS height. Ignored for circle (diameter = width) and card variants.' },
    { input: 'rows',     type: 'number',  default: '1',       description: 'Number of skeleton rows to render. Useful for paragraph placeholders.' },
    { input: 'animated', type: 'boolean', default: 'true',    description: 'Enables the shimmer sweep animation.' },
  ];
}
