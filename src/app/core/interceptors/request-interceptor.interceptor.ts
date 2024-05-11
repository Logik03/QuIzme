import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/notification.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {


  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private notification: NotificationService,
    private auth: AuthenticationService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();

    // Endpoints not to set bearer token to
    if (this.excludedEndpoints(request)) {
      return next.handle(request).pipe(
        catchError((error) => this.handleError(error, next, request)),
        finalize(() => this.loadingService.hideLoading())
      );
    }

    const token = localStorage['token']?.replaceAll('"', '') ||  ""
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error) => this.handleError(error, next, modifiedRequest)),
      finalize(() => this.loadingService.hideLoading())
    );       
  }

  private excludedEndpoints(req: HttpRequest<any>): boolean {
    const excludedEnpoints: string | string[] = [
      //'create-admin',
      'signin'
    ];
    const endpointParts = req.url.split('/');
    const endpoint = endpointParts[endpointParts.length - 1];
    return excludedEnpoints.includes(endpoint);
  }

  private handleError(
    err: HttpErrorResponse,
    next: HttpHandler,
    req: HttpRequest<any>
  ) {
    const statusCode = err.status;
    const errorMessage = err?.error?.data?.Msg;

    //console.log('Error Message: ', errorMessage);
    
    switch (statusCode) {
      case 401:
        // if (this.excludedEndpoints(req)) {
          this.notification.error(errorMessage || 'You Are Unauthorized');
          //this.auth.logout();
          return throwError(() => err);
        // } else return this.refreshToken(req, next);
      case 400:
        this.notification.error(errorMessage || 'Bad Request');
        return throwError(() => err);
      case 403:
        this.notification.error(errorMessage || 'Forbidden To Access Resource');
        return throwError(() => err);
      case 409:
        this.notification.error(errorMessage || 'Validation failure');
        return throwError(() => err);  
      case 404:
        this.notification.error(errorMessage || 'Resource Not Found');
        return throwError(() => err);
      case 415:
        this.notification.error(errorMessage || 'Unsupported Media Type');
        return throwError(() => err);
      case 0:
        this.notification.error(
          errorMessage || 'Please Check Your Network Connection'
        );
        return throwError(() => err);
      case 503:
        this.notification.error(
          errorMessage || 'Service Unavailable, Please Try Again Later'
        );
        return throwError(() => err);
      case 504:
        this.notification.error(errorMessage || 'Gateway Timeout');
        return throwError(() => err);
      case 500:
        this.notification.error(
          errorMessage || 'Internal Server Error, Please Try Again Later'
        );
        return throwError(() => err);
      default:
        return throwError(() => err);
    }
  }


}



