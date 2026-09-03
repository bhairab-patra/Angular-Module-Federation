import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'docs-typography-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './typography-page.component.html',
  styleUrls: ['./typography-page.component.scss'],
})
export class TypographyPageComponent {
  scale = [
    { token: 'display', size: '48px', weight: '800', lh: '1.15', preview: 'Display Heading' },
    { token: 'heading-1', size: '36px', weight: '800', lh: '1.2', preview: 'Page Title' },
    { token: 'heading-2', size: '28px', weight: '700', lh: '1.25', preview: 'Section Title' },
    { token: 'heading-3', size: '22px', weight: '700', lh: '1.3', preview: 'Subsection' },
    { token: 'heading-4', size: '18px', weight: '600', lh: '1.35', preview: 'Card Title' },
    { token: 'heading-5', size: '15px', weight: '600', lh: '1.4', preview: 'Sub-header' },
    { token: 'heading-6', size: '12px', weight: '700', lh: '1.4', preview: 'LABEL / OVERLINE' },
    { token: 'body-lg', size: '16px', weight: '400', lh: '1.7', preview: 'Large body text' },
    { token: 'body', size: '14px', weight: '400', lh: '1.65', preview: 'Default body text' },
    { token: 'body-sm', size: '13px', weight: '400', lh: '1.6', preview: 'Small body text' },
    { token: 'caption', size: '11px', weight: '400', lh: '1.5', preview: 'Caption & helper text' },
    { token: 'label', size: '12px', weight: '600', lh: '1.4', preview: 'Form label' },
    { token: 'overline', size: '11px', weight: '700', lh: '1.4', preview: 'SECTION OVERLINE' },
    { token: 'code', size: '13px', weight: '400', lh: '1.6', preview: 'monospace snippet' },
  ];

  weights = [
    { name: 'Thin', value: '100' },
    { name: 'Extra Light', value: '200' },
    { name: 'Light', value: '300' },
    { name: 'Regular', value: '400' },
    { name: 'Medium', value: '500' },
    { name: 'Semi Bold', value: '600' },
    { name: 'Bold', value: '700' },
    { name: 'Extra Bold', value: '800' },
    { name: 'Black', value: '900' },
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
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.color = '';
      }, 1800);
    });
  }

  trackByIndex(_i: number): number {
    return _i;
  }
}
