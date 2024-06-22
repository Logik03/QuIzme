import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, ISubmitAnswer } from '../models/game';
import { IUserData } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = 'https://lottery-n73z.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + '/game/start?lat=12&long=8');
  }

  submitAnswer(id: string, payload: ISubmitAnswer): Observable<IResponse> {
    return this.http.post<IResponse>(this.baseUrl + `/game/end/${id}`, payload);
  }

  getPlayerHistory(id: string): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + `/game/user-history/${id}`);
  }

  getPlayer(payload: any): Observable<IResponse> {
    return this.http.post<IResponse>(this.baseUrl + `/game/end`, payload);
  }

  updateProfile(payload: IUserData): Observable<IResponse> {
    return this.http.patch<IResponse>(
      this.baseUrl +
        `/user/update-profile
    `,
      payload
    );
  }

  uploadImage(image: File): Observable<IResponse> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<IResponse>(
      this.baseUrl + `/user/upload-file`,
      formData
    );
  }
}
