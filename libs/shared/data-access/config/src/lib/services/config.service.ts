import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { ThemeConfig, NavItem } from '@vicbts/shared/models';
import { AppConfig } from '../models/app-config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private http = inject(HttpClient);
  
  private configSubject = new BehaviorSubject<AppConfig | null>(null);
  private themeSubject = new BehaviorSubject<ThemeConfig | null>(null);
  private navItemsSubject = new BehaviorSubject<NavItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Public observables
  public config$ = this.configSubject.asObservable();
  public theme$ = this.themeSubject.asObservable();
  public navItems$ = this.navItemsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  // Current values
  get config(): AppConfig | null {
    return this.configSubject.value;
  }

  get theme(): ThemeConfig | null {
    return this.themeSubject.value;
  }

  get navItems(): NavItem[] {
    return this.navItemsSubject.value;
  }

  /**
   * Load configuration for a specific app
   * This should be called during app initialization via APP_INITIALIZER
   */
  load(appId: string): Observable<AppConfig> {
    this.loadingSubject.next(true);

    return this.http.get<AppConfig>(`/api/config?app=${appId}`).pipe(
      tap((config) => {
        this.configSubject.next(config);
        this.themeSubject.next(config.theme);
        this.navItemsSubject.next(config.navigation);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        console.error('Error loading configuration:', error);
        this.loadingSubject.next(false);
        const defaultConfig = this.getDefaultConfig(appId);
        this.configSubject.next(defaultConfig);
        this.themeSubject.next(defaultConfig.theme);
        this.navItemsSubject.next(defaultConfig.navigation);
        return of(defaultConfig);
      })
    );
  }

  /**
   * Update theme configuration
   */
  updateTheme(theme: Partial<ThemeConfig>): void {
    const currentTheme = this.themeSubject.value;
    if (!currentTheme) return;

    const updatedTheme = { ...currentTheme, ...theme };
    this.themeSubject.next(updatedTheme);

    // Also update in main config
    const currentConfig = this.configSubject.value;
    if (currentConfig) {
      this.configSubject.next({ ...currentConfig, theme: updatedTheme });
    }
  }

  /**
   * Check if a feature flag is enabled
   */
  isFeatureEnabled(featureName: string): boolean {
    const config = this.configSubject.value;
    return config?.featureFlags?.[featureName] ?? false;
  }

  /**
   * Get app setting by key
   */
  getSetting<T>(key: keyof AppConfig): T | undefined {
    const config = this.configSubject.value;
    return config?.[key] as T | undefined;
  }

  /**
   * Get default configuration as fallback
   */
  private getDefaultConfig(appId: string): AppConfig {
    return {
      appId,
      appName: 'VicBts',
      logoUrl: '/assets/logo.svg',
      theme: {
        primaryColor: '#696cff',
        mode: 'light',
        layout: 'vertical',
        contentWidth: 'full',
      },
      navigation: [
        {
          id: 'home',
          label: 'Home',
          route: '/',
        },
        {
          id: 'services',
          label: 'Services',
          route: '/services',
        },
        {
          id: 'contact',
          label: 'Contact',
          route: '/contact',
        },
        {
          id: 'about',
          label: 'About',
          route: '/about',
        },
      ],
      featureFlags: {},
      pageSize: 20,
    };
  }
}

