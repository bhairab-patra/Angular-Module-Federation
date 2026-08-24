import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiAccordionComponent, AccordionItem } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-accordion-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, PuiAccordionComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accordion-page.component.html',
  styleUrls: ['./accordion-page.component.scss'],
})
export class AccordionPageComponent {
  private cdr = inject(ChangeDetectorRef);

  faqItems: AccordionItem[] = [
    { id: 'q1', icon: 'message', title: 'What is Platform UI?', content: 'A shared Angular component library providing a unified design system across all product teams — layout, forms, data display, feedback, and navigation components.' },
    { id: 'q2', icon: 'code', title: 'Is it tree-shakeable?', content: 'Yes. Every component is standalone and individually exported, so your bundler only includes what you actually import.' },
    { id: 'q3', icon: 'eye', title: 'Does it support dark mode?', content: 'Yes. All components use CSS custom properties for theming. Override --pui-brand and surface tokens in your global stylesheet.' },
    { id: 'q4', icon: 'dashboard', title: 'Can I use it with NgModule apps?', content: 'Yes. Standalone components drop directly into the imports array of any NgModule without additional wrappers.' },
  ];
  defaultOpen: (string | number)[] = ['q1'];

  faqItemsNoIcon: AccordionItem[] = [
    { id: 'n1', title: 'What is Platform UI?', content: 'A shared Angular component library providing a unified design system across all product teams — layout, forms, data display, feedback, and navigation components.' },
    { id: 'n2', title: 'Is it tree-shakeable?', content: 'Yes. Every component is standalone and individually exported, so your bundler only includes what you actually import.' },
    { id: 'n3', title: 'Does it support dark mode?', content: 'Yes. All components use CSS custom properties for theming. Override --pui-brand and surface tokens in your global stylesheet.' },
  ];
  noIconOpen: (string | number)[] = ['n1'];

  settingsItems: AccordionItem[] = [
    { id: 's1', icon: 'settings', title: 'General', subtitle: 'Configure app name, language, time zone, and date format preferences.', content: 'Additional general options: default landing page, session timeout, and export format.' },
    { id: 's2', icon: 'lock', title: 'Security', subtitle: 'Manage password policy, two-factor authentication, and active session.', content: 'Configure SSO providers, IP allow-lists, and audit log retention.' },
    { id: 's3', icon: 'bell', title: 'Notifications', subtitle: 'Configure email, in-app, and push notification preferences.', content: 'Choose per-event delivery channels and quiet hours.' },
    { id: 's4', icon: 'credit-card', title: 'Billing', subtitle: 'View invoices, update payment methods, and manage your plan.', content: 'Download past invoices or switch between monthly and annual billing.' },
  ];
  borderedOpen: (string | number)[] = ['s1'];

  settingsItemsNoIcon: AccordionItem[] = [
    { id: 'b1', title: 'General', subtitle: 'Configure app name, language, time zone, and date format preferences.', content: 'Additional general options: default landing page, session timeout, and export format.' },
    { id: 'b2', title: 'Security', subtitle: 'Manage password policy, two-factor authentication, and active session.', content: 'Configure SSO providers, IP allow-lists, and audit log retention.' },
    { id: 'b3', title: 'Notifications', subtitle: 'Configure email, in-app, and push notification preferences.', content: 'Choose per-event delivery channels and quiet hours.' },
  ];
  borderedNoIconOpen: (string | number)[] = ['b1'];

  multiItems: AccordionItem[] = [
    { id: 'm1', title: 'Step 1 — Install', content: 'Run npm install and add the package to your project.' },
    { id: 'm2', title: 'Step 2 — Configure', content: 'Add provideAnimations() to your app.config.ts providers array.' },
    { id: 'm3', title: 'Step 3 — Import', content: 'Import individual components in each feature component\'s imports array.' },
  ];
  multiOpen: (string | number)[] = ['m1'];

  fwItems: AccordionItem[] = [
    { id: 'f1', icon: 'settings', title: 'General', subtitle: 'Configure app name, language, and time zone.', content: 'Additional general options live here.' },
    { id: 'f2', icon: 'bell', title: 'Notifications', subtitle: 'Configure email, in-app, and push preferences.', content: 'Choose per-event delivery channels.' },
  ];
  fwOpen: (string | number)[] = ['f1'];

  onOpenChange(ids: (string | number)[], target: string): void {
    if (target === 'default') this.defaultOpen = ids;
    if (target === 'noIcon') this.noIconOpen = ids;
    if (target === 'bordered') this.borderedOpen = ids;
    if (target === 'borderedNoIcon') this.borderedNoIconOpen = ids;
    if (target === 'multi') this.multiOpen = ids;
    if (target === 'fw') this.fwOpen = ids;
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
    { id: 'q1', icon: 'message', title: 'What is Platform UI?', content: 'A shared Angular component library...' },
    { id: 'q2', icon: 'code',    title: 'Is it tree-shakeable?', content: 'Yes. Every component is standalone...' },
  ];
  openIds: (string | number)[] = ['q1'];
}`;

  reactCode = `import { useRef, useEffect, useState } from 'react';
import '@bhairab-patra/platform-ui';

function Faq() {
  const ref = useRef(null);
  const [openIds, setOpenIds] = useState(['f1']);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.items = [
      { id: 'f1', icon: 'settings', title: 'General',       subtitle: 'Configure app name, language, and time zone.', content: 'Additional general options live here.' },
      { id: 'f2', icon: 'bell',     title: 'Notifications', subtitle: 'Configure email, in-app, and push preferences.', content: 'Choose per-event delivery channels.' },
    ];
    ref.current.openIds = openIds;
    const onChange = e => setOpenIds(e.detail);
    ref.current.addEventListener('openIdsChange', onChange);
    return () => ref.current?.removeEventListener('openIdsChange', onChange);
  }, []);

  useEffect(() => {
    if (ref.current) { ref.current.openIds = openIds; window.puiTick?.(); }
  }, [openIds]);

  return <pui-lib-accordion ref={ref} variant="bordered" />;
}`;

  htmlCode = `<!-- Load the bundle once in your page -->
<script type="module" src="pui-elements.js"></script>

<pui-lib-accordion id="faq" variant="bordered"></pui-lib-accordion>

<script>
customElements.whenDefined('pui-lib-accordion').then(() => {
  const el = document.getElementById('faq');
  el.items = [
    { id: 'f1', icon: 'settings', title: 'General',       subtitle: 'Configure app name, language, and time zone.', content: 'Additional general options live here.' },
    { id: 'f2', icon: 'bell',     title: 'Notifications', subtitle: 'Configure email, in-app, and push preferences.', content: 'Choose per-event delivery channels.' },
  ];
  el.openIds = ['f1'];
  el.addEventListener('openIdsChange', e => { el.openIds = e.detail; });
});
</script>`;

  xfwRows = [
    { name: 'items', angular: '[items]="items"', attr: '—', js: 'el.items = [...]' },
    { name: 'openIds', angular: '[(openIds)]="openIds"', attr: '—', js: 'el.openIds = [...]' },
    { name: 'allowMultiple', angular: '[allowMultiple]="true"', attr: 'allow-multiple', js: 'el.allowMultiple = true' },
    { name: 'variant', angular: 'variant="bordered"', attr: 'variant="bordered"', js: 'el.variant = "bordered"' },
    { name: 'openIdsChange', angular: '(openIdsChange)="fn($event)"', attr: '—', js: `el.addEventListener('openIdsChange', fn)` },
    { name: 'itemToggle', angular: '(itemToggle)="fn($event)"', attr: '—', js: `el.addEventListener('itemToggle', fn)` },
  ];

  trackByIndex(_i: number): number { return _i; }

  api: ApiRow[] = [
    { input: 'items', type: 'AccordionItem[]', default: '[]', description: 'Array of accordion items to render. Each item supports id, title, content, contentHtml?, icon?, subtitle?, disabled?. contentHtml (rich markup — tables, lists) takes priority over content (plain text) when both are set; only pass markup you author yourself, it is trusted as-is.' },
    { input: 'openIds', type: '(string|number)[]', default: '[]', description: 'IDs of currently open panels. Use two-way [(openIds)] binding.' },
    { input: 'allowMultiple', type: 'boolean', default: 'false', description: 'Allow multiple panels open at the same time.' },
    { input: 'variant', type: `'default'|'bordered'`, default: `'default'`, description: 'Visual style: default=FAQ-style cards, open row tints with the brand-light header; bordered=flat settings-list rows with a circular tinted icon badge.' },
    { input: 'openIdsChange', type: 'EventEmitter<(string|number)[]> (output)', default: '—', description: 'Emitted on toggle. Powers the [(openIds)] two-way binding.' },
    { input: 'itemToggle', type: 'EventEmitter<{id, open}> (output)', default: '—', description: 'Emitted per toggle with the item id and its new open state.' },
  ];
}
