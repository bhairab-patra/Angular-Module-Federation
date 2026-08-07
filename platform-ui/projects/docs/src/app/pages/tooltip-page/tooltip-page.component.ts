import { Component } from '@angular/core';
import { TooltipComponent, ButtonComponent, CardComponent, IconComponent, BadgeComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';

@Component({
  selector: 'docs-tooltip-page',
  standalone: true,
  imports: [DocPageComponent, TooltipComponent, ButtonComponent, CardComponent, IconComponent, BadgeComponent],
  templateUrl: './tooltip-page.component.html',
  styleUrls: ['./tooltip-page.component.scss'],
})
export class TooltipPageComponent {
  code = `import { TooltipComponent } from '@solifi/platform-ui';

// ── Basic usage — wrap any element ────────────
<pui-tooltip text="Save changes" position="top">
  <pui-button variant="primary">Save</pui-button>
</pui-tooltip>

// ── Positions: top | bottom | left | right ───
<pui-tooltip text="Appears above"  position="top">    <span>Hover me</span></pui-tooltip>
<pui-tooltip text="Appears below"  position="bottom"> <span>Hover me</span></pui-tooltip>
<pui-tooltip text="Appears left"   position="left">   <span>Hover me</span></pui-tooltip>
<pui-tooltip text="Appears right"  position="right">  <span>Hover me</span></pui-tooltip>

// ── Variants: dark | light | teal ────────────
<pui-tooltip text="Dark style"  variant="dark"  position="top"><pui-button>Dark</pui-button></pui-tooltip>
<pui-tooltip text="Light style" variant="light" position="top"><pui-button>Light</pui-button></pui-tooltip>
<pui-tooltip text="Teal style"  variant="teal"  position="top"><pui-button>Teal</pui-button></pui-tooltip>

// ── On icons ──────────────────────────────────
<pui-tooltip text="Download report" position="right">
  <pui-icon name="download" size="md"></pui-icon>
</pui-tooltip>

// ── On badges ────────────────────────────────
<pui-tooltip text="3 pending approvals" position="top">
  <pui-badge variant="warning">Pending</pui-badge>
</pui-tooltip>

// ── On disabled buttons ───────────────────────
<pui-tooltip text="You don't have permission" position="top">
  <pui-button variant="primary" [disabled]="true">Delete</pui-button>
</pui-tooltip>`;

  api: ApiRow[] = [
    { input: 'text',     type: 'string',                             default: `''`,     description: 'Text shown in the tooltip bubble' },
    { input: 'position', type: `'top' | 'bottom' | 'left' | 'right'`, default: `'top'`, description: 'Placement relative to the trigger element' },
    { input: 'variant',  type: `'dark' | 'light' | 'teal'`,         default: `'dark'`, description: 'Visual style — dark bg, white card, or teal brand' },
  ];
}
