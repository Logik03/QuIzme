export interface IUser {
    id?: string;
    email?: string;
    password?: string;
    token?: string;
}

export interface ISigninModel  {
    email : string;
    password : string;
    rememberMe? : boolean;
}