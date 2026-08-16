import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiListComponent, ListItem } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-list-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, PuiListComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';
  selectedMenu: string | number | null = 'dashboard';

  angularCode = `import { PuiListComponent, ListItem } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiListComponent],
  template: \`
    <pui-lib-list
      [items]="items"
      variant="bordered"
      [selectable]="true"
      [selectedId]="selected"
      (itemSelect)="selected = $event.id">
    </pui-lib-list>
  \`
})
export class MyComponent {
  selected: string | number | null = null;
  items: ListItem[] = [
    { id: '1', label: 'Dashboard', description: 'Overview metrics', badge: '3' },
    { id: '2', label: 'Reports',   meta: 'Updated 2h ago' },
    { id: '3', label: 'Settings',  disabled: true },
  ];
}`;

  reactCode = `import { useRef, useEffect, useState } from 'react';
import '@bhairab-patra/platform-ui';

function MyList() {
  const ref = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.items = [
        { id: '1', label: 'Dashboard', badge: '3' },
        { id: '2', label: 'Reports',   meta: '2h ago' },
      ];
    }
  }, []);

  return (
    <pui-lib-list ref={ref} variant="bordered" selectable
      onItemSelect={e => setSelected(e.detail.id)} />
  );
}`;

  htmlCode = `<pui-lib-list id="list" variant="bordered" selectable></pui-lib-list>

<script>
customElements.whenDefined('pui-lib-list').then(() => {
  const el = document.getElementById('list');
  el.items = [
    { id: '1', label: 'Dashboard', badge: '3' },
    { id: '2', label: 'Reports',   meta: '2h ago' },
    { id: '3', label: 'Settings',  disabled: true },
  ];
  el.addEventListener('itemSelect', e => console.log(e.detail));
});
</script>`;

  /* ── Team members list ─────────────────────────────── */
  teamItems: ListItem[] = [
    { id: 1,  label: 'Alice Johnson',   description: 'Senior Engineer · Engineering',   meta: 'Online'  },
    { id: 2,  label: 'Bob Smith',       description: 'Product Designer · Design',        meta: 'Away'    },
    { id: 3,  label: 'Carol Williams',  description: 'Product Manager · Product',        meta: 'Offline' },
    { id: 4,  label: 'David Brown',     description: 'Frontend Engineer · Engineering',  meta: 'Online'  },
    { id: 5,  label: 'Eva Martinez',    description: 'QA Engineer · Engineering',        meta: 'Online'  },
    { id: 6,  label: 'Frank Lee',       description: 'DevOps Engineer · Infrastructure', meta: 'Away'    },
  ];

  /* ── Notification / badge list ──────────────────────── */
  notifItems: ListItem[] = [
    { id: 1, label: 'New comment on PR #142',  description: 'Alice left a review on your pull request.',      badge: 'New',  meta: '2m ago'   },
    { id: 2, label: 'Deployment succeeded',    description: 'v1.4.0 was deployed to production successfully.', badge: 'Done', meta: '1h ago'   },
    { id: 3, label: 'Build failed',            description: 'The staging pipeline failed on step “test”.',     badge: 'Fail', meta: '3h ago'   },
    { id: 4, label: 'Security alert',          description: 'Dependabot found 2 high-severity vulnerabilities.',badge: '!',   meta: '5h ago'   },
    { id: 5, label: 'Scheduled maintenance',   description: 'Downtime window: Saturday 02:00–04:00 UTC.',                    meta: 'Tomorrow' },
  ];

  /* ── Order list ─────────────────────────────────────── */
  orderItems: ListItem[] = [
    { id: 'ord-1', label: 'Order #1024 — MacBook Pro 16”',  description: 'Placed by Alice Johnson · 3 items',  badge: 'Shipped',    meta: 'Aug 10' },
    { id: 'ord-2', label: 'Order #1025 — iPhone 15 Pro',    description: 'Placed by Bob Smith · 1 item',       badge: 'Processing', meta: 'Aug 12' },
    { id: 'ord-3', label: 'Order #1026 — AirPods Pro',      description: 'Placed by Carol Williams · 2 items', badge: 'Delivered',  meta: 'Aug 8'  },
    { id: 'ord-4', label: 'Order #1027 — iPad Air',         description: 'Placed by David Brown · 1 item',     badge: 'Cancelled',  meta: 'Aug 7'  },
    { id: 'ord-5', label: 'Order #1028 — Apple Watch S9',   description: 'Placed by Eva Martinez · 1 item',    badge: 'Shipped',    meta: 'Aug 13' },
    { id: 'ord-6', label: 'Order #1029 — Mac Mini M3',      description: 'Placed by Frank Lee · 1 item',       badge: 'Pending',    meta: 'Aug 14' },
  ];

  /* ── Sidebar nav list ───────────────────────────────── */
  menuItems: ListItem[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports',   label: 'Reports'   },
    { id: 'settings',  label: 'Settings'  },
  ];

  /* ── Variant comparison ─────────────────────────────── */
  shortItems: ListItem[] = [
    { id: 1, label: 'Getting Started' },
    { id: 2, label: 'Installation'    },
    { id: 3, label: 'Configuration'   },
    { id: 4, label: 'Components'      },
  ];

  flushItems: ListItem[] = [
    { id: 1, label: 'Overview'    },
    { id: 2, label: 'Quick Start' },
    { id: 3, label: 'API Guide'   },
    { id: 4, label: 'Examples'    },
  ];

  /* ── Dividers & disabled ────────────────────────────── */
  actionItems: ListItem[] = [
    { id: 'edit',    label: 'Edit profile'                          },
    { id: 'billing', label: 'Billing & subscription', divider: true },
    { id: 'invite',  label: 'Invite member'                         },
    { id: 'export',  label: 'Export data'                           },
    { id: 'delete',  label: 'Delete account', disabled: true        },
  ];

  /* ── Color theme demo ───────────────────────────────── */
  colorSelected: string | number | null = 'dashboard';
  demoTextColor   = '';
  demoActiveColor = '#0d9488';
  demoHoverColor  = '#f0fdfa';

  readonly colorPresets = [
    { label: 'Teal (default)', active: '#0d9488', hover: '#f0fdfa' },
    { label: 'Indigo',         active: '#4f46e5', hover: '#eef2ff' },
    { label: 'Rose',           active: '#e11d48', hover: '#fff1f2' },
    { label: 'Amber',          active: '#d97706', hover: '#fffbeb' },
    { label: 'Violet',         active: '#7c3aed', hover: '#f5f3ff' },
  ];

  applyPreset(p: { active: string; hover: string }): void {
    this.demoActiveColor = p.active;
    this.demoHoverColor  = p.hover;
    this.cdr.markForCheck();
  }

  xfwRows = [
    { name: 'items',       angular: '[items]=”items”',           attr: '—',               js: 'el.items = [...]'          },
    { name: 'variant',     angular: 'variant=”flush”',           attr: 'variant=”flush”', js: 'el.variant = “flush”'      },
    { name: 'selectable',  angular: '[selectable]=”true”',       attr: 'selectable',      js: 'el.selectable = true'      },
    { name: 'selectedId',  angular: '[selectedId]=”id”',         attr: '—',               js: 'el.selectedId = “id”'      },
    { name: 'textColor',   angular: 'textColor=”#1e293b”',        attr: 'textColor=”#…”',  js: 'el.textColor = “#1e293b”'  },
    { name: 'activeColor', angular: 'activeColor=”#0d9488”',      attr: 'activeColor=”#…”',js: 'el.activeColor = “#0d9488”'},
    { name: 'hoverColor',  angular: 'hoverColor=”#f0fdfa”',       attr: 'hoverColor=”#…”', js: 'el.hoverColor = “#f0fdfa”' },
    { name: 'itemSelect',  angular: '(itemSelect)=”fn($event)”', attr: '—',               js: 'el.addEventListener(…)'    },
  ];

  api: ApiRow[] = [
    { input: 'items',       type: 'ListItem[]',                           default: '[]',        description: 'Array of list items. Each has id, label, and optional description, icon, badge, meta, disabled, divider.' },
    { input: 'variant',     type: `'bordered'|'striped'|'flush'|'default'`, default: `'bordered'`, description: 'Visual layout of the list.' },
    { input: 'selectable',  type: 'boolean',                              default: 'false',     description: 'Enables clickable rows with a selection highlight.' },
    { input: 'selectedId',  type: 'string|number|null',                   default: 'null',      description: 'Currently selected item id.' },
    { input: 'textColor',   type: 'string',                               default: '””',        description: 'CSS color for all item labels. Empty string inherits the default neutral text color.' },
    { input: 'activeColor', type: 'string',                               default: '”#0d9488”', description: 'CSS color applied to the selected row text. A tinted version (12% opacity) is used as the background.' },
    { input: 'hoverColor',  type: 'string',                               default: '”#f0fdfa”', description: 'CSS background color shown on row hover (non-selected rows only).' },
    { input: 'itemSelect',  type: 'EventEmitter<ListItem>',               default: '—',         description: 'Emits the clicked ListItem when selectable is true.' },
  ];
  trackByIndex(_i: number): number { return _i; }
}
