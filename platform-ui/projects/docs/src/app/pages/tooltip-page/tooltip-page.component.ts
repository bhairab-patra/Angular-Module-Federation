import { Component } from '@angular/core';
import { TooltipComponent, ButtonComponent, CardComponent, IconComponent, BadgeComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';

@Component({
  selector: 'docs-tooltip-page',
  standalone: true,
  imports: [DocPageComponent, TooltipComponent, ButtonComponent, CardComponent, IconComponent, BadgeComponent],
  templateUrl: './tooltip-page.component.html',
  styleUrls: ['./tooltip-page.component.scss'],
})
export class TooltipPageComponent {
  code = `import { TooltipComponent } from '@bhairab-patra/platform-ui';

// ── Basic usage — wrap any element ────────────
<pui-lib-tooltip text="Save changes" position="top">
  <pui-lib-button variant="primary">Save</pui-lib-button>
</pui-lib-tooltip>

// ── Positions: top | bottom | left | right ───
<pui-lib-tooltip text="Appears above"  position="top">    <span>Hover me</span></pui-lib-tooltip>
<pui-lib-tooltip text="Appears below"  position="bottom"> <span>Hover me</span></pui-lib-tooltip>
<pui-lib-tooltip text="Appears left"   position="left">   <span>Hover me</span></pui-lib-tooltip>
<pui-lib-tooltip text="Appears right"  position="right">  <span>Hover me</span></pui-lib-tooltip>

// ── Variants: dark | light | teal ────────────
<pui-lib-tooltip text="Dark style"  variant="dark"  position="top"><pui-lib-button>Dark</pui-lib-button></pui-lib-tooltip>
<pui-lib-tooltip text="Light style" variant="light" position="top"><pui-lib-button>Light</pui-lib-button></pui-lib-tooltip>
<pui-lib-tooltip text="Teal style"  variant="teal"  position="top"><pui-lib-button>Teal</pui-lib-button></pui-lib-tooltip>

// ── On icons ──────────────────────────────────
<pui-lib-tooltip text="Download report" position="right">
  <pui-lib-icon name="download" size="md"></pui-lib-icon>
</pui-lib-tooltip>

// ── On badges ────────────────────────────────
<pui-lib-tooltip text="3 pending approvals" position="top">
  <pui-lib-badge variant="warning">Pending</pui-lib-badge>
</pui-lib-tooltip>

// ── On disabled buttons ───────────────────────
<pui-lib-tooltip text="You don't have permission" position="top">
  <pui-lib-button variant="primary" [disabled]="true">Delete</pui-lib-button>
</pui-lib-tooltip>`;

  api: ApiRow[] = [
    { input: 'text',     type: 'string',                             default: `''`,     description: 'Text shown in the tooltip bubble' },
    { input: 'position', type: `'top' | 'bottom' | 'left' | 'right'`, default: `'top'`, description: 'Placement relative to the trigger element' },
    { input: 'variant',  type: `'dark' | 'light' | 'teal'`,         default: `'dark'`, description: 'Visual style — dark bg, white card, or teal brand' },
  ];
}
