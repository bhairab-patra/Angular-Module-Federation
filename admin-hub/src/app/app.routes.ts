import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Admin-hub own pages
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/users.component').then(m => m.UsersComponent),
  },

  {
    path: 'experience',
    loadChildren: () =>
      loadRemoteModule('experience-hub', './Routes').then(m => m.EXPERIENCE_ROUTES),
  },

  {
    path: 'e-invoice',
    loadChildren: () =>
      loadRemoteModule('e-invoice', './Routes').then(m => m.EINVOICE_ROUTES),
  },
 
  { path: '**', redirectTo: 'dashboard' },
];
