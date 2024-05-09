export interface IUser {
    data: any;
    id?: string;
    email?: string;
    password?: string;
    token?: string;
}

export interface IUserResponse {
    data : string;
    success: string;
    message: string;
    status: string;
}

export interface ISigninModel  {
    email : string;
    password : string;
    rememberMe? : boolean;
}