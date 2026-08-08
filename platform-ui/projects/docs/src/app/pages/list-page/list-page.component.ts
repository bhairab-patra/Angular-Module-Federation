import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiListComponent, ListItem } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiListComponent, FrameworkPreviewComponent],
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
