import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DialogConfig, DialogButtons } from '@vicbts/shared/models';

/**
 * Dialog result
 */
export interface DialogResult {
  id: string;
  result: boolean;
}

/**
 * Internal dialog state
 */
interface DialogState extends DialogConfig {
  id: string;
  resultSubject: Subject<boolean>;
}

/**
 * Dialog service for displaying confirmation dialogs
 */
@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialogSubject = new Subject<DialogState>();
  private closeSubject = new Subject<string>();

  public dialog$ = this.dialogSubject.asObservable();
  public close$ = this.closeSubject.asObservable();

  private idCounter = 0;

  /**
   * Show confirmation dialog with Yes/No buttons
   */
  confirm(config: Omit<DialogConfig, 'buttons'>): Observable<boolean> {
    return this.show({
      ...config,
      buttons: DialogButtons.YES_NO,
    });
  }

  /**
   * Show delete confirmation dialog
   */
  confirmDelete(config: {
    title: string;
    message: string;
  }): Observable<boolean> {
    return this.show({
      ...config,
      buttons: DialogButtons.DELETE_CANCEL,
      icon: '🗑️',
    });
  }

  /**
   * Show save confirmation dialog
   */
  confirmSave(config: { title: string; message: string }): Observable<boolean> {
    return this.show({
      ...config,
      buttons: DialogButtons.SAVE_CANCEL,
      icon: '💾',
    });
  }

  /**
   * Show alert dialog with Close button
   */
  alert(config: { title: string; message: string }): Observable<boolean> {
    return this.show({
      ...config,
      buttons: DialogButtons.CLOSE,
    });
  }

  /**
   * Show custom dialog
   */
  show(config: DialogConfig): Observable<boolean> {
    const id = `dialog-${++this.idCounter}`;
    const resultSubject = new Subject<boolean>();

    const dialogState: DialogState = {
      ...config,
      id,
      resultSubject,
      buttons: config.buttons || DialogButtons.OK_CANCEL,
    };

    this.dialogSubject.next(dialogState);

    return resultSubject.asObservable();
  }

  /**
   * Close dialog with result
   */
  closeDialog(id: string): void {
    this.closeSubject.next(id);
    // Note: The dialog component should complete the resultSubject
  }
}
