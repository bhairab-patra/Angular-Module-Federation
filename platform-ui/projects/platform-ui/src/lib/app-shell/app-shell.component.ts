import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { PuiSidebarComponent } from '../sidebar/sidebar.component';
import { UserMenuItem, HeaderBadge } from '../models/header.model';
import { SidebarGroup, SidebarNavItem, SidebarConfig, SidebarTheme } from '../models/sidebar.model';

@Component({
  selector: 'pui-lib-app-shell',
  standalone: true,
  imports: [NgIf, HeaderComponent, PuiSidebarComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class PuiAppShellComponent {

  @Input() appTitle    = 'My App';
  @Input() appSubtitle = '';
  @Input() logo        = '';
  @Input() brandName   = '';

  @Input() groups: SidebarGroup[]  = [];
  @Input() activeId         = '';
  @Input() sidebarVisible   = true;
  @Input() sidebarCollapsed = false;
  @Input() config: SidebarConfig   = {};
  @Input() theme: SidebarTheme     = {};

  @Input() headerBgColor         = '#12C6A8';
  @Input() headerTextColor       = '#ffffff';
  @Input() headerUserName        = '';
  @Input() headerUserEmail       = '';
  @Input() headerGreeting        = 'Hi';
  @Input() headerUserSubtext     = 'Welcome back!';
  @Input() headerAvatarUrl       = '';
  @Input() headerAvatarColor     = '#0d6e5f';
  @Input() headerAvatarTextColor = '#ffffff';
  @Input() headerBadge: HeaderBadge | null = null;
  @Input() headerShowHelp        = false;
  @Input() headerMenuItems: UserMenuItem[] = [];

  @Output() sidebarVisibleChange   = new EventEmitter<boolean>();
  @Output() sidebarCollapsedChange = new EventEmitter<boolean>();
  @Output() itemSelect             = new EventEmitter<SidebarNavItem>();
  @Output() headerMenuAction       = new EventEmitter<string>();
  @Output() headerHelpClick        = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
    this.sidebarVisibleChange.emit(this.sidebarVisible);
    this.cdr.markForCheck();
  }

  onCollapsedChange(v: boolean): void {
    this.sidebarCollapsed = v;
    this.sidebarCollapsedChange.emit(v);
    this.cdr.markForCheck();
  }
}
