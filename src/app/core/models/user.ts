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
/* export interface IQuestions {
    data: {
        adverts: [];
        games_played: number; // Assuming UserData is another interface for user data
        player_id: string;
        questions: {
            _id : string;
            content : string;
            for_day: Date,
            awnser: string,
            options: [];
            __v: string;
            id: string;
        }
    };  
} */
export interface IQuestion {
    awnser: string;
    _id: string;
    content: string;
    for_day: Date;
    isconstant:boolean;
    answer: string;
    options: [];
    __v: string;
    id: string;
}

export interface IGameData {
    adverts: any[]; // You can replace 'any' with the actual type of adverts
    games_played: number; // Assuming UserData is another interface for user data
    player_id: string;
    questions: IQuestion[];
}

export interface IQuestions {
    data:  IGameData;
}
export interface IAnswer {
  questionId: string;
  answer: string;
}
export interface ISubmissionResult {
    _id : string;
   content : string;
   options: [];
   __v: string;
   id: string;
}