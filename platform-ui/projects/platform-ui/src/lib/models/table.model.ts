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
  /** pui-lib-editable-table only: below fields configure inline validation shown
   * while this column is being edited. A row can't be saved until every
   * editable column with a validation rule passes. */
  required?:          boolean;
  minLength?:         number;
  maxLength?:         number;
  /** Regex source (no slashes/flags), e.g. '^[^@]+@[^@]+\\.[^@]+$' for email. */
  pattern?:           string;
  /** Overrides the auto-generated message for any rule that fails on this column. */
  validationMessage?: string;
}

export interface TableAction {
  label:     string;
  icon?:     string;
  action:    (row: any) => void;
  disabled?: (row: any) => boolean;
}

export type SortDir = 'asc' | 'desc' | '';
export interface SortState { key: string; dir: SortDir; }
