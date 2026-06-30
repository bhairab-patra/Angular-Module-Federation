import { Routes } from '@angular/router';

// Exposed via Native Federation to admin-hub.
// No sidebar/header here — admin-hub owns the shell.
export const EINVOICE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
];
