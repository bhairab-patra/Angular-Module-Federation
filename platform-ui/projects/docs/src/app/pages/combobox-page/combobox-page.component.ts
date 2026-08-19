import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiComboboxComponent, ComboboxOption } from '@bhairab-patra/platform-ui';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-combobox-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiComboboxComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './combobox-page.component.html',
  styleUrls: ['./combobox-page.component.scss'],
})
export class ComboboxPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  countryOptions: ComboboxOption[] = [
    { value: 'US', label: 'United States' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'IN', label: 'India' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'BR', label: 'Brazil' },
    { value: 'SG', label: 'Singapore' },
  ];
  selectedCountry: string | number | null = null;

  priorityOptions: ComboboxOption[] = [
    { value: 'critical', label: 'Critical', group: 'High' },
    { value: 'high', label: 'High', group: 'High' },
    { value: 'medium', label: 'Medium', group: 'Medium' },
    { value: 'low', label: 'Low', group: 'Low' },
    { value: 'backlog', label: 'Backlog', group: 'Low' },
  ];
  selectedPriority: string | number | null = null;

  planOptions: ComboboxOption[] = [
    { value: 'free', label: 'Free', description: '1 user Â· 5 projects Â· community support' },
    { value: 'pro', label: 'Pro', description: '5 users Â· unlimited projects Â· email support' },
    { value: 'team', label: 'Team', description: '20 users Â· unlimited everything Â· priority support' },
    { value: 'enterprise', label: 'Enterprise', description: 'Unlimited users Â· SLA Â· dedicated CSM' },
  ];
  selectedPlan: string | number | null = null;

  tagOptions: ComboboxOption[] = [
    { value: 'bug', label: 'bug' },
    { value: 'feature', label: 'feature' },
    { value: 'enhancement', label: 'enhancement' },
    { value: 'docs', label: 'docs' },
    { value: 'refactor', label: 'refactor' },
    { value: 'security', label: 'security' },
  ];
  selectedTag: string | number | null = null;

  statusOptions: ComboboxOption[] = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended', disabled: true },
    { value: 'deleted', label: 'Deleted', disabled: true },
  ];
  selectedStatus: string | number | null = 'active';

  xfwRows = [
    { name: 'options', angular: '[options]="opts"', attr: '—', js: 'el.options = [...]' },
    { name: 'value', angular: '[value]="selected"', attr: 'value="a"', js: 'el.value = "a"' },
    { name: 'placeholder', angular: 'placeholder="…"', attr: 'placeholder="…"', js: 'el.placeholder = "…"' },
    { name: 'searchable', angular: '[searchable]="true"', attr: 'searchable', js: 'el.searchable = true' },
    { name: 'clearable', angular: '[clearable]="true"', attr: 'clearable', js: 'el.clearable = true' },
    { name: 'allowFreeText', angular: '[allowFreeText]="true"', attr: 'allow-free-text', js: 'el.allowFreeText = true' },
    { name: 'disabled', angular: '[disabled]="true"', attr: 'disabled', js: 'el.disabled = true' },
    { name: 'error', angular: 'error="msg"', attr: 'error="msg"', js: 'el.error = "msg"' },
    { name: 'valueChange', angular: '(valueChange)="fn($event)"', attr: '—', js: 'el.addEventListener(…)' },
  ];

  angularCode = `import { PuiComboboxComponent, ComboboxOption } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiComboboxComponent],
  template: \`
    <pui-lib-combobox
      [options]="options"
      [value]="selected"
      placeholder="Search…"
      [allowFreeText]="true"
      (valueChange)="selected = $event">
    </pui-lib-combobox>
  \`
})
export class MyComponent {
  options: ComboboxOption[] = [
    { value: 'a', label: 'Alpha', description: 'First option' },
    { value: 'b', label: 'Beta',  group: 'Greek' },
  ];
  selected: string | number | null = null;
}`;

  reactCode = `import { useRef, useEffect, useState } from 'react';
import '@bhairab-patra/platform-ui';

function TaskForm() {
  const ref = useRef(null);
  const [priority, setPriority] = useState(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.options = [
        { value: 'critical', label: 'Critical', group: 'High'   },
        { value: 'high',     label: 'High',     group: 'High'   },
        { value: 'medium',   label: 'Medium',   group: 'Medium' },
        { value: 'low',      label: 'Low',      group: 'Low'    },
      ];
    }
  }, []);

  return (
    <form>
      <pui-lib-combobox
        ref={ref}
        placeholder="Select priority…"
        onValueChange={e => setPriority(e.detail)}
      />
    </form>
  );
}`;

  htmlCode = `<pui-lib-combobox id="cb" placeholder="Select…" allow-free-text clearable></pui-lib-combobox>

<script>
customElements.whenDefined('pui-lib-combobox').then(() => {
  const el = document.getElementById('cb');
  el.options = [
    { value: 'ng', label: 'Angular', group: 'Frontend' },
    { value: 'rx', label: 'React',   group: 'Frontend' },
    { value: 'nj', label: 'Node.js', group: 'Backend'  },
  ];
  el.addEventListener('valueChange', e => console.log(e.detail));
});
</script>`;

  api: ApiRow[] = [
    { input: 'options', type: 'ComboboxOption[]', default: '[]', description: 'Option list. Each has value, label, and optional group, description, and disabled.' },
    { input: 'value', type: 'string|number|null', default: 'null', description: 'Currently selected value. Supports two-way binding via (valueChange).' },
    { input: 'placeholder', type: 'string', default: '"Select or search…"', description: 'Input placeholder text.' },
    { input: 'searchable', type: 'boolean', default: 'true', description: 'Enables type-to-filter on the options list.' },
    { input: 'clearable', type: 'boolean', default: 'true', description: 'Shows an Ã— button to clear the current selection.' },
    { input: 'allowFreeText', type: 'boolean', default: 'false', description: 'Lets users type a value not present in the options list.' },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Disables the entire combobox.' },
    { input: 'error', type: 'string', default: '""', description: 'Validation error message (red border + text below the input).' },
    { input: 'hint', type: 'string', default: '""', description: 'Helper text shown below the input (hidden when error is set).' },
    { input: 'valueChange', type: 'EventEmitter', default: '—', description: 'Emits the selected value (or free-text string) on selection.' },
    { input: 'change', type: 'EventEmitter', default: '—', description: 'Alias for valueChange — preferred in React / HTML event listeners.' },
  ];
  trackByIndex(_i: number): number { return _i; }
}
