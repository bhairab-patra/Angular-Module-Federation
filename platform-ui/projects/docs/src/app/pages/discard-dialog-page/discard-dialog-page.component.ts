import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { PuiFormDialogComponent, PuiConfirmDialogComponent, FormDialogField } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'docs-discard-dialog-page',
  standalone: true,
  imports: [NgIf, PuiFormDialogComponent, PuiConfirmDialogComponent, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './discard-dialog-page.component.html',
  styleUrls: ['./discard-dialog-page.component.scss'],
})
export class DiscardDialogPageComponent {
  private cdr = inject(ChangeDetectorRef);

  copied = '';
  copy(id: string, text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id; this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  /* ── Demo 1: Built into Form Dialog (confirmDiscard on, the default) ── */
  protectedOpen = false;
  protectedResult = '';
  protectedFields: FormDialogField[] = [
    { key: 'name', label: 'Full Name', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
  ];
  protectedData: Record<string, any> = { name: '', email: '' };

  onProtectedSave(): void {
    this.protectedResult = '✓ Saved.';
    this.protectedOpen = false;
    this.cdr.markForCheck();
  }
  onProtectedCancel(): void {
    this.protectedResult = '✕ Cancelled — no changes were made, or you confirmed discarding them.';
    this.cdr.markForCheck();
  }

  /* ── Demo 2: confirmDiscard off — closes immediately, no prompt ── */
  unprotectedOpen = false;
  unprotectedResult = '';
  unprotectedFields: FormDialogField[] = [
    { key: 'title', label: 'Note Title', required: true },
  ];
  unprotectedData: Record<string, any> = { title: '' };

  onUnprotectedSave(): void {
    this.unprotectedResult = '✓ Saved.';
    this.unprotectedOpen = false;
    this.cdr.markForCheck();
  }
  onUnprotectedCancel(): void {
    this.unprotectedResult = '✕ Cancelled immediately — any typed text was lost with no warning.';
    this.cdr.markForCheck();
  }

  /* ── Demo 3: Roll-your-own with pui-lib-confirm-dialog, for any custom
     form or modal that isn't pui-lib-form-dialog ── */
  customDirty = false;
  customDiscardOpen = false;
  customResult = '';

  onCustomFieldChange(): void {
    this.customDirty = true;
    this.cdr.markForCheck();
  }

  onCustomCloseAttempt(): void {
    if (this.customDirty) {
      this.customDiscardOpen = true;
    } else {
      this.customResult = '✕ Closed — nothing to discard.';
      this.cdr.markForCheck();
    }
  }

  onCustomDiscardConfirmed(): void {
    this.customDiscardOpen = false;
    this.customDirty = false;
    this.customResult = '✕ Changes discarded.';
    this.cdr.markForCheck();
  }

  onCustomKeepEditing(): void {
    this.customDiscardOpen = false;
    this.cdr.markForCheck();
  }

  /* ── Code snippets ──────────────────────────── */
  angHtml = `<pui-lib-form-dialog
  [open]="dialogOpen"
  title="Edit Profile"
  [fields]="fields"
  [data]="data"

  [confirmDiscard]="true"
  discardTitle="Discard changes?"
  discardMessage="You have unsaved changes that will be lost if you leave."
  discardLabel="Discard"
  keepEditingLabel="Keep Editing"

  (save)="onSave($event)"
  (cancel)="onCancel()"
  (closed)="dialogOpen = false">
</pui-lib-form-dialog>`;

  angTs = `import { PuiFormDialogComponent, FormDialogField } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiFormDialogComponent] })
export class MyComponent {
  dialogOpen = false;

  fields: FormDialogField[] = [
    { key: 'name',  label: 'Full Name', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
  ];

  data = { name: '', email: '' };

  onSave(evt: { data: Record<string, any> }) {
    // persist evt.data
    this.dialogOpen = false;
  }

  onCancel() {
    // fires only AFTER the user confirms discard (or immediately if the
    // form was never touched) — never fires while the discard prompt
    // is open and un-answered.
  }
}`;

  customTs = `// Building your own "discard changes?" flow with pui-lib-confirm-dialog,
// for any form or modal that ISN'T pui-lib-form-dialog.
export class MyCustomModal {
  isDirty = false;
  discardOpen = false;

  onFieldChange() {
    this.isDirty = true;
  }

  // Wire this to your modal's Cancel button / backdrop click / Esc key.
  requestClose() {
    if (this.isDirty) {
      this.discardOpen = true;   // ask first
    } else {
      this.actuallyClose();      // nothing to lose, close right away
    }
  }

  onDiscardConfirmed() {
    this.discardOpen = false;
    this.isDirty = false;
    this.actuallyClose();
  }

  onKeepEditing() {
    this.discardOpen = false;    // just closes the prompt, modal stays open
  }

  private actuallyClose() {
    // your modal's own close logic
  }
}`;

  customHtml = `<!-- your custom modal markup -->
<input (input)="onFieldChange()" [(ngModel)]="draft.name" />
<button (click)="requestClose()">Cancel</button>

<!-- the discard prompt, reused from the shared library -->
<pui-lib-confirm-dialog
  [open]="discardOpen"
  title="Discard changes?"
  message="You have unsaved changes that will be lost if you leave."
  confirmLabel="Discard"
  cancelLabel="Keep Editing"
  confirmVariant="destructive"
  tone="warning"
  (confirmed)="onDiscardConfirmed()"
  (cancelled)="onKeepEditing()">
</pui-lib-confirm-dialog>`;

  api: ApiRow[] = [
    { input: 'confirmDiscard', type: 'boolean', default: 'true', description: 'Ask "Discard changes?" before closing (Cancel button or backdrop click) while the form has unsaved edits. Set false to close immediately with no confirmation, like before this feature existed.' },
    { input: 'discardTitle', type: 'string', default: "'Discard changes?'", description: 'Heading text on the discard-confirmation prompt.' },
    { input: 'discardMessage', type: 'string', default: "'You have unsaved changes that will be lost if you leave.'", description: 'Body text on the discard-confirmation prompt.' },
    { input: 'discardLabel', type: 'string', default: "'Discard'", description: 'Label for the destructive "yes, discard" button.' },
    { input: 'keepEditingLabel', type: 'string', default: "'Keep Editing'", description: 'Label for the "no, stay" button — closes the prompt, form stays open with edits intact.' },
  ];
}
