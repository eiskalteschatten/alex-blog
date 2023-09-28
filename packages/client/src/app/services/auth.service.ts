import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserRegistration, UserLogin, UserLoginReply, SerializedUser, RefreshAccessTokenReply } from '@ab/shared';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: SerializedUser | null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const userStr = localStorage.getItem('user');

    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }

  get isLoggedIn(): boolean {
    return !!this.user && !!this.accessToken && !!this.refreshToken;
  }

  get accessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  set accessToken(token: string | undefined) {
    if (token) {
      localStorage.setItem('accessToken', token);
    }
    else {
      localStorage.removeItem('accessToken');
    }
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  set refreshToken(token: string | undefined) {
    if (token) {
      localStorage.setItem('refreshToken', token);
    }
    else {
      localStorage.removeItem('refreshToken');
    }
  }

  login(loginData: UserLogin): Observable<UserLoginReply> {
    return this.http.post<UserLoginReply>(`${environment.apiUrl}/api/auth/login`, loginData);
  }

  register(registrationData: UserRegistration): Observable<UserLoginReply> {
    return this.http.post<UserLoginReply>(`${environment.apiUrl}/api/user/register`, { registrationData });
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('user');

    this.accessToken = undefined;
    localStorage.removeItem('accessToken');

    this.refreshToken = undefined;
    localStorage.removeItem('refreshToken');

    this.router.navigate(['/auth/login']);
  }

  setUserAuthData(data: UserLoginReply): void {
    this.user = data.user;
    localStorage.setItem('user', JSON.stringify(data.user));

    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  }

  refreshAccessToken(): Observable<RefreshAccessTokenReply> {
    return this.http.post<RefreshAccessTokenReply>(`${environment.apiUrl}/api/auth/refresh-access-token`, null, {
      headers: {
        Authorization: `Bearer ${this.refreshToken}`
      },
    });
  }
}
