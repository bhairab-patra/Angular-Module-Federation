import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiSelectComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'docs-select-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, PuiSelectComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-page.component.html',
})
export class SelectPageComponent {
  private cdr = inject(ChangeDetectorRef);

  countries = [
    { label: 'United States', value: 'us' }, { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },        { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
  ];
  roles = [
    { label: 'Developer', value: 'dev' }, { label: 'Designer', value: 'des' },
    { label: 'Manager',   value: 'mgr' }, { label: 'Analyst',  value: 'ana' },
  ];
  tiersWithDisabled = [
    { label: 'Free', value: 'free' },
    { label: 'Pro',  value: 'pro'  },
    { label: 'Enterprise (contact sales)', value: 'ent', disabled: true },
  ];

  vCountry = ''; vRole = ''; vTier = '';
  disabledFlag = true; requiredFlag = true;
  fw = 'angular';
  copied = '';

  copy(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  xfwRows = [
    { name: 'label',           angular: 'label="str"',                      attr: 'label="str"',           js: 'el.label = "..."' },
    { name: 'placeholder',     angular: 'placeholder="str"',                attr: 'placeholder="str"',     js: 'el.placeholder = "..."' },
    { name: 'options',         angular: '[options]="optionsArray"',          attr: '— use JS property',     js: 'el.options = [{label,value}]' },
    { name: 'size',            angular: 'size="sm|md|lg"',                  attr: 'size="sm|md|lg"',       js: 'el.size = "md"' },
    { name: 'disabled',        angular: '[disabled]="bool"',                attr: '— use JS property',     js: 'el.disabled = true' },
    { name: 'required',        angular: '[required]="bool"',                attr: 'required="true"',       js: 'el.required = true' },
    { name: 'error',           angular: '[error]="str"',                    attr: 'error="msg"',           js: 'el.error = "msg"' },
    { name: 'hint',            angular: '[hint]="str"',                     attr: 'hint="str"',            js: 'el.hint = "..."' },
    { name: 'valueChange',     angular: '(valueChange)="fn($event)"',       attr: '— use addEventListener', js: 'el.addEventListener("valueChange", fn)' },
    { name: 'selectionChange', angular: '(selectionChange)="fn($event)"',   attr: '— use addEventListener', js: 'el.addEventListener("selectionChange", fn)' },
  ];

  angHtml = `<pui-lib-select
  label="Country"
  [options]="countries"
  [(ngModel)]="selectedCountry"
  placeholder="Choose a country"
  (valueChange)="onCountryChange($event)"/>

<pui-lib-select label="Role" size="sm" [options]="roles" [(ngModel)]="role"/>
<pui-lib-select label="Required" [options]="roles" [required]="true" [error]="roleError"/>
<pui-lib-select label="Disabled" [options]="roles" [disabled]="true"/>`;

  angTs = `import { PuiSelectComponent } from '@bhairab-patra/platform-ui';
import { SelectOption } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiSelectComponent, FormsModule] })
export class MyComponent {
  countries: SelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'Germany',       value: 'de' },
  ];
  roles: SelectOption[] = [
    { label: 'Developer', value: 'dev' },
    { label: 'Designer',  value: 'des' },
  ];
  selectedCountry = ''; role = ''; roleError = '';

  onCountryChange(val: string) { console.log('Country:', val); }
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

const ROLES = [
  { label: 'Developer', value: 'dev' },
  { label: 'Designer',  value: 'des' },
];

export function RolePicker() {
  const [role, setRole] = useState('');
  const selectRef = useRef<any>(null);

  useEffect(() => {
    const el = selectRef.current;
    if (!el) return;
    el.options = ROLES;             // JS property (array)
    const handler = (e: CustomEvent) => setRole(e.detail);
    el.addEventListener('valueChange', handler);
    return () => el.removeEventListener('valueChange', handler);
  }, []);

  return <pui-lib-select ref={selectRef} label="Role" placeholder="Select a role"/>;
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-lib-select id="roleSelect" label="Role" placeholder="Select your role"></pui-lib-select>

<script>
  const el = document.getElementById('roleSelect');

  el.options = [
    { label: 'Developer', value: 'dev' },
    { label: 'Designer',  value: 'des' },
  ];

  // OR: el.setAttribute('options', JSON.stringify([...]));

  el.addEventListener('valueChange', e => console.log('Selected:', e.detail));
</script>`;

  api: ApiRow[] = [
    { input: 'label',           type: 'string',           default: "''",              description: 'Label shown above the select' },
    { input: 'placeholder',     type: 'string',           default: "'Select an option'", description: 'Disabled placeholder option shown when no value selected' },
    { input: 'options',         type: 'SelectOption[]',   default: '[]',              description: 'Array of { label, value, disabled? }' },
    { input: 'size',            type: "'sm'|'md'|'lg'",  default: "'md'",            description: 'Visual size variant' },
    { input: 'disabled',        type: 'boolean',          default: 'false',           description: 'Disables the dropdown' },
    { input: 'required',        type: 'boolean',          default: 'false',           description: 'Shows required asterisk' },
    { input: 'error',           type: 'string',           default: "''",              description: 'Error message; applies error styling' },
    { input: 'hint',            type: 'string',           default: "''",              description: 'Helper text below the dropdown' },
    { input: 'valueChange',     type: 'EventEmitter<any>', default: '—',             description: 'Emits the selected value on change' },
    { input: 'selectionChange', type: 'EventEmitter<any>', default: '—',             description: 'Alias output for selection events' },
  ];
}
