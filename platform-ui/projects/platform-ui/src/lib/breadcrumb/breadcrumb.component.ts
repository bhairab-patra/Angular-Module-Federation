import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem, BreadcrumbSeparator } from '../models/breadcrumb.model';

const SEPARATORS: Record<BreadcrumbSeparator, string> = {
  chevron: `<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  slash: '/',
  dot: '�',
  arrow: '?',
};

@Component({
  selector: 'pui-lib-breadcrumb',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {

  @Input() items: BreadcrumbItem[] = [];
  @Input() separator: BreadcrumbSeparator = 'chevron';
  @Input() ariaLabel = 'Breadcrumb';

  get sep(): string {
    return SEPARATORS[this.separator] ?? SEPARATORS.chevron;
  }
}
