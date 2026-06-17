export interface CardData {
  title: string;
  subtitle?: string;
  value?: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}
