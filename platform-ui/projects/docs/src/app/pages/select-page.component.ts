import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PuiSelectComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-select-page',
  standalone: true,
  imports: [FormsModule, PuiSelectComponent, DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <docs-page
      title="Select"
      description="A styled native dropdown with consistent appearance across browsers. Supports all validation states, disabled options, and custom placeholder text."
      [code]="importCode"
      [api]="api">

      <ng-container demo>

        <!-- Basic -->
        <div class="demo-section">
          <h3 class="demo-section__title">Basic</h3>
          <div class="demo-row">
            <pui-select label="Country" [options]="countries" [(ngModel)]="vCountry" placeholder="Choose a country"/>
            <pui-select label="Role"    [options]="roles"     [(ngModel)]="vRole"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeBasic, 'basic')">{{ copied['basic'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeBasic }}</code></pre>
          </div>
        </div>

        <!-- Sizes -->
        <div class="demo-section">
          <h3 class="demo-section__title">Sizes</h3>
          <div class="demo-col" style="max-width:360px">
            <pui-select size="sm" label="Small (sm)"  [options]="roles"/>
            <pui-select size="md" label="Medium (md)" [options]="roles"/>
            <pui-select size="lg" label="Large (lg)"  [options]="roles"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeSizes, 'sizes')">{{ copied['sizes'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeSizes }}</code></pre>
          </div>
        </div>

        <!-- States -->
        <div class="demo-section">
          <h3 class="demo-section__title">States</h3>
          <div class="demo-row">
            <pui-select label="Default"  [options]="roles"/>
            <pui-select label="Disabled" [options]="roles" [disabled]="true"/>
            <pui-select label="Required" [options]="roles" [required]="true"/>
          </div>
        </div>

        <!-- Validation -->
        <div class="demo-section">
          <h3 class="demo-section__title">Validation &amp; Error</h3>
          <div class="demo-row">
            <pui-select label="With hint"  [options]="roles" hint="Select your primary role."/>
            <pui-select label="With error" [options]="roles" error="Please select a role." [required]="true"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeError, 'error')">{{ copied['error'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeError }}</code></pre>
          </div>
        </div>

        <!-- Disabled options -->
        <div class="demo-section">
          <h3 class="demo-section__title">Disabled Options</h3>
          <div class="demo-col" style="max-width:360px">
            <pui-select label="Plan" [options]="plans" [(ngModel)]="vPlan" hint="Enterprise plan requires contract."/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codePlans, 'plans')">{{ copied['plans'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codePlans }}</code></pre>
          </div>
        </div>

      </ng-container>
    </docs-page>
  `,
  styles: [`
    .demo-section { width: 100%; margin-bottom: 36px; }
    .demo-section:last-child { margin-bottom: 0; }
    .demo-section__title {
      font-size: 15px; font-weight: 600; color: #374151;
      margin: 0 0 14px; padding-bottom: 8px;
      border-bottom: 1px solid #f0f1f3;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .demo-row { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 16px; }
    .demo-row > * { flex: 1; min-width: 200px; }
    .demo-col { display: flex; flex-direction: column; gap: 14px; margin-bottom: 16px; }

    .code-wrap    { border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; }
    .code-header  {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 20px; background: #1e293b; border-bottom: 1px solid #334155;
    }
    .code-lang {
      font-size: 11px; color: #64748b; font-weight: 700;
      text-transform: uppercase; letter-spacing: .07em;
    }
    .copy-btn {
      padding: 3px 12px; border-radius: 5px;
      border: 1px solid #334155; background: #0f172a;
      color: #94a3b8; font-size: 12px; cursor: pointer; font-family: inherit;
    }
    .copy-btn:hover { color: #e2e8f0; border-color: #475569; }
    pre { background: #1e1e2e; color: #cdd6f4; padding: 18px 20px; margin: 0;
          font-size: 13px; overflow-x: auto; border-radius: 0; border: none; }
    pre code { font-family: 'JetBrains Mono', 'Fira Code', monospace; white-space: pre; }
  `],
})
export class SelectPageComponent {
  vCountry = ''; vRole = ''; vPlan = '';
  copied: Record<string, boolean> = {};

  countries = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'India',          value: 'in' },
    { label: 'Germany',        value: 'de' },
  ];
  roles = [
    { label: 'Admin',  value: 'admin'  },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ];
  plans = [
    { label: 'Free',       value: 'free' },
    { label: 'Pro',        value: 'pro'  },
    { label: 'Enterprise', value: 'ent', disabled: true },
  ];

  importCode = `import { PuiSelectComponent } from '@solifi/platform-ui';
import { SelectOption } from '@solifi/platform-ui';

// In your standalone component:
imports: [PuiSelectComponent, FormsModule]

// Template:
<pui-select label="Role" [options]="roles" [(ngModel)]="role"/>

// Options model:
roles: SelectOption[] = [
  { label: 'Admin',  value: 'admin'  },
  { label: 'Editor', value: 'editor' },
];`;

  codeBasic = `<pui-select label="Country" [options]="countries" [(ngModel)]="country"
            placeholder="Choose a country"/>`;

  codeSizes = `<pui-select size="sm" label="Small"  [options]="opts"/>
<pui-select size="md" label="Medium" [options]="opts"/>
<pui-select size="lg" label="Large"  [options]="opts"/>`;

  codeError = `<pui-select label="With hint"  [options]="roles" hint="Select your primary role."/>
<pui-select label="With error" [options]="roles" error="Please select a role." [required]="true"/>`;

  codePlans = `plans: SelectOption[] = [
  { label: 'Free',       value: 'free' },
  { label: 'Pro',        value: 'pro'  },
  { label: 'Enterprise', value: 'ent', disabled: true },
];`;

  copyCode(code: string, key: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copied[key] = true;
      setTimeout(() => { this.copied[key] = false; }, 2000);
    });
  }

  api: ApiRow[] = [
    { input: 'label',       type: 'string',         default: "''",                  description: 'Field label' },
    { input: 'placeholder', type: 'string',         default: "'Select an option'",  description: 'Placeholder option text' },
    { input: 'options',     type: 'SelectOption[]', default: '[]',                  description: '{ label, value, disabled? }[]' },
    { input: 'size',        type: 'FormSize',       default: "'md'",                description: 'sm | md | lg' },
    { input: 'disabled',    type: 'boolean',        default: 'false',               description: 'Disables the select' },
    { input: 'required',    type: 'boolean',        default: 'false',               description: 'Shows asterisk on label' },
    { input: 'error',       type: 'string',         default: "''",                  description: 'Error message; activates error state' },
    { input: 'hint',        type: 'string',         default: "''",                  description: 'Helper text shown below' },
  ];
}
