import { createReducer, on } from '@ngrx/store';
import { IPlayer } from '../../core/models/user';
import * as PlayerActions from '../actions/player.actions';

export interface PlayerState {
  playerId: string;
  freeGameUsed: boolean;
  chancesLeft: number;
  lastReset: Date;
  isLoading: boolean;
}

export const initialState: PlayerState = {
  playerId: '',
  freeGameUsed: false,
  chancesLeft: 4,
  lastReset: new Date(),
  isLoading: false,
};

export const playerReducer = createReducer(
  initialState,
  on(PlayerActions.loadPlayer, (state) => {
    console.log('load player action is dispatched');
      return {...state, isLoading: true};
  }),
  on(PlayerActions.loadPlayerSuccess, (state, { player }) => ({
     ...state, 
     ...player 
  })),
  on(PlayerActions.loadPlayerFailure, (state, { error }) => ({
    ...state,
    isLoading:false,
    error,
  })),
  on(PlayerActions.resetDailyLimits, state => ({
    ...state,
    freeGameUsed: false,
    chancesLeft: 4,
    lastReset: new Date(),
  })),
  on(PlayerActions.useFreeGame, state => ({ 
    ...state, 
    freeGameUsed: true 
  })),
  on(PlayerActions.useChance, state => ({ 
    ...state, 
    chancesLeft: state.chancesLeft - 1 
  }))
);

