import { Action, createReducer, on } from '@ngrx/store';
import * as AuthPageActions from '../actions/auth.actions';
import { IUser, IUserData, IUserResponse } from '../../core/models/user';

export interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: IUserData | null;
  errorMessage: string | null;
  hasSelectedInterests: boolean;
  selectedInterests: string[];
}
// Define initial state for authentication
export const initialState: State = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    hasSelectedInterests: false,
    selectedInterests: [],
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
      user:user.data.user_data,
      token : user.data.token,
      errorMessage: null,
    })),
    on(AuthPageActions.loginFailure, (state, { errorMessage }) => ({
      ...state,
      isLoading:false,
      errorMessage,
    })),
    on(AuthPageActions.selectInterests, (state, { payload }) => ({
      ...state,
      selectedInterests: payload.interests,
    })),
    on(AuthPageActions.selectInterestsSuccess, (state, { interests }) => ({
      ...state,
      selectedInterests: interests,
      hasSelectedInterests: true,
      // You might want to perform additional tasks here if needed
    })),
    on(AuthPageActions.selectInterestsFailure, (state, { errorMessage }) => ({
      ...state,
      errorMessage,
      hasSelectedInterests: false,
    })),
    on(AuthPageActions.logout, () => initialState)
  );
  