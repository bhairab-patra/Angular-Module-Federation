import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ToastService } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-toast-page',
  standalone: true,
  imports: [DocPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <docs-page
      title="Toast"
      description="A lightweight notification service with 4 types, 6 positions, progress bar, hover-pause, action buttons, and configurable auto-dismiss. Place &lt;pui-toast-container&gt; once in your app root — then inject ToastService anywhere."
      [code]="importCode"
      [api]="api">

      <ng-container demo>

        <!-- ── Types ─────────────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Toast Types</h3>
            <p class="ds__desc">
              Four semantic types, each with a unique color accent, icon, and border.
              Click any button to trigger a live notification.
            </p>
          </div>
          <div class="ds__preview">
            <div class="preview-frame">
              <div class="type-grid">
                <button class="type-btn type-btn--success" (click)="showSuccess()">
                  <span class="type-dot type-dot--success"></span>
                  <span class="type-btn__label">Success</span>
                  <span class="type-btn__hint">toast.success()</span>
                </button>
                <button class="type-btn type-btn--error" (click)="showError()">
                  <span class="type-dot type-dot--error"></span>
                  <span class="type-btn__label">Error</span>
                  <span class="type-btn__hint">toast.error()</span>
                </button>
                <button class="type-btn type-btn--warning" (click)="showWarning()">
                  <span class="type-dot type-dot--warning"></span>
                  <span class="type-btn__label">Warning</span>
                  <span class="type-btn__hint">toast.warning()</span>
                </button>
                <button class="type-btn type-btn--info" (click)="showInfo()">
                  <span class="type-dot type-dot--info"></span>
                  <span class="type-btn__label">Info</span>
                  <span class="type-btn__hint">toast.info()</span>
                </button>
              </div>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeTypes, 'types')">{{ copied['types'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeTypes }}</code></pre>
          </div>
        </div>

        <!-- ── Title & Action ────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Title & Action Button</h3>
            <p class="ds__desc">
              Add a <code class="ic">title</code> for a bold heading above the message.
              Pass an <code class="ic">action</code> object to render an inline CTA — useful for undo flows or navigation.
            </p>
          </div>
          <div class="ds__preview">
            <div class="preview-frame">
              <div class="action-grid">
                <div class="action-card" (click)="showWithTitle()">
                  <div class="action-card__icon action-card__icon--green">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <div>
                    <div class="action-card__name">With Title</div>
                    <div class="action-card__desc">Adds a bold heading above message</div>
                  </div>
                </div>
                <div class="action-card" (click)="showWithAction()">
                  <div class="action-card__icon action-card__icon--blue">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 10h10M3 14h7M17 9l3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <div>
                    <div class="action-card__name">With Action</div>
                    <div class="action-card__desc">Inline "Undo" button inside toast</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeTitleAction, 'titleAction')">{{ copied['titleAction'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeTitleAction }}</code></pre>
          </div>
        </div>

        <!-- ── Positions ─────────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Screen Positions</h3>
            <p class="ds__desc">
              Six fixed positions. Click any position on the diagram below to trigger a toast there.
              Set a global default with <code class="ic">toast.configure(&#123; position &#125;)</code>.
            </p>
          </div>
          <div class="ds__preview">
            <div class="preview-frame">
              <div class="pos-diagram">
                <button class="pos-btn pos-btn--tl"  (click)="showAtPosition('top-left')">top-left</button>
                <button class="pos-btn pos-btn--tc"  (click)="showAtPosition('top-center')">top-center</button>
                <button class="pos-btn pos-btn--tr"  (click)="showAtPosition('top-right')">top-right</button>
                <div class="pos-screen">
                  <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
                    <rect x="1" y="1" width="38" height="22" rx="3" stroke="#d1d5db" stroke-width="1.5"/>
                    <rect x="14" y="24" width="12" height="2" rx="1" fill="#d1d5db"/>
                    <rect x="3" y="4" width="14" height="2" rx="1" fill="#e5e7eb"/>
                    <rect x="3" y="8" width="22" height="1.5" rx="1" fill="#f3f4f6"/>
                    <rect x="3" y="11" width="18" height="1.5" rx="1" fill="#f3f4f6"/>
                  </svg>
                  <span class="pos-screen__label">Screen</span>
                </div>
                <button class="pos-btn pos-btn--bl"  (click)="showAtPosition('bottom-left')">bottom-left</button>
                <button class="pos-btn pos-btn--bc"  (click)="showAtPosition('bottom-center')">bottom-center</button>
                <button class="pos-btn pos-btn--br"  (click)="showAtPosition('bottom-right')">bottom-right</button>
              </div>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codePositions, 'positions')">{{ copied['positions'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codePositions }}</code></pre>
          </div>
        </div>

        <!-- ── Duration ──────────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">Duration & Progress Bar</h3>
            <p class="ds__desc">
              Control auto-dismiss with <code class="ic">duration</code> (ms).
              Set to <code class="ic">0</code> for a persistent toast.
              The progress bar animates down and pauses on hover.
            </p>
          </div>
          <div class="ds__preview">
            <div class="preview-frame">
              <div class="dur-grid">
                <button class="dur-btn" (click)="showFast()">
                  <span class="dur-btn__time">1s</span>
                  <span class="dur-btn__label">Fast</span>
                </button>
                <button class="dur-btn" (click)="showDefault()">
                  <span class="dur-btn__time">4s</span>
                  <span class="dur-btn__label">Default</span>
                </button>
                <button class="dur-btn" (click)="showSlow()">
                  <span class="dur-btn__time">10s</span>
                  <span class="dur-btn__label">Slow</span>
                </button>
                <button class="dur-btn dur-btn--persist" (click)="showPersistent()">
                  <span class="dur-btn__time">∞</span>
                  <span class="dur-btn__label">Persistent</span>
                </button>
              </div>
              <button class="dismiss-all-btn" (click)="dismissAll()">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                Dismiss All
              </button>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeDuration, 'duration')">{{ copied['duration'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeDuration }}</code></pre>
          </div>
        </div>

        <!-- ── Setup ─────────────────────────────────────── -->
        <div class="ds">
          <div class="ds__head">
            <h3 class="ds__title">App Setup</h3>
            <p class="ds__desc">
              Place <code class="ic">&lt;pui-toast-container&gt;</code> once in your root component.
              <code class="ic">ToastService</code> is <code class="ic">providedIn: 'root'</code> — inject it anywhere with no extra providers.
            </p>
          </div>
          <div class="setup-steps">
            <div class="setup-step">
              <span class="setup-step__num">1</span>
              <div class="setup-step__body">
                <div class="setup-step__label">Add the container to <code class="ic">app.component.ts</code></div>
              </div>
            </div>
            <div class="setup-step">
              <span class="setup-step__num">2</span>
              <div class="setup-step__body">
                <div class="setup-step__label">Inject <code class="ic">ToastService</code> in any component or service</div>
              </div>
            </div>
          </div>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">TypeScript / HTML</span>
              <button class="copy-btn" (click)="copyCode(codeSetup, 'setup')">{{ copied['setup'] ? '✓ Copied!' : 'Copy' }}</button>
            </div>
            <pre><code>{{ codeSetup }}</code></pre>
          </div>
        </div>

      </ng-container>
    </docs-page>
  `,
  styles: [`
    /* ── Demo section block ─────────────────────────────── */
    .ds {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 32px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .ds:last-child  { border-bottom: none; padding-bottom: 0; }
    .ds:first-child { padding-top: 0; }

    .ds__head { display: flex; flex-direction: column; gap: 6px; }
    .ds__title {
      font-size: 16px; font-weight: 700;
      color: #111827; margin: 0;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .ds__desc {
      font-size: 13.5px; color: #6b7280; margin: 0; line-height: 1.7;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* ── Inline code ────────────────────────────────────── */
    .ic {
      background: #f3f4f6; color: #1f2937;
      padding: 1px 6px; border-radius: 4px;
      font-size: 12.5px; border: 1px solid #e5e7eb;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }

    /* ── Preview frame ──────────────────────────────────── */
    .preview-frame {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* ── Type grid ──────────────────────────────────────── */
    .type-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    .type-btn {
      display: flex; flex-direction: column; align-items: center;
      gap: 8px; padding: 18px 12px;
      border-radius: 10px; border: 1.5px solid transparent;
      cursor: pointer; background: #f9fafb;
      transition: transform .12s, box-shadow .12s, border-color .12s;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .type-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(0,0,0,.08); }
    .type-btn--success { border-color: #dcfce7; }
    .type-btn--success:hover { background: #f0fdf4; border-color: #86efac; }
    .type-btn--error   { border-color: #fee2e2; }
    .type-btn--error:hover   { background: #fef2f2; border-color: #fca5a5; }
    .type-btn--warning { border-color: #fef3c7; }
    .type-btn--warning:hover { background: #fffbeb; border-color: #fcd34d; }
    .type-btn--info    { border-color: #dbeafe; }
    .type-btn--info:hover    { background: #eff6ff; border-color: #93c5fd; }

    .type-dot {
      width: 10px; height: 10px; border-radius: 50%;
    }
    .type-dot--success { background: #22c55e; }
    .type-dot--error   { background: #ef4444; }
    .type-dot--warning { background: #f59e0b; }
    .type-dot--info    { background: #3b82f6; }

    .type-btn__label {
      font-size: 13px; font-weight: 600; color: #111827;
    }
    .type-btn__hint {
      font-size: 11px; color: #9ca3af;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
    }

    /* ── Action cards ───────────────────────────────────── */
    .action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .action-card {
      display: flex; align-items: center; gap: 14px;
      padding: 16px 18px;
      border: 1.5px solid #e5e7eb;
      border-radius: 10px; cursor: pointer;
      background: #f9fafb;
      transition: border-color .12s, background .12s, box-shadow .12s;
    }
    .action-card:hover {
      border-color: #12C6A8; background: #fff;
      box-shadow: 0 2px 10px rgba(18,198,168,.1);
    }
    .action-card__icon {
      width: 36px; height: 36px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .action-card__icon--green { background: #dcfce7; color: #16a34a; }
    .action-card__icon--blue  { background: #dbeafe; color: #2563eb; }
    .action-card__name  { font-size: 13.5px; font-weight: 600; color: #111827; font-family: 'Poppins', system-ui, sans-serif; }
    .action-card__desc  { font-size: 12px; color: #9ca3af; margin-top: 2px; font-family: 'Poppins', system-ui, sans-serif; }

    /* ── Position diagram ───────────────────────────────── */
    .pos-diagram {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: auto auto auto;
      gap: 10px 8px;
      align-items: center;
      justify-items: center;
      max-width: 420px;
      margin: 0 auto;
    }
    .pos-screen {
      grid-column: 1 / -1;
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      padding: 20px; background: #f9fafb;
      border: 1px dashed #d1d5db; border-radius: 8px;
      width: 100%;
    }
    .pos-screen__label { font-size: 11px; color: #9ca3af; font-family: 'Poppins', system-ui, sans-serif; }

    .pos-btn {
      padding: 6px 14px; border-radius: 6px;
      border: 1.5px solid #e2e8f0; background: #fff;
      font-size: 12px; font-weight: 500; color: #374151;
      cursor: pointer; font-family: 'Poppins', system-ui, sans-serif;
      transition: border-color .12s, background .12s, color .12s;
      white-space: nowrap;
    }
    .pos-btn:hover { border-color: #12C6A8; color: #0fa78d; background: #f0fdfb; }

    /* ── Duration grid ──────────────────────────────────── */
    .dur-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    .dur-btn {
      display: flex; flex-direction: column; align-items: center;
      gap: 4px; padding: 16px 8px;
      border-radius: 10px; border: 1.5px solid #e5e7eb;
      cursor: pointer; background: #f9fafb;
      transition: border-color .12s, background .12s;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .dur-btn:hover { border-color: #12C6A8; background: #f0fdfb; }
    .dur-btn--persist { border-color: #fef3c7; background: #fffbeb; }
    .dur-btn--persist:hover { border-color: #f59e0b; }
    .dur-btn__time {
      font-size: 20px; font-weight: 800; color: #111827;
    }
    .dur-btn__label { font-size: 11.5px; color: #6b7280; }

    .dismiss-all-btn {
      display: flex; align-items: center; gap: 6px;
      align-self: flex-start;
      padding: 7px 14px; border-radius: 7px;
      border: 1px solid #e2e8f0; background: #fff;
      color: #6b7280; font-size: 12.5px; cursor: pointer;
      font-family: 'Poppins', system-ui, sans-serif;
      transition: border-color .12s, color .12s;
    }
    .dismiss-all-btn:hover { border-color: #ef4444; color: #ef4444; }

    /* ── Setup steps ────────────────────────────────────── */
    .setup-steps {
      display: flex; flex-direction: column; gap: 10px;
    }
    .setup-step {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 14px 16px;
      background: #f9fafb; border: 1px solid #e5e7eb;
      border-radius: 8px;
    }
    .setup-step__num {
      width: 24px; height: 24px; border-radius: 50%;
      background: #12C6A8; color: #fff;
      font-size: 12px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: 1px;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .setup-step__label {
      font-size: 13.5px; color: #374151;
      font-family: 'Poppins', system-ui, sans-serif;
      line-height: 1.6;
    }

    /* ── Code block ─────────────────────────────────────── */
    .code-wrap   { border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; }
    .code-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 20px;
      background: #1e293b; border-bottom: 1px solid #334155;
    }
    .code-lang {
      font-size: 11px; color: #64748b;
      font-weight: 700; text-transform: uppercase; letter-spacing: .07em;
    }
    .copy-btn {
      padding: 3px 12px; border-radius: 5px;
      border: 1px solid #334155; background: #0f172a;
      color: #94a3b8; font-size: 12px; cursor: pointer;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .copy-btn:hover { color: #e2e8f0; border-color: #475569; }
    pre { border-radius: 0; border: none; margin: 0; }
  `],
})
export class ToastPageComponent {
  private toast = inject(ToastService);
  copied: Record<string, boolean> = {};

  showSuccess()  { this.toast.success('Your changes have been saved successfully.'); }
  showError()    { this.toast.error('Something went wrong. Please try again.'); }
  showWarning()  { this.toast.warning('Storage is running low — please clean up.'); }
  showInfo()     { this.toast.info('A new version is available. Refresh to update.'); }

  showWithTitle() {
    this.toast.success('All files uploaded successfully.', {
      title: 'Upload Complete',
      duration: 5000,
    });
  }

  showWithAction() {
    this.toast.info('Item moved to trash.', {
      title: 'Deleted',
      action: { label: 'Undo', callback: () => this.toast.success('Item restored!') },
      duration: 6000,
    });
  }

  showAtPosition(position: any) {
    this.toast.info(`Showing at ${position}`, { position, duration: 3000 });
  }

  showFast()       { this.toast.success('Done!', { duration: 1000 }); }
  showDefault()    { this.toast.info('Default duration (4s).', { duration: 4000 }); }
  showSlow()       { this.toast.info('This notification stays for 10 seconds.', { duration: 10000 }); }
  showPersistent() { this.toast.warning('Persistent — dismiss manually.', { duration: 0, showProgress: false }); }
  dismissAll()     { this.toast.dismissAll(); }

  importCode = `// app.component.ts — place the container once in your root
import { PuiToastContainerComponent } from '@solifi/platform-ui';

@Component({
  imports: [RouterOutlet, PuiToastContainerComponent],
  template: \`
    <router-outlet></router-outlet>
    <pui-toast-container></pui-toast-container>
  \`,
})
export class AppComponent {}

// any.component.ts — inject and call anywhere
import { ToastService } from '@solifi/platform-ui';

private toast = inject(ToastService);`;

  codeTypes = `// Shorthand helpers
this.toast.success('Profile updated successfully.');
this.toast.error('Something went wrong. Please try again.');
this.toast.warning('Storage is running low.');
this.toast.info('New version available.');

// Full config via show()
this.toast.show({
  message:      'Custom notification',
  type:         'success',
  duration:     4000,
  showProgress: true,
  dismissible:  true,
  position:     'top-right',
});`;

  codeTitleAction = `// With bold title
this.toast.success('All files uploaded.', {
  title: 'Upload Complete',
  duration: 5000,
});

// With inline action button
this.toast.info('Item moved to trash.', {
  title: 'Deleted',
  action: {
    label: 'Undo',
    callback: () => this.restoreItem(),
  },
  duration: 6000,
});`;

  codePositions = `// Per-call position
this.toast.info('Top right',     { position: 'top-right'     });
this.toast.info('Top left',      { position: 'top-left'      });
this.toast.info('Top center',    { position: 'top-center'    });
this.toast.info('Bottom right',  { position: 'bottom-right'  });
this.toast.info('Bottom left',   { position: 'bottom-left'   });
this.toast.info('Bottom center', { position: 'bottom-center' });

// Set a global default (affects all future toasts)
this.toast.configure({ position: 'bottom-center' });`;

  codeDuration = `// Fast — 1 second
this.toast.success('Done!', { duration: 1000 });

// Slow — 10 seconds with visible progress bar
this.toast.info('Long notification.', { duration: 10000 });

// Persistent — stays until dismissed manually
this.toast.warning('Action required.', {
  duration: 0,
  showProgress: false,
});

// Programmatic dismiss by ID
const id = this.toast.info('Saving…');
await this.save();
this.toast.dismiss(id);

// Dismiss everything
this.toast.dismissAll();`;

  codeSetup = `// ── Step 1: app.component.ts ────────────────────────────
import { PuiToastContainerComponent } from '@solifi/platform-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PuiToastContainerComponent],
  template: \`
    <router-outlet></router-outlet>
    <pui-toast-container></pui-toast-container>
  \`,
})
export class AppComponent {}


// ── Step 2: use ToastService anywhere ───────────────────
import { ToastService } from '@solifi/platform-ui';

@Component({ ... })
export class DashboardComponent {
  private toast = inject(ToastService);

  save(): void {
    this.api.save(this.form.value).subscribe({
      next:  () => this.toast.success('Saved successfully!'),
      error: () => this.toast.error('Save failed. Please retry.'),
    });
  }
}`;

  api: ApiRow[] = [
    { input: 'show(config)',          type: 'ToastConfig → string', default: '—',           description: 'Shows a toast with full config. Returns the toast ID.' },
    { input: 'success(msg, cfg?)',    type: 'string',               default: '—',           description: 'Shorthand for type "success". Returns ID.' },
    { input: 'error(msg, cfg?)',      type: 'string',               default: '—',           description: 'Shorthand for type "error". Returns ID.' },
    { input: 'warning(msg, cfg?)',    type: 'string',               default: '—',           description: 'Shorthand for type "warning". Returns ID.' },
    { input: 'info(msg, cfg?)',       type: 'string',               default: '—',           description: 'Shorthand for type "info". Returns ID.' },
    { input: 'dismiss(id)',           type: 'void',                 default: '—',           description: 'Dismisses a specific toast by its ID.' },
    { input: 'dismissAll()',          type: 'void',                 default: '—',           description: 'Dismisses all currently visible toasts.' },
    { input: 'configure(opts)',       type: 'void',                 default: '—',           description: 'Sets global defaults: position, duration, maxToasts.' },
    { input: 'config.message',        type: 'string',               default: '—',           description: 'Required. Text displayed in the toast body.' },
    { input: 'config.title',          type: 'string',               default: 'undefined',   description: 'Optional bold heading above the message.' },
    { input: 'config.type',           type: 'ToastType',            default: "'info'",      description: 'success | error | warning | info' },
    { input: 'config.duration',       type: 'number',               default: '4000',        description: 'Auto-dismiss delay in ms. 0 = persistent.' },
    { input: 'config.showProgress',   type: 'boolean',              default: 'true',        description: 'Show animated countdown progress bar.' },
    { input: 'config.dismissible',    type: 'boolean',              default: 'true',        description: 'Show × close button on the toast.' },
    { input: 'config.position',       type: 'ToastPosition',        default: "'top-right'", description: 'Screen position for this individual toast.' },
    { input: 'config.action',         type: '{ label, callback }',  default: 'undefined',   description: 'Inline action button rendered inside the toast.' },
  ];

  copyCode(code: string, key: string): void {
    navigator.clipboard?.writeText(code);
    this.copied[key] = true;
    setTimeout(() => this.copied[key] = false, 2000);
  }
}
