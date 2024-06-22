export interface IUser {
  data: any;
  id?: string;
  email?: string;
  password?: string;
  token?: string;
}

export interface IPlayer extends IUser {
  freeGameUsed: boolean;
  chancesLeft: number;
  lastReset: Date;
}

export interface IUserResponse {
  data: {
    token: string;
    user_data: IUserData; // Assuming UserData is another interface for user data
    jwt: string;
  };
  success: string;
  message: string;
  status: string;
}

export interface IUserData {
  email?: string;
  username?: string;
  fullname?: string;
  interests?: string[];
  id?: string;
  country?: string;
  zip_code?: string;
  address?: string;
  state?: string;
  gender?: string;
  phone_number?: string;
  avatar?: string
}

export interface ISigninModel {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IForgotPasswordModel {
  email: string;
}
export interface IResetPasswordModel {
  email: string;
  token: string;
  password: string;
}

export interface ISignupModel {
  email: string;
  fullname: string;
  password: string;
  username: string;
}
export interface IQuestions {
  _id: string;
  content: string;
  options: [];
  __v: string;
  id: string;
}
export interface IAnswer {
  _id: string;
  content: string;
  options: [];
  __v: string;
  id: string;
}
export interface ISubmissionResult {
  _id: string;
  content: string;
  options: [];
  __v: string;
  id: string;
}
