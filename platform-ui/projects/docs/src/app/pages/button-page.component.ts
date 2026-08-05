import { Component } from '@angular/core';
import { ButtonComponent, FileUploadButtonComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'docs-button-page',
  standalone: true,
  imports: [DocPageComponent, ButtonComponent, FileUploadButtonComponent, NgFor],
  template: `
    <docs-page
      title="Button"
      description="Fully configurable shared button — 11 variants, 3 sizes, dynamic labels, upload progress, and file upload. Wire any action, label, or state from the parent."
      [code]="code"
      [api]="api">

      <ng-container demo>

        <!-- ── Variant grid ── -->
        <div class="variant-table">
          <div class="vt-head"></div>
          <div class="vt-head">Default</div>
          <div class="vt-head">Hover</div>
          <div class="vt-head">Focused</div>
          <div class="vt-head">Disabled</div>

          <div class="vt-label">Primary</div>
          <div class="vt-cell"><pui-button variant="primary">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="primary" forceState="hover">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="primary" forceState="focus">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="primary" [disabled]="true">Button</pui-button></div>

          <div class="vt-label">Primary Light</div>
          <div class="vt-cell"><pui-button variant="primary-light">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="primary-light" forceState="hover">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="primary-light" forceState="focus">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="primary-light" [disabled]="true">Button</pui-button></div>

          <div class="vt-label">Primary Outline</div>
          <div class="vt-cell"><pui-button variant="primary-outline">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="primary-outline" forceState="hover">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="primary-outline" forceState="focus">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="primary-outline" [disabled]="true">Button</pui-button></div>

          <div class="vt-label">Secondary</div>
          <div class="vt-cell"><pui-button variant="secondary">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="secondary" forceState="hover">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="secondary" forceState="focus">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="secondary" [disabled]="true">Button</pui-button></div>

          <div class="vt-label">Secondary Light</div>
          <div class="vt-cell"><pui-button variant="secondary-light">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="secondary-light" forceState="hover">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="secondary-light" forceState="focus">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="secondary-light" [disabled]="true">Button</pui-button></div>

<div class="vt-label">Tertiary Outline</div>
          <div class="vt-cell"><pui-button variant="tertiary-outline">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="tertiary-outline" forceState="hover">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="tertiary-outline" forceState="focus">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="tertiary-outline" [disabled]="true">Button</pui-button></div>

          <div class="vt-label">Text Button</div>
          <div class="vt-cell"><pui-button variant="text">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="text" forceState="hover">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="text" forceState="focus">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="text" [disabled]="true">Button</pui-button></div>

          <div class="vt-label">Destructive</div>
          <div class="vt-cell"><pui-button variant="destructive">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="destructive" forceState="hover">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="destructive" forceState="focus">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="destructive" [disabled]="true">Button</pui-button></div>

          <div class="vt-label">Destructive Light</div>
          <div class="vt-cell"><pui-button variant="destructive-light">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="destructive-light" forceState="hover">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="destructive-light" forceState="focus">Button</pui-button></div>
          <div class="vt-cell"><pui-button variant="destructive-light" [disabled]="true">Button</pui-button></div>

          <div class="vt-label">Chip</div>
          <div class="vt-cell"><pui-button variant="chip">Chip</pui-button></div>
          <div class="vt-cell"><pui-button variant="chip" forceState="hover">Chip</pui-button></div>
          <div class="vt-cell"><pui-button variant="chip" forceState="focus">Chip</pui-button></div>
          <div class="vt-cell"><pui-button variant="chip" [disabled]="true">Chip</pui-button></div>
        </div>

        <!-- ── File Upload ── -->
        <div class="section-divider">
          <span class="section-tag">File Upload</span>
        </div>
        <div class="extra-row">
          <pui-file-button
            label="Button"
            fileTypesLabel=".pdf, .png, .doc"
            accept=".pdf,.png,.doc"
            (fileSelected)="onFileSelected($event)">
          </pui-file-button>
        </div>

        <!-- ── Upload Progress ── -->
        <div class="section-divider">
          <span class="section-tag">Upload Progress</span>
        </div>
        <div class="progress-col">
          <pui-button variant="upload-progress" [label]="'Button'" [progress]="0"  [fullWidth]="true"></pui-button>
          <pui-button variant="upload-progress" [label]="'Button'" [progress]="45" [fullWidth]="true"></pui-button>
        </div>

        <!-- ── Sizes ── -->
        <div class="section-divider">
          <span class="section-tag">Sizes</span>
        </div>
        <div class="extra-row">
          <pui-button variant="primary" size="sm">Small</pui-button>
          <pui-button variant="primary" size="md">Medium</pui-button>
          <pui-button variant="primary" size="lg">Large</pui-button>
        </div>

        <!-- ── Live dynamic demo ── -->
        <div class="section-divider">
          <span class="section-tag">Live — Dynamic Label</span>
        </div>
        <div class="live-demo">
          <div class="live-controls">
            <label class="ctrl-label">Label
              <input class="ctrl-input" [value]="demoLabel" (input)="demoLabel = $any($event.target).value" placeholder="Button label">
            </label>
            <label class="ctrl-label">Variant
              <select class="ctrl-input" (change)="demoVariant = $any($event.target).value">
                <option *ngFor="let v of variantOptions" [value]="v" [selected]="v === demoVariant">{{ v }}</option>
              </select>
            </label>
            <label class="ctrl-label" style="flex-direction:row;align-items:center;gap:8px">
              <input type="checkbox" [checked]="demoDisabled" (change)="demoDisabled = $any($event.target).checked">
              Disabled
            </label>
          </div>
          <div class="live-preview">
            <pui-button
              [variant]="demoVariant"
              [label]="demoLabel"
              [disabled]="demoDisabled">
            </pui-button>
          </div>
        </div>

      </ng-container>
    </docs-page>
  `,
  styles: [`
    /* variant grid */
    .variant-table {
      display: grid;
      grid-template-columns: 140px repeat(4, 1fr);
      gap: 10px 12px;
      align-items: center;
      width: 100%;
    }
    .vt-head {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .06em; color: #9ca3af;
      padding-bottom: 4px; border-bottom: 1px solid #f3f4f6;
    }
    .vt-label { font-size: 13px; color: #374151; font-weight: 500; }
    .vt-cell  { display: flex; align-items: center; }

    /* section blocks */
    .section-block {
      display: flex; flex-direction: column; gap: 16px; width: 100%;
      padding: 20px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px;
    }

    /* section dividers */
    .section-divider {
      display: flex; align-items: center; gap: 12px; width: 100%;
      border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 4px;
    }
    .section-tag {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .07em; color: #9ca3af; white-space: nowrap;
    }

    /* upload progress */
    .progress-col { display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 480px; }

    /* sizes / loading rows */
    .extra-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; width: 100%; }

    /* live demo */
    .live-demo {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px; width: 100%;
    }
    .live-controls {
      display: flex; flex-direction: column; gap: 10px;
      background: #f9fafb; border: 1px solid #e5e7eb;
      border-radius: 10px; padding: 16px;
    }
    .ctrl-label {
      display: flex; flex-direction: column; gap: 4px;
      font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: .05em;
    }
    .ctrl-input {
      padding: 6px 10px; border: 1px solid #e5e7eb; border-radius: 6px;
      font-size: 13px; font-family: inherit; background: #fff;
    }
    .live-preview {
      display: flex; align-items: center; justify-content: center;
      background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px;
    }
  `],
})
export class ButtonPageComponent {
  /* ── Live demo state ── */
  demoLabel = 'Save Changes';
  demoVariant: any = 'primary';
  demoDisabled = false;

  variantOptions = [
    'primary', 'primary-light', 'primary-outline',
    'secondary', 'secondary-light', 'inverse',
    'tertiary-outline', 'text',
    'destructive', 'destructive-light', 'chip',
  ];

  onFileSelected(files: FileList): void {
    console.log('File selected:', files[0]?.name);
  }

  code = `import { ButtonComponent, FileUploadButtonComponent } from '@solifi/platform-ui';

@Component({
  imports: [ButtonComponent, FileUploadButtonComponent],
  template: \`
    <!-- Static variant -->
    <pui-button variant="primary">Save</pui-button>

    <!-- Dynamic label — changes from parent -->
    <pui-button [variant]="btnVariant" [label]="btnLabel" [disabled]="isDisabled"></pui-button>

    <!-- All events wired -->
    <pui-button
      variant="primary"
      [label]="actionLabel"
      (buttonClick)="onSave($event)"
      (buttonFocus)="onFocus($event)"
      (buttonBlur)="onBlur($event)"
      (buttonHover)="onHover($event)"
      (buttonLeave)="onLeave($event)">
    </pui-button>

    <!-- Upload Progress (0–100) -->
    <pui-button
      variant="upload-progress"
      label="Uploading file…"
      [progress]="uploadProgress"
      [fullWidth]="true">
    </pui-button>

    <!-- File Upload -->
    <pui-file-button
      label="Choose File"
      fileTypesLabel=".pdf, .png"
      accept=".pdf,.png"
      (fileSelected)="onFileSelected(\$event)">
    </pui-file-button>
  \`
})
export class MyComponent {
  btnVariant = 'primary';
  btnLabel   = 'Submit';
  isDisabled = false;
  uploadProgress = 0;

  onSave(e: MouseEvent)  { /* handle click  */ }
  onFocus(e: FocusEvent) { /* handle focus  */ }
  onBlur(e: FocusEvent)  { /* handle blur   */ }
  onHover(e: MouseEvent) { /* handle hover  */ }
  onLeave(e: MouseEvent) { /* handle leave  */ }

  onFileSelected(files: FileList) {
    console.log('Selected:', files[0].name);
  }

  // Simulate upload progress
  startUpload() {
    let p = 0;
    const iv = setInterval(() => {
      this.uploadProgress = Math.min(p += 5, 100);
      if (this.uploadProgress === 100) clearInterval(iv);
    }, 200);
  }
}`;

  api: ApiRow[] = [
    { input: 'variant', type: `'primary' | 'primary-light' | 'primary-outline' | 'secondary' | 'secondary-light' | 'inverse' | 'tertiary-outline' | 'text' | 'destructive' | 'destructive-light' | 'chip' | 'upload-progress'`, default: `'primary'`, description: 'Visual style' },
    { input: 'label', type: 'string', default: 'undefined', description: 'Dynamic text label; overrides ng-content when set' },
    { input: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: 'Button size' },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction, reduces opacity to 40%' },
    { input: 'loading', type: 'boolean', default: 'false', description: 'Shows spinner, blocks click' },
    { input: 'progress', type: 'number (0–100)', default: '0', description: 'Upload progress value (variant="upload-progress" only)' },
    { input: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch to 100% container width' },
    { input: 'type', type: `'button' | 'submit' | 'reset'`, default: `'button'`, description: 'Native HTML button type' },
    { input: '(buttonClick)', type: 'EventEmitter<MouseEvent>', default: '—', description: 'Click — suppressed when disabled or loading' },
    { input: '(buttonFocus)', type: 'EventEmitter<FocusEvent>', default: '—', description: 'Focus received' },
    { input: '(buttonBlur)', type: 'EventEmitter<FocusEvent>', default: '—', description: 'Focus lost' },
    { input: '(buttonHover)', type: 'EventEmitter<MouseEvent>', default: '—', description: 'Mouse entered the button' },
    { input: '(buttonLeave)', type: 'EventEmitter<MouseEvent>', default: '—', description: 'Mouse left the button' },
  ];
}
