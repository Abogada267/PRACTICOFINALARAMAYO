import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthService } from '../../../app/layout/auth/auth/auth.service';
import { selectAuthUser } from '../store/auth/selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService: AuthService = inject(AuthService); 
  const store = inject(Store);
  
  return store.select(selectAuthUser).pipe(
    map((user) => {
      return user?.role === 'ADMIN'
        ? true
        : router.createUrlTree(['dashboard', 'home']);
    })
  );
};

