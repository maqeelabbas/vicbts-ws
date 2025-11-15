# Authentication, Sessions & Notifications - Integration Guide

## Overview
This document provides complete implementation details for authentication, session management, and notifications in the VicBts monorepo.

---

## 1. Authentication System

### Models (`libs/shared/models`)

#### Authentication Interfaces
```typescript
// LoginCredentials
interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// LoginResponse
interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

// TokenStorage
interface TokenStorage {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  rememberMe: boolean;
}
```

### Token Storage (`libs/shared/data-access/auth`)

#### TokenStorageService
Handles token persistence with remember-me strategy:

```typescript
class TokenStorageService {
  // Save tokens (localStorage for rememberMe=true, sessionStorage otherwise)
  saveTokens(accessToken, refreshToken, expiresIn, rememberMe): void
  
  // Get stored tokens
  getTokens(): TokenStorage | null
  
  // Get access token only
  getAccessToken(): string | null
  
  // Check if token is expired
  isTokenExpired(): boolean
  
  // Update access token (after refresh)
  updateAccessToken(accessToken, expiresIn): void
  
  // Clear all tokens
  clearTokens(): void
}
```

### AuthService (`libs/shared/data-access/auth`)

Complete authentication service with JWT support:

```typescript
class AuthService {
  // Observables
  isAuthenticated$: Observable<boolean>
  currentUser$: Observable<User | null>
  
  // Synchronous getters
  get isAuthenticated(): boolean
  get currentUser(): User | null
  
  // Methods
  login(credentials: LoginCredentials): Observable<LoginResponse>
  refreshToken(): Observable<RefreshTokenResponse>
  logout(): void
  getAccessToken(): string | null
  hasRole(role: string): boolean
  hasAnyRole(roles: string[]): boolean
  getCurrentUser(): Observable<User>
}
```

**Usage Example:**
```typescript
// Login
authService.login({
  email: 'user@example.com',
  password: 'password123',
  rememberMe: true
}).subscribe({
  next: (response) => {
    console.log('Logged in:', response.user);
    router.navigate(['/dashboard']);
  },
  error: (error) => {
    notificationService.error('Login failed');
  }
});

// Check authentication
authService.isAuthenticated$.subscribe(isAuth => {
  console.log('User authenticated:', isAuth);
});

// Logout
authService.logout(); // Clears tokens and redirects to /login
```

---

## 2. HTTP Interceptor

### AuthInterceptor (`libs/shared/data-access/auth`)

Functional interceptor that:
- Attaches JWT token to outgoing requests
- Handles 401 errors by attempting token refresh
- Handles 403 errors
- Automatically retries failed requests after token refresh

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Attaches: Authorization: Bearer <token>
  // Handles: 401 → refresh token → retry request
  // Handles: 403 → log warning
};
```

**Integration in app.config.ts:**
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@vicbts/shared/data-access/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    // ... other providers
  ]
};
```

---

## 3. Route Guards

### AuthGuard
Protects routes that require authentication:

```typescript
// Route configuration
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
```

### PublicGuard
Prevents authenticated users from accessing public-only pages:

```typescript
// Route configuration
{
  path: 'login',
  component: LoginComponent,
  canActivate: [publicGuard]
}
```

---

## 4. Notification System

### Models (`libs/shared/models`)

```typescript
enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface DialogConfig {
  title: string;
  message: string;
  buttons?: DialogButton[];
  icon?: string;
  width?: string;
}

// Predefined button sets
DialogButtons = {
  OK_CANCEL, YES_NO, DELETE_CANCEL,
  SAVE_CANCEL, CONFIRM_CANCEL, CLOSE
}
```

### NotificationService (`libs/shared/data-access/notifications`)

```typescript
class NotificationService {
  toast$: Observable<ToastMessage>
  
  success(message: string, duration?: number): void
  error(message: string, duration?: number): void
  info(message: string, duration?: number): void
  warn(message: string, duration?: number): void
}
```

**Usage Example:**
```typescript
// Inject service
private notificationService = inject(NotificationService);

// Show notifications
notificationService.success('User created successfully');
notificationService.error('Failed to save changes');
notificationService.info('Loading data...');
notificationService.warn('Your session will expire soon');
```

### DialogService (`libs/shared/data-access/notifications`)

```typescript
class DialogService {
  dialog$: Observable<DialogState>
  close$: Observable<string>
  
  // Standard dialogs
  confirm(config): Observable<boolean>
  confirmDelete(config): Observable<boolean>
  confirmSave(config): Observable<boolean>
  alert(config): Observable<boolean>
  
  // Custom dialog
  show(config: DialogConfig): Observable<boolean>
}
```

**Usage Examples:**
```typescript
// Inject service
private dialogService = inject(DialogService);

// Delete confirmation
dialogService.confirmDelete({
  title: 'Delete User',
  message: 'Are you sure you want to delete this user?'
}).subscribe(confirmed => {
  if (confirmed) {
    // Perform delete
  }
});

// Save confirmation
dialogService.confirmSave({
  title: 'Save Changes',
  message: 'Do you want to save your changes?'
}).subscribe(confirmed => {
  if (confirmed) {
    // Save changes
  }
});

// Yes/No confirmation
dialogService.confirm({
  title: 'Confirm Action',
  message: 'Are you sure?'
}).subscribe(result => {
  console.log('User chose:', result);
});

// Custom dialog
dialogService.show({
  title: 'Custom Dialog',
  message: 'Custom message',
  icon: '⚠️',
  buttons: [
    { text: 'Option 1', value: false },
    { text: 'Option 2', value: true, primary: true }
  ]
}).subscribe(result => {
  // Handle result
});
```

---

## 5. UI Components

### VToastContainerComponent (`libs/shared/ui`)

Displays toast notifications. Add to your root component:

```typescript
// app.component.ts
import { VToastContainerComponent } from '@vicbts/shared/ui';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <lib-v-toast-container></lib-v-toast-container>
  `,
  imports: [RouterOutlet, VToastContainerComponent]
})
export class AppComponent {}
```

Features:
- Auto-dismissal after duration
- Manual dismiss button
- Animated slide-in from right
- Color-coded by type (success=green, error=red, etc.)
- Stacked display for multiple toasts

### VDialogComponent (`libs/shared/ui`)

Displays modal confirmation dialogs. Add to your root component:

```typescript
// app.component.ts
import { VDialogComponent } from '@vicbts/shared/ui';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <lib-v-toast-container></lib-v-toast-container>
    <lib-v-dialog></lib-v-dialog>
  `,
  imports: [RouterOutlet, VToastContainerComponent, VDialogComponent]
})
export class AppComponent {}
```

Features:
- Modal overlay with backdrop
- Customizable buttons with colors
- Icon support
- Configurable width
- Click outside to dismiss
- Animated entrance

---

## 6. Complete Integration Example

### App Configuration
```typescript
// apps/public-web/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@vicbts/shared/data-access/auth';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ],
};
```

### Routes with Guards
```typescript
// apps/public-web/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard, publicGuard } from '@vicbts/shared/data-access/auth';

export const routes: Routes = [
  // Public routes (redirect if authenticated)
  {
    path: 'login',
    loadComponent: () => import('./pages/login.component'),
    canActivate: [publicGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register.component'),
    canActivate: [publicGuard]
  },
  
  // Protected routes (require authentication)
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard.component'),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile.component'),
    canActivate: [authGuard]
  },
  
  // Default redirects
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
```

### Root Component
```typescript
// apps/public-web/src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { 
  VToastContainerComponent, 
  VDialogComponent 
} from '@vicbts/shared/ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    VToastContainerComponent,
    VDialogComponent
  ],
  template: `
    <router-outlet></router-outlet>
    <lib-v-toast-container></lib-v-toast-container>
    <lib-v-dialog></lib-v-dialog>
  `
})
export class AppComponent {}
```

---

## 7. Real-World Usage Examples

### Login Component
See: `libs/shared/ui/src/lib/examples/login-example.component.ts`
- Form validation
- Error handling with notifications
- Remember me functionality
- Loading states
- Redirect after login

### Delete with Confirmation
See: `libs/shared/ui/src/lib/examples/delete-example.component.ts`
- Confirmation dialog before delete
- Loading states during delete
- Success/error notifications
- Multiple dialog types (save, discard, delete)

---

## 8. API Endpoints Expected

Your backend should implement these endpoints:

```
POST /api/auth/login
  Body: { email, password }
  Response: { user, accessToken, refreshToken, expiresIn }

POST /api/auth/refresh
  Body: { refreshToken }
  Response: { accessToken, refreshToken, expiresIn }

GET /api/auth/me
  Headers: { Authorization: Bearer <token> }
  Response: User object

POST /api/auth/logout
  (Optional, for server-side session invalidation)
```

---

## 9. Testing Tips

### Mock AuthService for Tests
```typescript
const mockAuthService = {
  isAuthenticated$: of(true),
  currentUser$: of(mockUser),
  login: jasmine.createSpy('login').and.returnValue(of(mockResponse)),
  logout: jasmine.createSpy('logout')
};
```

### Mock NotificationService for Tests
```typescript
const mockNotificationService = {
  success: jasmine.createSpy('success'),
  error: jasmine.createSpy('error'),
  info: jasmine.createSpy('info'),
  warn: jasmine.createSpy('warn')
};
```

---

## 10. Key Benefits

✅ **Token Management**: Automatic handling of JWT tokens with refresh
✅ **Remember Me**: localStorage vs sessionStorage strategy
✅ **HTTP Interceptor**: Automatic token attachment and error handling
✅ **Route Protection**: Guards for authenticated and public routes
✅ **User Feedback**: Consistent notifications and confirmations
✅ **Type Safety**: Full TypeScript interfaces
✅ **Reusable**: Shared across all apps in monorepo
✅ **Testable**: Services can be easily mocked
✅ **Accessible**: ARIA labels and keyboard navigation
✅ **Responsive**: Works on all screen sizes

---

## Files Created

### Models
- `libs/shared/models/src/lib/auth.model.ts`
- `libs/shared/models/src/lib/notification.model.ts`

### Services
- `libs/shared/data-access/auth/src/lib/services/token-storage.service.ts`
- `libs/shared/data-access/auth/src/lib/services/auth.service.ts` (updated)
- `libs/shared/data-access/notifications/src/lib/services/notification.service.ts`
- `libs/shared/data-access/notifications/src/lib/services/dialog.service.ts`

### Interceptors
- `libs/shared/data-access/auth/src/lib/interceptors/auth.interceptor.ts`

### Guards
- `libs/shared/data-access/auth/src/lib/guards/auth.guard.ts` (existing)
- `libs/shared/data-access/auth/src/lib/guards/public.guard.ts` (new)

### Components
- `libs/shared/ui/src/lib/v-toast-container/v-toast-container.component.ts`
- `libs/shared/ui/src/lib/v-dialog/v-dialog.component.ts`

### Examples
- `libs/shared/ui/src/lib/examples/login-example.component.ts`
- `libs/shared/ui/src/lib/examples/delete-example.component.ts`
