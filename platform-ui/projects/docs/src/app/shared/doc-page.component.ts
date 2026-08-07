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
}
