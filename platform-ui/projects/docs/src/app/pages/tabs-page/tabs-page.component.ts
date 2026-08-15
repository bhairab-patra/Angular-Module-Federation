import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PuiTabsComponent, TabItem } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-tabs-page',
  standalone: true,
  imports: [NgFor, NgIf, PuiTabsComponent, DocPageComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.scss'],
})
export class TabsPageComponent {
  private cdr = inject(ChangeDetectorRef);

  fw = 'angular';
  copied = '';

  lineActive = 'overview';
  pillActive = 'all';
  cardActive = 'details';
  vertActive = 'profile';

  copy(id: string, text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  trackByIndex(_i: number): number { return _i; }

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
  angularCode = `<pui-lib-tabs
  variant="pill"
  [tabs]="tabs"
  [activeTab]="active"
  (tabChange)="active = $event.id">

  <!-- Panel content — controlled by active tab -->
  <div *ngIf="active === 'overview'">Overview content…</div>
  <div *ngIf="active === 'analytics'">Analytics content…</div>
  <div *ngIf="active === 'settings'">Settings content…</div>

</pui-lib-tabs>

// TypeScript
import { PuiTabsComponent, TabItem } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiTabsComponent, NgIf] })
export class MyComponent {
  active = 'overview';

  tabs: TabItem[] = [
    { id: 'overview',  label: 'Overview'               },
    { id: 'analytics', label: 'Analytics', badge: 5    },
    { id: 'settings',  label: 'Settings',  disabled: false },
  ];
}`;

  angHtml = `<pui-lib-tabs
  variant="pill"
  [tabs]="tabs"
  [activeTab]="active"
  (tabChange)="active = $event.id">

  <!-- Panel content — controlled by active tab -->
  <div *ngIf="active === 'overview'">Overview content…</div>
  <div *ngIf="active === 'analytics'">Analytics content…</div>
  <div *ngIf="active === 'settings'">Settings content…</div>

</pui-lib-tabs>`;

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
    <pui-lib-tabs ref={ref}>
      {active === 'overview'  && <div>Overview panel</div>}
      {active === 'analytics' && <div>Analytics panel</div>}
      {active === 'settings'  && <div>Settings panel</div>}
    </pui-lib-tabs>
  );
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-lib-tabs id="myTabs" variant="pill"></pui-lib-tabs>

<div id="panel-overview">Overview content…</div>
<div id="panel-analytics" style="display:none">Analytics content…</div>
<div id="panel-settings"  style="display:none">Settings content…</div>

<script>
  customElements.whenDefined('pui-lib-tabs').then(() => {
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
