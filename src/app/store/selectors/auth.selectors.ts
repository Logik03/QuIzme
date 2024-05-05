import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/auth.reducers';

// Get the authentication feature state
export const selectAuthState = createFeatureSelector<State>('auth');

// Get the isAuthenticated state
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: State) => state.isAuthenticated
);

// Get the user state
export const selectUser = createSelector(
  selectAuthState,
  (state: State) => state.user
);

// Get the errorMessage state
export const selectErrorMessage = createSelector(
  selectAuthState,
  (state: State) => state.errorMessage
);