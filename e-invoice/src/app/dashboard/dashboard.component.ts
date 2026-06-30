import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from 'platform-ui';
import { NgFor } from '@angular/common';

@Component({
  selector: 'inv-dashboard',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="page">
      <header class="page__header">
        <div>
          <h1 class="page__title">E-Invoice Dashboard</h1>
          <p class="page__subtitle">Manage and track all your digital invoices</p>
        </div>
       
      </header>

 

      <div class="table-card">
        <h2 class="table-card__title">Recent Invoices</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Date</th>
             
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let inv of invoices">
              <td>{{ inv.id }}</td>
              <td>{{ inv.client }}</td>
              <td>{{ inv.amount }}</td>
              <td>{{ inv.date }}</td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 8px 0; max-width: 1200px; }
    .page__header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .page__title  { font-size: 24px; font-weight: 700; color: #0f172a; }
    .page__subtitle { font-size: 14px; color: #64748b; margin-top: 4px; }

    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }

    .table-card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
    .table-card__title { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 16px; }

    .table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .table th { text-align: left; padding: 10px 12px; color: #64748b; font-weight: 500; border-bottom: 1px solid #e2e8f0; }
    .table td { padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155; }
    .table tr:last-child td { border-bottom: none; }

    .badge { padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 500; text-transform: capitalize; }
    .badge--paid    { background: #dcfce7; color: #16a34a; }
    .badge--pending { background: #fef9c3; color: #ca8a04; }
    .badge--overdue { background: #fee2e2; color: #dc2626; }
  `],
})
export class DashboardComponent {
  stats = [
    { title: 'Total Invoices', value: '142',  icon: '🧾', trend: 'up'      as const, trendValue: '+12 this month' },
    { title: 'Paid',           value: '98',   icon: '✅', trend: 'up'      as const, trendValue: '+8 this month'  },
    { title: 'Pending',        value: '31',   icon: '⏳', trend: 'neutral' as const, trendValue: 'No change'      },
    { title: 'Overdue',        value: '13',   icon: '⚠️', trend: 'down'    as const, trendValue: '-2 this month'  },
  ];

  invoices = [
    { id: 'INV-001', client: 'Acme Corp',      amount: '$4,200', date: '2026-06-01', status: 'paid'    },
    { id: 'INV-002', client: 'TechStart Ltd',  amount: '$1,800', date: '2026-06-05', status: 'pending' },
    { id: 'INV-003', client: 'Global Trade',   amount: '$9,500', date: '2026-05-28', status: 'overdue' },
    { id: 'INV-004', client: 'Sunrise Media',  amount: '$2,100', date: '2026-06-10', status: 'paid'    },
    { id: 'INV-005', client: 'NovaSoft Inc',   amount: '$3,750', date: '2026-06-15', status: 'pending' },
  ];
}
