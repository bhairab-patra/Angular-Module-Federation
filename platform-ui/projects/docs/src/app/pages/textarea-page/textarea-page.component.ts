import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiTextareaComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-textarea-page',
  standalone: true,
  imports: [NgFor, FormsModule, PuiTextareaComponent, DocPageComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './textarea-page.component.html',
})
export class TextareaPageComponent {
  private cdr = inject(ChangeDetectorRef);

  v1 = '';
  vBio = '';
  rows4 = 4;
  rows3 = 3;
  maxLen = 200;
  showCount = true;
  disabledFlag = true;
  readonlyFlag = true;
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
    { name: 'size', angular: 'size="sm|md|lg"', attr: 'size="sm|md|lg"', js: 'el.size = "md"' },
    { name: 'rows', angular: '[rows]="4"', attr: 'rows="4"', js: 'el.rows = 4' },
    {
      name: 'maxLength',
      angular: '[maxLength]="200"',
      attr: 'max-length="200"',
      js: 'el.maxLength = 200',
    },
    {
      name: 'showCount',
      angular: '[showCount]="bool"',
      attr: '— use JS property',
      js: 'el.showCount = true',
    },
    {
      name: 'resize',
      angular: 'resize="vertical|none|both"',
      attr: 'resize="none"',
      js: 'el.resize = "none"',
    },
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
      name: 'required',
      angular: '[required]="bool"',
      attr: 'required="true"',
      js: 'el.required = true',
    },
    { name: 'error', angular: '[error]="str"', attr: 'error="msg"', js: 'el.error = "msg"' },
    { name: 'hint', angular: '[hint]="str"', attr: 'hint="str"', js: 'el.hint = "..."' },
    {
      name: 'valueChange',
      angular: '(valueChange)="fn($event)"',
      attr: '— use addEventListener',
      js: 'el.addEventListener("valueChange", fn)',
    },
  ];

  angHtml = `<pui-lib-textarea
  label="Description"
  placeholder="Tell us about yourself…"
  [(ngModel)]="bio"
  [rows]="5"
  [maxLength]="500"
  [showCount]="true"
  hint="Shown on your public profile"/>

<pui-lib-textarea label="No resize" resize="none" [(ngModel)]="notes"/>
<pui-lib-textarea label="Error"     [error]="bioError" [(ngModel)]="bio"/>
<pui-lib-textarea label="Disabled"  [disabled]="true"/>`;

  angTs = `import { PuiTextareaComponent } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiTextareaComponent, FormsModule] })
export class MyComponent {
  bio = ''; notes = ''; bioError = '';

  validateBio() {
    this.bioError = this.bio.length < 10
      ? 'Bio must be at least 10 characters' : '';
  }
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

export function BioEditor() {
  const [bio, setBio] = useState('');
  const taRef = useRef<any>(null);

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.rows      = 5;         // JS property (number)
    el.maxLength = 200;
    el.showCount = true;
    const handler = (e: CustomEvent) => setBio(e.detail);
    el.addEventListener('valueChange', handler);
    return () => el.removeEventListener('valueChange', handler);
  }, []);

  return (
    <>
      <pui-lib-textarea ref={taRef} label="Bio" placeholder="Tell us about yourself…"/>
      <p>{bio.length} / 200</p>
    </>
  );
}`;

  get angularCode(): string {
    return `${this.angHtml}\n\n// component.ts\n${this.angTs}`;
  }

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<!-- Numeric/string attributes auto-coerced -->
<pui-lib-textarea
  id="bioField"
  label="Bio"
  placeholder="Tell us about yourself…"
  rows="5"
  max-length="200"
  hint="Shown on your public profile">
</pui-lib-textarea>

<pui-lib-textarea label="Fixed size" resize="none" rows="3"></pui-lib-textarea>
<pui-lib-textarea label="Disabled"   disabled="true"></pui-lib-textarea>

<script>
  const el = document.getElementById('bioField');
  el.showCount = true;
  el.addEventListener('valueChange', e => console.log(e.detail.length, 'chars'));
</script>`;

  api: ApiRow[] = [
    {
      input: 'label',
      type: 'string',
      default: "''",
      description: 'Label shown above the textarea',
    },
    { input: 'placeholder', type: 'string', default: "''", description: 'Placeholder text' },
    { input: 'size', type: "'sm'|'md'|'lg'", default: "'md'", description: 'Visual size variant' },
    { input: 'rows', type: 'number', default: '4', description: 'Initial number of visible rows' },
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
      input: 'resize',
      type: "'both'|'vertical'|'horizontal'|'none'",
      default: "'vertical'",
      description: 'CSS resize direction',
    },
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
  ];
}
