import { Route } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';

export const identityRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UserManagementComponent,
    title: 'User Management',
  },
];
