import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PuiTextareaComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-textarea-page',
  standalone: true,
  imports: [FormsModule, PuiTextareaComponent, DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <docs-page
      title="Textarea"
      description="A multi-line text input with configurable rows, resize control, character counter, and full validation states. Implements ControlValueAccessor."
      [code]="importCode"
      [api]="api">

      <ng-container demo>

        <!-- Basic -->
        <div class="demo-section">
          <h3 class="demo-section__title">Basic</h3>
          <pui-textarea label="Description" placeholder="Tell us about yourself…" [(ngModel)]="v1" [rows]="4" style="width:100%"/>
          <div class="code-wrap" style="margin-top:16px">
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
          <div class="demo-col" style="max-width:500px">
            <pui-textarea size="sm" label="Small (sm)"  placeholder="Small textarea"  [rows]="3"/>
            <pui-textarea size="md" label="Medium (md)" placeholder="Medium textarea" [rows]="3"/>
            <pui-textarea size="lg" label="Large (lg)"  placeholder="Large textarea"  [rows]="3"/>
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
            <pui-textarea label="Default"  placeholder="Type here…"/>
            <pui-textarea label="Disabled" [disabled]="true" [ngModel]="'Cannot edit this content.'"/>
            <pui-textarea label="Readonly" [readonly]="true" [ngModel]="'Read-only content here.'"/>
          </div>
        </div>

        <!-- Validation -->
        <div class="demo-section">
          <h3 class="demo-section__title">Validation &amp; Character Count</h3>
          <div class="demo-row">
            <pui-textarea label="With character count" placeholder="Max 200 characters"
                          hint="Be concise and clear." [maxLength]="200" [showCount]="true" [(ngModel)]="v2"/>
            <pui-textarea label="With error" placeholder="This field is required"
                          error="This field is required." [required]="true"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeError, 'error')">{{ copied['error'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeError }}</code></pre>
          </div>
        </div>

        <!-- Resize -->
        <div class="demo-section">
          <h3 class="demo-section__title">Resize Control</h3>
          <div class="demo-row">
            <pui-textarea label="Vertical only (default)" resize="vertical" [rows]="3" placeholder="Drag bottom edge to resize"/>
            <pui-textarea label="No resize"               resize="none"     [rows]="3" placeholder="Fixed height, no handle"/>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeResize, 'resize')">{{ copied['resize'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeResize }}</code></pre>
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
export class TextareaPageComponent {
  v1 = ''; v2 = '';
  copied: Record<string, boolean> = {};

  copyCode(code: string, key: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copied[key] = true;
      setTimeout(() => { this.copied[key] = false; }, 2000);
    });
  }

  importCode = `import { PuiTextareaComponent } from '@solifi/platform-ui';

// In your standalone component:
imports: [PuiTextareaComponent, FormsModule]

// Template:
<pui-textarea label="Description" placeholder="…" [(ngModel)]="text" [rows]="4"/>

// With character count:
<pui-textarea label="Bio" [maxLength]="200" [showCount]="true" [(ngModel)]="bio"/>`;

  codeBasic = `<pui-textarea label="Description" placeholder="Tell us about yourself…"
              [(ngModel)]="text" [rows]="4"/>`;

  codeSizes = `<pui-textarea size="sm" label="Small"  [rows]="3"/>
<pui-textarea size="md" label="Medium" [rows]="3"/>
<pui-textarea size="lg" label="Large"  [rows]="3"/>`;

  codeError = `<pui-textarea label="Bio" hint="Be concise." [maxLength]="200" [showCount]="true" [(ngModel)]="bio"/>
<pui-textarea label="Notes" error="This field is required." [required]="true"/>`;

  codeResize = `<pui-textarea resize="vertical"/>  <!-- default: drag bottom -->
<pui-textarea resize="none"/>     <!-- fixed height, no handle -->`;

  api: ApiRow[] = [
    { input: 'label',       type: 'string',                               default: "''",        description: 'Field label' },
    { input: 'placeholder', type: 'string',                               default: "''",        description: 'Placeholder text' },
    { input: 'size',        type: 'FormSize',                             default: "'md'",      description: 'sm | md | lg' },
    { input: 'rows',        type: 'number',                               default: '4',         description: 'Initial visible row count' },
    { input: 'resize',      type: "'both' | 'vertical' | 'horizontal' | 'none'", default: "'vertical'", description: 'CSS resize behaviour' },
    { input: 'disabled',    type: 'boolean',                              default: 'false',     description: 'Disables the field' },
    { input: 'readonly',    type: 'boolean',                              default: 'false',     description: 'Makes the field read-only' },
    { input: 'required',    type: 'boolean',                              default: 'false',     description: 'Shows asterisk on label' },
    { input: 'error',       type: 'string',                               default: "''",        description: 'Error message; activates error state' },
    { input: 'hint',        type: 'string',                               default: "''",        description: 'Helper text shown below' },
    { input: 'maxLength',   type: 'number | null',                        default: 'null',      description: 'Maximum character count' },
    { input: 'showCount',   type: 'boolean',                              default: 'false',     description: 'Show live character counter (needs maxLength)' },
  ];
}
