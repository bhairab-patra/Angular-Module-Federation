export type AccordionVariant = 'default' | 'bordered' | 'ghost';

export interface AccordionItem {
  id:        string | number;
  title:     string;
  content:   string;
  icon?:     string;
  disabled?: boolean;
}
