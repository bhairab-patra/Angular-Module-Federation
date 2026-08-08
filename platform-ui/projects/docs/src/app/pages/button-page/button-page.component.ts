import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { ButtonComponent, FileUploadButtonComponent } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, ButtonComponent, FileUploadButtonComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-page.component.html',
  styleUrls: ['./button-page.component.scss'],
})
export class ButtonPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  angularCode = `import { ButtonComponent, FileUploadButtonComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [ButtonComponent, FileUploadButtonComponent],
  template: \`
    <!-- Static label via ng-content -->
    <pui-lib-button variant="primary" (buttonClick)="onSave($event)">Save</pui-lib-button>

    <!-- Dynamic label input -->
    <pui-lib-button [variant]="btnVariant" [label]="btnLabel" [disabled]="isBusy"></pui-lib-button>

    <!-- Upload progress -->
    <pui-lib-button variant="upload-progress" [label]="'Uploading…'" [progress]="pct" [fullWidth]="true"></pui-lib-button>

    <!-- File picker -->
    <pui-file-button label="Attach File" accept=".pdf,.png" (fileSelected)="onFile($event)"></pui-file-button>
  \`
})
export class MyComponent {
  btnVariant = 'secondary';
  btnLabel   = 'Cancel';
  isBusy     = false;
  pct        = 60;

  onSave(e: MouseEvent)    { /* ... */ }
  onFile(f: FileList)      { console.log(f[0].name); }
}`;

  reactCode = `import '@bhairab-patra/platform-ui';

function ArticleFormFooter({ onCancel, onSaveDraft, onPublish }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '8px' }}>
      <div>
        <pui-lib-button variant="text" size="sm" onButtonclick={onCancel}>
          Cancel
        </pui-lib-button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <pui-lib-button variant="secondary" size="sm" onButtonclick={onSaveDraft}>
          Save Draft
        </pui-lib-button>
        <pui-lib-button variant="primary" size="sm" onButtonclick={onPublish}>
          Publish
        </pui-lib-button>
      </div>
    </div>
  );
}`;

  htmlCode = `<pui-lib-button id="btn-save" variant="primary">Save Changes</pui-lib-button>
<pui-lib-button variant="secondary">Cancel</pui-lib-button>
<pui-lib-button variant="destructive" disabled>Delete</pui-lib-button>
<pui-lib-button variant="primary" full-width>Full Width</pui-lib-button>

<script>
  document.getElementById('btn-save')
    .addEventListener('buttonClick', e => console.log('clicked', e));
</script>`;

  demoLabel    = 'Save Changes';
  demoVariant: any = 'primary';
  demoDisabled = false;
  selectedFile = '';

  variantOptions = [
    'primary', 'primary-light', 'primary-outline',
    'secondary', 'secondary-light',
    'tertiary-outline', 'text',
    'destructive', 'destructive-light', 'chip',
  ];

  onFileSelected(files: FileList): void {
    this.selectedFile = files[0]?.name ?? '';
    this.cdr.markForCheck();
  }

  xfwRows = [
    { name: 'variant',   angular: 'variant="primary"',       attr: 'variant="primary"',  js: 'el.variant = "primary"'   },
    { name: 'label',     angular: '[label]="label"',          attr: '—',                  js: 'el.label = "Save"'        },
    { name: 'size',      angular: 'size="lg"',                attr: 'size="lg"',           js: 'el.size = "lg"'           },
    { name: 'disabled',  angular: '[disabled]="true"',        attr: 'disabled',            js: 'el.disabled = true'       },
    { name: 'loading',   angular: '[loading]="true"',         attr: 'loading',             js: 'el.loading = true'        },
    { name: 'fullWidth', angular: '[fullWidth]="true"',       attr: 'full-width',          js: 'el.fullWidth = true'      },
    { name: 'progress',  angular: '[progress]="pct"',         attr: 'progress="50"',       js: 'el.progress = 50'         },
    { name: 'buttonClick', angular: '(buttonClick)="fn($event)"', attr: '—',              js: 'el.addEventListener(…)'   },
  ];

  api: ApiRow[] = [
    { input: 'variant',      type: `'primary'|'primary-light'|'primary-outline'|'secondary'|'secondary-light'|'tertiary-outline'|'text'|'destructive'|'destructive-light'|'chip'|'upload-progress'`, default: `'primary'`, description: 'Visual style of the button.' },
    { input: 'label',        type: 'string',                  default: 'undefined', description: 'Dynamic text label rendered inside the button; overrides ng-content when set.' },
    { input: 'size',         type: `'sm'|'md'|'lg'`,          default: `'md'`,      description: 'Button size — scales padding and font.' },
    { input: 'disabled',     type: 'boolean',                 default: 'false',     description: 'Disables interaction and reduces opacity to 40%.' },
    { input: 'loading',      type: 'boolean',                 default: 'false',     description: 'Shows a spinner and blocks click events.' },
    { input: 'progress',     type: 'number (0–100)',           default: '0',         description: 'Upload fill percentage (variant="upload-progress" only).' },
    { input: 'fullWidth',    type: 'boolean',                 default: 'false',     description: 'Stretches the button to 100% of its container.' },
    { input: 'type',         type: `'button'|'submit'|'reset'`, default: `'button'`, description: 'Native HTML button type attribute.' },
    { input: '(buttonClick)', type: 'EventEmitter<MouseEvent>', default: '—',        description: 'Fired on click — suppressed when disabled or loading.' },
    { input: '(buttonFocus)', type: 'EventEmitter<FocusEvent>', default: '—',        description: 'Fired when the button receives focus.' },
    { input: '(buttonBlur)',  type: 'EventEmitter<FocusEvent>', default: '—',        description: 'Fired when the button loses focus.' },
    { input: '(buttonHover)', type: 'EventEmitter<MouseEvent>', default: '—',        description: 'Fired on mouseenter.' },
    { input: '(buttonLeave)', type: 'EventEmitter<MouseEvent>', default: '—',        description: 'Fired on mouseleave.' },
  ];
}
