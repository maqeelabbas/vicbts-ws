# Identity Domain - Route Configuration Examples

## For apps/public-web/src/app/app.routes.ts

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  // Lazy-load identity user management
  {
    path: 'identity',
    loadChildren: () =>
      import('@vicbts/identity/feature-user-management').then(
        (m) => m.identityRoutes
      ),
  },
];
```

## For apps/admin-portal/src/app/app.routes.ts (future)

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  // Admin portal can also lazy-load identity management
  {
    path: 'users',
    loadChildren: () =>
      import('@vicbts/identity/feature-user-management').then(
        (m) => m.identityRoutes
      ),
  },
  // Or load specific components directly
  {
    path: 'user-management',
    loadComponent: () =>
      import('@vicbts/identity/feature-user-management').then(
        (m) => m.UserManagementComponent
      ),
  },
];
```

## Navigation Example

In your navigation component:

```typescript
// apps/public-web/src/app/layout/nav/nav.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <a routerLink="/home">Home</a>
      <a routerLink="/identity/users">User Management</a>
    </nav>
  `,
})
export class NavComponent {}
```

## Setting up API_CONFIG Provider

In your app.config.ts:

```typescript
// apps/public-web/src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { API_CONFIG } from '@vicbts/shared/data-access/api';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // Provide API base URL configuration
    {
      provide: API_CONFIG,
      useValue: { baseUrl: 'https://api.example.com/v1' },
    },
  ],
};
```
