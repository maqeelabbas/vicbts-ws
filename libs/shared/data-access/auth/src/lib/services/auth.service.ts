import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  User,
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
} from '@vicbts/shared/models';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenStorage = inject(TokenStorageService);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check for existing valid tokens on initialization
    this.initializeAuth();
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Initialize authentication state from stored tokens
   */
  private initializeAuth(): void {
    const tokens = this.tokenStorage.getTokens();
    if (tokens && !this.tokenStorage.isTokenExpired()) {
      // Token exists and is valid, but we need to fetch user data
      // For now, we'll mark as authenticated and let the app fetch user data
      this.isAuthenticatedSubject.next(true);
      // TODO: Optionally fetch current user from /api/auth/me
    }
  }

  /**
   * Login user with credentials
   */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('/api/auth/login', credentials)
      .pipe(
        tap((response) => {
          // Store tokens
          this.tokenStorage.saveTokens(
            response.accessToken,
            response.refreshToken,
            response.expiresIn,
            credentials.rememberMe || false
          );

          // Update auth state
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  /**
   * Refresh access token using refresh token
   */
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.tokenStorage.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<RefreshTokenResponse>('/api/auth/refresh', { refreshToken })
      .pipe(
        tap((response) => {
          this.tokenStorage.updateAccessToken(
            response.accessToken,
            response.expiresIn
          );
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  /**
   * Logout user and clear tokens
   */
  logout(): void {
    this.tokenStorage.clearTokens();
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role?.toString() === role;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserSubject.value;
    if (!user) return false;
    return roles.some((role) => user.role?.toString() === role);
  }

  /**
   * Get current user from API
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/auth/me').pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }
}

