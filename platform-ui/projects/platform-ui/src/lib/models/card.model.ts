export interface CardData {
  title: string;
  subtitle?: string;
  value?: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export type CardVariant = 'default' | 'outlined' | 'flat' | 'teal' | 'dark';
export type CardSize = 'sm' | 'md' | 'lg';
