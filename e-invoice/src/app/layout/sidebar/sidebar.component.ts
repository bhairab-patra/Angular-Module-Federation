import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'inv-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  template: `
    <aside class="sidebar">
      <div class="sidebar__brand">
        <span class="sidebar__logo">🧾</span>
        <span class="sidebar__name">E-Invoice</span>
      </div>

      <nav class="sidebar__nav">
        <a *ngFor="let item of navItems"
           [routerLink]="item.route"
           routerLinkActive="sidebar__link--active"
           class="sidebar__link">
          <span class="sidebar__icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </a>
      </nav>

      <div class="sidebar__footer">
        <span>platform-ui v1.0.0</span>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width);
      height: 100vh;
      background: #0f172a;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .sidebar__brand {
      display: flex; align-items: center; gap: 10px;
      padding: 20px;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .sidebar__logo { font-size: 22px; }
    .sidebar__name { font-size: 16px; font-weight: 700; color: #f8fafc; }

    .sidebar__nav {
      flex: 1; padding: 16px 12px;
      display: flex; flex-direction: column; gap: 4px;
    }
    .sidebar__link {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: 8px;
      text-decoration: none; color: #94a3b8;
      font-weight: 500; font-size: 14px;
      transition: background .15s, color .15s;
    }
    .sidebar__link:hover       { background: rgba(255,255,255,.07); color: #f8fafc; }
    .sidebar__link--active     { background: rgba(14,165,233,.2);   color: #7dd3fc; }
    .sidebar__icon { font-size: 16px; width: 20px; text-align: center; }

    .sidebar__footer {
      padding: 16px 20px;
      border-top: 1px solid rgba(255,255,255,.08);
      font-size: 11px; color: #475569;
    }
  `],
})
export class SidebarComponent {
  navItems = [
    { label: 'Dashboard', route: '/', icon: '📊' },
  ];
}
