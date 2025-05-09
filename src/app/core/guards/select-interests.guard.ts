import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { selectHasSelectedInterests, selectIsAuthenticated } from '../../store/selectors/auth.selectors';
import { Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { inject } from '@angular/core';

export const SelectInterestsGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const store: Store<AppState> = inject(Store);
  const router: Router = inject(Router);

  return store.pipe(
    select(selectHasSelectedInterests),
    tap(hasSelectedInterests => {
      console.log('Has Selected Interests:', hasSelectedInterests);
    }),
    map(hasSelectedInterests => {
      if (Array.isArray(hasSelectedInterests) && hasSelectedInterests.length > 0)  {
        return true; // Allow navigation if hasSelectedInterests is true
      } else {
        return router.createUrlTree(['select-interests']); // Navigate to hasSelectedInterests component if hasSelectedInterests is false
      }
    })
  );
};

  