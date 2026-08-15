import {
  Component, Input, ViewChild, ElementRef, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, inject
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'docs-framework-preview',
  standalone: true,
  imports: [NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './framework-preview.component.html',
  styleUrls: ['./framework-preview.component.scss'],
})
export class FrameworkPreviewComponent implements AfterViewInit {
  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  @Input() angularCode = '';
  @Input() reactCode = '';
  @Input() htmlCode = '';

  @ViewChild('reactSlot') reactSlot?: ElementRef<HTMLElement>;

  mode: 'preview' | 'code' = 'preview';
  activeFw: 'angular' | 'react' | 'html' = 'angular';
  copied = false;
  hasReactPreview = false;

  ngAfterViewInit(): void {
    this.hasReactPreview = (this.reactSlot?.nativeElement?.childElementCount ?? 0) > 0;
    this.cdr.markForCheck();
  }

  readonly frameworks = [
    {
      id: 'angular' as const, label: 'Angular',
      icon: `<svg width="14" height="14" viewBox="0 0 24 24"><path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999 0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.31H4.936L12 3.405z" fill="#c3002f"/></svg>`
    },
    {
      id: 'react' as const, label: 'React',
      icon: `<svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.05" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/></svg>`
    },
    {
      id: 'html' as const, label: 'HTML',
      icon: `<svg width="14" height="14" viewBox="0 0 24 24"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/></svg>`
    },
  ];

  get currentCode(): string {
    if (this.activeFw === 'angular') return this.angularCode;
    if (this.activeFw === 'react') return this.reactCode;
    return this.htmlCode;
  }

  setMode(m: 'preview' | 'code'): void {
    this.mode = m;
    this.cdr.markForCheck();
  }

  setFw(fw: 'angular' | 'react' | 'html'): void {
    if (fw === 'html') return;
    this.activeFw = fw;
    this.cdr.markForCheck();
  }

  copy(): void {
    navigator.clipboard.writeText(this.currentCode).then(() => {
      this.copied = true;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = false; this.cdr.markForCheck(); }, 2000);
    });
  }
  trackByIndex(_i: number): number { return _i; }
}
