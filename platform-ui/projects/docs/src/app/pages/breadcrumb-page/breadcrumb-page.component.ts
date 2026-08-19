import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-breadcrumb-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, BreadcrumbComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumb-page.component.html',
  styleUrls: ['./breadcrumb-page.component.scss'],
})
export class BreadcrumbPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  angularCode = `import { BreadcrumbComponent, BreadcrumbItem } from '@bhairab-patra/platform-ui';

@Component({
  imports: [BreadcrumbComponent],
  template: \`
    <pui-lib-breadcrumb
      [items]="crumbs"
      separator="chevron"
      ariaLabel="Page navigation">
    </pui-lib-breadcrumb>
  \`
})
export class MyComponent {
  crumbs: BreadcrumbItem[] = [
    { label: 'Home',     route: '/',         iconName: 'home'    },
    { label: 'Products', route: '/products', iconName: 'folder'  },
    { label: 'Widget'                                            },
  ];
}`;

  reactCode = `import { useRef, useEffect } from 'react';
import '@bhairab-patra/platform-ui';

function ProductPageHeader() {
  const bcRef = useRef(null);

  useEffect(() => {
    if (bcRef.current) {
      bcRef.current.items = [
        { label: 'Home',     href: '/'          },
        { label: 'Products', href: '/products'  },
        { label: 'Details'                      },
      ];
    }
  }, []);

  return (
    <div className="page-header">
      <nav className="page-header__nav">
        <pui-lib-breadcrumb ref={bcRef} separator="chevron" />
      </nav>
      <h3 className="page-header__title">Product Details</h3>
      <p className="page-header__sub">Manage and update product information</p>
    </div>
  );
}`;

  htmlCode = `<pui-lib-breadcrumb id="bc" separator="slash"></pui-lib-breadcrumb>

<script>
customElements.whenDefined('pui-lib-breadcrumb').then(() => {
  document.getElementById('bc').items = [
    { label: 'Home',     route: '/'         },
    { label: 'Products', route: '/products' },
    { label: 'Widget'                       },
  ];
});
</script>

<!-- CSS variable theming -->
<style>
  pui-lib-breadcrumb {
    --pui-bc-link-color:   #0fa78d;
    --pui-bc-active-color: #111827;
    --pui-bc-sep-color:    #d1d5db;
    --pui-bc-size:         13px;
  }
</style>`;

  basic: BreadcrumbItem[] = [
    { label: 'Home',     route: '/' },
    { label: 'Settings', route: '/settings' },
    { label: 'Profile' },
  ];

  separators = [
    { name: 'chevron' },
    { name: 'slash'   },
    { name: 'dot'     },
    { name: 'arrow'   },
  ];

  deepPath: BreadcrumbItem[] = [
    { label: 'Home',        route: '/'                   },
    { label: 'Platform',    route: '/platform'           },
    { label: 'Engineering', route: '/platform/eng'       },
    { label: 'Services',    route: '/platform/eng/svc'   },
    { label: 'Auth API'                                  },
  ];

  withIcons: BreadcrumbItem[] = [
    { label: 'Home',       route: '/',          iconName: 'home'     },
    { label: 'Settings',   route: '/settings',  iconName: 'settings' },
    { label: 'Profile',                          iconName: 'user'     },
  ];

  xfwRows = [
    { name: 'items',     angular: '[items]="items"',          attr: '—',                 js: 'el.items = [...]'           },
    { name: 'separator', angular: 'separator="slash"',        attr: 'separator="slash"', js: 'el.separator = "slash"'     },
    { name: 'ariaLabel', angular: 'ariaLabel="Navigation"',   attr: 'aria-label="…"',    js: 'el.ariaLabel = "…"'         },
  ];

  cssTokenRows = [
    { token: '--pui-bc-link-color',    default: 'var(--pui-neutral-500)', controls: 'Ancestor link text colour'         },
    { token: '--pui-bc-link-hover',    default: 'var(--pui-brand)',       controls: 'Ancestor link hover colour'        },
    { token: '--pui-bc-link-bg-hover', default: 'rgba(18,198,168,.08)',   controls: 'Ancestor link hover background'    },
    { token: '--pui-bc-active-color',  default: 'var(--pui-neutral-900)', controls: 'Current page text colour'          },
    { token: '--pui-bc-active-bg',     default: 'rgba(18,198,168,.07)',   controls: 'Current page background tint'      },
    { token: '--pui-bc-sep-color',     default: 'var(--pui-neutral-300)', controls: 'Separator icon / glyph colour'     },
    { token: '--pui-bc-size',          default: '13px',                   controls: 'Font size for all crumb items'     },
  ];

  api: ApiRow[] = [
    { input: 'items',     type: 'BreadcrumbItem[]', default: '[]',        description: 'Navigation items. Each has a label, optional route, optional iconName (platform icon registry key), and optional icon (raw SVG fallback).' },
    { input: 'separator', type: `'chevron'|'slash'|'dot'|'arrow'`, default: `'chevron'`, description: 'Visual separator rendered between breadcrumb items.' },
    { input: 'ariaLabel', type: 'string',            default: `'Breadcrumb'`, description: 'Accessible label for the <nav> landmark element.' },
  ];
  trackByIndex(_i: number): number { return _i; }
}
