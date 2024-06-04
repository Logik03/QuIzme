import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, take, tap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationService } from '../../core/services/authentication.service';
import * as AuthPageActions from '../actions/auth.actions';
import * as PlayerActions from '../actions/player.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPlayer } from '../actions/player.actions';
import { selectPlayerState } from '../selectors/player.selectors';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      // Filters by Action Creator 'login'
      ofType(AuthPageActions.login),
      exhaustMap(action =>
        this.authService.login(action.payload).pipe(
          map(user => AuthPageActions.loginSuccess({ user })),
          tap(() =>  this.router.navigate(['/dashboard'], { replaceUrl: true })),
          catchError(error => of(AuthPageActions.loginFailure({ errorMessage: error.message })))
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      // Filters by Action Creator 'login'
      ofType(AuthPageActions.signup),
      exhaustMap(action =>
        this.authService.signUp(action.payload).pipe(
          map(user => AuthPageActions.signupSuccess({ user })),
          tap(() => this.router.navigate(['/auth/email-verification'], { replaceUrl: true })),
          catchError(error => of(AuthPageActions.signupFailure({ errorMessage: error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.loginSuccess),
      tap(action => {
        const playerId = action.user.data.user_data.id; // assuming your user object has a playerId field
        this.store.dispatch(loadPlayer({ playerId }));
      })
    ), { dispatch: false }
  );

  selectInterests$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthPageActions.selectInterests),
      exhaustMap(action => 
        this.authService.selectInterests(action.payload).pipe(
          map(interests => AuthPageActions.selectInterestsSuccess({interests})),
          tap(() => {
            this.router.navigate(['/dashboard']);
          }),
          catchError(error => of(AuthPageActions.selectInterestsFailure({errorMessage:error.messagei})))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthPageActions.logout),
        tap(() => {
          localStorage.clear();
          this.router.navigate(['/welcome'], { replaceUrl: true });
          return PlayerActions.resetPlayerState();
        })
      ),
    { dispatch: false }
  );
  // You might want to add additional effects for handling logout in a similar manner.

  resetPlayerStateOnLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.logout),
      withLatestFrom(this.store.select(selectPlayerState)),
      map(([action, playerState]) => PlayerActions.resetPlayerState())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router : Router,
    private store: Store
  ) {}
}