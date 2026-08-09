import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiCheckboxComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-checkbox-page',
  standalone: true,
  imports: [NgFor, FormsModule, PuiCheckboxComponent, DocPageComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox-page.component.html',
})
export class CheckboxPageComponent {
  private cdr = inject(ChangeDetectorRef);

  v1 = false; v2 = true; vErr = false; vHint = false;
  preChecked = true; indeterminate = true; disabledFlag = true; requiredFlag = true;
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
    { name: 'label',         angular: 'label="str"',                       attr: 'label="str"',           js: 'el.label = "..."' },
    { name: 'checked',       angular: '[checked]="bool" or [(ngModel)]',   attr: 'checked="true"',        js: 'el.checked = true' },
    { name: 'indeterminate', angular: '[indeterminate]="bool"',            attr: 'indeterminate="true"',  js: 'el.indeterminate = true' },
    { name: 'disabled',      angular: '[disabled]="bool"',                 attr: 'disabled="true"',       js: 'el.disabled = true' },
    { name: 'required',      angular: '[required]="bool"',                 attr: 'required="true"',       js: 'el.required = true' },
    { name: 'error',         angular: '[error]="str"',                     attr: 'error="msg"',           js: 'el.error = "msg"' },
    { name: 'hint',          angular: '[hint]="str"',                      attr: 'hint="str"',            js: 'el.hint = "..."' },
    { name: 'checkedChange', angular: '(checkedChange)="fn($event)"',      attr: '— use addEventListener', js: 'el.addEventListener("checkedChange", fn)' },
  ];

  angHtml = `<pui-lib-checkbox
  label="Accept terms"
  [(ngModel)]="accepted"
  (checkedChange)="onCheck($event)"/>

<pui-lib-checkbox label="Select all" [indeterminate]="partial" [checked]="allSelected"/>
<pui-lib-checkbox label="Disabled"   [disabled]="true" [checked]="true"/>
<pui-lib-checkbox label="Required"   [required]="true" [error]="formError" hint="Hint text"/>`;

  angTs = `import { PuiCheckboxComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiCheckboxComponent, FormsModule],
})
export class MyComponent {
  accepted    = false;
  partial     = true;
  allSelected = false;
  formError   = '';

  onCheck(val: boolean) {
    this.formError = val ? '' : 'You must accept the terms.';
  }
}`;

  reactCode = `import { useEffect, useRef } from 'react';

export function MyForm() {
  const cbRef = useRef<any>(null);

  useEffect(() => {
    const el = cbRef.current;
    if (!el) return;
    const handler = (e: CustomEvent) => console.log('checked:', e.detail);
    el.addEventListener('checkedChange', handler);
    return () => el.removeEventListener('checkedChange', handler);
  }, []);

  return (
    <pui-lib-checkbox
      ref={cbRef}
      label="Accept terms and conditions"
      required="true"
    />
  );
}`;

  get angularCode(): string {
    return `${this.angHtml}\n\n// component.ts\n${this.angTs}`;
  }

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-lib-checkbox label="Accept terms"></pui-lib-checkbox>
<pui-lib-checkbox label="Pre-checked"   checked="true"></pui-lib-checkbox>
<pui-lib-checkbox label="Indeterminate" indeterminate="true"></pui-lib-checkbox>
<pui-lib-checkbox label="Disabled"      disabled="true"></pui-lib-checkbox>

<script>
  const cb = document.querySelector('pui-lib-checkbox');
  cb.checked = true;                              // JS property
  cb.addEventListener('checkedChange', e => {
    console.log('New value:', e.detail);
  });
</script>`;

  api: ApiRow[] = [
    { input: 'label',         type: 'string',  default: "''",     description: 'Label text shown next to the checkbox' },
    { input: 'checked',       type: 'boolean', default: 'false',  description: 'Whether the checkbox is checked' },
    { input: 'indeterminate', type: 'boolean', default: 'false',  description: 'Indeterminate (partial-select) state' },
    { input: 'disabled',      type: 'boolean', default: 'false',  description: 'Disables interaction' },
    { input: 'required',      type: 'boolean', default: 'false',  description: 'Shows required asterisk' },
    { input: 'error',         type: 'string',  default: "''",     description: 'Error message; hides hint when set' },
    { input: 'hint',          type: 'string',  default: "''",     description: 'Helper text shown below the checkbox' },
    { input: 'checkedChange', type: 'EventEmitter<boolean>', default: '—', description: 'Emits the new checked value on change' },
    { input: 'changed',       type: 'EventEmitter<boolean>', default: '—', description: 'Alias output for change events' },
  ];
}
