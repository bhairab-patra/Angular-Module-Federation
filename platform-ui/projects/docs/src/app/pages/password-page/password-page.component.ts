import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiPasswordInputComponent, PuiInputComponent } from '@bhairab-patra/platform-ui';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-password-page',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DocPageComponent,
    PuiPasswordInputComponent,
    PuiInputComponent,
    FrameworkPreviewComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss'],
})
export class PasswordPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  basicPw = '';
  strengthPw = '';
  rulesPw = '';
  strength = '';

  xfwRows = [
    { name: 'value', angular: '[value]="pw"', attr: 'value="…"', js: 'el.value = "…"' },
    {
      name: 'placeholder',
      angular: 'placeholder="…"',
      attr: 'placeholder="…"',
      js: 'el.placeholder = "…"',
    },
    {
      name: 'showStrength',
      angular: '[showStrength]="true"',
      attr: 'show-strength',
      js: 'el.showStrength = true',
    },
    {
      name: 'showRules',
      angular: '[showRules]="true"',
      attr: 'show-rules',
      js: 'el.showRules = true',
    },
    {
      name: 'minLength',
      angular: '[minLength]="10"',
      attr: 'min-length="10"',
      js: 'el.minLength = 10',
    },
    {
      name: 'requireUpper',
      angular: '[requireUpper]="true"',
      attr: 'require-upper',
      js: 'el.requireUpper = true',
    },
    {
      name: 'requireNumber',
      angular: '[requireNumber]="true"',
      attr: 'require-number',
      js: 'el.requireNumber = true',
    },
    {
      name: 'requireSpecial',
      angular: '[requireSpecial]="true"',
      attr: 'require-special',
      js: 'el.requireSpecial = true',
    },
    { name: 'copyable', angular: '[copyable]="true"', attr: 'copyable', js: 'el.copyable = true' },
    { name: 'disabled', angular: '[disabled]="true"', attr: 'disabled', js: 'el.disabled = true' },
    { name: 'error', angular: 'error="msg"', attr: 'error="msg"', js: 'el.error = "msg"' },
    {
      name: 'valueChange',
      angular: '(valueChange)="fn($event)"',
      attr: '—',
      js: 'el.addEventListener(…)',
    },
    {
      name: 'strengthChange',
      angular: '(strengthChange)="fn($event)"',
      attr: '—',
      js: 'el.addEventListener(…)',
    },
  ];

  angularCode = `import { PuiPasswordInputComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiPasswordInputComponent],
  template: \`
    <pui-lib-password-input
      placeholder="Enter password"
      [showStrength]="true"
      [showRules]="true"
      [minLength]="10"
      [requireUpper]="true"
      [requireNumber]="true"
      (valueChange)="password = $event"
      (strengthChange)="strength = $event">
    </pui-lib-password-input>
  \`
})
export class MyComponent {
  password = '';
  strength = '';
}`;

  reactCode = `import '@bhairab-patra/platform-ui';
import { useState } from 'react';

function SignupForm() {
  const [password, setPassword] = useState('');
  return (
    <form>
      <pui-lib-password-input
        placeholder="Create a strong password"
        show-strength
        show-rules
        min-length="10"
        require-upper
        require-number
        onValueChange={e => setPassword(e.detail)}
      />
      <pui-lib-password-input
        placeholder="Confirm password"
      />
    </form>
  );
}`;

  htmlCode = `<pui-lib-password-input
  id="pw"
  placeholder="Enter password"
  show-strength
  show-rules
  min-length="12"
  require-upper
  require-number
  require-special
  copyable>
</pui-lib-password-input>

<script>
document.getElementById('pw').addEventListener('valueChange', e => {
  console.log('password:', e.detail);
});
</script>`;

  api: ApiRow[] = [
    {
      input: 'value',
      type: 'string',
      default: '""',
      description:
        'Current password value. Supports two-way binding via (valueChange), or bind with formControlName / [(ngModel)] — the component implements ControlValueAccessor.',
    },
    {
      input: 'placeholder',
      type: 'string',
      default: '"Enter password"',
      description: 'Input placeholder text.',
    },
    {
      input: 'size',
      type: `'sm'|'md'|'lg'`,
      default: `'md'`,
      description:
        'Field height — 34px / 44px / 50px, matching Input, Select, Combobox, and Multi Select at the same size.',
    },
    {
      input: 'showStrength',
      type: 'boolean',
      default: 'false',
      description: 'Displays a 4-segment strength bar and label below the input.',
    },
    {
      input: 'showRules',
      type: 'boolean',
      default: 'false',
      description: 'Shows a live validation checklist when the input is focused.',
    },
    {
      input: 'minLength',
      type: 'number',
      default: '8',
      description: 'Minimum length rule shown in the checklist when showRules is true.',
    },
    {
      input: 'requireUpper',
      type: 'boolean',
      default: 'false',
      description: 'Adds an uppercase letter rule to the checklist.',
    },
    {
      input: 'requireNumber',
      type: 'boolean',
      default: 'false',
      description: 'Adds a number rule to the checklist.',
    },
    {
      input: 'requireSpecial',
      type: 'boolean',
      default: 'false',
      description: 'Adds a special character rule to the checklist.',
    },
    {
      input: 'copyable',
      type: 'boolean',
      default: 'false',
      description: 'Shows a clipboard button. Icon turns green on successful copy.',
    },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    {
      input: 'autocomplete',
      type: 'string',
      default: '"current-password"',
      description: 'HTML autocomplete attribute value.',
    },
    {
      input: 'error',
      type: 'string',
      default: '""',
      description: 'Error message shown below the input with a red border.',
    },
    {
      input: 'hint',
      type: 'string',
      default: '""',
      description: 'Helper text shown below the input (hidden when error is set).',
    },
    {
      input: 'valueChange',
      type: 'EventEmitter<string>',
      default: '—',
      description: 'Emits the password string on every keystroke.',
    },
    {
      input: 'strengthChange',
      type: 'EventEmitter',
      default: '—',
      description: 'Emits the strength level: weak, fair, strong, or very-strong.',
    },
    {
      input: 'formControlName / ngModel',
      type: '—',
      default: '—',
      description:
        'Implements ControlValueAccessor, so the component works directly with Reactive Forms and template-driven forms — no manual (valueChange) wiring needed.',
    },
    {
      input: 'Validator (NG_VALIDATORS)',
      type: '—',
      default: '—',
      description:
        "When bound via Reactive Forms, minLength/requireUpper/requireNumber/requireSpecial are enforced as a real Angular validator — the control's .errors.passwordStrength carries the same message shown in the UI. No need to duplicate the rule in your own ValidatorFn.",
    },
  ];
  trackByIndex(_i: number): number {
    return _i;
  }
}
