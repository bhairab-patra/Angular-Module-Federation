export interface NavLink {
  label: string;
  href:  string;
  active?: boolean;
}

export interface UserMenuItem {
  label:   string;
  icon?:   string;   // SVG path string or full SVG markup
  danger?: boolean;
  action:  string;   // event key emitted via menuAction output
}

export interface HeaderBadge {
  text:  string;
  color: string;         // background colour
  textColor?: string;
}
