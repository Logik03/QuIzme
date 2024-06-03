import * as auth from './reducers/auth.reducers';
import * as game from './reducers/game.reducers';
import * as player from './reducers/player.reducers';
import * as ad from './reducers/ad.reducers';
//import * as  interest from './reducers/interests.reducers';


export interface AppState {
  authState: auth.State;
  gameState: game.GameState;
  playerState: player.PlayerState;
  adState: ad.AdState;
  //interestState: interest.State
}