import { Action, createReducer, on } from '@ngrx/store';
import * as AuthPageActions from '../actions/auth.actions';
import { IUser, IUserResponse } from '../../core/models/user';

export interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: IUserResponse | null;
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
      console.log('Login action dispatched, updating state...');
        return {...state, isLoading: true};
    }),
    on(AuthPageActions.loginSuccess, (state, { user }) => ({
      ...state,
      isLoading:false,
      isAuthenticated: true,
      user,
      token : user.data,
      errorMessage: null,
    })),
    on(AuthPageActions.loginFailure, (state, { errorMessage }) => ({
      ...state,
      isLoading:false,
      errorMessage,
    })),
    on(AuthPageActions.logout, () => initialState)
  );
  