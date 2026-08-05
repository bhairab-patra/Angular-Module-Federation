import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PuiInputComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-input-page',
  standalone: true,
  imports: [FormsModule, PuiInputComponent, DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <docs-page
      title="Input"
      description="A single-line text field with full state management — focus, hover, error, disabled, readonly. Implements ControlValueAccessor for seamless integration with both template-driven and reactive forms."
      [code]="importCode"
      [api]="api">

      <ng-container demo>

        <!-- Basic -->
        <div class="demo-section">
          <h3 class="demo-section__title">Basic</h3>
          <div class="demo-row">
            <pui-input label="Full name" placeholder="John Doe" [(ngModel)]="v1"/>
            <pui-input label="Email" type="email" placeholder="you@company.com" [(ngModel)]="v2"/>
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
            <pui-input label="Small (sm)" size="sm" placeholder="Small input"/>
            <pui-input label="Medium (md)" size="md" placeholder="Medium input"/>
            <pui-input label="Large (lg)" size="lg" placeholder="Large input"/>
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
            <pui-input label="Default" placeholder="Type here…"/>
            <pui-input label="Disabled" placeholder="Not editable" [disabled]="true" [ngModel]="'Disabled value'"/>
            <pui-input label="Readonly" [readonly]="true" [ngModel]="'Read-only value'"/>
          </div>
        </div>

        <!-- Error -->
        <div class="demo-section">
          <h3 class="demo-section__title">Validation &amp; Error</h3>
          <div class="demo-row">
            <pui-input label="With hint" placeholder="Enter username" hint="3–20 characters, no spaces."/>
            <pui-input label="With error" placeholder="Email address"
                       [ngModel]="'bad-email'" error="Please enter a valid email address." [required]="true"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeError, 'error')">{{ copied['error'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeError }}</code></pre>
          </div>
        </div>

        <!-- Password -->
        <div class="demo-section">
          <h3 class="demo-section__title">Password Toggle</h3>
          <div class="demo-row" style="max-width:360px">
            <pui-input label="Password" type="password" placeholder="Enter password" [(ngModel)]="vPass"
                       hint="Min 8 characters."/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codePass, 'pass')">{{ copied['pass'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codePass }}</code></pre>
          </div>
        </div>

        <!-- Icons -->
        <div class="demo-section">
          <h3 class="demo-section__title">Prefix &amp; Suffix Icons</h3>
          <div class="demo-row">
            <pui-input label="Search" [prefixIcon]="searchIcon" placeholder="Search…" [(ngModel)]="vSearch"/>
            <pui-input label="Website" [prefixIcon]="globeIcon" placeholder="https://…" type="url"/>
            <pui-input label="Price" [suffixIcon]="usdIcon" placeholder="0.00" type="number"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeIcons, 'icons')">{{ copied['icons'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeIcons }}</code></pre>
          </div>
        </div>

        <!-- Clearable / Count -->
        <div class="demo-section">
          <h3 class="demo-section__title">Clearable &amp; Character Count</h3>
          <div class="demo-row">
            <pui-input label="Clearable" placeholder="Type then clear…" [clearable]="true" [(ngModel)]="vClear"/>
            <pui-input label="With count" placeholder="Max 50 chars" [maxLength]="50" [showCount]="true" [(ngModel)]="vCount"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeClear, 'clear')">{{ copied['clear'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeClear }}</code></pre>
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

    /* Code block — matches docs-page standard */
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
export class InputPageComponent {
  v1 = ''; v2 = ''; vPass = ''; vSearch = ''; vClear = ''; vCount = '';
  copied: Record<string, boolean> = {};

  searchIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
  globeIcon  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`;
  usdIcon    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></svg>`;

  importCode = `import { PuiInputComponent } from '@solifi/platform-ui';

// In your standalone component:
imports: [PuiInputComponent, FormsModule]

// Template:
<pui-input label="Full name" placeholder="John Doe" [(ngModel)]="name"/>

// With reactive forms:
<pui-input label="Email" [formControl]="emailCtrl" error="Invalid email"/>`;

  codeBasic = `<pui-input label="Full name" placeholder="John Doe" [(ngModel)]="name"/>
<pui-input label="Email" type="email" placeholder="you@company.com" [(ngModel)]="email"/>`;

  codeSizes = `<pui-input size="sm" label="Small"  placeholder="Small input"/>
<pui-input size="md" label="Medium" placeholder="Medium input"/>
<pui-input size="lg" label="Large"  placeholder="Large input"/>`;

  codeError = `<pui-input label="Username" hint="3–20 characters, no spaces."/>
<pui-input label="Email" error="Please enter a valid email address." [required]="true"/>`;

  codePass = `<pui-input label="Password" type="password" [(ngModel)]="pass" hint="Min 8 characters."/>`;

  codeIcons = `<pui-input label="Search" [prefixIcon]="searchSvgString" [(ngModel)]="q"/>
<pui-input label="Price"  [suffixIcon]="usdSvgString"    type="number"/>`;

  codeClear = `<pui-input label="Clearable" [clearable]="true" [(ngModel)]="val"/>
<pui-input label="With count" [maxLength]="50" [showCount]="true" [(ngModel)]="val"/>`;

  copyCode(code: string, key: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copied[key] = true;
      setTimeout(() => { this.copied[key] = false; }, 2000);
    });
  }

  api: ApiRow[] = [
    { input: 'label',        type: 'string',      default: "''",     description: 'Field label above the input' },
    { input: 'placeholder',  type: 'string',      default: "''",     description: 'Placeholder text' },
    { input: 'type',         type: 'InputType',   default: "'text'", description: 'text | email | password | number | tel | url | search' },
    { input: 'size',         type: 'FormSize',    default: "'md'",   description: 'sm | md | lg' },
    { input: 'disabled',     type: 'boolean',     default: 'false',  description: 'Disables the field' },
    { input: 'readonly',     type: 'boolean',     default: 'false',  description: 'Makes the field read-only' },
    { input: 'required',     type: 'boolean',     default: 'false',  description: 'Shows asterisk on label' },
    { input: 'error',        type: 'string',      default: "''",     description: 'Error message; activates error state' },
    { input: 'hint',         type: 'string',      default: "''",     description: 'Helper text shown below input' },
    { input: 'prefixIcon',   type: 'string',      default: "''",     description: 'SVG HTML string for left icon' },
    { input: 'suffixIcon',   type: 'string',      default: "''",     description: 'SVG HTML string for right icon' },
    { input: 'maxLength',    type: 'number|null', default: 'null',   description: 'Max character count' },
    { input: 'showCount',    type: 'boolean',     default: 'false',  description: 'Show character counter (needs maxLength)' },
    { input: 'clearable',    type: 'boolean',     default: 'false',  description: 'Show clear × button when value present' },
    { input: 'autocomplete', type: 'string',      default: "'off'",  description: 'HTML autocomplete attribute' },
  ];
}
