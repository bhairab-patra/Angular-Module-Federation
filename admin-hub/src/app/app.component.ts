import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'admin-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="app-shell">
      <admin-sidebar />
      <div class="app-main">
        <admin-header />
        <main class="app-content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-shell  { display: flex; height: 100vh; overflow: hidden; }
    .app-main   { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .app-content { flex: 1; overflow-y: auto; padding: 24px 32px; background: var(--color-bg); }
  `],
})
export class AppComponent {}
