import { Component } from '@angular/core';
import { NgFor, NgIf, DatePipe, DecimalPipe } from '@angular/common';

// ↓ imported from the published npm package "platform-ui"
import { ButtonComponent, CardComponent } from 'platform-ui';

export interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  submittedBy: string;
}

@Component({
  selector: 'exp-expenses',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, DecimalPipe, CardComponent, ButtonComponent],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
  expenses: Expense[] = [
    { id: 1, description: 'Flight to NYC',        category: 'Travel',   amount: 540.00, date: '2026-06-01', status: 'approved', submittedBy: 'Jane Doe'      },
    { id: 2, description: 'GitHub Copilot seats',  category: 'Software', amount: 190.00, date: '2026-06-03', status: 'approved', submittedBy: 'John Smith'    },
    { id: 3, description: 'Team lunch',            category: 'Office',   amount: 215.50, date: '2026-06-05', status: 'pending',  submittedBy: 'Alice Johnson' },
    { id: 4, description: 'Hotel — 2 nights',      category: 'Travel',   amount: 380.00, date: '2026-06-06', status: 'pending',  submittedBy: 'Bob Williams'  },
    { id: 5, description: 'Conference ticket',     category: 'Training', amount: 799.00, date: '2026-06-07', status: 'rejected', submittedBy: 'Jane Doe'      },
  ];

  onApprove(expense: Expense): void { alert(`Approve #${expense.id} — wire to your API here.`); }
  onReject(expense: Expense): void  { alert(`Reject #${expense.id} — wire to your API here.`);  }
}
