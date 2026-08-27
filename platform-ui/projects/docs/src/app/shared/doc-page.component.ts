import { Component, Input, OnInit, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface ApiRow {
  input: string; type: string; default: string; description: string;
}

@Component({
  selector: 'docs-page',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss'],
})
export class DocPageComponent implements OnInit {
  @Input() title       = '';
  @Input() description = '';
  @Input() code        = '';
  @Input() api: ApiRow[] = [];
  @Input() hasFramework  = false;

  copied = false;
  active  = 'demo';

  private readonly customCssRow: ApiRow = {
    input: 'customCss',
    type: 'string',
    default: 'undefined',
    description: 'Escape hatch for styles no --pui-* variable covers. Pass a raw CSS string and it\'s injected as a <style> tag inside this component\'s own shadow root, so it can target any of the component\'s internal classes. See the "Overriding CSS With customCss" FAQ section for details and examples.',
  };

  /** Every component's API table gets a customCss row automatically, so
   * consumers always see this escape hatch is available — without needing
   * every page's own api array to list it by hand. */
  get apiWithCustomCss(): ApiRow[] {
    if (!this.api.length) return this.api;
    if (this.api.some(r => r.input === 'customCss')) return this.api;
    return [...this.api, this.customCssRow];
  }

  ngOnInit(): void { this.active = 'demo'; }

  scrollTo(id: string): void {
    this.active = id;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const ids = ['api', ...(this.code ? ['usage'] : []), ...(this.hasFramework ? ['framework'] : []), 'demo'];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) { this.active = id; return; }
    }
    this.active = 'demo';
  }

  copy(): void {
    navigator.clipboard.writeText(this.code).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }
  trackByIndex(_i: number): number { return _i; }
}
