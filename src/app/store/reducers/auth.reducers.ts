import { Action, createReducer, on } from '@ngrx/store';
import * as AuthPageActions from '../actions/auth.actions';
import { IUser } from '../../core/models/user';

export interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  errorMessage: string | null;
}
// Define initial state for authentication
export const initialState: State = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    errorMessage: null,
};
// Reducer function for handling login actions
export const authReducer = createReducer(
    initialState,
    on(AuthPageActions.login, (state) => {
        return {...state, isLoading: true};
    }),
    on(AuthPageActions.loginSuccess, (state, { user }) => ({
      ...state,
      isLoading:false,
      isAuthenticated: true,
      user,
      errorMessage: null,
    })),
    on(AuthPageActions.loginFailure, (state, { errorMessage }) => ({
      ...state,
      errorMessage,
    })),
    on(AuthPageActions.logout, () => initialState)
  );
  