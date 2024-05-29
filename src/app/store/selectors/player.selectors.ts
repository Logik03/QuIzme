import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState} from '../reducers/player.reducers';

export const selectPlayerState = createFeatureSelector<PlayerState>('player');

export const selectPlayerId = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.playerId
);

export const selectFreeGameUsed = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.freeGameUsed
);

export const selectChancesLeft = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.chancesLeft
);

export const selectLastReset = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.lastReset
);