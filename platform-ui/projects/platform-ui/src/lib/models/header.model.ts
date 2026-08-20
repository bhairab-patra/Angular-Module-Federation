export interface NavLink {
  label: string;
  href:  string;
  active?: boolean;
}

export interface UserMenuItem {
  label:   string;
  icon?:   string;
  danger?: boolean;
  action:  string;
}

export interface HeaderBadge {
  text:  string;
  color: string;
  textColor?: string;
}
