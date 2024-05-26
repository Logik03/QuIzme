export interface IUser {
    data: any;
    id?: string;
    email?: string;
    password?: string;
    token?: string;
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
    email : string;
    username : string;
    fullname : string;
    interests: string [];
    id : string;
}

export interface ISigninModel  {
    email : string;
    password : string;
    rememberMe? : boolean;
}

export interface ISignupModel {
    email : string;
    fullname : string;
    password: string;
    username: string;
}