import { Component } from '@angular/core';
import { HeaderComponent, ButtonComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-header-page',
  standalone: true,
  imports: [DocPageComponent, HeaderComponent, ButtonComponent],
  template: `
    <docs-page
      title="Header"
      description="Top app bar with brand title, navigation links, and an avatar slot."
      [code]="code"
      [api]="api">

      <ng-container demo>
        <div style="width:100%;display:flex;flex-direction:column;gap:16px">

          <!-- Basic -->
          <div>
            <p style="font-size:12px;color:#94a3b8;margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em">Basic</p>
            <pui-header appTitle="My App" logoText="🛡️"></pui-header>
          </div>

          <!-- With nav links -->
          <div>
            <p style="font-size:12px;color:#94a3b8;margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em">With Nav Links</p>
            <pui-header appTitle="Admin Hub" logoText="⚙️" [navLinks]="navLinks"></pui-header>
          </div>

          <!-- With user avatar + action button -->
          <div>
            <p style="font-size:12px;color:#94a3b8;margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em">With User Avatar & Actions</p>
            <pui-header appTitle="Admin Hub" logoText="⚡" [navLinks]="navLinks" userName="Bhairab Patra">
              <pui-button actions variant="secondary" size="sm">Notifications</pui-button>
            </pui-header>
          </div>
        </div>
      </ng-container>
    </docs-page>
  `,
})
export class HeaderPageComponent {
  navLinks = [
    { label: 'Dashboard', href: '#' },
    { label: 'Users',     href: '#' },
    { label: 'Settings',  href: '#' },
  ];

  code = `import { HeaderComponent } from '@solifi/platform-ui';

<!-- Basic -->
<pui-header appTitle="My App" logoText="🛡️"></pui-header>

<!-- With nav links -->
<pui-header
  appTitle="Admin Hub"
  logoText="⚙️"
  [navLinks]="[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users',     href: '/users' }
  ]">
</pui-header>

<!-- With user avatar -->
<pui-header appTitle="Admin Hub" userName="John Doe">
  <!-- actions slot — renders next to avatar -->
  <pui-button actions size="sm" variant="secondary">Notifications</pui-button>
</pui-header>`;

  api: ApiRow[] = [
    { input: 'appTitle',  type: 'string',     default: `'My App'`, description: 'Brand / app name text' },
    { input: 'logoText',  type: 'string',     default: `''`,       description: 'Emoji or short text before the title' },
    { input: 'navLinks',  type: 'NavLink[]',  default: '[]',       description: 'Array of { label, href } navigation links' },
    { input: 'userName',  type: 'string',     default: `''`,       description: 'Shows avatar with initials when set' },
  ];
}
