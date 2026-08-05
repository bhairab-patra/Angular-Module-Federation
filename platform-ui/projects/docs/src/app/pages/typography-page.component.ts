import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'docs-typography-page',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="tp-page">

      <!-- ── Page header ── -->
      <div class="tp-header">
        <h1 class="tp-header__title">Typography</h1>
        <p class="tp-header__desc">
          Platform UI uses <strong>Poppins</strong> — a geometric sans-serif designed by Indian Type Foundry.
          It ships with 9 weights and matching italics, giving applications a modern, professional look
          across all screen sizes.
        </p>
      </div>

      <!-- ════════════════════════════════════════ -->
      <!-- 1 · Installation                        -->
      <!-- ════════════════════════════════════════ -->
      <section class="tp-section">
        <h2 class="tp-section__title">
          <span class="tp-section__num">01</span> Installation
        </h2>

        <!-- Option A — Google Fonts CDN -->
        <div class="tp-card">
          <div class="tp-card__header">
            <span class="tp-badge tp-badge--green">Recommended</span>
            <span class="tp-card__heading">Google Fonts CDN</span>
          </div>
          <p class="tp-card__desc">Add to <code>projects/docs/src/index.html</code> (or your app's root HTML):</p>
          <div class="tp-code-block">
            <div class="tp-code-block__bar">
              <span>index.html</span>
              <button class="tp-copy-btn" (click)="copy(cdnSnippet, $event)">Copy</button>
            </div>
            <pre class="tp-code-block__pre"><code>{{ cdnSnippet }}</code></pre>
          </div>
        </div>

        <!-- Option B — NPM -->
        <div class="tp-card" style="margin-top:16px">
          <div class="tp-card__header">
            <span class="tp-badge tp-badge--blue">Alternative</span>
            <span class="tp-card__heading">NPM Package</span>
          </div>
          <p class="tp-card__desc">Install the font package and import in your global styles:</p>
          <div class="tp-code-block">
            <div class="tp-code-block__bar">
              <span>Terminal</span>
              <button class="tp-copy-btn" (click)="copy(npmInstall, $event)">Copy</button>
            </div>
            <pre class="tp-code-block__pre"><code>{{ npmInstall }}</code></pre>
          </div>
          <div class="tp-code-block" style="margin-top:10px">
            <div class="tp-code-block__bar">
              <span>styles.scss</span>
              <button class="tp-copy-btn" (click)="copy(npmImport, $event)">Copy</button>
            </div>
            <pre class="tp-code-block__pre"><code>{{ npmImport }}</code></pre>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════════ -->
      <!-- 2 · Angular Configuration               -->
      <!-- ════════════════════════════════════════ -->
      <section class="tp-section">
        <h2 class="tp-section__title">
          <span class="tp-section__num">02</span> Angular Configuration
        </h2>

        <div class="tp-card">
          <div class="tp-card__header">
            <span class="tp-badge tp-badge--teal">styles.scss</span>
            <span class="tp-card__heading">Global font-family</span>
          </div>
          <p class="tp-card__desc">Set Poppins as the base font in your root stylesheet:</p>
          <div class="tp-code-block">
            <div class="tp-code-block__bar"><span>styles.scss</span>
              <button class="tp-copy-btn" (click)="copy(scssConfig, $event)">Copy</button>
            </div>
            <pre class="tp-code-block__pre"><code>{{ scssConfig }}</code></pre>
          </div>
        </div>

        <div class="tp-card" style="margin-top:16px">
          <div class="tp-card__header">
            <span class="tp-badge tp-badge--teal">angular.json</span>
            <span class="tp-card__heading">Reference in angular.json (NPM path only)</span>
          </div>
          <div class="tp-code-block">
            <div class="tp-code-block__bar"><span>angular.json</span>
              <button class="tp-copy-btn" (click)="copy(angularJson, $event)">Copy</button>
            </div>
            <pre class="tp-code-block__pre"><code>{{ angularJson }}</code></pre>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════════ -->
      <!-- 3 · Type Scale                          -->
      <!-- ════════════════════════════════════════ -->
      <section class="tp-section">
        <h2 class="tp-section__title">
          <span class="tp-section__num">03</span> Type Scale
        </h2>

        <div class="tp-scale-table">
          <div class="tp-scale-head">
            <span>Token</span><span>Size</span><span>Weight</span><span>Line height</span><span>Preview</span>
          </div>
          <div *ngFor="let t of scale" class="tp-scale-row">
            <code class="tp-scale-row__token">{{ t.token }}</code>
            <span class="tp-scale-row__size">{{ t.size }}</span>
            <span class="tp-scale-row__weight">{{ t.weight }}</span>
            <span class="tp-scale-row__lh">{{ t.lh }}</span>
            <span class="tp-scale-row__preview"
                  [style.font-size]="t.size"
                  [style.font-weight]="t.weight"
                  [style.line-height]="t.lh">
              {{ t.preview }}
            </span>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════════ -->
      <!-- 4 · Font Weights                        -->
      <!-- ════════════════════════════════════════ -->
      <section class="tp-section">
        <h2 class="tp-section__title">
          <span class="tp-section__num">04</span> Font Weights
        </h2>
        <div class="tp-weights">
          <div *ngFor="let w of weights" class="tp-weight-item">
            <span class="tp-weight-item__name">{{ w.name }}</span>
            <span class="tp-weight-item__num">{{ w.value }}</span>
            <span class="tp-weight-item__sample" [style.font-weight]="w.value">
              The quick brown fox
            </span>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════════ -->
      <!-- 5 · Headings                            -->
      <!-- ════════════════════════════════════════ -->
      <section class="tp-section">
        <h2 class="tp-section__title">
          <span class="tp-section__num">05</span> Headings
        </h2>
        <div class="tp-headings-demo">
          <div class="tp-heading-row">
            <code>H1</code>
            <h1 class="tp-h1">Platform UI Design System</h1>
          </div>
          <div class="tp-heading-row">
            <code>H2</code>
            <h2 class="tp-h2">Component Documentation</h2>
          </div>
          <div class="tp-heading-row">
            <code>H3</code>
            <h3 class="tp-h3">Getting Started with Angular</h3>
          </div>
          <div class="tp-heading-row">
            <code>H4</code>
            <h4 class="tp-h4">Installation and Configuration</h4>
          </div>
          <div class="tp-heading-row">
            <code>H5</code>
            <h5 class="tp-h5">Typography Fundamentals</h5>
          </div>
          <div class="tp-heading-row">
            <code>H6</code>
            <h6 class="tp-h6">Section Label or Caption</h6>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════════ -->
      <!-- 6 · Paragraph & Body                    -->
      <!-- ════════════════════════════════════════ -->
      <section class="tp-section">
        <h2 class="tp-section__title">
          <span class="tp-section__num">06</span> Paragraph &amp; Body Text
        </h2>
        <div class="tp-body-demo">

          <div class="tp-body-item">
            <code class="tp-body-token">body-lg</code>
            <p class="tp-body-lg">
              Poppins is a geometric sans-serif typeface designed by Jonny Pinhorn and Ninad Kale,
              commissioned by Indian Type Foundry. It supports over 100 languages and provides
              excellent readability for both screen and print.
            </p>
          </div>

          <div class="tp-body-item">
            <code class="tp-body-token">body</code>
            <p class="tp-body">
              Platform UI uses Poppins as its primary typeface to deliver a consistent,
              professional look across all components and applications. The font is loaded
              via Google Fonts CDN for maximum performance.
            </p>
          </div>

          <div class="tp-body-item">
            <code class="tp-body-token">body-sm</code>
            <p class="tp-body-sm">
              Small body text is used for secondary content, helper text, captions,
              and metadata fields. Keep line lengths between 45–75 characters for optimal readability.
            </p>
          </div>

          <div class="tp-body-item">
            <code class="tp-body-token">caption</code>
            <p class="tp-caption">
              Image captions, table footnotes, form helper messages, timestamps
            </p>
          </div>

        </div>
      </section>

      <!-- ════════════════════════════════════════ -->
      <!-- 7 · Special Styles                      -->
      <!-- ════════════════════════════════════════ -->
      <section class="tp-section">
        <h2 class="tp-section__title">
          <span class="tp-section__num">07</span> Special Styles
        </h2>
        <div class="tp-special-grid">

          <div class="tp-special-card">
            <span class="tp-special-label">Label / Overline</span>
            <span class="tp-overline">SECTION HEADING</span>
          </div>

          <div class="tp-special-card">
            <span class="tp-special-label">Badge / Tag</span>
            <span class="tp-badge-text">Active</span>
          </div>

          <div class="tp-special-card">
            <span class="tp-special-label">Code / Mono</span>
            <code class="tp-code-inline">import &#123; SpinnerComponent &#125;</code>
          </div>

          <div class="tp-special-card">
            <span class="tp-special-label">Link</span>
            <a class="tp-link" href="#">View documentation →</a>
          </div>

          <div class="tp-special-card">
            <span class="tp-special-label">Muted / Secondary</span>
            <span class="tp-muted">Last updated 3 minutes ago</span>
          </div>

          <div class="tp-special-card">
            <span class="tp-special-label">Strong / Bold</span>
            <strong class="tp-strong">Important information</strong>
          </div>

        </div>
      </section>

      <!-- ════════════════════════════════════════ -->
      <!-- 8 · SCSS Tokens Reference               -->
      <!-- ════════════════════════════════════════ -->
      <section class="tp-section">
        <h2 class="tp-section__title">
          <span class="tp-section__num">08</span> SCSS Tokens &amp; Usage
        </h2>
        <div class="tp-code-block">
          <div class="tp-code-block__bar">
            <span>_typography.scss</span>
            <button class="tp-copy-btn" (click)="copy(scssTokens, $event)">Copy</button>
          </div>
          <pre class="tp-code-block__pre"><code>{{ scssTokens }}</code></pre>
        </div>
      </section>

    </div>
  `,
  styles: [`
    /* ── Page shell ─────────────────────────────── */
    .tp-page {
      padding: 40px 48px 80px;
      max-width: 900px;
      font-family: 'Poppins', system-ui, sans-serif;
      color: #111827;
    }

    /* ── Header ─────────────────────────────────── */
    .tp-header { margin-bottom: 40px; }
    .tp-header__title {
      font-size: 32px; font-weight: 800; color: #111827;
      margin: 0 0 12px; letter-spacing: -.02em;
    }
    .tp-header__desc {
      font-size: 15px; color: #4b5563; line-height: 1.7; margin: 0;
    }
    .tp-header__desc strong { color: #12C6A8; font-weight: 700; }

    /* ── Section ─────────────────────────────────── */
    .tp-section { margin-bottom: 48px; }
    .tp-section__title {
      display: flex; align-items: center; gap: 12px;
      font-size: 18px; font-weight: 700; color: #111827;
      margin: 0 0 20px; padding-bottom: 12px;
      border-bottom: 2px solid #f3f4f6;
    }
    .tp-section__num {
      font-size: 11px; font-weight: 800;
      color: #12C6A8; background: rgba(18,198,168,.1);
      padding: 2px 8px; border-radius: 999px; letter-spacing: .06em;
    }

    /* ── Cards ──────────────────────────────────── */
    .tp-card {
      border: 1px solid #f0f1f3; border-radius: 14px;
      padding: 20px 24px; background: #fafbfc;
    }
    .tp-card__header {
      display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
    }
    .tp-card__heading { font-size: 14px; font-weight: 700; color: #111827; }
    .tp-card__desc { font-size: 13px; color: #6b7280; margin: 0 0 12px; }

    /* ── Badges ─────────────────────────────────── */
    .tp-badge {
      font-size: 10px; font-weight: 700; padding: 2px 8px;
      border-radius: 999px; letter-spacing: .05em;
    }
    .tp-badge--green { background: #dcfce7; color: #15803d; }
    .tp-badge--blue  { background: #dbeafe; color: #1d4ed8; }
    .tp-badge--teal  { background: rgba(18,198,168,.12); color: #0d6e5f; }

    /* ── Code blocks ────────────────────────────── */
    .tp-code-block {
      border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;
    }
    .tp-code-block__bar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 14px; background: #f3f4f6;
      font-size: 11px; font-weight: 600; color: #6b7280;
      border-bottom: 1px solid #e5e7eb;
      font-family: monospace;
    }
    .tp-code-block__pre {
      margin: 0; padding: 16px; background: #0f172a;
      overflow-x: auto; font-size: 12.5px; line-height: 1.7;
    }
    .tp-code-block__pre code {
      color: #e2e8f0; font-family: 'Consolas', 'Courier New', monospace;
      white-space: pre;
    }
    .tp-copy-btn {
      padding: 3px 10px; border-radius: 6px; border: 1px solid #d1d5db;
      background: #fff; font-size: 11px; color: #374151; cursor: pointer;
      font-family: 'Poppins', system-ui, sans-serif;
      transition: background .15s;
    }
    .tp-copy-btn:hover { background: #f9fafb; }

    /* ── Type scale table ───────────────────────── */
    .tp-scale-table {
      border: 1px solid #f0f1f3; border-radius: 12px; overflow: hidden;
    }
    .tp-scale-head {
      display: grid; grid-template-columns: 140px 70px 80px 100px 1fr;
      padding: 10px 16px; background: #f8fafc;
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .07em; color: #9ca3af;
      border-bottom: 1px solid #f0f1f3;
    }
    .tp-scale-row {
      display: grid; grid-template-columns: 140px 70px 80px 100px 1fr;
      align-items: center; padding: 12px 16px;
      border-bottom: 1px solid #f9fafb;
    }
    .tp-scale-row:last-child { border-bottom: none; }
    .tp-scale-row:hover { background: #fafbfc; }
    .tp-scale-row__token { font-size: 12px; color: #12C6A8; font-family: monospace; }
    .tp-scale-row__size, .tp-scale-row__weight, .tp-scale-row__lh {
      font-size: 12px; color: #6b7280;
    }
    .tp-scale-row__preview {
      font-family: 'Poppins', system-ui, sans-serif;
      color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }

    /* ── Weights ────────────────────────────────── */
    .tp-weights { display: flex; flex-direction: column; gap: 0; }
    .tp-weight-item {
      display: grid; grid-template-columns: 120px 60px 1fr;
      align-items: center; padding: 12px 0;
      border-bottom: 1px solid #f3f4f6;
      gap: 16px;
    }
    .tp-weight-item:last-child { border-bottom: none; }
    .tp-weight-item__name { font-size: 12px; color: #6b7280; }
    .tp-weight-item__num  { font-size: 12px; color: #9ca3af; font-family: monospace; }
    .tp-weight-item__sample {
      font-size: 16px; color: #111827;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* ── Headings demo ──────────────────────────── */
    .tp-headings-demo { display: flex; flex-direction: column; gap: 16px; }
    .tp-heading-row {
      display: flex; align-items: baseline; gap: 16px;
      padding-bottom: 16px; border-bottom: 1px solid #f9fafb;
    }
    .tp-heading-row:last-child { border-bottom: none; }
    .tp-heading-row code {
      font-size: 10px; font-weight: 700; color: #9ca3af;
      background: #f3f4f6; padding: 2px 6px; border-radius: 4px;
      flex-shrink: 0; width: 28px; text-align: center;
    }
    .tp-h1 { font-size: 36px; font-weight: 800; color: #111827; margin: 0; letter-spacing: -.02em; line-height: 1.2; }
    .tp-h2 { font-size: 28px; font-weight: 700; color: #111827; margin: 0; letter-spacing: -.01em; line-height: 1.25; }
    .tp-h3 { font-size: 22px; font-weight: 700; color: #111827; margin: 0; line-height: 1.3; }
    .tp-h4 { font-size: 18px; font-weight: 600; color: #111827; margin: 0; line-height: 1.35; }
    .tp-h5 { font-size: 15px; font-weight: 600; color: #374151; margin: 0; line-height: 1.4; }
    .tp-h6 { font-size: 12px; font-weight: 700; color: #6b7280; margin: 0; text-transform: uppercase; letter-spacing: .08em; }

    /* ── Body text ──────────────────────────────── */
    .tp-body-demo { display: flex; flex-direction: column; gap: 20px; }
    .tp-body-item { display: flex; flex-direction: column; gap: 6px; }
    .tp-body-token { font-size: 10px; color: #12C6A8; font-family: monospace; background: rgba(18,198,168,.08); padding: 2px 7px; border-radius: 4px; width: fit-content; }
    .tp-body-lg  { font-size: 16px; line-height: 1.7; color: #111827; margin: 0; }
    .tp-body     { font-size: 14px; line-height: 1.65; color: #374151; margin: 0; }
    .tp-body-sm  { font-size: 13px; line-height: 1.6;  color: #4b5563; margin: 0; }
    .tp-caption  { font-size: 11px; line-height: 1.5;  color: #9ca3af; margin: 0; }

    /* ── Special styles ─────────────────────────── */
    .tp-special-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .tp-special-card {
      border: 1px solid #f0f1f3; border-radius: 12px;
      padding: 16px 18px; background: #fafbfc;
      display: flex; flex-direction: column; gap: 10px;
    }
    .tp-special-label { font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: .07em; }
    .tp-overline  { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #6b7280; }
    .tp-badge-text { font-size: 11px; font-weight: 700; background: #dcfce7; color: #15803d; padding: 2px 10px; border-radius: 999px; width: fit-content; }
    .tp-code-inline { font-size: 12px; color: #7c3aed; background: #f5f3ff; padding: 3px 8px; border-radius: 6px; font-family: monospace; }
    .tp-link { font-size: 13px; color: #12C6A8; text-decoration: none; font-weight: 500; }
    .tp-link:hover { text-decoration: underline; }
    .tp-muted  { font-size: 12px; color: #9ca3af; }
    .tp-strong { font-size: 14px; font-weight: 700; color: #111827; }
  `],
})
export class TypographyPageComponent {

  scale = [
    { token: 'display',    size: '48px', weight: '800', lh: '1.15', preview: 'Display Heading' },
    { token: 'heading-1',  size: '36px', weight: '800', lh: '1.2',  preview: 'Page Title' },
    { token: 'heading-2',  size: '28px', weight: '700', lh: '1.25', preview: 'Section Title' },
    { token: 'heading-3',  size: '22px', weight: '700', lh: '1.3',  preview: 'Subsection' },
    { token: 'heading-4',  size: '18px', weight: '600', lh: '1.35', preview: 'Card Title' },
    { token: 'heading-5',  size: '15px', weight: '600', lh: '1.4',  preview: 'Sub-header' },
    { token: 'heading-6',  size: '12px', weight: '700', lh: '1.4',  preview: 'LABEL / OVERLINE' },
    { token: 'body-lg',    size: '16px', weight: '400', lh: '1.7',  preview: 'Large body text' },
    { token: 'body',       size: '14px', weight: '400', lh: '1.65', preview: 'Default body text' },
    { token: 'body-sm',    size: '13px', weight: '400', lh: '1.6',  preview: 'Small body text' },
    { token: 'caption',    size: '11px', weight: '400', lh: '1.5',  preview: 'Caption & helper text' },
    { token: 'label',      size: '12px', weight: '600', lh: '1.4',  preview: 'Form label' },
    { token: 'overline',   size: '11px', weight: '700', lh: '1.4',  preview: 'SECTION OVERLINE' },
    { token: 'code',       size: '13px', weight: '400', lh: '1.6',  preview: 'monospace snippet' },
  ];

  weights = [
    { name: 'Thin',        value: '100' },
    { name: 'Extra Light', value: '200' },
    { name: 'Light',       value: '300' },
    { name: 'Regular',     value: '400' },
    { name: 'Medium',      value: '500' },
    { name: 'Semi Bold',   value: '600' },
    { name: 'Bold',        value: '700' },
    { name: 'Extra Bold',  value: '800' },
    { name: 'Black',       value: '900' },
  ];

  cdnSnippet = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap" rel="stylesheet">`;

  npmInstall = `npm install @fontsource/poppins`;

  npmImport = `// styles.scss — import only the weights you need
@use '@fontsource/poppins/400.css';
@use '@fontsource/poppins/500.css';
@use '@fontsource/poppins/600.css';
@use '@fontsource/poppins/700.css';
@use '@fontsource/poppins/800.css';`;

  scssConfig = `// styles.scss
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.65;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;

  angularJson = `// angular.json — projects > your-app > architect > build > options
"styles": [
  "node_modules/@fontsource/poppins/400.css",
  "node_modules/@fontsource/poppins/500.css",
  "node_modules/@fontsource/poppins/600.css",
  "node_modules/@fontsource/poppins/700.css",
  "node_modules/@fontsource/poppins/800.css",
  "src/styles.scss"
]`;

  scssTokens = `// _typography.scss — copy into your project
$font-family-base: 'Poppins', system-ui, sans-serif;
$font-family-mono: 'Consolas', 'Courier New', monospace;

// Scale
$font-size-display:   48px;
$font-size-h1:        36px;
$font-size-h2:        28px;
$font-size-h3:        22px;
$font-size-h4:        18px;
$font-size-h5:        15px;
$font-size-h6:        12px;
$font-size-body-lg:   16px;
$font-size-body:      14px;
$font-size-body-sm:   13px;
$font-size-caption:   11px;

// Weights
$font-weight-regular:   400;
$font-weight-medium:    500;
$font-weight-semibold:  600;
$font-weight-bold:      700;
$font-weight-extrabold: 800;

// Usage
.text-h1    { font-size: $font-size-h1;      font-weight: $font-weight-extrabold; }
.text-h2    { font-size: $font-size-h2;      font-weight: $font-weight-bold;      }
.text-body  { font-size: $font-size-body;    font-weight: $font-weight-regular;   }
.text-label { font-size: $font-size-caption; font-weight: $font-weight-semibold;  text-transform: uppercase; letter-spacing: .07em; }`;

  copy(text: string, e: MouseEvent): void {
    navigator.clipboard.writeText(text).then(() => {
      const btn = e.target as HTMLButtonElement;
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.color = '#12C6A8';
      setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 1800);
    });
  }
}
