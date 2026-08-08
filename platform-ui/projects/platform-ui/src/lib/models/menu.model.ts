export interface MenuItem {
  id: string;
  label: string;
  icon?: string;            // inline SVG string
  disabled?: boolean;
  danger?: boolean;         // renders in destructive red
  dividerBefore?: boolean;  // horizontal rule before this item
  shortcut?: string;        // keyboard shortcut label (display only)
  children?: MenuItem[];    // nested submenu items
  data?: Record<string, unknown>;
}

export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export type MenuVariant   = 'default' | 'outline' | 'ghost' | 'primary';
