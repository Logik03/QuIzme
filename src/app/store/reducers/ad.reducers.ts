import { createReducer, on } from '@ngrx/store';
import * as AdActions from '../actions/ad.actions';

export interface AdState {
  isWatchingAd: boolean;
  adTimeLeft: number;
}

export const initialState: AdState = {
  isWatchingAd: false,
  adTimeLeft: 30,
};

export const adReducer = createReducer(
  initialState,
  on(AdActions.startAd, state => ({ 
    ...state, 
    isWatchingAd: true, 
    adTimeLeft: 30 
  })),
  on(AdActions.adTick, state => ({ 
    ...state, 
    adTimeLeft: state.adTimeLeft - 1 
  })),
  on(AdActions.endAd, state => ({ 
    ...state, 
    isWatchingAd: false 
  }))
);