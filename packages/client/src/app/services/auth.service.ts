import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserRegistration, UserLogin, UserLoginReply, SerializedUser, RefreshAccessTokenReply } from '@ab/shared';
import { Observable } from 'rxjs';

import { environment } from '~environments/environment';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: SerializedUser | null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStoragService: LocalStorageService
  ) {
    const userStr = this.localStoragService.getItem('user');

    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }

  get isLoggedIn(): boolean {
    return !!this.user && !!this.accessToken && !!this.refreshToken;
  }

  get accessToken(): string | null {
    return this.localStoragService.getItem('accessToken');
  }

  set accessToken(token: string | undefined) {
    if (token) {
      this.localStoragService.setItem('accessToken', token);
    }
    else {
      this.localStoragService.removeItem('accessToken');
    }
  }

  get refreshToken(): string | null {
    return this.localStoragService.getItem('refreshToken');
  }

  set refreshToken(token: string | undefined) {
    if (token) {
      this.localStoragService.setItem('refreshToken', token);
    }
    else {
      this.localStoragService.removeItem('refreshToken');
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
    this.localStoragService.removeItem('user');

    this.accessToken = undefined;
    this.localStoragService.removeItem('accessToken');

    this.refreshToken = undefined;
    this.localStoragService.removeItem('refreshToken');

    this.router.navigate(['/auth/login']);
  }

  setUserAuthData(data: UserLoginReply): void {
    this.user = data.user;
    this.localStoragService.setItem('user', JSON.stringify(data.user));

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
