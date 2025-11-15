import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessage, ToastType } from '@vicbts/shared/models';

/**
 * Notification service for displaying toast messages
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toastSubject = new Subject<ToastMessage>();
  public toast$ = this.toastSubject.asObservable();

  private idCounter = 0;

  /**
   * Show success toast
   */
  success(message: string, duration = 5000): void {
    this.show(ToastType.SUCCESS, message, duration);
  }

  /**
   * Show error toast
   */
  error(message: string, duration = 7000): void {
    this.show(ToastType.ERROR, message, duration);
  }

  /**
   * Show info toast
   */
  info(message: string, duration = 5000): void {
    this.show(ToastType.INFO, message, duration);
  }

  /**
   * Show warning toast
   */
  warn(message: string, duration = 5000): void {
    this.show(ToastType.WARNING, message, duration);
  }

  /**
   * Show toast with custom configuration
   */
  private show(type: ToastType, message: string, duration: number): void {
    const toast: ToastMessage = {
      id: `toast-${++this.idCounter}`,
      type,
      message,
      duration,
    };
    this.toastSubject.next(toast);
  }
}
