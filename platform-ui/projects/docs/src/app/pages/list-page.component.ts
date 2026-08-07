import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { PuiListComponent, ListItem } from '@solifi/platform-ui';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="List"
  description="A structured vertical list with icons, descriptions, badges, metadata, dividers, and selectable rows — available in four layout variants."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Basic bordered -->
    <div class="demo-section">
      <h3 class="demo-section__title">Bordered (Default)</h3>
      <p class="demo-section__desc">The <code>bordered</code> variant wraps items in a rounded card with dividers between rows.</p>
      <div style="max-width:420px">
        <pui-list [items]="teamItems" variant="bordered"></pui-list>
      </div>
    </div>

    <!-- 2. With descriptions & badges -->
    <div class="demo-section">
      <h3 class="demo-section__title">Descriptions, Badges & Metadata</h3>
      <p class="demo-section__desc">Each item supports a <code>description</code> sub-line, a <code>badge</code> pill, and a <code>meta</code> right-side string.</p>
      <div style="max-width:460px">
        <pui-list [items]="notifItems" variant="bordered"></pui-list>
      </div>
    </div>

    <!-- 3. Selectable -->
    <div class="demo-section">
      <h3 class="demo-section__title">Selectable Rows</h3>
      <p class="demo-section__desc">Enable <code>[selectable]="true"</code> to allow single-row selection. The selected row is highlighted; listen to <code>(itemSelect)</code> for changes.</p>
      <div style="max-width:380px">
        <pui-list [items]="menuItems"
                  variant="bordered"
                  [selectable]="true"
                  [selectedId]="selectedMenu"
                  (itemSelect)="selectedMenu = $event.id; cdr.markForCheck()">
        </pui-list>
        <p *ngIf="selectedMenu" class="demo-result">Selected: <strong>{{ selectedMenu }}</strong></p>
      </div>
    </div>

    <!-- 4. Variants -->
    <div class="demo-section">
      <h3 class="demo-section__title">Layout Variants</h3>
      <p class="demo-section__desc">Four variants — <code>bordered</code>, <code>striped</code>, <code>flush</code>, and <code>default</code> — suit different layout contexts.</p>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        <div style="flex:1;min-width:200px">
          <p class="demo-label">flush</p>
          <pui-list [items]="shortItems" variant="flush"></pui-list>
        </div>
        <div style="flex:1;min-width:200px">
          <p class="demo-label">striped</p>
          <pui-list [items]="shortItems" variant="striped"></pui-list>
        </div>
      </div>
    </div>

    <!-- 5. Dividers & disabled -->
    <div class="demo-section">
      <h3 class="demo-section__title">Dividers & Disabled Items</h3>
      <p class="demo-section__desc">Set <code>divider: true</code> on an item to insert a separator after it. Set <code>disabled: true</code> to make an item non-interactive.</p>
      <div style="max-width:340px">
        <pui-list [items]="actionItems" variant="bordered" [selectable]="true"></pui-list>
      </div>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-list</code> accepts an <code>items</code> array via Angular property binding or a JSON string in HTML. Pass the array via a <code>ref</code> in React.</p>

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
      <div class="fw-note--angular">Import <code>PuiListComponent</code> and bind the <code>items</code> array directly.</div>
      <pre><code>import &#123; PuiListComponent, ListItem &#125; from '&#64;solifi/platform-ui';

&#64;Component(&#123;
  imports: [PuiListComponent],
  template: &#96;
    &lt;pui-list
      [items]="items"
      variant="bordered"
      [selectable]="true"
      [selectedId]="selected"
      (itemSelect)="selected = $event.id"&gt;
    &lt;/pui-list&gt;
  &#96;
&#125;)
export class MyComponent &#123;
  selected: string | number | null = null;
  items: ListItem[] = [
    &#123; id: '1', label: 'Dashboard', description: 'Overview metrics', badge: '3' &#125;,
    &#123; id: '2', label: 'Reports',   meta: 'Updated 2h ago' &#125;,
    &#123; id: '3', label: 'Settings',  disabled: true &#125;,
  ];
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">Set the <code>items</code> array via a ref in <code>useEffect</code>.</div>
      <pre><code>import &#123; useRef, useEffect, useState &#125; from 'react';
import '&#64;solifi/platform-ui';

function MyList() &#123;
  const ref = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() =&gt; &#123;
    if (ref.current) &#123;
      ref.current.items = [
        &#123; id: '1', label: 'Dashboard', badge: '3' &#125;,
        &#123; id: '2', label: 'Reports',   meta: '2h ago' &#125;,
      ];
    &#125;
  &#125;, []);

  return (
    &lt;pui-list ref=&#123;ref&#125; variant="bordered" selectable
      onItemSelect=&#123;e =&gt; setSelected(e.detail.id)&#125; /&gt;
  );
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">Assign <code>items</code> as a JS property after element upgrade.</div>
      <pre><code>&lt;pui-list id="list" variant="bordered" selectable&gt;&lt;/pui-list&gt;

&lt;script&gt;
customElements.whenDefined('pui-list').then(() =&gt; &#123;
  const el = document.getElementById('list');
  el.items = [
    &#123; id: '1', label: 'Dashboard', badge: '3' &#125;,
    &#123; id: '2', label: 'Reports',   meta: '2h ago' &#125;,
    &#123; id: '3', label: 'Settings',  disabled: true &#125;,
  ];
  el.addEventListener('itemSelect', e =&gt; console.log(e.detail));
&#125;);
&lt;/script&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">List Quick Reference</h4>
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
    .demo-label  { font-size:12px;font-weight:600;color:#374151;margin-bottom:8px; }
    .demo-result { margin-top:10px;font-size:12px;color:#6b7280; }
    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
})
export class ListPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';
  selectedMenu: string | number | null = 'dashboard';

  teamItems: ListItem[] = [
    { id: 1, label: 'Alice Johnson',  description: 'Senior Engineer · Engineering',  meta: 'Online'  },
    { id: 2, label: 'Bob Smith',      description: 'Product Designer · Design',       meta: 'Away'    },
    { id: 3, label: 'Carol Williams', description: 'Product Manager · Product',       meta: 'Offline' },
    { id: 4, label: 'David Brown',    description: 'Frontend Engineer · Engineering', meta: 'Online'  },
  ];

  notifItems: ListItem[] = [
    { id: 1, label: 'New comment on PR #142', description: 'Alice left a review on your pull request.',     badge: 'New',  meta: '2m ago'  },
    { id: 2, label: 'Deployment succeeded',   description: 'v1.3.0 was deployed to production.',            badge: '✓',    meta: '1h ago'  },
    { id: 3, label: 'Build failed',           description: 'The staging pipeline failed on step "test".',              meta: '3h ago'  },
    { id: 4, label: 'Scheduled maintenance',  description: 'Downtime window: Saturday 02:00–04:00 UTC.',               meta: 'Tomorrow'},
  ];

  menuItems: ListItem[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports',   label: 'Reports'   },
    { id: 'settings',  label: 'Settings'  },
  ];

  shortItems: ListItem[] = [
    { id: 1, label: 'Getting Started' },
    { id: 2, label: 'Installation'    },
    { id: 3, label: 'Configuration'   },
    { id: 4, label: 'Components'      },
  ];

  actionItems: ListItem[] = [
    { id: 'edit',    label: 'Edit profile'  },
    { id: 'billing', label: 'Billing',      divider: true },
    { id: 'invite',  label: 'Invite member' },
    { id: 'export',  label: 'Export data'   },
    { id: 'delete',  label: 'Delete account', disabled: true },
  ];

  xfwRows = [
    { name: 'items',      angular: '[items]="items"',          attr: '—',              js: 'el.items = [...]'        },
    { name: 'variant',    angular: 'variant="flush"',          attr: 'variant="flush"',js: 'el.variant = "flush"'    },
    { name: 'selectable', angular: '[selectable]="true"',      attr: 'selectable',     js: 'el.selectable = true'    },
    { name: 'selectedId', angular: '[selectedId]="id"',        attr: '—',              js: 'el.selectedId = "id"'    },
    { name: 'itemSelect', angular: '(itemSelect)="fn($event)"',attr: '—',              js: 'el.addEventListener(…)'  },
  ];

  api: ApiRow[] = [
    { input: 'items',      type: 'ListItem[]', default: '[]',         description: 'Array of list items. Each has id, label, and optional description, icon, badge, meta, disabled, divider.' },
    { input: 'variant',    type: `'bordered'|'striped'|'flush'|'default'`, default: `'bordered'`, description: 'Visual layout of the list.' },
    { input: 'selectable', type: 'boolean',    default: 'false',      description: 'Enables clickable rows with a selection highlight.' },
    { input: 'selectedId', type: 'string|number|null', default: 'null', description: 'Currently selected item id.' },
    { input: 'itemSelect', type: 'EventEmitter<ListItem>', default: '—', description: 'Emits the clicked ListItem when selectable is true.' },
  ];
}
