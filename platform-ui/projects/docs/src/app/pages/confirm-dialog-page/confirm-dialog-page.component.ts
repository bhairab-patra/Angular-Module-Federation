import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { PuiConfirmDialogComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'docs-confirm-dialog-page',
  standalone: true,
  imports: [NgIf, PuiConfirmDialogComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm-dialog-page.component.html',
  styleUrls: ['./confirm-dialog-page.component.scss'],
})
export class ConfirmDialogPageComponent {
  private cdr = inject(ChangeDetectorRef);

  copied = '';
  copy(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id; this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  /* ── Demo 1: Delete confirm ─────────────────── */
  deleteOpen   = false;
  deleteResult = '';

  onDeleteConfirm() { this.deleteResult = '✓ Record deleted.';   this.deleteOpen = false; this.cdr.markForCheck(); }
  onDeleteCancel()  { this.deleteResult = '✕ Cancelled.';        this.deleteOpen = false; this.cdr.markForCheck(); }

  /* ── Demo 2: Info / neutral ──────────────────── */
  infoOpen   = false;
  infoResult = '';

  onInfoConfirm() { this.infoResult = '✓ Changes published.';   this.infoOpen = false; this.cdr.markForCheck(); }
  onInfoCancel()  { this.infoResult = '✕ Kept as draft.';       this.infoOpen = false; this.cdr.markForCheck(); }

  /* ── Demo 3: Logout / warning ────────────────── */
  logoutOpen   = false;
  logoutResult = '';

  onLogoutConfirm() { this.logoutResult = '✓ Logged out.';        this.logoutOpen = false; this.cdr.markForCheck(); }
  onLogoutCancel()  { this.logoutResult = '✕ Stayed logged in.';  this.logoutOpen = false; this.cdr.markForCheck(); }

  /* ── Demo 4: Custom variant ──────────────────── */
  archiveOpen   = false;
  archiveResult = '';

  onArchiveConfirm() { this.archiveResult = '✓ Project archived.'; this.archiveOpen = false; this.cdr.markForCheck(); }
  onArchiveCancel()  { this.archiveResult = '✕ Cancelled.';         this.archiveOpen = false; this.cdr.markForCheck(); }

  /* ── Code snippets ──────────────────────────── */
  angHtml = `<pui-lib-button variant="destructive" (buttonClick)="confirmOpen = true">Delete</pui-lib-button>

<pui-lib-confirm-dialog
  [open]="confirmOpen"
  title="Delete Record?"
  message="This action is permanent and cannot be undone."
  confirmLabel="Yes, Delete"
  cancelLabel="Cancel"
  confirmVariant="destructive"
  (confirmed)="onConfirm()"
  (cancelled)="onCancel()"
  (closed)="confirmOpen = false">
</pui-lib-confirm-dialog>`;

  angTs = `import { PuiConfirmDialogComponent } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiConfirmDialogComponent] })
export class MyComponent {
  confirmOpen = false;

  onConfirm() {
    // perform the action
    this.confirmOpen = false;
  }

  onCancel() {
    this.confirmOpen = false;
  }
}`;

  api: ApiRow[] = [
    { input: 'open',            type: 'boolean',          default: 'false',          description: 'Controls dialog visibility' },
    { input: 'title',           type: 'string',           default: "'Confirm?'",     description: 'Dialog heading text' },
    { input: 'message',         type: 'string',           default: "''",             description: 'Body message text shown below the title' },
    { input: 'confirmLabel',    type: 'string',           default: "'Confirm'",      description: 'Primary (confirm) button label' },
    { input: 'cancelLabel',     type: 'string',           default: "'Cancel'",       description: 'Secondary (cancel) button label' },
    { input: 'confirmVariant',  type: 'ButtonVariant',    default: "'destructive'",  description: 'Variant applied to the confirm button: primary, primary-outline, secondary, destructive, etc.' },
    { input: 'closeOnBackdrop', type: 'boolean',          default: 'true',           description: 'Close when the backdrop is clicked' },
    { input: 'confirmed',       type: 'EventEmitter<void>', default: '—',            description: 'Emits when the user clicks the confirm button' },
    { input: 'cancelled',       type: 'EventEmitter<void>', default: '—',            description: 'Emits when the user clicks cancel or presses Escape' },
    { input: 'closed',          type: 'EventEmitter<void>', default: '—',            description: 'Emits when the dialog closes by any method' },
  ];
}
