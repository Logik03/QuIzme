import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = 'https://lottery-n73z.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<IResponse> {
    return this.http.post<IResponse>(
      this.baseUrl + '/game/start?lat=12&long=8',
      {}
    );
  }
}
