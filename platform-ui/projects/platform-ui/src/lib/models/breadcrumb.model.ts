export interface BreadcrumbItem {
  label: string;
  route?:    string;
  iconName?: string;
  icon?:     string;
}

export type BreadcrumbSeparator = 'chevron' | 'slash' | 'dot' | 'arrow';
