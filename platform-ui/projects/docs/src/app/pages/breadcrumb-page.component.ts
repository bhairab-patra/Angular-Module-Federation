import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { BreadcrumbComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';
import { BreadcrumbItem } from '@solifi/platform-ui';

@Component({
  selector: 'docs-breadcrumb-page',
  standalone: true,
  imports: [DocPageComponent, BreadcrumbComponent, NgFor],
  template: `
    <docs-page
      title="Breadcrumb"
      description="Navigation trail showing the user's location. Supports chevron, slash, dot, and arrow separators with optional icons on any item."
      [code]="code"
      [api]="api">

      <ng-container demo>

        <!-- ── Basic ── -->
        <div class="section-divider"><span class="section-tag">Basic</span></div>
        <pui-breadcrumb [items]="basic"></pui-breadcrumb>

        <!-- ── Separators ── -->
        <div class="section-divider"><span class="section-tag">Separators</span></div>
        <div class="sep-grid">
          <div *ngFor="let s of separators" class="sep-row">
            <span class="sep-label">{{ s.type }}</span>
            <pui-breadcrumb [items]="basic" [separator]="s.type"></pui-breadcrumb>
          </div>
        </div>

        <!-- ── With home icon ── -->
        <div class="section-divider"><span class="section-tag">With Icons</span></div>
        <pui-breadcrumb [items]="withIcons" separator="chevron"></pui-breadcrumb>

        <!-- ── Long path ── -->
        <div class="section-divider"><span class="section-tag">Deep Path</span></div>
        <pui-breadcrumb [items]="deepPath" separator="chevron"></pui-breadcrumb>

        <!-- ── Inside a page header ── -->
        <div class="section-divider"><span class="section-tag">In Page Header (Real-world)</span></div>
        <div class="page-header-demo">
          <div class="page-header-demo__bar">
            <div class="ph-left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   style="cursor:pointer">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              <pui-breadcrumb [items]="realWorld" separator="chevron"></pui-breadcrumb>
            </div>
          </div>
          <div class="ph-body">
            <h2 class="ph-title">ils — ILS-Test</h2>
            <p class="ph-sub">Product environment details and tools</p>
          </div>
        </div>

        <!-- ── Slash style ── -->
        <div class="section-divider"><span class="section-tag">Slash — URL Style</span></div>
        <pui-breadcrumb [items]="urlStyle" separator="slash"></pui-breadcrumb>

      </ng-container>
    </docs-page>
  `,
  styles: [`
    .section-divider {
      display: flex; align-items: center; gap: 12px; width: 100%;
      border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 4px;
    }
    .section-tag {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .07em; color: #9ca3af; white-space: nowrap;
    }

    /* Separator grid */
    .sep-grid { display: flex; flex-direction: column; gap: 14px; padding: 16px 0 8px; }
    .sep-row { display: flex; align-items: center; gap: 24px; }
    .sep-label {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .07em; color: #9ca3af; width: 60px; flex-shrink: 0;
      font-family: monospace;
    }

    /* Page header demo */
    .page-header-demo {
      border: 1px solid #e5e7eb; border-radius: 12px;
      overflow: hidden; margin: 16px 0 8px;
    }
    .page-header-demo__bar {
      background: #12C6A8; padding: 14px 20px;
    }
    .ph-left { display: flex; align-items: center; gap: 12px; }
    /* Override breadcrumb colours for teal bar */
    .ph-left pui-breadcrumb { --pui-bc-link-color: rgba(255,255,255,.75); --pui-bc-active-color: #fff; --pui-bc-sep-color: rgba(255,255,255,.4); --pui-bc-link-hover: #fff; }
    .ph-body { padding: 16px 20px; background: #f9fafb; }
    .ph-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 4px; font-family: 'Poppins', system-ui, sans-serif; }
    .ph-sub   { font-size: 13px; color: #6b7280; margin: 0; font-family: 'Poppins', system-ui, sans-serif; }
  `],
})
export class BreadcrumbPageComponent {

  basic: BreadcrumbItem[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Settings',  route: '/settings'  },
    { label: 'Profile' },
  ];

  separators = [
    { type: 'chevron' as const },
    { type: 'slash'   as const },
    { type: 'dot'     as const },
    { type: 'arrow'   as const },
  ];

  withIcons: BreadcrumbItem[] = [
    {
      label: 'Home', route: '/',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    },
    {
      label: 'Users', route: '/users',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    },
    {
      label: 'Bhairab Patra',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    },
  ];

  deepPath: BreadcrumbItem[] = [
    { label: 'Admin',        route: '/admin'           },
    { label: 'Environments', route: '/admin/envs'      },
    { label: 'ILS',          route: '/admin/envs/ils'  },
    { label: 'ILS-Test',     route: '/admin/envs/ils/test' },
    { label: 'Configuration' },
  ];

  realWorld: BreadcrumbItem[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'ils — ILS-Test' },
  ];

  urlStyle: BreadcrumbItem[] = [
    { label: 'solifi.com',  route: '/'        },
    { label: 'platform',    route: '/platform' },
    { label: 'lending',     route: '/platform/lending' },
    { label: 'config' },
  ];

  code = `import { BreadcrumbComponent } from '@solifi/platform-ui';
import { BreadcrumbItem } from '@solifi/platform-ui';

// ── Basic ──────────────────────────────────────────────────────
items: BreadcrumbItem[] = [
  { label: 'Dashboard', route: '/dashboard' },
  { label: 'Settings',  route: '/settings'  },
  { label: 'Profile'                        },  // last = active, no route
];

<pui-breadcrumb [items]="items"></pui-breadcrumb>

// ── Separators: chevron | slash | dot | arrow ──────────────────
<pui-breadcrumb [items]="items" separator="chevron"></pui-breadcrumb>
<pui-breadcrumb [items]="items" separator="slash"></pui-breadcrumb>
<pui-breadcrumb [items]="items" separator="dot"></pui-breadcrumb>
<pui-breadcrumb [items]="items" separator="arrow"></pui-breadcrumb>

// ── With icons ─────────────────────────────────────────────────
items: BreadcrumbItem[] = [
  { label: 'Home', route: '/', icon: '<svg>...</svg>' },
  { label: 'Users', route: '/users', icon: '<svg>...</svg>' },
  { label: 'Bhairab Patra', icon: '<svg>...</svg>' },
];
<pui-breadcrumb [items]="items" separator="chevron"></pui-breadcrumb>

// ── Custom colours via CSS variables ──────────────────────────
// Override in your component's host or a wrapper element:
// --pui-bc-link-color    default #6b7280
// --pui-bc-link-hover    default #12C6A8
// --pui-bc-active-color  default #111827
// --pui-bc-sep-color     default #d1d5db
// --pui-bc-size          default 13px

// Example — white breadcrumb on a dark header:
<div style="--pui-bc-link-color: rgba(255,255,255,.7);
            --pui-bc-active-color: #fff;
            --pui-bc-sep-color: rgba(255,255,255,.35)">
  <pui-breadcrumb [items]="items"></pui-breadcrumb>
</div>`;

  api: ApiRow[] = [
    { input: 'items',     type: 'BreadcrumbItem[]',                                  default: '[]',        description: 'Array of { label, route?, icon? } — last item is the active page' },
    { input: 'separator', type: `'chevron' | 'slash' | 'dot' | 'arrow'`,            default: `'chevron'`, description: 'Visual separator between crumbs' },
    { input: 'ariaLabel', type: 'string',                                            default: `'Breadcrumb'`, description: 'aria-label on the <nav> element for accessibility' },
  ];
}
