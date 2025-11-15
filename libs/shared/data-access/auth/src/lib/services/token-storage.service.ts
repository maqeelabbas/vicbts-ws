import { Injectable } from '@angular/core';
import { TokenStorage } from '@vicbts/shared/models';

/**
 * Token storage service that handles persisting tokens
 * Uses localStorage for "remember me" and sessionStorage otherwise
 */
@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private readonly TOKEN_KEY = 'auth_tokens';

  /**
   * Save tokens with the appropriate storage strategy
   */
  saveTokens(
    accessToken: string,
    refreshToken: string | undefined,
    expiresIn: number,
    rememberMe: boolean
  ): void {
    const tokenData: TokenStorage = {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000, // convert seconds to milliseconds
      rememberMe,
    };

    const storage = this.getStorage(rememberMe);
    storage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
  }

  /**
   * Get stored tokens
   */
  getTokens(): TokenStorage | null {
    // Try localStorage first (for remember me)
    let tokenData = this.getFromStorage(localStorage);
    if (!tokenData) {
      // Try sessionStorage
      tokenData = this.getFromStorage(sessionStorage);
    }
    return tokenData;
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    const tokens = this.getTokens();
    if (!tokens) return null;

    // Check if token is expired
    if (Date.now() >= tokens.expiresAt) {
      this.clearTokens();
      return null;
    }

    return tokens.accessToken;
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    const tokens = this.getTokens();
    return tokens?.refreshToken || null;
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(): boolean {
    const tokens = this.getTokens();
    if (!tokens) return true;
    return Date.now() >= tokens.expiresAt;
  }

  /**
   * Update access token (after refresh)
   */
  updateAccessToken(accessToken: string, expiresIn: number): void {
    const tokens = this.getTokens();
    if (!tokens) return;

    tokens.accessToken = accessToken;
    tokens.expiresAt = Date.now() + expiresIn * 1000;

    const storage = this.getStorage(tokens.rememberMe);
    storage.setItem(this.TOKEN_KEY, JSON.stringify(tokens));
  }

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Get the appropriate storage based on remember me flag
   */
  private getStorage(rememberMe: boolean): Storage {
    return rememberMe ? localStorage : sessionStorage;
  }

  /**
   * Get token data from specific storage
   */
  private getFromStorage(storage: Storage): TokenStorage | null {
    const data = storage.getItem(this.TOKEN_KEY);
    if (!data) return null;

    try {
      return JSON.parse(data) as TokenStorage;
    } catch {
      return null;
    }
  }
}
