import { createReducer, on } from '@ngrx/store';
import * as GameActions from '../actions/game.actions';
import {  IQuestions, IAnswer,ISubmissionResult } from '../../core/models/user';

export interface GameState {
  questions: IQuestions[];
  currentQuestionIndex: number;
  timeLeft: number;
  answers: IAnswer[];
  isSubmitting: boolean;
  submissionResult: ISubmissionResult | null;
}

export const initialState: GameState = {
  questions: [],
  currentQuestionIndex: 0,
  timeLeft: 60,
  answers: [],
  isSubmitting: false,
  submissionResult: null,
};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.startGame, state => ({ 
    ...state, 
    currentQuestionIndex: 0, 
    timeLeft: 60, 
    answers: [] 
  })),
  on(GameActions.loadQuestionsSuccess, (state, { questions }) => ({ 
    ...state, 
    questions 
  })),
  on(GameActions.answerQuestion, (state, { answer }) => ({
    ...state,
    answers: [...state.answers, answer],
    currentQuestionIndex: state.currentQuestionIndex + 1,
  })),
  on(GameActions.submitAnswers, state => ({ 
    ...state, 
    isSubmitting: true 
  })),
  on(GameActions.submitSuccess, (state, { result }) => ({ 
    ...state, 
    isSubmitting: false, 
    submissionResult: result 
  })),
  on(GameActions.submitFailure, state => ({ 
    ...state, 
    isSubmitting: false, 
    submissionResult: null 
  }))
);