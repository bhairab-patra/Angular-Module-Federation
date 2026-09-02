import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SpinnerComponent, SpinnerType, SpinnerSize, ButtonComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-spinner-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, SpinnerComponent, ButtonComponent, FrameworkPreviewComponent],
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
    <!-- Inline — colour defaults to the theme brand accent -->
    <pui-lib-spinner type="dash" size="md"></pui-lib-spinner>
    <pui-lib-spinner type="dots" size="md" label="Loading…"></pui-lib-spinner>

    <!-- Custom size -->
    <pui-lib-spinner type="dash" [sizePx]="48"></pui-lib-spinner>

    <!-- Full-screen overlay — overlayColor defaults to var(--pui-overlay-black-45),
         the same scrim token pui-lib-modal uses, so it matches automatically -->
    <pui-lib-spinner *ngIf="isLoading"
      type="dash"
      size="xl"
      [overlay]="true"
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
      overlay
      z-index="2000"
      label="Loading…">
    </pui-lib-spinner>
  );
}

function InlineSpinner() {
  return <pui-lib-spinner type="dots" size="md" label="Please wait"></pui-lib-spinner>;
}`;

  htmlCode = `<!-- Inline spinners — colour defaults to the theme brand accent -->
<pui-lib-spinner type="dash" size="md"></pui-lib-spinner>
<pui-lib-spinner type="dots" size="lg" label="Loading…"></pui-lib-spinner>

<!-- Full-page overlay — overlayColor defaults to var(--pui-overlay-black-45),
     the same scrim token pui-lib-modal uses, so it matches automatically -->
<pui-lib-spinner
  id="page-spinner"
  type="dash"
  size="xl"
  overlay
  z-index="2000"
  label="Please wait…"
  style="display:none">
</pui-lib-spinner>

<script>
  const spinner = document.getElementById('page-spinner');
  function showLoader()  { spinner.style.display = 'block'; }
  function hideLoader()  { spinner.style.display = 'none';  }
</script>`;

  overlayActive = false;
  activeType: SpinnerType = 'dash';
  activeColor = '#12C6A8';
  activeBg = 'var(--pui-overlay-black-45)';
  activeOpacity = 1;

  sizes: { size: SpinnerSize; px: number }[] = [
    { size: 'sm', px: 24 },
    { size: 'md', px: 40 },
    { size: 'lg', px: 56 },
    { size: 'xl', px: 80 },
  ];

  /** overlayColor defaults to var(--pui-overlay-black-45) — the exact same
   * scrim token pui-lib-modal / pui-lib-form-dialog use for their backdrop,
   * so a loading overlay reads as part of the same design language instead
   * of a plain white wash. */
  overlayDemos = [
    { type: 'dash' as SpinnerType, color: '#12C6A8', bg: 'var(--pui-overlay-black-45)', opacity: 1, label: 'dash · default (matches modal backdrop)' },
    { type: 'dots' as SpinnerType, color: '#12C6A8', bg: 'var(--pui-overlay-black-45)', opacity: 1, label: 'dots · default (matches modal backdrop)' },
  ];

  showOverlay(type: SpinnerType, color: string, bg: string, opacity: number): void {
    this.activeType = type;
    this.activeColor = color;
    this.activeBg = bg;
    this.activeOpacity = opacity;
    this.overlayActive = true;
    this.cdr.markForCheck();
    setTimeout(() => { this.overlayActive = false; this.cdr.markForCheck(); }, 2500);
  }

  xfwRows = [
    { name: 'type', angular: 'type="dots"', attr: 'type="dots"', js: 'el.type = "dots"' },
    { name: 'size', angular: 'size="lg"', attr: 'size="lg"', js: 'el.size = "lg"' },
    { name: 'sizePx', angular: '[sizePx]="48"', attr: '—', js: 'el.sizePx = 48' },
    { name: 'color', angular: 'color="#12C6A8"', attr: 'color="#12C6A8"', js: 'el.color = "#12C6A8"' },
    { name: 'speed', angular: '[speed]="400"', attr: 'speed="400"', js: 'el.speed = 400' },
    { name: 'overlay', angular: '[overlay]="true"', attr: 'overlay', js: 'el.overlay = true' },
    { name: 'overlayColor', angular: 'overlayColor="#fff"', attr: 'overlay-color="#fff"', js: 'el.overlayColor = "#fff"' },
    { name: 'overlayOpacity', angular: '[overlayOpacity]="0.75"', attr: 'overlay-opacity="0.75"', js: 'el.overlayOpacity = 0.75' },
    { name: 'label', angular: 'label="Loading…"', attr: 'label="Loading…"', js: 'el.label = "Loading…"' },
  ];

  api: ApiRow[] = [
    { input: 'type', type: `'dash'|'dots'`, default: `'dash'`, description: 'dash = radiating lines Â· dots = orbiting dot ring.' },
    { input: 'size', type: `'sm'|'md'|'lg'|'xl'`, default: `'md'`, description: 'Size preset — sm 24px Â· md 40px Â· lg 56px Â· xl 80px.' },
    { input: 'sizePx', type: 'number', default: 'null', description: 'Exact pixel size — overrides the size preset.' },
    { input: 'color', type: 'string', default: `'var(--pui-form-accent, var(--pui-brand))'`, description: 'Spinner colour (any CSS colour value) — defaults to the theme brand accent, so it follows the New/Old theme toggle.' },
    { input: 'speed', type: 'number', default: '800', description: 'Full-rotation duration in milliseconds.' },
    { input: 'overlay', type: 'boolean', default: 'false', description: 'Render a fixed full-screen backdrop.' },
    { input: 'overlayColor', type: 'string', default: `'var(--pui-overlay-black-45)'`, description: 'Overlay background colour — defaults to the same scrim token pui-lib-modal / pui-lib-form-dialog use, so it matches their backdrop.' },
    { input: 'overlayOpacity', type: 'number', default: '1', description: 'Overlay opacity — 0 (clear) to 1 (solid).' },
    { input: 'zIndex', type: 'number', default: '1000', description: 'z-index of overlay; spinner renders at zIndex + 1.' },
    { input: 'label', type: 'string', default: `''`, description: 'Optional text displayed below the spinner.' },
    { input: 'labelColor', type: 'string', default: `'#6b7280'`, description: 'Label text colour.' },
  ];
  trackByIndex(_i: number): number { return _i; }
}
