import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiAlertComponent, AlertAction } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-alert-page',
  standalone: true,
  imports: [NgIf, DocPageComponent, PuiAlertComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.scss'],
})
export class AlertPageComponent {
  dismissed = false;

  updateActions: AlertAction[] = [
    { label: 'Update now',    callback: () => alert('Updating…') },
    { label: 'Release notes', callback: () => alert('Opening release notes…') },
  ];

  retryActions: AlertAction[] = [
    { label: 'Retry', callback: () => alert('Retrying…') },
  ];

  onDismissed(): void { this.dismissed = true; }
  reset(): void { this.dismissed = false; }

  angularCode = `import { PuiAlertComponent } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiAlertComponent],
  template: \`
    <pui-lib-alert type="success" message="Changes saved."></pui-lib-alert>
    <pui-lib-alert type="error"   message="Something went wrong."></pui-lib-alert>
    <pui-lib-alert type="warning" message="Session expires soon." [dismissible]="true"></pui-lib-alert>
    <pui-lib-alert type="info"    title="Update available"
      message="v2.4.0 is ready." [actions]="actions">
    </pui-lib-alert>
  \`
})
export class MyComponent {
  actions = [
    { label: 'Update now', callback: () => this.doUpdate() },
  ];
}`;

  api: ApiRow[] = [
    { input: 'type',        type: `'success'|'error'|'warning'|'info'`,  default: `'info'`,    description: 'Semantic type — controls icon, accent bar colour, and background tint.' },
    { input: 'variant',     type: `'soft'|'outlined'|'filled'`,           default: `'soft'`,    description: 'Display style. soft: tinted bg; outlined: transparent with border; filled: solid high-contrast.' },
    { input: 'title',       type: 'string',                               default: '—',         description: 'Optional bold heading above the message.' },
    { input: 'message',     type: 'string',                               default: '—',         description: 'Body text. Can be combined with projected ng-content.' },
    { input: 'dismissible', type: 'boolean',                              default: 'false',     description: 'Shows a × close button. The alert hides itself on click; (dismissed) is also emitted.' },
    { input: 'showIcon',    type: 'boolean',                              default: 'true',      description: 'Show or hide the leading type icon.' },
    { input: 'actions',     type: 'AlertAction[]',                        default: '[]',        description: 'Inline action buttons rendered below the message. Each item: { label, callback }.' },
    { input: 'dismissed',   type: 'EventEmitter<void> (output)',          default: '—',         description: 'Emitted when the user clicks the dismiss button.' },
  ];
}
