import { Component } from '@angular/core';
import { CardComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-card-page',
  standalone: true,
  imports: [DocPageComponent, CardComponent],
  template: `
    <docs-page
      title="Card"
      description="Flexible surface component — supports stat/metric layouts, slot projection (header · body · footer), 5 variants, 3 sizes, full-width, accent strip, clickable lift, and a cardClick event."
      [code]="code"
      [api]="api">

      <ng-container demo>

        <!-- ── Empty full-width card ── -->
        <div class="section-divider"><span class="section-tag">Empty Card — Full Width</span></div>
        <pui-card [fullWidth]="true" variant="outlined">
          <div style="min-height:80px;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:13px;">
            Empty card — project any content here via ng-content
          </div>
        </pui-card>

        <!-- ── Lorem ipsum cards ── -->
        <div class="section-divider"><span class="section-tag">Content Cards</span></div>
        <div class="card-row">
          <pui-card variant="default" style="flex:1;min-width:0">
            <div card-header class="card-custom-header">
              <span class="card-avatar">JD</span>
              <div>
                <div class="card-author">John Doe</div>
                <div class="card-meta">Product Designer · 2 min ago</div>
              </div>
            </div>
            <p class="card-body-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
            <div card-footer class="card-tags">
              <span class="card-tag">Design</span>
              <span class="card-tag">UI</span>
              <span class="card-tag">Research</span>
            </div>
          </pui-card>

          <pui-card variant="teal" [accent]="true" style="flex:1;min-width:0">
            <div card-header class="card-custom-header">
              <span class="card-avatar card-avatar--teal">AK</span>
              <div>
                <div class="card-author">Alice Kim</div>
                <div class="card-meta">Engineering Lead · 5 min ago</div>
              </div>
            </div>
            <p class="card-body-text">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
            </p>
            <div card-footer class="card-tags">
              <span class="card-tag card-tag--teal">Angular</span>
              <span class="card-tag card-tag--teal">TypeScript</span>
            </div>
          </pui-card>
        </div>

        <!-- ── Stat / metric cards ── -->
        <div class="section-divider"><span class="section-tag">Stat / Metric Cards</span></div>
        <div class="card-row">
          <pui-card [data]="revenueCard" style="flex:1;min-width:0"></pui-card>
          <pui-card [data]="usersCard"   style="flex:1;min-width:0"></pui-card>
          <pui-card [data]="ordersCard"  style="flex:1;min-width:0"></pui-card>
        </div>

        <!-- ── Variants ── -->
        <div class="section-divider"><span class="section-tag">Variants</span></div>
        <div class="card-row card-row--wrap">
          <pui-card variant="default"  style="width:180px">
            <p class="variant-label">Default</p>
            <p class="variant-desc">White + shadow</p>
          </pui-card>
          <pui-card variant="outlined" style="width:180px">
            <p class="variant-label">Outlined</p>
            <p class="variant-desc">Border only</p>
          </pui-card>
          <pui-card variant="flat" style="width:180px">
            <p class="variant-label">Flat</p>
            <p class="variant-desc">Gray bg, no border</p>
          </pui-card>
          <pui-card variant="teal" style="width:180px">
            <p class="variant-label">Teal</p>
            <p class="variant-desc">Mint gradient</p>
          </pui-card>
          <pui-card variant="dark" style="width:180px">
            <p class="variant-label" style="color:#f1f5f9">Dark</p>
            <p class="variant-desc" style="color:#64748b">Dark surface</p>
          </pui-card>
        </div>

        <!-- ── Sizes ── -->
        <div class="section-divider"><span class="section-tag">Sizes</span></div>
        <div class="card-row card-row--wrap">
          <pui-card size="sm" variant="outlined" style="width:180px">
            <p class="variant-label">Small</p>
            <p class="variant-desc">padding: 16px</p>
          </pui-card>
          <pui-card size="md" variant="outlined" style="width:180px">
            <p class="variant-label">Medium</p>
            <p class="variant-desc">padding: 24px</p>
          </pui-card>
          <pui-card size="lg" variant="outlined" style="width:180px">
            <p class="variant-label">Large</p>
            <p class="variant-desc">padding: 32px</p>
          </pui-card>
        </div>

        <!-- ── Balance card layouts ── -->
        <div class="section-divider"><span class="section-tag">Balance Card — Layout Variants</span></div>

        <!-- Row 1: horizontal inline -->
        <div class="card-row">
          <!-- Layout A: label + value inline, icon right -->
          <pui-card variant="flat" size="sm" [clickable]="true" cardClass="bal-card" style="flex:1;min-width:0">
            <div class="bal-row">
              <div class="bal-info">
                <div class="bal-label">Outstanding Balance</div>
                <div class="bal-value-inline">$519.00 <span class="bal-sub">paid on 06/10/2022</span></div>
              </div>
              <div class="bal-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17V9a2 2 0 012-2h8M7 17h10M12 7v10" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </pui-card>

          <!-- Layout B: bold value, subtitle below, icon right -->
          <pui-card variant="flat" size="sm" [clickable]="true" cardClass="bal-card" style="flex:1;min-width:0">
            <div class="bal-row">
              <div class="bal-info">
                <div class="bal-label">Outstanding Balance</div>
                <div class="bal-value">$519.00</div>
                <div class="bal-sub">paid on 06/10/2022</div>
              </div>
              <div class="bal-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3 10h18M7 15h1m4 0h1M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </pui-card>

          <!-- Layout C: info top, icon bottom-center, value prominent -->
          <pui-card variant="flat" size="sm" [clickable]="true" cardClass="bal-card" style="flex:1;min-width:0">
            <div class="bal-col">
              <div class="bal-label">Outstanding Balance</div>
              <div class="bal-sub">paid on 06/10/2022</div>
              <div class="bal-value">$519.00</div>
              <div class="bal-icon bal-icon--lg">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4M12 3a9 9 0 100 18A9 9 0 0012 3z" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </pui-card>

          <!-- Layout D: icon top, title + subtitle below -->
          <pui-card variant="flat" size="sm" [clickable]="true" cardClass="bal-card" style="flex:1;min-width:0">
            <div class="bal-col bal-col--icon-top">
              <div class="bal-icon bal-icon--lg">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="bal-label" style="margin-top:10px">Outstanding Balance</div>
              <div class="bal-sub">paid on 06/10/2022</div>
            </div>
          </pui-card>
        </div>

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

    .card-row {
      display: flex; gap: 16px; width: 100%; align-items: flex-start;
    }
    .card-row--wrap { flex-wrap: wrap; }

    /* Content card internals */
    .card-custom-header {
      display: flex; align-items: center; gap: 12px;
      padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid #e2e8f0;
    }
    .card-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: #e2e8f0; color: #374151;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; flex-shrink: 0;
    }
    .card-avatar--teal { background: #d7f5ee; color: #0d6e5f; }
    .card-author { font-size: 13px; font-weight: 600; color: #111827; }
    .card-meta   { font-size: 11px; color: #9ca3af; margin-top: 2px; }
    .card-body-text { font-size: 13px; color: #374151; line-height: 1.65; margin: 0 0 14px; }
    .card-tags { display: flex; gap: 6px; flex-wrap: wrap;
                 padding-top: 14px; border-top: 1px solid #e2e8f0; }
    .card-tag {
      font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px;
      background: #f1f5f9; color: #374151;
    }
    .card-tag--teal { background: rgba(18,198,168,.12); color: #0a7a65; }

    /* Variant/size labels */
    .variant-label { font-size: 13px; font-weight: 600; color: #111827; margin: 0 0 4px; }
    .variant-desc  { font-size: 12px; color: #6b7280; margin: 0; }
    .variant-desc code { background:#f1f5f9; padding:1px 5px; border-radius:4px; font-size:11px; }

    /* Balance card host override — gray bg, no border */
    :host ::ng-deep .bal-card {
      background: #eef0f4 !important;
      border-color: transparent !important;
      box-shadow: none !important;
    }
    :host ::ng-deep .bal-card:hover {
      background: #eef0f4 !important;
      transform: none !important;
      box-shadow: none !important;
    }

    /* Balance card layouts */
    .bal-row {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
    }
    .bal-col {
      display: flex; flex-direction: column; gap: 4px; align-items: flex-start;
    }
    .bal-col--icon-top { align-items: flex-start; }

    .bal-info { display: flex; flex-direction: column; gap: 3px; }
    .bal-label { font-size: 13px; font-weight: 700; color: #111827; }
    .bal-value { font-size: 20px; font-weight: 700; color: #0A0F1A; margin: 2px 0; }
    .bal-value-inline {
      font-size: 17px; font-weight: 700; color: #0A0F1A;
      display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;
    }
    .bal-sub { font-size: 11px; color: #9ca3af; }

    .bal-icon {
      width: 44px; height: 44px; border-radius: 12px;
      background: #0d6e5f; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .bal-icon svg, .bal-icon--lg svg { display: block; }
    .bal-icon--lg {
      width: 52px; height: 52px; border-radius: 14px;
      background: #0d6e5f; display: flex; align-items: center; justify-content: center;
      margin-top: 6px;
    }
  `],
})
export class CardPageComponent {
  clicked = false;

  revenueCard = { title: 'Revenue',     value: '$48,200', trend: 'up'      as const, trendValue: '+12%',  subtitle: 'vs last month' };
  usersCard   = { title: 'Active Users', value: '4,821',  trend: 'down'    as const, trendValue: '-2.1%', subtitle: 'vs last month' };
  ordersCard  = { title: 'Orders',       value: '1,204',  trend: 'neutral' as const, trendValue: '0%',    subtitle: 'vs last month' };

  onCardClick(): void {
    this.clicked = true;
    setTimeout(() => this.clicked = false, 1500);
  }

  code = `import { CardComponent } from '@solifi/platform-ui';

// ── Empty / slot card ──────────────────────────────
<pui-card>
  <p>Any content via ng-content.</p>
</pui-card>

// ── Full-width card ────────────────────────────────
<pui-card [fullWidth]="true" variant="outlined">
  <p>Stretches to 100% container width.</p>
</pui-card>

// ── Header · Body · Footer slots ──────────────────
<pui-card>
  <div card-header>Header content</div>
  Body content goes here — no attribute needed.
  <div card-footer>Footer content</div>
</pui-card>

// ── Stat / metric card ─────────────────────────────
<pui-card [data]="{
  title: 'Revenue',
  value: '$48,200',
  trend: 'up',
  trendValue: '+12%',
  subtitle: 'vs last month'
}"></pui-card>

// ── Variants ──────────────────────────────────────
<pui-card variant="default">...</pui-card>
<pui-card variant="outlined">...</pui-card>
<pui-card variant="flat">...</pui-card>
<pui-card variant="teal">...</pui-card>
<pui-card variant="dark">...</pui-card>

// ── Sizes ─────────────────────────────────────────
<pui-card size="sm">...</pui-card>   <!-- padding 16px -->
<pui-card size="md">...</pui-card>   <!-- padding 24px (default) -->
<pui-card size="lg">...</pui-card>   <!-- padding 32px -->

// ── Accent strip ──────────────────────────────────
<pui-card [accent]="true">...</pui-card>

// ── Clickable with event ───────────────────────────
<pui-card [clickable]="true" (cardClick)="onCardClick($event)">
  Click me — hover for lift effect.
</pui-card>`;

  api: ApiRow[] = [
    { input: 'data',       type: 'CardData',                                                          default: 'undefined', description: 'Renders stat/metric layout automatically' },
    { input: 'variant',    type: `'default' | 'outlined' | 'flat' | 'teal' | 'dark'`,                default: `'default'`,  description: 'Visual style' },
    { input: 'size',       type: `'sm' | 'md' | 'lg'`,                                               default: `'md'`,       description: 'Internal padding size' },
    { input: 'elevated',   type: 'boolean',                                                           default: 'true',       description: 'Drop-shadow' },
    { input: 'clickable',  type: 'boolean',                                                           default: 'false',      description: 'Hover lift + pointer cursor' },
    { input: 'fullWidth',  type: 'boolean',                                                           default: 'false',      description: 'Stretch to 100% container width' },
    { input: 'accent',     type: 'boolean',                                                           default: 'false',      description: 'Teal gradient top-border accent strip' },
    { input: 'cardClass',  type: 'string',                                                            default: `''`,         description: 'Extra CSS class on the wrapper element' },
    { input: '(cardClick)', type: 'EventEmitter<MouseEvent>',                                         default: '—',          description: 'Emitted on click when clickable=true' },
  ];
}
