import { Routes } from '@angular/router';

// Exposed via Native Federation to admin-hub.
// No sidebar/header here — admin-hub owns the shell.
export const EXPERIENCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/overview/overview.component').then(m => m.OverviewComponent),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('../features/expenses/expenses.component').then(m => m.ExpensesComponent),
  },
];
