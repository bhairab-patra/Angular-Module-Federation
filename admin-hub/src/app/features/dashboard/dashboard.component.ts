import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

// ↓ imported from the published npm package "platform-ui"
import { ButtonComponent, CardComponent, CardData } from 'platform-ui';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [NgFor, CardComponent, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  stats: CardData[] = [
    { title: 'Total Users',     value: '12,480', icon: '👥', trend: 'up',      trendValue: '+8.2% this month',   subtitle: 'Registered accounts' },
    { title: 'Active Sessions', value: '3,291',  icon: '🟢', trend: 'up',      trendValue: '+4.1% today',        subtitle: 'Live right now'       },
    { title: 'Pending Reviews', value: '57',      icon: '📋', trend: 'neutral', trendValue: 'No change',          subtitle: 'Awaiting action'      },
    { title: 'System Alerts',   value: '2',       icon: '⚠️', trend: 'down',    trendValue: '-3 since yesterday', subtitle: 'Critical issues'      },
  ];

  onExport(): void  { alert('Export — wire to your API here.'); }
  onRefresh(): void { alert('Refreshed.'); }
}
