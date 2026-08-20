export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  badge?: string | number;
  badgeVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  children?: SidebarNavItem[];
  disabled?: boolean;
  dividerAfter?: boolean;
  data?: Record<string, unknown>;
}

export interface SidebarGroup {
  id: string;
  label?: string;
  items: SidebarNavItem[];
}

export interface SidebarTheme {
  bg?:            string;
  textColor?:     string;
  activeText?:    string;
  activeBg?:      string;
  activeBorder?:  string;
  hoverBg?:       string;
  hoverText?:     string;
  borderColor?:   string;
  groupTextColor?: string;
  subitemBg?:     string;
  avatarBg?:      string;
}

export interface SidebarConfig {
  width?:          number;
  collapsedWidth?: number;
  showSearch?:     boolean;
  collapsible?:    boolean;
  maxLabelLen?:    number;
}

export const SIDEBAR_THEMES: Record<string, SidebarTheme> = {
  dark: {
    bg: 'var(--pui-slate-900)', textColor: 'var(--pui-slate-400)', activeText: 'var(--pui-white)',
    activeBg: 'var(--pui-overlay-white-08)', activeBorder: 'var(--pui-brand)',
    hoverBg: 'var(--pui-overlay-white-05)', hoverText: 'var(--pui-slate-200)',
    borderColor: 'var(--pui-overlay-white-08)', groupTextColor: 'var(--pui-indigo-mid)',
    subitemBg: 'var(--pui-overlay-black-20)',
  },
  slate: {
    bg: 'var(--pui-slate-800)', textColor: 'var(--pui-slate-400)', activeText: 'var(--pui-white)',
    activeBg: 'var(--pui-overlay-white-10)', activeBorder: 'var(--pui-brand)',
    hoverBg: 'var(--pui-overlay-white-06)', hoverText: 'var(--pui-slate-200)',
    borderColor: 'var(--pui-overlay-white-08)', groupTextColor: 'var(--pui-slate-600)',
    subitemBg: 'var(--pui-overlay-black-15)',
  },
  light: {
    bg: 'var(--pui-white)', textColor: 'var(--pui-neutral-500)', activeText: 'var(--pui-neutral-900)',
    activeBg: 'var(--pui-brand-bg)', activeBorder: 'var(--pui-brand)',
    hoverBg: 'var(--pui-neutral-50)', hoverText: 'var(--pui-neutral-900)',
    borderColor: 'var(--pui-neutral-200)', groupTextColor: 'var(--pui-neutral-400)',
    subitemBg: 'var(--pui-neutral-100)',
  },
  solifi: {
    bg: 'var(--pui-solifi-sb-bg)', textColor: 'var(--pui-solifi-sb-text)', activeText: 'var(--pui-white)',
    activeBg: 'var(--pui-overlay-white-08)', activeBorder: 'var(--pui-brand)',
    hoverBg: 'var(--pui-overlay-white-06)', hoverText: 'var(--pui-slate-200)',
    borderColor: 'var(--pui-overlay-white-07)', groupTextColor: 'var(--pui-solifi-sb-group)',
    subitemBg: 'var(--pui-overlay-black-12)', avatarBg: 'var(--pui-brand)',
  },
  brand: {
    bg: 'var(--pui-brand-solid)', textColor: 'var(--pui-overlay-white-75)', activeText: 'var(--pui-white)',
    activeBg: 'var(--pui-overlay-white-18)', activeBorder: 'var(--pui-white)',
    hoverBg: 'var(--pui-overlay-white-10)', hoverText: 'var(--pui-white)',
    borderColor: 'var(--pui-overlay-white-15)', groupTextColor: 'var(--pui-overlay-white-50)',
    subitemBg: 'var(--pui-overlay-black-12)',
  },
};
