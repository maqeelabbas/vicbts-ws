import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ToastMessage, ToastType } from '@vicbts/shared/models';

// Note: This component should be provided with NotificationService
// from the consuming application's providers
export abstract class NotificationService {
  abstract toast$: Subject<ToastMessage>;
}

/**
 * Toast container component - displays toast notifications
 */
@Component({
  selector: 'lib-v-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div
        *ngFor="let toast of toasts"
        class="toast toast-{{ toast.type }}"
        [@slideIn]
        (@slideIn.done)="onAnimationDone()">
        <div class="toast-icon">{{ getIcon(toast.type) }}</div>
        <div class="toast-content">
          <p class="toast-message">{{ toast.message }}</p>
        </div>
        <button
          class="toast-close"
          (click)="dismissToast(toast)"
          type="button"
          aria-label="Close notification">
          ×
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        pointer-events: none;
      }

      .toast {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        min-width: 300px;
        max-width: 500px;
        padding: 16px;
        margin-bottom: 12px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        pointer-events: auto;
        animation: slideIn 0.3s ease-out;
        border-left: 4px solid;
      }

      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .toast-success {
        border-left-color: #10b981;
      }

      .toast-error {
        border-left-color: #ef4444;
      }

      .toast-warning {
        border-left-color: #f59e0b;
      }

      .toast-info {
        border-left-color: #3b82f6;
      }

      .toast-icon {
        font-size: 24px;
        flex-shrink: 0;
      }

      .toast-content {
        flex: 1;
      }

      .toast-message {
        margin: 0;
        color: #1f2937;
        font-size: 14px;
        line-height: 1.5;
      }

      .toast-close {
        background: none;
        border: none;
        font-size: 24px;
        color: #6b7280;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .toast-close:hover {
        color: #1f2937;
      }
    `,
  ],
})
export class VToastContainerComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);
  private destroy$ = new Subject<void>();

  toasts: ToastMessage[] = [];

  ngOnInit(): void {
    this.notificationService.toast$
      .pipe(takeUntil(this.destroy$))
      .subscribe((toast) => {
        this.toasts.push(toast);

        // Auto-dismiss after duration
        if (toast.duration && toast.duration > 0) {
          setTimeout(() => {
            this.dismissToast(toast);
          }, toast.duration);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dismissToast(toast: ToastMessage): void {
    const index = this.toasts.findIndex((t) => t.id === toast.id);
    if (index !== -1) {
      this.toasts.splice(index, 1);
    }
  }

  getIcon(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS:
        return '✓';
      case ToastType.ERROR:
        return '✕';
      case ToastType.WARNING:
        return '⚠';
      case ToastType.INFO:
        return 'ℹ';
      default:
        return 'ℹ';
    }
  }

  onAnimationDone(): void {
    // Animation complete
  }
}
