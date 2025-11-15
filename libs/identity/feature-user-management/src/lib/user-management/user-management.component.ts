import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VTableComponent, VButtonComponent, VCardComponent, VInputComponent, TableColumn, TableAction } from '@vicbts/shared/ui';
import { User, UserRole } from '@vicbts/shared/models';
import { UserApiService, RoleApiService, Role } from '@vicbts/identity/data-access';

@Component({
  selector: 'lib-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VTableComponent,
    VButtonComponent,
    VCardComponent,
    VInputComponent,
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  private userApiService = inject(UserApiService);
  private roleApiService = inject(RoleApiService);

  users: User[] = [];
  roles: Role[] = [];
  loading = false;
  showEditPanel = false;
  selectedUser: User | null = null;
  selectedRoleIds: string[] = [];

  columns: TableColumn[] = [
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'isActive', label: 'Status', sortable: true },
  ];

  actions: TableAction<User>[] = [
    {
      label: 'Edit',
      icon: '✎',
      handler: (user) => this.editUser(user),
    },
    {
      label: 'Deactivate',
      icon: '✕',
      handler: (user) => this.toggleUserStatus(user),
      visible: (user) => user.isActive,
    },
    {
      label: 'Activate',
      icon: '✓',
      handler: (user) => this.toggleUserStatus(user),
      visible: (user) => !user.isActive,
    },
  ];

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.loading = true;
    this.userApiService.getList().subscribe({
      next: (result) => {
        this.users = result.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      },
    });
  }

  loadRoles(): void {
    this.roleApiService.getActiveRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error('Error loading roles:', error);
      },
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.showEditPanel = true;
    
    // Load user's current roles
    this.userApiService.getUserRoles(user.id).subscribe({
      next: (roleIds) => {
        this.selectedRoleIds = roleIds;
      },
      error: (error) => {
        console.error('Error loading user roles:', error);
      },
    });
  }

  closeEditPanel(): void {
    this.showEditPanel = false;
    this.selectedUser = null;
    this.selectedRoleIds = [];
  }

  saveUser(): void {
    if (!this.selectedUser) return;

    this.loading = true;

    // Update user profile
    this.userApiService.updateProfile(this.selectedUser.id, {
      firstName: this.selectedUser.firstName,
      lastName: this.selectedUser.lastName,
      email: this.selectedUser.email,
    }).subscribe({
      next: () => {
        // Assign roles
        if (!this.selectedUser) return;
        this.userApiService.assignRoles(this.selectedUser.id, this.selectedRoleIds).subscribe({
          next: () => {
            this.loadUsers();
            this.closeEditPanel();
            this.loading = false;
          },
          error: (error) => {
            console.error('Error assigning roles:', error);
            this.loading = false;
          },
        });
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.loading = false;
      },
    });
  }

  toggleUserStatus(user: User): void {
    this.userApiService.toggleUserStatus(user.id, !user.isActive).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error toggling user status:', error);
      },
    });
  }

  onRoleToggle(roleId: string, checked: boolean): void {
    if (checked) {
      if (!this.selectedRoleIds.includes(roleId)) {
        this.selectedRoleIds.push(roleId);
      }
    } else {
      this.selectedRoleIds = this.selectedRoleIds.filter(id => id !== roleId);
    }
  }

  isRoleSelected(roleId: string): boolean {
    return this.selectedRoleIds.includes(roleId);
  }

  getUserRoleDisplay(user: User): string {
    return UserRole[user.role] || user.role;
  }

  getUserStatusDisplay(user: User): string {
    return user.isActive ? 'Active' : 'Inactive';
  }
}
