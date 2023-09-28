import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';
import { RefreshAccessTokenReply } from '@ab/shared';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshingAccessToken = false;

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.accessToken;

    if (accessToken && !this.isRefreshingAccessToken) {
      const accessTokenReqeust = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });

      return next.handle(accessTokenReqeust).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            const refreshToken = this.authService.refreshToken;

            if (!refreshToken) {
              this.authService.logout();
              return throwError(() => error);
            }

            return this.handle401Error(request, next);
          }

          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshingAccessToken && this.authService.isLoggedIn) {
      this.isRefreshingAccessToken = true;

      return this.authService.refreshAccessToken().pipe(
        mergeMap((reply: RefreshAccessTokenReply) => {
          this.authService.accessToken = reply.accessToken;
          this.isRefreshingAccessToken = false;

          const accessTokenReqeust = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${reply.accessToken}`)
          });

          return next.handle(accessTokenReqeust);
        }),
        catchError((error) => {
          this.isRefreshingAccessToken = false;

          if (error.status === 403) {
            this.authService.logout();
          }

          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }
}
