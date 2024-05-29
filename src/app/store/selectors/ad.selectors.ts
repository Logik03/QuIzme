import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdState } from '../reducers/ad.reducers';

export const selectAdState = createFeatureSelector<AdState>('ad');

export const selectIsWatchingAd = createSelector(
  selectAdState,
  (state: AdState) => state.isWatchingAd
);

export const selectAdTimeLeft = createSelector(
  selectAdState,
  (state: AdState) => state.adTimeLeft
);