import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'docs-home',
  standalone: true,
  imports: [],
  template: `
    <div class="hero">
      <div class="hero-body">
        <div class="hero-badge">Angular 19 · Native Federation · Standalone</div>
        <h1 class="hero-title">Platform<span class="hero-title-accent">UI</span></h1>
        <p class="hero-sub">
          A lightweight Angular component library designed for micro-frontend architectures.<br>
          Drop-in buttons, cards, badges, modals, and headers — zero extra dependencies.
        </p>
        <div class="hero-actions">
          <button class="btn-primary" (click)="goStart()">Get started</button>
          <button class="btn-ghost" (click)="goComponents()">Browse components →</button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .hero {
      min-height: calc(100vh - 58px);
      background: linear-gradient(145deg, #e6faf7 0%, #d7f5ee 40%, #e8f8f5 100%);
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden; padding: 60px 32px;
      text-align: center;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    .hero-body {
      position: relative; z-index: 1; max-width: 700px;
    }

    .hero-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 14px; border-radius: 999px;
      background: rgba(18,198,168,.15); color: #0a7a65;
      font-size: 12px; font-weight: 600; letter-spacing: .04em;
      text-transform: uppercase; margin-bottom: 24px;
    }

    .hero-title {
      font-size: clamp(52px, 8vw, 88px);
      font-weight: 900; letter-spacing: -.04em;
      color: #0A0F1A; line-height: 1.05; margin-bottom: 20px;
    }
    .hero-title-accent { color: #12C6A8; }

    .hero-sub {
      font-size: 17px; color: #374151; line-height: 1.75;
      margin-bottom: 36px; opacity: .85;
    }

    .hero-actions {
      display: flex; align-items: center; justify-content: center;
      gap: 14px; margin-bottom: 56px; flex-wrap: wrap;
    }

    .btn-primary {
      padding: 13px 32px; border-radius: 10px;
      background: #12C6A8; color: #fff; border: none;
      font-size: 15px; font-weight: 700; cursor: pointer;
      font-family: inherit;
    }
    .btn-ghost {
      padding: 13px 28px; border-radius: 10px;
      background: rgba(255,255,255,.7); color: #0a7a65;
      border: 1.5px solid rgba(18,198,168,.35);
      font-size: 15px; font-weight: 600; cursor: pointer;
      font-family: inherit;
    }

    /* Stats */
    .hero-stats {
      display: flex; align-items: center; justify-content: center;
      gap: 0; flex-wrap: wrap;
      background: rgba(255,255,255,.65);
      border: 1px solid rgba(18,198,168,.18);
      border-radius: 14px; padding: 20px 32px;
      backdrop-filter: blur(8px);
    }
    .stat {
      display: flex; flex-direction: column; align-items: center;
      gap: 3px; padding: 0 28px;
    }
    .stat-num   { font-size: 20px; font-weight: 800; color: #0A0F1A; }
    .stat-label { font-size: 11px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; }
    .stat-divider {
      width: 1px; height: 36px; background: rgba(18,198,168,.2);
    }
  `],
})
export class HomeComponent {
  constructor(private router: Router) {}
  goStart()      { this.router.navigate(['/getting-started']); }
  goComponents() { this.router.navigate(['/button']); }
}
