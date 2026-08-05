import { Component, Input, OnChanges, ChangeDetectionStrategy, SecurityContext } from '@angular/core';
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
  selector: 'pui-icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="pui-icon" [class]="hostClass" [style.width.px]="px" [style.height.px]="px" [innerHTML]="svg" aria-hidden="true"></span>`,
  styles: [`
    :host { display: inline-flex; }
    .pui-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .pui-icon ::ng-deep svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  `],
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
