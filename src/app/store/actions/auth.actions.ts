import { createAction, props } from '@ngrx/store';
import { ISigninModel, IUser, IUserResponse } from '../../core/models/user';


export const login = createAction('[Auth/API] Login',props<{ payload : ISigninModel}>());

// Action for login success
export const loginSuccess = createAction('[Auth/API] Login Success',props<{ user: IUserResponse }>());
  
// Action for login failure
export const loginFailure = createAction('[Auth/API] Login Failure',props<{ errorMessage: string }>());

// Action for logout
export const logout = createAction('[Auth/API] Logout');
export const refreshToken = createAction('[Auth/API] Refresh Token Successful', props<{ token: any}>());
export const refreshTokenSuccess = createAction('[Auth/API] Refresh Token Successful', props<{ toke: any}>());
export const initForgottenPassword = createAction('[Auth/API] Init Forgotten Password', props<{ email: string }>());

export const initForgottenPasswordSuccess = createAction('[Auth/API] Init Forgotten Password Successful', props<{ res: any }>());

export const initForgottenPasswordFailure = createAction('[Auth/API] Init Forgotten Password Failed', props<{ err: any }>());

export const verifyForgottenPasswordOTP = createAction('[Auth/API] Verify Forgotten Password OTP', props<{ otp: string}>());

export const verifyForgottenPasswordOTPSuccess = createAction('[Auth/API] Forgotten Password OTP Successful', props<{ res: any }>());

export const verifyForgottenPasswordOTPFailure = createAction('[Auth/API] Forgotten Password OTP Failed', props<{ err: any }>());

export const resetForgottenPassword = createAction('[Auth/API] Reset Forgotten Password', props<{ password: string}>());

export const resetForgottenPasswordSuccess = createAction('[Auth/API] Reset Forgotten Password Successful', props<{ res: any }>());

export const resetForgottenPasswordFailure = createAction('[Auth/API] Reset Forgotten Password Failed', props<{ err: any }>());