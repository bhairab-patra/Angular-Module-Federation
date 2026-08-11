import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'docs-table-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="tbl-layout">
      <div class="tbl-layout__tabs">
        <a class="tbl-tab" routerLink="display"   routerLinkActive="tbl-tab--active">Display Table</a>
        <a class="tbl-tab" routerLink="data-grid"  routerLinkActive="tbl-tab--active">Data Grid</a>
        <a class="tbl-tab" routerLink="editable"   routerLinkActive="tbl-tab--active">Editable Table</a>
      </div>
      <router-outlet />
    </div>
  `,
  styles: [`
    .tbl-layout__tabs {
      display: flex; gap: 4px; padding: 20px 40px 0;
      border-bottom: 2px solid #e5e7eb; background: #fff;
    }
    .tbl-tab {
      padding: 10px 20px; font-size: 13.5px; font-weight: 500;
      color: #6b7280; text-decoration: none; border-radius: 6px 6px 0 0;
      border: 1px solid transparent; border-bottom: none;
      transition: color .15s, background .15s;
    }
    .tbl-tab:hover { color: #111827; background: #f9fafb; }
    .tbl-tab--active {
      color: #12c6a8; font-weight: 600;
      border-color: #e5e7eb; border-bottom: 2px solid #fff;
      margin-bottom: -2px; background: #fff;
    }
  `],
})
export class TableLayoutComponent {}
