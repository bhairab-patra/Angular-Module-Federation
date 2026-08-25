import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiFooterComponent, FooterLink, FooterNoticeSlide } from '@bhairab-patra/platform-ui';

const STANDARD_LINKS: FooterLink[] = [
  { label: 'Privacy', action: 'privacy' },
  { label: 'Help', action: 'help' },
  { label: 'Feedback', action: 'feedback' },
  { label: 'Contact us', action: 'contact-us' },
];

@Component({
  selector: 'docs-footer-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiFooterComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer-page.component.html',
  styleUrls: ['./footer-page.component.scss'],
})
export class FooterPageComponent {
  private cdr = inject(ChangeDetectorRef);

  links: FooterLink[] = STANDARD_LINKS;

  contactSlides: FooterNoticeSlide[] = [
    {
      title: 'Our office hours are as follows:',
      lines: ['Monday – Thursday: 8:00 am – 4:00 pm', 'Friday: 9:00 am – 5:00 pm', 'Saturday: 8:00 am – 12:00 pm'],
      contactPrompt: 'Please contact our office if you have any questions.',
      contactLabel: '1-800-845-8200',
      contactHref: 'tel:+18008458200',
    },
    {
      title: 'Holiday hours:',
      lines: ['Closed on all federal holidays.', 'Christmas Eve & New Year\'s Eve: 8:00 am – 12:00 pm'],
      contactPrompt: 'Please contact our office if you have any questions.',
      contactLabel: '1-800-845-8200',
      contactHref: 'tel:+18008458200',
    },
  ];
  contactSlideIndex = 0;

  disclaimerSlides: FooterNoticeSlide[] = [
    {
      title: 'Disclaimer',
      text: 'The information on this website is provided solely for the convenience of Bank USA clients. This website does not constitute the official system of record for Bank USA. The data and materials presented are not intended to be relied upon as authoritative or conclusive. Users should not act or refrain from acting based solely on the information provided on this site.',
      readMoreText: 'Continue reading…',
      readMoreHref: '#',
    },
    {
      title: 'Accessibility',
      text: 'We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.',
      readMoreText: 'Continue reading…',
      readMoreHref: '#',
    },
  ];
  disclaimerSlideIndex = 0;

  lastLinkAction = '';
  lastContactAction = '';

  onContactSlideChange(i: number): void { this.contactSlideIndex = i; this.cdr.markForCheck(); }
  onDisclaimerSlideChange(i: number): void { this.disclaimerSlideIndex = i; this.cdr.markForCheck(); }
  onLinkClick(link: FooterLink): void { this.lastLinkAction = link.label; this.cdr.markForCheck(); }
  onContactClick(slide: FooterNoticeSlide): void { this.lastContactAction = slide.contactLabel ?? ''; this.cdr.markForCheck(); }

  angularCode = `import { PuiFooterComponent, FooterLink, FooterNoticeSlide } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiFooterComponent],
  template: \`
    <pui-lib-footer
      variant="contact"
      [noticeSlides]="slides"
      [(activeSlideIndex)]="slideIndex"
      [links]="links"
      copyrightText="Copyright © 2026 Solifi. All Rights Reserved."
      poweredByText="Powered by Solifi™"
      (linkClick)="onLink($event)"
      (contactClick)="onContact($event)">
    </pui-lib-footer>
  \`
})
export class MyComponent {
  slideIndex = 0;
  slides: FooterNoticeSlide[] = [
    {
      title: 'Our office hours are as follows:',
      lines: ['Monday – Thursday: 8:00 am – 4:00 pm', 'Friday: 9:00 am – 5:00 pm'],
      contactPrompt: 'Please contact our office if you have any questions.',
      contactLabel: '1-800-845-8200',
      contactHref: 'tel:+18008458200',
    },
  ];
  links: FooterLink[] = [
    { label: 'Privacy', action: 'privacy' },
    { label: 'Help', action: 'help' },
  ];

  onLink(link: FooterLink)          { console.log('Link:', link.label); }
  onContact(slide: FooterNoticeSlide) { console.log('Call:', slide.contactLabel); }
}`;

  reactCode = `import { useRef, useEffect, useState } from 'react';
import '@bhairab-patra/platform-ui';

function AppFooter() {
  const ref = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.noticeSlides = [
      {
        title: 'Our office hours are as follows:',
        lines: ['Monday – Thursday: 8:00 am – 4:00 pm', 'Friday: 9:00 am – 5:00 pm'],
        contactPrompt: 'Please contact our office if you have any questions.',
        contactLabel: '1-800-845-8200',
        contactHref: 'tel:+18008458200',
      },
    ];
    ref.current.links = [
      { label: 'Privacy', action: 'privacy' },
      { label: 'Help', action: 'help' },
    ];
    const onSlide = e => setSlideIndex(e.detail);
    const onLink  = e => console.log('Link:', e.detail.label);
    ref.current.addEventListener('activeSlideIndexChange', onSlide);
    ref.current.addEventListener('linkClick', onLink);
    return () => {
      ref.current?.removeEventListener('activeSlideIndexChange', onSlide);
      ref.current?.removeEventListener('linkClick', onLink);
    };
  }, []);

  useEffect(() => {
    if (ref.current) { ref.current.activeSlideIndex = slideIndex; window.puiTick?.(); }
  }, [slideIndex]);

  return (
    <pui-lib-footer
      ref={ref}
      variant="contact"
      copyright-text="Copyright © 2026 Solifi. All Rights Reserved."
      powered-by-text="Powered by Solifi™" />
  );
}`;

  htmlCode = `<!-- Load the bundle once in your page -->
<script type="module" src="pui-elements.js"></script>

<pui-lib-footer
  id="footer"
  variant="contact"
  copyright-text="Copyright © 2026 Solifi. All Rights Reserved.">
</pui-lib-footer>

<script>
customElements.whenDefined('pui-lib-footer').then(() => {
  const el = document.getElementById('footer');
  el.noticeSlides = [
    {
      title: 'Our office hours are as follows:',
      lines: ['Monday – Thursday: 8:00 am – 4:00 pm', 'Friday: 9:00 am – 5:00 pm'],
      contactPrompt: 'Please contact our office if you have any questions.',
      contactLabel: '1-800-845-8200',
      contactHref: 'tel:+18008458200',
    },
  ];
  el.links = [
    { label: 'Privacy', action: 'privacy' },
    { label: 'Help', action: 'help' },
  ];
  el.addEventListener('linkClick', e => console.log('Link:', e.detail.label));
  el.addEventListener('contactClick', e => console.log('Call:', e.detail.contactLabel));
});
</script>`;

  xfwRows = [
    { name: 'variant', angular: 'variant="contact"', attr: 'variant="contact"', js: 'el.variant = "contact"' },
    { name: 'noticeSlides', angular: '[noticeSlides]="slides"', attr: '—', js: 'el.noticeSlides = [...]' },
    { name: 'activeSlideIndex', angular: '[(activeSlideIndex)]="i"', attr: '—', js: 'el.activeSlideIndex = 0' },
    { name: 'copyrightText', angular: 'copyrightText="..."', attr: 'copyright-text="..."', js: 'el.copyrightText = "..."' },
    { name: 'links', angular: '[links]="links"', attr: '—', js: 'el.links = [...]' },
    { name: 'poweredByText', angular: 'poweredByText="..."', attr: 'powered-by-text="..."', js: 'el.poweredByText = "..."' },
    { name: 'showPoweredBy', angular: '[showPoweredBy]="false"', attr: 'show-powered-by="false"', js: 'el.showPoweredBy = false' },
    { name: 'stickyBottom', angular: '[stickyBottom]="true"', attr: 'sticky-bottom', js: 'el.stickyBottom = true' },
    { name: 'activeSlideIndexChange', angular: '(activeSlideIndexChange)="fn($event)"', attr: '—', js: `el.addEventListener('activeSlideIndexChange', fn)` },
    { name: 'linkClick', angular: '(linkClick)="fn($event)"', attr: '—', js: `el.addEventListener('linkClick', fn)` },
    { name: 'contactClick', angular: '(contactClick)="fn($event)"', attr: '—', js: `el.addEventListener('contactClick', fn)` },
  ];

  trackByIndex(_i: number): number { return _i; }

  api: ApiRow[] = [
    { input: 'variant', type: `'contact'|'disclaimer'|'simple'`, default: `'simple'`, description: 'Layout style. contact=office-hours/address card + call-to-action button. disclaimer=legal notice card with a "read more" link. simple=no notice card, just the bottom row.' },
    { input: 'noticeSlides', type: 'FooterNoticeSlide[]|string', default: '[]', description: 'Rotating notice-card slides for the contact/disclaimer variants. Pagination dots and prev/next arrows appear automatically when there is more than one slide.' },
    { input: 'activeSlideIndex', type: 'number|string', default: '0', description: 'Currently visible slide. Use two-way [(activeSlideIndex)] binding.' },
    { input: 'copyrightText', type: 'string', default: `'Copyright © {year} Solifi. All Rights Reserved.'`, description: 'Copyright line shown on the left of the bottom row.' },
    { input: 'links', type: 'FooterLink[]|string', default: '[]', description: 'Link list shown on the right of the bottom row (Privacy, Help, Feedback, Contact us, etc).' },
    { input: 'poweredByText', type: 'string', default: `'Powered by Solifi™'`, description: 'Trailing "powered by" label, shown after the links.' },
    { input: 'showPoweredBy', type: 'boolean|string', default: 'true', description: 'Show/hide the poweredByText label.' },
    { input: 'stickyBottom', type: 'boolean|string', default: 'false', description: 'Pins the footer to the bottom of the viewport (position: fixed, full width) instead of flowing wherever it lands in the page. Off by default — turn on when you want an always-visible app footer bar rather than a normal end-of-page block.' },
    { input: 'activeSlideIndexChange', type: 'EventEmitter<number> (output)', default: '—', description: 'Fires when the active notice slide changes (arrow click, dot click, or programmatic).' },
    { input: 'linkClick', type: 'EventEmitter<FooterLink> (output)', default: '—', description: 'Fires when a bottom-row link is clicked.' },
    { input: 'contactClick', type: 'EventEmitter<FooterNoticeSlide> (output)', default: '—', description: 'Fires when the contact variant\'s call-to-action button is clicked.' },
  ];
}
