import { ConfigService } from './services/config.service';

/**
 * Factory function for APP_INITIALIZER
 * Loads configuration before the app starts
 */
export function initializeApp(configService: ConfigService, appId: string) {
  return (): Promise<void> => {
    return new Promise((resolve) => {
      configService.load(appId).subscribe({
        next: () => {
          console.log(`Configuration loaded for ${appId}`);
          resolve();
        },
        error: (error) => {
          console.error('Failed to load configuration, using defaults:', error);
          resolve(); // Resolve anyway to allow app to start with defaults
        },
      });
    });
  };
}
