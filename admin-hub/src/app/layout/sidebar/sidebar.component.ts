import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NavConfigService } from '../../core/nav-config.service';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  protected navConfig = inject(NavConfigService);
  protected openGroup = signal<string | null>(null);

  toggle(label: string): void {
    this.openGroup.update(curr => (curr === label ? null : label));
  }

  isOpen(label: string): boolean {
    return this.openGroup() === label;
  }
}
