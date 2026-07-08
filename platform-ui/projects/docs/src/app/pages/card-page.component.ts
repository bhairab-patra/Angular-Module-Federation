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
      description="Surface for grouping related content. Supports stat/metric layout via the data input."
      [code]="code"
      [api]="api">

      <ng-container demo>
        <!-- Plain content card -->
        <pui-card style="width:220px">
          <div style="padding:16px">
            <p style="font-weight:600;margin-bottom:6px">Plain Card</p>
            <p style="color:#64748b;font-size:13px">Any content via ng-content.</p>
          </div>
        </pui-card>

        <!-- Stat card — up trend -->
        <pui-card [data]="revenueCard" style="width:220px"></pui-card>

        <!-- Stat card — down trend -->
        <pui-card [data]="usersCard" style="width:220px"></pui-card>

        <!-- Clickable card -->
        <pui-card [clickable]="true" style="width:220px">
          <div style="padding:16px">
            <p style="font-weight:600;margin-bottom:6px">Clickable Card</p>
            <p style="color:#64748b;font-size:13px">Hover to see lift effect.</p>
          </div>
        </pui-card>
      </ng-container>
    </docs-page>
  `,
})
export class CardPageComponent {
  revenueCard = { title: 'Revenue', value: '$48,200', trend: 'up'   as const, trendValue: '+12%', subtitle: 'vs last month' };
  usersCard   = { title: 'Churn',   value: '3.4%',    trend: 'down' as const, trendValue: '-0.8%', subtitle: 'vs last month' };

  code = `import { CardComponent } from '@solifi/platform-ui';

<!-- Plain card (slot content) -->
<pui-card>
  <div style="padding:16px">
    <h3>Title</h3>
    <p>Body text.</p>
  </div>
</pui-card>

<!-- Stat / metric card -->
<pui-card [data]="{
  label: 'Revenue',
  value: '$48,200',
  trend: 'up',
  trendValue: '+12%',
  sub: 'vs last month'
}"></pui-card>

<!-- Clickable (hover lift) -->
<pui-card [clickable]="true"> ... </pui-card>`;

  api: ApiRow[] = [
    { input: 'data',      type: 'CardData',  default: 'undefined', description: 'Render a stat metric layout automatically' },
    { input: 'elevated',  type: 'boolean',   default: 'true',      description: 'Drop-shadow' },
    { input: 'clickable', type: 'boolean',   default: 'false',     description: 'Hover lift animation' },
    { input: 'cardClass', type: 'string',    default: `''`,        description: 'Extra CSS class on the wrapper' },
  ];
}
