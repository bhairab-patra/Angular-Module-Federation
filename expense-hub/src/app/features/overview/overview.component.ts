import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

// ↓ imported from the published npm package "platform-ui"
import { ButtonComponent, CardComponent, CardData } from 'platform-ui';

@Component({
  selector: 'exp-overview',
  standalone: true,
  imports: [NgFor, CardComponent, ButtonComponent],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  stats: CardData[] = [
    { title: 'Total Spent',    value: '$24,390', icon: '💸', trend: 'up',      trendValue: '+12% vs last month', subtitle: 'All categories' },
    { title: 'Monthly Budget', value: '$30,000', icon: '🎯', trend: 'neutral', trendValue: '81% used',           subtitle: 'June 2026'      },
    { title: 'Pending Claims', value: '8',       icon: '🕐', trend: 'down',    trendValue: '-3 this week',       subtitle: 'Awaiting approval' },
    { title: 'Reimbursed',     value: '$9,840',  icon: '✅', trend: 'up',      trendValue: '+$1,200 this week',  subtitle: 'Paid out'       },
  ];

  budgets = [
    { label: 'Travel',      spent: 8400,  total: 10000, color: '#3b82f6' },
    { label: 'Software',    spent: 5200,  total: 6000,  color: '#8b5cf6' },
    { label: 'Office',      spent: 2100,  total: 4000,  color: '#f59e0b' },
    { label: 'Team Events', spent: 3800,  total: 5000,  color: '#ec4899' },
  ];

  onAddExpense(): void { alert('Add expense — wire to your API here.'); }
}
