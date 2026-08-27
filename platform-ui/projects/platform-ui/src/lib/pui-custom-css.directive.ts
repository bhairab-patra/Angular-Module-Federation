import { Directive, ElementRef, Input, inject } from '@angular/core';

/**
 * Escape hatch for consumers who need to override a style this component
 * doesn't expose as a --pui-* CSS variable. The CSS string is injected as a
 * <style> tag INSIDE the component's own shadow root, so it can target any
 * internal class with normal CSS power — while the shadow boundary still
 * blocks the consumer's unrelated global CSS (e.g. a `* { color: red }`
 * reset) exactly as before. Applied to every pui-lib-* component via
 * `hostDirectives`, so it needs no per-component wiring beyond one line in
 * the @Component decorator.
 */
@Directive({
  selector: '[puiCustomCss]',
  standalone: true,
})
export class PuiCustomCssDirective {
  private _el = inject(ElementRef);
  private _styleEl: HTMLStyleElement | null = null;

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
    // Always (re)append last so it wins the cascade over the component's
    // own compiled styles, regardless of when those were inserted.
    root.appendChild(this._styleEl);
  }
}
