import { Component } from '@angular/core';
import { IconComponent, IconSize, ICON_REGISTRY } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'docs-icon-page',
  standalone: true,
  imports: [DocPageComponent, IconComponent, NgFor, NgIf],
  template: `
    <docs-page
      title="Icon"
      description="SVG icon system — use any icon by name and size. Add custom icons from Figma by registering them via registerIcon()."
      [code]="code"
      [api]="api">

      <ng-container demo>

        <!-- ── Search ── -->
        <div class="icon-search-wrap">
          <svg class="icon-search-ico" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#9ca3af" stroke-width="2"/><path d="M21 21l-4.35-4.35" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"/></svg>
          <input
            class="icon-search"
            placeholder="Search icons…"
            [value]="query"
            (input)="query = $any($event.target).value">
          <button *ngIf="query" class="icon-search-clear" (click)="query=''">✕</button>
        </div>

        <!-- ── Size tabs ── -->
        <div class="size-tabs">
          <button *ngFor="let s of sizes"
                  class="size-tab"
                  [class.size-tab--active]="activeSize === s"
                  (click)="activeSize = s">
            {{ s }}
          </button>
        </div>

        <!-- ── Icon grid ── -->
        <div class="icon-grid">
          <ng-container *ngFor="let name of filteredIcons">
            <div class="icon-cell"
                 [class.icon-cell--copied]="copied === name"
                 (click)="copyUsage(name)"
                 title="Click to copy usage">
              <pui-icon [name]="name" [size]="activeSize"></pui-icon>
              <span class="icon-cell__name">{{ name }}</span>
              <span *ngIf="copied === name" class="icon-cell__badge">Copied!</span>
            </div>
          </ng-container>
          <div *ngIf="filteredIcons.length === 0" class="icon-empty">
            No icons match "{{ query }}"
          </div>
        </div>

        <!-- ── Size comparison table ── -->
        <div class="section-divider"><span class="section-tag">Size Comparison</span></div>
        <div class="size-table">
          <div class="size-table__head">
            <div class="size-table__cell size-table__label">Icon</div>
            <div class="size-table__cell" *ngFor="let s of sizes">
              <span class="size-badge">{{ s }}</span>
              <span class="size-px">{{ sizePx[s] }}px</span>
            </div>
          </div>
          <ng-container *ngFor="let name of previewIcons">
            <div class="size-table__row">
              <div class="size-table__cell size-table__label">{{ name }}</div>
              <div class="size-table__cell" *ngFor="let s of sizes">
                <pui-icon [name]="name" [size]="s"></pui-icon>
              </div>
            </div>
          </ng-container>
        </div>

        <!-- ── Color examples ── -->
        <div class="section-divider"><span class="section-tag">Colors</span></div>
        <div class="color-row">
          <div class="color-swatch" *ngFor="let c of colorExamples">
            <pui-icon name="check-circle" size="lg" [color]="c.hex"></pui-icon>
            <span class="color-swatch__label">{{ c.label }}</span>
            <span class="color-swatch__hex">{{ c.hex }}</span>
          </div>
        </div>

      </ng-container>
    </docs-page>
  `,
  styles: [`
    /* ── Search ── */
    .icon-search-wrap {
      position: relative; width: 100%; max-width: 380px; display: flex; align-items: center;
    }
    .icon-search-ico { position: absolute; left: 12px; pointer-events: none; }
    .icon-search {
      width: 100%; padding: 8px 36px 8px 38px;
      border: 1px solid #e5e7eb; border-radius: 999px;
      font-size: 13px; font-family: inherit; background: #f9fafb;
      outline: none;
    }
    .icon-search:focus { border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.15); background: #fff; }
    .icon-search-clear {
      position: absolute; right: 12px; background: none; border: none;
      color: #9ca3af; cursor: pointer; font-size: 12px;
    }

    /* ── Size tabs ── */
    .size-tabs { display: flex; gap: 6px; }
    .size-tab {
      padding: 5px 16px; border-radius: 999px; border: 1px solid #e5e7eb;
      font-size: 12px; font-weight: 600; font-family: inherit;
      background: #fff; color: #6b7280; cursor: pointer; text-transform: uppercase; letter-spacing: .05em;
    }
    .size-tab--active { background: #12C6A8; color: #fff; border-color: #12C6A8; }

    /* ── Icon grid ── */
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 8px; width: 100%;
    }
    .icon-cell {
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      padding: 16px 8px 12px;
      border: 1px solid #f3f4f6; border-radius: 10px;
      background: #fafafa; cursor: pointer; position: relative;
      transition: border-color .12s, background .12s;
    }
    .icon-cell:hover { border-color: #12C6A8; background: #f0fdf9; }
    .icon-cell--copied { border-color: #12C6A8; background: #e6faf7; }
    .icon-cell__name {
      font-size: 10px; color: #6b7280; text-align: center;
      word-break: break-all; line-height: 1.3;
    }
    .icon-cell__badge {
      position: absolute; top: 6px; right: 6px;
      font-size: 9px; font-weight: 700; background: #12C6A8; color: #fff;
      padding: 1px 6px; border-radius: 999px;
    }
    .icon-empty { grid-column: 1/-1; padding: 32px; text-align: center; color: #9ca3af; font-size: 13px; }

    /* ── Size table ── */
    .section-divider {
      display: flex; align-items: center; gap: 12px; width: 100%;
      border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 4px;
    }
    .section-tag {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .07em; color: #9ca3af; white-space: nowrap;
    }
    .size-table { width: 100%; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
    .size-table__head {
      display: flex; background: #f9fafb; border-bottom: 1px solid #e5e7eb; padding: 10px 0;
    }
    .size-table__row {
      display: flex; align-items: center; border-bottom: 1px solid #f3f4f6; padding: 12px 0;
    }
    .size-table__row:last-child { border-bottom: none; }
    .size-table__cell {
      flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
    }
    .size-table__label {
      flex: 1.5; align-items: flex-start; padding-left: 20px;
      font-size: 12px; color: #374151; font-weight: 500;
    }
    .size-badge {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .06em; color: #374151;
    }
    .size-px { font-size: 10px; color: #9ca3af; }

    /* ── Colors ── */
    .color-row { display: flex; gap: 20px; flex-wrap: wrap; }
    .color-swatch { display: flex; flex-direction: column; align-items: center; gap: 6px; }
    .color-swatch__label { font-size: 12px; font-weight: 600; color: #374151; }
    .color-swatch__hex   { font-size: 11px; color: #9ca3af; }
  `],
})
export class IconPageComponent {
  query      = '';
  activeSize: any = 'md';
  copied     = '';

  sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  sizePx: Record<IconSize, number> = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32 };

  allIcons = Object.keys(ICON_REGISTRY);

  previewIcons = ['arrow-right', 'check', 'search', 'user', 'bell', 'settings', 'trash', 'download'];

  colorExamples = [
    { label: 'Teal',        hex: '#12C6A8' },
    { label: 'Dark',        hex: '#0A0F1A' },
    { label: 'Gray',        hex: '#6b7280' },
    { label: 'Success',     hex: '#16a34a' },
    { label: 'Warning',     hex: '#d97706' },
    { label: 'Destructive', hex: '#dc2626' },
    { label: 'Blue',        hex: '#3b82f6' },
  ];

  get filteredIcons(): string[] {
    const q = this.query.trim().toLowerCase();
    return q ? this.allIcons.filter(n => n.includes(q)) : this.allIcons;
  }

  copyUsage(name: string): void {
    const text = `<pui-icon name="${name}" size="${this.activeSize}"></pui-icon>`;
    navigator.clipboard?.writeText(text);
    this.copied = name;
    setTimeout(() => this.copied = '', 1500);
  }

  code = `import { IconComponent, registerIcon } from '@solifi/platform-ui';

// ── Basic usage ───────────────────────────────
<pui-icon name="arrow-right" size="md"></pui-icon>
<pui-icon name="check" size="sm"></pui-icon>
<pui-icon name="user" size="lg"></pui-icon>

// ── With color ────────────────────────────────
<pui-icon name="check-circle" size="md" color="#12C6A8"></pui-icon>
<pui-icon name="warning"      size="md" color="#d97706"></pui-icon>
<pui-icon name="close-circle" size="md" color="#dc2626"></pui-icon>

// ── Sizes: xs=12 sm=16 md=20 lg=24 xl=32 ─────
<pui-icon name="bell" size="xs"></pui-icon>
<pui-icon name="bell" size="sm"></pui-icon>
<pui-icon name="bell" size="md"></pui-icon>
<pui-icon name="bell" size="lg"></pui-icon>
<pui-icon name="bell" size="xl"></pui-icon>

// ── Register your own Figma SVG ───────────────
import { registerIcon } from '@solifi/platform-ui';

registerIcon('my-logo', \`
  <svg viewBox="0 0 24 24" fill="none">
    <!-- paste your Figma SVG path here -->
    <path d="..." stroke="currentColor" stroke-width="2"/>
  </svg>
\`);

// Then use it like any built-in icon:
<pui-icon name="my-logo" size="lg"></pui-icon>`;

  api: ApiRow[] = [
    { input: 'name',  type: 'string',                              default: `''`,      description: 'Icon name from the registry (e.g. "arrow-right", "check")' },
    { input: 'size',  type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,  default: `'md'`,    description: 'xs=12px · sm=16px · md=20px · lg=24px · xl=32px' },
    { input: 'color', type: 'string (CSS color)',                  default: `'currentColor'`, description: 'Stroke/fill color — inherits from parent by default' },
  ];
}
