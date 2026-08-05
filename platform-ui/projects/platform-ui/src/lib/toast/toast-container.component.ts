import {
  Component, ChangeDetectionStrategy, inject, signal, OnInit
} from '@angular/core';
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
  selector: 'pui-toast-container',
  standalone: true,
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <ng-container *ngFor="let pos of positions">
      <div class="pui-tc" [class]="'pui-tc--' + pos" *ngIf="byPosition(pos).length > 0">
        <div *ngFor="let t of byPosition(pos); trackBy: trackById"
             class="pui-toast"
             [class]="'pui-toast--' + t.type"
             [class.pui-toast--exit]="exiting.has(t.id)"
             (mouseenter)="pauseTimer(t)"
             (mouseleave)="resumeTimer(t)">

          <!-- Left accent bar -->
          <span class="pui-toast__bar"></span>

          <!-- Icon -->
          <span class="pui-toast__icon" [innerHTML]="icons[t.type]"></span>

          <!-- Body -->
          <div class="pui-toast__body">
            <div *ngIf="t.title" class="pui-toast__title">{{ t.title }}</div>
            <div class="pui-toast__msg">{{ t.message }}</div>
            <button *ngIf="t.action" class="pui-toast__action" (click)="runAction(t)">
              {{ t.action.label }}
            </button>
          </div>

          <!-- Dismiss -->
          <button *ngIf="t.dismissible" class="pui-toast__dismiss" (click)="dismiss(t.id)">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Progress bar -->
          <div *ngIf="t.showProgress && t.duration > 0" class="pui-toast__progress">
            <div class="pui-toast__progress-fill"
                 [class.pui-toast__progress-fill--paused]="paused.has(t.id)"
                 [style.animation-duration.ms]="t.duration"
                 [style.animation-play-state]="paused.has(t.id) ? 'paused' : 'running'">
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [`
    /* Container positions */
    .pui-tc {
      position: fixed; z-index: 9999;
      display: flex; flex-direction: column; gap: 10px;
      pointer-events: none; padding: 16px;
      max-width: 400px; width: 100%;
    }
    .pui-tc--top-right    { top: 0; right: 0; }
    .pui-tc--top-left     { top: 0; left:  0; }
    .pui-tc--top-center   { top: 0; left: 50%; transform: translateX(-50%); }
    .pui-tc--bottom-right { bottom: 0; right: 0; flex-direction: column-reverse; }
    .pui-tc--bottom-left  { bottom: 0; left:  0; flex-direction: column-reverse; }
    .pui-tc--bottom-center{ bottom: 0; left: 50%; transform: translateX(-50%); flex-direction: column-reverse; }

    /* Toast */
    .pui-toast {
      pointer-events: all; position: relative; overflow: hidden;
      display: flex; align-items: flex-start; gap: 12px;
      background: #fff; border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.08);
      padding: 14px 14px 14px 4px; min-width: 280px;
      animation: pui-toast-in .28s cubic-bezier(.34,1.56,.64,1) both;
    }
    .pui-toast--exit { animation: pui-toast-out .22s ease-in forwards; }

    @keyframes pui-toast-in {
      from { opacity: 0; transform: translateX(24px) scale(.95); }
      to   { opacity: 1; transform: translateX(0)    scale(1);   }
    }
    .pui-tc--top-left .pui-toast,
    .pui-tc--bottom-left .pui-toast {
      animation-name: pui-toast-in-left;
    }
    @keyframes pui-toast-in-left {
      from { opacity: 0; transform: translateX(-24px) scale(.95); }
      to   { opacity: 1; transform: translateX(0)     scale(1);   }
    }
    .pui-tc--top-center .pui-toast,
    .pui-tc--bottom-center .pui-toast {
      animation-name: pui-toast-in-center;
    }
    @keyframes pui-toast-in-center {
      from { opacity: 0; transform: translateY(-14px) scale(.95); }
      to   { opacity: 1; transform: translateY(0)     scale(1);   }
    }
    @keyframes pui-toast-out {
      to { opacity: 0; transform: scale(.9); max-height: 0; padding: 0; margin: 0; }
    }

    /* Accent bar */
    .pui-toast__bar { width: 4px; flex-shrink: 0; border-radius: 4px; align-self: stretch; min-height: 36px; margin: 0 0 0 10px; }
    .pui-toast--success .pui-toast__bar { background: #22c55e; }
    .pui-toast--error   .pui-toast__bar { background: #ef4444; }
    .pui-toast--warning .pui-toast__bar { background: #f59e0b; }
    .pui-toast--info    .pui-toast__bar { background: #3b82f6; }

    .pui-toast__icon { flex-shrink: 0; display: flex; align-items: center; margin-top: 1px; }

    /* Body */
    .pui-toast__body { flex: 1; min-width: 0; }
    .pui-toast__title { font-size: 13px; font-weight: 700; color: #111827; margin-bottom: 2px; font-family: 'Poppins', system-ui, sans-serif; }
    .pui-toast__msg   { font-size: 13px; color: #4b5563; line-height: 1.5; font-family: 'Poppins', system-ui, sans-serif; }
    .pui-toast__action {
      margin-top: 6px; font-size: 12px; font-weight: 600; font-family: inherit;
      background: none; border: none; cursor: pointer; padding: 0;
    }
    .pui-toast--success .pui-toast__action { color: #16a34a; }
    .pui-toast--error   .pui-toast__action { color: #dc2626; }
    .pui-toast--warning .pui-toast__action { color: #d97706; }
    .pui-toast--info    .pui-toast__action { color: #2563eb; }

    /* Dismiss */
    .pui-toast__dismiss {
      flex-shrink: 0; background: none; border: none; cursor: pointer;
      padding: 2px; color: #9ca3af; border-radius: 4px;
      display: flex; align-items: center; transition: color .12s, background .12s;
    }
    .pui-toast__dismiss:hover { color: #374151; background: #f3f4f6; }

    /* Progress */
    .pui-toast__progress { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: #f3f4f6; }
    .pui-toast__progress-fill {
      height: 100%; border-radius: 0 0 12px 12px;
      animation: pui-toast-progress linear forwards;
    }
    .pui-toast--success .pui-toast__progress-fill { background: #22c55e; }
    .pui-toast--error   .pui-toast__progress-fill { background: #ef4444; }
    .pui-toast--warning .pui-toast__progress-fill { background: #f59e0b; }
    .pui-toast--info    .pui-toast__progress-fill { background: #3b82f6; }

    @keyframes pui-toast-progress {
      from { width: 100%; }
      to   { width: 0%;   }
    }
  `],
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
