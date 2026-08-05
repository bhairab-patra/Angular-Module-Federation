import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { PuiToastContainerComponent } from '@solifi/platform-ui';

interface NavItem  { label: string; route: string; }
interface NavSection { heading: string; icon: SafeHtml; items: NavItem[]; collapsed: boolean; }
interface SearchItem { label: string; route: string; category: string; keywords: string[]; }

@Component({
  selector: 'docs-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor, NgIf, PuiToastContainerComponent],
  template: `
    <!-- ══ TOP BAR ══ -->
    <header class="topbar">
      <div class="topbar-left">
        <a class="brand" href="/">
          <svg class="brand-icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#12C6A8"/>
            <path d="M7 14h14M14 7l7 7-7 7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="brand-name">Platform<strong>UI</strong></span>
        </a>
      </div>
      <div class="topbar-center">
        <div class="search-wrap" [class.search-wrap--open]="suggestions.length > 0">
          <span class="search-icon">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="#9ca3af" stroke-width="2"/><path d="M14 14l3.5 3.5" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
          <input
            class="search-input"
            type="text"
            placeholder="Search components…"
            [value]="searchQuery"
            (input)="onSearch($any($event.target).value)"
            (keydown.escape)="clearSearch()"
            (keydown.arrowdown)="moveFocus(1)"
            (keydown.arrowup)="moveFocus(-1)"
            (keydown.enter)="selectFocused()"
            autocomplete="off">
          <button *ngIf="searchQuery" class="search-clear" (click)="clearSearch()">✕</button>
          <ul class="search-dropdown" *ngIf="suggestions.length > 0">
            <li *ngFor="let s of suggestions; let i = index"
                class="search-item"
                [class.search-item--focused]="i === focusedIndex"
                (mousedown)="navigate(s.route)"
                (mouseenter)="focusedIndex = i">
              <span class="search-item__cat">{{ s.category }}</span>
              <span class="search-item__label">{{ s.label }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="topbar-right">
        <a class="gh-btn" href="https://github.com" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          GitHub
        </a>
      </div>
    </header>

    <!-- ══ BODY ══ -->
    <div class="shell">

      <!-- Left sidebar -->
      <aside class="sidebar" *ngIf="!isHome">
        <nav class="sidebar-nav">

          <!-- Version badge -->
          <div class="sidebar-version">
            <span class="version-badge">v1.0.0</span>
            <span class="version-label">Stable</span>
          </div>

          <!-- Sections -->
          <div class="nav-section" *ngFor="let s of sections">

            <!-- Section header (clickable to collapse) -->
            <button class="nav-section__header" (click)="toggleSection(s)">
              <span class="nav-section__icon" [innerHTML]="s.icon"></span>
              <span class="nav-section__heading">{{ s.heading }}</span>
              <svg class="nav-section__chevron" [class.nav-section__chevron--open]="!s.collapsed"
                   width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.8"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <!-- Collapsible items -->
            <div class="nav-section__items" [class.nav-section__items--open]="!s.collapsed">
              <a *ngFor="let item of s.items"
                 [routerLink]="item.route"
                 routerLinkActive="nav-link--active"
                 [routerLinkActiveOptions]="item.route === '/' ? {exact: true} : {exact: false}"
                 class="nav-link">
                <span class="nav-link__dot"></span>
                {{ item.label }}
              </a>
            </div>

          </div>

        </nav>

        <!-- Sidebar footer -->
        <div class="sidebar-footer">
          <span class="sidebar-footer__text">Built with Platform UI</span>
        </div>
      </aside>

      <!-- Page -->
      <main class="docs-main" [class.docs-main--full]="isHome">
        <router-outlet></router-outlet>
      </main>

    </div>

    <!-- Global toast container -->
    <pui-toast-container></pui-toast-container>
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
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .topbar-left  { display: flex; align-items: center; }
    .topbar-right { display: flex; align-items: center; gap: 14px; }

    .brand {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; flex-shrink: 0;
    }
    .brand-icon { border-radius: 8px; }
    .brand-name { font-size: 15px; font-weight: 500; color: #111827; font-family: 'Poppins', system-ui, sans-serif; letter-spacing: -.01em; }
    .brand-name strong { font-weight: 700; color: #12C6A8; }

    .gh-btn {
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; color: #374151; text-decoration: none;
      padding: 6px 12px; border-radius: 8px; border: 1px solid #e5e7eb;
      font-family: 'Poppins', system-ui, sans-serif;
      transition: background .15s, border-color .15s, color .15s;
    }
    .gh-btn:hover { background: #f3f4f6; color: #111827; border-color: #d1d5db; }

    /* ── Search ─────────────────────────────── */
    .topbar-center { flex: 1; display: flex; justify-content: center; padding: 0 24px; }

    .search-wrap {
      position: relative; width: 100%; max-width: 380px;
      display: flex; align-items: center;
    }
    .search-icon {
      position: absolute; left: 12px; display: flex; align-items: center; pointer-events: none;
    }
    .search-input {
      width: 100%; padding: 7px 32px 7px 36px;
      border: 1px solid #e5e7eb; border-radius: 10px;
      font-size: 13px; font-family: 'Poppins', system-ui, sans-serif;
      background: #f9fafb; color: #111827; outline: none;
      transition: border-color .15s, box-shadow .15s, background .15s;
    }
    .search-input:focus {
      border-color: #12C6A8; box-shadow: 0 0 0 3px rgba(18,198,168,.12);
      background: #fff;
    }
    .search-input::placeholder { color: #9ca3af; }
    .search-clear {
      position: absolute; right: 10px; background: none; border: none;
      color: #9ca3af; cursor: pointer; font-size: 12px; padding: 2px 4px; line-height: 1;
    }
    .search-clear:hover { color: #374151; }

    .search-dropdown {
      position: absolute; top: calc(100% + 6px); left: 0; right: 0;
      background: #fff; border: 1px solid #e5e7eb;
      border-radius: 12px; box-shadow: 0 8px 28px rgba(0,0,0,.1);
      list-style: none; margin: 0; padding: 6px;
      z-index: 500; max-height: 320px; overflow-y: auto;
    }
    .search-item {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 12px; border-radius: 8px; cursor: pointer;
      transition: background .1s;
    }
    .search-item:hover, .search-item--focused { background: #f0fdf9; }
    .search-item__cat {
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .06em; color: #12C6A8;
      background: rgba(18,198,168,.1); padding: 2px 7px; border-radius: 999px;
      white-space: nowrap;
    }
    .search-item__label { font-size: 13px; color: #111827; font-weight: 500; }

    /* ── Global ─────────────────────────────── */
    :host { font-family: 'Poppins', system-ui, sans-serif; }

    .shell {
      display: flex; padding-top: 58px; min-height: 100vh;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    /* ── Sidebar ────────────────────────────── */
    .sidebar {
      position: fixed; top: 58px; bottom: 0; left: 0;
      width: 260px; overflow-y: auto;
      border-right: 1px solid #f0f1f3;
      background: #fafbfc;
      display: flex; flex-direction: column;
    }
    .sidebar-nav { flex: 1; padding: 16px 0 8px; }

    /* Version badge */
    .sidebar-version {
      display: flex; align-items: center; gap: 8px;
      padding: 0 16px 14px;
      border-bottom: 1px solid #f0f1f3;
      margin-bottom: 8px;
    }
    .version-badge {
      font-size: 10px; font-weight: 700; color: #0d6e5f;
      background: rgba(18,198,168,.12); padding: 2px 8px;
      border-radius: 999px; letter-spacing: .04em;
    }
    .version-label { font-size: 11px; color: #9ca3af; font-weight: 500; }

    /* Section */
    .nav-section { margin-bottom: 2px; }

    .nav-section__header {
      width: 100%; display: flex; align-items: center; gap: 8px;
      padding: 9px 16px; background: none; border: none; cursor: pointer;
      text-align: left; border-radius: 0;
      transition: background .15s;
    }
    .nav-section__header:hover { background: #f3f4f6; }

    .nav-section__icon {
      display: flex; align-items: center; justify-content: center;
      width: 20px; height: 20px; color: #6b7280; flex-shrink: 0;
    }
    .nav-section__icon svg { width: 15px; height: 15px; }

    .nav-section__heading {
      flex: 1; font-size: 12px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .08em; color: #374151;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    .nav-section__chevron {
      color: #9ca3af; flex-shrink: 0;
      transition: transform .25s cubic-bezier(.4,0,.2,1);
      transform: rotate(-90deg);
    }
    .nav-section__chevron--open { transform: rotate(0deg); }

    /* Items panel — CSS-only height animation */
    .nav-section__items {
      overflow: hidden;
      max-height: 0;
      transition: max-height .3s cubic-bezier(.4,0,.2,1), opacity .25s ease;
      opacity: 0;
    }
    .nav-section__items--open {
      max-height: 800px;
      opacity: 1;
    }

    /* Individual nav link */
    .nav-link {
      display: flex; align-items: center; gap: 10px;
      padding: 7px 16px 7px 42px;
      font-size: 13px; color: #4b5563;
      text-decoration: none; border-radius: 0;
      border-left: 2px solid transparent;
      transition: color .12s, background .12s, border-color .12s;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .nav-link__dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: #d1d5db; flex-shrink: 0;
      transition: background .15s, transform .15s;
    }
    .nav-link:hover { color: #111827; background: #f0f1f3; }
    .nav-link:hover .nav-link__dot { background: #9ca3af; transform: scale(1.3); }

    .nav-link--active {
      color: #0d6e5f !important;
      border-left-color: #12C6A8;
      background: #ecfdf5 !important;
      font-weight: 600;
    }
    .nav-link--active .nav-link__dot { background: #12C6A8 !important; transform: scale(1.3); }

    /* Sidebar footer */
    .sidebar-footer {
      padding: 12px 16px;
      border-top: 1px solid #f0f1f3;
    }
    .sidebar-footer__text { font-size: 11px; color: #c4c9d4; }

    /* ── Main ───────────────────────────────── */
    .docs-main {
      flex: 1; margin-left: 260px; min-width: 0; background: #fff;
    }
    .docs-main--full { margin-left: 0; }
  `],
})
export class AppComponent {
  isHome = true;

  sections: NavSection[] = [];

  private allItems: SearchItem[] = [
    { label: 'Introduction',    route: '/',                category: 'Getting Started', keywords: ['intro', 'overview', 'start'] },
    { label: 'Getting Started', route: '/getting-started', category: 'Getting Started', keywords: ['install', 'setup', 'guide'] },
    { label: 'Button',          route: '/button',          category: 'Component',       keywords: ['btn', 'click', 'primary', 'secondary', 'outline', 'destructive', 'chip', 'upload'] },
    { label: 'Card',            route: '/card',            category: 'Component',       keywords: ['container', 'panel', 'box'] },
    { label: 'Badge',           route: '/badge',           category: 'Component',       keywords: ['tag', 'label', 'status', 'pill'] },
    { label: 'Modal',           route: '/modal',           category: 'Component',       keywords: ['dialog', 'popup', 'overlay', 'confirm'] },
    { label: 'Header',          route: '/header',          category: 'Component',       keywords: ['navbar', 'topbar', 'navigation'] },
    { label: 'Icon',            route: '/icon',            category: 'Component',       keywords: ['svg', 'glyph', 'symbol', 'figma', 'arrow', 'check', 'search'] },
    { label: 'Typography',      route: '/typography',      category: 'Foundation',      keywords: ['poppins', 'font', 'type', 'scale', 'heading', 'body', 'weight', 'install'] },
    { label: 'Breadcrumb',      route: '/breadcrumb',      category: 'Component',       keywords: ['nav', 'navigation', 'trail', 'crumb', 'path', 'location'] },
    { label: 'Spinner',         route: '/spinner',         category: 'Component',       keywords: ['loading', 'loader', 'progress', 'overlay', 'dash', 'dots'] },
    { label: 'Tooltip',         route: '/tooltip',         category: 'Component',       keywords: ['hover', 'popover', 'hint', 'tip', 'label', 'position'] },
    { label: 'Input',           route: '/input',           category: 'Form',            keywords: ['text', 'email', 'password', 'number', 'field', 'clearable', 'prefix', 'suffix'] },
    { label: 'Select',          route: '/select',          category: 'Form',            keywords: ['dropdown', 'option', 'choose', 'picker'] },
    { label: 'Checkbox',        route: '/checkbox',        category: 'Form',            keywords: ['check', 'tick', 'indeterminate', 'agree', 'toggle'] },
    { label: 'Radio',           route: '/radio',           category: 'Form',            keywords: ['radio', 'group', 'single', 'choose', 'option'] },
    { label: 'Textarea',        route: '/textarea',        category: 'Form',            keywords: ['multiline', 'paragraph', 'long text', 'comment', 'rows', 'resize'] },
    { label: 'Switch',          route: '/switch',          category: 'Form',            keywords: ['toggle', 'on off', 'boolean', 'enable', 'disable'] },
    { label: 'Search',          route: '/search',          category: 'Component',       keywords: ['search', 'autocomplete', 'suggestions', 'debounce', 'filter', 'find'] },
    { label: 'Advanced Filters',route: '/filters',         category: 'Component',       keywords: ['filter', 'panel', 'checkbox', 'range', 'date', 'select', 'advanced'] },
    { label: 'Toast',           route: '/toast',           category: 'Component',       keywords: ['notification', 'alert', 'snackbar', 'success', 'error', 'warning', 'info'] },
    { label: 'Sidebar',         route: '/sidebar',         category: 'Component',       keywords: ['sidebar', 'navigation', 'nav', 'menu', 'shell', 'layout', 'drawer', 'collapse'] },
  ];

  searchQuery   = '';
  suggestions: SearchItem[] = [];
  focusedIndex  = -1;

  toggleSection(s: NavSection): void {
    s.collapsed = !s.collapsed;
  }

  constructor(private router: Router, private el: ElementRef, private san: DomSanitizer) {
    const s = (svg: string) => this.san.bypassSecurityTrustHtml(svg);
    this.sections = [
      {
        heading: 'Getting Started',
        collapsed: false,
        icon: s(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h12M2 8h8M2 13h5"/></svg>`),
        items: [
          { label: 'Introduction',    route: '/'                },
          { label: 'Getting Started', route: '/getting-started' },
        ],
      },
      {
        heading: 'Foundation',
        collapsed: false,
        icon: s(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13h12M4 13V7l4-4 4 4v6"/><rect x="6" y="9" width="4" height="4" rx=".5"/></svg>`),
        items: [
          { label: 'Typography', route: '/typography' },
        ],
      },
      {
        heading: 'Components',
        collapsed: false,
        icon: s(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="1.5" width="5" height="5" rx="1"/><rect x="9.5" y="1.5" width="5" height="5" rx="1"/><rect x="1.5" y="9.5" width="5" height="5" rx="1"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/></svg>`),
        items: [
          { label: 'Badge',       route: '/badge'       },
          { label: 'Breadcrumb',  route: '/breadcrumb'  },
          { label: 'Button',      route: '/button'      },
          { label: 'Card',        route: '/card'        },
          { label: 'Icon',        route: '/icon'        },
          { label: 'Modal',       route: '/modal'       },
          { label: 'Spinner',     route: '/spinner'     },
          { label: 'Tooltip',     route: '/tooltip'     },
        ],
      },
      {
        heading: 'Forms',
        collapsed: false,
        icon: s(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="3" width="13" height="3" rx="1"/><rect x="1.5" y="10" width="13" height="3" rx="1"/><path d="M5 6.5v3"/></svg>`),
        items: [
          { label: 'Checkbox', route: '/checkbox' },
          { label: 'Input',    route: '/input'    },
          { label: 'Radio',    route: '/radio'    },
          { label: 'Select',   route: '/select'   },
          { label: 'Switch',   route: '/switch'   },
          { label: 'Textarea', route: '/textarea' },
        ],
      },
      {
        heading: 'Utilities',
        collapsed: false,
        icon: s(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="6.5" cy="6.5" r="4.5"/><path d="M10.5 10.5l3.5 3.5"/><path d="M9 3h5M9 6h3M9 9h5"/></svg>`),
        items: [
          { label: 'Advanced Filters', route: '/filters'   },
          { label: 'App Shell',        route: '/app-shell' },
          { label: 'Header',           route: '/header'    },
          { label: 'Search',           route: '/search'    },
          { label: 'Sidebar',          route: '/sidebar'   },
          { label: 'Toast',            route: '/toast'     },
        ],
      },
    ];

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.isHome = e.urlAfterRedirects === '/';
      this.clearSearch();
    });
  }

  onSearch(q: string): void {
    this.searchQuery  = q;
    this.focusedIndex = -1;
    const term = q.trim().toLowerCase();
    if (!term) { this.suggestions = []; return; }
    this.suggestions = this.allItems.filter(item =>
      item.label.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.keywords.some(k => k.includes(term))
    );
  }

  moveFocus(dir: number): void {
    if (!this.suggestions.length) return;
    this.focusedIndex = (this.focusedIndex + dir + this.suggestions.length) % this.suggestions.length;
  }

  selectFocused(): void {
    const item = this.suggestions[this.focusedIndex] ?? this.suggestions[0];
    if (item) this.navigate(item.route);
  }

  navigate(route: string): void {
    this.router.navigateByUrl(route);
    this.clearSearch();
  }

  clearSearch(): void {
    this.searchQuery  = '';
    this.suggestions  = [];
    this.focusedIndex = -1;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target)) this.clearSearch();
  }
}
