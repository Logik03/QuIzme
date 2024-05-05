import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthenticationService } from '../../core/services/authentication.service';
import * as AuthPageActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      // Filters by Action Creator 'login'
      ofType(AuthPageActions.login),
      exhaustMap(action =>
        this.authService.login(action.payload).pipe(
          map(user => AuthPageActions.loginSuccess({ user })),
          catchError(error => of(AuthPageActions.loginFailure({ errorMessage: error.message })))
        )
      )
    )
  );

  // You might want to add additional effects for handling logout in a similar manner.

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService
  ) {}
}