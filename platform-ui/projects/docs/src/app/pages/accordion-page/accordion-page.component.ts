import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { PuiAccordionComponent, AccordionItem } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-accordion-page',
  standalone: true,
  imports: [DocPageComponent, PuiAccordionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accordion-page.component.html',
  styleUrls: ['./accordion-page.component.scss'],
})
export class AccordionPageComponent {
  private cdr = inject(ChangeDetectorRef);

  faqItems: AccordionItem[] = [
    { id: 'q1', title: 'What is Platform UI?',   content: 'A shared Angular component library providing a unified design system across all product teams — layout, forms, data display, feedback, and navigation components.' },
    { id: 'q2', title: 'Is it tree-shakeable?',  content: 'Yes. Every component is standalone and individually exported, so your bundler only includes what you actually import.' },
    { id: 'q3', title: 'Does it support dark mode?', content: 'Yes. All components use CSS custom properties for theming. Override --pui-brand and surface tokens in your global stylesheet.' },
    { id: 'q4', title: 'Can I use it with NgModule apps?', content: 'Yes. Standalone components drop directly into the imports array of any NgModule without additional wrappers.' },
  ];
  defaultOpen: (string | number)[] = ['q1'];

  settingsItems: AccordionItem[] = [
    { id: 's1', title: 'General',        content: 'Configure app name, language, time zone, and date format preferences.' },
    { id: 's2', title: 'Security',       content: 'Manage password policy, two-factor authentication, and active session controls.' },
    { id: 's3', title: 'Notifications',  content: 'Choose which events trigger email, in-app, or push notifications.' },
    { id: 's4', title: 'Billing',        content: 'View invoices, update payment methods, and manage your subscription plan.' },
  ];
  borderedOpen: (string | number)[] = [];

  helpItems: AccordionItem[] = [
    { id: 'h1', title: 'Getting Started', content: 'Install the library, add to app.config.ts, and import the components you need.' },
    { id: 'h2', title: 'Theming Guide',   content: 'Override CSS custom properties in your global stylesheet to customise colours and spacing.' },
    { id: 'h3', title: 'Contributing',    content: 'Fork the repository, create a feature branch, write tests, and open a pull request.' },
  ];
  ghostOpen: (string | number)[] = [];

  iconItems: AccordionItem[] = [
    { id: 'i1', icon: 'user',     title: 'Profile Settings',   content: 'Update your display name, avatar, bio, and contact details.' },
    { id: 'i2', icon: 'bell',     title: 'Notifications',      content: 'Choose which events send email digests or in-app banners.' },
    { id: 'i3', icon: 'settings', title: 'Advanced',           content: 'Configure API tokens, webhooks, and developer integrations.' },
    { id: 'i4', icon: 'lock',     title: 'Privacy & Security', content: 'Manage data retention, export your data, or delete your account.' },
  ];
  iconOpen: (string | number)[] = ['i1'];

  multiItems: AccordionItem[] = [
    { id: 'm1', title: 'Step 1 — Install',   content: 'Run npm install and add the package to your project.' },
    { id: 'm2', title: 'Step 2 — Configure', content: 'Add provideAnimations() to your app.config.ts providers array.' },
    { id: 'm3', title: 'Step 3 — Import',    content: 'Import individual components in each feature component\'s imports array.' },
  ];
  multiOpen: (string | number)[] = [];

  disabledItems: AccordionItem[] = [
    { id: 'd1', title: 'Available — General FAQs',    content: 'General questions any user can view and expand.' },
    { id: 'd2', title: 'Restricted — Admin Policies', content: 'Requires admin access.', disabled: true },
    { id: 'd3', title: 'Available — Contact Support', content: 'Reach us at support@platform.io or via the chat widget.' },
  ];
  disabledOpen: (string | number)[] = [];

  onOpenChange(ids: (string | number)[], target: string): void {
    if (target === 'default')  this.defaultOpen  = ids;
    if (target === 'bordered') this.borderedOpen = ids;
    if (target === 'ghost')    this.ghostOpen    = ids;
    if (target === 'icon')     this.iconOpen     = ids;
    if (target === 'multi')    this.multiOpen    = ids;
    if (target === 'disabled') this.disabledOpen = ids;
    this.cdr.markForCheck();
  }

  angularCode = `import { PuiAccordionComponent, AccordionItem } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiAccordionComponent],
  template: \`
    <pui-lib-accordion
      [items]="items"
      [(openIds)]="openIds">
    </pui-lib-accordion>
  \`
})
export class MyComponent {
  items: AccordionItem[] = [
    { id: 'q1', title: 'What is Platform UI?', content: 'A shared Angular component library...' },
    { id: 'q2', title: 'Is it tree-shakeable?', content: 'Yes. Every component is standalone...' },
  ];
  openIds: (string | number)[] = ['q1'];
}`;

  api: ApiRow[] = [
    { input: 'items',         type: 'AccordionItem[]',                    default: '[]',        description: 'Array of accordion items to render.' },
    { input: 'openIds',       type: '(string|number)[]',                  default: '[]',        description: 'IDs of currently open panels. Use two-way [(openIds)] binding.' },
    { input: 'allowMultiple', type: 'boolean',                            default: 'false',     description: 'Allow multiple panels open at the same time.' },
    { input: 'variant',       type: `'default'|'bordered'|'ghost'`,       default: `'default'`, description: 'Visual style: default=card panels with gap; bordered=outer border+dividers; ghost=no borders.' },
    { input: 'openIdsChange', type: 'EventEmitter<(string|number)[]> (output)', default: '—', description: 'Emitted on toggle. Powers the [(openIds)] two-way binding.' },
    { input: 'itemToggle',    type: 'EventEmitter<{id, open}> (output)',  default: '—',         description: 'Emitted per toggle with the item id and its new open state.' },
  ];
}
