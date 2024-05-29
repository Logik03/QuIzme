import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from '../reducers/game.reducers';

export const selectGameState = createFeatureSelector<GameState>('game');

export const selectQuestions = createSelector(
  selectGameState,
  (state: GameState) => state.questions
);

export const selectCurrentQuestionIndex = createSelector(
  selectGameState,
  (state: GameState) => state.currentQuestionIndex
);

export const selectTimeLeft = createSelector(
  selectGameState,
  (state: GameState) => state.timeLeft
);

export const selectAnswers = createSelector(
  selectGameState,
  (state: GameState) => state.answers
);

export const selectIsSubmitting = createSelector(
  selectGameState,
  (state: GameState) => state.isSubmitting
);

export const selectSubmissionResult = createSelector(
  selectGameState,
  (state: GameState) => state.submissionResult
);