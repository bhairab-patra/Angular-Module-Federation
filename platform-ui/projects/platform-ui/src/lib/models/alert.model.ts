export type AlertType    = 'success' | 'error' | 'warning' | 'info';
export type AlertVariant = 'soft' | 'filled' | 'outlined';

export interface AlertAction {
  label:    string;
  callback: () => void;
}
