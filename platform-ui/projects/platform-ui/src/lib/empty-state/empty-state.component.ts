import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { EmptyStateSize } from '../models/empty-state.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-empty-state',
  standalone: true,
  imports: [NgIf, IconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class PuiEmptyStateComponent {
  @Input() icon = 'inbox';
  @Input() title = 'Nothing here yet';
  @Input() description = '';
  @Input() size: EmptyStateSize = 'md';
}
