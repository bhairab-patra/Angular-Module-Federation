import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiInputComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-input-page',
  standalone: true,
  imports: [NgFor, FormsModule, PuiInputComponent, DocPageComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-page.component.html',
})
export class InputPageComponent {
  private cdr = inject(ChangeDetectorRef);

  v1 = '';
  v2 = '';
  vPass = '';
  vSearch = '';
  vBio = '';
  vUsername = '';
  vCoupon = '';
  vPhone = '';
  clearable = true;
  disabledFlag = true;
  readonlyFlag = true;
  showCount = true;
  maxLen = 100;
  fw = 'angular';
  copied = '';

  copy(id: string, text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => {
        this.copied = '';
        this.cdr.markForCheck();
      }, 2000);
    });
  }

  trackByIndex(_i: number): number {
    return _i;
  }

  xfwRows = [
    { name: 'label', angular: 'label="str"', attr: 'label="str"', js: 'el.label = "..."' },
    {
      name: 'placeholder',
      angular: 'placeholder="str"',
      attr: 'placeholder="str"',
      js: 'el.placeholder = "..."',
    },
    {
      name: 'type',
      angular: 'type="text|email|password"',
      attr: 'type="email"',
      js: 'el.type = "email"',
    },
    { name: 'size', angular: 'size="sm|md|lg"', attr: 'size="sm|md|lg"', js: 'el.size = "md"' },
    {
      name: 'disabled',
      angular: '[disabled]="bool"',
      attr: '— use JS property',
      js: 'el.disabled = true',
    },
    {
      name: 'readonly',
      angular: '[readonly]="bool"',
      attr: '— use JS property',
      js: 'el.readonly = true',
    },
    {
      name: 'clearable',
      angular: '[clearable]="bool"',
      attr: '— use JS property',
      js: 'el.clearable = true',
    },
    {
      name: 'maxLength',
      angular: '[maxLength]="100"',
      attr: 'max-length="100"',
      js: 'el.maxLength = 100',
    },
    {
      name: 'showCount',
      angular: '[showCount]="bool"',
      attr: '— use JS property',
      js: 'el.showCount = true',
    },
    {
      name: 'minLength',
      angular: '[minLength]="6"',
      attr: 'min-length="6"',
      js: 'el.minLength = 6',
    },
    {
      name: 'noNumbers',
      angular: '[noNumbers]="bool"',
      attr: '— use JS property',
      js: 'el.noNumbers = true',
    },
    {
      name: 'noSpaces',
      angular: '[noSpaces]="bool"',
      attr: '— use JS property',
      js: 'el.noSpaces = true',
    },
    {
      name: 'lettersOnly',
      angular: '[lettersOnly]="bool"',
      attr: '— use JS property',
      js: 'el.lettersOnly = true',
    },
    {
      name: 'textCase',
      angular: 'textCase="upper|lower|any"',
      attr: 'text-case="upper"',
      js: 'el.textCase = "upper"',
    },
    {
      name: 'pattern',
      angular: 'pattern="^[0-9]{6}$"',
      attr: 'pattern="^[0-9]{6}$"',
      js: 'el.pattern = "^[0-9]{6}$"',
    },
    {
      name: 'validateEmail',
      angular: '[validateEmail]="bool"',
      attr: '— use JS property',
      js: 'el.validateEmail = true',
    },
    { name: 'error', angular: '[error]="errMsg"', attr: 'error="msg"', js: 'el.error = "msg"' },
    { name: 'hint', angular: '[hint]="str"', attr: 'hint="str"', js: 'el.hint = "..."' },
    {
      name: 'valueChange',
      angular: '(valueChange)="fn($event)"',
      attr: '— use addEventListener',
      js: 'el.addEventListener("valueChange", fn)',
    },
    {
      name: 'validityChange',
      angular: '(validityChange)="fn($event)"',
      attr: '— use addEventListener',
      js: 'el.addEventListener("validityChange", fn)',
    },
  ];

  angHtml = `<pui-lib-input label="Full name" placeholder="John Doe" [(ngModel)]="name"/>

<pui-lib-input label="Password" type="password" [(ngModel)]="pass"/>

<pui-lib-input label="Bio" [(ngModel)]="bio"
  [maxLength]="200" [showCount]="true" [clearable]="true"
  hint="Max 200 characters"/>

<pui-lib-input label="Email" [(ngModel)]="email" [error]="emailError" [required]="true"/>
<pui-lib-input label="Read-only" [readonly]="true" placeholder="Fixed value"/>
<pui-lib-input label="Disabled"  [disabled]="true"/>

<!-- Built-in validation — no regex needed for common rules. Errors show
     automatically after blur, and also land in a bound FormControl's
     .errors if you're using Reactive Forms with formControlName. -->
<pui-lib-input label="Username" [(ngModel)]="username"
  [minLength]="6" [lettersOnly]="true"
  hint="Letters only, at least 6 characters"/>

<pui-lib-input label="Coupon code" [(ngModel)]="coupon"
  [noSpaces]="true" textCase="upper"
  hint="Uppercase, no spaces"/>

<!-- Anything the flags above don't cover — write a regex directly -->
<pui-lib-input label="6-digit code" [(ngModel)]="code" pattern="^[0-9]{6}$"/>`;

  angTs = `import { PuiInputComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiInputComponent, FormsModule],
})
export class MyComponent {
  name = ''; pass = ''; bio = ''; email = ''; emailError = '';
  username = ''; coupon = ''; code = '';

  validate() {
    this.emailError = this.email.includes('@') ? '' : 'Invalid email address';
  }
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

export function MyForm() {
  const [name, setName] = useState('');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.clearable = true;
    el.maxLength  = 100;
    const handler = (e: CustomEvent) => setName(e.detail);
    el.addEventListener('valueChange', handler);
    return () => el.removeEventListener('valueChange', handler);
  }, []);

  return (
    <>
      <pui-lib-input ref={inputRef} label="Full name" placeholder="John Doe"/>
      <pui-lib-input label="Email"  type="email" placeholder="you@company.com"/>
    </>
  );
}`;

  get angularCode(): string {
    return `${this.angHtml}\n\n// component.ts\n${this.angTs}`;
  }

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-lib-input id="nameInput" label="Full name" placeholder="John Doe"></pui-lib-input>
<pui-lib-input label="Email" type="email" error="Invalid email"></pui-lib-input>

<script>
  const el = document.getElementById('nameInput');
  el.clearable = true;
  el.maxLength  = 100;
  el.showCount  = true;

  el.addEventListener('valueChange', e => console.log('Value:', e.detail));
</script>`;

  api: ApiRow[] = [
    { input: 'label', type: 'string', default: "''", description: 'Label shown above the input' },
    { input: 'placeholder', type: 'string', default: "''", description: 'Placeholder text' },
    {
      input: 'type',
      type: 'InputType',
      default: "'text'",
      description: 'text | email | password | number | tel | url',
    },
    { input: 'size', type: "'sm'|'md'|'lg'", default: "'md'", description: 'Visual size variant' },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Disables the field' },
    {
      input: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Makes the field read-only',
    },
    {
      input: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Shows required asterisk',
    },
    {
      input: 'error',
      type: 'string',
      default: "''",
      description: 'Error message; applies error styling',
    },
    { input: 'hint', type: 'string', default: "''", description: 'Helper text below the field' },
    {
      input: 'prefixIcon',
      type: 'string (HTML)',
      default: "''",
      description: 'SVG/HTML injected as leading icon',
    },
    {
      input: 'suffixIcon',
      type: 'string (HTML)',
      default: "''",
      description: 'SVG/HTML injected as trailing icon',
    },
    {
      input: 'maxLength',
      type: 'number | null',
      default: 'null',
      description: 'Max character count',
    },
    {
      input: 'showCount',
      type: 'boolean',
      default: 'false',
      description: 'Shows character count badge',
    },
    {
      input: 'clearable',
      type: 'boolean',
      default: 'false',
      description: 'Shows × button to clear the value',
    },
    {
      input: 'autocomplete',
      type: 'string',
      default: "'off'",
      description:
        'Native autocomplete attribute — defaults to off so the browser never suggests/autofills a previously-entered value for this field.',
    },
    {
      input: 'minLength',
      type: 'number | null',
      default: 'null',
      description:
        'Minimum character count — a real validator (unlike maxLength, which only caps typing). Produces the same {minlength:{requiredLength,actualLength}} shape Validators.minLength does.',
    },
    {
      input: 'noNumbers',
      type: 'boolean',
      default: 'false',
      description: 'Rejects any digit 0-9 in the value — e.g. for a name field.',
    },
    {
      input: 'noSpaces',
      type: 'boolean',
      default: 'false',
      description: 'Rejects whitespace anywhere in the value — e.g. for a username or code field.',
    },
    {
      input: 'lettersOnly',
      type: 'boolean',
      default: 'false',
      description:
        'Only a-z/A-Z allowed — no digits, symbols, or spaces. Combine with textCase to also pin the letters to one case.',
    },
    {
      input: 'textCase',
      type: `'upper'|'lower'|'any'`,
      default: "'any'",
      description:
        "Requires every letter in the value to be a specific case. 'any' applies no restriction.",
    },
    {
      input: 'pattern',
      type: 'string',
      default: "''",
      description:
        "Escape hatch for anything minLength/noNumbers/noSpaces/lettersOnly/textCase don't cover — a regex the value must match. Shows a built-in \"doesn't match the required format\" error after blur unless you've set your own [error]. Also registered as a real Angular Validator, so formControlName picks up the same pattern error in form.get('x').errors.",
    },
    {
      input: 'validateEmail',
      type: 'boolean',
      default: "type === 'email'",
      description:
        'Turns on built-in email-format validation. On automatically when type="email" — set explicitly to force it on for a non-email type field, or off to disable it.',
    },
    {
      input: 'valueChange',
      type: 'EventEmitter<string>',
      default: '—',
      description: 'Emits current value on every keystroke',
    },
    {
      input: 'blurred',
      type: 'EventEmitter<void>',
      default: '—',
      description: 'Emits when the field loses focus',
    },
    {
      input: 'validityChange',
      type: 'EventEmitter<boolean>',
      default: '—',
      description:
        "Emits the field's own pattern/email validity whenever it changes — fires even with no surrounding Angular form (plain HTML/React usage included).",
    },
  ];
}
