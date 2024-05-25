import * as auth from './reducers/auth.reducers';
//import * as  interest from './reducers/interests.reducers';


export interface AppState {
  authState: auth.State;
  //interestState: interest.State
}