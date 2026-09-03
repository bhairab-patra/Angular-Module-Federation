import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[puiCustomCss]',
  standalone: true,
})
export class PuiCustomCssDirective {
  private _styleEl: HTMLStyleElement | null = null;

  constructor(private _el: ElementRef) {}

  @Input() set customCss(css: string | undefined | null) {
    const root = (this._el.nativeElement as HTMLElement).shadowRoot;
    if (!root) return;

    if (!css) {
      this._styleEl?.remove();
      this._styleEl = null;
      return;
    }

    if (!this._styleEl) {
      this._styleEl = document.createElement('style');
      this._styleEl.setAttribute('data-pui-custom-css', '');
    }
    this._styleEl.textContent = css;

    root.appendChild(this._styleEl);
  }
}
