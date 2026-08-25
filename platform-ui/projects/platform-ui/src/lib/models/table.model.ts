export interface TableColumn {
  key:      string;
  label:    string;
  sortable?:  boolean;
  width?:     string;
  minWidth?:  string;
  align?:     'left' | 'center' | 'right';
  type?:      'text' | 'number' | 'date' | 'currency' | 'badge' | 'pills';
  badgeMap?:  Record<string, { label?: string; color?: string }>;
  /** pui-lib-editable-table only: set false to keep this column read-only while the row is being edited. Defaults to editable (true). */
  editable?:  boolean;
}

export interface TableAction {
  label:     string;
  icon?:     string;
  action:    (row: any) => void;
  disabled?: (row: any) => boolean;
}

export type SortDir = 'asc' | 'desc' | '';
export interface SortState { key: string; dir: SortDir; }
