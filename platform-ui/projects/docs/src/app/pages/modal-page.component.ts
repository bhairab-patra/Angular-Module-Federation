import { Component } from '@angular/core';
import { ModalComponent, ButtonComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-modal-page',
  standalone: true,
  imports: [DocPageComponent, ModalComponent, ButtonComponent],
  template: `
    <docs-page
      title="Modal"
      description="Dialog overlay for confirmations, forms, and focused tasks. Click backdrop or ✕ to close."
      [code]="code"
      [api]="api">

      <ng-container demo>
        <pui-button variant="primary" (buttonClick)="basicOpen=true">Open Basic Modal</pui-button>
        <pui-button variant="danger"  (buttonClick)="confirmOpen=true">Open Confirm Modal</pui-button>
        <pui-button variant="secondary" (buttonClick)="lgOpen=true">Open Large Modal</pui-button>
      </ng-container>
    </docs-page>

    <!-- Basic Modal -->
    <pui-modal [open]="basicOpen" title="Basic Modal" (closed)="basicOpen=false">
      <p>This is the modal body. Use <code>ng-content</code> to place any content here.</p>
      <p style="margin-top:8px;color:#64748b;font-size:13px">Click the backdrop or ✕ to close.</p>
      <div footer>
        <pui-button variant="secondary" (buttonClick)="basicOpen=false">Close</pui-button>
        <pui-button variant="primary"   (buttonClick)="basicOpen=false">OK</pui-button>
      </div>
    </pui-modal>

    <!-- Confirm Modal -->
    <pui-modal [open]="confirmOpen" title="Delete Item" size="sm" (closed)="confirmOpen=false">
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      <div footer>
        <pui-button variant="secondary" (buttonClick)="confirmOpen=false">Cancel</pui-button>
        <pui-button variant="danger"    (buttonClick)="confirmOpen=false">Delete</pui-button>
      </div>
    </pui-modal>

    <!-- Large Modal -->
    <pui-modal [open]="lgOpen" title="Large Modal" size="lg" (closed)="lgOpen=false">
      <p>Large modals are great for forms or detailed content.</p>
      <div style="margin-top:16px;display:grid;gap:12px">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px">Form field placeholder 1</div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px">Form field placeholder 2</div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px">Form field placeholder 3</div>
      </div>
      <div footer>
        <pui-button variant="secondary" (buttonClick)="lgOpen=false">Cancel</pui-button>
        <pui-button variant="primary"   (buttonClick)="lgOpen=false">Save</pui-button>
      </div>
    </pui-modal>
  `,
})
export class ModalPageComponent {
  basicOpen   = false;
  confirmOpen = false;
  lgOpen      = false;

  code = `import { ModalComponent, ButtonComponent } from '@solifi/platform-ui';

<!-- Trigger -->
<pui-button (buttonClick)="isOpen=true">Open Modal</pui-button>

<!-- Modal -->
<pui-modal [open]="isOpen" title="Confirm" size="sm" (closed)="isOpen=false">

  <!-- Body — any content -->
  <p>Are you sure?</p>

  <!-- Footer slot -->
  <div footer>
    <pui-button variant="secondary" (buttonClick)="isOpen=false">Cancel</pui-button>
    <pui-button variant="danger"    (buttonClick)="confirm()">Delete</pui-button>
  </div>
</pui-modal>`;

  api: ApiRow[] = [
    { input: 'open',            type: 'boolean',               default: 'false',  description: 'Controls visibility' },
    { input: 'title',           type: 'string',                default: `'Dialog'`, description: 'Header title text' },
    { input: 'size',            type: `'sm' | 'md' | 'lg'`,   default: `'md'`,   description: 'Dialog width' },
    { input: 'closeOnBackdrop', type: 'boolean',               default: 'true',   description: 'Click backdrop to close' },
    { input: '(closed)',        type: 'EventEmitter<void>',    default: '—',      description: 'Fires on close/backdrop click' },
  ];
}
