import { createAction, props } from '@ngrx/store';
import {  IQuestions, IAnswer,ISubmissionResult } from '../../core/models/user';

export const startGame = createAction('[Game/API] Start Game',props<{ payload : any}>());
export const loadQuestions = createAction('[Game/API] Load Questions');
export const loadQuestionsSuccess = createAction('[Game/API] Load Questions Success', props<{ questions: any}>());
export const loadQuestionsFailure = createAction('[Game/API] Load Questions Failure', props<{ error: any }>());

export const answerQuestion = createAction('[Game/API] Answer Question', props<{ answer: IAnswer }>());
export const submitAnswers = createAction('[Game/API] Submit Answers', props<{playerId: string, answers: IAnswer[] }>());
export const submitSuccess = createAction('[Game/API] Submit Success', props<{ result: ISubmissionResult }>());
export const submitFailure = createAction('[Game/API] Submit Failure', props<{ error: any }>());
export const resetGameState = createAction('[Player] Reset State');