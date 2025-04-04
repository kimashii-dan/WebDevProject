import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

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
  }

  isAuthenticated(): boolean {
    return !!this.getRefreshToken() && !!this.getAccessToken();
  }

  saveBothTokens(access_token: string, refresh_token: string) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }

  saveAccessToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
  }
}
