import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PuiRadioGroupComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-radio-page',
  standalone: true,
  imports: [FormsModule, PuiRadioGroupComponent, DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <docs-page
      title="Radio Group"
      description="A group of radio buttons for single-selection from a list. Supports vertical and horizontal layouts, per-option hints, disabled states, and full form integration via ControlValueAccessor."
      [code]="importCode"
      [api]="api">

      <ng-container demo>

        <!-- Basic -->
        <div class="demo-section">
          <h3 class="demo-section__title">Basic</h3>
          <div class="demo-row">
            <pui-radio-group label="Subscription" [options]="plans"   [(ngModel)]="vPlan"/>
            <pui-radio-group label="Contact via"  [options]="contact" [(ngModel)]="vContact"/>
          </div>
          <p class="demo-desc">Selected plan: <strong>{{ vPlan || 'none' }}</strong></p>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeBasic, 'basic')">{{ copied['basic'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeBasic }}</code></pre>
          </div>
        </div>

        <!-- With hints -->
        <div class="demo-section">
          <h3 class="demo-section__title">With Option Hints</h3>
          <div style="max-width:420px">
            <pui-radio-group label="Notification frequency" [options]="freq" [(ngModel)]="vFreq"/>
          </div>
          <div class="code-wrap" style="margin-top:16px">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeHints, 'hints')">{{ copied['hints'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeHints }}</code></pre>
          </div>
        </div>

        <!-- Horizontal -->
        <div class="demo-section">
          <h3 class="demo-section__title">Horizontal Layout</h3>
          <pui-radio-group label="Preferred theme" [options]="theme" [(ngModel)]="vTheme" direction="horizontal"/>
          <div class="code-wrap" style="margin-top:16px">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeHoriz, 'horiz')">{{ copied['horiz'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeHoriz }}</code></pre>
          </div>
        </div>

        <!-- States -->
        <div class="demo-section">
          <h3 class="demo-section__title">States</h3>
          <div class="demo-row">
            <pui-radio-group label="Default"  [options]="yesno" [(ngModel)]="vYes"/>
            <pui-radio-group label="Disabled" [options]="yesno" [disabled]="true" [(ngModel)]="vDisabled"/>
            <pui-radio-group label="Error"    [options]="yesno" error="You must select an option." [required]="true"/>
          </div>
        </div>

        <!-- Disabled options -->
        <div class="demo-section">
          <h3 class="demo-section__title">Disabled Individual Options</h3>
          <div style="max-width:300px">
            <pui-radio-group label="Plan" [options]="plansDis" [(ngModel)]="vPlanD" hint="Enterprise plan coming soon."/>
          </div>
          <div class="code-wrap" style="margin-top:16px">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeDis, 'dis')">{{ copied['dis'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeDis }}</code></pre>
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
    .demo-desc { font-size: 13px; color: #6b7280; margin: 0 0 12px; }
    .demo-row { display: flex; flex-wrap: wrap; gap: 32px; margin-bottom: 16px; }

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
export class RadioPageComponent {
  vPlan = 'pro'; vContact = ''; vFreq = ''; vTheme = ''; vYes = '';
  vDisabled = 'yes'; vPlanD = '';
  copied: Record<string, boolean> = {};

  plans   = [{ label: 'Free', value: 'free' }, { label: 'Pro', value: 'pro' }, { label: 'Enterprise', value: 'ent' }];
  contact = [{ label: 'Email', value: 'email' }, { label: 'Phone', value: 'phone' }, { label: 'Post', value: 'post' }];
  theme   = [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }, { label: 'System', value: 'system' }];
  yesno   = [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }];

  freq = [
    { label: 'Immediately',    value: 'instant', hint: 'As soon as activity occurs'  },
    { label: 'Daily digest',   value: 'daily',   hint: 'One email per day at 8 AM'   },
    { label: 'Weekly summary', value: 'weekly',  hint: 'Every Monday morning'        },
    { label: 'Never',          value: 'never',   hint: 'You can still check manually'},
  ];

  plansDis = [
    { label: 'Free',       value: 'free' },
    { label: 'Pro',        value: 'pro'  },
    { label: 'Enterprise', value: 'ent', disabled: true },
  ];

  copyCode(code: string, key: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copied[key] = true;
      setTimeout(() => { this.copied[key] = false; }, 2000);
    });
  }

  importCode = `import { PuiRadioGroupComponent } from '@solifi/platform-ui';
import { RadioOption } from '@solifi/platform-ui';

// In your standalone component:
imports: [PuiRadioGroupComponent, FormsModule]

// Template:
<pui-radio-group label="Subscription" [options]="plans" [(ngModel)]="plan"/>

// Options model:
plans: RadioOption[] = [
  { label: 'Free', value: 'free' },
  { label: 'Pro',  value: 'pro', hint: 'Most popular' },
];`;

  codeBasic = `<pui-radio-group label="Subscription" [options]="plans" [(ngModel)]="plan"/>`;

  codeHints = `options: RadioOption[] = [
  { label: 'Immediately',  value: 'instant', hint: 'As soon as activity occurs' },
  { label: 'Daily digest', value: 'daily',   hint: 'One email per day at 8 AM'  },
  { label: 'Never',        value: 'never',   hint: 'Check manually anytime'     },
];`;

  codeHoriz = `<pui-radio-group direction="horizontal" [options]="theme" [(ngModel)]="val"/>`;

  codeDis = `options: RadioOption[] = [
  { label: 'Free',       value: 'free' },
  { label: 'Pro',        value: 'pro'  },
  { label: 'Enterprise', value: 'ent', disabled: true },
];`;

  api: ApiRow[] = [
    { input: 'label',     type: 'string',                    default: "''",         description: 'Fieldset legend text' },
    { input: 'options',   type: 'RadioOption[]',             default: '[]',         description: '{ label, value, hint?, disabled? }[]' },
    { input: 'direction', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction of options' },
    { input: 'disabled',  type: 'boolean',                   default: 'false',      description: 'Disables all options in the group' },
    { input: 'required',  type: 'boolean',                   default: 'false',      description: 'Shows asterisk on legend' },
    { input: 'error',     type: 'string',                    default: "''",         description: 'Error message shown below group' },
    { input: 'hint',      type: 'string',                    default: "''",         description: 'Helper text shown below group' },
    { input: 'groupName', type: 'string',                    default: 'auto',       description: 'HTML name attribute (auto-generated if unset)' },
  ];
}
