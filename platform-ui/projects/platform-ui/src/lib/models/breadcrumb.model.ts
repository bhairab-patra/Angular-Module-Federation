export interface BreadcrumbItem {
  label: string;
  route?: string;   // omit for the active (last) item
  icon?:  string;   // optional SVG string shown before the label
}

export type BreadcrumbSeparator = 'chevron' | 'slash' | 'dot' | 'arrow';
