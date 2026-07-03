import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'exp-header',
  standalone: true,
  imports: [DatePipe],
  template: `
    <header class="header">
      <span class="header__date">{{ today | date:'EEEE, MMMM d, y' }}</span>
      <div class="header__avatar" title="Expense User">EU</div>
    </header>
  `,
  styles: [`
    .header {
      height: var(--header-height);
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 32px; flex-shrink: 0;
    }
    .header__date   { font-size: 13px; color: var(--color-text-muted); font-weight: 500; }
    .header__avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: #16a34a; color: #fff;
      font-size: 12px; font-weight: 700;
      display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
  `],
})
export class HeaderComponent {
  today = new Date();
}
