import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef,
  HostListener, ElementRef
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NavLink, UserMenuItem, HeaderBadge } from '../models/header.model';

@Component({
  selector: 'pui-header',
  standalone: true,
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="pui-header" [style.background]="bgColor" [style.color]="textColor">

      <!-- ── Brand ── -->
      <div class="pui-header__brand">
        <ng-content select="[logo]"></ng-content>
        <div *ngIf="!hasLogoSlot" class="pui-header__brand-text">
          <span *ngIf="logoText" class="pui-header__logo-text">{{ logoText }}</span>
          <div class="pui-header__title-group">
            <span class="pui-header__title">{{ appTitle }}</span>
            <span *ngIf="appSubtitle" class="pui-header__subtitle">{{ appSubtitle }}</span>
          </div>
        </div>
      </div>

      <!-- ── Divider after brand ── -->
      <div *ngIf="badge" class="pui-header__divider"></div>

      <!-- ── Environment badge ── -->
      <span *ngIf="badge" class="pui-header__badge"
            [style.background]="badge.color"
            [style.color]="badge.textColor || '#fff'">
        {{ badge.text }}
      </span>

      <!-- ── Nav links ── -->
      <nav *ngIf="navLinks.length" class="pui-header__nav">
        <a *ngFor="let link of navLinks"
           [href]="link.href"
           class="pui-header__nav-link"
           [class.pui-header__nav-link--active]="link.active">
          {{ link.label }}
        </a>
      </nav>

      <!-- ── Spacer ── -->
      <div class="pui-header__spacer"></div>

      <!-- ── Custom actions slot ── -->
      <div class="pui-header__actions">
        <ng-content select="[actions]"></ng-content>
      </div>

      <!-- ── Help icon ── -->
      <button *ngIf="showHelp" class="pui-header__icon-btn" (click)="helpClick.emit()" title="Help">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/>
        </svg>
      </button>

      <!-- ── Divider before user ── -->
      <div *ngIf="userName" class="pui-header__divider"></div>

      <!-- ── User area ── -->
      <div *ngIf="userName" class="pui-header__user" (click)="toggleMenu($event)">
        <div class="pui-header__user-info">
          <span class="pui-header__greeting" *ngIf="greeting">{{ greeting }}, {{ firstName }}</span>
          <span class="pui-header__greeting" *ngIf="!greeting">{{ firstName }}</span>
          <span class="pui-header__user-sub">{{ userSubtext || 'Welcome back!' }}</span>
        </div>

        <div class="pui-header__avatar"
             [style.background]="avatarColor"
             [style.color]="avatarTextColor">
          <img *ngIf="avatarUrl" [src]="avatarUrl" class="pui-header__avatar-img" alt="">
          <span *ngIf="!avatarUrl">{{ initials }}</span>
        </div>

        <svg class="pui-header__caret" [class.pui-header__caret--open]="menuOpen"
             width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <!-- ── Dropdown menu ── -->
        <div class="pui-header__menu" [class.pui-header__menu--open]="menuOpen"
             (click)="$event.stopPropagation()">

          <!-- Menu header -->
          <div class="pui-header__menu-header">
            <div class="pui-header__menu-avatar"
                 [style.background]="avatarColor"
                 [style.color]="avatarTextColor">
              <img *ngIf="avatarUrl" [src]="avatarUrl" class="pui-header__avatar-img" alt="">
              <span *ngIf="!avatarUrl">{{ initials }}</span>
            </div>
            <div>
              <div class="pui-header__menu-name">{{ userName }}</div>
              <div class="pui-header__menu-email">{{ userEmail }}</div>
            </div>
          </div>

          <div class="pui-header__menu-divider"></div>

          <!-- Menu items -->
          <ng-container *ngFor="let item of menuItems">
            <button class="pui-header__menu-item"
                    [class.pui-header__menu-item--danger]="item.danger"
                    (click)="onMenuAction(item)">
              <span *ngIf="item.icon" class="pui-header__menu-item-icon" [innerHTML]="item.icon"></span>
              {{ item.label }}
            </button>
          </ng-container>
        </div>
      </div>

    </header>
  `,
  styles: [`
    /* ── Host ─────────────────────────────────── */
    :host { display: block; }

    /* ── Bar ──────────────────────────────────── */
    .pui-header {
      display: flex; align-items: center; gap: 0;
      padding: 0 24px; height: 58px;
      font-family: 'Poppins', system-ui, sans-serif;
      box-shadow: 0 2px 8px rgba(0,0,0,.18);
      position: relative; z-index: 100;
    }

    /* ── Brand ────────────────────────────────── */
    .pui-header__brand {
      display: flex; align-items: center; gap: 12px; flex-shrink: 0;
    }
    .pui-header__brand-text {
      display: flex; align-items: center; gap: 10px;
    }
    .pui-header__logo-text {
      font-size: 15px; font-weight: 800; letter-spacing: .02em;
    }
    .pui-header__title-group {
      display: flex; flex-direction: column; line-height: 1.2;
    }
    .pui-header__title {
      font-size: 15px; font-weight: 700; letter-spacing: .01em;
    }
    .pui-header__subtitle {
      font-size: 9px; font-weight: 600; opacity: .65;
      text-transform: uppercase; letter-spacing: .1em;
    }

    /* ── Badge ────────────────────────────────── */
    .pui-header__badge {
      font-size: 11px; font-weight: 700; padding: 3px 10px;
      border-radius: 999px; letter-spacing: .04em; flex-shrink: 0;
    }

    /* ── Divider ──────────────────────────────── */
    .pui-header__divider {
      width: 1px; height: 28px; background: rgba(255,255,255,.18);
      margin: 0 16px; flex-shrink: 0;
    }

    /* ── Nav ──────────────────────────────────── */
    .pui-header__nav { display: flex; gap: 2px; margin-left: 8px; }
    .pui-header__nav-link {
      padding: 6px 13px; border-radius: 6px;
      color: rgba(255,255,255,.75); text-decoration: none; font-size: 13.5px;
      font-family: inherit; transition: background .15s, color .15s;
    }
    .pui-header__nav-link:hover { background: rgba(255,255,255,.1); color: #fff; }
    .pui-header__nav-link--active { background: rgba(255,255,255,.15); color: #fff; font-weight: 600; }

    /* ── Spacer ───────────────────────────────── */
    .pui-header__spacer { flex: 1; }

    /* ── Actions slot ─────────────────────────── */
    .pui-header__actions { display: flex; align-items: center; gap: 10px; }

    /* ── Icon button (help) ───────────────────── */
    .pui-header__icon-btn {
      width: 34px; height: 34px; border-radius: 8px;
      background: rgba(255,255,255,.1); border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,.8); transition: background .15s, color .15s;
      margin-left: 8px;
    }
    .pui-header__icon-btn:hover { background: rgba(255,255,255,.2); color: #fff; }

    /* ── User area ────────────────────────────── */
    .pui-header__user {
      display: flex; align-items: center; gap: 10px;
      cursor: pointer; position: relative;
      padding: 4px 6px; border-radius: 10px;
      transition: background .15s;
      user-select: none;
    }
    .pui-header__user:hover { background: rgba(255,255,255,.1); }

    .pui-header__user-info {
      display: flex; flex-direction: column; line-height: 1.25; text-align: right;
    }
    .pui-header__greeting {
      font-size: 13px; font-weight: 600; color: #fff;
    }
    .pui-header__user-sub {
      font-size: 10px; opacity: .65; color: #fff;
    }

    .pui-header__avatar {
      width: 36px; height: 36px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; overflow: hidden; flex-shrink: 0;
      border: 2px solid rgba(255,255,255,.25);
    }
    .pui-header__avatar-img { width: 100%; height: 100%; object-fit: cover; }

    .pui-header__caret {
      color: rgba(255,255,255,.7);
      transition: transform .25s cubic-bezier(.4,0,.2,1);
    }
    .pui-header__caret--open { transform: rotate(180deg); }

    /* ── Dropdown menu ────────────────────────── */
    .pui-header__menu {
      position: absolute; top: calc(100% + 8px); right: 0;
      min-width: 220px; background: #fff;
      border: 1px solid #e5e7eb; border-radius: 14px;
      box-shadow: 0 12px 32px rgba(0,0,0,.15);
      padding: 6px;
      opacity: 0; transform: translateY(-6px) scale(.97);
      pointer-events: none;
      transition: opacity .2s ease, transform .2s cubic-bezier(.4,0,.2,1);
      z-index: 999;
    }
    .pui-header__menu--open {
      opacity: 1; transform: translateY(0) scale(1); pointer-events: auto;
    }

    /* Menu header row */
    .pui-header__menu-header {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 10px 8px;
    }
    .pui-header__menu-avatar {
      width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; overflow: hidden;
    }
    .pui-header__menu-name {
      font-size: 13px; font-weight: 700; color: #111827;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    .pui-header__menu-email {
      font-size: 11px; color: #6b7280;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    .pui-header__menu-divider {
      height: 1px; background: #f3f4f6; margin: 4px 0;
    }

    /* Menu items */
    .pui-header__menu-item {
      width: 100%; display: flex; align-items: center; gap: 10px;
      padding: 9px 10px; border-radius: 8px; border: none;
      background: none; cursor: pointer; text-align: left;
      font-size: 13px; color: #374151;
      font-family: 'Poppins', system-ui, sans-serif;
      transition: background .12s, color .12s;
    }
    .pui-header__menu-item:hover { background: #f3f4f6; color: #111827; }
    .pui-header__menu-item--danger { color: #dc2626; }
    .pui-header__menu-item--danger:hover { background: #fef2f2; color: #b91c1c; }
    .pui-header__menu-item-icon {
      display: flex; align-items: center; width: 16px; height: 16px; flex-shrink: 0;
    }
    .pui-header__menu-item-icon svg { width: 16px; height: 16px; }
  `],
})
export class HeaderComponent {
  /** Main app/product name */
  @Input() appTitle = 'My App';
  /** Sub-label below the title (e.g. "PLATFORM MANAGEMENT") */
  @Input() appSubtitle = '';
  /** Short text or emoji shown before the title (no slot used) */
  @Input() logoText = '';
  /** Header background colour */
  @Input() bgColor = '#12C6A8';
  /** Header text/icon colour */
  @Input() textColor = '#ffffff';
  /** Navigation links array */
  @Input() navLinks: NavLink[] = [];
  /** Full display name of the signed-in user */
  @Input() userName = '';
  /** Email shown in the dropdown */
  @Input() userEmail = '';
  /** Greeting prefix, e.g. "Hi" — leave blank to show first name only */
  @Input() greeting = 'Hi';
  /** Secondary text below the name in the user area */
  @Input() userSubtext = 'Welcome back!';
  /** Avatar image URL — falls back to initials */
  @Input() avatarUrl = '';
  /** Avatar background colour */
  @Input() avatarColor = '#0d6e5f';
  /** Avatar text colour */
  @Input() avatarTextColor = '#ffffff';
  /** Environment / context badge (e.g. { text: 'UAT', color: '#f59e0b' }) */
  @Input() badge: HeaderBadge | null = null;
  /** Show the help (?) icon button */
  @Input() showHelp = false;
  /** Whether a custom logo was projected into [logo] slot */
  @Input() hasLogoSlot = false;
  /** Menu items shown in the user dropdown */
  @Input() menuItems: UserMenuItem[] = [
    {
      label: 'Sign out',
      action: 'signout',
      danger: true,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>`,
    },
  ];

  /** Emitted when a menu item is clicked — payload is item.action */
  @Output() menuAction = new EventEmitter<string>();
  /** Emitted when the help button is clicked */
  @Output() helpClick = new EventEmitter<void>();

  menuOpen = false;

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) {}

  get initials(): string {
    return this.userName.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  }

  get firstName(): string {
    return this.userName.split(' ')[0] || this.userName;
  }

  toggleMenu(e: MouseEvent): void {
    e.stopPropagation();
    this.menuOpen = !this.menuOpen;
    this.cdr.markForCheck();
  }

  onMenuAction(item: UserMenuItem): void {
    this.menuAction.emit(item.action);
    this.menuOpen = false;
    this.cdr.markForCheck();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target)) {
      if (this.menuOpen) {
        this.menuOpen = false;
        this.cdr.markForCheck();
      }
    }
  }
}
