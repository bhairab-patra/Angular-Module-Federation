import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent, ButtonComponent, CardComponent, IconComponent } from '@solifi/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';

@Component({
  selector: 'docs-modal-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, ModalComponent, ButtonComponent, CardComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent {
  cdr = inject(ChangeDetectorRef);
  fwTab = 'angular';

  basicOpen   = false;
  confirmOpen = false;
  successOpen = false;
  formOpen    = false;

  xfwRows = [
    { name: 'open',            angular: '[open]="isOpen"',          attr: 'open',              js: 'el.open = true'          },
    { name: 'title',           angular: 'title="Dialog"',           attr: 'title="Dialog"',    js: 'el.title = "Dialog"'     },
    { name: 'size',            angular: 'size="lg"',                attr: 'size="lg"',          js: 'el.size = "lg"'          },
    { name: 'closeOnBackdrop', angular: '[closeOnBackdrop]="false"', attr: 'close-on-backdrop="false"', js: 'el.closeOnBackdrop = false' },
    { name: 'closed',          angular: '(closed)="fn()"',          attr: '—',                 js: 'el.addEventListener(…)'  },
  ];

  api: ApiRow[] = [
    { input: 'open',            type: 'boolean',             default: 'false',    description: 'Controls visibility — set to true to show, false to hide.' },
    { input: 'title',           type: 'string',              default: `'Dialog'`, description: 'Header title text.' },
    { input: 'size',            type: `'sm'|'md'|'lg'`,      default: `'md'`,     description: 'Dialog width — sm 360px · md 520px · lg 720px.' },
    { input: 'closeOnBackdrop', type: 'boolean',             default: 'true',     description: 'Click backdrop to close.' },
    { input: '(closed)',        type: 'EventEmitter<void>',  default: '—',        description: 'Fires when backdrop or ✕ is clicked — sync your state here.' },
  ];
}
