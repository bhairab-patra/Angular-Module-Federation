import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';

@Component({
  selector: 'docs-card-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  revenueCard = { title: 'Revenue',     value: '$48,200', trend: 'up'      as const, trendValue: '+12%',  subtitle: 'vs last month' };
  usersCard   = { title: 'Active Users', value: '4,821',  trend: 'down'    as const, trendValue: '-2.1%', subtitle: 'vs last month' };
  ordersCard  = { title: 'Orders',       value: '1,204',  trend: 'neutral' as const, trendValue: '0%',    subtitle: 'vs last month' };

  xfwRows = [
    { name: 'variant',   angular: 'variant="teal"',          attr: 'variant="teal"',   js: 'el.variant = "teal"'    },
    { name: 'size',      angular: 'size="sm"',               attr: 'size="sm"',         js: 'el.size = "sm"'         },
    { name: 'data',      angular: '[data]="metric"',         attr: '—',                 js: 'el.data = {...}'        },
    { name: 'clickable', angular: '[clickable]="true"',      attr: 'clickable',         js: 'el.clickable = true'    },
    { name: 'accent',    angular: '[accent]="true"',         attr: 'accent',            js: 'el.accent = true'       },
    { name: 'fullWidth', angular: '[fullWidth]="true"',      attr: 'full-width',        js: 'el.fullWidth = true'    },
    { name: 'cardClick', angular: '(cardClick)="fn($event)"', attr: '—',               js: 'el.addEventListener(…)' },
  ];

  api: ApiRow[] = [
    { input: 'data',       type: 'CardData',                                          default: 'undefined', description: 'Renders stat/metric layout automatically (title, value, trend, trendValue, subtitle).' },
    { input: 'variant',    type: `'default'|'outlined'|'flat'|'teal'|'dark'`,         default: `'default'`, description: 'Visual style.' },
    { input: 'size',       type: `'sm'|'md'|'lg'`,                                    default: `'md'`,      description: 'Internal padding — sm 16px, md 24px, lg 32px.' },
    { input: 'elevated',   type: 'boolean',                                            default: 'true',      description: 'Drop-shadow.' },
    { input: 'clickable',  type: 'boolean',                                            default: 'false',     description: 'Hover lift + pointer cursor.' },
    { input: 'fullWidth',  type: 'boolean',                                            default: 'false',     description: 'Stretch to 100% container width.' },
    { input: 'accent',     type: 'boolean',                                            default: 'false',     description: 'Teal gradient top-border accent strip.' },
    { input: 'cardClass',  type: 'string',                                             default: `''`,        description: 'Extra CSS class on the wrapper element.' },
    { input: '(cardClick)', type: 'EventEmitter<MouseEvent>',                          default: '—',         description: 'Emitted on click when clickable=true.' },
  ];
}
