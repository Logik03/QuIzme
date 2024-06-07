import { createAction, props } from '@ngrx/store';
import {  IPlayer } from '../../core/models/user';


export const loadPlayer = createAction('Game/API] Load Player', props<{ playerId: string }>());
export const loadPlayerSuccess = createAction('[Game/API] Load Player Success', props<{ playerId: string}>());
export const loadPlayerFailure = createAction('[Game/API] Load Player Failure', props<{ error: any }>());

export const resetDailyLimits = createAction('[Game/API] Reset Daily Limits');

export const useFreeGame = createAction('[Game/API] Use Free Game');
export const useChance = createAction('[Game/API] Use Chance');
export const resetPlayerState = createAction('[Game/API] Reset State');
export const updatePlayerId = createAction('[Game/API] Update Player Id', props<{ playerId: string }>());
export const updatePlayerState = createAction('[Game/API] Update Player State', props<{ updates: Partial<IPlayer> }>());