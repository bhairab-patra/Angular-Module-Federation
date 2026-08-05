export type FilterType = 'checkbox' | 'radio' | 'select' | 'range' | 'text' | 'date-range';

export interface FilterOption {
  label: string;
  value: any;
  count?: number;
}

export interface FilterDef {
  id: string;
  label: string;
  type: FilterType;
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  collapsed?: boolean;
  maxSelections?: number;
}

export type FilterValues = Record<string, any>;

export interface ActiveFilter {
  filterId: string;
  filterLabel: string;
  valueLabel: string;
  value: any;
}
