export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeatureAccess {
  featureName: string;
  enabled: boolean;
  roles: string[];
}

export interface NavPermission {
  navItemId: string;
  allowedRoles: string[];
  isVisible: boolean;
}

export interface UserRoleAssignment {
  userId: string;
  roleIds: string[];
}
