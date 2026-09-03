import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiEmptyStateComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-empty-state-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, PuiEmptyStateComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './empty-state-page.component.html',
  styleUrls: ['./empty-state-page.component.scss'],
})
export class EmptyStatePageComponent {
  trackByIndex(_i: number): number {
    return _i;
  }

  angularCode = `import { PuiEmptyStateComponent } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiEmptyStateComponent],
  template: \`
    <pui-lib-empty-state
      icon="inbox"
      title="No borrowers yet"
      description="Add your first borrower to start tracking loans and statements.">
      <button actions class="btn-primary" (click)="onAdd()">Add Borrower</button>
    </pui-lib-empty-state>
  \`
})
export class MyComponent {
  onAdd() { /* open a form */ }
}`;

  reactCode = `import '@bhairab-patra/platform-ui';

export function NoBorrowers({ onAdd }) {
  return (
    <pui-lib-empty-state
      icon="inbox"
      title="No borrowers yet"
      description="Add your first borrower to start tracking loans and statements.">
      <button slot="actions" className="btn-primary" onClick={onAdd}>Add Borrower</button>
    </pui-lib-empty-state>
  );
}`;

  htmlCode = `<!-- Load the bundle once in your page -->
<script type="module" src="pui-elements.js"></script>

<pui-lib-empty-state
  icon="inbox"
  title="No borrowers yet"
  description="Add your first borrower to start tracking loans and statements.">
  <button actions class="btn-primary" onclick="openAddForm()">Add Borrower</button>
</pui-lib-empty-state>`;

  xfwRows = [
    {
      name: 'icon',
      angular: 'icon="search-off"',
      attr: 'icon="search-off"',
      js: 'el.icon = "search-off"',
    },
    {
      name: 'title',
      angular: 'title="No results"',
      attr: 'title="No results"',
      js: 'el.title = "No results"',
    },
    {
      name: 'description',
      angular: 'description="..."',
      attr: 'description="..."',
      js: 'el.description = "..."',
    },
    { name: 'size', angular: 'size="sm"', attr: 'size="sm"', js: 'el.size = "sm"' },
    {
      name: 'actions (slot)',
      angular: '<button actions>',
      attr: '<button actions>',
      js: 'slot="actions"',
    },
  ];

  api: ApiRow[] = [
    {
      input: 'icon',
      type: 'string',
      default: `'inbox'`,
      description:
        'Icon name from the Platform UI icon registry, shown inside a soft circular badge above the title.',
    },
    {
      input: 'title',
      type: 'string',
      default: `'Nothing here yet'`,
      description: 'Headline text.',
    },
    {
      input: 'description',
      type: 'string',
      default: `''`,
      description: 'Supporting sentence shown under the title. Omit for icon + title only.',
    },
    {
      input: 'size',
      type: `'sm'|'md'|'lg'`,
      default: `'md'`,
      description:
        'Scales icon, spacing, and type size. sm fits inside a card or table body; lg suits a full empty page.',
    },
    {
      input: 'actions (slot)',
      type: 'ng-content',
      default: '—',
      description:
        'Project one or more buttons/links with the actions attribute — shown in a row under the description (e.g. "Add item", "Clear filters").',
    },
    {
      input: 'content (default slot)',
      type: 'ng-content',
      default: '—',
      description:
        'Anything else projected without a slot attribute renders below the actions row, for custom extras.',
    },
  ];
}
