import {
  Component, Input, Output, EventEmitter,
  ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { AlertType, AlertVariant, AlertAction } from '../models/alert.model';

const TYPE_ICONS: Record<AlertType, string> = {
  success: 'check-circle',
  error:   'close-circle',
  warning: 'warning',
  info:    'info',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-alert',
  standalone: true,
  imports: [NgIf, NgFor, IconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './alert.component.html',
  styleUrls:   ['./alert.component.scss'],
})
export class PuiAlertComponent {
  @Input() type:       AlertType    = 'info';
  @Input() variant:    AlertVariant = 'soft';
  @Input() title?:     string;
  @Input() message?:   string;
  @Input() dismissible = false;
  @Input() showIcon    = true;
  @Input() actions:    AlertAction[] = [];

  @Output() dismissed = new EventEmitter<void>();

  visible = true;

  get iconName(): string { return TYPE_ICONS[this.type]; }

  dismiss(): void {
    this.visible = false;
    this.dismissed.emit();
  }
}
