import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-getting-started',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
  <div class="gs-wrap">

    <!-- ── Main ── -->
    <article class="gs-content">
      <nav class="breadcrumb">
        <span>Docs</span>
        <span class="bc-sep">/</span>
        <span class="bc-cur">Getting Started</span>
      </nav>

      <h1 class="gs-title">Getting Started with Platform UI</h1>
      <p class="gs-lead">
        This guide explains how to set up your Angular project to begin using
        <strong>&#64;solifi/platform-ui</strong>. It covers prerequisites, building the
        library locally, installing it, and verifying your setup with a live component.
      </p>
      <hr class="gs-hr">

      <!-- ── 1. Prerequisites ── -->
      <section id="prereq" class="gs-section">
        <h2 class="gs-h2"><span class="step-badge">1</span> Prerequisites</h2>
        <p class="gs-p">Before you begin, make sure you have the following installed:</p>
        <ul class="gs-list">
          <li><strong>Node.js</strong> 18+ and <strong>npm</strong> 9+</li>
          <li><strong>Angular CLI</strong> 19+ — <code>npm install -g &#64;angular/cli</code></li>
          <li>An existing <strong>Angular 19</strong> standalone application</li>
        </ul>
        <div class="note-box">
          <span class="note-icon">💡</span>
          <span>
            Platform UI is built with <strong>Angular 19 standalone APIs</strong>.
            NgModule-based apps can still use it via <code>PlatformUiModule</code>.
          </span>
        </div>
      </section>

      <!-- ── 2. Build library ── -->
      <section id="build" class="gs-section">
        <h2 class="gs-h2"><span class="step-badge">2</span> Build the Library</h2>
        <p class="gs-p">
          Clone the repository and build the library locally. The output goes to
          <code>dist/platform-ui</code>.
        </p>
        <div class="code-wrap">
          <div class="code-header">
            <span class="code-lang">bash</span>
            <button class="copy-btn" (click)="copy(buildCmd, 'build')">{{ copied==='build' ? '✓ Copied' : 'Copy' }}</button>
          </div>
          <pre><code>{{ buildCmd }}</code></pre>
        </div>
        <p class="gs-p" style="margin-top:16px">
          This runs <code>ng build platform-ui --configuration development</code> and produces a
          fully packaged Angular library in <code>dist/platform-ui/</code>.
        </p>
      </section>

      <!-- ── 3. Install ── -->
      <section id="install" class="gs-section">
        <h2 class="gs-h2"><span class="step-badge">3</span> Install in your App</h2>
        <p class="gs-p">You have two options depending on your workflow:</p>

        <!-- Option A: local path -->
        <h3 class="gs-h3">Option A — Direct local path (monorepo / workspace)</h3>
        <p class="gs-p">
          If your app lives in the same workspace (e.g. <code>admin-hub</code>), point directly
          to the built dist folder in your app's <code>tsconfig.json</code>:
        </p>
        <div class="code-wrap">
          <div class="code-header">
            <span class="code-lang">tsconfig.json</span>
            <button class="copy-btn" (click)="copy(tsconfigPath, 'tsconfig')">{{ copied==='tsconfig' ? '✓ Copied' : 'Copy' }}</button>
          </div>
          <pre><code>{{ tsconfigPath }}</code></pre>
        </div>
        <p class="gs-p" style="margin-top:16px">No npm install needed — TypeScript resolves the import directly.</p>

        <!-- Option B: npm pack -->
        <h3 class="gs-h3" style="margin-top:28px">Option B — npm pack (external app)</h3>
        <p class="gs-p">Pack the library into a tarball and install it in any Angular project:</p>
        <div class="code-wrap">
          <div class="code-header">
            <span class="code-lang">bash</span>
            <button class="copy-btn" (click)="copy(packCmd, 'pack')">{{ copied==='pack' ? '✓ Copied' : 'Copy' }}</button>
          </div>
          <pre><code>{{ packCmd }}</code></pre>
        </div>
      </section>

      <!-- ── 4. Import ── -->
      <section id="import" class="gs-section">
        <h2 class="gs-h2"><span class="step-badge">4</span> Import Components</h2>
        <p class="gs-p">
          All components are standalone. Import them individually in your component's
          <code>imports</code> array, or use the convenience <code>PlatformUiModule</code>
          to get everything at once.
        </p>

        <h3 class="gs-h3">Standalone (recommended)</h3>
        <div class="code-wrap">
          <div class="code-header">
            <span class="code-lang">TypeScript</span>
            <button class="copy-btn" (click)="copy(standaloneImport, 'si')">{{ copied==='si' ? '✓ Copied' : 'Copy' }}</button>
          </div>
          <pre><code>{{ standaloneImport }}</code></pre>
        </div>

        <h3 class="gs-h3" style="margin-top:28px">NgModule (legacy apps)</h3>
        <div class="code-wrap">
          <div class="code-header">
            <span class="code-lang">TypeScript</span>
            <button class="copy-btn" (click)="copy(ngModuleImport, 'nm')">{{ copied==='nm' ? '✓ Copied' : 'Copy' }}</button>
          </div>
          <pre><code>{{ ngModuleImport }}</code></pre>
        </div>
      </section>

      <!-- ── 5. Use components ── -->
      <section id="use" class="gs-section">
        <h2 class="gs-h2"><span class="step-badge">5</span> Use the Components</h2>
        <p class="gs-p">
          Add components to your template. Run <code>ng serve</code> and open
          <strong>http://localhost:4200</strong> to verify.
        </p>

        <ng-container *ngFor="let ex of examples">
          <h3 class="gs-h3">{{ ex.label }}</h3>
          <div class="code-wrap">
            <div class="code-header">
              <span class="code-lang">HTML</span>
              <button class="copy-btn" (click)="copy(ex.code, ex.id)">{{ copied===ex.id ? '✓ Copied' : 'Copy' }}</button>
            </div>
            <pre><code>{{ ex.code }}</code></pre>
          </div>
        </ng-container>
      </section>

      <!-- ── 6. Verify ── -->
      <section id="verify" class="gs-section">
        <h2 class="gs-h2"><span class="step-badge">6</span> Verify Your Setup</h2>
        <p class="gs-p">Run your dev server and you should see the components rendered:</p>
        <div class="code-wrap">
          <div class="code-header">
            <span class="code-lang">bash</span>
            <button class="copy-btn" (click)="copy('ng serve', 'serve')">{{ copied==='serve' ? '✓ Copied' : 'Copy' }}</button>
          </div>
          <pre><code>ng serve</code></pre>
        </div>
        <div class="note-box note-box--success" style="margin-top:20px">
          <span class="note-icon">✅</span>
          <span>
            You should see a <strong>pui-button</strong>, <strong>pui-card</strong>, and
            <strong>pui-badge</strong> rendered on the page. You're all set!
          </span>
        </div>
      </section>

      <!-- ── Next steps ── -->
      <section id="next" class="gs-section">
        <h2 class="gs-h2">Next Steps</h2>
        <div class="next-grid">
          <a *ngFor="let n of nextSteps" [routerLink]="n.route" class="next-card">
            <span class="next-icon">{{ n.icon }}</span>
            <div>
              <div class="next-title">{{ n.title }}</div>
              <div class="next-desc">{{ n.desc }}</div>
            </div>
          </a>
        </div>
      </section>

    </article>

    <!-- ── Right panel ── -->
    <aside class="otp">
      <div class="otp-label">ON THIS PAGE</div>
      <nav class="otp-nav">
        <a *ngFor="let s of otpSections"
           class="otp-link"
           [class.otp-link-active]="active === s.id"
           (click)="scrollTo(s.id)">{{ s.label }}</a>
      </nav>
    </aside>

  </div>
  `,
  styles: [`
    .gs-wrap {
      display: flex; align-items: flex-start;
      max-width: 1180px; margin: 0 auto;
      padding: 52px 40px 100px; gap: 72px;
    }
    .gs-content { flex: 1; min-width: 0; }

    /* Breadcrumb */
    .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #9ca3af; margin-bottom: 18px; }
    .bc-sep { color: #d1d5db; }
    .bc-cur { color: #6b7280; }

    /* Title */
    .gs-title  { font-size: 38px; font-weight: 800; color: #111827; letter-spacing: -.025em; line-height: 1.15; margin-bottom: 14px; }
    .gs-lead   { font-size: 16px; color: #6b7280; line-height: 1.75; max-width: 640px; }
    .gs-hr     { border: none; border-top: 1px solid #f3f4f6; margin: 36px 0; }

    /* Section */
    .gs-section { margin-bottom: 52px; scroll-margin-top: 80px; }
    .gs-h2 {
      display: flex; align-items: center; gap: 12px;
      font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 14px;
    }
    .gs-h3  { font-size: 15px; font-weight: 600; color: #374151; margin-bottom: 10px; margin-top: 20px; }
    .gs-p   { font-size: 14.5px; color: #374151; line-height: 1.8; margin-bottom: 14px; }
    .gs-list {
      padding-left: 20px; margin-bottom: 18px;
      li { font-size: 14.5px; color: #374151; line-height: 1.9; }
    }

    /* Step badge */
    .step-badge {
      display: inline-flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: 50%;
      background: #12c6a8; color: #fff;
      font-size: 13px; font-weight: 700; flex-shrink: 0;
    }

    /* Inline code */
    code {
   
      padding: 1px 7px; border-radius: 5px;
      font-size: 13px;
      font-family: 'Fira Code', 'Cascadia Code', monospace;
    }

    /* Note box */
    .note-box {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 14px 18px; border-radius: 10px;
      background: #eff6ff; border: 1px solid #bfdbfe;
      font-size: 13.5px; color: #1e40af; line-height: 1.6;
    }
    .note-box--success { background: #f0fdf4; border-color: #bbf7d0; color: #166534; }
    .note-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

    /* Code block */
    .code-wrap   { border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; }
    .code-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 20px; background: #1e293b; border-bottom: 1px solid #334155;
    }
    .code-lang { font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; }
    .copy-btn  {
      padding: 3px 12px; border-radius: 5px;
      border: 1px solid #334155; background: #0f172a;
      color: #94a3b8; font-size: 12px; cursor: pointer; font-family: inherit;
    }
    .copy-btn:hover { color: #e2e8f0; border-color: #475569; }
    pre { border-radius: 0; border: none; }

    /* Next steps */
    .next-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 4px; }
    .next-card {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 18px 20px; border-radius: 12px;
      border: 1px solid #e5e7eb; background: #fff;
      text-decoration: none; color: inherit;
      transition: border-color .15s, box-shadow .15s;
    }
    .next-card:hover { border-color: #93c5fd; box-shadow: 0 2px 12px rgba(37,99,235,.08); }
    .next-icon  { font-size: 22px; flex-shrink: 0; }
    .next-title { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 3px; }
    .next-desc  { font-size: 12.5px; color: #6b7280; line-height: 1.5; }

    /* On this page */
    .otp { width: 196px; flex-shrink: 0; position: sticky; top: 90px; align-self: flex-start; }
    .otp-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .09em; color: #9ca3af; margin-bottom: 12px; }
    .otp-nav   { display: flex; flex-direction: column; gap: 2px; }
    .otp-link  {
      font-size: 13.5px; color: #6b7280;
      padding: 4px 0 4px 12px;
      border-left: 2px solid transparent;
      text-decoration: none;
      cursor: pointer; display: block; user-select: none;
      transition: color .12s, border-color .12s;
    }
    .otp-link:hover { color: #111827; }
    .otp-link.otp-link-active { color: #0fa78d; border-left-color: #12C6A8; font-weight: 500; }
    .otp-link.otp-link-active:hover { color: #0fa78d; }
  `],
})
export class GettingStartedComponent {
  copied = '';
  active  = 'prereq';

  otpSections = [
    { id: 'prereq',  label: 'Prerequisites'    },
    { id: 'build',   label: 'Build the Library' },
    { id: 'install', label: 'Install'           },
    { id: 'import',  label: 'Import Components' },
    { id: 'use',     label: 'Use Components'    },
    { id: 'verify',  label: 'Verify Setup'      },
    { id: 'next',    label: 'Next Steps'        },
  ];

  nextSteps = [
    { icon: '🔘', title: 'Button',  desc: 'Variants, sizes, loading state', route: '/button' },
    { icon: '🃏', title: 'Card',    desc: 'Stat cards, clickable layouts',  route: '/card'   },
    { icon: '🏷️', title: 'Badge',   desc: 'Status labels and indicators',   route: '/badge'  },
    { icon: '💬', title: 'Modal',   desc: 'Dialog overlays and confirms',   route: '/modal'  },
    { icon: '📌', title: 'Header',  desc: 'Top bar with nav and avatar',    route: '/header' },
  ];

  // ── Code snippets ────────────────────────────────────────────
  buildCmd = `# 1. Go to the library workspace
cd platform-ui

# 2. Install deps (first time only)
npm install

# 3. Build in dev mode (fast, includes source maps)
npm run build:local

# Output → dist/platform-ui/`;

  tsconfigPath = `// tsconfig.json  (in your app — e.g. admin-hub)
{
  "compilerOptions": {
    "paths": {
      "@solifi/platform-ui": [
        "../platform-ui/dist/platform-ui"
      ]
    }
  }
}`;

  packCmd = `# Inside the platform-ui workspace:
npm run pack:local
# Creates: dist/platform-ui/solifi-platform-ui-1.0.0.tgz

# In your target app:
npm install ../platform-ui/dist/platform-ui/solifi-platform-ui-1.0.0.tgz`;

  standaloneImport = `import {
  ButtonComponent,
  CardComponent,
  BadgeComponent,
  ModalComponent,
  HeaderComponent,
} from '@solifi/platform-ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent, CardComponent, BadgeComponent],
  template: \`...\`,
})
export class DashboardComponent {}`;

  ngModuleImport = `import { PlatformUiModule } from '@solifi/platform-ui';

@NgModule({
  imports: [PlatformUiModule],   // adds ALL pui-* components
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}`;

  examples = [
    {
      id: 'ex-btn', label: 'pui-button — action buttons',
      code: `<!-- Primary action -->
<pui-button variant="primary" (buttonClick)="save()">Save</pui-button>

<!-- Destructive action with loading -->
<pui-button variant="danger" [loading]="isDeleting" (buttonClick)="delete()">
  Delete
</pui-button>

<!-- Full-width submit -->
<pui-button variant="primary" [fullWidth]="true" type="submit">
  Submit form
</pui-button>`,
    },
    {
      id: 'ex-card', label: 'pui-card — stat / metric card',
      code: `<!-- Stat card with trend indicator -->
<pui-card [data]="{
  title: 'Monthly Revenue',
  value: '$48,200',
  trend: 'up',
  trendValue: '+12%',
  subtitle: 'vs last month'
}"></pui-card>

<!-- Plain content card -->
<pui-card [clickable]="true" (click)="openDetail()">
  <div style="padding:16px">
    <h3>Card title</h3>
    <p>Any content via ng-content.</p>
  </div>
</pui-card>`,
    },
    {
      id: 'ex-badge', label: 'pui-badge — status labels',
      code: `<pui-badge variant="success">Active</pui-badge>
<pui-badge variant="danger">Rejected</pui-badge>
<pui-badge variant="warning">Pending</pui-badge>
<pui-badge variant="info" size="sm">Draft</pui-badge>`,
    },
    {
      id: 'ex-modal', label: 'pui-modal — dialog overlay',
      code: `<!-- Trigger -->
<pui-button (buttonClick)="showConfirm = true">Delete item</pui-button>

<!-- Modal -->
<pui-modal
  [open]="showConfirm"
  title="Confirm Delete"
  size="sm"
  (closed)="showConfirm = false">

  <p>This action cannot be undone. Continue?</p>

  <!-- Footer slot -->
  <div footer>
    <pui-button variant="secondary" (buttonClick)="showConfirm = false">
      Cancel
    </pui-button>
    <pui-button variant="danger" (buttonClick)="onDelete()">
      Delete
    </pui-button>
  </div>
</pui-modal>`,
    },
    {
      id: 'ex-header', label: 'pui-header — top app bar',
      code: `<pui-header
  appTitle="Admin Hub"
  logoText="🛡️"
  userName="Bhairab Patra"
  [navLinks]="[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users',     href: '/users'     },
    { label: 'Settings',  href: '/settings'  }
  ]">
  <!-- Actions slot (right of avatar) -->
  <pui-button actions variant="secondary" size="sm">
    Notifications
  </pui-button>
</pui-header>`,
    },
  ];

  scrollTo(id: string): void {
    this.active = id;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  copy(text: string, id: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      setTimeout(() => (this.copied = ''), 2000);
    });
  }
}
