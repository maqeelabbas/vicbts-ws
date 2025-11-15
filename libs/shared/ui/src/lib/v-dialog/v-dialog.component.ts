import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, Observable } from 'rxjs';
import { DialogConfig } from '@vicbts/shared/models';

// Note: This component should be provided with DialogService
// from the consuming application's providers
export abstract class DialogService {
  abstract dialog$: Observable<ActiveDialog>;
  abstract close$: Observable<string>;
  abstract closeDialog(id: string): void;
}

interface ActiveDialog extends DialogConfig {
  id: string;
  resultSubject: Subject<boolean>;
}

/**
 * Dialog component - displays confirmation dialogs
 */
@Component({
  selector: 'lib-v-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="dialog-overlay" 
      *ngIf="activeDialog" 
      (click)="onOverlayClick()"
      (keydown.escape)="onOverlayClick()"
      role="presentation"
      tabindex="-1">
      <div
        class="dialog"
        [style.width]="activeDialog.width || '400px'"
        (click)="$event.stopPropagation()"
        (keydown)="$event.stopPropagation()"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'dialog-title-' + activeDialog.id">
        <div class="dialog-header">
          <span *ngIf="activeDialog.icon" class="dialog-icon">{{
            activeDialog.icon
          }}</span>
          <h2 class="dialog-title">{{ activeDialog.title }}</h2>
        </div>

        <div class="dialog-body">
          <p class="dialog-message">{{ activeDialog.message }}</p>
        </div>

        <div class="dialog-footer">
          <button
            *ngFor="let button of activeDialog.buttons"
            type="button"
            class="dialog-button"
            [class.primary]="button.primary"
            [class.button-primary]="button.color === 'primary'"
            [class.button-danger]="button.color === 'danger'"
            [class.button-success]="button.color === 'success'"
            [class.button-secondary]="button.color === 'secondary'"
            (click)="onButtonClick(button.value)">
            {{ button.text }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.2s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .dialog {
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 90vw;
        animation: slideUp 0.3s ease-out;
      }

      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .dialog-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 24px 24px 16px;
      }

      .dialog-icon {
        font-size: 32px;
      }

      .dialog-title {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #1f2937;
      }

      .dialog-body {
        padding: 0 24px 24px;
      }

      .dialog-message {
        margin: 0;
        color: #4b5563;
        font-size: 15px;
        line-height: 1.6;
      }

      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px 24px 24px;
        border-top: 1px solid #e5e7eb;
      }

      .dialog-button {
        padding: 10px 20px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        background: white;
        color: #374151;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .dialog-button:hover {
        background: #f9fafb;
      }

      .dialog-button.button-primary {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }

      .dialog-button.button-primary:hover {
        background: #2563eb;
      }

      .dialog-button.button-danger {
        background: #ef4444;
        color: white;
        border-color: #ef4444;
      }

      .dialog-button.button-danger:hover {
        background: #dc2626;
      }

      .dialog-button.button-success {
        background: #10b981;
        color: white;
        border-color: #10b981;
      }

      .dialog-button.button-success:hover {
        background: #059669;
      }

      .dialog-button.button-secondary {
        background: #6b7280;
        color: white;
        border-color: #6b7280;
      }

      .dialog-button.button-secondary:hover {
        background: #4b5563;
      }
    `,
  ],
})
export class VDialogComponent implements OnInit, OnDestroy {
  private dialogService = inject(DialogService);
  private destroy$ = new Subject<void>();

  activeDialog: ActiveDialog | null = null;

  ngOnInit(): void {
    this.dialogService.dialog$
      .pipe(takeUntil(this.destroy$))
      .subscribe((dialog) => {
        this.activeDialog = dialog as ActiveDialog;
      });

    this.dialogService.close$
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => {
        if (this.activeDialog && this.activeDialog.id === id) {
          this.activeDialog = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onButtonClick(result: boolean): void {
    if (this.activeDialog) {
      this.activeDialog.resultSubject.next(result);
      this.activeDialog.resultSubject.complete();
      this.dialogService.closeDialog(this.activeDialog.id);
      this.activeDialog = null;
    }
  }

  onOverlayClick(): void {
    // Close dialog when clicking overlay (treating as cancel)
    this.onButtonClick(false);
  }
}
