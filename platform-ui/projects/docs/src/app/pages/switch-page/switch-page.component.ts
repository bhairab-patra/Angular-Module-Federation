import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiSwitchComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-switch-page',
  standalone: true,
  imports: [NgFor, FormsModule, PuiSwitchComponent, DocPageComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './switch-page.component.html',
})
export class SwitchPageComponent {
  private cdr = inject(ChangeDetectorRef);

  v1 = true; v2 = false; vSm = false; vMd = true; vLg = false;
  vDyn1 = true; vDyn2 = false; vDyn3 = true;
  vErr = false; vHint = true;
  preChecked = true; disabledFlag = true;
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
    { name: 'label',         angular: 'label="str"',                     attr: 'label="str"',            js: 'el.label = "..."' },
    { name: 'labelOn',       angular: 'labelOn="On"',                    attr: 'label-on="On"',           js: 'el.labelOn = "On"' },
    { name: 'labelOff',      angular: 'labelOff="Off"',                  attr: 'label-off="Off"',         js: 'el.labelOff = "Off"' },
    { name: 'size',          angular: 'size="sm|md|lg"',                 attr: 'size="sm|md|lg"',         js: 'el.size = "md"' },
    { name: 'checked',       angular: '[checked]="bool" or [(ngModel)]', attr: 'checked="true"',          js: 'el.checked = true' },
    { name: 'disabled',      angular: '[disabled]="bool"',               attr: '— use JS property',       js: 'el.disabled = true' },
    { name: 'required',      angular: '[required]="bool"',               attr: 'required="true"',         js: 'el.required = true' },
    { name: 'error',         angular: '[error]="str"',                   attr: 'error="msg"',             js: 'el.error = "msg"' },
    { name: 'hint',          angular: '[hint]="str"',                    attr: 'hint="str"',              js: 'el.hint = "..."' },
    { name: 'checkedChange', angular: '(checkedChange)="fn($event)"',    attr: '— use addEventListener',  js: 'el.addEventListener("checkedChange", fn)' },
  ];

  angHtml = `<pui-lib-switch label="Enable notifications" [(ngModel)]="notifications"/>

<!-- Dynamic labels -->
<pui-lib-switch labelOn="Active" labelOff="Inactive" [(ngModel)]="isActive"/>

<!-- Sizes -->
<pui-lib-switch label="Small" size="sm" [(ngModel)]="sm"/>
<pui-lib-switch label="Large" size="lg" [(ngModel)]="lg"/>

<!-- States -->
<pui-lib-switch label="Disabled" [disabled]="true" [checked]="true"/>
<pui-lib-switch label="Error"    [error]="'This setting is required'" [(ngModel)]="err"/>`;

  angTs = `import { PuiSwitchComponent } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiSwitchComponent, FormsModule] })
export class MyComponent {
  notifications = true;
  isActive = false;
  sm = false; lg = true; err = false;
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

export function SettingsToggle() {
  const [enabled, setEnabled] = useState(false);
  const swRef = useRef<any>(null);

  useEffect(() => {
    const el = swRef.current;
    if (!el) return;
    const handler = (e: CustomEvent) => setEnabled(e.detail);
    el.addEventListener('checkedChange', handler);
    return () => el.removeEventListener('checkedChange', handler);
  }, []);

  return (
    <>
      <pui-lib-switch
        ref={swRef}
        label="Enable notifications"
        label-on="Enabled"
        label-off="Disabled"
      />
      <p>Status: {enabled ? 'ON' : 'OFF'}</p>
    </>
  );
}`;

  get angularCode(): string {
    return `${this.angHtml}\n\n// component.ts\n${this.angTs}`;
  }

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-lib-switch id="notifSwitch"
  label="Notifications"
  label-on="Enabled"
  label-off="Disabled">
</pui-lib-switch>

<pui-lib-switch label="Dark mode"  checked="true"></pui-lib-switch>
<pui-lib-switch label="Disabled"   disabled="true" checked="true"></pui-lib-switch>

<script>
  const sw = document.getElementById('notifSwitch');
  sw.checked = true;          // JS property
  sw.addEventListener('checkedChange', e => console.log('Value:', e.detail));
</script>`;

  api: ApiRow[] = [
    { input: 'label',          type: 'string',               default: "''",    description: 'Label text shown next to the switch' },
    { input: 'labelOn',        type: 'string',               default: "''",    description: 'Label when switch is ON (overrides label)' },
    { input: 'labelOff',       type: 'string',               default: "''",    description: 'Label when switch is OFF (overrides label)' },
    { input: 'size',           type: "'sm'|'md'|'lg'",      default: "'md'",  description: 'Visual size variant' },
    { input: 'checked',        type: 'boolean',              default: 'false', description: 'Whether the switch is on' },
    { input: 'disabled',       type: 'boolean',              default: 'false', description: 'Disables interaction' },
    { input: 'required',       type: 'boolean',              default: 'false', description: 'Shows required asterisk' },
    { input: 'error',          type: 'string',               default: "''",    description: 'Error message shown below the switch' },
    { input: 'hint',           type: 'string',               default: "''",    description: 'Helper text shown below the switch' },
    { input: 'checkedChange',  type: 'EventEmitter<boolean>', default: '—',   description: 'Emits the new checked state on toggle' },
    { input: 'changed',        type: 'EventEmitter<boolean>', default: '—',   description: 'Alias output for change events' },
  ];
}
