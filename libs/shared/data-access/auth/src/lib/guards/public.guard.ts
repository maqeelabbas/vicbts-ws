import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Public guard - prevents authenticated users from accessing public-only pages
 * (like login, register) and redirects them to the home page
 */
export const publicGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated) {
    return true;
  }

  // User is authenticated, redirect to home
  return router.createUrlTree(['/']);
};
