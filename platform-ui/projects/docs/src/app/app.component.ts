import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';
import {
  PuiToastContainerComponent,
  PuiSolifiSidebarComponent,
  SolifiNavGroup,
  SolifiNavItem,
} from '@solifi/platform-ui';

interface SearchItem {
  label: string;
  route: string;
  category: string;
  keywords: string[];
}

@Component({
  selector: 'docs-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgIf,
    PuiToastContainerComponent,
    PuiSolifiSidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isHome = true;
  sidebarCollapsed = false;
  activeId = '';

  readonly logoSrc = 'assets/logo.png';

  readonly sidebarLogoCss = `
    .ssb__logo {
      width: auto !important;
      justify-content: flex-start !important;
    }
    .ssb__logo-img {
      width: auto !important;
      height: 26px !important;
      max-width: 44px;
      object-fit: contain;
    }
    .ssb:not(.ssb--collapsed) .ssb__logo-img {
      height: 36px !important;
      max-width: 120px;
    }
    .ssb__brand-name {
      font-size: 16px !important;
    }
  `;

  groups: SolifiNavGroup[] = [];

  private allItems: SearchItem[] = [
    {
      label: 'Introduction',
      route: '/',
      category: 'Getting Started',
      keywords: ['intro', 'overview', 'start'],
    },
    {
      label: 'Getting Started',
      route: '/getting-started',
      category: 'Getting Started',
      keywords: ['install', 'setup', 'guide'],
    },
    {
      label: 'Button',
      route: '/button',
      category: 'Component',
      keywords: [
        'btn',
        'click',
        'primary',
        'secondary',
        'outline',
        'destructive',
        'chip',
        'upload',
      ],
    },
    {
      label: 'Icon Button',
      route: '/icon-button',
      category: 'Component',
      keywords: ['icon button', 'btn', 'icon-only', 'circle', 'square', 'toolbar', 'row action'],
    },
    {
      label: 'Card',
      route: '/card',
      category: 'Component',
      keywords: ['container', 'panel', 'box'],
    },
    {
      label: 'Badge',
      route: '/badge',
      category: 'Component',
      keywords: ['tag', 'label', 'status', 'pill'],
    },
    {
      label: 'Modal',
      route: '/modal',
      category: 'Component',
      keywords: ['dialog', 'popup', 'overlay', 'confirm'],
    },
    {
      label: 'Form Dialog',
      route: '/form-dialog',
      category: 'Component',
      keywords: ['form', 'dialog', 'modal', 'add', 'edit', 'fields', 'input', 'select', 'textarea'],
    },
    {
      label: 'Confirm Dialog',
      route: '/confirm-dialog',
      category: 'Component',
      keywords: [
        'confirm',
        'dialog',
        'modal',
        'delete',
        'destructive',
        'prompt',
        'alert',
        'warning',
      ],
    },
    {
      label: 'Discard Dialog',
      route: '/discard-dialog',
      category: 'Component',
      keywords: [
        'discard',
        'unsaved',
        'changes',
        'dirty',
        'confirm',
        'dialog',
        'form',
        'leave',
        'cancel',
        'close',
        'lost',
      ],
    },
    {
      label: 'Header',
      route: '/header',
      category: 'Component',
      keywords: ['navbar', 'topbar', 'navigation'],
    },
    {
      label: 'Footer',
      route: '/footer',
      category: 'Component',
      keywords: ['footer', 'bottom bar', 'copyright', 'disclaimer', 'contact', 'office hours'],
    },
    {
      label: 'Popover',
      route: '/popover',
      category: 'Component',
      keywords: ['popover', 'floating', 'panel', 'anchor', 'card', 'flyout'],
    },
    {
      label: 'Context Menu',
      route: '/context-menu',
      category: 'Component',
      keywords: ['context menu', 'right click', 'right-click', 'dropdown', 'contextmenu'],
    },
    {
      label: 'Empty State',
      route: '/empty-state',
      category: 'Component',
      keywords: ['empty state', 'no data', 'no results', 'placeholder', 'blank'],
    },
    {
      label: 'Dropzone',
      route: '/dropzone',
      category: 'Component',
      keywords: ['dropzone', 'file upload', 'drag and drop', 'drag drop', 'attachment', 'browse'],
    },
    {
      label: 'Icon',
      route: '/icon',
      category: 'Component',
      keywords: ['svg', 'glyph', 'symbol', 'figma', 'arrow', 'check', 'search'],
    },
    {
      label: 'Typography',
      route: '/typography',
      category: 'Foundation',
      keywords: ['poppins', 'font', 'type', 'scale', 'heading', 'body', 'weight', 'install'],
    },
    {
      label: 'Breadcrumb',
      route: '/breadcrumb',
      category: 'Component',
      keywords: ['nav', 'navigation', 'trail', 'crumb', 'path', 'location'],
    },
    {
      label: 'Spinner',
      route: '/spinner',
      category: 'Component',
      keywords: ['loading', 'loader', 'progress', 'overlay', 'dash', 'dots'],
    },
    {
      label: 'Tooltip',
      route: '/tooltip',
      category: 'Component',
      keywords: ['hover', 'popover', 'hint', 'tip', 'label', 'position'],
    },
    {
      label: 'Input',
      route: '/input',
      category: 'Form',
      keywords: ['text', 'email', 'password', 'number', 'field', 'clearable', 'prefix', 'suffix'],
    },
    {
      label: 'Label',
      route: '/label',
      category: 'Form',
      keywords: ['label', 'field', 'required', 'asterisk', 'info', 'tooltip', 'hint'],
    },
    {
      label: 'Select',
      route: '/select',
      category: 'Form',
      keywords: ['dropdown', 'option', 'choose', 'picker'],
    },
    {
      label: 'Checkbox',
      route: '/checkbox',
      category: 'Form',
      keywords: ['check', 'tick', 'indeterminate', 'agree', 'toggle'],
    },
    {
      label: 'Radio',
      route: '/radio',
      category: 'Form',
      keywords: ['radio', 'group', 'single', 'choose', 'option'],
    },
    {
      label: 'Textarea',
      route: '/textarea',
      category: 'Form',
      keywords: ['multiline', 'paragraph', 'long text', 'comment', 'rows', 'resize'],
    },
    {
      label: 'Switch',
      route: '/switch',
      category: 'Form',
      keywords: ['toggle', 'on off', 'boolean', 'enable', 'disable'],
    },
    {
      label: 'Search',
      route: '/search',
      category: 'Component',
      keywords: ['search', 'autocomplete', 'suggestions', 'debounce', 'filter', 'find'],
    },
    {
      label: 'Toast',
      route: '/toast',
      category: 'Component',
      keywords: ['notification', 'alert', 'snackbar', 'success', 'error', 'warning', 'info'],
    },
    {
      label: 'Solifi Sidebar',
      route: '/solifi-sidebar',
      category: 'Component',
      keywords: [
        'solifi',
        'sidebar',
        'navigation',
        'branded',
        'dark',
        'navy',
        'icon rail',
        'collapse',
        'flat',
      ],
    },
    {
      label: 'App Shell',
      route: '/app-shell',
      category: 'Component',
      keywords: [
        'app shell',
        'shell',
        'layout',
        'header',
        'sidebar',
        'full page',
        'navigation',
        'frame',
      ],
    },
    {
      label: 'Primary Layout',
      route: '/templates/primary-layout',
      category: 'Template',
      keywords: [
        'template',
        'starter',
        'primary layout',
        'app shell',
        'layout',
        'copy paste',
        'boilerplate',
        'app.component',
      ],
    },
    {
      label: 'Table Layout',
      route: '/templates/table-layout',
      category: 'Template',
      keywords: [
        'template',
        'starter',
        'table layout',
        'data table',
        'orders',
        'sortable',
        'searchable',
        'paginated',
        'selectable',
        'actions',
        'copy paste',
      ],
    },
    {
      label: 'Form Layout',
      route: '/templates/form-layout',
      category: 'Template',
      keywords: [
        'template',
        'starter',
        'form layout',
        'reactive form',
        'form group',
        'validation',
        'customer details',
        'input',
        'password',
        'select',
        'radio',
        'datepicker',
        'multiselect',
        'combobox',
        'textarea',
        'switch',
        'checkbox',
        'copy paste',
      ],
    },
    {
      label: 'Display Table',
      route: '/table/display',
      category: 'Component',
      keywords: [
        'table',
        'display',
        'sort',
        'search',
        'sticky',
        'badge',
        'action',
        'menu',
        'tooltip',
      ],
    },
    {
      label: 'Data Grid',
      route: '/table/data-grid',
      category: 'Component',
      keywords: [
        'datagrid',
        'table',
        'pagination',
        'paginate',
        'selection',
        'selectable',
        'data',
        'grid',
        'sort',
        'search',
      ],
    },
    {
      label: 'Editable Table',
      route: '/table/editable',
      category: 'Component',
      keywords: [
        'editable',
        'table',
        'inline',
        'edit',
        'row',
        'form',
        'dialog',
        'confirm',
        'delete',
      ],
    },
    {
      label: 'Tabs',
      route: '/tabs',
      category: 'Component',
      keywords: ['tabs', 'tab', 'panel', 'navigation', 'line', 'pill', 'card', 'switch', 'active'],
    },
    {
      label: 'Date Picker',
      route: '/datepicker',
      category: 'Component',
      keywords: ['date', 'datepicker', 'calendar', 'picker', 'range', 'input', 'schedule', 'time'],
    },
    {
      label: 'Multi Select',
      route: '/multi-select',
      category: 'Form',
      keywords: [
        'multiselect',
        'multi',
        'select',
        'dropdown',
        'chips',
        'tags',
        'checkbox',
        'multiple',
        'search',
      ],
    },
    {
      label: 'Password Input',
      route: '/password-input',
      category: 'Form',
      keywords: [
        'password',
        'input',
        'strength',
        'show',
        'hide',
        'reveal',
        'toggle',
        'copy',
        'secure',
        'validation',
      ],
    },
    {
      label: 'Skeleton Loader',
      route: '/skeleton',
      category: 'Component',
      keywords: [
        'skeleton',
        'loader',
        'loading',
        'placeholder',
        'shimmer',
        'pulse',
        'ghost',
        'spinner',
      ],
    },
    {
      label: 'Chip',
      route: '/chip',
      category: 'Component',
      keywords: ['chip', 'tag', 'filter', 'removable', 'selectable', 'pill', 'toggle', 'input'],
    },
    {
      label: 'Tag',
      route: '/tag',
      category: 'Component',
      keywords: ['tag', 'label', 'badge', 'status', 'category', 'pill', 'uppercase'],
    },
    {
      label: 'List',
      route: '/list',
      category: 'Component',
      keywords: [
        'list',
        'items',
        'selectable',
        'bordered',
        'striped',
        'flush',
        'menu',
        'navigation',
      ],
    },
    {
      label: 'Menu',
      route: '/menu',
      category: 'Component',
      keywords: [
        'menu',
        'dropdown',
        'submenu',
        'context',
        'actions',
        'popover',
        'trigger',
        'select',
      ],
    },
    {
      label: 'Simple Pagination',
      route: '/simple-pagination',
      category: 'Component',
      keywords: [
        'pagination',
        'simple',
        'page',
        'pager',
        'pages',
        'next',
        'previous',
        'navigate',
        'text',
        'link',
        'minimal',
        'ellipsis',
      ],
    },
    {
      label: 'Accordion',
      route: '/accordion',
      category: 'Component',
      keywords: [
        'accordion',
        'expand',
        'collapse',
        'faq',
        'panel',
        'toggle',
        'disclosure',
        'content',
        'sections',
      ],
    },
    {
      label: 'Avatar',
      route: '/avatar',
      category: 'Component',
      keywords: [
        'avatar',
        'user',
        'profile',
        'menu',
        'dropdown',
        'account',
        'logout',
        'sign out',
        'card',
        'initials',
        'photo',
      ],
    },
  ];

  searchQuery = '';
  suggestions: SearchItem[] = [];
  focusedIndex = -1;

  theme: 'new' | 'old' = 'new';

  private applyThemeAttribute(t: 'new' | 'old'): void {
    this.theme = t;
    document.documentElement.setAttribute('data-pui-theme', t);
  }

  setTheme(t: 'new' | 'old'): void {
    localStorage.setItem('pui-docs-theme', t);
    if (t === this.theme) return;
    window.location.reload();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onNavSelect(item: SolifiNavItem): void {
    if (item.route) this.navigate(item.route);
  }

  private deriveActiveId(url: string): string {
    let best = '';
    let bestLen = -1;
    for (const group of this.groups) {
      for (const item of group.items) {
        for (const candidate of [item, ...(item.children ?? [])]) {
          if (
            candidate.route &&
            (url === candidate.route || url.startsWith(candidate.route + '/'))
          ) {
            if (candidate.route.length > bestLen) {
              best = candidate.id;
              bestLen = candidate.route.length;
            }
          }
        }
      }
    }
    return best;
  }

  constructor(
    private router: Router,
    private el: ElementRef,
  ) {
    this.groups = [
      {
        id: 'getting-started',
        label: 'Getting Started',
        items: [
          {
            id: 'getting-started-group',
            label: 'Getting Started',
            iconName: 'sparkle',
            children: [
              {
                id: 'getting-started-angular',
                label: 'Angular',
                route: '/getting-started/angular',
              },
              { id: 'getting-started-react', label: 'React', route: '/getting-started/react' },
              { id: 'getting-started-html', label: 'Plain HTML', route: '/getting-started/html' },
            ],
          },
        ],
      },
      {
        id: 'templates',
        label: 'Templates',
        items: [
          {
            id: 'templates-primary-layout',
            label: 'Primary Layout',
            route: '/templates/primary-layout',
            iconName: 'layout-primary',
          },
          {
            id: 'templates-table-layout',
            label: 'Table Layout',
            route: '/templates/table-layout',
            iconName: 'table',
          },
          {
            id: 'templates-form-layout',
            label: 'Form Layout',
            route: '/templates/form-layout',
            iconName: 'layout-form',
          },
        ],
      },
      {
        id: 'foundation',
        label: 'Foundation',
        items: [
          {
            id: 'typography',
            label: 'Typography',
            route: '/typography',
            iconName: 'typography',
          },
        ],
      },
      {
        id: 'components',
        label: 'Components',
        items: [
          {
            id: 'badge',
            label: 'Badge',
            route: '/badge',
            iconName: 'badge',
          },
          {
            id: 'breadcrumb',
            label: 'Breadcrumb',
            route: '/breadcrumb',
            iconName: 'breadcrumb',
          },
          {
            id: 'button',
            label: 'Button',
            route: '/button',
            iconName: 'button-shape',
          },
          {
            id: 'icon-button',
            label: 'Icon Button',
            route: '/icon-button',
            iconName: 'icon-button',
          },
          {
            id: 'card',
            label: 'Card',
            route: '/card',
            iconName: 'card',
          },
          {
            id: 'chip',
            label: 'Chip',
            route: '/chip',
            iconName: 'chip',
          },
          {
            id: 'datepicker',
            label: 'Date Picker',
            route: '/datepicker',
            iconName: 'calendar',
          },
          {
            id: 'icon',
            label: 'Icon',
            route: '/icon',
            iconName: 'sparkle',
          },
          {
            id: 'list',
            label: 'List',
            route: '/list',
            iconName: 'list',
          },
          {
            id: 'menu',
            label: 'Menu',
            route: '/menu',
            iconName: 'menu-box',
          },
          {
            id: 'modal-group',
            label: 'Modal',
            iconName: 'modal',
            children: [
              { id: 'modal', label: 'Modal', route: '/modal' },
              { id: 'form-dialog', label: 'Form Dialog', route: '/form-dialog' },
              { id: 'confirm-dialog', label: 'Confirm Dialog', route: '/confirm-dialog' },
              { id: 'discard-dialog', label: 'Discard Dialog', route: '/discard-dialog' },
            ],
          },
          {
            id: 'skeleton',
            label: 'Skeleton Loader',
            route: '/skeleton',
            iconName: 'skeleton',
          },
          {
            id: 'spinner',
            label: 'Spinner',
            route: '/spinner',
            iconName: 'spinner-dashed',
          },
          {
            id: 'table-group',
            label: 'Table',
            iconName: 'table',
            children: [
              { id: 'table-display', label: 'Display Table', route: '/table/display' },
              { id: 'table-data-grid', label: 'Data Grid', route: '/table/data-grid' },
              { id: 'table-editable', label: 'Editable Table', route: '/table/editable' },
            ],
          },
          {
            id: 'accordion',
            label: 'Accordion',
            route: '/accordion',
            iconName: 'accordion',
          },
          {
            id: 'avatar',
            label: 'Avatar',
            route: '/avatar',
            iconName: 'user',
          },
          {
            id: 'simple-pagination',
            label: 'Simple Pagination',
            route: '/simple-pagination',
            iconName: 'pagination',
          },
          {
            id: 'tabs',
            label: 'Tabs',
            route: '/tabs',
            iconName: 'tabs',
          },
          {
            id: 'tag',
            label: 'Tag',
            route: '/tag',
            iconName: 'tag',
          },
          {
            id: 'tooltip',
            label: 'Tooltip',
            route: '/tooltip',
            iconName: 'tooltip',
          },
        ],
      },
      {
        id: 'forms',
        label: 'Forms',
        items: [
          {
            id: 'checkbox',
            label: 'Checkbox',
            route: '/checkbox',
            iconName: 'checkbox',
          },
          {
            id: 'input',
            label: 'Input',
            route: '/input',
            iconName: 'input',
          },
          {
            id: 'label',
            label: 'Label',
            route: '/label',
            iconName: 'tag',
          },
          {
            id: 'multi-select',
            label: 'Multi Select',
            route: '/multi-select',
            iconName: 'multi-select',
          },
          {
            id: 'password-input',
            label: 'Password Input',
            route: '/password-input',
            iconName: 'lock',
          },
          {
            id: 'radio',
            label: 'Radio',
            route: '/radio',
            iconName: 'radio',
          },
          {
            id: 'select',
            label: 'Select',
            route: '/select',
            iconName: 'select',
          },
          {
            id: 'switch',
            label: 'Switch',
            route: '/switch',
            iconName: 'switch',
          },
          {
            id: 'textarea',
            label: 'Textarea',
            route: '/textarea',
            iconName: 'textarea',
          },
        ],
      },
      {
        id: 'utilities',
        label: 'Utilities',
        items: [
          {
            id: 'app-shell',
            label: 'App Shell',
            route: '/app-shell',
            iconName: 'app-shell',
          },
          {
            id: 'header',
            label: 'Header',
            route: '/header',
            iconName: 'header-bar',
          },
          {
            id: 'footer',
            label: 'Footer',
            route: '/footer',
            iconName: 'footer-bar',
          },
          {
            id: 'popover',
            label: 'Popover',
            route: '/popover',
            iconName: 'tooltip',
          },
          {
            id: 'context-menu',
            label: 'Context Menu',
            route: '/context-menu',
            iconName: 'context-menu',
          },
          {
            id: 'empty-state',
            label: 'Empty State',
            route: '/empty-state',
            iconName: 'empty-state',
          },
          {
            id: 'dropzone',
            label: 'Dropzone',
            route: '/dropzone',
            iconName: 'upload',
          },
          {
            id: 'search',
            label: 'Search',
            route: '/search',
            iconName: 'search',
          },
          {
            id: 'solifi-sidebar',
            label: 'Solifi Sidebar',
            route: '/solifi-sidebar',
            iconName: 'sidebar-nav',
          },
          {
            id: 'toast',
            label: 'Toast',
            route: '/toast',
            iconName: 'toast',
          },
        ],
      },
    ];

    const savedTheme = localStorage.getItem('pui-docs-theme');
    this.applyThemeAttribute(savedTheme === 'old' ? 'old' : 'new');

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.isHome = e.urlAfterRedirects === '/';
        this.activeId = this.deriveActiveId(e.urlAfterRedirects);
        this.clearSearch();
      });
    this.activeId = this.deriveActiveId(this.router.url);
  }

  asInput(t: EventTarget | null): HTMLInputElement {
    return t as HTMLInputElement;
  }
  trackByIndex(_i: number): number {
    return _i;
  }

  onSearch(q: string): void {
    this.searchQuery = q;
    this.focusedIndex = -1;
    const term = q.trim().toLowerCase();
    if (!term) {
      this.suggestions = [];
      return;
    }
    this.suggestions = this.allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.keywords.some((k) => k.includes(term)),
    );
  }

  moveFocus(dir: number): void {
    if (!this.suggestions.length) return;
    this.focusedIndex =
      (this.focusedIndex + dir + this.suggestions.length) % this.suggestions.length;
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
    this.searchQuery = '';
    this.suggestions = [];
    this.focusedIndex = -1;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target)) this.clearSearch();
  }
}
