import { Component } from '@angular/core';
import { TooltipComponent, ButtonComponent, CardComponent, IconComponent, BadgeComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-tooltip-page',
  standalone: true,
  imports: [DocPageComponent, TooltipComponent, ButtonComponent, CardComponent, IconComponent, BadgeComponent],
  template: `
    <docs-page
      title="Tooltip"
      description="Contextual label shown on hover. Wrap any element with pui-tooltip and set text, position, and variant."
      [code]="code"
      [api]="api">

      <ng-container demo>

        <!-- ── Positions ── -->
        <div class="section-divider"><span class="section-tag">Positions</span></div>
        <div class="position-grid">
          <div class="position-cell">
            <pui-tooltip text="Tooltip on top" position="top">
              <pui-button variant="primary-outline">Top</pui-button>
            </pui-tooltip>
          </div>
          <div class="position-cell">
            <pui-tooltip text="Tooltip on bottom" position="bottom">
              <pui-button variant="primary-outline">Bottom</pui-button>
            </pui-tooltip>
          </div>
          <div class="position-cell">
            <pui-tooltip text="Tooltip on left" position="left">
              <pui-button variant="primary-outline">Left</pui-button>
            </pui-tooltip>
          </div>
          <div class="position-cell">
            <pui-tooltip text="Tooltip on right" position="right">
              <pui-button variant="primary-outline">Right</pui-button>
            </pui-tooltip>
          </div>
        </div>

        <!-- ── Variants ── -->
        <div class="section-divider"><span class="section-tag">Variants</span></div>
        <div class="variant-row">
          <div class="variant-cell">
            <pui-tooltip text="Dark tooltip" position="top" variant="dark">
              <pui-button variant="primary">Dark</pui-button>
            </pui-tooltip>
            <span class="variant-label">dark</span>
          </div>
          <div class="variant-cell">
            <pui-tooltip text="Light tooltip style" position="top" variant="light">
              <pui-button variant="secondary">Light</pui-button>
            </pui-tooltip>
            <span class="variant-label">light</span>
          </div>
          <div class="variant-cell">
            <pui-tooltip text="Teal brand tooltip" position="top" variant="teal">
              <pui-button variant="primary-light">Teal</pui-button>
            </pui-tooltip>
            <span class="variant-label">teal</span>
          </div>
        </div>

        <!-- ── On different triggers ── -->
        <div class="section-divider"><span class="section-tag">On Any Element</span></div>
        <div class="trigger-row">

          <!-- Icon trigger -->
          <pui-card variant="flat" size="sm" style="flex:1">
            <div class="trigger-inner">
              <span class="trigger-label">Icon</span>
              <pui-tooltip text="Download report" position="top">
                <div class="icon-trigger">
                  <pui-icon name="download" size="md" color="#0d6e5f"></pui-icon>
                </div>
              </pui-tooltip>
            </div>
          </pui-card>

          <!-- Badge trigger -->
          <pui-card variant="flat" size="sm" style="flex:1">
            <div class="trigger-inner">
              <span class="trigger-label">Badge</span>
              <pui-tooltip text="3 pending approvals" position="top">
                <pui-badge variant="warning">Pending</pui-badge>
              </pui-tooltip>
            </div>
          </pui-card>

          <!-- Text trigger -->
          <pui-card variant="flat" size="sm" style="flex:1">
            <div class="trigger-inner">
              <span class="trigger-label">Text</span>
              <pui-tooltip text="john.doe@example.com" position="top">
                <span class="dotted-text">Hover for email</span>
              </pui-tooltip>
            </div>
          </pui-card>

          <!-- Disabled button -->
          <pui-card variant="flat" size="sm" style="flex:1">
            <div class="trigger-inner">
              <span class="trigger-label">Disabled button</span>
              <pui-tooltip text="You don't have permission" position="top">
                <pui-button variant="primary" [disabled]="true">Delete</pui-button>
              </pui-tooltip>
            </div>
          </pui-card>

        </div>

        <!-- ── All positions showcase ── -->
        <div class="section-divider"><span class="section-tag">Position Showcase</span></div>
        <pui-card variant="flat" [fullWidth]="true">
          <div class="showcase">
            <pui-tooltip text="Top: appears above" position="top" variant="dark">
              <div class="showcase-dot showcase-dot--top">Top</div>
            </pui-tooltip>
            <div class="showcase-middle-row">
              <pui-tooltip text="Left: appears to the left" position="left" variant="teal">
                <div class="showcase-dot showcase-dot--left">Left</div>
              </pui-tooltip>
              <div class="showcase-center">
                <pui-icon name="info" size="xl" color="#12C6A8"></pui-icon>
                <span class="showcase-hint">Hover the labels</span>
              </div>
              <pui-tooltip text="Right: appears to the right" position="right" variant="teal">
                <div class="showcase-dot showcase-dot--right">Right</div>
              </pui-tooltip>
            </div>
            <pui-tooltip text="Bottom: appears below" position="bottom" variant="dark">
              <div class="showcase-dot showcase-dot--bottom">Bottom</div>
            </pui-tooltip>
          </div>
        </pui-card>

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

    /* Positions */
    .position-grid {
      display: grid; grid-template-columns: repeat(4, auto);
      gap: 24px; justify-content: start; padding: 24px 0 8px;
    }
    .position-cell { display: flex; align-items: center; justify-content: center; padding: 16px 0; }

    /* Variants */
    .variant-row { display: flex; gap: 32px; padding: 24px 0 8px; }
    .variant-cell { display: flex; flex-direction: column; align-items: center; gap: 32px; }
    .variant-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; }

    /* Trigger row */
    .trigger-row { display: flex; gap: 12px; width: 100%; }
    .trigger-inner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .trigger-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #9ca3af; }
    .icon-trigger {
      width: 40px; height: 40px; border-radius: 10px; background: #e6faf7;
      display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .dotted-text {
      font-size: 13px; color: #374151; border-bottom: 1px dashed #9ca3af;
      cursor: default; padding-bottom: 1px;
    }

    /* Showcase */
    .showcase {
      display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 16px 0;
    }
    .showcase-middle-row {
      display: flex; align-items: center; gap: 48px; width: 100%; justify-content: center;
    }
    .showcase-center {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
    }
    .showcase-hint { font-size: 11px; color: #9ca3af; }
    .showcase-dot {
      padding: 8px 20px; border-radius: 999px; font-size: 12px; font-weight: 700;
      cursor: default; border: 1px solid #e5e7eb; background: #f9fafb; color: #374151;
    }
  `],
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
