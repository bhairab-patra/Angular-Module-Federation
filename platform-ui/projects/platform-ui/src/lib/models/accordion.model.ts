export type AccordionVariant = 'default' | 'bordered';

export interface AccordionItem {
  id: string | number;
  title: string;

  content: string;

  contentHtml?: string;
  icon?: string;

  subtitle?: string;
  disabled?: boolean;
}
