export interface SolifiNavItem {
  id: string;
  label: string;
  iconName?: string;
  icon?: string;
  route?: string;
  disabled?: boolean;
  data?: Record<string, unknown>;
  /** Nested items shown in an expand/collapse submenu. Single level only — children of children are not supported. */
  children?: SolifiNavItem[];
  /** Draws a divider line + extra spacing below this item, to visually separate menu categories. */
  dividerAfter?: boolean;
}

export interface SolifiNavGroup {
  id: string;
  label?: string;
  items: SolifiNavItem[];
}

export interface SolifiUserMenuItem {
  id: string;
  label: string;
  iconName?: string;
  icon?: string;
  divider?: boolean;
  disabled?: boolean;
}

export interface SolifiSidebarTheme {
  bg?:          string;
  textColor?:   string;
  activeColor?: string;
  activeBg?:    string;
  hoverBg?:     string;
  borderColor?: string;
  groupColor?:  string;
  avatarBg?:    string;
}

export const SOLIFI_THEME: SolifiSidebarTheme = {
  bg:          'var(--pui-solifi-sb-bg)',
  textColor:   'var(--pui-overlay-white-72)',
  activeColor: 'var(--pui-brand)',
  activeBg:    'var(--pui-solifi-sb-icon-active-bg)',
  hoverBg:     'var(--pui-overlay-white-06)',
  borderColor: 'var(--pui-overlay-white-07)',
  groupColor:  'var(--pui-solifi-sb-group)',
  avatarBg:    'var(--pui-brand)',
};
