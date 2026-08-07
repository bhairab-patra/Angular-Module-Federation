import { Component, Input, OnInit, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface ApiRow {
  input: string; type: string; default: string; description: string;
}

@Component({
  selector: 'docs-page',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
  <div class="page-wrap">

    <!-- ── Main column ── -->
    <article class="page-content">
      <nav class="breadcrumb">
        <span>Components</span>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">{{ title }}</span>
      </nav>

      <h1 class="page-title">{{ title }}</h1>
      <p  class="page-lead">{{ description }}</p>
      <hr class="page-hr">

      <!-- 1. Demo -->
      <section id="demo" class="doc-section">
        <h2 class="section-title">Demo</h2>
        <p  class="section-desc">Interact with the component live below.</p>
        <div class="demo-box">
          <ng-content select="[demo]"></ng-content>
        </div>
      </section>

      <!-- 2. Framework Usage (optional slot — shown when consumer provides [framework] content) -->
      <section id="framework" class="doc-section">
        <ng-content select="[framework]"></ng-content>
      </section>

      <!-- 3. Usage / code (only shown when code input is provided) -->
      <section *ngIf="code" id="usage" class="doc-section">
        <h2 class="section-title">Usage</h2>
        <p  class="section-desc">
          Import directly or via <code class="inline-code">PlatformUiModule</code>.
        </p>
        <div class="code-wrap">
          <div class="code-header">
            <span class="code-lang">TypeScript / HTML</span>
            <button class="copy-btn" (click)="copy()">{{ copied ? '✓ Copied!' : 'Copy' }}</button>
          </div>
          <pre><code>{{ code }}</code></pre>
        </div>
      </section>

      <!-- 4. Component API -->
      <section *ngIf="api.length" id="api" class="doc-section">
        <h2 class="section-title">Component API</h2>
        <p  class="section-desc">
          All <code class="inline-code">&#64;Input</code> properties and outputs.
        </p>
        <div class="table-wrap">
          <table class="api-table">
            <thead>
              <tr>
                <th>Property</th><th>Type</th><th>Default</th><th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of api; let odd = odd" [class.row-odd]="odd">
                <td><code class="tag-prop">{{ row.input }}</code></td>
                <td><code class="tag-type">{{ row.type }}</code></td>
                <td><code class="tag-def">{{ row.default }}</code></td>
                <td class="td-desc">{{ row.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>

    <!-- ── Right panel ── -->
    <aside class="otp">
      <div class="otp-label">ON THIS PAGE</div>
      <nav class="otp-nav">
        <a class="otp-link" [class.otp-link-active]="active==='demo'"
           (click)="scrollTo('demo')">Demo</a>
        <a *ngIf="hasFramework"
           class="otp-link" [class.otp-link-active]="active==='framework'"
           (click)="scrollTo('framework')">Framework Usage</a>
        <a *ngIf="code"
           class="otp-link" [class.otp-link-active]="active==='usage'"
           (click)="scrollTo('usage')">Usage</a>
        <a *ngIf="api.length"
           class="otp-link" [class.otp-link-active]="active==='api'"
           (click)="scrollTo('api')">Component API</a>
      </nav>
    </aside>

  </div>
  `,
  styles: [`
    /* ── Layout ─────────────────────────────── */
    .page-wrap {
      display: flex; align-items: flex-start;
      max-width: 1180px; margin: 0 auto;
      padding: 52px 40px 100px; gap: 72px;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .page-content { flex: 1; min-width: 0; }

    /* ── Header ─────────────────────────────── */
    .breadcrumb {
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; color: #9ca3af; margin-bottom: 18px;
    }
    .breadcrumb-sep     { color: #d1d5db; }
    .breadcrumb-current { color: #6b7280; }

    .page-title {
      font-size: 38px; font-weight: 800;
      color: #111827; letter-spacing: -.025em;
      line-height: 1.15; margin-bottom: 14px;
    }
    .page-lead {
      font-size: 16px; color: #6b7280;
      line-height: 1.75; max-width: 600px;
    }
    .page-hr { border: none; border-top: 1px solid #f3f4f6; margin: 36px 0; }

    /* ── Sections ───────────────────────────── */
    .doc-section   { margin-bottom: 56px; scroll-margin-top: 80px; }
    .section-title { font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 6px; }
    .section-desc  { font-size: 14px; color: #6b7280; margin-bottom: 22px; }
    .inline-code {
      background: #f3f4f6; color: #1f2937;
      padding: 1px 7px; border-radius: 5px;
      font-size: 13px; border: 1px solid #e5e7eb;
    }

    /* ── Demo box ───────────────────────────── */
    .demo-box {
      background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px;
      padding: 40px 32px; display: flex; flex-wrap: wrap;
      align-items: flex-start; gap: 12px;
    }

    /* ── Code block ─────────────────────────── */
    .code-wrap   { border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; }
    .code-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 20px; background: #1e293b; border-bottom: 1px solid #334155;
    }
    .code-lang {
      font-size: 11px; color: #64748b;
      font-weight: 700; text-transform: uppercase; letter-spacing: .07em;
    }
    .copy-btn {
      padding: 3px 12px; border-radius: 5px;
      border: 1px solid #334155; background: #0f172a;
      color: #94a3b8; font-size: 12px; cursor: pointer; font-family: inherit;
    }
    .copy-btn:hover { color: #e2e8f0; border-color: #475569; }
    pre { border-radius: 0; border: none; }

    /* ── API table ──────────────────────────── */
    .table-wrap { overflow-x: auto; border-radius: 10px; border: 1px solid #e5e7eb; }
    .api-table  { width: 100%; border-collapse: collapse; font-size: 13.5px; }
    .api-table th {
      text-align: left; padding: 11px 16px;
      background: #f9fafb; color: #6b7280;
      font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .06em;
      border-bottom: 1px solid #e5e7eb;
    }
    .api-table td { padding: 12px 16px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
    .row-odd td  { background: #fafafa; }
    .api-table tr:last-child td { border-bottom: none; }
    .td-desc { color: #374151; }

    .tag-prop {
      display: inline-block; background: #eff6ff; color: #2563eb;
      padding: 2px 8px; border-radius: 5px; font-size: 12.5px; white-space: nowrap;
    }
    .tag-type {
      display: inline-block; background: #f5f3ff; color: #7c3aed;
      padding: 2px 8px; border-radius: 5px; font-size: 12.5px;
    }
    .tag-def {
      display: inline-block; background: #ecfdf5; color: #059669;
      padding: 2px 8px; border-radius: 5px; font-size: 12.5px;
    }

    /* ── On this page ───────────────────────── */
    .otp { width: 196px; flex-shrink: 0; position: sticky; top: 90px; align-self: flex-start; }
    .otp-label {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .09em; color: #9ca3af; margin-bottom: 12px;
    }
    .otp-nav { display: flex; flex-direction: column; gap: 2px; }
    .otp-link {
      font-size: 13.5px; color: #6b7280;
      padding: 4px 0 4px 12px; border-left: 2px solid transparent;
      text-decoration: none; cursor: pointer;
      transition: color .12s, border-color .12s;
      display: block; user-select: none;
    }
    .otp-link:hover { color: #111827; }
    .otp-link.otp-link-active { color: #0fa78d; border-left-color: #12C6A8; font-weight: 500; }
    .otp-link.otp-link-active:hover { color: #0fa78d; }
  `],
})
export class DocPageComponent implements OnInit {
  @Input() title       = '';
  @Input() description = '';
  @Input() code        = '';
  @Input() api: ApiRow[] = [];
  @Input() hasFramework  = false;

  copied = false;
  active  = 'demo';

  ngOnInit(): void { this.active = 'demo'; }

  scrollTo(id: string): void {
    this.active = id;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const ids = ['api', ...(this.code ? ['usage'] : []), ...(this.hasFramework ? ['framework'] : []), 'demo'];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) { this.active = id; return; }
    }
    this.active = 'demo';
  }

  copy(): void {
    navigator.clipboard.writeText(this.code).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }
}
