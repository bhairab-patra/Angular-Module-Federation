import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { PuiPasswordInputComponent } from '@solifi/platform-ui';

@Component({
  selector: 'app-password-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiPasswordInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Password Input"
  description="A secure text input with show/hide toggle, strength meter, validation rules checklist, and optional copy-to-clipboard — works in Angular, React, and plain HTML."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Basic -->
    <div class="demo-section">
      <h3 class="demo-section__title">Basic Password Input</h3>
      <p class="demo-section__desc">A password field with a toggle to reveal or hide the value.</p>
      <div style="width:320px">
        <label class="demo-label">Password</label>
        <pui-password-input
          placeholder="Enter your password"
          (valueChange)="basicPw = $event; cdr.markForCheck()">
        </pui-password-input>
        <p *ngIf="basicPw" class="demo-result">Length: {{ basicPw.length }} chars</p>
      </div>
    </div>

    <!-- 2. Strength meter -->
    <div class="demo-section">
      <h3 class="demo-section__title">Strength Meter</h3>
      <p class="demo-section__desc">Enable <code>showStrength</code> to display a 4-segment colour bar (Weak → Fair → Strong → Very strong) as the user types.</p>
      <div style="width:340px">
        <label class="demo-label">New Password</label>
        <pui-password-input
          placeholder="Create a strong password"
          [showStrength]="true"
          (valueChange)="strengthPw = $event; cdr.markForCheck()"
          (strengthChange)="strength = $event; cdr.markForCheck()">
        </pui-password-input>
        <p *ngIf="strength" class="demo-result">Emitted strength: <strong>{{ strength }}</strong></p>
      </div>
    </div>

    <!-- 3. Validation rules -->
    <div class="demo-section">
      <h3 class="demo-section__title">Validation Rules Checklist</h3>
      <p class="demo-section__desc">Enable <code>showRules</code> to display a live checklist while the field is focused. Combine with <code>requireUpper</code>, <code>requireNumber</code>, and <code>requireSpecial</code>.</p>
      <div style="width:340px">
        <label class="demo-label">Set New Password</label>
        <pui-password-input
          placeholder="Min 10 chars, upper, number, symbol"
          [showStrength]="true"
          [showRules]="true"
          [minLength]="10"
          [requireUpper]="true"
          [requireNumber]="true"
          [requireSpecial]="true"
          (valueChange)="rulesPw = $event; cdr.markForCheck()">
        </pui-password-input>
      </div>
    </div>

    <!-- 4. Copy to clipboard -->
    <div class="demo-section">
      <h3 class="demo-section__title">Copy to Clipboard</h3>
      <p class="demo-section__desc">Enable <code>copyable</code> to show a clipboard button beside the eye toggle. The icon turns green after a successful copy.</p>
      <div style="width:340px">
        <label class="demo-label">Generated Password</label>
        <pui-password-input
          value="p@ssW0rd!Xyz#2025"
          [copyable]="true"
          [showStrength]="true"
          autocomplete="off">
        </pui-password-input>
        <p class="demo-result">Try revealing then copying the pre-filled value.</p>
      </div>
    </div>

    <!-- 5. States -->
    <div class="demo-section">
      <h3 class="demo-section__title">States</h3>
      <p class="demo-section__desc">Disabled locks the input. The <code>error</code> prop adds a red border and shows a message; <code>hint</code> shows helper text.</p>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        <div style="width:280px">
          <label class="demo-label">Disabled</label>
          <pui-password-input value="secretpassword" [disabled]="true"></pui-password-input>
        </div>
        <div style="width:280px">
          <label class="demo-label">Error state</label>
          <pui-password-input
            placeholder="Enter password"
            error="Password must be at least 8 characters">
          </pui-password-input>
        </div>
        <div style="width:280px">
          <label class="demo-label">With hint</label>
          <pui-password-input
            placeholder="Enter password"
            hint="Use a mix of letters, numbers and symbols">
          </pui-password-input>
        </div>
      </div>
    </div>

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead"><code>pui-password-input</code> is a self-contained Web Component. All string and boolean attributes work from HTML. For reactive form integration in Angular, bind with <code>(valueChange)</code>.</p>

    <div class="fw-tabs">
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='angular'" (click)="fwTab='angular'; cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.310H4.936L12 3.405z" fill="#c3002f"/></svg>
        Angular
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='react'" (click)="fwTab='react'; cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><circle cx="12" cy="12" r="2.05" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/></svg>
        React
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='html'" (click)="fwTab='html'; cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/></svg>
        HTML
      </button>
    </div>

    <div *ngIf="fwTab==='angular'" class="fw-panel">
      <div class="fw-note--angular">Import <code>PuiPasswordInputComponent</code> into your component's <code>imports</code> array.</div>
      <pre><code>import &#123; PuiPasswordInputComponent &#125; from '&#64;solifi/platform-ui';

&#64;Component(&#123;
  imports: [PuiPasswordInputComponent],
  template: &#96;
    &lt;pui-password-input
      placeholder="Enter password"
      [showStrength]="true"
      [showRules]="true"
      [minLength]="10"
      [requireUpper]="true"
      [requireNumber]="true"
      (valueChange)="password = $event"
      (strengthChange)="strength = $event"&gt;
    &lt;/pui-password-input&gt;
  &#96;
&#125;)
export class MyComponent &#123;
  password = '';
  strength = '';
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">Boolean attributes like <code>show-strength</code> can be set directly as HTML attributes.</div>
      <pre><code>import '&#64;solifi/platform-ui';

function SignupForm() &#123;
  const [password, setPassword] = useState('');
  return (
    &lt;pui-password-input
      placeholder="Create a password"
      show-strength
      show-rules
      min-length="10"
      require-upper
      require-number
      onValueChange=&#123;e =&gt; setPassword(e.detail)&#125;
    /&gt;
  );
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">All features are available as kebab-case HTML attributes. No JS required for basic usage.</div>
      <pre><code>&lt;pui-password-input
  id="pw"
  placeholder="Enter password"
  show-strength
  show-rules
  min-length="12"
  require-upper
  require-number
  require-special
  copyable&gt;
&lt;/pui-password-input&gt;

&lt;script&gt;
document.getElementById('pw').addEventListener('valueChange', e =&gt; &#123;
  console.log('password:', e.detail);
&#125;);
&lt;/script&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">Password Input Quick Reference</h4>
    <div class="xfw-wrap">
      <table class="xfw-table">
        <thead><tr><th>Property</th><th>Angular</th><th>HTML attr</th><th>JS property</th></tr></thead>
        <tbody>
          <tr *ngFor="let r of xfwRows">
            <td><span class="tag-name">{{ r.name }}</span></td>
            <td><span class="tag-ng">{{ r.angular }}</span></td>
            <td><span class="tag-html">{{ r.attr }}</span></td>
            <td><span class="tag-js">{{ r.js }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

  </ng-container>

</docs-page>
  `,
  styles: [`
    .demo-section { margin-bottom: 40px; }
    .demo-section__title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 6px; }
    .demo-section__desc  { font-size: 13px; color: #6b7280; margin-bottom: 14px; }
    .demo-section__desc code { background:#f3f4f6;padding:1px 5px;border-radius:4px;font-size:12px; }
    .demo-label  { font-size:12px;font-weight:600;color:#374151;margin-bottom:6px;display:block; }
    .demo-result { margin-top:8px;font-size:12px;color:#6b7280; }
    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
})
export class PasswordPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  basicPw    = '';
  strengthPw = '';
  rulesPw    = '';
  strength   = '';

  xfwRows = [
    { name: 'value',          angular: '[value]="pw"',               attr: 'value="…"',         js: 'el.value = "…"'          },
    { name: 'placeholder',    angular: 'placeholder="…"',            attr: 'placeholder="…"',   js: 'el.placeholder = "…"'    },
    { name: 'showStrength',   angular: '[showStrength]="true"',      attr: 'show-strength',     js: 'el.showStrength = true'  },
    { name: 'showRules',      angular: '[showRules]="true"',         attr: 'show-rules',        js: 'el.showRules = true'     },
    { name: 'minLength',      angular: '[minLength]="10"',           attr: 'min-length="10"',   js: 'el.minLength = 10'       },
    { name: 'requireUpper',   angular: '[requireUpper]="true"',      attr: 'require-upper',     js: 'el.requireUpper = true'  },
    { name: 'requireNumber',  angular: '[requireNumber]="true"',     attr: 'require-number',    js: 'el.requireNumber = true' },
    { name: 'requireSpecial', angular: '[requireSpecial]="true"',    attr: 'require-special',   js: 'el.requireSpecial = true'},
    { name: 'copyable',       angular: '[copyable]="true"',          attr: 'copyable',          js: 'el.copyable = true'      },
    { name: 'disabled',       angular: '[disabled]="true"',          attr: 'disabled',          js: 'el.disabled = true'      },
    { name: 'error',          angular: 'error="msg"',                attr: 'error="msg"',       js: 'el.error = "msg"'        },
    { name: 'valueChange',    angular: '(valueChange)="fn($event)"', attr: '—',                 js: 'el.addEventListener(…)'  },
    { name: 'strengthChange', angular: '(strengthChange)="fn($event)"', attr: '—',              js: 'el.addEventListener(…)'  },
  ];

  api: ApiRow[] = [
    { input: 'value',          type: 'string',  default: '""',               description: 'Current password value. Supports two-way binding via (valueChange).' },
    { input: 'placeholder',    type: 'string',  default: '"Enter password"', description: 'Input placeholder text.' },
    { input: 'showStrength',   type: 'boolean', default: 'false',            description: 'Displays a 4-segment strength bar and label below the input.' },
    { input: 'showRules',      type: 'boolean', default: 'false',            description: 'Shows a live validation checklist when the input is focused.' },
    { input: 'minLength',      type: 'number',  default: '8',                description: 'Minimum length rule shown in the checklist when showRules is true.' },
    { input: 'requireUpper',   type: 'boolean', default: 'false',            description: 'Adds an uppercase letter rule to the checklist.' },
    { input: 'requireNumber',  type: 'boolean', default: 'false',            description: 'Adds a number rule to the checklist.' },
    { input: 'requireSpecial', type: 'boolean', default: 'false',            description: 'Adds a special character rule to the checklist.' },
    { input: 'copyable',       type: 'boolean', default: 'false',            description: 'Shows a clipboard button. Icon turns green on successful copy.' },
    { input: 'disabled',       type: 'boolean', default: 'false',            description: 'Disables the input.' },
    { input: 'autocomplete',   type: 'string',  default: '"current-password"', description: 'HTML autocomplete attribute value.' },
    { input: 'error',          type: 'string',  default: '""',               description: 'Error message shown below the input with a red border.' },
    { input: 'hint',           type: 'string',  default: '""',               description: 'Helper text shown below the input (hidden when error is set).' },
    { input: 'valueChange',    type: 'EventEmitter<string>', default: '—',   description: 'Emits the password string on every keystroke.' },
    { input: 'strengthChange', type: 'EventEmitter',         default: '—',   description: 'Emits the strength level: weak, fair, strong, or very-strong.' },
  ];
}
