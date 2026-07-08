import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-user-management-wrapper',
  standalone: true,
  template: `<div #container style="height:100%;min-height:600px;"></div>`,
  styles: [`:host { display:block; height:100%; }`],
})
export class UserManagementWrapperComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  private route = inject(ActivatedRoute);
  private unmountFn?: () => void;

  async ngOnInit(): Promise<void> {
    // Each sidebar child link maps to an Angular route with a reactPath in data.
    // Pass it to React so MemoryRouter opens on the right page immediately.
    const reactPath: string = this.route.snapshot.data['reactPath'] ?? '/user-management';

    try {
      const remote = await loadRemoteModule('user-management', './Bootstrap');
      remote.mount(this.container.nativeElement, reactPath);
      this.unmountFn = remote.unmount;
    } catch (err) {
      console.error('[UserManagement] Failed to load remote:', err);
      this.container.nativeElement.innerHTML = `
        <div style="padding:60px;text-align:center;color:#64748b;font-family:sans-serif;">
          <div style="font-size:48px;margin-bottom:12px;">⚠️</div>
          <h3 style="margin:0 0 8px;color:#475569">User Management unavailable</h3>
          <p style="margin:0;font-size:13px">Make sure it is running at <code>http://localhost:4203</code></p>
        </div>`;
    }
  }

  ngOnDestroy(): void {
    this.unmountFn?.();
  }
}
