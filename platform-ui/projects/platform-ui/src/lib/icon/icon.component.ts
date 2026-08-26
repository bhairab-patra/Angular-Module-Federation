import { Component, Input, OnChanges, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-icon',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnChanges {
  @Input() name = '';
  @Input() size: IconSize = 'md';
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
