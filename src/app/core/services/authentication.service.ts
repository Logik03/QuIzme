import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  IForgotPasswordModel,
  IResetPasswordModel,
  ISigninModel,
  ISignupModel,
} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'https://lottery-n73z.onrender.com/api/v1';
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {}

  private jwtHelper: JwtHelperService = new JwtHelperService();

  public loggedInUser$: BehaviorSubject<any> = new BehaviorSubject({});

  private get getToken(): string | null {
    return localStorage.getItem('token');
  }

  private get getRefreshToken(): string | null {
    return localStorage['refresh']?.replaceAll('"', '');
  }

  public get getUserInfo(): any | null {
    const userInfo: any | null = localStorage['userInfo'];
    return userInfo && JSON.parse(userInfo);
  }

  public get getPrivileges(): any | null {
    const userPrivileges = localStorage['privileges'] ?? '[]';
    return JSON.parse(userPrivileges);
  }

  public login(payload: ISigninModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signin`, payload);
  }

  public forgotPassword(payload: IForgotPasswordModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, payload);
  }

  public resetPassword(payload: IResetPasswordModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/reset-password`, payload);
  }

  public signUp(payload: ISignupModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, payload);
  }

  public selectInterests(payload: any) {
    return this.http.post(`${this.baseUrl}/user/add-interest`, payload);
  }

  public emailConfirmation(token: string) {
    return this.http.get(`${this.baseUrl}/auth/confirm/${token}`);
  }

  public isAuthenticated() {
    const token: string | null = this.getToken;
    if (token && !this.jwtHelper.isTokenExpired(token)) return true;
    return false;
  }
}
