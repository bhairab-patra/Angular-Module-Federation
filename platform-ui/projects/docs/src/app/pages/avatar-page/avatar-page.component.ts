import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PuiAvatarComponent } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-avatar-page',
  standalone: true,
  imports: [NgIf, NgFor, DocPageComponent, PuiAvatarComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './avatar-page.component.html',
  styleUrls: ['./avatar-page.component.scss'],
})
export class AvatarPageComponent {

  lastAction = '';
  onAction(action: string): void { this.lastAction = action; }

  trackByIndex(_i: number): number { return _i; }

  menuItems = [
    { label: 'Change password', action: 'change-password', iconName: 'edit' },
    { label: 'Account settings', action: 'account-settings', iconName: 'settings' },
    { label: 'Log out', action: 'logout', iconName: 'logout', danger: true, dividerBefore: true },
  ];

  // ── Code snippets ──────────────────────────────────────────────────────

  angularCode = `import { PuiAvatarComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [PuiAvatarComponent],
  template: \`
    <pui-lib-avatar
      name="Admin hub"
      email="adminhub@solifi.com"
      [menuItems]="menuItems"
      (menuAction)="onMenuAction($event)">
    </pui-lib-avatar>
  \`
})
export class MyComponent {
  menuItems = [
    { label: 'Change password',  action: 'change-password',  iconName: 'edit'     },
    { label: 'Account settings', action: 'account-settings', iconName: 'settings' },
    { label: 'Log out', action: 'logout', iconName: 'logout', danger: true, dividerBefore: true },
  ];

  onMenuAction(action: string) {
    if (action === 'logout') { /* sign the user out */ }
  }
}`;

  reactCode = `import { useRef, useEffect } from 'react';
// Import once in main.tsx: import '@bhairab-patra/platform-ui/elements';

export function UserMenu() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.menuItems = [
      { label: 'Change password',  action: 'change-password',  iconName: 'edit'     },
      { label: 'Account settings', action: 'account-settings', iconName: 'settings' },
      { label: 'Log out', action: 'logout', iconName: 'logout', danger: true, dividerBefore: true },
    ];

    const onAction = (e) => console.log('action:', e.detail);
    el.addEventListener('menuAction', onAction);
    return () => el.removeEventListener('menuAction', onAction);
  }, []);

  return (
    <pui-lib-avatar
      ref={ref}
      name="Admin hub"
      email="adminhub@solifi.com"
    />
  );
}`;

  htmlCode = `<!-- 1. Load bundle once -->
<script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js" defer></script>
<link rel="stylesheet" href="node_modules/@bhairab-patra/platform-ui/elements/styles.css">

<!-- 2. Declare the element -->
<pui-lib-avatar id="userMenu" name="Admin hub" email="adminhub@solifi.com"></pui-lib-avatar>

<!-- 3. Menu items and events via JavaScript -->
<script>
  customElements.whenDefined('pui-lib-avatar').then(() => {
    const el = document.getElementById('userMenu');

    el.menuItems = [
      { label: 'Change password',  action: 'change-password',  iconName: 'edit'     },
      { label: 'Account settings', action: 'account-settings', iconName: 'settings' },
      { label: 'Log out', action: 'logout', iconName: 'logout', danger: true, dividerBefore: true },
    ];

    el.addEventListener('menuAction', (e) => {
      if (e.detail === 'logout') location.href = '/logout';
    });
  });
</script>`;

  // ── API table ──────────────────────────────────────────────────────────

  api: ApiRow[] = [
    { input: 'name', type: 'string', default: `''`, description: 'Full name — shown next to the avatar and used to derive initials.' },
    { input: 'email', type: 'string', default: `''`, description: 'Email shown below the name.' },
    { input: 'avatarUrl', type: 'string', default: `''`, description: 'Photo URL. When set, the avatar renders as a circle; otherwise a rounded-square initials chip.' },
    { input: 'size', type: `'sm'|'md'|'lg'`, default: `'md'`, description: 'Avatar chip size — sm 32px, md 40px, lg 48px.' },
    { input: 'collapsed', type: 'boolean | string', default: 'false', description: 'Render only the avatar chip (no name/email card) — for collapsed sidebars. Accepts true / "true".' },
    { input: 'menuItems', type: 'AvatarMenuItem[] | string', default: '[]', description: '{ label, action, iconName?, danger?, dividerBefore? }[] or JSON string — dropdown items. Card is not clickable when empty.' },
    { input: 'menuAction', type: 'EventEmitter<string>', default: '—', description: 'Output — emits item.action string when a menu item is clicked.' },
    { input: 'openChange', type: 'EventEmitter<boolean>', default: '—', description: 'Output — emits true/false whenever the dropdown opens or closes.' },
  ];

  xfwRows = [
    { name: 'name', angular: 'name="Admin hub"', attr: 'name="Admin hub"', js: 'el.name = "Admin hub"' },
    { name: 'email', angular: 'email="adminhub@solifi.com"', attr: 'email="adminhub@solifi.com"', js: 'el.email = "adminhub@solifi.com"' },
    { name: 'avatarUrl', angular: 'avatarUrl="/me.jpg"', attr: 'avatar-url="/me.jpg"', js: 'el.avatarUrl = "/me.jpg"' },
    { name: 'collapsed', angular: '[collapsed]="true"', attr: 'collapsed="true"', js: 'el.collapsed = true' },
    { name: 'menuItems', angular: '[menuItems]="items"', attr: '— use JS property', js: 'el.menuItems = [...]' },
    { name: 'menuAction', angular: '(menuAction)="fn($event)"', attr: '— use addEventListener', js: 'el.addEventListener("menuAction", fn)' },
  ];
}
