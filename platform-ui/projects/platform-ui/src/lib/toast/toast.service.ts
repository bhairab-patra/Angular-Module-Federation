import { Injectable, signal, computed } from '@angular/core';
import { Toast, ToastConfig, ToastPosition, ToastVariant } from '../models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts = computed(() => this._toasts());

  private _defaultPosition: ToastPosition = 'top-right';
  private _defaultVariant: ToastVariant   = 'soft';
  private _defaultDuration  = 4000;
  private _maxToasts        = 6;

  configure(opts: {
    position?: ToastPosition;
    variant?: ToastVariant;
    duration?: number;
    maxToasts?: number;
  }): void {
    if (opts.position  !== undefined) this._defaultPosition = opts.position;
    if (opts.variant   !== undefined) this._defaultVariant  = opts.variant;
    if (opts.duration  !== undefined) this._defaultDuration  = opts.duration;
    if (opts.maxToasts !== undefined) this._maxToasts        = opts.maxToasts;
  }

  show(config: ToastConfig): string {
    const id = Math.random().toString(36).slice(2, 9);
    const toast: Toast = {
      id,
      message:      config.message,
      ...(config.title    !== undefined && { title:    config.title }),
      ...(config.action   !== undefined && { action:   config.action }),
      type:         config.type         ?? 'info',
      variant:      config.variant      ?? this._defaultVariant,
      duration:     config.duration     ?? this._defaultDuration,
      showProgress: config.showProgress ?? true,
      dismissible:  config.dismissible  ?? true,
      position:     config.position     ?? this._defaultPosition,
      createdAt:    Date.now(),
    };

    this._toasts.update(list => [toast, ...list].slice(0, this._maxToasts));

    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }
    return id;
  }

  success(message: string, config?: Partial<ToastConfig>): string {
    return this.show({ ...config, message, type: 'success' });
  }
  error(message: string, config?: Partial<ToastConfig>): string {
    return this.show({ ...config, message, type: 'error' });
  }
  warning(message: string, config?: Partial<ToastConfig>): string {
    return this.show({ ...config, message, type: 'warning' });
  }
  info(message: string, config?: Partial<ToastConfig>): string {
    return this.show({ ...config, message, type: 'info' });
  }

  dismiss(id: string): void {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }

  dismissAll(): void {
    this._toasts.set([]);
  }
}
