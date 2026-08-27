import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { LabelComponent, PuiInputComponent, PuiSelectComponent, SelectOption } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-label-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, LabelComponent, PuiInputComponent, PuiSelectComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './label-page.component.html',
  styleUrls: ['./label-page.component.scss'],
})
export class LabelPageComponent {
  cdr = inject(ChangeDetectorRef);

  countryOptions: SelectOption[] = [
    { label: 'India', value: 'in' },
    { label: 'United States', value: 'us' },
  ];

  angularCode = `import { LabelComponent } from '@bhairab-patra/platform-ui';

@Component({
  imports: [LabelComponent],
  template: \`
    <!-- Plain label -->
    <pui-lib-label text="Full Name"></pui-lib-label>

    <!-- Required field -->
    <pui-lib-label text="Email" [required]="true"></pui-lib-label>

    <!-- With an info tooltip on hover -->
    <pui-lib-label
      text="API Key"
      [required]="true"
      [showInfo]="true"
      info="Found under Settings → Developer → API Keys."
      infoPosition="right">
    </pui-lib-label>
  \`
})
export class MyComponent {}`;

  reactCode = `import '@bhairab-patra/platform-ui';

function FieldLabel() {
  return (
    <pui-lib-label
      text="API Key"
      required
      show-info
      info="Found under Settings → Developer → API Keys."
      info-position="right"
    />
  );
}`;

  htmlCode = `<pui-lib-label text="Full Name"></pui-lib-label>

<pui-lib-label text="Email" required></pui-lib-label>

<pui-lib-label
  text="API Key"
  required
  show-info
  info="Found under Settings → Developer → API Keys."
  info-position="right">
</pui-lib-label>`;

  xfwRows = [
    { name: 'text',         angular: 'text="Full Name"',        attr: 'text="Full Name"',        js: 'el.text = "Full Name"' },
    { name: 'required',     angular: '[required]="true"',       attr: 'required',                js: 'el.required = true' },
    { name: 'showInfo',     angular: '[showInfo]="true"',       attr: 'show-info',               js: 'el.showInfo = true' },
    { name: 'info',         angular: 'info="Hint text…"',       attr: 'info="Hint text…"',       js: 'el.info = "Hint text…"' },
    { name: 'infoPosition', angular: 'infoPosition="right"',    attr: 'info-position="right"',   js: 'el.infoPosition = "right"' },
  ];

  api: ApiRow[] = [
    { input: 'text', type: 'string', default: "''", description: 'The label text.' },
    { input: 'required', type: 'boolean|string', default: 'false', description: 'Shows a red asterisk after the text — purely visual, does not affect the paired input\'s own validation.' },
    { input: 'showInfo', type: 'boolean|string', default: 'false', description: 'Whether the info icon and its hover tooltip render at all. Off by default — only turn it on when there\'s actually a hint worth showing.' },
    { input: 'info', type: 'string', default: "''", description: 'Tooltip text shown when hovering the info icon. Has no effect unless showInfo is true.' },
    { input: 'infoPosition', type: `'top'|'bottom'|'left'|'right'`, default: `'top'`, description: 'Which side of the info icon the tooltip bubble opens on.' },
  ];

  trackByIndex(_i: number): number { return _i; }
}
