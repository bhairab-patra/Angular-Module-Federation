export type FooterVariant = 'contact' | 'disclaimer' | 'simple';

export interface FooterLink {
  label:  string;
  href?:  string;
  action?: string;
}

/** One rotating notice-card slide. Only the fields relevant to the active
 * `variant` are rendered — contact/disclaimer fields can safely coexist
 * on the same slide if you reuse data across variants. */
export interface FooterNoticeSlide {
  title?:          string;
  /** contact variant — office-hours / address lines. */
  lines?:          string[];
  contactPrompt?:  string;
  contactLabel?:   string;
  contactHref?:    string;
  /** disclaimer variant — body text + optional "read more" link. */
  text?:           string;
  readMoreText?:   string;
  readMoreHref?:   string;
}
