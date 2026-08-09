import { Component, Input, OnChanges, ChangeDetectionStrategy, SecurityContext, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ICON_REGISTRY } from './icon-registry';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

@Component({
  selector: 'pui-lib-icon',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnChanges {
  /** Icon name from the registry (e.g. "arrow-right", "check", "user"). */
  @Input() name = '';

  /** Size variant. */
  @Input() size: IconSize = 'md';

  /** CSS color — defaults to currentColor (inherits from parent). */
  @Input() color = 'currentColor';

  svg: SafeHtml = '';
  px = 20;

  get hostClass(): string { return `pui-icon--${this.size}`; }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(): void {
    this.px = SIZE_MAP[this.size] ?? 20;
    const raw = ICON_REGISTRY[this.name];
    if (!raw) {
      this.svg = '';
      return;
    }
    const colored = raw.replace(/stroke="currentColor"/g, `stroke="${this.color}"`)
      .replace(/fill="currentColor"/g, `fill="${this.color}"`);
    this.svg = this.sanitizer.bypassSecurityTrustHtml(colored);
  }
}
