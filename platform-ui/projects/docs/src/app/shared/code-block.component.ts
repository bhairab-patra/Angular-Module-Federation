import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'docs-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent {
  @Input() lang = '';
  @Input() id = '';
  @Input() text = '';
  @Input() copied = '';
  @Output() copyClick = new EventEmitter<{ text: string; id: string }>();
}
