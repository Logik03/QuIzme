import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { GameService } from '../../core/services/game.service';
import * as GameActions from '../actions/game.actions';
import * as PlayerActions from '../actions/player.actions';
import { Store, select } from '@ngrx/store';
import { PlayerState } from '../reducers/player.reducers';
import { selectPlayerState } from '../selectors/player.selectors';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private gameService: GameService,
    private store: Store<{ player: PlayerState }>
  ) {}

  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.loadQuestions),
      mergeMap(() =>
        this.gameService.getQuestions().pipe(
          map((questions : any) => GameActions.loadQuestionsSuccess({ questions })),
          catchError(error => of(GameActions.loadQuestionsFailure({ error })))
        )
      )
    )
  );

  startGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.startGame),
      withLatestFrom(this.store.pipe(select(selectPlayerState))),
      mergeMap(([action, player]) => {
        const playerActions = [];
        if (!player.freeGameUsed) {
          playerActions.push(PlayerActions.useFreeGame());
        } else {
          playerActions.push(PlayerActions.useChance());
        }
        return [
          GameActions.loadQuestions(),
          ...playerActions
        ];
      })
    )
  );
}