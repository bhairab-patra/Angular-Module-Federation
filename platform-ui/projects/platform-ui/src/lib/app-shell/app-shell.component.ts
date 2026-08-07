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
  selector: 'pui-app-shell',
  standalone: true,
  imports: [NgIf, HeaderComponent, PuiSidebarComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="pas">

  <pui-header
    [hasLogoSlot]="true"
    [bgColor]="headerBgColor"
    [textColor]="headerTextColor"
    [userName]="headerUserName"
    [userEmail]="headerUserEmail"
    [greeting]="headerGreeting"
    [userSubtext]="headerUserSubtext"
    [avatarUrl]="headerAvatarUrl"
    [avatarColor]="headerAvatarColor"
    [avatarTextColor]="headerAvatarTextColor"
    [badge]="headerBadge"
    [showHelp]="headerShowHelp"
    [menuItems]="headerMenuItems"
    (menuAction)="headerMenuAction.emit($event)"
    (helpClick)="headerHelpClick.emit()">

    <div logo class="pas__brand">
      <button
        class="pas__hamburger"
        [class.pas__hamburger--open]="sidebarVisible"
        (click)="toggleSidebar()"
        [title]="sidebarVisible ? 'Close sidebar' : 'Open sidebar'">
        <span class="pas__bar pas__bar--top"></span>
        <span class="pas__bar pas__bar--mid"></span>
        <span class="pas__bar pas__bar--bot"></span>
      </button>
      <span *ngIf="logo" class="pas__logo" [innerHTML]="logo"></span>
      <div class="pas__title-group">
        <span class="pas__app-title">{{ appTitle }}</span>
        <span *ngIf="appSubtitle" class="pas__app-subtitle">{{ appSubtitle }}</span>
      </div>
    </div>

  </pui-header>

  <div class="pas__body">

    <pui-sidebar
      [brandName]="brandName || appTitle"
      [groups]="groups"
      [activeId]="activeId"
      [collapsed]="sidebarCollapsed"
      [config]="config"
      [theme]="theme"
      [showSidebar]="sidebarVisible"
      [showHeader]="false"
      (collapsedChange)="onCollapsedChange($event)"
      (itemSelect)="itemSelect.emit($event)">
    </pui-sidebar>

    <main class="pas__content">
      <ng-content></ng-content>
    </main>

  </div>
</div>
  `,
  styles: [`
    :host { display: block; height: 100%; }

    .pas { display: flex; flex-direction: column; height: 100%; overflow: hidden; font-family: 'Poppins', system-ui, sans-serif; }
    .pas__body { display: flex; flex: 1; overflow: hidden; }
    .pas__content { flex: 1; overflow: auto; min-width: 0; }

    /* Header brand area */
    .pas__brand { display: flex; align-items: center; gap: 10px; min-width: 0; }
    .pas__title-group { display: flex; flex-direction: column; min-width: 0; }
    .pas__app-title { font-size: 14px; font-weight: 700; white-space: nowrap; line-height: 1.2; }
    .pas__app-subtitle { font-size: 10px; opacity: .65; white-space: nowrap; letter-spacing: .04em; text-transform: uppercase; }
    .pas__logo { display: flex; align-items: center; flex-shrink: 0; }

    /* Hamburger button */
    .pas__hamburger {
      display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4.5px;
      width: 36px; height: 36px; border-radius: 8px; border: none;
      background: rgba(255,255,255,.12); cursor: pointer; flex-shrink: 0;
      transition: background .15s; padding: 0;
    }
    .pas__hamburger:hover { background: rgba(255,255,255,.22); }
    .pas__bar {
      display: block; width: 16px; height: 2px; border-radius: 2px; background: currentColor;
      transition: transform .22s cubic-bezier(.4,0,.2,1), opacity .18s, width .18s;
      transform-origin: center;
    }
    .pas__hamburger--open .pas__bar--top { transform: translateY(6.5px) rotate(45deg); }
    .pas__hamburger--open .pas__bar--mid { opacity: 0; width: 0; }
    .pas__hamburger--open .pas__bar--bot { transform: translateY(-6.5px) rotate(-45deg); }

    /* Sidebar fills its natural width from pui-sidebar's own CSS */
    pui-sidebar { display: contents; }
  `],
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
