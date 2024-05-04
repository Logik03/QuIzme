import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = "http://127.0.0.1:5000/api/v1";
  constructor(
    private http: HttpClient, 
    private router: Router,
    private storage: StorageService
  ) { }
  

  private jwtHelper: JwtHelperService = new JwtHelperService();

  public loggedInUser$: BehaviorSubject<any> = new BehaviorSubject({});


  private get getToken(): string | null {
    return localStorage["token"]?.replaceAll('"', "");
  }

  private get getRefreshToken(): string | null {
    return localStorage["refresh"]?.replaceAll('"', "");
  }

  public get getUserInfo(): any | null {
    const userInfo: any | null = localStorage["userInfo"];
    return userInfo && JSON.parse(userInfo);
  }

  public get getPrivileges(): any | null {
    const userPrivileges = localStorage["privileges"] ?? "[]";
    return JSON.parse(userPrivileges);
  }
  
  
  public login(payload: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/login`, payload)
      .pipe(
        tap((res: any) => {
           this.storage.setToken(res.data.access_token);
          this.storage.setItem('User' , res.data.user);
        })
      );
  }

  public signUp(payload: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, payload);
  }

  public emailConfirmation(token:string) {
    return this.http.get(`${this.baseUrl}/auth/confirm/${token}`);
  }

  public isAuthenticated() {
    const token: string | null = this.getToken;
    if (token && !this.jwtHelper.isTokenExpired(token)) return true;
    return false;
  }
}
