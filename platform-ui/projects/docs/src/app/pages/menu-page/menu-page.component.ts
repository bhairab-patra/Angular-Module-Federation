import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { MenuComponent, MenuItem } from '@bhairab-patra/platform-ui';

const ICON = (d: string): string =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

@Component({
  selector: 'docs-menu-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, FrameworkPreviewComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent {
  cdr = inject(ChangeDetectorRef);

  lastAction = '';

  trackByIndex(_i: number): number { return _i; }

  onSelect(item: MenuItem): void {
    this.lastAction = item.label;
    this.cdr.markForCheck();
  }

  /* ── Demo items ──────────────────────────────────────── */
  basicItems: MenuItem[] = [
    { id: 'view',   label: 'View Details', icon: ICON('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>') },
    { id: 'edit',   label: 'Edit',         icon: ICON('<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>'), shortcut: '⌘E' },
    { id: 'dup',    label: 'Duplicate',    icon: ICON('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>'),                    shortcut: '⌘D' },
    { id: 'del',    label: 'Delete',       icon: ICON('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>'), danger: true, dividerBefore: true },
  ];

  submenuItems: MenuItem[] = [
    { id: 'new',    label: 'New',    icon: ICON('<path d="M12 5v14M5 12h14"/>') },
    {
      id: 'export', label: 'Export', icon: ICON('<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
      children: [
        { id: 'export-csv',  label: 'CSV',        shortcut: '⌘⇧C' },
        { id: 'export-xlsx', label: 'Excel',       shortcut: '⌘⇧E' },
        { id: 'export-pdf',  label: 'PDF',         shortcut: '⌘⇧P' },
        { id: 'export-json', label: 'JSON',        shortcut: '⌘⇧J', dividerBefore: true },
      ],
    },
    {
      id: 'share', label: 'Share', icon: ICON('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>'),
      children: [
        { id: 'share-link',  label: 'Copy Link',   shortcut: '⌘L' },
        { id: 'share-email', label: 'Email',       icon: ICON('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>') },
        { id: 'share-slack', label: 'Slack',       dividerBefore: true, disabled: true },
      ],
    },
    { id: 'archive', label: 'Archive', icon: ICON('<polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>'), dividerBefore: true },
    { id: 'delete',  label: 'Delete',  icon: ICON('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>'), danger: true },
  ];

  variantItems: MenuItem[] = [
    { id: 'a', label: 'Option A', shortcut: '⌘A' },
    { id: 'b', label: 'Option B', shortcut: '⌘B' },
    { id: 'c', label: 'Option C', disabled: true  },
    { id: 'd', label: 'Remove',   danger: true, dividerBefore: true },
  ];

  /* ── Framework preview items ─────────────────────────── */
  fwAngularItems: MenuItem[] = [
    { id: 'edit',   label: 'Edit',      shortcut: '⌘E', icon: ICON('<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>') },
    { id: 'dup',    label: 'Duplicate', shortcut: '⌘D', icon: ICON('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>') },
    {
      id: 'export', label: 'Export', icon: ICON('<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
      children: [
        { id: 'csv',  label: 'CSV',   shortcut: '⌘⇧C' },
        { id: 'xlsx', label: 'Excel', shortcut: '⌘⇧E' },
        { id: 'pdf',  label: 'PDF',   shortcut: '⌘⇧P' },
      ],
    },
    { id: 'delete', label: 'Delete', danger: true, dividerBefore: true, icon: ICON('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>') },
  ];

  fwReactItems: MenuItem[] = [
    { id: 'profile',  label: 'My Profile',     icon: ICON('<circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/>') },
    { id: 'settings', label: 'Account Settings', icon: ICON('<circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3"/>') },
    { id: 'billing',  label: 'Billing',         icon: ICON('<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>'), shortcut: '⌘B' },
    { id: 'logout',   label: 'Sign Out',         danger: true, dividerBefore: true, icon: ICON('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>') },
  ];

  fwLastAction = '';
  onFwSelect(item: MenuItem): void { this.fwLastAction = item.label; this.cdr.markForCheck(); }

  /* ── Framework code ──────────────────────────────────── */
  angularCode = `import { MenuComponent, MenuItem } from '@bhairab-patra/platform-ui';

@Component({
  imports: [MenuComponent],
  template: \`
    <pui-lib-menu
      trigger="Actions"
      variant="default"
      placement="bottom-start"
      [items]="items"
      (menuSelect)="onSelect($event)">
    </pui-lib-menu>
  \`
})
export class MyComponent {
  items: MenuItem[] = [
    { id: 'edit',   label: 'Edit',   shortcut: '⌘E' },
    { id: 'dup',    label: 'Duplicate' },
    {
      id: 'export', label: 'Export',
      children: [
        { id: 'csv',  label: 'CSV' },
        { id: 'xlsx', label: 'Excel' },
      ],
    },
    { id: 'delete', label: 'Delete', danger: true, dividerBefore: true },
  ];

  onSelect(item: MenuItem) { console.log('selected:', item.id); }
}`;

  reactCode = `import { useRef, useEffect } from 'react';
// pui-elements bundle loaded via <script> in index.html

function ActionMenu() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.items = [
      { id: 'edit',   label: 'Edit',   shortcut: '⌘E' },
      { id: 'dup',    label: 'Duplicate' },
      {
        id: 'export', label: 'Export',
        children: [
          { id: 'csv',  label: 'CSV' },
          { id: 'xlsx', label: 'Excel' },
        ],
      },
      { id: 'delete', label: 'Delete', danger: true, dividerBefore: true },
    ];

    const onSelect = (e) => console.log('selected:', e.detail.id);
    el.addEventListener('menuSelect', onSelect);
    return () => el.removeEventListener('menuSelect', onSelect);
  }, []);

  return (
    <pui-lib-menu
      ref={ref}
      trigger="Actions"
      variant="default"
      placement="bottom-start"
    />
  );
}`;

  htmlCode = `<script src="pui-elements.js"></script>

<pui-lib-menu id="menu" trigger="Actions" variant="default"></pui-lib-menu>

<script>
  customElements.whenDefined('pui-lib-menu').then(() => {
    const el = document.getElementById('menu');

    el.items = [
      { id: 'edit',   label: 'Edit',   shortcut: '⌘E' },
      { id: 'dup',    label: 'Duplicate' },
      {
        id: 'export', label: 'Export',
        children: [
          { id: 'csv',  label: 'CSV' },
          { id: 'xlsx', label: 'Excel' },
        ],
      },
      { id: 'delete', label: 'Delete', danger: true, dividerBefore: true },
    ];

    el.addEventListener('menuSelect', (e) => {
      console.log('selected:', e.detail.id);
    });
  });
</script>`;

  xfwRows = [
    { name: 'items',     angular: '[items]="items"',          attr: '— use JS property', js: 'el.items = [...]'          },
    { name: 'trigger',   angular: 'trigger="Actions"',        attr: 'trigger="Actions"', js: 'el.trigger = "Actions"'    },
    { name: 'variant',   angular: 'variant="outline"',        attr: 'variant="outline"', js: 'el.variant = "outline"'    },
    { name: 'placement', angular: 'placement="bottom-end"',   attr: 'placement="..."',   js: 'el.placement = "..."'      },
    { name: 'disabled',  angular: '[disabled]="true"',        attr: 'disabled="true"',   js: 'el.disabled = true'        },
    { name: 'maxHeight', angular: '[maxHeight]="300"',        attr: 'max-height="300"',  js: 'el.maxHeight = 300'        },
    { name: 'menuSelect',angular: '(menuSelect)="fn($event)"',attr: '— addEventListener',js: 'el.addEventListener(...)'  },
  ];

  api: ApiRow[] = [
    { input: 'items',     type: 'MenuItem[]',                                    default: '[]',              description: 'Array of menu items. Each item may have nested children for a submenu.' },
    { input: 'trigger',   type: 'string',                                         default: "'Menu'",          description: 'Label displayed inside the trigger button when no ng-content is projected.' },
    { input: 'variant',   type: "'default'|'outline'|'ghost'|'primary'",          default: "'default'",       description: 'Visual style of the trigger button.' },
    { input: 'placement', type: "'bottom-start'|'bottom-end'|'top-start'|'top-end'", default: "'bottom-start'", description: 'Which corner of the trigger the dropdown panel opens from.' },
    { input: 'disabled',  type: 'boolean',                                        default: 'false',           description: 'Disables the trigger button and prevents the menu from opening.' },
    { input: 'maxHeight', type: 'number',                                         default: '320',             description: 'Max pixel height of the dropdown panel before it scrolls.' },
    { input: 'menuSelect',type: 'EventEmitter<MenuItem>',                         default: '—',               description: 'Emits the clicked MenuItem. Only fires for leaf items (not parent items with children).' },
  ];
}
