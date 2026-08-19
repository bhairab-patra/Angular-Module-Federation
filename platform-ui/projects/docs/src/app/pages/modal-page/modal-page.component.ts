import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ModalComponent, ButtonComponent, CardComponent, IconComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-modal-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, ModalComponent, ButtonComponent, CardComponent, IconComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  angularCode = `import { ModalComponent, ButtonComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [ModalComponent, ButtonComponent],
  template: \`
    <pui-lib-button variant="primary" (buttonClick)="isOpen=true">Open Modal</pui-lib-button>

    <pui-lib-modal [open]="isOpen" title="Dialog" size="md" (closed)="isOpen=false">
      <p>Body content projected via ng-content.</p>

      <div footer>
        <pui-lib-button variant="secondary" (buttonClick)="isOpen=false">Cancel</pui-lib-button>
        <pui-lib-button variant="primary"   (buttonClick)="confirm()">Confirm</pui-lib-button>
      </div>
    </pui-lib-modal>

    <!-- Destructive pattern -->
    <pui-lib-modal [open]="deleteOpen" title="Delete Item" size="sm" (closed)="deleteOpen=false">
      <p>This cannot be undone.</p>
      <div footer>
        <pui-lib-button variant="secondary"   (buttonClick)="deleteOpen=false">Cancel</pui-lib-button>
        <pui-lib-button variant="destructive" (buttonClick)="onDelete()">Yes, Delete</pui-lib-button>
      </div>
    </pui-lib-modal>
  \`
})
export class MyComponent {
  isOpen     = false;
  deleteOpen = false;
  confirm() { /* ... */ this.isOpen = false; }
  onDelete() { /* ... */ this.deleteOpen = false; }
}`;

  reactCode = `import { useRef, useEffect, useState } from 'react';
import '@bhairab-patra/platform-ui';

function Page() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    const close = () => setOpen(false);
    el.addEventListener('closed', close);
    return () => el.removeEventListener('closed', close);
  }, []);

  return (
    <>
      <pui-lib-button variant="primary" onButtonclick={() => setOpen(true)}>Open</pui-lib-button>

      <pui-lib-modal ref={modalRef} open={open ? '' : undefined} title="Dialog" size="md">
        <p>Body content.</p>
        <div slot="footer">
          <pui-lib-button variant="secondary" onButtonclick={() => setOpen(false)}>Cancel</pui-lib-button>
          <pui-lib-button variant="primary">Confirm</pui-lib-button>
        </div>
      </pui-lib-modal>
    </>
  );
}`;

  htmlCode = `<pui-lib-button id="btn-open" variant="primary">Open Modal</pui-lib-button>

<pui-lib-modal id="my-modal" title="Confirm" size="md">
  <p>Are you sure you want to proceed?</p>
  <div footer style="display:flex;gap:8px;justify-content:flex-end">
    <pui-lib-button id="btn-cancel" variant="secondary">Cancel</pui-lib-button>
    <pui-lib-button id="btn-confirm" variant="primary">Confirm</pui-lib-button>
  </div>
</pui-lib-modal>

<script>
  const modal = document.getElementById('my-modal');
  document.getElementById('btn-open').addEventListener('buttonClick', () => { modal.open = true; });
  document.getElementById('btn-cancel').addEventListener('buttonClick', () => { modal.open = false; });
  modal.addEventListener('closed', () => { modal.open = false; });
</script>`;

  basicOpen   = false;
  confirmOpen = false;
  successOpen = false;
  formOpen    = false;

  xfwRows = [
    { name: 'open',            angular: '[open]="isOpen"',          attr: 'open',              js: 'el.open = true'          },
    { name: 'title',           angular: 'title="Dialog"',           attr: 'title="Dialog"',    js: 'el.title = "Dialog"'     },
    { name: 'size',            angular: 'size="lg"',                attr: 'size="lg"',          js: 'el.size = "lg"'          },
    { name: 'closeOnBackdrop', angular: '[closeOnBackdrop]="false"', attr: 'close-on-backdrop="false"', js: 'el.closeOnBackdrop = false' },
    { name: 'closed',          angular: '(closed)="fn()"',          attr: '—',                 js: 'el.addEventListener(…)'  },
  ];

  api: ApiRow[] = [
    { input: 'open',            type: 'boolean',             default: 'false',    description: 'Controls visibility — set to true to show, false to hide.' },
    { input: 'title',           type: 'string',              default: `'Dialog'`, description: 'Header title text.' },
    { input: 'size',            type: `'sm'|'md'|'lg'`,      default: `'md'`,     description: 'Dialog width — sm 360px Â· md 520px Â· lg 720px.' },
    { input: 'closeOnBackdrop', type: 'boolean',             default: 'true',     description: 'Click backdrop to close.' },
    { input: '(closed)',        type: 'EventEmitter<void>',  default: '—',        description: 'Fires when backdrop or âœ• is clicked — sync your state here.' },
  ];
  trackByIndex(_i: number): number { return _i; }
}
