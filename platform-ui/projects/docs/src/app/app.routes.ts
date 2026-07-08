import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent) },
  { path: 'getting-started', loadComponent: () => import('./pages/getting-started.component').then(m => m.GettingStartedComponent) },
  { path: 'button',  loadComponent: () => import('./pages/button-page.component').then(m => m.ButtonPageComponent) },
  { path: 'card',    loadComponent: () => import('./pages/card-page.component').then(m => m.CardPageComponent) },
  { path: 'badge',   loadComponent: () => import('./pages/badge-page.component').then(m => m.BadgePageComponent) },
  { path: 'modal',   loadComponent: () => import('./pages/modal-page.component').then(m => m.ModalPageComponent) },
  { path: 'header',  loadComponent: () => import('./pages/header-page.component').then(m => m.HeaderPageComponent) },
];
