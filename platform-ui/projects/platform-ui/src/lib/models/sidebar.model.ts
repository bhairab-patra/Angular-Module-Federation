export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: string;                                        // inline SVG string
  route?: string;                                       // router path
  badge?: string | number;
  badgeVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  children?: SidebarNavItem[];
  disabled?: boolean;
  dividerAfter?: boolean;
  data?: Record<string, unknown>;                       // custom passthrough
}

export interface SidebarGroup {
  id: string;
  label?: string;                                       // optional group heading
  items: SidebarNavItem[];
}

export interface SidebarTheme {
  bg?:            string;   // sidebar background          default: #0f172a
  textColor?:     string;   // item text                   default: #94a3b8
  activeText?:    string;   // active item text            default: #ffffff
  activeBg?:      string;   // active item background      default: rgba(255,255,255,.08)
  activeBorder?:  string;   // active left accent color    default: #12C6A8
  hoverBg?:       string;   // hover background            default: rgba(255,255,255,.05)
  hoverText?:     string;   // hover text                  default: #e2e8f0
  borderColor?:   string;   // divider / border color      default: rgba(255,255,255,.08)
  groupTextColor?: string;  // group label text            default: #475569
  subitemBg?:     string;   // submenu indent background   default: rgba(0,0,0,.15)
  avatarBg?:      string;   // user avatar background      default: #12C6A8
}

export interface SidebarConfig {
  width?:          number;   // expanded width px           default: 260
  collapsedWidth?: number;   // collapsed width px          default: 64
  showSearch?:     boolean;  // show search bar             default: true
  collapsible?:    boolean;  // show collapse toggle        default: true
  maxLabelLen?:    number;   // chars before ellipsis       default: 22
}

/** Preset themes ─ pass as [theme] input */
export const SIDEBAR_THEMES: Record<string, SidebarTheme> = {
  dark: {
    bg: '#0f172a', textColor: '#94a3b8', activeText: '#fff',
    activeBg: 'rgba(255,255,255,.08)', activeBorder: '#12C6A8',
    hoverBg: 'rgba(255,255,255,.05)', hoverText: '#e2e8f0',
    borderColor: 'rgba(255,255,255,.08)', groupTextColor: '#475569',
    subitemBg: 'rgba(0,0,0,.2)',
  },
  slate: {
    bg: '#1e293b', textColor: '#94a3b8', activeText: '#fff',
    activeBg: 'rgba(255,255,255,.10)', activeBorder: '#12C6A8',
    hoverBg: 'rgba(255,255,255,.06)', hoverText: '#e2e8f0',
    borderColor: 'rgba(255,255,255,.08)', groupTextColor: '#64748b',
    subitemBg: 'rgba(0,0,0,.15)',
  },
  light: {
    bg: '#ffffff', textColor: '#6b7280', activeText: '#111827',
    activeBg: '#f0fdfb', activeBorder: '#12C6A8',
    hoverBg: '#f9fafb', hoverText: '#111827',
    borderColor: '#e5e7eb', groupTextColor: '#9ca3af',
    subitemBg: '#f3f4f6',
  },
  solifi: {
    bg: '#112C35', textColor: '#8fa3bc', activeText: '#ffffff',
    activeBg: 'rgba(255,255,255,.08)', activeBorder: '#12C6A8',
    hoverBg: 'rgba(255,255,255,.06)', hoverText: '#e2e8f0',
    borderColor: 'rgba(255,255,255,.07)', groupTextColor: '#4a6080',
    subitemBg: 'rgba(0,0,0,.12)', avatarBg: '#12C6A8',
  },
  brand: {
    bg: '#0d9d8a', textColor: 'rgba(255,255,255,.75)', activeText: '#fff',
    activeBg: 'rgba(255,255,255,.18)', activeBorder: '#fff',
    hoverBg: 'rgba(255,255,255,.10)', hoverText: '#fff',
    borderColor: 'rgba(255,255,255,.15)', groupTextColor: 'rgba(255,255,255,.5)',
    subitemBg: 'rgba(0,0,0,.12)',
  },
};
