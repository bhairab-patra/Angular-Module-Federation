import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { IconButtonComponent, ButtonVariant } from '@bhairab-patra/platform-ui';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-icon-button-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, IconButtonComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-button-page.component.html',
  styleUrls: ['./icon-button-page.component.scss'],
})
export class IconButtonPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  angularCode = `import { IconButtonComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [IconButtonComponent],
  template: \`
    <pui-lib-icon-button
      icon="trash"
      variant="destructive"
      ariaLabel="Delete row"
      (buttonClick)="onDelete()">
    </pui-lib-icon-button>

    <pui-lib-icon-button
      icon="edit"
      variant="secondary-light"
      shape="square"
      size="sm"
      ariaLabel="Edit"
      (buttonClick)="onEdit()">
    </pui-lib-icon-button>
  \`
})
export class MyComponent {
  onDelete() { /* ... */ }
  onEdit()   { /* ... */ }
}`;

  reactCode = `import '@bhairab-patra/platform-ui';

function RowActions({ onEdit, onDelete }) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <pui-lib-icon-button
        icon="edit"
        variant="secondary-light"
        aria-label="Edit"
        onButtonclick={onEdit}>
      </pui-lib-icon-button>
      <pui-lib-icon-button
        icon="trash"
        variant="destructive"
        aria-label="Delete"
        onButtonclick={onDelete}>
      </pui-lib-icon-button>
    </div>
  );
}`;

  htmlCode = `<!-- Load the bundle once in your page -->
<script type="module" src="pui-elements.js"></script>

<pui-lib-icon-button id="btn-delete" icon="trash" variant="destructive" aria-label="Delete"></pui-lib-icon-button>
<pui-lib-icon-button icon="settings" variant="secondary-light" shape="square" aria-label="Settings"></pui-lib-icon-button>

<script>
  document.getElementById('btn-delete')
    .addEventListener('buttonClick', e => console.log('delete clicked'));
</script>`;

  variants: { id: ButtonVariant; label: string }[] = [
    { id: 'primary', label: 'Primary' },
    { id: 'primary-light', label: 'Primary Light' },
    { id: 'primary-outline', label: 'Primary Outline' },
    { id: 'secondary', label: 'Secondary' },
    { id: 'secondary-light', label: 'Secondary Light' },
    { id: 'inverse', label: 'Inverse' },
    { id: 'tertiary-outline', label: 'Tertiary Outline' },
    { id: 'destructive', label: 'Destructive' },
    { id: 'destructive-light', label: 'Destructive Light' },
    { id: 'ghost', label: 'Ghost' },
  ];

  xfwRows = [
    { name: 'icon', angular: 'icon="trash"', attr: 'icon="trash"', js: 'el.icon = "trash"' },
    {
      name: 'variant',
      angular: 'variant="destructive"',
      attr: 'variant="destructive"',
      js: 'el.variant = "destructive"',
    },
    { name: 'shape', angular: 'shape="square"', attr: 'shape="square"', js: 'el.shape = "square"' },
    { name: 'size', angular: 'size="sm"', attr: 'size="sm"', js: 'el.size = "sm"' },
    {
      name: 'ariaLabel',
      angular: 'ariaLabel="Delete"',
      attr: 'aria-label="Delete"',
      js: 'el.ariaLabel = "Delete"',
    },
    {
      name: 'buttonClick',
      angular: '(buttonClick)="fn($event)"',
      attr: '—',
      js: 'el.addEventListener(…)',
    },
  ];

  trackByIndex(_i: number): number {
    return _i;
  }

  api: ApiRow[] = [
    {
      input: 'icon',
      type: 'string',
      default: `''`,
      description:
        'Icon registry name (same names as pui-lib-icon) rendered centered inside the button.',
    },
    {
      input: 'variant',
      type: `ButtonVariant (same as pui-lib-button)`,
      default: `'primary'`,
      description:
        'Visual style — reuses the exact same variant palette and design tokens as pui-lib-button, so an icon button always matches your regular buttons.',
    },
    {
      input: 'shape',
      type: `'circle'|'square'`,
      default: `'circle'`,
      description: 'Circle for floating/toolbar actions, square for a softer rounded-corner look.',
    },
    {
      input: 'size',
      type: `'sm'|'md'|'lg'`,
      default: `'md'`,
      description: 'Fixed diameter/side length: sm=32px, md=40px, lg=48px.',
    },
    {
      input: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables interaction and reduces opacity to 40%.',
    },
    {
      input: 'ariaLabel',
      type: 'string',
      default: `''`,
      description:
        'Required for accessibility — icon-only buttons have no visible text, so screen readers rely entirely on this.',
    },
    {
      input: 'type',
      type: `'button'|'submit'|'reset'`,
      default: `'button'`,
      description: 'Native HTML button type attribute.',
    },
    {
      input: '(buttonClick)',
      type: 'EventEmitter<MouseEvent>',
      default: '—',
      description: 'Fired on click — suppressed when disabled.',
    },
  ];
}
