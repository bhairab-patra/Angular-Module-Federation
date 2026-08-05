export type SearchSize = 'sm' | 'md' | 'lg';

export interface SearchSuggestion {
  label: string;
  value: any;
  category?: string;
  icon?: string;
  meta?: string;
}
