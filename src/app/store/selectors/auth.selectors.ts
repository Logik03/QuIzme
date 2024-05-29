import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State  as AuthState} from '../reducers/auth.reducers';
//import { AuthState } from '../app.states';

// Get the authentication feature state
export const selectAuthState = createFeatureSelector<AuthState>('authState');

// Get the isAuthenticated state
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
export const selectEmail = createSelector(
  selectAuthState,
  (state: AuthState) => state.email
);
export const selectAuthToken= createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);
export const selectIsRegistered = createSelector(
  selectAuthState,
  (state: AuthState) => state.isRegistered
);

//Get the user selected interests 
export const selectHasSelectedInterests = createSelector(
  selectAuthState,
  (state: AuthState) => state.selectedInterests || []
);

// Get the user state
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

// Get the errorMessage state
export const selectErrorMessage = createSelector(
  selectAuthState,
  (state: AuthState) => state.errorMessage
);