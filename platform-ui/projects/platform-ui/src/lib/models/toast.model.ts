export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastVariant = 'soft' | 'filled';

export type ToastPosition =
  'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface ToastAction {
  label: string;
  callback: () => void;
}

export interface ToastConfig {
  message: string;
  title?: string;
  type?: ToastType;
  variant?: ToastVariant;
  duration?: number;
  showProgress?: boolean;
  dismissible?: boolean;
  position?: ToastPosition;
  action?: ToastAction;
}

export interface Toast {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
  variant: ToastVariant;
  duration: number;
  showProgress: boolean;
  dismissible: boolean;
  position: ToastPosition;
  action?: ToastAction;
  createdAt: number;
  paused?: boolean;
}
