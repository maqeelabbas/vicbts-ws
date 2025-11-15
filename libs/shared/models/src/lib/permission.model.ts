export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: PermissionAction;
}

export enum PermissionAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
