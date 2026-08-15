export interface BreadcrumbItem {
  label: string;
  route?:    string;  // omit for the active (last) item
  iconName?: string;  // icon registry name — renders via pui-lib-icon (preferred)
  icon?:     string;  // raw SVG string fallback (legacy)
}

export type BreadcrumbSeparator = 'chevron' | 'slash' | 'dot' | 'arrow';
