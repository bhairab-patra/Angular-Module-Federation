import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BreadcrumbItem, BreadcrumbSeparator } from '../models/breadcrumb.model';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

const SEPARATORS: Record<BreadcrumbSeparator, string> = {
  chevron: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5.5 3.5l5 4.5-5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  slash: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><line x1="10" y1="2" x2="6" y2="14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-breadcrumb',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Input() separator: BreadcrumbSeparator = 'chevron';
  @Input() ariaLabel = 'Breadcrumb';

  constructor(private sanitizer: DomSanitizer) { }

  get sep(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      SEPARATORS[this.separator] ?? SEPARATORS.chevron
    );
  }

  safeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
