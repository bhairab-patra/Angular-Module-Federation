import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem, BreadcrumbSeparator } from '../models/breadcrumb.model';

const SEPARATORS: Record<BreadcrumbSeparator, string> = {
  chevron: `<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  slash:   '/',
  dot:     '·',
  arrow:   '→',
};

@Component({
  selector: 'pui-breadcrumb',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="pui-bc" [attr.aria-label]="ariaLabel">
      <ol class="pui-bc__list">
        <li *ngFor="let item of items; let i = index; let last = last"
            class="pui-bc__item">

          <!-- ── Link (not last) ── -->
          <a *ngIf="!last && item.route"
             class="pui-bc__link"
             [routerLink]="item.route">
            <span *ngIf="item.icon" class="pui-bc__icon" [innerHTML]="item.icon"></span>
            {{ item.label }}
          </a>

          <!-- ── Plain text link (no route) ── -->
          <span *ngIf="!last && !item.route" class="pui-bc__link pui-bc__link--plain">
            <span *ngIf="item.icon" class="pui-bc__icon" [innerHTML]="item.icon"></span>
            {{ item.label }}
          </span>

          <!-- ── Active (last) item ── -->
          <span *ngIf="last" class="pui-bc__current" [attr.aria-current]="'page'">
            <span *ngIf="item.icon" class="pui-bc__icon" [innerHTML]="item.icon"></span>
            {{ item.label }}
          </span>

          <!-- ── Separator (not after last) ── -->
          <span *ngIf="!last"
                class="pui-bc__sep"
                [class.pui-bc__sep--svg]="separator === 'chevron' || separator === 'arrow'"
                [innerHTML]="sep">
          </span>

        </li>
      </ol>
    </nav>
  `,
  styles: [`
    :host { display: block; }

    .pui-bc__list {
      display: flex; align-items: center; flex-wrap: wrap;
      list-style: none; margin: 0; padding: 0; gap: 0;
      font-family: 'Poppins', system-ui, sans-serif;
    }

    .pui-bc__item {
      display: flex; align-items: center; gap: 0;
    }

    .pui-bc__link {
      display: inline-flex; align-items: center; gap: 5px;
      text-decoration: none;
      font-size: var(--pui-bc-size, 13px);
      font-weight: 500;
      color: var(--pui-bc-link-color, #6b7280);
      border-radius: 4px;
      padding: 1px 4px;
      transition: color .15s, background .15s;
    }
    .pui-bc__link:hover {
      color: var(--pui-bc-link-hover, #12C6A8);
      background: rgba(18,198,168,.07);
    }
    .pui-bc__link--plain { cursor: default; }
    .pui-bc__link--plain:hover { color: var(--pui-bc-link-color, #6b7280); background: none; }

    .pui-bc__current {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: var(--pui-bc-size, 13px);
      font-weight: 600;
      color: var(--pui-bc-active-color, #111827);
      padding: 1px 4px;
    }

    .pui-bc__sep {
      display: inline-flex; align-items: center;
      color: var(--pui-bc-sep-color, #d1d5db);
      font-size: 13px; font-weight: 400;
      margin: 0 4px; user-select: none;
    }
    .pui-bc__sep--svg svg { display: block; }

    .pui-bc__icon {
      display: inline-flex; align-items: center; width: 14px; height: 14px;
    }
    .pui-bc__icon svg { width: 14px; height: 14px; }
  `],
})
export class BreadcrumbComponent {
  /** Array of breadcrumb items — last item is treated as the active page */
  @Input() items: BreadcrumbItem[] = [];

  /** Separator style between items */
  @Input() separator: BreadcrumbSeparator = 'chevron';

  /** Accessible label for the <nav> element */
  @Input() ariaLabel = 'Breadcrumb';

  get sep(): string {
    return SEPARATORS[this.separator] ?? SEPARATORS.chevron;
  }
}
