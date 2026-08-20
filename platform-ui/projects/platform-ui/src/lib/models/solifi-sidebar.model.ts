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
  /** Label text color. Always a light/near-white tone by default — the sidebar
   *  background is dark regardless of which brand theme (old/new) is active,
   *  so text intentionally does NOT follow the brand color (that would lose
   *  contrast against a dark background whenever the brand color is itself dark,
   *  e.g. the navy "old" theme). default: rgba(255,255,255,.72)
   */
  textColor?:   string;
  /** Color of the active item's left accent bar. default: var(--pui-brand) */
  activeColor?: string;
  /** Background of the rounded icon chip shown on the active/hovered item's icon.
   *  default: var(--pui-brand-tint-25)
   */
  activeBg?:    string;
  hoverBg?:     string;  // default: rgba(255,255,255,.06)
  borderColor?: string;  // default: rgba(255,255,255,.07)
  groupColor?:  string;  // default: #4a6080
  avatarBg?:    string;  // default: var(--pui-brand)
}

export const SOLIFI_THEME: SolifiSidebarTheme = {
  bg:          '#112C35',
  textColor:   'rgba(255,255,255,.72)',
  activeColor: 'var(--pui-brand)',
  activeBg:    'var(--pui-brand-tint-25)',
  hoverBg:     'rgba(255,255,255,.06)',
  borderColor: 'rgba(255,255,255,.07)',
  groupColor:  '#4a6080',
  avatarBg:    'var(--pui-brand)',
};
