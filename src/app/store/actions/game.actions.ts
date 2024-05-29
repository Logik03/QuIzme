import { createAction, props } from '@ngrx/store';
import {  IQuestions, IAnswer,ISubmissionResult } from '../../core/models/user';

export const startGame = createAction('[Game] Start Game');
export const loadQuestions = createAction('[Game] Load Questions');
export const loadQuestionsSuccess = createAction('[Game] Load Questions Success', props<{ questions: IQuestions[] }>());
export const loadQuestionsFailure = createAction('[Game] Load Questions Failure', props<{ error: any }>());

export const answerQuestion = createAction('[Game] Answer Question', props<{ answer: IAnswer }>());
export const submitAnswers = createAction('[Game] Submit Answers', props<{ answers: IAnswer[] }>());
export const submitSuccess = createAction('[Game] Submit Success', props<{ result: ISubmissionResult }>());
export const submitFailure = createAction('[Game] Submit Failure', props<{ error: any }>());