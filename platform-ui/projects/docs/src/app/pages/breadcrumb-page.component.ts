import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@solifi/platform-ui';

@Component({
  selector: 'app-breadcrumb-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Breadcrumb"
  description="A navigational trail showing the user's location in the page hierarchy — four separator styles and full CSS variable theming."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Basic -->
    <div class="demo-section">
      <h3 class="demo-section__title">Basic</h3>
      <p class="demo-section__desc">Pass an array of <code>BreadcrumbItem</code> objects. The last item is the active page — rendered in a distinct colour without a link.</p>
      <pui-breadcrumb [items]="basic"></pui-breadcrumb>
    </div>

    <!-- 2. Separators -->
    <div class="demo-section">
      <h3 class="demo-section__title">Separator Styles</h3>
      <p class="demo-section__desc">Choose from four built-in separators: <code>chevron</code> (default), <code>slash</code>, <code>dot</code>, and <code>arrow</code>.</p>
      <div class="sep-grid">
        <div *ngFor="let s of separators" class="sep-row">
          <span class="sep-label">{{ s.name }}</span>
          <pui-breadcrumb [items]="basic" [separator]="$any(s.name)"></pui-breadcrumb>
        </div>
      </div>
    </div>

    <!-- 3. Deep path -->
    <div class="demo-section">
      <h3 class="demo-section__title">Deep Path</h3>
      <p class="demo-section__desc">Works naturally with arbitrarily deep hierarchies. Items with an <code>href</code> become links; items without are plain text.</p>
      <pui-breadcrumb [items]="deepPath"></pui-breadcrumb>
    </div>

    <!-- 4. With icons -->
    <div class="demo-section">
      <h3 class="demo-section__title">Items with Icons</h3>
      <p class="demo-section__desc">Each <code>BreadcrumbItem</code> accepts an optional <code>icon</code> SVG string rendered before the label.</p>
      <pui-breadcrumb [items]="withIcons"></pui-breadcrumb>
    </div>

    <!-- 5. Custom separator (CSS var) -->
    <div class="demo-section">
      <h3 class="demo-section__title">CSS Variable Theming</h3>
      <p class="demo-section__desc">Override link colour, separator colour, and font size via CSS custom properties — no component config required.</p>
      <div class="theme-demo">
        <pui-breadcrumb [items]="basic" class="themed-bc"></pui-breadcrumb>
      </div>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-breadcrumb</code> accepts an <code>items</code> array via Angular property binding or as a JS property after element upgrade. All separator values are plain HTML attribute strings.</p>

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
      <div class="fw-note--angular">Import <code>BreadcrumbComponent</code> and bind the <code>items</code> array directly.</div>
      <pre><code>import &#123; BreadcrumbComponent, BreadcrumbItem &#125; from '&#64;solifi/platform-ui';

&#64;Component(&#123;
  imports: [BreadcrumbComponent],
  template: &#96;
    &lt;pui-breadcrumb
      [items]="crumbs"
      separator="chevron"
      ariaLabel="Page navigation"&gt;
    &lt;/pui-breadcrumb&gt;
  &#96;
&#125;)
export class MyComponent &#123;
  crumbs: BreadcrumbItem[] = [
    &#123; label: 'Home',     route: '/'          &#125;,
    &#123; label: 'Products', route: '/products'  &#125;,
    &#123; label: 'Widget'                        &#125;,
  ];
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">Set the <code>items</code> array via a ref — it is an object array and cannot be passed as an HTML attribute.</div>
      <pre><code>import &#123; useRef, useEffect &#125; from 'react';
import '&#64;solifi/platform-ui';

function Nav() &#123;
  const ref = useRef(null);

  useEffect(() =&gt; &#123;
    if (ref.current) &#123;
      ref.current.items = [
        &#123; label: 'Home',     route: '/'         &#125;,
        &#123; label: 'Products', route: '/products' &#125;,
        &#123; label: 'Widget'                       &#125;,
      ];
    &#125;
  &#125;, []);

  return &lt;pui-breadcrumb ref=&#123;ref&#125; separator="chevron" /&gt;;
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">Assign <code>items</code> as a JS property — it cannot be serialised as an HTML attribute.</div>
      <pre><code>&lt;pui-breadcrumb id="bc" separator="slash"&gt;&lt;/pui-breadcrumb&gt;

&lt;script&gt;
customElements.whenDefined('pui-breadcrumb').then(() =&gt; &#123;
  document.getElementById('bc').items = [
    &#123; label: 'Home',     route: '/'         &#125;,
    &#123; label: 'Products', route: '/products' &#125;,
    &#123; label: 'Widget'                       &#125;,
  ];
&#125;);
&lt;/script&gt;

&lt;!-- CSS variable theming --&gt;
&lt;style&gt;
  pui-breadcrumb &#123;
    --pui-bc-link-color:   #0fa78d;
    --pui-bc-active-color: #111827;
    --pui-bc-sep-color:    #d1d5db;
    --pui-bc-size:         13px;
  &#125;
&lt;/style&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">Breadcrumb Quick Reference</h4>
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
    .sep-grid { display:flex;flex-direction:column;gap:14px; }
    .sep-row  { display:flex;align-items:center;gap:20px; }
    .sep-label { font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.06em;min-width:60px; }
    .theme-demo { padding:16px 20px;background:#f0fdfa;border:1px solid #99f6e4;border-radius:10px; }
    .themed-bc { --pui-bc-link-color:#0d9488;--pui-bc-link-hover:#0f766e;--pui-bc-active-color:#134e4a;--pui-bc-sep-color:#5eead4;--pui-bc-size:13px; }
    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
})
export class BreadcrumbPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  basic: BreadcrumbItem[] = [
    { label: 'Home',     route: '/' },
    { label: 'Settings', route: '/settings' },
    { label: 'Profile' },
  ];

  separators = [
    { name: 'chevron' },
    { name: 'slash'   },
    { name: 'dot'     },
    { name: 'arrow'   },
  ];

  deepPath: BreadcrumbItem[] = [
    { label: 'Home',        route: '/'                   },
    { label: 'Platform',    route: '/platform'           },
    { label: 'Engineering', route: '/platform/eng'       },
    { label: 'Services',    route: '/platform/eng/svc'   },
    { label: 'Auth API'                                  },
  ];

  withIcons: BreadcrumbItem[] = [
    {
      label: 'Home', route: '/',
      icon: '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>',
    },
    {
      label: 'Components', route: '/components',
      icon: '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"/></svg>',
    },
    { label: 'Breadcrumb' },
  ];

  xfwRows = [
    { name: 'items',     angular: '[items]="items"',          attr: '—',                 js: 'el.items = [...]'           },
    { name: 'separator', angular: 'separator="slash"',        attr: 'separator="slash"', js: 'el.separator = "slash"'     },
    { name: 'ariaLabel', angular: 'ariaLabel="Navigation"',   attr: 'aria-label="…"',    js: 'el.ariaLabel = "…"'         },
  ];

  api: ApiRow[] = [
    { input: 'items',     type: 'BreadcrumbItem[]', default: '[]',        description: 'Navigation items. Each has a label, an optional href for the link, and an optional icon SVG string.' },
    { input: 'separator', type: `'chevron'|'slash'|'dot'|'arrow'`, default: `'chevron'`, description: 'Visual separator rendered between breadcrumb items.' },
    { input: 'ariaLabel', type: 'string',            default: `'Breadcrumb'`, description: 'Accessible label for the <nav> landmark element.' },
  ];
}
