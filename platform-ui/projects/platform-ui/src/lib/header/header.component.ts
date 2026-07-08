import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NavLink } from '../models/header.model';

@Component({
  selector: 'pui-header',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <header class="pui-header">
      <div class="pui-header__brand">
        <span *ngIf="logoText" class="pui-header__logo">{{ logoText }}</span>
        <span class="pui-header__title">{{ appTitle }}</span>
      </div>

      <nav *ngIf="navLinks.length" class="pui-header__nav">
        <a *ngFor="let link of navLinks" [href]="link.href" class="pui-header__nav-link">
          {{ link.label }}
        </a>
      </nav>

      <div class="pui-header__actions">
        <ng-content select="[actions]"></ng-content>
        <div *ngIf="userName" class="pui-header__avatar" [title]="userName">
          {{ initials }}
        </div>
      </div>
    </header>
  `,
  styles: [`
    .pui-header {
      display: flex; align-items: center; gap: 24px;
      padding: 0 24px; height: 56px;
      background: #1e293b; color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
    }
    .pui-header__brand { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
    .pui-header__logo  { font-size: 20px; }
    .pui-header__title { font-size: 16px; font-weight: 700; letter-spacing: .01em; }
    .pui-header__nav   { display: flex; gap: 4px; flex: 1; }
    .pui-header__nav-link {
      padding: 6px 12px; border-radius: 6px;
      color: #cbd5e1; text-decoration: none; font-size: 14px;
      &:hover { background: rgba(255,255,255,.08); color: #fff; }
    }
    .pui-header__actions { margin-left: auto; display: flex; align-items: center; gap: 12px; }
    .pui-header__avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: #3b82f6; color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 700; cursor: default;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() appTitle = 'My App';
  @Input() logoText = '';
  @Input() navLinks: NavLink[] = [];
  @Input() userName = '';

  get initials(): string {
    return this.userName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }
}
