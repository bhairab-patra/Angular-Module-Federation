import { Component } from '@angular/core';
import { ButtonComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../shared/doc-page.component';

@Component({
  selector: 'docs-button-page',
  standalone: true,
  imports: [DocPageComponent, ButtonComponent],
  template: `
    <docs-page
      title="Button"
      description="Trigger actions. Four variants, three sizes, loading and disabled states."
      [code]="code"
      [api]="api">

      <ng-container demo>
        <!-- variants -->
        <pui-button variant="primary">Primary</pui-button>
        <pui-button variant="secondary">Secondary</pui-button>
        <pui-button variant="ghost">Ghost</pui-button>
        <pui-button variant="danger">Danger</pui-button>

        <!-- sizes -->
        <pui-button variant="primary" size="sm">Small</pui-button>
        <pui-button variant="primary" size="md">Medium</pui-button>
        <pui-button variant="primary" size="lg">Large</pui-button>

        <!-- states -->
        <pui-button variant="primary" [loading]="true">Loading</pui-button>
        <pui-button variant="primary" [disabled]="true">Disabled</pui-button>
      </ng-container>
    </docs-page>
  `,
})
export class ButtonPageComponent {
  code = `import { ButtonComponent } from '@solifi/platform-ui';

<!-- Variants -->
<pui-button variant="primary">Primary</pui-button>
<pui-button variant="secondary">Secondary</pui-button>
<pui-button variant="ghost">Ghost</pui-button>
<pui-button variant="danger">Danger</pui-button>

<!-- Sizes -->
<pui-button variant="primary" size="sm">Small</pui-button>
<pui-button variant="primary" size="lg">Large</pui-button>

<!-- States -->
<pui-button [loading]="isLoading">Save</pui-button>
<pui-button [disabled]="true">Disabled</pui-button>

<!-- Event -->
<pui-button (buttonClick)="onSave($event)">Save</pui-button>`;

  api: ApiRow[] = [
    { input: 'variant',   type: `'primary' | 'secondary' | 'ghost' | 'danger'`, default: `'primary'`,  description: 'Visual style of the button' },
    { input: 'size',      type: `'sm' | 'md' | 'lg'`,                           default: `'md'`,       description: 'Button size' },
    { input: 'disabled',  type: 'boolean',                                       default: 'false',      description: 'Prevents interaction' },
    { input: 'loading',   type: 'boolean',                                       default: 'false',      description: 'Shows spinner, blocks click' },
    { input: 'fullWidth', type: 'boolean',                                       default: 'false',      description: 'Stretches to container width' },
    { input: 'type',      type: `'button' | 'submit' | 'reset'`,                 default: `'button'`,   description: 'Native button type' },
  ];
}
