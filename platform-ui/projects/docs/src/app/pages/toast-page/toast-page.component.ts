import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ToastService, ToastPosition } from '@bhairab-patra/platform-ui';
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

  get angularCode(): string { return `${this.angularTpl}\n\n// component.ts\n${this.angularTs}`; }

  get toast(): typeof this.toastSvc { return this.toastSvc; }

  doCopy(text: string, id: string): void {
    navigator.clipboard.writeText(text).then(() => { this.copied = id; setTimeout(() => this.copied = '', 2000); });
  }

  showSuccess(): void {
    this.toastSvc.success('Changes saved successfully!', { title: 'Saved', showProgress: true });
  }
  showError(): void {
    this.toastSvc.error('Failed to connect to the server.', { title: 'Connection Error', showProgress: true });
  }
  showWarning(): void {
    this.toastSvc.warning('Your session expires in 5 minutes.', { title: 'Session Warning', showProgress: true });
  }
  showInfo(): void {
    this.toastSvc.info('A new version is available.', { title: 'Update Available', showProgress: true });
  }
  showWithTitle(): void {
    this.toastSvc.success('Your profile has been updated.', { title: 'Profile Saved', showProgress: true });
  }
  showWithAction(): void {
    this.toastSvc.warning('Email moved to Trash.', {
      title: 'Item Deleted',
      showProgress: true,
      duration: 6000,
      action: { label: 'Undo', callback: () => console.warn('Undo clicked') },
    });
  }
  showPersistent(): void {
    this.toastSvc.info('This notification will stay until dismissed.', { title: 'Persistent', duration: 0, showProgress: false });
  }
  trackByIndex(_i: number): number { return _i; }

  at(pos: string): void {
    this.toastSvc.info(`Toast at ${pos}`, { position: pos as ToastPosition, showProgress: true });
  }
  dur(ms: number): void {
    this.toastSvc.success(`Auto-dismiss in ${ms / 1000}s`, { duration: ms, showProgress: true });
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
      error: () => this.toast.error('Save failed — please retry.'),
    });
  }

  delete(id: string) {
    this.toast.warning('Product deleted.', {
      action: {
        label: 'Undo',
        callback: () => this.productService.restore(id),
      },
    });
  }

  // Configure global defaults once (e.g. in AppComponent.ngOnInit)
  ngOnInit() {
    this.toast.configure({ position: 'bottom-right', duration: 4000 });
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

// ─── Use puiToast from anywhere ────────────────────────
// ProductCard.tsx
function ProductCard({ product }) {
  async function handleSave() {
    try {
      await api.save(product);
      window.puiToast.success('Product saved!', { title: 'Saved' });
    } catch {
      window.puiToast.error('Save failed — please retry.');
    }
  }

  function handleDelete() {
    window.puiToast.warning('Product deleted.', {
      action: {
        label: 'Undo',
        callback: () => api.restore(product.id),
      },
    });
  }

  return <button onClick={handleSave}>Save</button>;
}

// TypeScript — declare global type (optional)
declare global {
  interface Window {
    puiToast: {
      success:    (msg: string, config?: any) => string;
      error:      (msg: string, config?: any) => string;
      warning:    (msg: string, config?: any) => string;
      info:       (msg: string, config?: any) => string;
      dismiss:    (id: string)  => void;
      dismissAll: ()            => void;
    };
  }
}`;

  htmlCode = `<!DOCTYPE html>
<html>
<head>
  <script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>
</head>
<body>

  <!-- Place the container once — it renders all toasts -->
  <pui-lib-toast-container></pui-lib-toast-container>

  <!-- Your app content -->
  <button id="save-btn">Save</button>
  <button id="delete-btn">Delete</button>

  <script>
    document.getElementById('save-btn').addEventListener('click', async () => {
      try {
        await fetch('/api/save', { method: 'POST' });
        window.puiToast.success('Saved successfully!', {
          title: 'Saved',
          showProgress: true,
        });
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
    { name: 'Show success',    angular: "toast.success('msg')",           html: "window.puiToast.success('msg')" },
    { name: 'Show error',      angular: "toast.error('msg')",             html: "window.puiToast.error('msg')" },
    { name: 'Show warning',    angular: "toast.warning('msg')",           html: "window.puiToast.warning('msg')" },
    { name: 'Show info',       angular: "toast.info('msg')",              html: "window.puiToast.info('msg')" },
    { name: 'With title',      angular: "toast.success('m', { title })",  html: "puiToast.success('m', { title })" },
    { name: 'With action',     angular: "{ action: { label, callback } }", html: "{ action: { label, callback } }" },
    { name: 'Custom position', angular: "{ position: 'bottom-right' }",   html: "{ position: 'bottom-right' }" },
    { name: 'Custom duration', angular: "{ duration: 8000 }",             html: "{ duration: 8000 }" },
    { name: 'No auto-dismiss', angular: "{ duration: 0 }",                html: "{ duration: 0 }" },
    { name: 'Dismiss by ID',   angular: "toast.dismiss(id)",              html: "window.puiToast.dismiss(id)" },
    { name: 'Dismiss all',     angular: "toast.dismissAll()",             html: "window.puiToast.dismissAll()" },
    { name: 'Configure',       angular: "toast.configure({ position })",  html: "— (set per call)" },
  ];

  api: ApiRow[] = [
    { input: 'ToastService.show(config)',    type: 'ToastConfig → string',  default: '—', description: 'Show a toast with full config. Returns toast ID.' },
    { input: 'ToastService.success(msg)',    type: 'string → string',       default: '—', description: 'Convenience: show a success toast.' },
    { input: 'ToastService.error(msg)',      type: 'string → string',       default: '—', description: 'Convenience: show an error toast.' },
    { input: 'ToastService.warning(msg)',    type: 'string → string',       default: '—', description: 'Convenience: show a warning toast.' },
    { input: 'ToastService.info(msg)',       type: 'string → string',       default: '—', description: 'Convenience: show an info toast.' },
    { input: 'ToastService.dismiss(id)',     type: 'string → void',         default: '—', description: 'Dismiss a specific toast by ID.' },
    { input: 'ToastService.dismissAll()',    type: '() → void',             default: '—', description: 'Dismiss all visible toasts.' },
    { input: 'ToastService.configure(opts)', type: 'object → void',        default: '—', description: 'Set global defaults: position, duration, maxToasts.' },
    { input: 'ToastConfig.message',         type: 'string',                default: '—', description: 'Main toast body text (required).' },
    { input: 'ToastConfig.title',           type: 'string',                default: '—', description: 'Optional bold heading above the message.' },
    { input: 'ToastConfig.type',            type: "'success'|'error'|'warning'|'info'", default: "'info'", description: 'Toast semantic type.' },
    { input: 'ToastConfig.duration',        type: 'number (ms)',           default: '4000', description: 'Auto-dismiss delay. 0 = persistent.' },
    { input: 'ToastConfig.position',        type: 'ToastPosition',         default: "'top-right'", description: '6 positions: top/bottom-left/center/right.' },
    { input: 'ToastConfig.showProgress',    type: 'boolean',               default: 'true', description: 'Show the countdown progress bar.' },
    { input: 'ToastConfig.dismissible',     type: 'boolean',               default: 'true', description: 'Show the × dismiss button.' },
    { input: 'ToastConfig.action',          type: '{ label, callback }',   default: '—', description: 'Optional inline CTA button (e.g. Undo).' },
  ];
}
