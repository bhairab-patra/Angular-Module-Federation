import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

interface NavSection { heading: string; items: { label: string; route: string }[]; }

@Component({
  selector: 'docs-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor, NgIf],
  template: `
    <!-- ══ TOP BAR ══ -->
    <header class="topbar">
      <div class="topbar-left">
        <a class="brand" href="/">
          <span class="brand-logo"></span>
          <span class="brand-name">Platform<strong>UI</strong></span>
        </a>
      </div>
      <div class="topbar-right">
        <span class="topbar-link">GitHub</span>
      </div>
    </header>

    <!-- ══ BODY ══ -->
    <div class="shell">

      <!-- Left sidebar (hidden on home page) -->
      <aside class="sidebar" *ngIf="!isHome">
        <div class="sidebar-inner">
          <ng-container *ngFor="let s of sections">
            <div class="sidebar-group">{{ s.heading }}</div>
            <a *ngFor="let item of s.items"
               [routerLink]="item.route"
               routerLinkActive="sidebar-link-active"
               [routerLinkActiveOptions]="item.route === '/' ? {exact: true} : {exact: false}"
               class="sidebar-link">
              {{ item.label }}
            </a>
          </ng-container>
        </div>
      </aside>

      <!-- Page -->
      <main class="docs-main" [class.docs-main--full]="isHome">
        <router-outlet></router-outlet>
      </main>

    </div>
  `,
  styles: [`
    /* ── Top bar ─────────────────────────────── */
    .topbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      height: 58px;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      display: flex; align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      box-shadow: 0 1px 3px rgba(0,0,0,.04);
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .topbar-left  { display: flex; align-items: center; gap: 0; }
    .topbar-right { display: flex; align-items: center; gap: 14px; }

    .brand {
      display: flex; align-items: center; gap: 8px;
      text-decoration: none; flex-shrink: 0;
    }
    .brand-logo { font-size: 20px; }
    .brand-name { font-size: 16px; font-weight: 500; color: #111827; font-family: 'Poppins', system-ui, sans-serif; }
    .brand-name strong { font-weight: 700; color: #12C6A8; }

    .topbar-link { font-size: 14px; color: #6b7280; cursor: pointer; font-family: 'Poppins', system-ui, sans-serif; }
    .topbar-link:hover { color: #111827; }

    /* ── Global font ────────────────────────── */
    :host { font-family: 'Poppins', system-ui, sans-serif; }

    /* ── Shell ──────────────────────────────── */
    .shell {
      display: flex;
      padding-top: 58px;
      min-height: 100vh;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* ── Sidebar ────────────────────────────── */
    .sidebar {
      position: fixed; top: 58px; bottom: 0; left: 0;
      width: 258px; overflow-y: auto;
      border-right: 1px solid #e5e7eb;
      background: #fff;
    }
    .sidebar-inner { padding: 20px 0 40px; }

    .sidebar-group {
      padding: 16px 20px 5px;
      font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .09em;
      color: #9ca3af;
    }

    .sidebar-link {
      display: block;
      padding: 7px 20px;
      font-size: 13.5px; color: #374151;
      border-left: 2px solid transparent;
      text-decoration: none;
      transition: color .12s, background .12s, border-color .12s;
    }
    .sidebar-link:hover { color: #111827; background: #f9fafb; }

    /* Active — double class = higher specificity than base .sidebar-link rule */
    .sidebar-link.sidebar-link-active {
      color: #0fa78d;
      border-left-color: #12C6A8;
      background-color: #d7f5ee;
      font-weight: 600;
    }
    .sidebar-link.sidebar-link-active:hover {
      color: #0fa78d;
      background-color: #d7f5ee;
    }

    /* ── Main ───────────────────────────────── */
    .docs-main {
      flex: 1;
      margin-left: 258px;
      min-width: 0;
      background: #fff;
    }
    /* No sidebar on home */
    .docs-main--full { margin-left: 0; }
  `],
})
export class AppComponent {
  isHome = true;

  sections: NavSection[] = [
    {
      heading: 'Getting Started',
      items: [
        { label: 'Introduction',    route: '/'                },
        { label: 'Getting Started', route: '/getting-started' },
      ],
    },
    {
      heading: 'Components',
      items: [
        { label: 'Button', route: '/button' },
        { label: 'Card',   route: '/card'   },
        { label: 'Badge',  route: '/badge'  },
        { label: 'Modal',  route: '/modal'  },
        { label: 'Header', route: '/header' },
      ],
    },
  ];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.isHome = e.urlAfterRedirects === '/';
    });
  }
}
