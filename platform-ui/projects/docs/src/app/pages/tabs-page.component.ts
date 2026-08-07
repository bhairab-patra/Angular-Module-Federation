import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PuiTabsComponent, TabItem } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

@Component({
  selector: 'docs-tabs-page',
  standalone: true,
  imports: [NgFor, NgIf, PuiTabsComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Tabs"
  description="A flexible tab navigation component with three visual variants (line, pill, card), horizontal/vertical orientation, keyboard navigation, badge counts, icons, and disabled state. Works in Angular, React, and plain HTML."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Line (default) -->
    <div class="demo-section">
      <h3 class="demo-section__title">Line variant (default)</h3>
      <pui-tabs [tabs]="basicTabs" (tabChange)="lineActive = $event.id">
        <div class="tab-content-demo">
          <p *ngIf="lineActive === 'overview'  || !lineActive">Overview panel — product summary, KPIs, and top-level metrics for this account.</p>
          <p *ngIf="lineActive === 'analytics'">Analytics panel — charts, funnels, and cohort breakdowns rendered here.</p>
          <p *ngIf="lineActive === 'settings'">Settings panel — configure notifications, integrations, and team access.</p>
        </div>
      </pui-tabs>
    </div>

    <!-- 2. Pill -->
    <div class="demo-section">
      <h3 class="demo-section__title">Pill variant</h3>
      <pui-tabs variant="pill" [tabs]="pillTabs" (tabChange)="pillActive = $event.id">
        <div class="tab-content-demo">
          <p *ngIf="pillActive === 'all'  || !pillActive">Showing <strong>all 24</strong> records across all statuses.</p>
          <p *ngIf="pillActive === 'active'">Showing <strong>18 active</strong> records.</p>
          <p *ngIf="pillActive === 'pending'">Showing <strong>4 pending</strong> records awaiting review.</p>
          <p *ngIf="pillActive === 'archived'">Showing <strong>2 archived</strong> records.</p>
        </div>
      </pui-tabs>
    </div>

    <!-- 3. Card -->
    <div class="demo-section">
      <h3 class="demo-section__title">Card variant</h3>
      <pui-tabs variant="card" [tabs]="cardTabs" (tabChange)="cardActive = $event.id">
        <div class="tab-content-demo tab-content-demo--card">
          <p *ngIf="cardActive === 'details' || !cardActive">Contract details: signed 2024-01-15, renewal Jan 2025, auto-renew enabled.</p>
          <p *ngIf="cardActive === 'notes'">No notes added yet. Click <em>Add note</em> to attach a comment.</p>
          <p *ngIf="cardActive === 'history'">Last updated by Alice Johnson on Nov 8, 2024 at 14:32.</p>
        </div>
      </pui-tabs>
    </div>

    <!-- 4. Vertical + pill -->
    <div class="demo-section">
      <h3 class="demo-section__title">Vertical orientation</h3>
      <pui-tabs variant="pill" orientation="vertical" [tabs]="vertTabs" (tabChange)="vertActive = $event.id">
        <div class="tab-content-demo">
          <p *ngIf="vertActive === 'profile'  || !vertActive">Profile settings — update display name, avatar, and contact info.</p>
          <p *ngIf="vertActive === 'security'">Security — change password, set up 2FA, manage sessions.</p>
          <p *ngIf="vertActive === 'billing'">Billing — view invoices, update payment method, manage plan.</p>
          <p *ngIf="vertActive === 'api'">API — generate tokens, view usage, manage webhooks.</p>
        </div>
      </pui-tabs>
    </div>

    <!-- 5. With icons + badges + disabled -->
    <div class="demo-section">
      <h3 class="demo-section__title">Icons, badges &amp; disabled</h3>
      <pui-tabs variant="line" [tabs]="richTabs" size="md">
        <div class="tab-content-demo">Active tab content here.</div>
      </pui-tabs>
    </div>

    <!-- 6. Sizes -->
    <div class="demo-section">
      <h3 class="demo-section__title">Sizes — sm / md / lg</h3>
      <div style="display:flex;flex-direction:column;gap:20px;">
        <pui-tabs variant="pill" size="sm" [tabs]="sizeTabs"></pui-tabs>
        <pui-tabs variant="pill" size="md" [tabs]="sizeTabs"></pui-tabs>
        <pui-tabs variant="pill" size="lg" [tabs]="sizeTabs"></pui-tabs>
      </div>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-tabs</code> is a Web Component — works in Angular, React, and plain HTML. Pass the <code>tabs</code> array as a JS property from React/HTML; Angular uses <code>[tabs]</code> binding. Content projected inside <code>&lt;pui-tabs&gt;</code> renders as the panel area — you control what shows based on the active tab.</p>

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
      <div class="fw-note fw-note--angular">Pass <code>[tabs]</code> as a typed <code>TabItem[]</code>. Listen to <code>(tabChange)</code> to track the active tab and conditionally render panel content. Use <code>NgSwitch</code> or an <code>*ngIf</code> per panel.</div>
      <app-code lang="html"       id="ang-html" [text]="angHtml" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
      <app-code lang="typescript" id="ang-ts"   [text]="angTs"   [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='react'" class="fw-panel">
      <div class="fw-note fw-note--react">Assign the <code>tabs</code> array to the element's JS property via <code>ref</code>. Listen to <code>tabChange</code> events with <code>addEventListener</code> and store the active id in state.</div>
      <app-code lang="tsx" id="react-code" [text]="reactCode" [copied]="copied" (copyClick)="copy($event.id, $event.text)"/>
    </div>

    <div *ngIf="fw==='html'" class="fw-panel">
      <div class="fw-note fw-note--html">Load <code>pui-elements.js</code>, set <code>el.tabs = [...]</code> as a JS property, then listen to <code>tabChange</code> and toggle <code>display</code> on panel elements.</div>
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
  styles: [`
    .tab-content-demo {
      padding: 14px 4px;
      font-size: 13.5px;
      color: #374151;
      line-height: 1.65;
      min-height: 56px;
    }
    .tab-content-demo--card {
      padding: 16px;
      border: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 8px 8px;
      background: #fff;
    }
    .tab-content-demo p { margin: 0; }
  `],
})
export class TabsPageComponent {
  private cdr = inject(ChangeDetectorRef);

  fw = 'angular';
  copied = '';

  lineActive = 'overview';
  pillActive = 'all';
  cardActive = 'details';
  vertActive = 'profile';

  copy(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  /* ── Demo data ──────────────────────────────────── */
  basicTabs: TabItem[] = [
    { id: 'overview',  label: 'Overview'  },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings',  label: 'Settings'  },
  ];

  pillTabs: TabItem[] = [
    { id: 'all',      label: 'All',      badge: 24 },
    { id: 'active',   label: 'Active',   badge: 18 },
    { id: 'pending',  label: 'Pending',  badge: 4  },
    { id: 'archived', label: 'Archived', badge: 2  },
  ];

  cardTabs: TabItem[] = [
    { id: 'details', label: 'Details' },
    { id: 'notes',   label: 'Notes'   },
    { id: 'history', label: 'History' },
  ];

  vertTabs: TabItem[] = [
    { id: 'profile',  label: 'Profile'  },
    { id: 'security', label: 'Security' },
    { id: 'billing',  label: 'Billing'  },
    { id: 'api',      label: 'API'      },
  ];

  richTabs: TabItem[] = [
    { id: 'inbox',    label: 'Inbox',    badge: 12 },
    { id: 'sent',     label: 'Sent'              },
    { id: 'drafts',   label: 'Drafts',   badge: 3  },
    { id: 'archived', label: 'Archived', disabled: true },
  ];

  sizeTabs: TabItem[] = [
    { id: 'a', label: 'Flights' },
    { id: 'b', label: 'Hotels'  },
    { id: 'c', label: 'Cars'    },
  ];

  /* ── Quick-ref table ────────────────────────────── */
  xfwRows = [
    { name: 'tabs',        angular: '[tabs]="tabsArray"',           attr: '— use JS property',      js: 'el.tabs = [{id,label,...}]'   },
    { name: 'activeTab',   angular: '[activeTab]="\'id\'"',         attr: 'active-tab="id"',         js: 'el.activeTab = "id"'          },
    { name: 'variant',     angular: 'variant="pill"',               attr: 'variant="pill"',          js: 'el.variant = "pill"'          },
    { name: 'orientation', angular: 'orientation="vertical"',       attr: 'orientation="vertical"',  js: 'el.orientation = "vertical"'  },
    { name: 'size',        angular: 'size="sm"',                    attr: 'size="sm"',               js: 'el.size = "sm"'               },
    { name: 'tabChange',   angular: '(tabChange)="fn($event)"',     attr: '— use addEventListener',  js: 'el.addEventListener("tabChange", fn)' },
  ];

  /* ── Code snippets ──────────────────────────────── */
  angHtml = `<pui-tabs
  variant="pill"
  [tabs]="tabs"
  [activeTab]="active"
  (tabChange)="active = $event.id">

  <!-- Panel content — controlled by active tab -->
  <div *ngIf="active === 'overview'">Overview content…</div>
  <div *ngIf="active === 'analytics'">Analytics content…</div>
  <div *ngIf="active === 'settings'">Settings content…</div>

</pui-tabs>`;

  angTs = `import { PuiTabsComponent, TabItem } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiTabsComponent, NgIf] })
export class MyComponent {
  active = 'overview';

  tabs: TabItem[] = [
    { id: 'overview',  label: 'Overview'               },
    { id: 'analytics', label: 'Analytics', badge: 5    },
    { id: 'settings',  label: 'Settings',  disabled: false },
  ];
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

const TABS = [
  { id: 'overview',  label: 'Overview'            },
  { id: 'analytics', label: 'Analytics', badge: 5 },
  { id: 'settings',  label: 'Settings'            },
];

export function MyTabs() {
  const ref = useRef(null);
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.tabs    = TABS;
    el.variant = 'pill';

    const handler = (e) => setActive(e.detail.id);
    el.addEventListener('tabChange', handler);
    return () => el.removeEventListener('tabChange', handler);
  }, []);

  return (
    <pui-tabs ref={ref}>
      {active === 'overview'  && <div>Overview panel</div>}
      {active === 'analytics' && <div>Analytics panel</div>}
      {active === 'settings'  && <div>Settings panel</div>}
    </pui-tabs>
  );
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-tabs id="myTabs" variant="pill"></pui-tabs>

<div id="panel-overview">Overview content…</div>
<div id="panel-analytics" style="display:none">Analytics content…</div>
<div id="panel-settings"  style="display:none">Settings content…</div>

<script>
  customElements.whenDefined('pui-tabs').then(() => {
    const el = document.getElementById('myTabs');

    el.tabs = [
      { id: 'overview',  label: 'Overview'               },
      { id: 'analytics', label: 'Analytics', badge: 5    },
      { id: 'settings',  label: 'Settings'               },
    ];

    el.addEventListener('tabChange', (e) => {
      // hide all panels, show the active one
      ['overview','analytics','settings'].forEach(id => {
        document.getElementById('panel-' + id).style.display =
          id === e.detail.id ? '' : 'none';
      });
    });
  });
</script>`;

  /* ── Component API ──────────────────────────────── */
  api: ApiRow[] = [
    { input: 'tabs',        type: 'TabItem[]',         default: '[]',          description: 'Array of tab definitions — id (required), label, badge, icon (SVG string), disabled' },
    { input: 'activeTab',   type: 'string',            default: 'first tab',   description: 'Id of the currently active tab; auto-selects first enabled tab if not set' },
    { input: 'variant',     type: '"line"|"pill"|"card"', default: '"line"',   description: 'Visual style — line shows underline indicator, pill shows segmented button, card shows folder tabs' },
    { input: 'orientation', type: '"horizontal"|"vertical"', default: '"horizontal"', description: 'Lays tabs in a row (horizontal) or a column (vertical)' },
    { input: 'size',        type: '"sm"|"md"|"lg"',    default: '"md"',        description: 'Controls padding and font-size of tab buttons' },
    { input: 'tabChange',   type: 'EventEmitter<TabItem>', default: '—',       description: 'Emits the full TabItem object when the active tab changes' },
  ];
}
