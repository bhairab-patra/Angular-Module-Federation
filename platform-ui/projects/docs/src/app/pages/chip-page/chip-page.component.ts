import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiChipComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-chip-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiChipComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chip-page.component.html',
  styleUrls: ['./chip-page.component.scss'],
})
export class ChipPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  angularCode = `import { PuiChipComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [NgFor, PuiChipComponent],
  template: \`
    <pui-lib-chip *ngFor="let t of tags"
      variant="primary"
      [removable]="true"
      (removed)="remove(t)">
      {{ t }}
    </pui-lib-chip>

    <pui-lib-chip *ngFor="let f of filters"
      variant="success"
      [selected]="f.active"
      (clicked)="f.active = !f.active">
      {{ f.label }}
    </pui-lib-chip>
  \`
})
export class MyComponent {
  tags = ['Angular', 'TypeScript', 'RxJS'];
  filters = [
    { label: 'Active',   active: true  },
    { label: 'Archived', active: false },
  ];
  remove(t: string) { this.tags = this.tags.filter(x => x !== t); }
}`;

  reactCode = `import '@bhairab-patra/platform-ui';

function TagList({ tags, onRemove }) {
  return tags.map(t => (
    <pui-lib-chip
      key={t}
      variant="primary"
      removable
      onRemoved={() => onRemove(t)}>
      {t}
    </pui-lib-chip>
  ));
}`;

  htmlCode = `<pui-lib-chip variant="primary" removable id="c1">Angular</pui-lib-chip>
<pui-lib-chip variant="success" selected>TypeScript</pui-lib-chip>
<pui-lib-chip variant="default" disabled>Disabled</pui-lib-chip>

<script>
document.getElementById('c1').addEventListener('removed', () => {
  document.getElementById('c1').remove();
});
</script>`;

  readonly ngExample = `import { PuiChipComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [NgFor, PuiChipComponent],
  template: \`
    <pui-lib-chip *ngFor="let t of tags"
      variant="primary"
      [removable]="true"
      (removed)="remove(t)">
      {{ t }}
    </pui-lib-chip>

    <pui-lib-chip *ngFor="let f of filters"
      variant="success"
      [selected]="f.active"
      (clicked)="f.active = !f.active">
      {{ f.label }}
    </pui-lib-chip>
  \`
})
export class MyComponent {
  tags = ['Angular', 'TypeScript', 'RxJS'];
  filters = [
    { label: 'Active',   active: true  },
    { label: 'Archived', active: false },
  ];
  remove(t: string) { this.tags = this.tags.filter(x => x !== t); }
}`;

  activeTags = ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Tailwind'];
  removeTag(tag: string): void {
    this.activeTags = this.activeTags.filter((t) => t !== tag);
    this.cdr.markForCheck();
  }

  skills = [
    { label: 'Angular', active: true },
    { label: 'React', active: false },
    { label: 'Vue', active: false },
    { label: 'TypeScript', active: true },
    { label: 'Docker', active: false },
  ];
  get selectedSkills(): string[] {
    return this.skills.filter((s) => s.active).map((s) => s.label);
  }
  toggleSkill(s: { label: string; active: boolean }): void {
    s.active = !s.active;
  }

  trackByIndex(_i: number): number {
    return _i;
  }

  tagIcon = 'filter';

  variantRows: {
    name: string;
    desc: string;
    variant:
      'default' | 'primary' | 'primary-light' | 'primary-outline' | 'secondary' | 'secondary-light';
  }[] = [
    { name: 'Default', desc: 'Neutral / Default state', variant: 'default' },
    { name: 'Primary', desc: 'Primary brand action', variant: 'primary' },
    { name: 'Primary Light', desc: 'Lighter brand action', variant: 'primary-light' },
    { name: 'Primary Outline', desc: 'Outline emphasis', variant: 'primary-outline' },
    { name: 'Secondary', desc: 'Secondary action', variant: 'secondary' },
    { name: 'Secondary Light', desc: 'Lighter secondary action', variant: 'secondary-light' },
  ];

  xfwRows = [
    {
      name: 'variant',
      angular: 'variant="primary"',
      attr: 'variant="primary"',
      js: 'el.variant = "primary"',
    },
    { name: 'selected', angular: '[selected]="true"', attr: 'selected', js: 'el.selected = true' },
    {
      name: 'removable',
      angular: '[removable]="true"',
      attr: 'removable',
      js: 'el.removable = true',
    },
    { name: 'disabled', angular: '[disabled]="true"', attr: 'disabled', js: 'el.disabled = true' },
    { name: 'clicked', angular: '(clicked)="fn()"', attr: '—', js: 'el.addEventListener(…)' },
    { name: 'removed', angular: '(removed)="fn()"', attr: '—', js: 'el.addEventListener(…)' },
  ];

  api: ApiRow[] = [
    {
      input: 'variant',
      type: `'default'|'primary'|'primary-light'|'primary-outline'|'secondary'|'secondary-light'`,
      default: `'default'`,
      description: 'Colour variant.',
    },
    {
      input: 'selected',
      type: 'boolean',
      default: 'false',
      description: 'Renders a selection ring. Bind dynamically to create toggle filters.',
    },
    {
      input: 'removable',
      type: 'boolean',
      default: 'false',
      description: 'Shows a × button. Disabled chips ignore this prop.',
    },
    {
      input: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevents clicks and hides the remove button.',
    },
    {
      input: 'icon',
      type: 'string',
      default: `''`,
      description:
        'Icon name from the platform icon registry (pui-lib-icon), rendered before the label.',
    },
    {
      input: 'clicked',
      type: 'EventEmitter',
      default: '—',
      description: 'Emits when the chip body is clicked (disabled state suppressed).',
    },
    {
      input: 'removed',
      type: 'EventEmitter',
      default: '—',
      description: 'Emits when the × button is clicked.',
    },
  ];
}
