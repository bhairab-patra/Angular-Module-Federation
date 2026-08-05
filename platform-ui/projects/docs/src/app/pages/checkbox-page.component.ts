import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiCheckboxComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';


@Component({
  selector: 'docs-checkbox-page',
  standalone: true,
  imports: [NgFor, FormsModule, PuiCheckboxComponent, DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <docs-page
      title="Checkbox"
      description="A styled checkbox with checked, indeterminate, error, and disabled states. Implements ControlValueAccessor — use with [(ngModel)] or formControl."
      [code]="importCode"
      [api]="api">

      <ng-container demo>

        <!-- Basic -->
        <div class="demo-section">
          <h3 class="demo-section__title">Basic</h3>
          <div class="demo-col">
            <pui-checkbox label="Accept terms and conditions" [(ngModel)]="v1"/>
            <pui-checkbox label="Subscribe to newsletter"    [(ngModel)]="v2"/>
            <pui-checkbox label="Pre-checked"                [checked]="true"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeBasic, 'basic')">{{ copied['basic'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeBasic }}</code></pre>
          </div>
        </div>

        <!-- Indeterminate -->
        <div class="demo-section">
          <h3 class="demo-section__title">Indeterminate State</h3>
          <p class="demo-desc">Use <code>[indeterminate]="true"</code> to show the dash (–) state for a "select all" parent checkbox.</p>
          <div class="demo-col">
            <pui-checkbox label="Select all (parent)" [indeterminate]="true"/>
            <div style="padding-left:28px;display:flex;flex-direction:column;gap:10px">
              <pui-checkbox label="Item A" [(ngModel)]="ia"/>
              <pui-checkbox label="Item B" [(ngModel)]="ib"/>
              <pui-checkbox label="Item C" [(ngModel)]="ic"/>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeIndet, 'indet')">{{ copied['indet'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeIndet }}</code></pre>
          </div>
        </div>

        <!-- States -->
        <div class="demo-section">
          <h3 class="demo-section__title">All States</h3>
          <div class="demo-col">
            <pui-checkbox label="Default unchecked"/>
            <pui-checkbox label="Checked"               [checked]="true"/>
            <pui-checkbox label="Disabled unchecked"    [disabled]="true"/>
            <pui-checkbox label="Disabled checked"      [checked]="true" [disabled]="true"/>
            <pui-checkbox label="Error state"           error="You must accept the terms."/>
            <pui-checkbox label="With hint"             hint="You can change this later."/>
            <pui-checkbox label="Required field"        [required]="true"/>
          </div>
        </div>

        <!-- Group -->
        <div class="demo-section">
          <h3 class="demo-section__title">Checkbox Group</h3>
          <p class="demo-desc">Selected: <strong>{{ selectedFeatures.join(', ') || 'none' }}</strong></p>
          <div class="demo-col">
            <pui-checkbox *ngFor="let f of features"
                          [label]="f.label"
                          [checked]="isSelected(f.value)"
                          (changed)="toggleFeature(f.value, $event)"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeGroup, 'group')">{{ copied['group'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeGroup }}</code></pre>
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
    .demo-desc { font-size: 13px; color: #6b7280; margin: 0 0 12px; line-height: 1.6; }
    .demo-desc code { background: #f3f4f6; padding: 1px 5px; border-radius: 4px; font-size: 12px; }
    .demo-col { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }

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
export class CheckboxPageComponent {
  v1 = false; v2 = true;
  ia = true; ib = false; ic = false;
  selectedFeatures: string[] = ['dark-mode'];
  copied: Record<string, boolean> = {};

  features = [
    { label: 'Dark mode', value: 'dark-mode' },
    { label: 'Email digest', value: 'email' },
    { label: 'Push notifications', value: 'push' },
    { label: 'Two-factor auth', value: '2fa' },
  ];

  isSelected(v: string): boolean { return this.selectedFeatures.includes(v); }

  toggleFeature(v: string, checked: boolean): void {
    this.selectedFeatures = checked
      ? [...this.selectedFeatures, v]
      : this.selectedFeatures.filter(x => x !== v);
  }

  copyCode(code: string, key: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copied[key] = true;
      setTimeout(() => { this.copied[key] = false; }, 2000);
    });
  }

  importCode = `import { PuiCheckboxComponent } from '@solifi/platform-ui';

// In your standalone component:
imports: [PuiCheckboxComponent, FormsModule]

// Template — two-way binding:
<pui-checkbox label="Accept terms" [(ngModel)]="accepted"/>

// Template — event-based:
<pui-checkbox label="Opt in" (changed)="onToggle($event)"/>`;

  codeBasic = `<pui-checkbox label="Accept terms and conditions" [(ngModel)]="accepted"/>
<pui-checkbox label="Subscribe to newsletter"    [(ngModel)]="subscribe"/>`;

  codeIndet = `<!-- Parent -->
<pui-checkbox label="Select all" [indeterminate]="someSelected && !allSelected"
              [checked]="allSelected" (changed)="toggleAll($event)"/>
<!-- Children -->
<pui-checkbox *ngFor="let item of items"
              [label]="item.label" [(ngModel)]="item.selected"/>`;

  codeGroup = `<pui-checkbox *ngFor="let f of features"
              [label]="f.label"
              [checked]="isSelected(f.value)"
              (changed)="toggleFeature(f.value, $event)"/>`;

  api: ApiRow[] = [
    { input: 'label', type: 'string', default: "''", description: 'Checkbox label text' },
    { input: 'checked', type: 'boolean', default: 'false', description: 'Checked state (two-way via ngModel)' },
    { input: 'indeterminate', type: 'boolean', default: 'false', description: 'Shows dash (–) icon; overrides unchecked state' },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
    { input: 'required', type: 'boolean', default: 'false', description: 'Shows asterisk on label' },
    { input: 'error', type: 'string', default: "''", description: 'Error message; activates error state' },
    { input: 'hint', type: 'string', default: "''", description: 'Helper text shown below' },
  ];
}
