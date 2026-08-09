import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiRadioGroupComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-radio-page',
  standalone: true,
  imports: [NgFor, FormsModule, PuiRadioGroupComponent, DocPageComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './radio-page.component.html',
})
export class RadioPageComponent {
  private cdr = inject(ChangeDetectorRef);

  plans   = [{ label: 'Free',         value: 'free' },
             { label: 'Pro — $9/mo',  value: 'pro'  },
             { label: 'Enterprise',   value: 'ent'  }];
  contact = [{ label: 'Email', value: 'email' },
             { label: 'Phone', value: 'phone' },
             { label: 'Slack', value: 'slack' }];
  sizes   = [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }];
  priority = [
    { label: 'Low',    value: 'low',    hint: 'Response within 3 days'  },
    { label: 'Medium', value: 'medium', hint: 'Response within 24 hours' },
    { label: 'High',   value: 'high',   hint: 'Response within 2 hours' },
  ];
  regions = [{ label: 'Americas', value: 'amer' }, { label: 'EMEA', value: 'emea' }, { label: 'APAC', value: 'apac' }];

  vPlan = 'free'; vContact = ''; vSize = 'md'; vPri = ''; vReg = '';
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
    { name: 'label',       angular: 'label="str"',                    attr: 'label="str"',            js: 'el.label = "..."' },
    { name: 'options',     angular: '[options]="optionsArray"',        attr: '— use JS property',      js: 'el.options = [{label,value}]' },
    { name: 'disabled',    angular: '[disabled]="bool"',               attr: 'disabled="true"',        js: 'el.disabled = true' },
    { name: 'required',    angular: '[required]="bool"',               attr: 'required="true"',        js: 'el.required = true' },
    { name: 'error',       angular: '[error]="str"',                   attr: 'error="msg"',            js: 'el.error = "msg"' },
    { name: 'hint',        angular: '[hint]="str"',                    attr: 'hint="str"',             js: 'el.hint = "..."' },
    { name: 'direction',   angular: 'direction="vertical|horizontal"', attr: 'direction="horizontal"', js: 'el.direction = "horizontal"' },
    { name: 'valueChange', angular: '(valueChange)="fn($event)"',      attr: '— use addEventListener', js: 'el.addEventListener("valueChange", fn)' },
  ];

  angHtml = `<pui-lib-radio-group
  label="Subscription plan"
  [options]="plans"
  [(ngModel)]="selectedPlan"
  (valueChange)="onPlanChange($event)"/>

<pui-lib-radio-group label="Size" [options]="sizes" [(ngModel)]="size" direction="horizontal"/>

<pui-lib-radio-group label="Region" [options]="regions"
  [(ngModel)]="region" [error]="regionError" [required]="true"/>
<pui-lib-radio-group label="Locked" [options]="plans" [disabled]="true"/>`;

  angTs = `import { PuiRadioGroupComponent } from '@bhairab-patra/platform-ui';
import { RadioOption } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiRadioGroupComponent, FormsModule] })
export class MyComponent {
  plans: RadioOption[] = [
    { label: 'Free',       value: 'free' },
    { label: 'Pro',        value: 'pro'  },
    { label: 'Enterprise', value: 'ent'  },
  ];
  sizes:       RadioOption[] = [{label:'S',value:'sm'},{label:'M',value:'md'}];
  regions:     RadioOption[] = [{label:'Americas',value:'amer'},{label:'EMEA',value:'emea'}];
  selectedPlan = 'free';
  size = 'md'; region = ''; regionError = '';

  onPlanChange(val: string) { console.log('Plan:', val); }
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

const OPTIONS = [
  { label: 'Free', value: 'free' },
  { label: 'Pro',  value: 'pro'  },
];

export function PlanPicker() {
  const [plan, setPlan] = useState('free');
  const radioRef = useRef<any>(null);

  useEffect(() => {
    const el = radioRef.current;
    if (!el) return;
    el.options = OPTIONS;                // JS property (array)
    const handler = (e: CustomEvent) => setPlan(e.detail);
    el.addEventListener('valueChange', handler);
    return () => el.removeEventListener('valueChange', handler);
  }, []);

  return <pui-lib-radio-group ref={radioRef} label="Subscription"/>;
}`;

  get angularCode(): string {
    return `${this.angHtml}\n\n// component.ts\n${this.angTs}`;
  }

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-lib-radio-group id="planGroup" label="Subscription plan"></pui-lib-radio-group>

<script>
  const el = document.getElementById('planGroup');

  // Set options as a JS property
  el.options = [
    { label: 'Free', value: 'free' },
    { label: 'Pro',  value: 'pro'  },
  ];

  // OR pass as JSON string attribute
  // el.setAttribute('options', JSON.stringify([...]));

  el.addEventListener('valueChange', e => console.log('Selected:', e.detail));
</script>`;

  api: ApiRow[] = [
    { input: 'label',      type: 'string',          default: "''",        description: 'Legend label for the radio group' },
    { input: 'options',    type: 'RadioOption[]',   default: '[]',        description: 'Array of { label, value, hint?, disabled? }' },
    { input: 'disabled',   type: 'boolean',         default: 'false',     description: 'Disables all options in the group' },
    { input: 'required',   type: 'boolean',         default: 'false',     description: 'Shows required asterisk on the legend' },
    { input: 'error',      type: 'string',          default: "''",        description: 'Error message shown below the group' },
    { input: 'hint',       type: 'string',          default: "''",        description: 'Helper text shown below the group' },
    { input: 'direction',  type: "'vertical'|'horizontal'", default: "'vertical'", description: 'Layout direction of the options' },
    { input: 'groupName',  type: 'string',          default: 'auto',      description: 'HTML name attribute for radio inputs (auto-generated)' },
    { input: 'valueChange',type: 'EventEmitter<any>', default: '—',       description: 'Emits the selected value on change' },
    { input: 'changed',    type: 'EventEmitter<any>', default: '—',       description: 'Alias output for change events' },
  ];
}
