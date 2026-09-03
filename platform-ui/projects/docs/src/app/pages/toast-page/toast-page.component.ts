import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ToastService, ToastPosition, ToastVariant } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-toast-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './toast-page.component.html',
  styleUrls: ['./toast-page.component.scss'],
})
export class ToastPageComponent {
  private toastSvc = inject(ToastService);
  copied = '';
  activeVariant: ToastVariant = 'soft';

  get angularCode(): string {
    return `${this.angularTpl}\n\n// component.ts\n${this.angularTs}`;
  }
  get toast(): typeof this.toastSvc {
    return this.toastSvc;
  }

  doCopy(text: string, id: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      setTimeout(() => (this.copied = ''), 2000);
    });
  }

  setVariant(v: ToastVariant): void {
    this.activeVariant = v;
  }

  showSuccess(): void {
    this.toastSvc.success('Your changes have been saved successfully.', {
      title: 'Changes Saved',
      variant: this.activeVariant,
    });
  }
  showError(): void {
    this.toastSvc.error('Unable to save your changes. Please try again.', {
      title: 'Error Occurred',
      variant: this.activeVariant,
    });
  }
  showWarning(): void {
    this.toastSvc.warning('Your subscription will expire in 3 days.', {
      title: 'Action Required',
      variant: this.activeVariant,
    });
  }
  showInfo(): void {
    this.toastSvc.info('12 new products have been added to your inventory.', {
      title: 'Inventory Updated',
      variant: this.activeVariant,
    });
  }
  showWithTitle(): void {
    this.toastSvc.success('Your profile has been updated successfully.', {
      title: 'Profile Saved',
      variant: this.activeVariant,
    });
  }
  showWithAction(): void {
    this.toastSvc.warning('Email moved to Trash.', {
      title: 'Item Deleted',
      duration: 6000,
      variant: this.activeVariant,
      action: { label: 'Undo', callback: () => console.warn('Undo clicked') },
    });
  }
  showPersistent(): void {
    this.toastSvc.info('This notification will stay until dismissed.', {
      title: 'Persistent',
      duration: 0,
      variant: this.activeVariant,
    });
  }

  trackByIndex(_i: number): number {
    return _i;
  }

  at(pos: string): void {
    this.toastSvc.info(`This toast is anchored to the ${pos} corner of the screen.`, {
      title: 'Position Preview',
      position: pos as ToastPosition,
      variant: this.activeVariant,
    });
  }
  dur(ms: number): void {
    this.toastSvc.success(`This toast will auto-dismiss after ${ms / 1000}s.`, {
      title: 'Duration Preview',
      duration: ms,
      variant: this.activeVariant,
    });
  }

  angularTpl = `<!-- app.component.html — add once in root -->
<router-outlet></router-outlet>
<pui-lib-toast-container></pui-lib-toast-container>`;

  angularTs = `import { PuiToastContainerComponent, ToastService } from '@bhairab-patra/platform-ui';

// app.component.ts — include PuiToastContainerComponent
@Component({
  standalone: true,
  imports: [RouterOutlet, PuiToastContainerComponent],
  template: \`<router-outlet></router-outlet><pui-lib-toast-container></pui-lib-toast-container>\`,
})
export class AppComponent {}

// any-feature.component.ts — inject and call
@Component({ ... })
export class ProductsComponent {
  private toast = inject(ToastService);

  save() {
    this.productService.save().subscribe({
      next: () => this.toast.success('Product saved!', { title: 'Success' }),
      error: () => this.toast.error('Save failed — please retry.', { title: 'Error' }),
    });
  }

  delete(id: string) {
    this.toast.warning('Product deleted.', {
      title: 'Item Deleted',
      variant: 'filled',
      action: {
        label: 'Undo',
        callback: () => this.productService.restore(id),
      },
    });
  }

  // Configure global defaults once (e.g. in AppComponent.ngOnInit)
  ngOnInit() {
    this.toast.configure({ position: 'top-center', variant: 'soft', duration: 4000 });
  }
}`;

  reactCode = `// main.tsx — load elements bundle once
import '@bhairab-patra/platform-ui/elements';

// App.tsx — mount container once in root
export function App() {
  return (
    <>
      <Router>...</Router>
      {/* Toast container — place once anywhere in the tree */}
      <pui-lib-toast-container />
    </>
  );
}

// ProductCard.tsx — use window.puiToast from anywhere
function ProductCard({ product }) {
  async function handleSave() {
    try {
      await api.save(product);
      window.puiToast.success('Product saved!', { title: 'Saved' });
    } catch {
      window.puiToast.error('Save failed — please retry.', { title: 'Error' });
    }
  }

  function handleDelete() {
    window.puiToast.warning('Product deleted.', {
      title: 'Item Deleted',
      action: {
        label: 'Undo',
        callback: () => api.restore(product.id),
      },
    });
  }

  return <button onClick={handleSave}>Save</button>;
}`;

  htmlCode = `<!DOCTYPE html>
<html>
<head>
  <script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>
</head>
<body>

  <!-- Place the container once — it renders all toasts -->
  <pui-lib-toast-container></pui-lib-toast-container>

  <button id="save-btn">Save</button>
  <button id="delete-btn">Delete</button>

  <script>
    document.getElementById('save-btn').addEventListener('click', async () => {
      try {
        await fetch('/api/save', { method: 'POST' });
        window.puiToast.success('Saved successfully!', { title: 'Saved' });
      } catch {
        window.puiToast.error('Save failed.', { title: 'Error' });
      }
    });

    document.getElementById('delete-btn').addEventListener('click', () => {
      window.puiToast.warning('Item deleted.', {
        title: 'Deleted',
        duration: 6000,
        action: {
          label: 'Undo',
          callback: () => window.puiToast.info('Restored!'),
        },
      });
    });
  </script>
</body>
</html>`;

  xfwRows = [
    {
      name: 'Show success',
      angular: "toast.success('msg', { title })",
      html: "window.puiToast.success('msg', { title })",
    },
    {
      name: 'Show error',
      angular: "toast.error('msg', { title })",
      html: "window.puiToast.error('msg', { title })",
    },
    {
      name: 'Show warning',
      angular: "toast.warning('msg')",
      html: "window.puiToast.warning('msg')",
    },
    { name: 'Show info', angular: "toast.info('msg')", html: "window.puiToast.info('msg')" },
    {
      name: 'With action',
      angular: '{ action: { label, callback } }',
      html: '{ action: { label, callback } }',
    },
    { name: 'Style variant', angular: "{ variant: 'filled' }", html: "{ variant: 'filled' }" },
    {
      name: 'Custom position',
      angular: "{ position: 'bottom-right' }",
      html: "{ position: 'bottom-right' }",
    },
    { name: 'Custom duration', angular: '{ duration: 8000 }', html: '{ duration: 8000 }' },
    { name: 'No auto-dismiss', angular: '{ duration: 0 }', html: '{ duration: 0 }' },
    { name: 'Dismiss by ID', angular: 'toast.dismiss(id)', html: 'window.puiToast.dismiss(id)' },
    { name: 'Dismiss all', angular: 'toast.dismissAll()', html: 'window.puiToast.dismissAll()' },
    { name: 'Configure', angular: 'toast.configure({ position })', html: '— (set per call)' },
  ];

  api: ApiRow[] = [
    {
      input: 'ToastService.show(config)',
      type: 'ToastConfig → string',
      default: '—',
      description: 'Show a toast with full config. Returns toast ID.',
    },
    {
      input: 'ToastService.success(msg)',
      type: 'string → string',
      default: '—',
      description: 'Convenience: show a success toast.',
    },
    {
      input: 'ToastService.error(msg)',
      type: 'string → string',
      default: '—',
      description: 'Convenience: show an error toast.',
    },
    {
      input: 'ToastService.warning(msg)',
      type: 'string → string',
      default: '—',
      description: 'Convenience: show a warning toast.',
    },
    {
      input: 'ToastService.info(msg)',
      type: 'string → string',
      default: '—',
      description: 'Convenience: show an info toast.',
    },
    {
      input: 'ToastService.dismiss(id)',
      type: 'string → void',
      default: '—',
      description: 'Dismiss a specific toast by ID.',
    },
    {
      input: 'ToastService.dismissAll()',
      type: '() → void',
      default: '—',
      description: 'Dismiss all visible toasts.',
    },
    {
      input: 'ToastService.configure(opts)',
      type: 'object → void',
      default: '—',
      description: 'Set global defaults: position, variant, duration, maxToasts.',
    },
    {
      input: 'ToastConfig.message',
      type: 'string',
      default: '—',
      description: 'Main toast body text (required).',
    },
    {
      input: 'ToastConfig.title',
      type: 'string',
      default: '—',
      description: 'Optional bold heading above the message.',
    },
    {
      input: 'ToastConfig.type',
      type: "'success'|'error'|'warning'|'info'",
      default: "'info'",
      description: 'Semantic type — controls icon, accent bar, and colour tint.',
    },
    {
      input: 'ToastConfig.variant',
      type: "'soft'|'filled'",
      default: "'soft'",
      description:
        'Fill style — soft is a tinted background with coloured text; filled is a solid colour block with white text.',
    },
    {
      input: 'ToastConfig.duration',
      type: 'number (ms)',
      default: '4000',
      description: 'Auto-dismiss delay in milliseconds. 0 = persistent until dismissed.',
    },
    {
      input: 'ToastConfig.position',
      type: 'ToastPosition',
      default: "'top-center'",
      description: '6 positions: top/bottom × left/center/right.',
    },
    {
      input: 'ToastConfig.dismissible',
      type: 'boolean',
      default: 'true',
      description: 'Show the × dismiss button on the toast.',
    },
    {
      input: 'ToastConfig.action',
      type: '{ label, callback }',
      default: '—',
      description: 'Optional inline CTA button (e.g. Undo) with a click callback.',
    },
  ];
}
