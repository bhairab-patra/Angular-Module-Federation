import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiMultiSelectComponent, MultiSelectOption } from '@bhairab-patra/platform-ui';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-multiselect-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiMultiSelectComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './multiselect-page.component.html',
  styleUrls: ['./multiselect-page.component.scss'],
})
export class MultiSelectPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  teamOptions: MultiSelectOption[] = [
    { value: 'alice',  label: 'Alice Johnson',  group: 'Engineering' },
    { value: 'bob',    label: 'Bob Smith',       group: 'Engineering' },
    { value: 'carol',  label: 'Carol Williams',  group: 'Design' },
    { value: 'david',  label: 'David Brown',     group: 'Design' },
    { value: 'eve',    label: 'Eve Davis',       group: 'Product' },
    { value: 'frank',  label: 'Frank Miller',    group: 'Product' },
  ];
  teamSelected: (string | number)[] = ['alice'];

  techOptions: MultiSelectOption[] = [
    { value: 'angular',  label: 'Angular',    group: 'Frontend' },
    { value: 'react',    label: 'React',      group: 'Frontend' },
    { value: 'vue',      label: 'Vue',        group: 'Frontend' },
    { value: 'node',     label: 'Node.js',    group: 'Backend'  },
    { value: 'java',     label: 'Java',       group: 'Backend'  },
    { value: 'python',   label: 'Python',     group: 'Backend'  },
    { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
    { value: 'mongo',    label: 'MongoDB',    group: 'Database' },
    { value: 'redis',    label: 'Redis',      group: 'Database' },
  ];
  techSelected: (string | number)[] = ['angular', 'node'];

  skillOptions: MultiSelectOption[] = [
    { value: 'angular',    label: 'Angular' },
    { value: 'react',      label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'docker',     label: 'Docker' },
    { value: 'k8s',        label: 'Kubernetes' },
    { value: 'aws',        label: 'AWS' },
  ];
  skillSelected:  (string | number)[] = ['angular', 'react', 'typescript'];
  skillSelected2: (string | number)[] = ['angular', 'react', 'docker'];

  roleOptions: MultiSelectOption[] = [
    { value: 'admin',    label: 'Admin' },
    { value: 'editor',   label: 'Editor' },
    { value: 'viewer',   label: 'Viewer' },
    { value: 'billing',  label: 'Billing',   disabled: true },
    { value: 'superuser',label: 'Superuser', disabled: true },
  ];
  roleSelected: (string | number)[] = ['editor'];

  xfwRows = [
    { name: 'options',       angular: '[options]="opts"',         attr: "options='[…]'",      js: 'el.options = [...]'      },
    { name: 'value',         angular: '[value]="selected"',       attr: "value='[\"a\"]'",    js: 'el.value = ["a"]'        },
    { name: 'placeholder',   angular: 'placeholder="…"',          attr: 'placeholder="…"',    js: 'el.placeholder = "…"'    },
    { name: 'searchable',    angular: '[searchable]="true"',      attr: 'searchable',         js: 'el.searchable = true'    },
    { name: 'showSelectAll', angular: '[showSelectAll]="true"',   attr: 'show-select-all',    js: 'el.showSelectAll = true' },
    { name: 'maxChips',      angular: '[maxChips]="2"',           attr: 'max-chips="2"',      js: 'el.maxChips = 2'         },
    { name: 'disabled',      angular: '[disabled]="true"',        attr: 'disabled',           js: 'el.disabled = true'      },
    { name: 'error',         angular: 'error="msg"',              attr: 'error="msg"',        js: 'el.error = "msg"'        },
    { name: 'hint',          angular: 'hint="msg"',               attr: 'hint="msg"',         js: 'el.hint = "msg"'         },
    { name: 'valueChange',   angular: '(valueChange)="fn($event)"', attr: '—',               js: 'el.addEventListener(…)'  },
  ];

  angularCode = `import { PuiMultiSelectComponent, MultiSelectOption } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiMultiSelectComponent],
  template: \`
    <pui-lib-multiselect
      [options]="options"
      [value]="selected"
      placeholder="Select items…"
      [searchable]="true"
      [showSelectAll]="true"
      (valueChange)="selected = $event">
    </pui-lib-multiselect>
  \`
})
export class MyComponent {
  options: MultiSelectOption[] = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta', group: 'Greek' },
  ];
  selected: (string | number)[] = [];
}`;

  reactCode = `import { useRef, useEffect, useState } from 'react';
import '@bhairab-patra/platform-ui';

function ProjectSetup() {
  const ref = useRef(null);
  const [stack, setStack] = useState([]);

  useEffect(() => {
    if (ref.current) {
      ref.current.options = [
        { value: 'angular',  label: 'Angular',    group: 'Frontend' },
        { value: 'react',    label: 'React',      group: 'Frontend' },
        { value: 'node',     label: 'Node.js',    group: 'Backend'  },
        { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
      ];
    }
  }, []);

  return (
    <pui-lib-multiselect
      ref={ref}
      placeholder="Pick your stack…"
      onValueChange={e => setStack(e.detail)}
    />
  );
}`;

  htmlCode = `<pui-lib-multiselect id="ms" placeholder="Select items…" searchable show-select-all></pui-lib-multiselect>

<script>
customElements.whenDefined('pui-lib-multiselect').then(() => {
  const el = document.getElementById('ms');
  el.options = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta' },
  ];
  el.addEventListener('valueChange', e => console.log(e.detail));
});
</script>`;

  api: ApiRow[] = [
    { input: 'options',       type: 'MultiSelectOption[]', default: '[]',              description: 'Array of option objects. Each has value, label, and optional group and disabled.' },
    { input: 'value',         type: '(string|number)[]',  default: '[]',              description: 'Currently selected values. Supports two-way binding via (valueChange).' },
    { input: 'placeholder',   type: 'string',             default: '"Select options…"', description: 'Placeholder shown when no items are selected.' },
    { input: 'searchable',    type: 'boolean',            default: 'true',            description: 'Shows a search input inside the dropdown.' },
    { input: 'showSelectAll', type: 'boolean',            default: 'true',            description: 'Shows Select all / Clear action links above the list.' },
    { input: 'maxChips',      type: 'number',             default: '3',               description: 'Maximum chips shown before collapsing to a count badge.' },
    { input: 'disabled',      type: 'boolean',            default: 'false',           description: 'Disables the entire component.' },
    { input: 'error',         type: 'string',             default: '""',              description: 'Error message — adds red border and displays below the trigger.' },
    { input: 'hint',          type: 'string',             default: '""',              description: 'Helper text shown below the trigger (hidden when error is set).' },
    { input: 'valueChange',   type: 'EventEmitter',       default: '—',               description: 'Emits the updated selected-values array on every change.' },
    { input: 'change',        type: 'EventEmitter',       default: '—',               description: 'Alias for valueChange — useful in React / HTML event listeners.' },
  ];
  trackByIndex(_i: number): number { return _i; }
}
