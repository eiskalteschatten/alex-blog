import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '~/services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  return router.parseUrl('/auth/login');
};

export const adminAuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // TODO: and has admin role!
  if (authService.isLoggedIn) {
    return true;
  }

  return router.parseUrl('/auth/login');
};

export const reverseAuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    return true;
  }

  return router.parseUrl('/');
};
