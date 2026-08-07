import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiChipComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-chip-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chip-page.component.html',
  styleUrls: ['./chip-page.component.scss'],
})
export class ChipPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  readonly ngExample =
`import { PuiChipComponent } from '@bhairab-patra/platform-ui';

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
  removeTag(tag: string) { this.activeTags = this.activeTags.filter(t => t !== tag); this.cdr.markForCheck(); }

  skills = [
    { label: 'Angular',     active: true  },
    { label: 'React',       active: false },
    { label: 'Vue',         active: false },
    { label: 'TypeScript',  active: true  },
    { label: 'Docker',      active: false },
  ];
  get selectedSkills() { return this.skills.filter(s => s.active).map(s => s.label); }
  toggleSkill(s: { label: string; active: boolean }) { s.active = !s.active; }

  xfwRows = [
    { name: 'variant',   angular: 'variant="primary"',        attr: 'variant="primary"',   js: 'el.variant = "primary"'  },
    { name: 'size',      angular: 'size="sm"',                attr: 'size="sm"',            js: 'el.size = "sm"'          },
    { name: 'selected',  angular: '[selected]="true"',        attr: 'selected',             js: 'el.selected = true'      },
    { name: 'removable', angular: '[removable]="true"',       attr: 'removable',            js: 'el.removable = true'     },
    { name: 'disabled',  angular: '[disabled]="true"',        attr: 'disabled',             js: 'el.disabled = true'      },
    { name: 'clicked',   angular: '(clicked)="fn()"',         attr: '—',                    js: 'el.addEventListener(…)'  },
    { name: 'removed',   angular: '(removed)="fn()"',         attr: '—',                    js: 'el.addEventListener(…)'  },
  ];

  api: ApiRow[] = [
    { input: 'variant',   type: `'default'|'primary'|'success'|'warning'|'danger'|'info'`, default: `'default'`, description: 'Colour variant.' },
    { input: 'size',      type: `'sm'|'md'`,    default: `'md'`,   description: 'Chip size.' },
    { input: 'selected',  type: 'boolean',       default: 'false',  description: 'Renders a selection ring. Bind dynamically to create toggle filters.' },
    { input: 'removable', type: 'boolean',       default: 'false',  description: 'Shows a × button. Disabled chips ignore this prop.' },
    { input: 'disabled',  type: 'boolean',       default: 'false',  description: 'Prevents clicks and hides the remove button.' },
    { input: 'icon',      type: 'string',        default: `''`,     description: 'Raw SVG or emoji rendered before the label.' },
    { input: 'clicked',   type: 'EventEmitter',  default: '—',      description: 'Emits when the chip body is clicked (disabled state suppressed).' },
    { input: 'removed',   type: 'EventEmitter',  default: '—',      description: 'Emits when the × button is clicked.' },
  ];
}
