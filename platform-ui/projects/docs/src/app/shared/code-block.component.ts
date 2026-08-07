import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-code',
  standalone: true,
  template: `
    <div class="cw">
      <div class="ch">
        <span class="cl">{{ lang }}</span>
        <button class="cb" (click)="copyClick.emit({ text: text, id: id })">
          {{ copied === id ? '✓ Copied' : 'Copy' }}
        </button>
      </div>
      <pre><code>{{ text }}</code></pre>
    </div>
  `,
  styles: [`
    .cw  { border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; margin-bottom: 6px; }
    .ch  { display: flex; align-items: center; justify-content: space-between; padding: 10px 20px; background: #1e293b; border-bottom: 1px solid #334155; }
    .cl  { font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; font-family: 'Fira Code', monospace; }
    .cb  { padding: 3px 12px; border-radius: 5px; border: 1px solid #334155; background: #0f172a; color: #94a3b8; font-size: 12px; cursor: pointer; font-family: inherit; transition: color .12s, border-color .12s; }
    .cb:hover { color: #e2e8f0; border-color: #475569; }
  `],
})
export class CodeBlockComponent {
  @Input() lang   = '';
  @Input() id     = '';
  @Input() text   = '';
  @Input() copied = '';
  @Output() copyClick = new EventEmitter<{ text: string; id: string }>();
}
