import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { SpinnerType, SpinnerSize } from '@solifi/platform-ui';

@Component({
  selector: 'docs-spinner-page',
  standalone: true,
  imports: [DocPageComponent, SpinnerComponent, NgFor, NgIf],
  template: `
    <docs-page
      title="Spinner"
      description="Two animation styles — dash (radiating lines) and dots (orbiting dot ring). Supports overlay, custom colour, speed, size, and z-index."
      [code]="code"
      [api]="api">

      <ng-container demo>

        <!-- ── Types ── -->
        <div class="section-divider"><span class="section-tag">Types</span></div>
        <div class="type-grid">

          <div class="type-card">
            <div class="type-preview">
              <pui-spinner type="dash" size="lg" color="#12C6A8"></pui-spinner>
            </div>
            <code class="type-name">type="dash"</code>
            <span class="type-desc">Radiating lines — steps(12) rotation</span>
          </div>

          <div class="type-card">
            <div class="type-preview">
              <pui-spinner type="dots" size="lg" color="#12C6A8"></pui-spinner>
            </div>
            <code class="type-name">type="dots"</code>
            <span class="type-desc">Orbiting dot ring — steps(12) rotation</span>
          </div>

        </div>

        <!-- ── Sizes ── -->
        <div class="section-divider"><span class="section-tag">Sizes</span></div>
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

        <!-- ── Colours ── -->
        <div class="section-divider"><span class="section-tag">Colours</span></div>
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

        <!-- ── Speed ── -->
        <div class="section-divider"><span class="section-tag">Speed</span></div>
        <div class="speed-row">
          <div *ngFor="let s of speeds" class="speed-cell">
            <div class="speed-pair">
              <pui-spinner type="dash" size="md" color="#12C6A8" [speed]="s.ms"></pui-spinner>
              <pui-spinner type="dots" size="md" color="#6366f1" [speed]="s.ms"></pui-spinner>
            </div>
            <span class="speed-label">{{ s.label }}<small>{{ s.ms }}ms</small></span>
          </div>
        </div>

        <!-- ── With label ── -->
        <div class="section-divider"><span class="section-tag">With Label</span></div>
        <div class="label-row">
          <pui-spinner type="dash" size="md" color="#12C6A8" label="Loading…"></pui-spinner>
          <pui-spinner type="dots" size="md" color="#6366f1" label="Please wait…" labelColor="#6366f1"></pui-spinner>
        </div>

        <!-- ── Custom size ── -->
        <div class="section-divider"><span class="section-tag">Custom Size via [sizePx]</span></div>
        <div class="label-row">
          <div class="size-cell">
            <pui-spinner type="dash" [sizePx]="32" color="#12C6A8"></pui-spinner>
            <span class="size-label">32px</span>
          </div>
          <div class="size-cell">
            <pui-spinner type="dash" [sizePx]="64" color="#12C6A8"></pui-spinner>
            <span class="size-label">64px</span>
          </div>
          <div class="size-cell">
            <pui-spinner type="dots" [sizePx]="32" color="#6366f1"></pui-spinner>
            <span class="size-label">32px</span>
          </div>
          <div class="size-cell">
            <pui-spinner type="dots" [sizePx]="64" color="#6366f1"></pui-spinner>
            <span class="size-label">64px</span>
          </div>
        </div>

        <!-- ── Overlay demo ── -->
        <div class="section-divider"><span class="section-tag">Overlay (scoped preview)</span></div>
        <div class="overlay-row">
          <div class="ov-card" *ngFor="let ov of overlayDemos">
            <div class="ov-frame">
              <div class="ov-content">
                <div class="ov-line"></div>
                <div class="ov-line ov-line--short"></div>
                <div class="ov-line"></div>
              </div>
              <div class="ov-backdrop" [style.background]="ov.bg" [style.opacity]="ov.opacity"></div>
              <div class="ov-center">
                <pui-spinner [type]="ov.type" size="md" [color]="ov.color"></pui-spinner>
              </div>
            </div>
            <span class="ov-label">{{ ov.label }}</span>
          </div>
        </div>

        <!-- ── Full-page overlay trigger ── -->
        <div class="section-divider"><span class="section-tag">Full-Page Overlay</span></div>
        <div class="fp-row">
          <button class="fp-btn" (click)="showOverlay('dash', '#12C6A8', '#ffffff', 0.75)">
            <pui-spinner type="dash" size="sm" color="#12C6A8"></pui-spinner>
            dash — white overlay
          </button>
          <button class="fp-btn" (click)="showOverlay('dots', '#12C6A8', '#ffffff', 0.75)">
            <pui-spinner type="dots" size="sm" color="#12C6A8"></pui-spinner>
            dots — white overlay
          </button>
          <button class="fp-btn fp-btn--dark" (click)="showOverlay('dash', '#ffffff', '#0f172a', 0.6)">
            <pui-spinner type="dash" size="sm" color="#ffffff"></pui-spinner>
            dash — dark overlay
          </button>
          <button class="fp-btn fp-btn--dark" (click)="showOverlay('dots', '#ffffff', '#0f172a', 0.6)">
            <pui-spinner type="dots" size="sm" color="#ffffff"></pui-spinner>
            dots — dark overlay
          </button>
        </div>

        <!-- Global overlay -->
        <pui-spinner *ngIf="overlayActive"
                     [type]="activeType"
                     size="xl"
                     [color]="activeColor"
                     [overlay]="true"
                     [overlayColor]="activeBg"
                     [overlayOpacity]="activeOpacity"
                     [zIndex]="2000"
                     label="Loading, please wait…"
                     [labelColor]="activeColor">
        </pui-spinner>

      </ng-container>
    </docs-page>
  `,
  styles: [`
    .section-divider {
      display: flex; align-items: center; gap: 12px; width: 100%;
      border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 4px;
    }
    .section-tag {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .07em; color: #9ca3af; white-space: nowrap;
    }

    /* Types */
    .type-grid { display: flex; gap: 24px; padding: 20px 0 8px; }
    .type-card {
      display: flex; flex-direction: column; align-items: center; gap: 14px;
      padding: 32px 48px; border: 1px solid #f3f4f6; border-radius: 16px;
      background: #fafbfc; flex: 1;
    }
    .type-preview { height: 64px; display: flex; align-items: center; justify-content: center; }
    .type-name { font-size: 13px; font-family: monospace; color: #111827; background: #f1f5f9; padding: 3px 10px; border-radius: 6px; }
    .type-desc { font-size: 11px; color: #9ca3af; text-align: center; }

    /* Two-column layout */
    .two-col { display: flex; gap: 24px; padding: 16px 0 8px; }
    .variant-block { flex: 1; display: flex; flex-direction: column; gap: 16px; }
    .variant-heading {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .08em; color: #6b7280; font-family: monospace;
    }

    /* Sizes */
    .size-row { display: flex; align-items: flex-end; gap: 28px; }
    .size-cell { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .size-label {
      font-size: 11px; font-weight: 700; color: #6b7280;
      display: flex; flex-direction: column; align-items: center; gap: 2px;
    }
    .size-label small { font-weight: 400; color: #9ca3af; font-size: 10px; }

    /* Colours */
    .color-row { display: flex; gap: 20px; flex-wrap: wrap; }
    .color-cell { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .color-label { font-size: 10px; font-weight: 700; }

    /* Speed */
    .speed-row { display: flex; gap: 40px; padding: 20px 0 8px; }
    .speed-cell { display: flex; flex-direction: column; align-items: center; gap: 14px; }
    .speed-pair { display: flex; gap: 16px; align-items: center; }
    .speed-label {
      font-size: 11px; font-weight: 700; color: #6b7280;
      display: flex; flex-direction: column; align-items: center; gap: 2px;
    }
    .speed-label small { font-weight: 400; color: #9ca3af; font-size: 10px; }

    /* Label */
    .label-row { display: flex; gap: 48px; padding: 20px 0 8px; align-items: center; }

    /* Overlay preview */
    .overlay-row { display: flex; gap: 16px; padding: 16px 0 8px; }
    .ov-card { display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .ov-frame {
      position: relative; height: 120px; border-radius: 12px;
      overflow: hidden; border: 1px solid #f3f4f6;
    }
    .ov-content { padding: 16px; display: flex; flex-direction: column; gap: 10px; }
    .ov-line { height: 10px; border-radius: 4px; background: #e5e7eb; }
    .ov-line--short { width: 55%; }
    .ov-backdrop { position: absolute; inset: 0; }
    .ov-center {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .ov-label { font-size: 11px; font-weight: 700; color: #6b7280; text-align: center; text-transform: uppercase; letter-spacing: .05em; }

    /* Full-page buttons */
    .fp-row { display: flex; gap: 12px; flex-wrap: wrap; padding: 16px 0 8px; }
    .fp-btn {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 18px; border-radius: 10px;
      border: 1px solid #e5e7eb; background: #fff;
      font-size: 13px; color: #374151; cursor: pointer;
      font-family: 'Poppins', system-ui, sans-serif;
      transition: background .15s, border-color .15s;
    }
    .fp-btn:hover { background: #f9fafb; border-color: #d1d5db; }
    .fp-btn--dark {
      background: #0f172a; color: #e2e8f0; border-color: #1e293b;
    }
    .fp-btn--dark:hover { background: #1e293b; }
  `],
})
export class SpinnerPageComponent {

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
    setTimeout(() => { this.overlayActive = false; }, 2500);
  }

  code = `import { SpinnerComponent } from '@solifi/platform-ui';
import { SpinnerType } from '@solifi/platform-ui';

// ── Inline ─────────────────────────────────────────────────────
<pui-spinner type="dash" size="md" color="#12C6A8"></pui-spinner>
<pui-spinner type="dots" size="md" color="#12C6A8"></pui-spinner>

// ── Sizes: sm | md | lg | xl ───────────────────────────────────
<pui-spinner type="dash" size="sm" color="#12C6A8"></pui-spinner>
<pui-spinner type="dash" size="xl" color="#12C6A8"></pui-spinner>

// ── Custom px size ─────────────────────────────────────────────
<pui-spinner type="dash" [sizePx]="32" color="#12C6A8"></pui-spinner>

// ── Speed (ms) ─────────────────────────────────────────────────
<pui-spinner type="dash" [speed]="400"  color="#12C6A8"></pui-spinner>  <!-- fast -->
<pui-spinner type="dots" [speed]="1400" color="#12C6A8"></pui-spinner>  <!-- slow -->

// ── With label ─────────────────────────────────────────────────
<pui-spinner type="dash" color="#12C6A8" label="Loading…"></pui-spinner>

// ── Full-screen white overlay ──────────────────────────────────
<pui-spinner *ngIf="isLoading"
             type="dash"
             size="xl"
             color="#12C6A8"
             [overlay]="true"
             overlayColor="#ffffff"
             [overlayOpacity]="0.75"
             [zIndex]="2000"
             label="Please wait…">
</pui-spinner>

// ── Dark overlay ───────────────────────────────────────────────
<pui-spinner *ngIf="isLoading"
             type="dots"
             size="xl"
             color="#ffffff"
             [overlay]="true"
             overlayColor="#0f172a"
             [overlayOpacity]="0.6"
             [zIndex]="2000">
</pui-spinner>`;

  api: ApiRow[] = [
    { input: 'type',           type: `'dash' | 'dots'`,  default: `'dash'`,    description: 'dash = radiating lines · dots = orbiting dot ring' },
    { input: 'size',           type: `'sm'|'md'|'lg'|'xl'`, default: `'md'`,  description: 'Size preset — sm 24px · md 40px · lg 56px · xl 80px' },
    { input: 'sizePx',         type: 'number',           default: 'null',       description: 'Exact pixel size — overrides size preset' },
    { input: 'color',          type: 'string',           default: `'#12C6A8'`,  description: 'Spinner colour (any CSS colour)' },
    { input: 'speed',          type: 'number',           default: '800',        description: 'Full-rotation duration in milliseconds' },
    { input: 'overlay',        type: 'boolean',          default: 'false',      description: 'Render a fixed full-screen backdrop' },
    { input: 'overlayColor',   type: 'string',           default: `'#ffffff'`,  description: 'Overlay background colour' },
    { input: 'overlayOpacity', type: 'number',           default: '0.7',        description: 'Overlay opacity — 0 (clear) to 1 (solid)' },
    { input: 'zIndex',         type: 'number',           default: '1000',       description: 'z-index of overlay; spinner renders at zIndex + 1' },
    { input: 'label',          type: 'string',           default: `''`,         description: 'Optional text displayed below the spinner' },
    { input: 'labelColor',     type: 'string',           default: `'#6b7280'`,  description: 'Label text colour' },
  ];
}
