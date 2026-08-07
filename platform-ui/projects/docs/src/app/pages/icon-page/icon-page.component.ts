import { Component } from '@angular/core';
import { IconComponent, IconSize, ICON_REGISTRY } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'docs-icon-page',
  standalone: true,
  imports: [DocPageComponent, IconComponent, NgFor, NgIf],
  templateUrl: './icon-page.component.html',
  styleUrls: ['./icon-page.component.scss'],
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
    const text = `<pui-lib-icon name="${name}" size="${this.activeSize}"></pui-lib-icon>`;
    navigator.clipboard?.writeText(text);
    this.copied = name;
    setTimeout(() => this.copied = '', 1500);
  }

  code = `import { IconComponent, registerIcon } from '@bhairab-patra/platform-ui';

// ── Basic usage ───────────────────────────────
<pui-lib-icon name="arrow-right" size="md"></pui-lib-icon>
<pui-lib-icon name="check" size="sm"></pui-lib-icon>
<pui-lib-icon name="user" size="lg"></pui-lib-icon>

// ── With color ────────────────────────────────
<pui-lib-icon name="check-circle" size="md" color="#12C6A8"></pui-lib-icon>
<pui-lib-icon name="warning"      size="md" color="#d97706"></pui-lib-icon>
<pui-lib-icon name="close-circle" size="md" color="#dc2626"></pui-lib-icon>

// ── Sizes: xs=12 sm=16 md=20 lg=24 xl=32 ─────
<pui-lib-icon name="bell" size="xs"></pui-lib-icon>
<pui-lib-icon name="bell" size="sm"></pui-lib-icon>
<pui-lib-icon name="bell" size="md"></pui-lib-icon>
<pui-lib-icon name="bell" size="lg"></pui-lib-icon>
<pui-lib-icon name="bell" size="xl"></pui-lib-icon>

// ── Register your own Figma SVG ───────────────
import { registerIcon } from '@bhairab-patra/platform-ui';

registerIcon('my-logo', \`
  <svg viewBox="0 0 24 24" fill="none">
    <!-- paste your Figma SVG path here -->
    <path d="..." stroke="currentColor" stroke-width="2"/>
  </svg>
\`);

// Then use it like any built-in icon:
<pui-lib-icon name="my-logo" size="lg"></pui-lib-icon>`;

  api: ApiRow[] = [
    { input: 'name',  type: 'string',                              default: `''`,      description: 'Icon name from the registry (e.g. "arrow-right", "check")' },
    { input: 'size',  type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,  default: `'md'`,    description: 'xs=12px · sm=16px · md=20px · lg=24px · xl=32px' },
    { input: 'color', type: 'string (CSS color)',                  default: `'currentColor'`, description: 'Stroke/fill color — inherits from parent by default' },
  ];
}
