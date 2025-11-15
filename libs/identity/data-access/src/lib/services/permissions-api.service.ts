import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '@vicbts/shared/data-access/api';
import { Permission } from '@vicbts/shared/models';

@Injectable({ providedIn: 'root' })
export class PermissionsApiService extends BaseApiService<Permission> {
  protected override get endpoint(): string {
    return 'permissions';
  }

  /**
   * Get permissions by resource
   */
  getPermissionsByResource(resource: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/by-resource/${resource}`);
  }

  /**
   * Get permissions by action
   */
  getPermissionsByAction(action: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/by-action/${action}`);
  }

  /**
   * Check if a user has a specific permission
   */
  checkUserPermission(userId: string, permissionId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check/${userId}/${permissionId}`);
  }

  /**
   * Get all permissions for a user (aggregated from roles)
   */
  getUserPermissions(userId: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * Get permissions for a specific role
   */
  getRolePermissions(roleId: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/role/${roleId}`);
  }
}
