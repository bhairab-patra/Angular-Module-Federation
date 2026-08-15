import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { CardComponent, BadgeComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-card-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, CardComponent, BadgeComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  angularCode = `import { CardComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [CardComponent],
  template: \`
    <!-- Slot projection -->
    <pui-lib-card variant="default">
      <div card-header>Header</div>
      Body content here.
      <div card-footer>Footer</div>
    </pui-lib-card>

    <!-- Stat / metric card -->
    <pui-lib-card [data]="metric"></pui-lib-card>

    <!-- Clickable -->
    <pui-lib-card [clickable]="true" (cardClick)="onCardClick($event)">
      Click me â€” hover for lift effect.
    </pui-lib-card>
  \`
})
export class MyComponent {
  metric = { title: 'Revenue', value: '$48,200', trend: 'up', trendValue: '+12%', subtitle: 'vs last month' };
  onCardClick(e: MouseEvent) { /* ... */ }
}`;

  reactCode = `import { useRef, useEffect } from 'react';
import '@bhairab-patra/platform-ui';

function MetricCard() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.data = {
        title: 'Revenue', value: '$48,200',
        trend: 'up', trendValue: '+12%', subtitle: 'vs last month'
      };
    }
  }, []);

  return <pui-lib-card ref={ref} variant="default" />;
}

function SimpleCard() {
  return (
    <pui-lib-card
      variant="outlined"
      size="sm"
      clickable
      onCardclick={() => console.log('clicked')}>
      Card body content
    </pui-lib-card>
  );
}`;

  htmlCode = `<pui-lib-card variant="outlined" id="my-card">Content</pui-lib-card>
<pui-lib-card variant="teal" accent clickable>Accent + clickable</pui-lib-card>
<pui-lib-card full-width variant="flat">Full width card</pui-lib-card>

<script>
  document.getElementById('my-card').data = {
    title: 'Revenue', value: '$48,200', trend: 'up', trendValue: '+12%', subtitle: 'vs last month'
  };
</script>`;

  revenueCard = { title: 'Revenue',     value: '$48,200', trend: 'up'      as const, trendValue: '+12%',  subtitle: 'vs last month' };
  usersCard   = { title: 'Active Users', value: '4,821',  trend: 'down'    as const, trendValue: '-2.1%', subtitle: 'vs last month' };
  ordersCard  = { title: 'Orders',       value: '1,204',  trend: 'neutral' as const, trendValue: '0%',    subtitle: 'vs last month' };

  xfwRows = [
    { name: 'variant',   angular: 'variant="teal"',          attr: 'variant="teal"',   js: 'el.variant = "teal"'    },
    { name: 'size',      angular: 'size="sm"',               attr: 'size="sm"',         js: 'el.size = "sm"'         },
    { name: 'data',      angular: '[data]="metric"',         attr: 'â€”',                 js: 'el.data = {...}'        },
    { name: 'clickable', angular: '[clickable]="true"',      attr: 'clickable',         js: 'el.clickable = true'    },
    { name: 'accent',    angular: '[accent]="true"',         attr: 'accent',            js: 'el.accent = true'       },
    { name: 'fullWidth', angular: '[fullWidth]="true"',      attr: 'full-width',        js: 'el.fullWidth = true'    },
    { name: 'cardClick', angular: '(cardClick)="fn($event)"', attr: 'â€”',               js: 'el.addEventListener(â€¦)' },
  ];

  api: ApiRow[] = [
    { input: 'data',       type: 'CardData',                                          default: 'undefined', description: 'Renders stat/metric layout automatically (title, value, trend, trendValue, subtitle).' },
    { input: 'variant',    type: `'default'|'outlined'|'flat'|'teal'|'dark'`,         default: `'default'`, description: 'Visual style.' },
    { input: 'size',       type: `'sm'|'md'|'lg'`,                                    default: `'md'`,      description: 'Internal padding â€” sm 16px, md 24px, lg 32px.' },
    { input: 'elevated',   type: 'boolean',                                            default: 'true',      description: 'Drop-shadow.' },
    { input: 'clickable',  type: 'boolean',                                            default: 'false',     description: 'Hover lift + pointer cursor.' },
    { input: 'fullWidth',  type: 'boolean',                                            default: 'false',     description: 'Stretch to 100% container width.' },
    { input: 'accent',     type: 'boolean',                                            default: 'false',     description: 'Teal gradient top-border accent strip.' },
    { input: 'cardClass',  type: 'string',                                             default: `''`,        description: 'Extra CSS class on the wrapper element.' },
    { input: '(cardClick)', type: 'EventEmitter<MouseEvent>',                          default: 'â€”',         description: 'Emitted on click when clickable=true.' },
  ];
  trackByIndex(_i: number): number { return _i; }
}
