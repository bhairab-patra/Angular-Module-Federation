export type AccordionVariant = 'default' | 'bordered';

export interface AccordionItem {
  id: string | number;
  title: string;
  /** Plain-text panel body. Ignored when contentHtml is set. */
  content: string;
  /** Rich-markup panel body (tables, lists, formatting) — use for anything
   * plain text can't express. Trusted and rendered as-is, so only pass
   * markup you author yourself, never unsanitized user input. Takes
   * priority over content when present. */
  contentHtml?: string;
  icon?: string;
  /** Short teaser shown under the title, always visible (open or closed). */
  subtitle?: string;
  disabled?: boolean;
}
