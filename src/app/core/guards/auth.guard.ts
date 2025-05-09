import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { selectHasSelectedInterests, selectIsAuthenticated } from '../../store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const store: Store<AppState> = inject(Store);
    const router: Router = inject(Router);
  
    return store.pipe(
      select(selectIsAuthenticated),
      tap(isAuthenticated => {
        console.log('Is Authenticated:', isAuthenticated);
      }),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true; // Allow navigation if authenticated
        } else {
          return router.createUrlTree(['/auth/login']); // Redirect to login if not authenticated
        }
      })
    );
  };
