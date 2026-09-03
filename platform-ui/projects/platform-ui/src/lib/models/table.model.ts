export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  minWidth?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'currency' | 'badge' | 'pills';
  badgeMap?: Record<string, { label?: string; color?: string }>;

  editable?: boolean;

  required?: boolean;
  minLength?: number;
  maxLength?: number;

  pattern?: string;

  validationMessage?: string;
}

export interface TableAction {
  label: string;

  iconName?: string;

  icon?: string;
  action: (row: any) => void;
  disabled?: (row: any) => boolean;
}

export type SortDir = 'asc' | 'desc' | '';
export interface SortState {
  key: string;
  dir: SortDir;
}
