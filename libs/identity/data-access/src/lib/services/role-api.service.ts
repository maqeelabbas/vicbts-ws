import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '@vicbts/shared/data-access/api';
import { Role, UserRoleAssignment } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleApiService extends BaseApiService<Role> {
  protected override get endpoint(): string {
    return 'roles';
  }

  /**
   * Get all active roles
   */
  getActiveRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/active`);
  }

  /**
   * Get role by name
   */
  getRoleByName(name: string): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/by-name/${name}`);
  }

  /**
   * Assign permissions to a role
   */
  assignPermissions(roleId: string, permissionIds: string[]): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/${roleId}/permissions`, { permissionIds });
  }

  /**
   * Remove permissions from a role
   */
  removePermissions(roleId: string, permissionIds: string[]): Observable<Role> {
    return this.http.delete<Role>(`${this.baseUrl}/${roleId}/permissions`, { 
      body: { permissionIds } 
    });
  }

  /**
   * Bulk assign roles to multiple users
   */
  bulkAssignRoles(assignments: UserRoleAssignment[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/bulk-assign`, { assignments });
  }

  /**
   * Get users with a specific role
   */
  getUsersByRole(roleId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/${roleId}/users`);
  }
}
