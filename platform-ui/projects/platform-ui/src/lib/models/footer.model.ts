export type FooterVariant = 'contact' | 'disclaimer' | 'simple';

export interface FooterLink {
  label: string;
  href?: string;
  action?: string;
}

export interface FooterNoticeSlide {
  title?: string;

  lines?: string[];
  contactPrompt?: string;
  contactLabel?: string;
  contactHref?: string;

  text?: string;
  readMoreText?: string;
  readMoreHref?: string;
}
