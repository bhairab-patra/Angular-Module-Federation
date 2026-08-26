import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'docs-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}
  goStart(): void      { this.router.navigate(['/getting-started']); }
  goComponents(): void { this.router.navigate(['/badge']); }

  fw: 'html' | 'angular' | 'react' = 'html';
  copied = false;

  setFw(fw: 'html' | 'angular' | 'react'): void { this.fw = fw; }

  private readonly snippets: Record<'html' | 'angular' | 'react', string> = {
    html: `<pui-lib-button variant="primary" size="lg">
  Get Started
</pui-lib-button>`,
    angular: `<pui-lib-button variant="primary" size="lg" (click)="onGetStarted()">
  Get Started
</pui-lib-button>`,
    react: `<pui-lib-button variant="primary" size="lg" onClick={onGetStarted}>
  Get Started
</pui-lib-button>`,
  };

  get currentSnippet(): string { return this.snippets[this.fw]; }

  copySnippet(): void {
    navigator.clipboard.writeText(this.currentSnippet).then(() => {
      this.copied = true;
      setTimeout(() => { this.copied = false; }, 2000);
    });
  }
}
