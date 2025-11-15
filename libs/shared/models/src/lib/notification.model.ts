/**
 * Toast notification type
 */
export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

/**
 * Toast notification message
 */
export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number; // milliseconds, 0 means no auto-dismiss
}

/**
 * Dialog button configuration
 */
export interface DialogButton {
  text: string;
  value: boolean;
  primary?: boolean; // visual emphasis
  color?: 'primary' | 'secondary' | 'danger' | 'success';
}

/**
 * Dialog configuration
 */
export interface DialogConfig {
  title: string;
  message: string;
  buttons?: DialogButton[];
  icon?: string;
  width?: string;
}

/**
 * Predefined dialog button sets
 */
export const DialogButtons = {
  OK_CANCEL: [
    { text: 'Cancel', value: false },
    { text: 'OK', value: true, primary: true, color: 'primary' as const },
  ],
  YES_NO: [
    { text: 'No', value: false },
    { text: 'Yes', value: true, primary: true, color: 'primary' as const },
  ],
  DELETE_CANCEL: [
    { text: 'Cancel', value: false },
    { text: 'Delete', value: true, primary: true, color: 'danger' as const },
  ],
  SAVE_CANCEL: [
    { text: 'Cancel', value: false },
    { text: 'Save', value: true, primary: true, color: 'success' as const },
  ],
  CONFIRM_CANCEL: [
    { text: 'Cancel', value: false },
    { text: 'Confirm', value: true, primary: true, color: 'primary' as const },
  ],
  CLOSE: [{ text: 'Close', value: false, primary: true, color: 'primary' as const }],
} as const;
