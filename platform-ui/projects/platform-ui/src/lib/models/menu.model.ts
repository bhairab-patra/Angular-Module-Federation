export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
  dividerBefore?: boolean;
  shortcut?: string;
  children?: MenuItem[];
  data?: Record<string, unknown>;
}

export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export type MenuVariant   = 'default' | 'outline' | 'ghost' | 'primary';
