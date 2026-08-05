import { Component } from '@angular/core';
import { ModalComponent, ButtonComponent, CardComponent, IconComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-modal-page',
  standalone: true,
  imports: [DocPageComponent, ModalComponent, ButtonComponent, CardComponent, IconComponent],
  template: `
    <docs-page
      title="Modal"
      description="Dialog overlay for confirmations, alerts, forms, and focused tasks. Trigger any dialog from a card or button."
      [code]="code"
      [api]="api">

      <ng-container demo>

        <!-- ── Dialog trigger cards ── -->
        <div class="trigger-grid">

          <!-- Basic -->
          <pui-card variant="flat" [clickable]="true" (cardClick)="basicOpen=true" cardClass="trigger-card">
            <div class="trigger-card__inner">
              <div class="trigger-icon trigger-icon--blue">
                <pui-icon name="message" size="md" color="#fff"></pui-icon>
              </div>
              <div class="trigger-info">
                <div class="trigger-title">Basic Dialog</div>
                <div class="trigger-desc">General-purpose modal with header, body and footer actions.</div>
              </div>
              <pui-icon name="chevron-right" size="sm" color="#9ca3af"></pui-icon>
            </div>
          </pui-card>

          <!-- Confirm / Delete -->
          <pui-card variant="flat" [clickable]="true" (cardClick)="confirmOpen=true" cardClass="trigger-card">
            <div class="trigger-card__inner">
              <div class="trigger-icon trigger-icon--red">
                <pui-icon name="trash" size="md" color="#fff"></pui-icon>
              </div>
              <div class="trigger-info">
                <div class="trigger-title">Confirm Delete</div>
                <div class="trigger-desc">Destructive action confirmation with warning message.</div>
              </div>
              <pui-icon name="chevron-right" size="sm" color="#9ca3af"></pui-icon>
            </div>
          </pui-card>

          <!-- Success -->
          <pui-card variant="flat" [clickable]="true" (cardClick)="successOpen=true" cardClass="trigger-card">
            <div class="trigger-card__inner">
              <div class="trigger-icon trigger-icon--green">
                <pui-icon name="check-circle" size="md" color="#fff"></pui-icon>
              </div>
              <div class="trigger-info">
                <div class="trigger-title">Success Dialog</div>
                <div class="trigger-desc">Confirm a successful action or completion state.</div>
              </div>
              <pui-icon name="chevron-right" size="sm" color="#9ca3af"></pui-icon>
            </div>
          </pui-card>

          <!-- Large form -->
          <pui-card variant="flat" [clickable]="true" (cardClick)="formOpen=true" cardClass="trigger-card">
            <div class="trigger-card__inner">
              <div class="trigger-icon trigger-icon--teal">
                <pui-icon name="edit" size="md" color="#fff"></pui-icon>
              </div>
              <div class="trigger-info">
                <div class="trigger-title">Form Dialog</div>
                <div class="trigger-desc">Large modal with card-based form fields inside.</div>
              </div>
              <pui-icon name="chevron-right" size="sm" color="#9ca3af"></pui-icon>
            </div>
          </pui-card>

        </div>

      </ng-container>
    </docs-page>

    <!-- ══ Basic Modal ══ -->
    <pui-modal [open]="basicOpen" title="Basic Dialog" size="md" (closed)="basicOpen=false">
      <div class="modal-body-content">
        <p class="modal-text">Use <code>ng-content</code> to project any content into the modal body. This is a general-purpose dialog suitable for messages, notices, or lightweight interactions.</p>
        <pui-card variant="flat" size="sm" style="margin-top:12px">
          <div class="info-row">
            <pui-icon name="info" size="sm" color="#0369a1"></pui-icon>
            <span style="font-size:13px;color:#374151">Click the backdrop or ✕ button to close this dialog.</span>
          </div>
        </pui-card>
      </div>
      <div footer class="modal-footer">
        <pui-button variant="secondary" (buttonClick)="basicOpen=false">Cancel</pui-button>
        <pui-button variant="primary"   (buttonClick)="basicOpen=false">Confirm</pui-button>
      </div>
    </pui-modal>

    <!-- ══ Confirm Delete Modal ══ -->
    <pui-modal [open]="confirmOpen" title="Delete Item" size="sm" (closed)="confirmOpen=false">
      <div class="modal-body-content">
        <pui-card variant="flat" size="sm" cardClass="danger-card">
          <div class="danger-inner">
            <div class="danger-icon">
              <pui-icon name="warning" size="lg" color="#b91c1c"></pui-icon>
            </div>
            <div>
              <div class="danger-title">This action cannot be undone</div>
              <div class="danger-desc">Deleting this item will permanently remove it and all associated data from our servers.</div>
            </div>
          </div>
        </pui-card>
      </div>
      <div footer class="modal-footer">
        <pui-button variant="secondary"    (buttonClick)="confirmOpen=false">Cancel</pui-button>
        <pui-button variant="destructive"  (buttonClick)="confirmOpen=false">Yes, Delete</pui-button>
      </div>
    </pui-modal>

    <!-- ══ Success Modal ══ -->
    <pui-modal [open]="successOpen" title="Payment Successful" size="sm" (closed)="successOpen=false">
      <div class="modal-body-content modal-body-content--center">
        <div class="success-icon-wrap">
          <pui-icon name="check-circle" size="xl" color="#15803d"></pui-icon>
        </div>
        <div class="success-title">All done!</div>
        <div class="success-desc">Your payment of <strong>$519.00</strong> has been processed successfully.</div>
        <pui-card variant="flat" size="sm" style="width:100%;margin-top:16px">
          <div class="receipt-row">
            <span class="receipt-label">Transaction ID</span>
            <span class="receipt-value">#TXN-20240610</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Date</span>
            <span class="receipt-value">06/10/2024</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Status</span>
            <span class="receipt-badge">Paid</span>
          </div>
        </pui-card>
      </div>
      <div footer class="modal-footer modal-footer--center">
        <pui-button variant="primary" [fullWidth]="true" (buttonClick)="successOpen=false">Done</pui-button>
      </div>
    </pui-modal>

    <!-- ══ Form Modal ══ -->
    <pui-modal [open]="formOpen" title="Edit Profile" size="lg" (closed)="formOpen=false">
      <div class="modal-body-content">
        <div class="form-grid">
          <pui-card variant="flat" size="sm">
            <div class="form-field">
              <label class="form-label">First Name</label>
              <input class="form-input" type="text" placeholder="John">
            </div>
          </pui-card>
          <pui-card variant="flat" size="sm">
            <div class="form-field">
              <label class="form-label">Last Name</label>
              <input class="form-input" type="text" placeholder="Doe">
            </div>
          </pui-card>
          <pui-card variant="flat" size="sm" style="grid-column:1/-1">
            <div class="form-field">
              <label class="form-label">Email Address</label>
              <div class="form-input-icon">
                <pui-icon name="mail" size="sm" color="#9ca3af"></pui-icon>
                <input class="form-input form-input--icon" type="email" placeholder="john.doe@example.com">
              </div>
            </div>
          </pui-card>
          <pui-card variant="flat" size="sm" style="grid-column:1/-1">
            <div class="form-field">
              <label class="form-label">Role</label>
              <select class="form-input">
                <option>Product Designer</option>
                <option>Engineering Lead</option>
                <option>Product Manager</option>
              </select>
            </div>
          </pui-card>
        </div>
      </div>
      <div footer class="modal-footer">
        <pui-button variant="secondary" (buttonClick)="formOpen=false">Cancel</pui-button>
        <pui-button variant="primary"   (buttonClick)="formOpen=false">Save Changes</pui-button>
      </div>
    </pui-modal>
  `,
  styles: [`
    /* ── Trigger cards ── */
    .trigger-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; }

    :host ::ng-deep .trigger-card {
      background: #f8fafc !important; border-color: #e5e7eb !important;
    }
    :host ::ng-deep .trigger-card:hover {
      border-color: #12C6A8 !important; background: #f0fdf9 !important;
      transform: none !important;
    }

    .trigger-card__inner {
      display: flex; align-items: center; gap: 14px;
    }
    .trigger-icon {
      width: 42px; height: 42px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .trigger-icon--blue  { background: #3b82f6; }
    .trigger-icon--red   { background: #dc2626; }
    .trigger-icon--green { background: #16a34a; }
    .trigger-icon--teal  { background: #0d6e5f; }

    .trigger-info { flex: 1; }
    .trigger-title { font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 3px; }
    .trigger-desc  { font-size: 12px; color: #6b7280; line-height: 1.4; }

    /* ── Modal body helpers ── */
    .modal-body-content { display: flex; flex-direction: column; gap: 12px; }
    .modal-body-content--center { align-items: center; text-align: center; }
    .modal-text { font-size: 14px; color: #374151; line-height: 1.65; margin: 0; }
    .modal-text code { background: #f1f5f9; padding: 1px 6px; border-radius: 4px; font-size: 12px; }

    .info-row { display: flex; align-items: center; gap: 10px; }

    /* ── Modal footer ── */
    .modal-footer { display: flex; gap: 8px; justify-content: flex-end; width: 100%; }
    .modal-footer--center { justify-content: center; }

    /* ── Danger card ── */
    :host ::ng-deep .danger-card {
      background: #fff5f5 !important; border-color: #fecaca !important;
    }
    .danger-inner { display: flex; gap: 14px; align-items: flex-start; }
    .danger-icon  { flex-shrink: 0; margin-top: 2px; }
    .danger-title { font-size: 13px; font-weight: 700; color: #991b1b; margin-bottom: 6px; }
    .danger-desc  { font-size: 13px; color: #6b7280; line-height: 1.5; }

    /* ── Success modal ── */
    .success-icon-wrap { margin-bottom: 8px; }
    .success-title { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 6px; }
    .success-desc  { font-size: 13px; color: #6b7280; line-height: 1.5; }
    .receipt-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid #f3f4f6; }
    .receipt-row:last-child { border-bottom: none; }
    .receipt-label { font-size: 12px; color: #9ca3af; }
    .receipt-value { font-size: 12px; font-weight: 600; color: #111827; }
    .receipt-badge {
      font-size: 11px; font-weight: 700; padding: 2px 10px; border-radius: 999px;
      background: #dcfce7; color: #15803d; border: 1px solid #15803d;
    }

    /* ── Form modal ── */
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .form-field { display: flex; flex-direction: column; gap: 6px; }
    .form-label { font-size: 12px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: .05em; }
    .form-input {
      width: 100%; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 8px;
      font-size: 13px; font-family: inherit; background: #fff; color: #111827; outline: none; box-sizing: border-box;
    }
    .form-input:focus { border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.15); }
    .form-input-icon { position: relative; display: flex; align-items: center; }
    .form-input-icon pui-icon { position: absolute; left: 10px; pointer-events: none; }
    .form-input--icon { padding-left: 34px; }
  `],
})
export class ModalPageComponent {
  basicOpen   = false;
  confirmOpen = false;
  successOpen = false;
  formOpen    = false;

  code = `import { ModalComponent, ButtonComponent, CardComponent } from '@solifi/platform-ui';

// ── Trigger ────────────────────────────────
<pui-button variant="primary" (buttonClick)="isOpen=true">Open Modal</pui-button>

// ── Basic modal ────────────────────────────
<pui-modal [open]="isOpen" title="Dialog" size="md" (closed)="isOpen=false">
  <p>Body content projected via ng-content.</p>
  <pui-card variant="flat" size="sm">Info card inside modal body.</pui-card>

  <div footer>
    <pui-button variant="secondary" (buttonClick)="isOpen=false">Cancel</pui-button>
    <pui-button variant="primary"   (buttonClick)="confirm()">Confirm</pui-button>
  </div>
</pui-modal>

// ── Confirm / destructive ──────────────────
<pui-modal [open]="deleteOpen" title="Delete Item" size="sm" (closed)="deleteOpen=false">
  <pui-card variant="flat" size="sm">
    Are you sure? This cannot be undone.
  </pui-card>
  <div footer>
    <pui-button variant="secondary"   (buttonClick)="deleteOpen=false">Cancel</pui-button>
    <pui-button variant="destructive" (buttonClick)="onDelete()">Yes, Delete</pui-button>
  </div>
</pui-modal>

// ── Sizes: sm | md | lg ────────────────────
<pui-modal size="sm">...</pui-modal>   <!-- 360px -->
<pui-modal size="md">...</pui-modal>   <!-- 520px default -->
<pui-modal size="lg">...</pui-modal>   <!-- 720px -->`;

  api: ApiRow[] = [
    { input: 'open',            type: 'boolean',             default: 'false',    description: 'Controls visibility' },
    { input: 'title',           type: 'string',              default: `'Dialog'`, description: 'Header title text' },
    { input: 'size',            type: `'sm' | 'md' | 'lg'`, default: `'md'`,     description: 'Dialog width — sm=360px · md=520px · lg=720px' },
    { input: 'closeOnBackdrop', type: 'boolean',             default: 'true',     description: 'Click backdrop to close' },
    { input: '(closed)',        type: 'EventEmitter<void>',  default: '—',        description: 'Fires when backdrop or ✕ is clicked' },
  ];
}
