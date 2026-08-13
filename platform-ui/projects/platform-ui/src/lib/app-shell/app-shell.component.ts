import {
  Component, Input, Output, EventEmitter,
  ViewEncapsulation, inject, OnInit
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { PuiSidebarComponent } from '../sidebar/sidebar.component';
import { UserMenuItem, HeaderBadge } from '../models/header.model';
import { SidebarGroup, SidebarNavItem, SidebarConfig, SidebarTheme } from '../models/sidebar.model';

@Component({
  selector: 'pui-lib-app-shell',
  standalone: true,
  imports: [HeaderComponent, PuiSidebarComponent],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class PuiAppShellComponent implements OnInit {
  private doc = inject(DOCUMENT);

  ngOnInit(): void {
    const id = 'pui-material-symbols-font';
    if (!this.doc.getElementById(id)) {
      const link = this.doc.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block';
      this.doc.head.appendChild(link);
    }
  }

 
  @Input() appTitle    = 'My App';
  @Input() appSubtitle = '';
  @Input() logo        = '';      
  @Input() logoUrl     = '';      
  @Input() brandName   = '';    

  
  @Input() set groups(v: SidebarGroup[] | string) {
    this._groups = typeof v === 'string' ? (this._tryParse<SidebarGroup[]>(v) ?? []) : (v || []);
  }
  get groups(): SidebarGroup[] { return this._groups; }
  private _groups: SidebarGroup[] = [];

  @Input() activeId         = '';
  @Input() sidebarVisible   = true;
  @Input() sidebarCollapsed = false;

  @Input() set config(v: SidebarConfig | string) {
    this._config = typeof v === 'string' ? (this._tryParse<SidebarConfig>(v) ?? {}) : (v || {});
  }
  get config(): SidebarConfig { return this._config; }
  private _config: SidebarConfig = {};

  @Input() set theme(v: SidebarTheme | string) {
    this._theme = typeof v === 'string' ? (this._tryParse<SidebarTheme>(v) ?? {}) : (v || {});
  }
  get theme(): SidebarTheme { return this._theme; }
  private _theme: SidebarTheme = {};

 
  @Input() sidebarBgColor     = '';
  @Input() sidebarTextColor   = '';
  @Input() sidebarActiveColor = '';
  @Input() sidebarHoverColor  = '';
  @Input() sidebarBorderColor = '';
  @Input() sidebarWidth       = 0;

  
  @Input() headerBgColor         = '#12C6A8';
  @Input() headerTextColor       = '#ffffff';
  @Input() headerUserName        = '';
  @Input() headerUserEmail       = '';
  @Input() headerGreeting        = 'Hi';
  @Input() headerUserSubtext     = 'Welcome back!';
  @Input() headerAvatarUrl       = '';
  @Input() headerAvatarColor     = '#0d6e5f';
  @Input() headerAvatarTextColor = '#ffffff';
  @Input() headerShowHelp        = false;

  @Input() set headerBadge(v: HeaderBadge | string | null) {
    this._headerBadge = typeof v === 'string' ? (this._tryParse<HeaderBadge>(v) ?? null) : v;
  }
  get headerBadge(): HeaderBadge | null { return this._headerBadge; }
  private _headerBadge: HeaderBadge | null = null;

  @Input() set headerMenuItems(v: UserMenuItem[] | string) {
    this._headerMenuItems = typeof v === 'string' ? (this._tryParse<UserMenuItem[]>(v) ?? []) : (v || []);
  }
  get headerMenuItems(): UserMenuItem[] { return this._headerMenuItems; }
  private _headerMenuItems: UserMenuItem[] = [];

 
  @Output() sidebarVisibleChange   = new EventEmitter<boolean>();
  @Output() sidebarCollapsedChange = new EventEmitter<boolean>();
  @Output() itemSelect             = new EventEmitter<SidebarNavItem>();
  @Output() headerMenuAction       = new EventEmitter<string>();
  @Output() headerHelpClick        = new EventEmitter<void>();


  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
    this.sidebarVisibleChange.emit(this.sidebarVisible);
  }

  onCollapsedChange(v: boolean): void {
    this.sidebarCollapsed = v;
    this.sidebarCollapsedChange.emit(v);
  }

  private _tryParse<T>(s: string): T | null {
    try { return JSON.parse(s) as T; } catch { return null; }
  }
}
