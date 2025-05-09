import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as PlayerActions from '../actions/player.actions';
import { GameService } from '../../core/services/game.service';
import { selectPlayerId, selectLastReset } from '../selectors/player.selectors';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private playerService: GameService,
    private store: Store
  ) {}

  loadPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayer),
      switchMap(() =>
        this.store.pipe(
          select(selectPlayerId),
          map(playerId => PlayerActions.loadPlayerSuccess({ playerId })),
          catchError(error => of(PlayerActions.loadPlayerFailure({ error })))
        )
      )
    )
  );

  resetDailyLimits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayerSuccess),
      withLatestFrom(this.store.select(selectLastReset)),
      mergeMap(([action, lastReset]) => {
        const now = new Date();
        const lastResetDate = new Date(lastReset);
        if (now.getTime() - lastResetDate.getTime() > 24 * 60 * 60 * 1000) {
          return of(PlayerActions.resetDailyLimits());
        } else {
          return of();
        }
      })
    )
  );
}