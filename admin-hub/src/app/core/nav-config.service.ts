import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RemoteEntry, RemoteNavConfig } from './nav-config.model';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: { label: string; route: string }[];
}

@Injectable({ providedIn: 'root' })
export class NavConfigService {
  private http = inject(HttpClient);

  readonly navItems = signal<NavItem[]>([
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'Users',     icon: '👥', route: '/users' },
  ]);

  async load(): Promise<void> {
    try {
      const remotes = await firstValueFrom(
        this.http.get<RemoteEntry[]>('/assets/remotes.json')
      );

      const results = await Promise.allSettled(
        remotes.map(r =>
          firstValueFrom(
            this.http.get<RemoteNavConfig>(`${r.url}/assets/nav.json`)
          )
        )
      );

      const remoteItems: NavItem[] = results
        .filter((r): r is PromiseFulfilledResult<RemoteNavConfig> => r.status === 'fulfilled')
        .map(r => ({
          label:    r.value.label,
          icon:     r.value.icon,
          route:    r.value.baseRoute,
          children: r.value.children,
        }));

      this.navItems.set([
        { label: 'Dashboard', icon: '📊', route: '/dashboard' },
        { label: 'Users',     icon: '👥', route: '/users' },
        ...remoteItems,
      ]);
    } catch {
      // keep static defaults if remotes.json is unreachable
    }
  }
}
