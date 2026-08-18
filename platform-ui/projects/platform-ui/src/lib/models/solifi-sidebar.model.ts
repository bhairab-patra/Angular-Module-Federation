export interface SolifiNavItem {
  id: string;
  label: string;
  /** Platform-UI icon name (from ICON_REGISTRY) — preferred over raw `icon` SVG */
  iconName?: string;
  /** Raw SVG string fallback — used when iconName is not set */
  icon?: string;
  route?: string;
  disabled?: boolean;
  data?: Record<string, unknown>;
}

export interface SolifiNavGroup {
  id: string;
  label?: string;      // optional section heading
  items: SolifiNavItem[];
}

export interface SolifiUserMenuItem {
  id: string;
  label: string;
  iconName?: string;   // platform-ui icon name
  icon?: string;       // raw SVG fallback
  divider?: boolean;   // show separator line before this item
  disabled?: boolean;
}

export interface SolifiSidebarTheme {
  bg?:          string;  // default: #112C35
  textColor?:   string;  // default: #8fa3bc
  activeColor?: string;  // default: #12C6A8
  activeBg?:    string;  // default: rgba(18,198,168,.12)
  hoverBg?:     string;  // default: rgba(255,255,255,.06)
  borderColor?: string;  // default: rgba(255,255,255,.07)
  groupColor?:  string;  // default: #4a6080
  avatarBg?:    string;  // default: #12C6A8
}

export const SOLIFI_THEME: SolifiSidebarTheme = {
  bg:          '#112C35',
  textColor:   '#8fa3bc',
  activeColor: '#12C6A8',
  activeBg:    'rgba(18,198,168,.12)',
  hoverBg:     'rgba(255,255,255,.06)',
  borderColor: 'rgba(255,255,255,.07)',
  groupColor:  '#4a6080',
  avatarBg:    '#12C6A8',
};
