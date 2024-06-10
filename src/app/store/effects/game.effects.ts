import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { GameService } from '../../core/services/game.service';
import * as GameActions from '../actions/game.actions';
import * as PlayerActions from '../actions/player.actions';
import { Store, select } from '@ngrx/store';
import { PlayerState } from '../reducers/player.reducers';
import { selectPlayerId, selectPlayerState } from '../selectors/player.selectors';
import { Router } from '@angular/router';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private gameService: GameService,
    private store: Store<{ player: PlayerState }>,
    private router : Router,
  ) {}

  /* loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.loadQuestions),
      mergeMap(() =>
        this.gameService.getQuestions().pipe(
          map((questions : any) => GameActions.loadQuestionsSuccess({ questions })),
          catchError(error => of(GameActions.loadQuestionsFailure({ error })))
        )
      )
    )
  ); */
  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.loadQuestions),
      mergeMap(() =>
        this.gameService.getQuestions().pipe(
          tap(response => {
            const { playerId } = response.data;
            this.store.dispatch(PlayerActions.updatePlayerId({ playerId }));
          }),
          map(response => {
            const { questions } = response.data;
            return GameActions.loadQuestionsSuccess({ questions });
          }),
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
      }),
      tap(() => {
        this.router.navigate(['/dashboard/game']);
      })
    )
  );

  submitAnswers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.submitAnswers),
      withLatestFrom(this.store.pipe(select(selectPlayerId))), // Combine the action with the latest player ID
      switchMap(([action, playerId]) => { 
        console.log('Action:', action);
        console.log('Player ID:', playerId);
        return this.gameService.submitAnswer(playerId, { awnsers: action.awnsers }).pipe(
          map((result: any) => GameActions.submitSuccess({ result })),
          tap(() =>  this.router.navigate(['/dashboard'], { replaceUrl: true })),
          catchError(error => of(GameActions.submitFailure({ error })))
        );
      })
    )
  );
}