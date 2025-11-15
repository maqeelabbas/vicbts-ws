import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '@vicbts/shared/data-access/api';
import { User } from '@vicbts/shared/models';

@Injectable({ providedIn: 'root' })
export class UserApiService extends BaseApiService<User> {
  protected override get endpoint(): string {
    return 'users';
  }

  /**
   * Get all active users
   */
  getActiveUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/active`);
  }

  /**
   * Get user by email
   */
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/by-email/${email}`);
  }

  /**
   * Activate or deactivate a user
   */
  toggleUserStatus(userId: string, isActive: boolean): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${userId}/status`, { isActive });
  }

  /**
   * Update user profile information
   */
  updateProfile(userId: string, profile: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${userId}/profile`, profile);
  }

  /**
   * Assign roles to a user
   */
  assignRoles(userId: string, roleIds: string[]): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${userId}/roles`, { roleIds });
  }

  /**
   * Remove roles from a user
   */
  removeRoles(userId: string, roleIds: string[]): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${userId}/roles`, { 
      body: { roleIds } 
    });
  }

  /**
   * Get user's assigned roles
   */
  getUserRoles(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/${userId}/roles`);
  }
}
