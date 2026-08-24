import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiContextMenuComponent, MenuItem } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-context-menu-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiContextMenuComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './context-menu-page.component.html',
  styleUrls: ['./context-menu-page.component.scss'],
})
export class ContextMenuPageComponent {
  private cdr = inject(ChangeDetectorRef);

  lastAction = '';

  fileItems: MenuItem[] = [
    { id: 'open', label: 'Open', icon: 'external-link', shortcut: '⏎' },
    { id: 'rename', label: 'Rename', icon: 'edit', shortcut: 'F2' },
    { id: 'download', label: 'Download', icon: 'download' },
    { id: 'copy', label: 'Copy link', icon: 'copy', dividerBefore: true },
    { id: 'delete', label: 'Delete', icon: 'trash', danger: true, dividerBefore: true },
  ];

  rowItems: MenuItem[] = [
    { id: 'view', label: 'View details', icon: 'eye' },
    { id: 'edit', label: 'Edit', icon: 'edit' },
    { id: 'archive', label: 'Archive', icon: 'folder', disabled: true },
    { id: 'delete', label: 'Delete', icon: 'trash', danger: true, dividerBefore: true },
  ];

  onSelect(item: MenuItem): void { this.lastAction = item.label; this.cdr.markForCheck(); }

  trackByIndex(_i: number): number { return _i; }

  angularCode = `import { PuiContextMenuComponent, MenuItem } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiContextMenuComponent],
  template: \`
    <pui-lib-context-menu [items]="items" (menuSelect)="onSelect($event)">
      <div class="file-card">report.pdf</div>
    </pui-lib-context-menu>
  \`
})
export class MyComponent {
  items: MenuItem[] = [
    { id: 'open',   label: 'Open',   icon: 'external-link' },
    { id: 'rename', label: 'Rename', icon: 'edit' },
    { id: 'delete', label: 'Delete', icon: 'trash', danger: true, dividerBefore: true },
  ];

  onSelect(item: MenuItem) {
    console.log('Selected:', item.id);
  }
}`;

  reactCode = `import { useRef, useEffect } from 'react';
import '@bhairab-patra/platform-ui';

const ITEMS = [
  { id: 'open',   label: 'Open',   icon: 'external-link' },
  { id: 'rename', label: 'Rename', icon: 'edit' },
  { id: 'delete', label: 'Delete', icon: 'trash', danger: true, dividerBefore: true },
];

export function FileCard() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.items = ITEMS;
    const onSelect = (e) => console.log('Selected:', e.detail.id);
    el.addEventListener('menuSelect', onSelect);
    return () => el.removeEventListener('menuSelect', onSelect);
  }, []);

  return (
    <pui-lib-context-menu ref={ref}>
      <div className="file-card">report.pdf</div>
    </pui-lib-context-menu>
  );
}`;

  htmlCode = `<!-- Load the bundle once in your page -->
<script type="module" src="pui-elements.js"></script>

<pui-lib-context-menu id="ctx">
  <div class="file-card">report.pdf</div>
</pui-lib-context-menu>

<script>
  customElements.whenDefined('pui-lib-context-menu').then(() => {
    const el = document.getElementById('ctx');
    el.items = [
      { id: 'open',   label: 'Open',   icon: 'external-link' },
      { id: 'rename', label: 'Rename', icon: 'edit' },
      { id: 'delete', label: 'Delete', icon: 'trash', danger: true, dividerBefore: true },
    ];
    el.addEventListener('menuSelect', (e) => console.log('Selected:', e.detail.id));
  });
</script>`;

  xfwRows = [
    { name: 'items', angular: '[items]="items"', attr: '—', js: 'el.items = [...]' },
    { name: 'disabled', angular: '[disabled]="true"', attr: 'disabled', js: 'el.disabled = true' },
    { name: 'menuSelect', angular: '(menuSelect)="fn($event)"', attr: '—', js: `el.addEventListener('menuSelect', fn)` },
    { name: 'openChange', angular: '(openChange)="fn($event)"', attr: '—', js: `el.addEventListener('openChange', fn)` },
  ];

  api: ApiRow[] = [
    { input: 'items', type: 'MenuItem[]', default: '[]', description: 'Menu items shown on right-click. Same MenuItem shape as pui-lib-menu: {id, label, icon?, disabled?, danger?, dividerBefore?, shortcut?, children?}. Nested children are not expandable here (context menus stay single-level); pass a flat list.' },
    { input: 'disabled', type: 'boolean | string', default: 'false', description: 'Disables the right-click menu entirely — the browser\'s native context menu shows instead.' },
    { input: 'menuSelect', type: 'EventEmitter<MenuItem> (output)', default: '—', description: 'Fires when a (non-disabled) item is clicked.' },
    { input: 'openChange', type: 'EventEmitter<boolean> (output)', default: '—', description: 'Fires when the menu opens or closes.' },
    { input: 'content (default slot)', type: 'ng-content', default: '—', description: 'The zone that responds to right-click. Wrap whatever element/area should trigger the menu — a card, a table row, an image, etc.' },
  ];
}
