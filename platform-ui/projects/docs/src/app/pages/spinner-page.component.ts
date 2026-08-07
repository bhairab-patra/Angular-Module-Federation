import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SpinnerComponent, SpinnerType, SpinnerSize } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-spinner-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<docs-page
  title="Spinner"
  description="Two animation styles — dash (radiating lines) and dots (orbiting dot ring). Supports overlay, custom colour, speed, size, and z-index."
  [hasFramework]="true"
  [api]="api">

  <!-- ══ DEMO ══════════════════════════════════════════════════════════ -->
  <ng-container demo>

    <!-- 1. Types -->
    <div class="demo-section">
      <h3 class="demo-section__title">Animation Types</h3>
      <p class="demo-section__desc">Two SVG animation styles — <code>dash</code> uses radiating lines with a steps(12) rotation, <code>dots</code> uses an orbiting dot ring.</p>
      <div class="type-grid">
        <div class="type-card">
          <div class="type-preview"><pui-spinner type="dash" size="lg" color="#12C6A8"></pui-spinner></div>
          <code class="type-name">type="dash"</code>
          <span class="type-desc">Radiating lines — steps(12) rotation</span>
        </div>
        <div class="type-card">
          <div class="type-preview"><pui-spinner type="dots" size="lg" color="#12C6A8"></pui-spinner></div>
          <code class="type-name">type="dots"</code>
          <span class="type-desc">Orbiting dot ring — steps(12) rotation</span>
        </div>
      </div>
    </div>

    <!-- 2. Sizes -->
    <div class="demo-section">
      <h3 class="demo-section__title">Sizes</h3>
      <p class="demo-section__desc">Four preset sizes — <code>sm</code> 24px, <code>md</code> 40px (default), <code>lg</code> 56px, <code>xl</code> 80px. Use <code>[sizePx]</code> for arbitrary pixel sizes.</p>
      <div class="two-col">
        <div class="variant-block">
          <span class="variant-heading">dash</span>
          <div class="size-row">
            <div *ngFor="let s of sizes" class="size-cell">
              <pui-spinner type="dash" [size]="s.size" color="#12C6A8"></pui-spinner>
              <span class="size-label">{{ s.size }}<small>{{ s.px }}px</small></span>
            </div>
          </div>
        </div>
        <div class="variant-block">
          <span class="variant-heading">dots</span>
          <div class="size-row">
            <div *ngFor="let s of sizes" class="size-cell">
              <pui-spinner type="dots" [size]="s.size" color="#12C6A8"></pui-spinner>
              <span class="size-label">{{ s.size }}<small>{{ s.px }}px</small></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Colours -->
    <div class="demo-section">
      <h3 class="demo-section__title">Colours</h3>
      <p class="demo-section__desc">Pass any CSS colour string to <code>color</code> — hex, rgb, hsl, or a CSS variable.</p>
      <div class="two-col">
        <div class="variant-block">
          <span class="variant-heading">dash</span>
          <div class="color-row">
            <div *ngFor="let c of colors" class="color-cell">
              <pui-spinner type="dash" size="md" [color]="c.color"></pui-spinner>
              <span class="color-label" [style.color]="c.color">{{ c.name }}</span>
            </div>
          </div>
        </div>
        <div class="variant-block">
          <span class="variant-heading">dots</span>
          <div class="color-row">
            <div *ngFor="let c of colors" class="color-cell">
              <pui-spinner type="dots" size="md" [color]="c.color"></pui-spinner>
              <span class="color-label" [style.color]="c.color">{{ c.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Speed -->
    <div class="demo-section">
      <h3 class="demo-section__title">Speed</h3>
      <p class="demo-section__desc">Control animation duration in milliseconds. Lower values = faster spin.</p>
      <div class="speed-row">
        <div *ngFor="let s of speeds" class="speed-cell">
          <div class="speed-pair">
            <pui-spinner type="dash" size="md" color="#12C6A8" [speed]="s.ms"></pui-spinner>
            <pui-spinner type="dots" size="md" color="#6366f1" [speed]="s.ms"></pui-spinner>
          </div>
          <span class="speed-label">{{ s.label }}<small>{{ s.ms }}ms</small></span>
        </div>
      </div>
    </div>

    <!-- 5. With label -->
    <div class="demo-section">
      <h3 class="demo-section__title">With Label</h3>
      <p class="demo-section__desc">Optional text displayed below the spinner. Use <code>labelColor</code> to match the spinner colour.</p>
      <div class="label-row">
        <pui-spinner type="dash" size="md" color="#12C6A8" label="Loading…"></pui-spinner>
        <pui-spinner type="dots" size="md" color="#6366f1" label="Please wait…" labelColor="#6366f1"></pui-spinner>
      </div>
    </div>

    <!-- 6. Custom sizePx -->
    <div class="demo-section">
      <h3 class="demo-section__title">Custom Size via [sizePx]</h3>
      <p class="demo-section__desc">Bypass size presets and render at an exact pixel dimension.</p>
      <div class="label-row">
        <div class="size-cell"><pui-spinner type="dash" [sizePx]="32" color="#12C6A8"></pui-spinner><span class="size-label">32px</span></div>
        <div class="size-cell"><pui-spinner type="dash" [sizePx]="64" color="#12C6A8"></pui-spinner><span class="size-label">64px</span></div>
        <div class="size-cell"><pui-spinner type="dots" [sizePx]="32" color="#6366f1"></pui-spinner><span class="size-label">32px</span></div>
        <div class="size-cell"><pui-spinner type="dots" [sizePx]="64" color="#6366f1"></pui-spinner><span class="size-label">64px</span></div>
      </div>
    </div>

   

  </ng-container>

  <!-- ══ FRAMEWORK USAGE ══════════════════════════════════════════════ -->
  <ng-container framework>

    <h2 class="fw-title">Framework Usage</h2>
    <p class="fw-lead">Import <code>SpinnerComponent</code> and configure with attributes. For full-page loading states combine <code>[overlay]="true"</code> with <code>*ngIf="isLoading"</code>.</p>

    <div class="fw-tabs">
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='angular'" (click)="fwTab='angular';cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.310H4.936L12 3.405z" fill="#c3002f"/></svg>
        Angular
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='react'" (click)="fwTab='react';cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><circle cx="12" cy="12" r="2.05" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/></svg>
        React
      </button>
      <button class="fw-tab" [class.fw-tab--active]="fwTab==='html'" (click)="fwTab='html';cdr.markForCheck()">
        <svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/></svg>
        HTML
      </button>
    </div>

    <div *ngIf="fwTab==='angular'" class="fw-panel">
      <div class="fw-note--angular">Import <code>SpinnerComponent</code>. Use <code>*ngIf</code> on the overlay variant to gate it behind a loading flag.</div>
      <pre><code>import &#123; SpinnerComponent &#125; from '&#64;solifi/platform-ui';

&#64;Component(&#123;
  imports: [NgIf, SpinnerComponent],
  template: &#96;
    &lt;!-- Inline --&gt;
    &lt;pui-spinner type="dash" size="md" color="#12C6A8"&gt;&lt;/pui-spinner&gt;
    &lt;pui-spinner type="dots" size="md" color="#6366f1" label="Loading…"&gt;&lt;/pui-spinner&gt;

    &lt;!-- Custom size --&gt;
    &lt;pui-spinner type="dash" [sizePx]="48" color="#12C6A8"&gt;&lt;/pui-spinner&gt;

    &lt;!-- Full-screen overlay --&gt;
    &lt;pui-spinner *ngIf="isLoading"
      type="dash"
      size="xl"
      color="#12C6A8"
      [overlay]="true"
      overlayColor="#ffffff"
      [overlayOpacity]="0.75"
      [zIndex]="2000"
      label="Please wait…"&gt;
    &lt;/pui-spinner&gt;
  &#96;
&#125;)
export class MyComponent &#123;
  isLoading = false;
  loadData() &#123;
    this.isLoading = true;
    fetchData().then(() =&gt; this.isLoading = false);
  &#125;
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='react'" class="fw-panel">
      <div class="fw-note--react">All props are plain HTML attributes. Boolean props only need to be present (e.g. <code>overlay</code>).</div>
      <pre><code>import '&#64;solifi/platform-ui';

function LoadingOverlay(&#123; isLoading &#125;) &#123;
  if (!isLoading) return null;
  return (
    &lt;pui-spinner
      type="dash"
      size="xl"
      color="#12C6A8"
      overlay
      overlay-color="#ffffff"
      overlay-opacity="0.75"
      z-index="2000"
      label="Loading…"&gt;
    &lt;/pui-spinner&gt;
  );
&#125;

function InlineSpinner() &#123;
  return &lt;pui-spinner type="dots" size="md" color="#6366f1" label="Please wait"&gt;&lt;/pui-spinner&gt;;
&#125;</code></pre>
    </div>

    <div *ngIf="fwTab==='html'" class="fw-panel">
      <div class="fw-note--html">Use <code>display:none</code> / <code>display:block</code> or add/remove the element to toggle the overlay.</div>
      <pre><code>&lt;!-- Inline spinners --&gt;
&lt;pui-spinner type="dash" size="md" color="#12C6A8"&gt;&lt;/pui-spinner&gt;
&lt;pui-spinner type="dots" size="lg" color="#6366f1" label="Loading…"&gt;&lt;/pui-spinner&gt;

&lt;!-- Full-page overlay --&gt;
&lt;pui-spinner
  id="page-spinner"
  type="dash"
  size="xl"
  color="#12C6A8"
  overlay
  overlay-color="#ffffff"
  overlay-opacity="0.75"
  z-index="2000"
  label="Please wait…"
  style="display:none"&gt;
&lt;/pui-spinner&gt;

&lt;script&gt;
  const spinner = document.getElementById('page-spinner');
  function showLoader()  &#123; spinner.style.display = 'block'; &#125;
  function hideLoader()  &#123; spinner.style.display = 'none';  &#125;
&lt;/script&gt;</code></pre>
    </div>

    <h4 class="fw-ref-title">Spinner Quick Reference</h4>
    <div class="xfw-wrap">
      <table class="xfw-table">
        <thead><tr><th>Property</th><th>Angular</th><th>HTML attr</th><th>JS property</th></tr></thead>
        <tbody>
          <tr *ngFor="let r of xfwRows">
            <td><span class="tag-name">{{ r.name }}</span></td>
            <td><span class="tag-ng">{{ r.angular }}</span></td>
            <td><span class="tag-html">{{ r.attr }}</span></td>
            <td><span class="tag-js">{{ r.js }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

  </ng-container>

</docs-page>
  `,
  styles: [`
    .demo-section { margin-bottom: 40px; }
    .demo-section__title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 6px; }
    .demo-section__desc  { font-size: 13px; color: #6b7280; margin-bottom: 14px; }
    .demo-section__desc code { background:#f3f4f6;padding:1px 5px;border-radius:4px;font-size:12px; }

    .type-grid { display:flex;gap:24px;padding:4px 0 8px; }
    .type-card { display:flex;flex-direction:column;align-items:center;gap:14px;padding:32px 48px;border:1px solid #f3f4f6;border-radius:16px;background:#fafbfc;flex:1; }
    .type-preview { height:64px;display:flex;align-items:center;justify-content:center; }
    .type-name { font-size:13px;font-family:monospace;color:#111827;background:#f1f5f9;padding:3px 10px;border-radius:6px; }
    .type-desc { font-size:11px;color:#9ca3af;text-align:center; }

    .two-col { display:flex;gap:24px;padding:4px 0 8px; }
    .variant-block { flex:1;display:flex;flex-direction:column;gap:16px; }
    .variant-heading { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;font-family:monospace; }

    .size-row { display:flex;align-items:flex-end;gap:28px; }
    .size-cell { display:flex;flex-direction:column;align-items:center;gap:10px; }
    .size-label { font-size:11px;font-weight:700;color:#6b7280;display:flex;flex-direction:column;align-items:center;gap:2px; }
    .size-label small { font-weight:400;color:#9ca3af;font-size:10px; }

    .color-row { display:flex;gap:20px;flex-wrap:wrap; }
    .color-cell { display:flex;flex-direction:column;align-items:center;gap:10px; }
    .color-label { font-size:10px;font-weight:700; }

    .speed-row { display:flex;gap:40px;padding:4px 0 8px; }
    .speed-cell { display:flex;flex-direction:column;align-items:center;gap:14px; }
    .speed-pair { display:flex;gap:16px;align-items:center; }
    .speed-label { font-size:11px;font-weight:700;color:#6b7280;display:flex;flex-direction:column;align-items:center;gap:2px; }
    .speed-label small { font-weight:400;color:#9ca3af;font-size:10px; }

    .label-row { display:flex;gap:48px;padding:4px 0 8px;align-items:center; }

    .overlay-row { display:flex;gap:16px;padding:4px 0 8px; }
    .ov-card { display:flex;flex-direction:column;gap:8px;flex:1; }
    .ov-frame { position:relative;height:120px;border-radius:12px;overflow:hidden;border:1px solid #f3f4f6; }
    .ov-content { padding:16px;display:flex;flex-direction:column;gap:10px; }
    .ov-line { height:10px;border-radius:4px;background:#e5e7eb; }
    .ov-line--short { width:55%; }
    .ov-backdrop { position:absolute;inset:0; }
    .ov-center { position:absolute;inset:0;display:flex;align-items:center;justify-content:center; }
    .ov-label { font-size:11px;font-weight:700;color:#6b7280;text-align:center;text-transform:uppercase;letter-spacing:.05em; }

    .fp-row { display:flex;gap:12px;flex-wrap:wrap; }
    .fp-btn { display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:10px;border:1px solid #e5e7eb;background:#fff;font-size:13px;color:#374151;cursor:pointer;font-family:inherit;transition:background .15s,border-color .15s; }
    .fp-btn:hover { background:#f9fafb;border-color:#d1d5db; }
    .fp-btn--dark { background:#0f172a;color:#e2e8f0;border-color:#1e293b; }
    .fp-btn--dark:hover { background:#1e293b; }

    .fw-ref-title { margin:24px 0 10px;font-size:13px;font-weight:700;color:#374151; }
  `],
})
export class SpinnerPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  overlayActive  = false;
  activeType: SpinnerType = 'dash';
  activeColor    = '#12C6A8';
  activeBg       = '#ffffff';
  activeOpacity  = 0.75;

  sizes: { size: SpinnerSize; px: number }[] = [
    { size: 'sm', px: 24 },
    { size: 'md', px: 40 },
    { size: 'lg', px: 56 },
    { size: 'xl', px: 80 },
  ];

  colors = [
    { name: 'Teal',   color: '#12C6A8' },
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Amber',  color: '#f59e0b' },
    { name: 'Red',    color: '#ef4444' },
    { name: 'Slate',  color: '#475569' },
  ];

  speeds = [
    { label: 'Fast',   ms: 400  },
    { label: 'Normal', ms: 800  },
    { label: 'Slow',   ms: 1400 },
  ];

  overlayDemos = [
    { type: 'dash' as SpinnerType, color: '#12C6A8', bg: '#ffffff', opacity: 0.80, label: 'dash · white' },
    { type: 'dots' as SpinnerType, color: '#12C6A8', bg: '#ffffff', opacity: 0.80, label: 'dots · white' },
    { type: 'dash' as SpinnerType, color: '#ffffff', bg: '#0f172a', opacity: 0.65, label: 'dash · dark'  },
    { type: 'dots' as SpinnerType, color: '#ffffff', bg: '#0f172a', opacity: 0.65, label: 'dots · dark'  },
  ];

  showOverlay(type: SpinnerType, color: string, bg: string, opacity: number): void {
    this.activeType    = type;
    this.activeColor   = color;
    this.activeBg      = bg;
    this.activeOpacity = opacity;
    this.overlayActive = true;
    this.cdr.markForCheck();
    setTimeout(() => { this.overlayActive = false; this.cdr.markForCheck(); }, 2500);
  }

  xfwRows = [
    { name: 'type',           angular: 'type="dots"',              attr: 'type="dots"',         js: 'el.type = "dots"'         },
    { name: 'size',           angular: 'size="lg"',                attr: 'size="lg"',            js: 'el.size = "lg"'           },
    { name: 'sizePx',         angular: '[sizePx]="48"',            attr: '—',                    js: 'el.sizePx = 48'           },
    { name: 'color',          angular: 'color="#12C6A8"',          attr: 'color="#12C6A8"',      js: 'el.color = "#12C6A8"'     },
    { name: 'speed',          angular: '[speed]="400"',            attr: 'speed="400"',          js: 'el.speed = 400'           },
    { name: 'overlay',        angular: '[overlay]="true"',         attr: 'overlay',              js: 'el.overlay = true'        },
    { name: 'overlayColor',   angular: 'overlayColor="#fff"',      attr: 'overlay-color="#fff"', js: 'el.overlayColor = "#fff"' },
    { name: 'overlayOpacity', angular: '[overlayOpacity]="0.75"',  attr: 'overlay-opacity="0.75"', js: 'el.overlayOpacity = 0.75' },
    { name: 'label',          angular: 'label="Loading…"',         attr: 'label="Loading…"',    js: 'el.label = "Loading…"'    },
  ];

  api: ApiRow[] = [
    { input: 'type',           type: `'dash'|'dots'`,      default: `'dash'`,    description: 'dash = radiating lines · dots = orbiting dot ring.' },
    { input: 'size',           type: `'sm'|'md'|'lg'|'xl'`, default: `'md'`,   description: 'Size preset — sm 24px · md 40px · lg 56px · xl 80px.' },
    { input: 'sizePx',         type: 'number',             default: 'null',      description: 'Exact pixel size — overrides the size preset.' },
    { input: 'color',          type: 'string',             default: `'#12C6A8'`, description: 'Spinner colour (any CSS colour value).' },
    { input: 'speed',          type: 'number',             default: '800',       description: 'Full-rotation duration in milliseconds.' },
    { input: 'overlay',        type: 'boolean',            default: 'false',     description: 'Render a fixed full-screen backdrop.' },
    { input: 'overlayColor',   type: 'string',             default: `'#ffffff'`, description: 'Overlay background colour.' },
    { input: 'overlayOpacity', type: 'number',             default: '0.7',       description: 'Overlay opacity — 0 (clear) to 1 (solid).' },
    { input: 'zIndex',         type: 'number',             default: '1000',      description: 'z-index of overlay; spinner renders at zIndex + 1.' },
    { input: 'label',          type: 'string',             default: `''`,        description: 'Optional text displayed below the spinner.' },
    { input: 'labelColor',     type: 'string',             default: `'#6b7280'`, description: 'Label text colour.' },
  ];
}
