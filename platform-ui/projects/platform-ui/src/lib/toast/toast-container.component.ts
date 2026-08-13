import {
  Component, inject, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ToastService } from './toast.service';
import { Toast, ToastPosition } from '../models/toast.model';

const POSITIONS: ToastPosition[] = [
  'top-right', 'top-left', 'top-center',
  'bottom-right', 'bottom-left', 'bottom-center',
];

const ICONS: Record<string, string> = {
  success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M8 12l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#ef4444"/><path d="M15 9l-6 6M9 9l6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
  warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="#f59e0b"/><path d="M12 9v4M12 17h.01" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
  info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#3b82f6"/><path d="M12 16v-4M12 8h.01" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
};

@Component({
  selector: 'pui-lib-toast-container',
  standalone: true,
  imports: [NgFor, NgIf],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class PuiToastContainerComponent {
  private svc = inject(ToastService);
  icons = ICONS;
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
