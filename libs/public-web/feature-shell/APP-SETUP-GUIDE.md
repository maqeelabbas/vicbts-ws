# Public Web App Configuration Guide

## 1. Nx Command to Generate Feature Shell

```bash
$env:NX_PLUGIN_NO_TIMEOUTS='true'; npx nx g @nx/angular:library --name=feature-shell --directory=libs/public-web/feature-shell --tags=type:feature,scope:public-web --standalone --style=scss
```

## 2. App Bootstrap with APP_INITIALIZER

### apps/public-web/src/app/app.config.ts

```typescript
import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ConfigService, initializeApp } from '@vicbts/shared/data-access/config';
import { API_CONFIG } from '@vicbts/shared/data-access/api';
import { publicWebRoutes } from '@vicbts/public-web/feature-shell';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(publicWebRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    
    // Provide API base URL
    {
      provide: API_CONFIG,
      useValue: { 
        baseUrl: 'https://api.vicbts.com/v1' 
      },
    },
    
    // Initialize app configuration before bootstrap
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => 
        initializeApp(configService, 'public-web'),
      deps: [ConfigService],
      multi: true,
    },
  ],
};
```

### apps/public-web/src/main.ts

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PublicShellComponent } from '@vicbts/public-web/feature-shell';

bootstrapApplication(PublicShellComponent, appConfig).catch((err) =>
  console.error(err)
);
```

## 3. Alternative: Using App Component as Root

If you prefer to keep a root AppComponent:

### apps/public-web/src/app/app.component.ts

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: [],
})
export class AppComponent {}
```

### apps/public-web/src/app/app.routes.ts

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@vicbts/public-web/feature-shell').then(
        (m) => m.publicWebRoutes
      ),
  },
];
```

### apps/public-web/src/app/app.config.ts (alternative)

```typescript
import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ConfigService, initializeApp } from '@vicbts/shared/data-access/config';
import { API_CONFIG } from '@vicbts/shared/data-access/api';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    
    {
      provide: API_CONFIG,
      useValue: { baseUrl: 'https://api.vicbts.com/v1' },
    },
    
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => 
        initializeApp(configService, 'public-web'),
      deps: [ConfigService],
      multi: true,
    },
  ],
};
```

### apps/public-web/src/main.ts (alternative)

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
```

## 4. Mock API Response for Configuration

The ConfigService expects a response from `/api/config?app=public-web`:

```json
{
  "appId": "public-web",
  "appName": "VicBts Public",
  "logoUrl": "/assets/logo.png",
  "theme": {
    "primaryColor": "#696cff",
    "mode": "light",
    "layout": "vertical",
    "contentWidth": "full"
  },
  "navigation": [
    {
      "id": "home",
      "label": "Home",
      "route": "/",
      "icon": "🏠"
    },
    {
      "id": "about",
      "label": "About",
      "route": "/about",
      "icon": "ℹ️"
    },
    {
      "id": "dashboard",
      "label": "Dashboard",
      "route": "/dashboard",
      "icon": "📊",
      "permissions": ["authenticated"]
    },
    {
      "id": "admin",
      "label": "Admin",
      "route": "/identity/users",
      "icon": "👥",
      "permissions": ["admin"]
    }
  ],
  "featureFlags": {
    "enableChat": true,
    "enableNotifications": true,
    "betaFeatures": false
  },
  "pageSize": 20
}
```

## 5. Usage in Header Component

The PublicShellComponent already demonstrates using `navItems$`:

```typescript
// In template
<a
  *ngFor="let navItem of navItems$ | async"
  [routerLink]="navItem.route"
  routerLinkActive="active"
  [hidden]="!isNavItemVisible(navItem)"
  class="nav-link">
  <span *ngIf="navItem.icon" class="nav-icon">{{ navItem.icon }}</span>
  {{ navItem.label }}
</a>

// In component
isNavItemVisible(navItem: NavItem): boolean {
  // If nav item has permissions, check if user is authenticated
  if (navItem.permissions && navItem.permissions.length > 0) {
    return this.authService.isAuthenticated;
  }
  return true;
}
```

## 6. Theme Usage

CSS variables are automatically applied by ConfigService:

```scss
.my-component {
  color: var(--primary-color); // Uses theme.primaryColor
  
  // Theme mode
  [data-theme='dark'] & {
    background-color: #1a1d21;
  }
  
  // Layout
  [data-layout='horizontal'] & {
    flex-direction: row;
  }
  
  // Content width
  [data-content-width='boxed'] & {
    max-width: 1200px;
  }
}
```

## 7. Feature Flags

```typescript
import { ConfigService } from '@vicbts/shared/data-access/config';

export class MyComponent {
  private configService = inject(ConfigService);
  
  ngOnInit() {
    if (this.configService.isFeatureEnabled('enableChat')) {
      // Show chat widget
    }
  }
}
```

## 8. Route Structure

```
/                    → Home (public)
/about               → About (public)
/dashboard           → Dashboard (protected by authGuard)
/identity/users      → User Management (lazy-loaded from identity feature)
```

## 9. Next Steps

1. Update `apps/public-web/src/app/app.config.ts` with APP_INITIALIZER
2. Update `apps/public-web/src/main.ts` to bootstrap PublicShellComponent
3. Set up a proxy configuration for `/api/config` endpoint
4. Add assets (logo) to `apps/public-web/src/assets/`
5. Customize theme colors in the config response
6. Add more routes as needed

## 10. Testing Configuration Loading

For development, you can use an HTTP interceptor to mock the config response:

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { of } from 'rxjs';

export const configMockInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/api/config')) {
    const mockConfig = {
      // ... mock config object from above
    };
    return of(new HttpResponse({ status: 200, body: mockConfig }));
  }
  return next(req);
};

// In app.config.ts
provideHttpClient(
  withInterceptors([configMockInterceptor]),
  withInterceptorsFromDi()
),
```
