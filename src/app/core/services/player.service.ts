import { Injectable } from '@angular/core';
import { PlayerState } from '../../store/reducers/player.reducers';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  savePlayerState(playerState: PlayerState): Observable<any> {
    return this.http.post('/api/playerState', playerState);
  }
  
  getPlayerState(playerId: string): Observable<PlayerState> {
    return this.http.get<PlayerState>(`/api/playerState/${playerId}`);
  }
}
