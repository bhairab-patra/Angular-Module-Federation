import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ToastService } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { CodeBlockComponent } from '../shared/code-block.component';

type FwTab = 'angular' | 'react' | 'html';

@Component({
  selector: 'docs-toast-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <docs-page
      title="Toast"
      description="Lightweight notification service — 4 types, 6 positions, progress bar, hover-pause, action buttons, and configurable auto-dismiss. Add &lt;pui-toast-container&gt; once in your app root. In React and plain HTML use the global window.puiToast API exposed by the elements bundle."
      [hasFramework]="true"
      [api]="api">

      <!-- ══ DEMO ═════════════════════════════════════════════ -->
      <ng-container demo>

        <div class="demo-label"><span>Toast Types</span></div>
        <div class="type-grid">
          <button class="type-btn type-btn--success" (click)="showSuccess()">
            <span class="type-dot type-dot--success"></span>
            <span class="type-lbl">Success</span>
            <code class="type-hint">toast.success()</code>
          </button>
          <button class="type-btn type-btn--error" (click)="showError()">
            <span class="type-dot type-dot--error"></span>
            <span class="type-lbl">Error</span>
            <code class="type-hint">toast.error()</code>
          </button>
          <button class="type-btn type-btn--warning" (click)="showWarning()">
            <span class="type-dot type-dot--warning"></span>
            <span class="type-lbl">Warning</span>
            <code class="type-hint">toast.warning()</code>
          </button>
          <button class="type-btn type-btn--info" (click)="showInfo()">
            <span class="type-dot type-dot--info"></span>
            <span class="type-lbl">Info</span>
            <code class="type-hint">toast.info()</code>
          </button>
        </div>

        <div class="demo-label"><span>Title & Action Button</span></div>
        <div class="action-row">
          <button class="action-card" (click)="showWithTitle()">
            <span class="action-icon action-icon--green">T</span>
            <span>With Title</span>
          </button>
          <button class="action-card" (click)="showWithAction()">
            <span class="action-icon action-icon--blue">↩</span>
            <span>With Undo Action</span>
          </button>
          <button class="action-card" (click)="showPersistent()">
            <span class="action-icon action-icon--gray">∞</span>
            <span>Persistent (no auto-dismiss)</span>
          </button>
        </div>

        <div class="demo-label"><span>Screen Positions — click a corner</span></div>
        <div class="pos-diagram">
          <button class="pos-btn pos-btn--tl"  (click)="at('top-left')">top-left</button>
          <button class="pos-btn pos-btn--tc"  (click)="at('top-center')">top-center</button>
          <button class="pos-btn pos-btn--tr"  (click)="at('top-right')">top-right</button>
          <div class="pos-screen">
            <svg width="44" height="30" viewBox="0 0 44 30" fill="none">
              <rect x="1" y="1" width="42" height="24" rx="3" stroke="#d1d5db" stroke-width="1.5"/>
              <rect x="15" y="26" width="14" height="2.5" rx="1" fill="#d1d5db"/>
              <rect x="4" y="5"  width="16" height="2" rx="1" fill="#e5e7eb"/>
              <rect x="4" y="9"  width="26" height="1.5" rx="1" fill="#f3f4f6"/>
              <rect x="4" y="12" width="20" height="1.5" rx="1" fill="#f3f4f6"/>
            </svg>
            <span class="pos-screen__lbl">Screen</span>
          </div>
          <button class="pos-btn pos-btn--bl"  (click)="at('bottom-left')">bottom-left</button>
          <button class="pos-btn pos-btn--bc"  (click)="at('bottom-center')">bottom-center</button>
          <button class="pos-btn pos-btn--br"  (click)="at('bottom-right')">bottom-right</button>
        </div>

        <div class="demo-label"><span>Duration & Progress Bar</span></div>
        <div class="dur-row">
          <button class="dur-btn" (click)="dur(1000)"><span class="dur-t">1s</span>Fast</button>
          <button class="dur-btn" (click)="dur(4000)"><span class="dur-t">4s</span>Default</button>
          <button class="dur-btn" (click)="dur(10000)"><span class="dur-t">10s</span>Slow</button>
          <button class="dur-btn dur-btn--dismiss" (click)="toast.dismissAll()">Dismiss all</button>
        </div>

      </ng-container>

      <!-- ══ FRAMEWORK USAGE ══════════════════════════════════ -->
      <ng-container framework>

        <h2 class="fw-title">Framework Usage</h2>
        <p class="fw-lead">
          Toast is <strong>service-driven</strong>. In Angular inject <code>ToastService</code>.
          In React and plain HTML the elements bundle exposes <code>window.puiToast</code> — a global API
          with the same methods. In all cases place <code>&lt;pui-toast-container&gt;</code> once in your app root.
        </p>

        <div class="fw-tabs">
          <button class="fw-tab" [class.fw-tab--active]="fw==='angular'" (click)="fw='angular'">
            <svg width="15" height="15" viewBox="0 0 24 24"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.31H4.936L12 3.405z" fill="#c3002f"/></svg>
            Angular
          </button>
          <button class="fw-tab" [class.fw-tab--active]="fw==='react'" (click)="fw='react'">
            <svg width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.05" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/></svg>
            React
          </button>
          <button class="fw-tab" [class.fw-tab--active]="fw==='html'" (click)="fw='html'">
            <svg width="15" height="15" viewBox="0 0 24 24"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/></svg>
            Plain HTML
          </button>
        </div>

        <div *ngIf="fw==='angular'" class="fw-panel">
          <div class="fw-note fw-note--angular">
            1. Add <code>&lt;pui-toast-container&gt;</code> to your root template.
            2. Inject <code>ToastService</code> anywhere — it's <code>providedIn: 'root'</code>.
          </div>
          <app-code lang="html"       id="t-ng-tpl" [text]="angularTpl" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <app-code lang="typescript" id="t-ng-ts"  [text]="angularTs"  [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <div *ngIf="fw==='react'" class="fw-panel">
          <div class="fw-note fw-note--react">
            Add <code>&lt;pui-toast-container /&gt;</code> once in your root <code>App.jsx</code>.
            Then call <code>window.puiToast.success()</code> from anywhere — no import needed.
          </div>
          <app-code lang="tsx" id="t-react" [text]="reactCode" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <div *ngIf="fw==='html'" class="fw-panel">
          <div class="fw-note fw-note--html">
            Load the bundle. Add <code>&lt;pui-toast-container&gt;</code> to <code>&lt;body&gt;</code>.
            Call <code>window.puiToast.*</code> from any script.
          </div>
          <app-code lang="html" id="t-html" [text]="htmlCode" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </div>

        <h3 class="fw-ref-title">API Comparison — Angular service vs global API</h3>
        <div class="xfw-wrap">
          <table class="xfw-table">
            <thead><tr><th>Operation</th><th>Angular (ToastService)</th><th>React / Plain HTML (window.puiToast)</th></tr></thead>
            <tbody>
              <tr *ngFor="let r of xfwRows; let odd=odd" [class.xfw-odd]="odd">
                <td><code class="tag-name">{{ r.name }}</code></td>
                <td><code class="tag-ng">{{ r.angular }}</code></td>
                <td><code class="tag-html">{{ r.html }}</code></td>
              </tr>
            </tbody>
          </table>
        </div>

      </ng-container>

    </docs-page>
  `,
  styles: [`
    .demo-label { width:100%; padding-top:14px; margin-top:2px; border-top:1px solid #e5e7eb; }
    .demo-label span { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#9ca3af; }

    /* Type buttons */
    .type-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; width:100%; }
    .type-btn { display:flex; flex-direction:column; align-items:center; gap:8px; padding:18px 12px; border-radius:10px; border:1.5px solid transparent; cursor:pointer; background:#f9fafb; font-family:inherit; transition:transform .12s, box-shadow .12s; }
    .type-btn:hover { transform:translateY(-2px); box-shadow:0 4px 14px rgba(0,0,0,.08); }
    .type-btn--success { border-color:#dcfce7; } .type-btn--success:hover { background:#f0fdf4; border-color:#86efac; }
    .type-btn--error   { border-color:#fee2e2; } .type-btn--error:hover   { background:#fef2f2; border-color:#fca5a5; }
    .type-btn--warning { border-color:#fef3c7; } .type-btn--warning:hover { background:#fffbeb; border-color:#fcd34d; }
    .type-btn--info    { border-color:#dbeafe; } .type-btn--info:hover    { background:#eff6ff; border-color:#93c5fd; }
    .type-dot { width:10px; height:10px; border-radius:50%; }
    .type-dot--success { background:#22c55e; }
    .type-dot--error   { background:#ef4444; }
    .type-dot--warning { background:#f59e0b; }
    .type-dot--info    { background:#3b82f6; }
    .type-lbl  { font-size:13px; font-weight:600; color:#374151; }
    .type-hint { font-size:10px; color:#9ca3af; background:#f3f4f6; padding:2px 7px; border-radius:4px; }

    /* Action row */
    .action-row { display:flex; gap:10px; flex-wrap:wrap; width:100%; }
    .action-card { display:flex; align-items:center; gap:10px; padding:12px 18px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; cursor:pointer; font-size:13px; font-weight:500; color:#374151; font-family:inherit; transition:border-color .14s, background .14s; }
    .action-card:hover { border-color:#12C6A8; background:#f0fdfb; }
    .action-icon { width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; flex-shrink:0; }
    .action-icon--green { background:#dcfce7; color:#16a34a; }
    .action-icon--blue  { background:#dbeafe; color:#2563eb; }
    .action-icon--gray  { background:#f3f4f6; color:#6b7280; }

    /* Position diagram */
    .pos-diagram { display:grid; grid-template-columns:auto auto auto; grid-template-rows:auto auto auto; gap:8px; align-items:center; justify-items:center; width:100%; max-width:420px; margin:0 auto; }
    .pos-btn { padding:7px 14px; border-radius:8px; border:1.5px solid #e5e7eb; background:#fff; font-size:12px; font-weight:500; color:#374151; cursor:pointer; font-family:inherit; white-space:nowrap; transition:all .14s; }
    .pos-btn:hover { border-color:#12C6A8; color:#0d9e87; background:#f0fdfb; }
    .pos-btn--tl, .pos-btn--tc, .pos-btn--tr { align-self:start; }
    .pos-btn--bl, .pos-btn--bc, .pos-btn--br { align-self:end; }
    .pos-screen { display:flex; flex-direction:column; align-items:center; gap:4px; }
    .pos-screen__lbl { font-size:10px; color:#9ca3af; font-weight:600; text-transform:uppercase; letter-spacing:.06em; }

    /* Duration row */
    .dur-row { display:flex; gap:10px; align-items:center; flex-wrap:wrap; width:100%; }
    .dur-btn { display:flex; flex-direction:column; align-items:center; gap:3px; padding:12px 22px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; cursor:pointer; font-size:12px; font-weight:500; color:#374151; font-family:inherit; transition:all .14s; }
    .dur-btn:hover { border-color:#12C6A8; color:#0d9e87; }
    .dur-t { font-size:18px; font-weight:700; color:#111827; line-height:1; }
    .dur-btn--dismiss { border-color:#fca5a5; color:#dc2626; background:#fef2f2; }
    .dur-btn--dismiss:hover { background:#fee2e2; }

    /* FW */
    .fw-title { font-size:22px; font-weight:700; color:#111827; margin:0 0 8px; }
    .fw-lead { font-size:14px; color:#6b7280; line-height:1.7; margin:0 0 22px; }
    .fw-lead code { background:#f3f4f6; padding:1px 5px; border-radius:4px; font-size:13px; color:#1f2937; }
    .fw-tabs { display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
    .fw-tab { display:flex; align-items:center; gap:7px; padding:8px 18px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; font-size:13px; font-weight:500; color:#374151; cursor:pointer; font-family:inherit; transition:all .14s; }
    .fw-tab:hover { border-color:#12C6A8; color:#0d9e87; }
    .fw-tab--active { border-color:#12C6A8; background:#f0fdfb; color:#0d9e87; font-weight:600; }
    .fw-panel { display:flex; flex-direction:column; gap:14px; }
    .fw-note { padding:12px 16px; border-radius:8px; font-size:13px; line-height:1.65; border-left:4px solid #e5e7eb; background:#f9fafb; color:#374151; }
    .fw-note code { font-size:12px; background:rgba(0,0,0,.06); padding:1px 4px; border-radius:3px; }
    .fw-note--angular { border-color:#c3002f; background:#fff5f5; color:#7f1d1d; }
    .fw-note--react   { border-color:#38bdf8; background:#f0f9ff; color:#0c4a6e; }
    .fw-note--html    { border-color:#e34c26; background:#fff8f5; color:#7c2d12; }
    .fw-ref-title { font-size:16px; font-weight:700; color:#111827; margin:32px 0 12px; }
    .xfw-wrap { overflow-x:auto; border-radius:10px; border:1px solid #e5e7eb; }
    .xfw-table { width:100%; border-collapse:collapse; font-size:13px; }
    .xfw-table th { background:#f9fafb; padding:10px 14px; text-align:left; font-size:11px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:.06em; border-bottom:1px solid #e5e7eb; }
    .xfw-table td { padding:9px 14px; color:#374151; border-bottom:1px solid #f3f4f6; }
    .xfw-table tr:last-child td { border-bottom:none; }
    .xfw-odd td { background:#f9fafb; }
    .tag-name { color:#7c3aed; background:#f5f3ff; padding:1px 6px; border-radius:4px; font-size:12px; }
    .tag-ng   { color:#991b1b; background:#fff5f5; padding:1px 6px; border-radius:4px; font-size:12px; }
    .tag-html { color:#92400e; background:#fffbeb; padding:1px 6px; border-radius:4px; font-size:12px; }
  `],
})
export class ToastPageComponent {
  private toastSvc = inject(ToastService);
  fw: FwTab = 'angular';
  copied    = '';

  get toast() { return this.toastSvc; }

  doCopy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => { this.copied = id; setTimeout(() => this.copied = '', 2000); });
  }

  showSuccess() {
    this.toastSvc.success('Changes saved successfully!', { title: 'Saved', showProgress: true });
  }
  showError() {
    this.toastSvc.error('Failed to connect to the server.', { title: 'Connection Error', showProgress: true });
  }
  showWarning() {
    this.toastSvc.warning('Your session expires in 5 minutes.', { title: 'Session Warning', showProgress: true });
  }
  showInfo() {
    this.toastSvc.info('A new version is available.', { title: 'Update Available', showProgress: true });
  }
  showWithTitle() {
    this.toastSvc.success('Your profile has been updated.', { title: 'Profile Saved', showProgress: true });
  }
  showWithAction() {
    this.toastSvc.warning('Email moved to Trash.', {
      title: 'Item Deleted',
      showProgress: true,
      duration: 6000,
      action: { label: 'Undo', callback: () => console.log('Undo clicked') },
    });
  }
  showPersistent() {
    this.toastSvc.info('This notification will stay until dismissed.', { title: 'Persistent', duration: 0, showProgress: false });
  }
  at(pos: any) {
    this.toastSvc.info(`Toast at ${pos}`, { position: pos, showProgress: true });
  }
  dur(ms: number) {
    this.toastSvc.success(`Auto-dismiss in ${ms / 1000}s`, { duration: ms, showProgress: true });
  }

  angularTpl = `<!-- app.component.html — add once in root -->
<router-outlet></router-outlet>
<pui-toast-container></pui-toast-container>`;

  angularTs = `import { PuiToastContainerComponent, ToastService } from '@bhairab-patra/platform-ui';

// app.component.ts — include PuiToastContainerComponent
@Component({
  standalone: true,
  imports: [RouterOutlet, PuiToastContainerComponent],
  template: \`<router-outlet></router-outlet><pui-toast-container></pui-toast-container>\`,
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
      <pui-toast-container />
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
  <pui-toast-container></pui-toast-container>

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
