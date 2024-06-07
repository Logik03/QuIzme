export interface IResponse {
  success: boolean;
  message: string;
  status: string;
  data: any;
}

export interface IStartGameResponse {
  player?: Player;
  questions: Question[];
  adverts: Advert[];
  playerId: string;
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
  awnser?: string;
  isconstant?: boolean;
  for_day?: string;
}

export interface Advert {
  _id: string;
  name: string;
  url: string[];
  __v: number;
  id: string;
}

export interface ISubmitAnswer {
  end_time: string;
  awnsers: Awnser[];
}

export interface Awnser {
  questionId: string;
  awnser: string;
}


export interface IPlayerHistory {
  user: string
  no_of_plays: number
  played_today: boolean
  score: number
  started_at: string
  game_score: number
  id: string
}
