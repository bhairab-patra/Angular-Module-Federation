export interface NavChild {
  label: string;
  route: string;
}

export interface RemoteNavConfig {
  label: string;
  icon: string;
  baseRoute: string;
  children: NavChild[];
}

export interface RemoteEntry {
  name: string;
  url: string;
}
