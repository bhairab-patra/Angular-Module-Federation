import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuiSwitchComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-switch-page',
  standalone: true,
  imports: [NgFor, FormsModule, PuiSwitchComponent, DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <docs-page
      title="Switch"
      description="A toggle switch for binary on/off settings. Supports three sizes, dynamic labels that change per state, error state, and full form integration via ControlValueAccessor."
      [code]="importCode"
      [api]="api">

      <ng-container demo>

        <!-- Basic -->
        <div class="demo-section">
          <h3 class="demo-section__title">Basic</h3>
          <div class="demo-col">
            <pui-switch label="Enable notifications" [(ngModel)]="v1"/>
            <pui-switch label="Dark mode"            [(ngModel)]="v2"/>
            <pui-switch label="Pre-enabled"          [checked]="true"/>
          </div>
          <p class="demo-desc">Notifications: <strong>{{ v1 ? 'On' : 'Off' }}</strong></p>
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
          <div class="demo-col">
            <pui-switch size="sm" label="Small (sm)"  [(ngModel)]="vsm"/>
            <pui-switch size="md" label="Medium (md)" [(ngModel)]="vmd"/>
            <pui-switch size="lg" label="Large (lg)"  [(ngModel)]="vlg"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeSizes, 'sizes')">{{ copied['sizes'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeSizes }}</code></pre>
          </div>
        </div>

        <!-- Dynamic labels -->
        <div class="demo-section">
          <h3 class="demo-section__title">Dynamic On/Off Labels</h3>
          <p class="demo-desc">Use <code>labelOn</code> and <code>labelOff</code> to show different text for each state.</p>
          <div class="demo-col">
            <pui-switch labelOn="Active"      labelOff="Inactive"      [(ngModel)]="vDyn1"/>
            <pui-switch labelOn="Public"      labelOff="Private"       [(ngModel)]="vDyn2"/>
            <pui-switch labelOn="Subscribed"  labelOff="Unsubscribed"  [(ngModel)]="vDyn3"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeDyn, 'dyn')">{{ copied['dyn'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeDyn }}</code></pre>
          </div>
        </div>

        <!-- States -->
        <div class="demo-section">
          <h3 class="demo-section__title">All States</h3>
          <div class="demo-col">
            <pui-switch label="Default off"/>
            <pui-switch label="Default on"   [checked]="true"/>
            <pui-switch label="Disabled off" [disabled]="true"/>
            <pui-switch label="Disabled on"  [disabled]="true" [checked]="true"/>
            <pui-switch label="Required *"   [required]="true"/>
            <pui-switch label="Error state"  error="This setting is required."/>
            <pui-switch label="With hint"    hint="You can change this anytime."/>
          </div>
        </div>

        <!-- Settings panel -->
        <div class="demo-section">
          <h3 class="demo-section__title">Settings Panel</h3>
          <div class="settings-card">
            <div class="settings-head">Notification Preferences</div>
            <div class="settings-row" *ngFor="let s of settings">
              <div>
                <div class="s-label">{{ s.label }}</div>
                <div class="s-desc">{{ s.desc }}</div>
              </div>
              <pui-switch [(ngModel)]="s.value"/>
            </div>
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
    .demo-desc code { background: #f3f4f6; padding: 1px 5px; border-radius: 4px; font-size: 12px; }
    .demo-col { display: flex; flex-direction: column; gap: 14px; margin-bottom: 16px; }

    .settings-card {
      background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 20px 24px;
      max-width: 520px;
    }
    .settings-head { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 16px; }
    .settings-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 0; border-bottom: 1px solid #f0f0f0;
    }
    .settings-row:last-child { border-bottom: none; padding-bottom: 0; }
    .s-label { font-size: 14px; font-weight: 500; color: #374151; }
    .s-desc  { font-size: 12px; color: #9ca3af; margin-top: 2px; }

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
export class SwitchPageComponent {
  v1 = true; v2 = false;
  vsm = false; vmd = true; vlg = false;
  vDyn1 = true; vDyn2 = false; vDyn3 = true;
  copied: Record<string, boolean> = {};

  settings = [
    { label: 'Email notifications', desc: 'Receive updates via email',      value: true  },
    { label: 'Push notifications',  desc: 'Receive push alerts on mobile',  value: false },
    { label: 'Weekly digest',       desc: 'Summary email every Monday',     value: true  },
    { label: 'Product updates',     desc: 'New features and announcements', value: false },
  ];

  copyCode(code: string, key: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copied[key] = true;
      setTimeout(() => { this.copied[key] = false; }, 2000);
    });
  }

  importCode = `import { PuiSwitchComponent } from '@solifi/platform-ui';

// In your standalone component:
imports: [PuiSwitchComponent, FormsModule]

// Template:
<pui-switch label="Enable notifications" [(ngModel)]="enabled"/>

// Dynamic labels:
<pui-switch labelOn="Active" labelOff="Inactive" [(ngModel)]="isActive"/>

// Event-based:
<pui-switch label="Dark mode" (changed)="onToggle($event)"/>`;

  codeBasic = `<pui-switch label="Enable notifications" [(ngModel)]="enabled"/>
<pui-switch label="Dark mode"            [(ngModel)]="darkMode"/>`;

  codeSizes = `<pui-switch size="sm" label="Small"/>
<pui-switch size="md" label="Medium"/>
<pui-switch size="lg" label="Large"/>`;

  codeDyn = `<pui-switch labelOn="Active"     labelOff="Inactive"     [(ngModel)]="isActive"/>
<pui-switch labelOn="Public"     labelOff="Private"      [(ngModel)]="isPublic"/>
<pui-switch labelOn="Subscribed" labelOff="Unsubscribed" [(ngModel)]="isSub"/>`;

  api: ApiRow[] = [
    { input: 'label',    type: 'string',   default: "''",    description: 'Label shown regardless of state' },
    { input: 'labelOn',  type: 'string',   default: "''",    description: 'Label shown when checked (overrides label)' },
    { input: 'labelOff', type: 'string',   default: "''",    description: 'Label shown when unchecked (overrides label)' },
    { input: 'size',     type: 'FormSize', default: "'md'",  description: 'sm | md | lg' },
    { input: 'checked',  type: 'boolean',  default: 'false', description: 'Toggle state (two-way via ngModel)' },
    { input: 'disabled', type: 'boolean',  default: 'false', description: 'Disables interaction' },
    { input: 'required', type: 'boolean',  default: 'false', description: 'Shows asterisk on label' },
    { input: 'error',    type: 'string',   default: "''",    description: 'Error message; activates red track state' },
    { input: 'hint',     type: 'string',   default: "''",    description: 'Helper text shown below' },
  ];
}
