export type FormSize = 'sm' | 'md' | 'lg';

export type InputType =
  | 'text' | 'email' | 'password' | 'number'
  | 'tel'  | 'url'   | 'search';

export interface SelectOption {
  label:    string;
  value:    any;
  disabled?: boolean;
  group?:   string;
  icon?:    string;
}

export interface RadioOption {
  label:    string;
  value:    any;
  hint?:    string;
  disabled?: boolean;
}
