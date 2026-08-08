import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { SpinnerComponent, SpinnerType, SpinnerSize, ButtonComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-spinner-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, SpinnerComponent, ButtonComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spinner-page.component.html',
  styleUrls: ['./spinner-page.component.scss'],
})
export class SpinnerPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  angularCode = `import { SpinnerComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [NgIf, SpinnerComponent],
  template: \`
    <!-- Inline -->
    <pui-lib-spinner type="dash" size="md" color="#12C6A8"></pui-lib-spinner>
    <pui-lib-spinner type="dots" size="md" color="#6366f1" label="Loading…"></pui-lib-spinner>

    <!-- Custom size -->
    <pui-lib-spinner type="dash" [sizePx]="48" color="#12C6A8"></pui-lib-spinner>

    <!-- Full-screen overlay -->
    <pui-lib-spinner *ngIf="isLoading"
      type="dash"
      size="xl"
      color="#12C6A8"
      [overlay]="true"
      overlayColor="#ffffff"
      [overlayOpacity]="0.75"
      [zIndex]="2000"
      label="Please wait…">
    </pui-lib-spinner>
  \`
})
export class MyComponent {
  isLoading = false;
  loadData() {
    this.isLoading = true;
    fetchData().then(() => this.isLoading = false);
  }
}`;

  reactCode = `import '@bhairab-patra/platform-ui';

function LoadingOverlay({ isLoading }) {
  if (!isLoading) return null;
  return (
    <pui-lib-spinner
      type="dash"
      size="xl"
      color="#12C6A8"
      overlay
      overlay-color="#ffffff"
      overlay-opacity="0.75"
      z-index="2000"
      label="Loading…">
    </pui-lib-spinner>
  );
}

function InlineSpinner() {
  return <pui-lib-spinner type="dots" size="md" color="#6366f1" label="Please wait"></pui-lib-spinner>;
}`;

  htmlCode = `<!-- Inline spinners -->
<pui-lib-spinner type="dash" size="md" color="#12C6A8"></pui-lib-spinner>
<pui-lib-spinner type="dots" size="lg" color="#6366f1" label="Loading…"></pui-lib-spinner>

<!-- Full-page overlay -->
<pui-lib-spinner
  id="page-spinner"
  type="dash"
  size="xl"
  color="#12C6A8"
  overlay
  overlay-color="#ffffff"
  overlay-opacity="0.75"
  z-index="2000"
  label="Please wait…"
  style="display:none">
</pui-lib-spinner>

<script>
  const spinner = document.getElementById('page-spinner');
  function showLoader()  { spinner.style.display = 'block'; }
  function hideLoader()  { spinner.style.display = 'none';  }
</script>`;

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
