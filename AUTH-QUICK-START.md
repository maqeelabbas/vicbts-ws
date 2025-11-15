# Quick Start: Authentication & Notifications

This guide shows how to quickly integrate authentication, sessions, and notifications into your Angular app.

## Step 1: Add Components to Root

Update your root `app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VToastContainerComponent, VDialogComponent } from '@vicbts/shared/ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VToastContainerComponent, VDialogComponent],
  template: `
    <router-outlet></router-outlet>
    <lib-v-toast-container></lib-v-toast-container>
    <lib-v-dialog></lib-v-dialog>
  `
})
export class AppComponent {}
```

## Step 2: Configure HTTP Interceptor

Update your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@vicbts/shared/data-access/auth';
import { 
  NotificationService as NotificationServiceImpl,
  DialogService as DialogServiceImpl 
} from '@vicbts/shared/data-access/notifications';

// Import abstract classes from UI components
import { 
  NotificationService 
} from '@vicbts/shared/ui/lib/v-toast-container/v-toast-container.component';
import { 
  DialogService 
} from '@vicbts/shared/ui/lib/v-dialog/v-dialog.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    // Provide concrete implementations for abstract classes
    { provide: NotificationService, useClass: NotificationServiceImpl },
    { provide: DialogService, useClass: DialogServiceImpl },
  ],
};
```

## Step 3: Setup Routes with Guards

```typescript
import { Routes } from '@angular/router';
import { authGuard, publicGuard } from '@vicbts/shared/data-access/auth';

export const routes: Routes = [
  // Public routes
  {
    path: 'login',
    loadComponent: () => import('./pages/login.component'),
    canActivate: [publicGuard]
  },
  
  // Protected routes
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard.component'),
    canActivate: [authGuard]
  },
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
```

## Step 4: Use in Components

### Login Example

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@vicbts/shared/data-access/auth';
import { 
  NotificationService 
} from '@vicbts/shared/data-access/notifications';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="login()">
      <input [(ngModel)]="email" name="email" type="email" required />
      <input [(ngModel)]="password" name="password" type="password" required />
      <label>
        <input [(ngModel)]="rememberMe" name="rememberMe" type="checkbox" />
        Remember me
      </label>
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  email = '';
  password = '';
  rememberMe = false;

  login(): void {
    this.authService
      .login({ email: this.email, password: this.password, rememberMe: this.rememberMe })
      .subscribe({
        next: (response) => {
          this.notificationService.success(\`Welcome, \${response.user.firstName}!\`);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.notificationService.error('Invalid email or password');
        }
      });
  }
}
```

### Delete with Confirmation

```typescript
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
  DialogService, 
  NotificationService 
} from '@vicbts/shared/data-access/notifications';

@Component({
  selector: 'app-user-list',
  template: `
    <button (click)="deleteUser(user)">Delete</button>
  `
})
export class UserListComponent {
  private http = inject(HttpClient);
  private dialogService = inject(DialogService);
  private notificationService = inject(NotificationService);

  deleteUser(user: any): void {
    this.dialogService
      .confirmDelete({
        title: 'Delete User',
        message: \`Delete \${user.name}? This cannot be undone.\`
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.http.delete(\`/api/users/\${user.id}\`).subscribe({
            next: () => {
              this.notificationService.success('User deleted');
            },
            error: () => {
              this.notificationService.error('Delete failed');
            }
          });
        }
      });
  }
}
```

## Step 5: Backend API

Your backend should implement:

```
POST /api/auth/login
  Body: { email, password }
  Response: { user, accessToken, refreshToken?, expiresIn }

POST /api/auth/refresh
  Body: { refreshToken }
  Response: { accessToken, refreshToken?, expiresIn }

GET /api/auth/me
  Headers: Authorization: Bearer <token>
  Response: User object
```

## Features

✅ **JWT Authentication** with automatic token refresh
✅ **Remember Me** (localStorage vs sessionStorage)
✅ **HTTP Interceptor** attaches tokens automatically
✅ **Route Guards** protect authenticated/public routes
✅ **Toast Notifications** (success, error, info, warning)
✅ **Confirmation Dialogs** (delete, save, yes/no, custom)
✅ **401/403 Handling** automatic logout on auth errors
✅ **Type-Safe** full TypeScript support
✅ **Accessible** ARIA labels and keyboard navigation

## Full Documentation

See `AUTH-NOTIFICATIONS-GUIDE.md` for complete API reference.
