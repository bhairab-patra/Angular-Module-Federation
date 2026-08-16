import {
  Component, inject, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ToastService } from './toast.service';
import { Toast, ToastPosition } from '../models/toast.model';
import { IconComponent } from '../icon/icon.component';

const POSITIONS: ToastPosition[] = [
  'top-right', 'top-left', 'top-center',
  'bottom-right', 'bottom-left', 'bottom-center',
];

/* Maps toast type → icon name in ICON_REGISTRY */
const TYPE_ICON: Record<string, string> = {
  success: 'check-circle',
  error:   'close-circle',
  warning: 'warning',
  info:    'info',
};

@Component({
  selector: 'pui-lib-toast-container',
  standalone: true,
  imports: [NgFor, NgIf, IconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class PuiToastContainerComponent {
  private svc = inject(ToastService);
  typeIcon = TYPE_ICON;
  positions = POSITIONS;
  exiting = new Set<string>();
  paused  = new Set<string>();

  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  byPosition(pos: ToastPosition): Toast[] {
    return this.svc.toasts().filter(t => t.position === pos);
  }

  trackById(_: number, t: Toast): string { return t.id; }

  dismiss(id: string): void {
    this.exiting.add(id);
    setTimeout(() => {
      this.exiting.delete(id);
      this.svc.dismiss(id);
    }, 220);
  }

  runAction(t: Toast): void {
    t.action?.callback();
    this.dismiss(t.id);
  }

  pauseTimer(t: Toast): void  { this.paused.add(t.id); }
  resumeTimer(t: Toast): void { this.paused.delete(t.id); }
}
