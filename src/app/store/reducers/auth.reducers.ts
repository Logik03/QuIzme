import { Action, createReducer, on } from '@ngrx/store';
import * as AuthPageActions from '../actions/auth.actions';
import { IUser, IUserData, IUserResponse } from '../../core/models/user';

export interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  isRegistered: boolean;
  token: string | null;
  user: IUserData | null;
  email: string | null;
  errorMessage: string | null;
  selectedInterests: string[];
}
// Define initial state for authentication
export const initialState: State = {
  isLoading: false,
  isAuthenticated: false,
  isRegistered: false,
  user: null,
  email: null,
  token: null,
  errorMessage: null,
  selectedInterests: [],
};
// Reducer function for handling login actions
export const authReducer = createReducer(
  initialState,
  on(AuthPageActions.login, (state) => {
    console.log('Login action dispatched, updating state...');
    return { ...state, isLoading: true };
  }),
  on(AuthPageActions.signup, (state, { payload }) => {
    console.log('signup action dispatched, updating state...');
    return { ...state, isLoading: true, email: payload.email };
  }),
  on(AuthPageActions.loginSuccess, (state, { user }) => ({
    ...state,
    isLoading: false,
    isAuthenticated: true,
    isRegistered: true,
    user: user.data.user_data,
    token: user.data.token,
    errorMessage: null,
    selectedInterests: user.data.user_data.interests!,
    email: user.data.user_data.email!,
    
  })),
  on(AuthPageActions.signupSuccess, (state, { user }) => ({
    ...state,
    isLoading: false,
    isRegistered: true,
    token: user.data.jwt,
    errorMessage: null,
  })),
  on(AuthPageActions.loginFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage,
  })),
  on(AuthPageActions.signupFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage,
  })),
  on(AuthPageActions.selectInterests, (state, { payload }) => ({
    ...state,
    selectedInterests: payload.interest,
  })),
  on(AuthPageActions.selectInterestsSuccess, (state, { interests }) => ({
    ...state,
    selectedInterests: interests.data.interests,
    // You might want to perform additional tasks here if needed
  })),
  on(AuthPageActions.selectInterestsFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
    hasSelectedInterests: false,
  })),
  on(AuthPageActions.logout, () => initialState)
);
