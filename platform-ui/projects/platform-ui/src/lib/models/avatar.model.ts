export interface AvatarMenuItem {
  label: string;
  action: string;
  iconName?: string;
  danger?: boolean;
  dividerBefore?: boolean;
}

export type AvatarSize = 'sm' | 'md' | 'lg';
