import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { PuiToastContainerComponent } from '@solifi/platform-ui';

interface NavItem  { label: string; route?: string; icon?: SafeHtml; children?: NavItem[]; expanded?: boolean; }
interface NavSection { heading: string; items: NavItem[]; collapsed: boolean; }
interface SearchItem { label: string; route: string; category: string; keywords: string[]; }

@Component({
  selector: 'docs-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor, NgIf, PuiToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
    { label: 'Form Dialog',     route: '/form-dialog',     category: 'Component',       keywords: ['form', 'dialog', 'modal', 'add', 'edit', 'fields', 'input', 'select', 'textarea'] },
    { label: 'Confirm Dialog',  route: '/confirm-dialog',  category: 'Component',       keywords: ['confirm', 'dialog', 'modal', 'delete', 'destructive', 'prompt', 'alert', 'warning'] },
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
    { label: 'Solifi Sidebar',  route: '/solifi-sidebar',  category: 'Component',       keywords: ['solifi', 'sidebar', 'navigation', 'branded', 'dark', 'navy', 'icon rail', 'collapse', 'flat'] },
    { label: 'App Shell',       route: '/app-shell',       category: 'Component',       keywords: ['app shell', 'shell', 'layout', 'header', 'sidebar', 'full page', 'navigation', 'frame'] },
    { label: 'Display Table',  route: '/table/display',   category: 'Component', keywords: ['table', 'display', 'sort', 'search', 'sticky', 'badge', 'action', 'menu', 'tooltip'] },
    { label: 'Data Grid',      route: '/table/data-grid', category: 'Component', keywords: ['datagrid', 'table', 'pagination', 'paginate', 'selection', 'selectable', 'data', 'grid', 'sort', 'search'] },
    { label: 'Editable Table', route: '/table/editable',  category: 'Component', keywords: ['editable', 'table', 'inline', 'edit', 'row', 'form', 'dialog', 'confirm', 'delete'] },
    { label: 'Tabs',        route: '/tabs',       category: 'Component', keywords: ['tabs', 'tab', 'panel', 'navigation', 'line', 'pill', 'card', 'switch', 'active'] },
    { label: 'Date Picker',    route: '/datepicker',    category: 'Component', keywords: ['date', 'datepicker', 'calendar', 'picker', 'range', 'input', 'schedule', 'time'] },
    { label: 'Multi Select',   route: '/multi-select',  category: 'Form',      keywords: ['multiselect', 'multi', 'select', 'dropdown', 'chips', 'tags', 'checkbox', 'multiple', 'search'] },
    { label: 'Password Input', route: '/password-input',category: 'Form',      keywords: ['password', 'input', 'strength', 'show', 'hide', 'reveal', 'toggle', 'copy', 'secure', 'validation'] },
    { label: 'Combobox',       route: '/combobox',      category: 'Form',      keywords: ['combobox', 'autocomplete', 'typeahead', 'search', 'filter', 'dropdown', 'select', 'freetext'] },
    { label: 'Skeleton Loader',route: '/skeleton',      category: 'Component', keywords: ['skeleton', 'loader', 'loading', 'placeholder', 'shimmer', 'pulse', 'ghost', 'spinner'] },
    { label: 'Chip',           route: '/chip',          category: 'Component', keywords: ['chip', 'tag', 'filter', 'removable', 'selectable', 'pill', 'toggle', 'input'] },
    { label: 'Tag',            route: '/tag',           category: 'Component', keywords: ['tag', 'label', 'badge', 'status', 'category', 'pill', 'uppercase'] },
    { label: 'List',           route: '/list',          category: 'Component', keywords: ['list', 'items', 'selectable', 'bordered', 'striped', 'flush', 'menu', 'navigation'] },
    { label: 'Menu',           route: '/menu',          category: 'Component', keywords: ['menu', 'dropdown', 'submenu', 'context', 'actions', 'popover', 'trigger', 'select'] },
    { label: 'Data Grid',      route: '/datagrid',      category: 'Component', keywords: ['datagrid', 'grid', 'table', 'data', 'sort', 'pagination', 'selectable', 'rows', 'columns', 'badge'] },
    { label: 'Alert',          route: '/alert',          category: 'Component', keywords: ['alert', 'notification', 'success', 'error', 'warning', 'info', 'dismissible', 'inline', 'feedback', 'message'] },
    { label: 'Pagination',     route: '/pagination',     category: 'Component', keywords: ['pagination', 'page', 'pager', 'pages', 'next', 'previous', 'navigate', 'records', 'total', 'ellipsis'] },
    { label: 'Accordion',      route: '/accordion',      category: 'Component', keywords: ['accordion', 'expand', 'collapse', 'faq', 'panel', 'toggle', 'disclosure', 'content', 'sections'] },
  ];

  searchQuery   = '';
  suggestions: SearchItem[] = [];
  focusedIndex  = -1;

  toggleSection(s: NavSection): void {
    s.collapsed = !s.collapsed;
  }

  toggleNavItem(item: NavItem): void {
    item.expanded = !item.expanded;
  }

  private expandParentForRoute(url: string): void {
    for (const section of this.sections) {
      for (const item of section.items) {
        if (item.children) {
          const active = item.children.some(c => url.startsWith(c.route ?? ''));
          if (active) item.expanded = true;
        }
      }
    }
  }

  constructor(private router: Router, private el: ElementRef, private san: DomSanitizer) {
    const i = (svg: string): SafeHtml => this.san.bypassSecurityTrustHtml(svg);
    this.sections = [
      {
        heading: 'Getting Started',
        collapsed: false,
        items: [
          {
            label: 'Getting Started',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2l1.2 2.6 2.8.4-2 2 .5 2.8L8 8.5 5.5 9.8l.5-2.8-2-2 2.8-.4z"/></svg>`),
            expanded: false,
            children: [
              { label: 'Angular',    route: '/getting-started/angular' },
              { label: 'React',      route: '/getting-started/react'   },
              { label: 'Plain HTML', route: '/getting-started/html'    },
            ],
          },
        ],
      },
      {
        heading: 'Foundation',
        collapsed: false,
        items: [
          { label: 'Typography', route: '/typography',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h10M8 4v8M5 12h6"/></svg>`) },
        ],
      },
      {
        heading: 'Components',
        collapsed: false,
        items: [
          { label: 'Badge',           route: '/badge',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2L3 4.5v3.5c0 2.8 2 5 5 5.5 3-.5 5-2.7 5-5.5V4.5z"/></svg>`) },
          { label: 'Breadcrumb',      route: '/breadcrumb',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="3" cy="8" r="1.5" fill="currentColor" stroke="none"/><circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none"/><circle cx="13" cy="8" r="1.5" fill="currentColor" stroke="none"/></svg>`) },
          { label: 'Button',          route: '/button',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="5" width="6" height="6" rx="1.5"/><rect x="9" y="5" width="5.5" height="6" rx="1.5"/></svg>`) },
          { label: 'Card',            route: '/card',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M2 6.5h12"/></svg>`) },
          { label: 'Chip',            route: '/chip',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="12" height="6" rx="3"/></svg>`) },
          { label: 'Data Grid',       route: '/datagrid',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="1.5" width="5" height="5" rx="1"/><rect x="9.5" y="1.5" width="5" height="5" rx="1"/><rect x="1.5" y="9.5" width="5" height="5" rx="1"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/></svg>`) },
          { label: 'Date Picker',     route: '/datepicker',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M2 7h12M5 2v2M11 2v2"/></svg>`) },
          { label: 'Icon',            route: '/icon',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2l1.5 3.5 3.5.5-2.5 2.5.5 3.5L8 10.3l-3 1.7.5-3.5L3 6l3.5-.5z"/></svg>`) },
          { label: 'List',            route: '/list',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h8M5 8h8M5 12h8"/><circle cx="2.5" cy="4" r=".8" fill="currentColor" stroke="none"/><circle cx="2.5" cy="8" r=".8" fill="currentColor" stroke="none"/><circle cx="2.5" cy="12" r=".8" fill="currentColor" stroke="none"/></svg>`) },
          { label: 'Menu',            route: '/menu',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="12" height="8" rx="1.5"/><path d="M5 7h6M5 9.5h4"/><path d="M11 8l2 0"/></svg>`) },
          {
            label: 'Modal', expanded: false,
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5l6-3 6 3-6 3z"/><path d="M2 8l6 3 6-3"/><path d="M2 11l6 3 6-3"/></svg>`),
            children: [
              { label: 'Modal',          route: '/modal'          },
              { label: 'Form Dialog',    route: '/form-dialog'    },
              { label: 'Confirm Dialog', route: '/confirm-dialog' },
            ],
          },
          { label: 'Skeleton Loader', route: '/skeleton',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2.5 2"><circle cx="8" cy="8" r="5.5"/></svg>`) },
          { label: 'Spinner',         route: '/spinner',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8 2.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11z" stroke-dasharray="10 8" stroke-dashoffset="-3"/></svg>`) },
          {
            label: 'Table', expanded: false,
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M2 6.5h12M6 6.5v6.5"/></svg>`),
            children: [
              { label: 'Display Table',  route: '/table/display'   },
              { label: 'Data Grid',      route: '/table/data-grid' },
              { label: 'Editable Table', route: '/table/editable'  },
            ],
          },
          { label: 'Accordion',       route: '/accordion',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="4" rx="1"/><rect x="2" y="7" width="12" height="4" rx="1" opacity=".5"/><rect x="2" y="12" width="12" height="2" rx="1" opacity=".25"/></svg>`) },
          { label: 'Solifi Sidebar',  route: '/solifi-sidebar',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="2" width="5" height="12" rx="1"/><path d="M8 5h6M8 8h6M8 11h4"/></svg>`) },
          { label: 'Alert',           route: '/alert',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2l6 10H2L8 2z"/><path d="M8 7v3M8 11.5v.5"/></svg>`) },
          { label: 'Pagination',      route: '/pagination',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="5" width="3" height="6" rx="1"/><rect x="5" y="5" width="3" height="6" rx="1"/><rect x="9" y="5" width="3" height="6" rx="1"/><rect x="13" y="5" width="2" height="6" rx="1"/></svg>`) },
          { label: 'Tabs',            route: '/tabs',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9h12M2 9V6a1 1 0 011-1h2.5a1 1 0 011 1v3"/><rect x="2" y="9" width="12" height="5" rx="1"/></svg>`) },
          { label: 'Tag',             route: '/tag',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5a1 1 0 011-1h6l4 4-4 4H3a1 1 0 01-1-1V5z"/><circle cx="5.5" cy="8" r="1" fill="currentColor" stroke="none"/></svg>`) },
          { label: 'Tooltip',         route: '/tooltip',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="7" rx="1.5"/><path d="M6 10l2 3 2-3"/></svg>`) },
        ],
      },
      {
        heading: 'Forms',
        collapsed: false,
        items: [
          { label: 'Checkbox',       route: '/checkbox',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="10" height="10" rx="2"/><path d="M5.5 8l2 2 3-3"/></svg>`) },
          { label: 'Combobox',       route: '/combobox',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="12" height="8" rx="1.5"/><path d="M10 8l-2 2-2-2"/></svg>`) },
          { label: 'Input',          route: '/input',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="12" height="6" rx="1.5"/><path d="M5 8h.5"/></svg>`) },
          { label: 'Multi Select',   route: '/multi-select',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="12" height="8" rx="1.5"/><path d="M10 8l-2 2-2-2"/><path d="M5 7h3"/></svg>`) },
          { label: 'Password Input', route: '/password-input',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="8" height="6" rx="1"/><path d="M6 7V5a2 2 0 014 0v2"/></svg>`) },
          { label: 'Radio',          route: '/radio',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="8" r="5.5"/><circle cx="8" cy="8" r="2.5" fill="currentColor" stroke="none"/></svg>`) },
          { label: 'Select',         route: '/select',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="12" height="8" rx="1.5"/><path d="M10 8l-2 2-2-2"/></svg>`) },
          { label: 'Switch',         route: '/switch',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="2" y="5" width="12" height="6" rx="3"/><circle cx="11" cy="8" r="2" fill="currentColor" stroke="none"/></svg>`) },
          { label: 'Textarea',       route: '/textarea',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M5 6h6M5 9h4"/></svg>`) },
        ],
      },
      {
        heading: 'Utilities',
        collapsed: false,
        items: [
          { label: 'Advanced Filters', route: '/filters',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h12M4 8h8M6 12h4"/></svg>`) },
          { label: 'App Shell',        route: '/app-shell',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="1.5"/><path d="M2 6h12M6 6v8"/></svg>`) },
          { label: 'Header',           route: '/header',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M2 7h12"/></svg>`) },
          { label: 'Search',           route: '/search',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5l3 3"/></svg>`) },
          { label: 'Sidebar',          route: '/sidebar',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="1.5"/><path d="M6 2v12"/></svg>`) },
          { label: 'Toast',            route: '/toast',
            icon: i(`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="12" height="8" rx="1.5"/><path d="M5 5V4a3 3 0 016 0v1"/><path d="M6 9l1.5 1.5L11 8"/></svg>`) },
        ],
      },
    ];

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.isHome = e.urlAfterRedirects === '/';
      this.expandParentForRoute(e.urlAfterRedirects);
      this.clearSearch();
    });
    this.expandParentForRoute(this.router.url);
  }

  asInput(t: EventTarget | null): HTMLInputElement { return t as HTMLInputElement; }
  trackByIndex(_i: number): number { return _i; }

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

