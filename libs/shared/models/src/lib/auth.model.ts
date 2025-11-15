import { User } from './user.model';

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Login response from API
 */
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number; // seconds until token expires
}

/**
 * Refresh token response
 */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

/**
 * Token storage data structure
 */
export interface TokenStorage {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number; // timestamp
  rememberMe: boolean;
}

/**
 * Storage strategy type
 */
export enum StorageStrategy {
  LOCAL = 'local',
  SESSION = 'session',
}
