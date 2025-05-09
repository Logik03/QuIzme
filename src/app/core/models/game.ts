export interface IResponse {
  success: boolean;
  message: string;
  status: string;
  data: any;
}

export interface IStartGameResponse {
  player: Player;
  questions: Question[];
  adverts: Advert[];
}

export interface Player {
  user: string;
  started_at: number;
  score: number;
  ended_at: number;
  played_today: string;
  _id: string;
  __v: number;
  id: string;
}

export interface Question {
  _id: string;
  content: string;
  options: string[];
  __v: number;
  id: string;
}

export interface Advert {
  _id: string;
  name: string;
  url: string[];
  __v: number;
  id: string;
}
