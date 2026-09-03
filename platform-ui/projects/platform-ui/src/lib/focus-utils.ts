/**
 * document.activeElement only resolves as deep as the outermost shadow host
 * when focus lives inside a shadow tree — most components in this library
 * are ShadowDom-encapsulated, so the "active element" is usually a custom
 * element like <pui-lib-card>, not the actual focusable node inside it.
 * Calling .focus() back on that host later does nothing (hosts aren't
 * focusable themselves), so dialogs must walk into nested shadow roots to
 * find and restore focus to the real element.
 */
export function getDeepActiveElement(): HTMLElement | null {
  let el = document.activeElement as HTMLElement | null;
  while (el?.shadowRoot?.activeElement) {
    el = el.shadowRoot.activeElement as HTMLElement;
  }
  return el;
}
