import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.checkAuth()
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  checkAuth(): boolean {
    return !!this.getRefreshToken() && !!this.getAccessToken();
  }

  private updateAuthStatus() {
    this.isAuthenticatedSubject.next(this.checkAuth());
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  getBothTokens(): { access: string | null; refresh: string | null } {
    return {
      access: this.getAccessToken(),
      refresh: this.getRefreshToken(),
    };
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.updateAuthStatus();
  }

  saveBothTokens(access_token: string, refresh_token: string) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    this.updateAuthStatus();
  }

  saveAccessToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
    this.updateAuthStatus();
  }

  login(accessToken: string, refreshToken: string) {
    this.saveBothTokens(accessToken, refreshToken);
    this.updateAuthStatus();
  }
}
